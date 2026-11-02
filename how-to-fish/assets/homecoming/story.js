import {el,wrap,putOnGround,facePoint,clamp,disposeTree} from '../update/helpers.js';

const defaults=()=>({version:1,welcomed:false,giftsReceived:false,leviathanCaught:false,shipAwarded:false,endingSeen:false,visited:['pier']});
export function storyState(p){
  p.expedition??={introSeen:false,tutorial:{step:0,completed:false}};
  const s=p.expedition.homecoming??={...defaults()};
  for(const [key,value] of Object.entries(defaults()))if(s[key]===undefined)s[key]=value;
  return s;
}
export function goalText(p,ctx){
  const s=storyState(p),zone=p.state.unlockedZones;
  if(s.shipAwarded)return 'Обещание выполнено. Корабль «Возвращение» твой. Дом ждёт!';
  if(zone.includes('secret_endgame'))return 'Найди и поймай Штормового Левиафана у Короны Штормов.';
  if(!p.expedition.tutorial.completed)return 'Освой рыбалку на первом острове и продай первый улов.';
  if(!p.state.owned.boats.includes('coastal_skiff'))return 'Лови и продавай рыбу. Купи береговой скиф и выбери второй остров на карте.';
  const q=ctx.data.quests.find(q=>q.id===p.state.story.activeQuestId);
  return q?`Следующий шаг: ${ctx.nameOf(q)}. Условия — в заданиях.`:'Открывай морские пути: исследуй районы, собирай коллекцию и улучшай судно.';
}
export function installStoryProgression(ctx){
  const P=ctx.Progression;
  wrap(P.prototype,'load',async function(original,...args){
    await original(...args);const s=storyState(this);
    // Existing adventures are resumed without replaying the shipwreck or gifts.
    if(this.expedition.introSeen&&this.expedition.tutorial.completed&&!s.welcomed)s.welcomed=true;
    if(!(this.expedition.renewal?.cycle>0)&&this.state.discoveredSpecies.includes('storm_leviathan'))s.leviathanCaught=true;
    // Update only unclaimed objective layouts. Never re-award historical cash.
    for(const id of ['open_the_stormgate','eye_of_the_storm']){
      const e=this.state.story.progress[id],q=ctx.data.quests.find(q=>q.id===id);
      if(!e||this.state.story.claimed.includes(id))continue;
      if(id==='eye_of_the_storm'&&e.objectives.length!==q.objectives.length){
        e.objectives=[{value:s.leviathanCaught?1:0,target:1,keys:[],streak:0}];e.completed=s.leviathanCaught;
      }else if(id==='open_the_stormgate'&&e.objectives[0])e.objectives[0].target=9;
    }
    this._syncPassiveObjectives();return this.exportSnapshot();
  });
  wrap(P.prototype,'addCatch',function(original,...args){
    const r=original(...args);
    if(r.ok&&r.catch.speciesId==='storm_leviathan'){
      storyState(this).leviathanCaught=true;this._touch('leviathan-landed');
    }
    return r;
  });
}

