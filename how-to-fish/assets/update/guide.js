import {clamp, el, facePoint, waterNear, putOnGround, disposeTree} from './helpers.js';

const STEPS = [
  {title:'Первый шаг к приключению', hint:'Следуй по стрелкам на земле к концу пирса.',keys:['W','A','S','D'],icon:'steps'},
  {title:'Твой первый улов', hint:'Направь снасть на круги в воде.',keys:['1','ЛКМ'],icon:'float'},
  {title:'Рыба ещё не сдаётся', hint:'Возьми пистолет и попади в рыбу на досках.',keys:['2','ЛКМ'],icon:'aim'},
  {title:'Незваная гостья', hint:'Эта чайка близко. Наведи прицел и стреляй.',keys:['2','ЛКМ'],icon:'gull'},
  {title:'Под водой тоже есть добыча', hint:'Выстрели гарпуном. Затем удерживай действие.',keys:['3','ЛКМ'],icon:'harpoon'},
  {title:'Улов превращается в монеты', hint:'Подойди к прилавку и продай добычу.',keys:['E'],icon:'coins'},
  {title:'Пора обзавестись лодкой', hint:'В лавке купи береговой скиф за 950 монет.',keys:['B'],icon:'boat'},
  {title:'Садимся в лодку', hint:'После продажи подойди к лодке у пирса. Нажми E или кнопку «В ЛОДКУ». Учиться можно на стартовом плоту — покупка не нужна.',keys:['E'],icon:'boat'},
  {title:'Первый выход в море', hint:'Следуй по стрелке до точки разворота. W / S — ход, A / D — поворот. После точки стрелка покажет дорогу обратно.',keys:['W','A','S','D'],icon:'helm'},
  {title:'Возвращаемся и сходим на берег', hint:'Развернись и следуй по стрелке обратно к берегу. Рядом с причалом нажми E или кнопку «НА БЕРЕГ».',keys:['E'],icon:'boat'},
  {title:'Теперь ты знаешь дорогу', hint:'Теперь ты умеешь садиться в лодку и сходить на берег. Исследуй соседние островки: там бывают маленькие сокровища.',keys:['M'],icon:'map'},
];
export class FieldGuide {
  constructor(game,ctx){
    this.game=game;this.ctx=ctx;this.T=ctx.T;this.active=false;this.age=0;this.pending=-1;this.timer=0;
    this.card=el('aside','field-guide',null,document.querySelector('#hud'));this.card.hidden=true;
    this.card.setAttribute('aria-label','Обучение действием');
    const head=el('header','guide-header',null,this.card);
    this.progress=el('span','guide-progress','',head);this.reward=el('span','guide-reward','КОНТРАКТ +950 ●',head);
    const skip=el('button','guide-skip','Пропустить',head);skip.type='button';skip.onclick=()=>this.finish(true);
    const body=el('div','guide-body',null,this.card);
    this.demo=el('div','guide-demo',null,body);
    this.demo.innerHTML='<i class="demo-sea"></i><i class="demo-object"></i><i class="demo-action"></i>';
    const copy=el('div','guide-copy',null,body);this.title=el('strong','','',copy);this.hint=el('p','','',copy);this.keys=el('div','guide-keys',null,copy);
    this.bar=el('div','guide-stage-bar',null,this.card);this.bar.innerHTML='<i></i>';
    this.marker=el('div','guide-target',null,document.body);this.marker.hidden=true;
    this.marker.innerHTML='<i></i><strong></strong><span></span>';
    this.ring=new this.T.Group();this.ring.name='Tutorial objective: beacon + ring';this.ring.userData.ignoreShots=true;this.game.scene.add(this.ring);this.ring.visible=false;
    const mat=new this.T.MeshBasicMaterial({color:'#a5f6df',transparent:true,opacity:.68,depthWrite:false});
    const torus=new this.T.Mesh(new this.T.TorusGeometry(.72,.038,7,36),mat);torus.rotation.x=Math.PI/2;this.ring.add(torus);
    const beacon=new this.T.Mesh(new this.T.ConeGeometry(.17,.34,5),new this.T.MeshBasicMaterial({color:'#ffe2a0',transparent:true,opacity:.9,depthWrite:false}));
    beacon.rotation.z=Math.PI;beacon.position.y=1.0;this.ring.add(beacon);
  }
  get data(){return this.game.progression.expedition.tutorial;}
  get step(){return this.data.step;}
  start({replay=false}={}){
    if(replay){document.body.classList.remove('tutorial-complete110');this.highlightSelector110=null;}
    if(replay)this.game.progression.expedition.tutorial={step:0,completed:false,skipped:false};
    if(this.data.completed){this.active=false;document.body.classList.add('tutorial-complete110');this.game.catchCoach19?.hide();return;}
    this.active=true;this.card.hidden=false;document.body.classList.add('guide-active');
    if(this.data.step===6)this.data.step=7;
    // Resume a sailing checkpoint safely after loading a save at the dock.
    if([8,9].includes(this.data.step)&&!this.game.boatController?.isPiloting)this.data.step=7;
    if(this.data.step>=1&&this.data.step<=4&&Math.hypot(this.game.player.position.x-2,this.game.player.position.z+8)>12)putOnGround(this.game,1,-17);
    this.enter(clamp(this.data.step,0,10));
  }
  clearTarget(){
    if(this.fish){this.fish.hooked=false;this.fish.trainingTarget=false;if(!this.fish.dead&&!this.fish.deck)this.game.fishSystem.remove(this.fish,0);this.fish=null;}
    if(this.bird){this.bird.trainingTarget=false;if(!['falling','down','respawning'].includes(this.bird.state))this.game.wildlife.placePatrolBird(this.bird,true);this.bird=null;}
    this.target=null;this.ring.visible=false;this.marker.hidden=true;
  }
  enter(step, existingFish=null){
    if(step===6)step=7; // Legacy purchase checkpoint: teach using the owned boat.
    if(step===3)step=4; // Retired gull shooting checkpoint; do not change saved step IDs.
    this.clearTarget();this.data.step=step;this.age=0;this.pending=-1;this.timer=0;
    document.body.dataset.guideStep=String(step);
    this.setTouchInteractLabel('E');
    const g=this.game,T=this.T,s=STEPS[step];if(!s){this.finish(false);return;}
    this.card.dataset.step110=String(step);this.marker.dataset.guideStep=String(step);this.title.textContent=s.title;this.hint.textContent=s.hint;this.demo.dataset.kind=s.icon;
    this.keys.replaceChildren(...s.keys.map(k=>el('kbd','',g.input.isTouch?this.touchKey(k):k)));
    const displayStep=({0:1,1:2,2:3,4:4,5:5,7:6,8:7,9:8,10:9})[step]??9;
    this.progress.textContent=`МОРСКАЯ ПРАКТИКА · ${displayStep} / 9`;
    this.bar.firstElementChild.style.width=`${displayStep/9*100}%`;
    this.reward.textContent=step<6?'ПЕРВАЯ ПРОДАЖА +950 ●':step<10?'ЛОДКА И БЕРЕГ':'ДАЛЬШЕ — ТВОЙ ВЫБОР';
    g.input.reset();
    if(step===0){this.setPrompt('НА ПИРС');this.target=new T.Vector3(1,0,-17);this.target.y=(g.surfaceAt(1,-17)??3.02)-g.playerEyeHeight+.09;}
    if(step===1){
      g.selectTool('rod');this.fishingSpot=(g.findTutorialWater?.(7)??waterNear(g,T,9)).setY(.08);this.target=this.fishingSpot;
      this.spawnFish('dock_striper',this.fishingSpot);this.fish.hooked=true;
      facePoint(g,this.fishingSpot);this.setPrompt('ЗАБРОСЬ СЮДА');
    }
    if(step===2&&existingFish){this.prepareDeck(existingFish);}
    if(step===2&&!existingFish){
      // On checkpoint resume recreate a legitimate deck encounter, not a fake completion.
      const point=(g.findTutorialWater?.(7)??waterNear(g,T,8));this.spawnFish('dock_striper',point);this.fish.hooked=false;
      const result={creature:this.fish,species:this.fish.species,speciesId:this.fish.species.id,sizeM:this.fish.sizeM,forceDeck:true,waterPoint:point,perfectReel:false};
      if(g.startDeckEncounter(result))this.prepareDeck(this.fish);
    }
    if(step===3){
      g.selectTool('weapon');const bird=g.wildlife.createBird(g.wildlife.birds.length+1);this.bird=bird;bird.trainingTarget=true;bird.hp=bird.maxHp=12;bird.state='training_perch';
      const front=new T.Vector3(0,0,-6).applyAxisAngle(new T.Vector3(0,1,0),g.player.yaw).add(g.player.position);
      front.y=g.player.position.y+.5;bird.trainingHome=front;bird.object.position.copy(front);bird.object.scale.setScalar(1.02);this.target=bird.object.position;facePoint(g,this.target);this.setPrompt('БЛИЗКАЯ ЦЕЛЬ');
    }
    if(step===4){
      const point=(g.findTutorialWater?.(7)??waterNear(g,T,8));this.spawnFish('copper_bream',point);this.fish.hp=this.fish.maxHp=34;this.fish.hooked=true;
      this.target=this.fish.object.position;g.selectTool('utility');facePoint(g,this.target);this.setPrompt('ГАРПУН · 3');
    }
    if(step===5){if(this.data.saleCompleted115!==true)this.data.saleCompleted115=false;this.target=g.sellMarker.position;this.setPrompt('ПРОДАТЬ · E');if(g.input.isTouch)this.setTouchInteractLabel('ПРОДАТЬ');}
    if(step===6){this.target=g.shopMarker.position;this.setPrompt('ЛАВКА · E / B');this.decorateShop();}
    if(step===7){if(g.input.isTouch){this.hint.textContent='После продажи подойди к лодке у пирса. Когда будешь рядом, зелёная кнопка подпишется «В ЛОДКУ» — нажми её.';this.setTouchInteractLabel('В ЛОДКУ');}this.target=g.getBoatBoardingPoint?.()??g.zoneSystem.boatInstance?.position;this.boatLessonShore115=this.target?.clone();this.boatLessonDock115=g.zoneSystem.boatInstance?.position?.clone?.()??null;this.setPrompt(g.input.isTouch?'В ЛОДКУ':'СЕСТЬ В ЛОДКУ · E');}
    if(step===8){
      this.sailedFrom=g.boatController.state.distanceM;
      const boat=(g.boatController?.position??g.zoneSystem.boatInstance?.position)?.clone?.();
      if(boat){
        this.boatLessonStart115=boat.clone();
        const shore=this.boatLessonShore115;
        const dir=boat.clone().sub(shore??boat).setY(0);
        if(dir.lengthSq()<.16){const h=g.boatController?.state?.heading??0;dir.set(-Math.sin(h),0,-Math.cos(h));}
        dir.normalize();this.boatLessonOut115=boat.clone().addScaledVector(dir,8);this.boatLessonOut115.y=.12;this.target=this.boatLessonOut115;
      }else this.target=null;
      this.setPrompt('ТОЧКА РАЗВОРОТА');
      if(g.input.isTouch)this.hint.textContent='Веди левый стик вверх и поворачивай им влево/вправо. Следуй по стрелке до точки разворота.';
    }
    if(step===9){if(g.input.isTouch)this.hint.textContent='Развернись и следуй по стрелке обратно. Рядом с берегом зелёная кнопка подпишется «НА БЕРЕГ» — нажми её.';this.target=this.boatLessonShore115??g.getBoatBoardingPoint?.()??g.sellMarker.position;this.setPrompt(g.input.isTouch?'ОБРАТНО К БЕРЕГУ':'ОБРАТНО К БЕРЕГУ');}
    if(step===10){this.target=null;this.finish(false);g.homecoming?.showDepartureBriefing();}
    g.progression._touch('tutorial-checkpoint');
  }
  touchKey(k){return ({W:'СТИК',A:'←',D:'→',S:'↓','ЛКМ':'ДЕЙСТВИЕ',E:'ВЗАИМОДЕЙСТВИЕ',B:'ЛАВКА',M:'КАРТА','ПРОБЕЛ':'ПРОПУСТИТЬ'})[k]??k;}
  setTouchInteractLabel(text='E'){
    const label=document.querySelector('.touch-button[data-touch-key="KeyE"] small');
    if(label)label.textContent=text;
  }
  spawnFish(id,point){
    const species=this.ctx.data.fish.find(f=>f.id===id);
    this.fish=this.game.fishSystem.spawnOne('near',species);
    if(!this.fish)return;
    this.fish.trainingTarget=true;this.fish.home.copy(point).setY(-.22);this.fish.object.position.copy(this.fish.home);this.fish.target.copy(this.fish.home);this.fish.changeTargetIn=99;
  }
  prepareDeck(fish){
    this.fish=fish;fish.trainingTarget=true;
    if(fish.deck){
      const d=fish.deck;d.escapeSeconds=150;d.escapeRemaining=150;d.restSeconds=140;d.restRemaining=140;
      d.hopStart.copy(d.landing);d.hopTarget.copy(d.landing);d.hopElapsed=-1;
      if(fish.state!=='deck_airborne')fish.object.position.copy(d.landing).setY(d.surfaceY+d.bodyLift);
      facePoint(this.game,d.landing.clone().setY(d.surfaceY+d.bodyLift));
    }
    fish.hp=Math.min(fish.hp,16);this.target=fish.object.position;this.setPrompt('ПРИЦЕЛЬСЯ · ЛКМ');
  }
  setPrompt(text){this.marker.querySelector('strong').textContent=text;}
  event(type,data){
    if(!this.active||this.pending>=0)return;
    if(this.step===1&&type==='rod-landed') {
      // The fish already handed off by the real fishing system must not be disposed.
      const fish=data;this.fish=null;this.enter(2,fish);return;
    }
    if(this.step===2&&type==='fish-killed'&&data===this.fish)this.advance(4);
    if(this.step===3&&type==='gull-killed'&&data===this.bird)this.advance(4);
    if(this.step===4&&type==='harpoon-catch'&&data===this.fish)this.advance(5);
    if(this.step===5&&type==='sold'){this.data.saleCompleted115=true;this.game.progression._touch('tutorial-sale-complete');this.grantLicense();this.advance(7);}
  }
  grantLicense(){
    const p=this.game.progression;if(p.expedition.license)return;
    p.expedition.license=true;
    p.state.unlockedContent=[...new Set([...p.state.unlockedContent,'coastal_skiff','islands'])];
    p.state.unlockedZones=[...new Set([...p.state.unlockedZones,'islands'])];
    // A one-time, announced tutorial contract. Boat and passage still cost money.
    p.completeHarborObjectives?.();p._touch('coastal-training-license');
    this.game.toast('Прибрежная лицензия получена. Монеты за первую продажу уже зачислены.','sale');
  }
  advance(step){if(this.pending>=0)return;this.pending=step;this.timer=.85;this.card.classList.add('step-complete');this.game.audio.play('reward',{volume:.4,playbackRate:1.18});}
  beforeUpdate(dt){
    if(!this.active)return;
    if(this.fish&&!this.fish.dead) {
      if(this.step===1&&['idle','casting','waiting','bite'].includes(this.game.fishing.state)) {
        this.fish.object.position.copy(this.fish.home);this.fish.hooked=true;
      }
      if((this.step===2||this.step===4)&&this.fish.deck) {
        this.fish.deck.escapeRemaining=Math.max(this.fish.deck.escapeRemaining,35);
        this.fish.deck.restRemaining=Math.max(this.fish.deck.restRemaining,5);
      }
      if(this.step===4&&!this.fish.deck&&!this.fish.harpoonTethered){this.fish.object.position.copy(this.fish.home);this.fish.object.position.x+=Math.sin(this.age*.65)*.45;this.fish.hooked=true;}
    }
    // Protect the first haul while the player learns the hold/release gesture.
    const f=this.game.fishing;
    if(this.step===1&&f.state==='bite')f.hookWindow=Math.max(f.hookWindow,4);
    if(this.step===1&&f.state==='hooked'){
      f.breakTimer=0;
      if(f.fight){f.fight.breakTimer=0;f.fight.slackTimer=0;f.fight.tension=Math.min(f.fight.tension,.77);
        if(this.game.input.mouse.left)f.fight.progress=Math.min(.999,f.fight.progress+dt*.075);}
      f.tension=Math.min(f.tension,.77);
    }
  }
  update(dt){
    if(!this.active)return;const g=this.game;
    this.age+=dt;
    if(this.pending>=0){this.timer-=dt;if(this.timer<=0){const next=this.pending;this.card.classList.remove('step-complete');this.enter(next);}return;}
    if(this.step===0&&this.target&&Math.hypot(g.player.position.x-this.target.x,g.player.position.z-this.target.z)<2.3)this.advance(1);
    if(this.step===1){
      const f=g.fishing;const text={idle:'Наведи на круги и нажми действие.',casting:'Поплавок летит. Следи за ним.',waiting:'Подожди, пока антенна уйдёт под воду.',bite:'Клюёт! Нажми действие сейчас.',hooked:g.input.mouse.left?'Тяни. Если шкала краснеет — отпусти.':'Удерживай действие, чтобы подтягивать.',landing:'Есть! Улов летит к тебе.'};
      this.hint.textContent=text[f.state]??STEPS[1].hint;this.demo.dataset.state=f.state;
      if(['waiting','bite','hooked'].includes(f.state))this.target=f.bobber.position;
      // Never strand the player after cancellation, a full bag or a released fish.
      if(!this.fish||this.fish.dead||!this.fish.object.parent){this.spawnFish('dock_striper',this.fishingSpot);}
    }
    if(this.step===2&&(!this.fish||!this.fish.object.parent)&&!this.game.deckEncounter){this.enter(2);return;}
    if(this.step===5&&this.data.saleCompleted115){this.advance(7);}
    if(this.step===6){
      this.hint.textContent=`Скиф: 950 ● · У тебя ${Math.floor(g.player.coins)} ●. Переход: 35 ●.`;
      this.decorateShop();
      if(g.progression.state.owned.boats.includes('coastal_skiff')){g.progression.equip('boat','coastal_skiff');g.closePanel();this.advance(7);}
    }
    if(this.step===7){this.target=g.getBoatBoardingPoint?.()??g.zoneSystem.boatInstance?.position;if(g.boatController.isPiloting)this.advance(8);}
    if(this.step===8){
      if(!g.boatController.isPiloting){this.target=g.getBoatBoardingPoint?.()??g.zoneSystem.boatInstance?.position;this.hint.textContent=g.input.isTouch?'Вернись к лодке и нажми кнопку «В ЛОДКУ».':'Вернись к лодке и нажми E, чтобы снова сесть.';this.setPrompt(g.input.isTouch?'В ЛОДКУ':'СЕСТЬ В ЛОДКУ · E');}
      else{
        const boat=g.boatController.position,goal=this.boatLessonOut115;
        const remaining=goal?Math.hypot(boat.x-goal.x,boat.z-goal.z):Infinity;
        const travelled=g.boatController.state.distanceM-(this.sailedFrom??0);
        this.target=goal??this.target;
        this.setPrompt('ТОЧКА РАЗВОРОТА');
        this.hint.textContent=g.input.isTouch?`Левый стик — ход и поворот. Следуй по стрелке: ${Math.ceil(Math.max(0,remaining))} м до точки разворота.`:`W/S — ход · A/D — поворот. Следуй по стрелке: ${Math.ceil(Math.max(0,remaining))} м до точки разворота.`;
        if((goal&&remaining<=2.1)||(!goal&&travelled>=8))this.advance(9);
      }
    }
    if(this.step===9){
      if(!g.boatController.isPiloting){this.data.boatLessonCompleted115=true;this.advance(10);}
      else {
        const boat=g.boatController.position,returnPoint=this.boatLessonShore115??g.getBoatBoardingPoint?.()??g.sellMarker.position;
        this.target=returnPoint;
        const distance=returnPoint?Math.hypot(boat.x-returnPoint.x,boat.z-returnPoint.z):Infinity;
        const shore=g.getBoatBoardingPoint?.(),ready=!!shore&&distance<=5.5;
        if(ready){
          this.hint.textContent=g.input.isTouch?'Ты у берега. Нажми зелёную кнопку «НА БЕРЕГ». Лодка останется у причала.':'Ты у берега. Нажми E, чтобы сойти. Лодка останется у причала.';
          this.setPrompt(g.input.isTouch?'НА БЕРЕГ':'ВЫСАДИТЬСЯ · E');
          if(g.input.isTouch)this.setTouchInteractLabel('НА БЕРЕГ');
        }else{
          this.hint.textContent=g.input.isTouch?`Развернись и следуй по стрелке обратно: ${Math.ceil(Math.max(0,distance))} м. Кнопка «НА БЕРЕГ» появится рядом с причалом.`:`Развернись и следуй по стрелке обратно: ${Math.ceil(Math.max(0,distance))} м. Рядом с причалом нажми E.`;
          this.setPrompt('ОБРАТНО К БЕРЕГУ');
          if(g.input.isTouch)this.setTouchInteractLabel('E');
        }
      }
    }
    if(this.step===10)this.finish(false);
    this.paintTarget();this.paintHighlight();
  }
  paintTarget(){
    const g=this.game,p=this.target,W=document.documentElement.clientWidth||window.innerWidth,H=document.documentElement.clientHeight||window.innerHeight;
    this.marker.hidden=!p||g.panelOpen||g.mode!=='playing';this.ring.visible=!!p&&!g.panelOpen;
    if(!p)return;
    this.ring.position.copy(p);this.ring.position.y=Math.max(.22,p.y-.1);
    this.ring.children[1].position.y=.9+Math.sin(this.age*3)*.12;
    this.ring.children[0].scale.setScalar(1+Math.sin(this.age*3)*.08);
    const n=(this.projected110??=new this.T.Vector3()).copy(p);n.y+=.55;n.project(g.camera);
    const behind=n.z>1||n.z< -1;
    let x=(n.x*.5+.5)*W,y=(-n.y*.5+.5)*H-48;
    if(behind){x=n.x>0?W-55:55;y=H*.45;}
    let off=behind||x<45||x>W-45||y<130||y>H-160;
    x=clamp(x,65,W-65);y=clamp(y,135,H-170);
    // Do not place a world goal label over its own instruction card.
    const card=this.card.getBoundingClientRect();
    if(x-85<card.right&&x+85>card.left&&y+32>card.top&&y-32<card.bottom){
      if(card.right+90>W-80){y=clamp(card.bottom+45,135,H-155);}
      else x=clamp(card.right+90,90,W-90);off=true;
    }
    this.marker.classList.toggle('offscreen',off);this.marker.style.transform=`translate(${x}px,${y}px) translate(-50%,-50%)`;
    const d=p.distanceTo(g.player.position),en=globalThis.__TB_LANG__==='en';this.marker.querySelector('span').textContent=`${off?(en?'◀ TARGET · ':'◀ ЦЕЛЬ · '):''}${Math.round(d)} ${en?'m':'м'}`;
    this.marker.style.opacity=g.fishing.state==='hooked'&&this.step===1?'.4':'1';
  }
  paintHighlight(){
    const selectors={1:'.tool-slot[data-slot="rod"]',2:'.tool-slot[data-slot="weapon"]',3:'.tool-slot[data-slot="weapon"]',4:'.tool-slot[data-slot="utility"]',10:'#map-btn'};
    const selector=selectors[this.step]??'';if(this.highlightSelector110===selector)return;this.highlightSelector110=selector;
    document.querySelectorAll('.guide-highlight').forEach(n=>n.classList.remove('guide-highlight'));
    if(selector)document.querySelector(selector)?.classList.add('guide-highlight');
  }
  decorateShop(){
    if(!this.active||this.step!==6)return;
    const p=document.querySelector('[data-item-id="coastal_skiff"]');p?.closest('article')?.classList.add('training-shop-card');
    // The ordinary shop remains fully interactive; only its relevant item glows.
  }
  decorateMap(){if(!this.active||this.step!==10)return;document.querySelector('[data-zone-id="islands"]')?.closest('article')?.classList.add('training-shop-card');}
  finish(skipped=false){
    if(!this.active&&this.data.completed)return;
    this.active=false;this.game.catchCoach19?.hide();document.body.classList.add('tutorial-complete110');this.highlightSelector110=null;this.data.completed=true;this.data.skipped=skipped;this.data.step=STEPS.length;
    delete document.body.dataset.guideStep;this.setTouchInteractLabel('E');
    if(this.game.fishing.state!=='idle')this.game.fishing.cancel();this.clearTarget();this.game.harpoon.cancel();this.card.hidden=true;document.body.classList.remove('guide-active');
    document.querySelectorAll('.guide-highlight,.training-shop-card').forEach(n=>n.classList.remove('guide-highlight','training-shop-card'));
    this.game.progression._touch(skipped?'tutorial-skipped':'tutorial-complete');this.game.canvas.focus({preventScroll:true});
    this.game.toast(skipped?'Практика пропущена. Повтор доступен в меню паузы.':'Практика завершена! Лови с лодки, высаживайся на островках и ищи сокровища.','zone');
  }
  textState(){return {active:this.active,step:this.step,title:STEPS[this.step]?.title??'complete',fish:this.fish?.id??null,bird:this.bird?.id??null,target:this.target?.toArray()??null};}
  destroy(){delete document.body.dataset.guideStep;this.setTouchInteractLabel('E');this.clearTarget();this.card.remove();this.marker.remove();disposeTree(this.ring);}
}