/** Persistent story director. Dialogues never simulate player combat or tutorial. */
export class HomecomingStory {
  constructor(game,ctx){
    this.game=game;this.ctx=ctx;this.active=false;this.ending=false;this.pendingEnding=false;
    this.overlay=el('section','story-scene',null,document.body);this.overlay.hidden=true;
    this.overlay.setAttribute('aria-label','История: дорога домой');
    this.card=el('div','story-card',null,this.overlay);
    const top=el('header','story-card__head',null,this.card);
    this.avatar=el('span','story-avatar','М',top);const identity=el('div','',null,top);
    this.speaker=el('strong','','МАКАР',identity);this.role=el('small','','СМОТРИТЕЛЬ ОСТРОВА · ХОЗЯИН ЛАВКИ',identity);
    this.counter=el('span','story-counter','',top);
    this.title=el('h2','','',this.card);this.text=el('p','','',this.card);
    this.gifts=el('div','story-gifts',null,this.card);this.gifts.hidden=true;
    for(const [key,name] of [['rod','Удочка'],['weapon','Пистолет'],['utility','Гарпун']]){
      const item=el('span','',null,this.gifts),icon=el('i','',null,item);
      ctx.paintIcon?.(icon,key);el('strong','',name,item);
    }
    const foot=el('footer','story-card__foot',null,this.card);
    this.note=el('small','','ЦЕЛЬ: ЛЕВИАФАН → КОРАБЛЬ → ДОМ',foot);
    this.next=el('button','primary-btn story-next','ДАЛЬШЕ →',foot);this.next.type='button';this.next.onclick=()=>this.advance();
    this.onKey=e=>{if(this.active&&['Enter','Space'].includes(e.code)&&game.mode==='playing'){e.preventDefault();e.stopImmediatePropagation();this.advance();}};
    document.addEventListener('keydown',this.onKey,true);
    this.goal=el('button','journey-goal',null,document.querySelector('#hud'));this.goal.type='button';
    el('span','journey-goal__compass','✦',this.goal);const copy=el('span','',null,this.goal);
    el('small','','ДОРОГА ДОМОЙ',copy);this.goalLine=el('strong','','Поймай Левиафана. Получи корабль.',copy);
    this.goal.onclick=()=>game.openPanel('quests');
    this.off=game.progression.on('change',()=>{this.refresh();this.checkReward();});
    this.refresh();this.checkReward();
  }
  get state(){return storyState(this.game.progression);}
  refresh(){
    if(!this.goal)return;
    const p=this.game.progression,s=this.state;
    this.goalLine.textContent=s.shipAwarded?'Корабль получен · домой!':'Пять островов → Левиафан → корабль';
    this.goal.title=goalText(p,this.ctx);
  }
  checkReward(){
    const g=this.game,p=g.progression,s=this.state;
    if(!s.leviathanCaught||s.shipAwarded||this.awarding)return;
    this.awarding=true;
    try{
      s.shipAwarded=true;
      if(!p.state.owned.keyItems.includes('homeward_deed'))p.state.owned.keyItems.push('homeward_deed');
      if(!p.state.owned.boats.includes('homeward_ship'))p.state.owned.boats.push('homeward_ship');
      if(!p.state.owned.titles.includes('Капитан возвращения'))p.state.owned.titles.push('Капитан возвращения');
      p.state.equipped.boatId='homeward_ship';
      const q=p.getQuestStatus('eye_of_the_storm');
      if(q?.completed&&!p.state.story.claimed.includes('eye_of_the_storm'))p.claimRewards('quest','eye_of_the_storm');
      p._touch('homeward-ship-awarded');
      this.pendingEnding=true;
    }finally{this.awarding=false;}
  }
  begin(lines,{kind='dialogue',approach=false,onDone=null}={}){
    const g=this.game;
    this.lines=lines;this.line=0;this.kind=kind;this.onDone=onDone;this.active=true;
    this.approachTime=approach?0:3;this.overlay.hidden=false;
    this.card.classList.toggle('is-approaching',approach);
    document.body.classList.add('story-active');g.panelOpen=true;g.input.reset();g.input.enabled=false;
    document.exitPointerLock?.();g.platform.stopGameplay();g.toolView.root.visible=false;
    if(approach)this.prepareMentor();
    this.paint();
  }
  prepareMentor(){
    const g=this.game,T=this.ctx.T;
    putOnGround(g,3,8);
    const npc=g.npcSystem?.npcs?.find(n=>n.modelId.includes('captain'))??g.npcSystem?.npcs?.[0];
    if(!npc)return;
    this.mentor=npc;this.mentorStopped=false;this.mentorSaved={pos:npc.object.position.clone(),rotation:npc.object.rotation.clone(),state:npc.state,waypoint:npc.waypointIndex};
    const a=new T.Vector3(-2,0,6),b=new T.Vector3(1,0,6.3);
    a.y=(g.surfaceAt(a.x,a.z)??g.player.position.y)-g.playerEyeHeight;
    b.y=(g.surfaceAt(b.x,b.z)??g.player.position.y)-g.playerEyeHeight;
    this.from=a;this.to=b;npc.object.position.copy(a);npc.rod.visible=false;npc.speech.visible=false;
    g.npcSystem.play(npc,'walk',1);facePoint(g,b.clone().add(new T.Vector3(0,1.35,0)));
  }
  welcome(){
    const g=this.game,p=g.progression;
    g.guide.active=false;g.guide.card.hidden=true;
    this.begin([
      {title:'Рад, что ты выжил.',text:'Ночью мы нашли тебя у обломков на берегу. Ты на Пирсе Коряги — первом острове архипелага. Я Макар, держу здешнюю лавку. Отдохни: шторм уже прошёл.'},
      {title:'С пустыми руками не оставлю.',text:'Возьми мою удочку, пистолет и гарпун — это подарок. Лови рыбу удочкой, стреляй по рыбе у поверхности и по птицам. Подводную добычу подтягивай гарпуном. Улов покупаю у прилавка «Улов».',gifts:true},
      {title:'Один улов — и ты вернёшься домой.',text:'За пятью морскими путями, у Короны Штормов, живёт Штормовой Левиафан. Поймай его — и я отдам тебе свой большой парусный корабль. На нём ты сможешь пересечь океан и вернуться домой.'},
      {title:'А пока оставайся здесь.',text:'Сначала научись ловить и продавать на этом острове. Награды первых заданий помогут купить лодку. Открывай новые виды, ищи крупные трофеи и получай лицензии на морские пути. Следующий остров выбирай сам на карте. Старые берега останутся открыты: возвращайся за спокойной рыбалкой и коллекцией, когда захочешь.'}
    ],{kind:'welcome',approach:true,onDone:()=>{
      const s=this.state;s.welcomed=true;s.giftsReceived=true;
      for(const [type,id] of [['weapons','dock_pistol'],['rods','shoreline_rod']])if(!p.state.owned[type].includes(id))p.state.owned[type].push(id);
      p._touch('makar-welcome');g.guide.start();facePoint(g,new this.ctx.T.Vector3(1,g.player.position.y-.6,-17));
    }});
  }
  showDepartureBriefing(){
    this.begin([{title:'Ты готов к самостоятельной жизни.',text:'Выбирай скиф в лавке и проверь лицензию в заданиях. Когда подготовишься, открой карту и сам проложи курс. В новых районах ищи незнакомые виды и крупные косяки вдали от берега. На каждом острове есть продажа и лавка — возвращаться назад ради прогресса не нужно.'}],{kind:'briefing'});
  }
  paint(){
    const item=this.lines[this.line];this.title.textContent=item.title;this.text.textContent=item.text;
    this.gifts.hidden=!item.gifts;this.counter.textContent=`${this.line+1} / ${this.lines.length}`;
    this.next.textContent=this.line===this.lines.length-1?(this.kind==='welcome'?'ЗА ПЕРВЫМ УЛОВОМ →':this.kind==='reward'?'ПОДНЯТЬ ПАРУСА →':'ПОНЯТНО →'):'ДАЛЬШЕ →';
    this.next.disabled=this.approachTime<2.2;
  }
  advance(){
    if(!this.active||this.game.mode!=='playing'||this.approachTime<2.2)return;
    if(++this.line<this.lines.length){this.paint();return;}
    const done=this.onDone;this.close();done?.();
  }
  close(){
    const g=this.game;this.active=false;this.overlay.hidden=true;document.body.classList.remove('story-active');
    if(this.mentor){const n=this.mentor,s=this.mentorSaved;n.object.position.copy(s.pos);n.object.rotation.copy(s.rotation);n.state='walk';n.waypointIndex=s.waypoint;n.rod.visible=false;g.npcSystem.play(n,'walk',1);this.mentor=null;}
    g.panelOpen=false;g.toolView.root.visible=true;g.input.reset();g.input.enabled=g.mode==='playing';
    if(g.mode==='playing')g.platform.startGameplay();g.canvas.focus({preventScroll:true});
  }
  update(dt){
    const g=this.game;if(g.mode!=='playing'||g.platformPaused)return;
    if(this.active){
      this.approachTime+=dt;
      if(this.mentor){
        const u=clamp(this.approachTime/2.2);this.mentor.object.position.lerpVectors(this.from,this.to,u);
        this.mentor.object.rotation.y=Math.atan2(g.player.position.x-this.mentor.object.position.x,g.player.position.z-this.mentor.object.position.z);
        if(u>=1&&!this.mentorStopped){g.npcSystem.play(this.mentor,'idle',1);this.mentorStopped=true;}
        // Mixers are updated independently of NPC navigation during dialogue.
        g.animationSystem?.update?.(dt);g.assetManager?.update?.(dt);
      }
      this.card.classList.toggle('is-approaching',this.approachTime<2.2);this.next.disabled=this.approachTime<2.2;
      g.water.material.uniforms.time.value+=dt*.6;return;
    }
    if(this.ending){this.updateEnding(dt);return;}
    if((this.pendingEnding||(this.state.shipAwarded&&!this.state.endingSeen))&&!g.panelOpen&&!g.intro?.active&&!g.guide?.active){
      this.pendingEnding=false;
      this.begin([{title:'Слово капитана крепче шторма.',text:'Ты поймал Левиафана. Весь архипелаг будет помнить этот улов! Как и обещал, корабль «Возвращение» теперь твой. Запасы на борту, путь через океан открыт. Пора домой.'}],{kind:'reward',onDone:()=>this.startEnding()});
    }
  }
  async startEnding(){
    const g=this.game,T=this.ctx.T;if(this.ending)return;
    this.ending=true;this.endingTime=0;g.input.enabled=false;g.panelOpen=true;g.platform.stopGameplay();
    g.toolView.root.visible=false;document.body.classList.add('ending-active');
    this.endingOverlay=el('section','homeward-ending',null,document.body);
    const copy=el('div','ending-copy',null,this.endingOverlay);el('small','','ОБЕЩАНИЕ ВЫПОЛНЕНО',copy);el('h1','','Курс — домой.',copy);
    el('p','','Шторм остался позади. Впереди — знакомые берега.',copy);
    this.endingContinue=el('button','primary-btn','ПРОДОЛЖИТЬ ИССЛЕДОВАТЬ',copy);this.endingContinue.type='button';this.endingContinue.onclick=()=>this.finishEnding();
    this.endingSaved={camera:g.camera.position.clone(),rotation:g.camera.rotation.clone(),fog:g.scene.fog.color.clone(),density:g.scene.fog.density,bg:g.scene.background.clone(),sun:g.sun.color.clone()};
    const c=g.zoneSystem.getZoneCenter?.(g.player.zone)??g.player.position;
    this.endingOrigin=new T.Vector3(c.x+80,.1,c.z-100);
    try{this.endingBoat=await g.assetManager.instantiate('sail_ship',{targetLength:16,uniqueMaterials:true,castShadow:true});
      if(!this.ending){disposeTree(this.endingBoat);return;}g.scene.add(this.endingBoat);
    }catch(e){this.endingBoat=g.zoneSystem.boatInstance?.clone(true);this.endingBorrowed=true;if(this.endingBoat)g.scene.add(this.endingBoat);}
  }
  updateEnding(dt){
    const g=this.game,T=this.ctx.T;this.endingTime+=dt;const t=this.endingTime;
    const pos=this.endingOrigin.clone().add(new T.Vector3(-t*.75,Math.sin(t*1.15)*.12,-t*1.6));
    if(this.endingBoat){this.endingBoat.position.copy(pos);this.endingBoat.rotation.set(0,.44,Math.sin(t*.7)*.016);}
    g.camera.position.copy(pos).add(new T.Vector3(18+Math.min(t,14)*.3,8,26));g.camera.lookAt(pos.clone().add(new T.Vector3(0,4,0)));
    g.water.material.uniforms.time.value+=dt*.65;
    g.scene.fog.color.set('#ddc9ae');g.scene.fog.density=.002;g.scene.background.set('#d5b18e');g.sun.color.set('#ffcf91');
    const u=g.skyDome?.material.uniforms;if(u){g.skyDome.position.copy(g.camera.position);u.topColor.value.set('#648fbd');u.horizonColor.value.set('#ffd4a0');u.lowColor.value.set('#eebf8b');}
    this.endingContinue.disabled=t<2;
  }
  finishEnding(){
    if(!this.ending)return;const g=this.game,s=this.endingSaved;this.ending=false;
    this.state.endingSeen=true;g.progression._touch('homecoming-complete');
    this.endingOverlay?.remove();document.body.classList.remove('ending-active');
    if(this.endingBorrowed)this.endingBoat?.removeFromParent();else disposeTree(this.endingBoat);this.endingBoat=null;
    g.camera.position.copy(s.camera);g.camera.rotation.copy(s.rotation);g.scene.fog.color.copy(s.fog);g.scene.fog.density=s.density;g.scene.background.copy(s.bg);g.sun.color.copy(s.sun);g.updateSkyColors(10);
    g.toolView.root.visible=true;g.panelOpen=false;g.input.enabled=g.mode==='playing';g.input.reset();g.platform.startGameplay();
    g.toast('История завершена. Корабль твой, коллекция и все острова остаются доступны.','catch');
  }
  destroy(){this.off?.();this.close();this.overlay.remove();this.goal.remove();this.endingOverlay?.remove();document.removeEventListener('keydown',this.onKey,true);}
}
