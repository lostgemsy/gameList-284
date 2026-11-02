import {wrap,el,copy,facePoint,waterNear} from './helpers.js';
export function installDebug(ctx){
  const {Game,DebugPanel,T,data}=ctx;
  Game.prototype.setupDebugPanel=function(){
    const game=this;
    this.debugPanel=new DebugPanel(this,{callbacks:{
      teleportZone:async({zone})=>{
        if(!zone)return {ok:false,reason:'Район не выбран'};
        game.beginDebugSandbox();game.harpoon?.cancel();game.fishing?.cancel('Телепорт');
        game.leaveBoatMode({silent:true,resetController:true});
        const p=game.progression;
        p.state.unlockedZones=[...new Set([...p.state.unlockedZones,zone.id])];
        p.state.owned.boats=[...new Set([...p.state.owned.boats,zone.requiredBoatId])];
        p._touch('debug-zone',{},false);
        if(game.player.zone===zone.id)return {ok:true,message:'Ты уже в этом районе'};
        const result=await game.zoneSystem.travel(zone.id,{ignoreCost:true,duration:.08,force:true});
        return {...result,message:`Район: ${ctx.nameOf(zone)}`};
      },
      equipSelected:async({weapon,rod,boat})=>{
        game.beginDebugSandbox();
        for(const [kind,item] of Object.entries({weapon,rod,boat})){
          const key={weapon:'weapons',rod:'rods',boat:'boats'}[kind];
          game.progression.state.owned[key]=[...new Set([...game.progression.state.owned[key],item.id])];
          game.progression.equip(kind,item.id);
        }
        await game.zoneSystem.setBoat(boat.id);game.selectTool('weapon');return {ok:true,message:'Выбранное снаряжение выдано. Сохранение не изменено.'};
      },
      spawnFish:async({species})=>{
        game.beginDebugSandbox();
        if(species.aquatic===false){const bird=game.wildlife.createBird(game.wildlife.birds.length+1);bird.height=6;return {ok:true,message:'Чайка создана'};}
        if(species.boss)for(const f of [...game.fishSystem.creatures])if(f.species.boss)game.fishSystem.remove(f,0);
        const fish=game.fishSystem.spawnOne('near',species);
        if(!fish)return {ok:false,reason:'Не удалось создать рыбу'};
        const point=waterNear(game,T,Math.max(9,Math.min(25,(fish.sizeM||2)*2)));
        fish.object.position.copy(point);fish.home.copy(point);fish.target.copy(point).add(new T.Vector3(4,-.2,-2));fish.breachIn=.8;
        game.debugTarget=fish;facePoint(game,point);game.showBoss(fish);
        return {ok:true,message:`${ctx.nameOf(species)} · ${Math.round(fish.hp)} HP · перед камерой`};
      },
    },onVisibilityChange:visible=>{
      game.debugPanelOpen=visible;
      if(visible){game.beginDebugSandbox();game.panelOpen=true;game.input.enabled=false;game.input.reset();document.exitPointerLock?.();game.platform.stopGameplay();}
      else {game.panelOpen=!game.ui['panel-layer'].classList.contains('hidden');game.input.enabled=game.mode==='playing'&&!game.panelOpen&&!game.intro?.active;if(game.input.enabled){game.canvas.focus({preventScroll:true});game.platform.startGameplay();if(!game.input.isTouch)game.canvas.requestPointerLock?.().catch?.(()=>{});}}
    }});
    const panel=this.debugPanel.panel;
    const section=el('section','',null,panel);el('h3','','Проверка механик · F9 / Ctrl + Shift + D',section);
    const controls=el('div','actions',null,section);
    const button=(text,fn)=>{const b=el('button','',text,controls);b.type='button';b.onclick=async()=>{try{await fn();}catch(e){game.debugPanel._setStatus(e.message,true);}};return b;};
    button('Гарпун',()=>{game.selectTool('utility');game.debugPanel.hide();});
    this.godButton=button('Бессмертие: ВКЛ',()=>{game.debugGodMode=!game.debugGodMode;game.godButton.textContent=`Бессмертие: ${game.debugGodMode?'ВКЛ':'ВЫКЛ'}`;});
    this.freezeButton=button('Поведение рыб: ВКЛ',()=>{game.debugFreezeFish=!game.debugFreezeFish;game.freezeButton.textContent=`Поведение рыб: ${game.debugFreezeFish?'ПАУЗА':'ВКЛ'}`;});
    button('Выпрыгивание цели',()=>{const f=game.debugTarget;if(f&&!f.dead){f.hooked=false;f.deck=null;game.fishSystem.beginBreach(f);game.debugPanel.hide();}});
    button('Повторить интро',()=>{game.debugPanel.hide();game.guide.active=false;game.guide.card.hidden=true;game.intro.start();});
    button('Начать обучение',()=>{game.debugPanel.hide();game.restartTutorial();});
    button('Завершить тест / вернуть прогресс',()=>game.endDebugSandbox());
    el('p','status','ТЕСТОВЫЙ РЕЖИМ: изменения не уходят в сохранение. Закрыть панель ≠ завершить тест.',section);
    this.debugStats=el('p','status','',section);
    const style=el('style','',null,this.debugPanel.shadow);style.textContent='button{min-height:36px} .panel{max-height:88dvh;overflow:auto} .status{line-height:1.5}';
    this.onDebugKey=e=>{
      const hot=e.code==='F9'||(e.ctrlKey&&e.shiftKey&&e.code==='KeyD');
      if(!hot||e.repeat||(e.code!=='F9'&&['INPUT','TEXTAREA'].includes(e.target?.tagName)))return;
      if(!['playing','paused'].includes(game.mode)||game.intro?.active)return;
      e.preventDefault();e.stopImmediatePropagation();
      if(game.mode==='paused')game.resume();
      game.debugPanel.toggle();
    };
    document.addEventListener('keydown',this.onDebugKey,true);
    let taps=[];
    const secretTap=()=>{const now=performance.now();taps=taps.filter(t=>now-t<2200);taps.push(now);if(taps.length>=5){taps=[];if(game.mode==='playing')game.debugPanel.toggle();}};
    document.querySelector('.rank-medallion')?.addEventListener('pointerdown',secretTap);
    // Desktop and touch have the same hidden entry, with no query parameter needed.
    this.debugBadge=el('button','debug-sandbox-badge','ТЕСТ · вернуть прогресс',document.body);this.debugBadge.hidden=true;this.debugBadge.onclick=()=>game.endDebugSandbox();
  };
  Game.prototype.beginDebugSandbox=function(){
    if(this.debugSandbox)return;
    this.debugSandbox={snapshot:this.progression.exportSnapshot(),zone:this.player.zone,position:this.player.position.clone(),yaw:this.player.yaw,pitch:this.player.pitch,guideActive:!!this.guide?.active,tool:this.player.tool,boatPosition:this.zoneSystem.boatInstance?.position.clone(),boatRotation:this.zoneSystem.boatInstance?.rotation.clone(),piloting:!!this.boatController.isPiloting,anchored:!!this.boatController.state.anchored,boatYaw:this.boatCameraYawOffset,boatPitch:this.boatCameraPitch};
    this.progression._debugSandbox=true;this.harpoon?.cancel();this.fishing?.cancel();this.debugGodMode=true;if(this.godButton)this.godButton.textContent='Бессмертие: ВКЛ';this.debugBadge.hidden=false;
    if(this.guide){this.guide.active=false;this.guide.card.hidden=true;this.guide.marker.hidden=true;this.guide.ring.visible=false;}
    document.body.classList.remove('guide-active');
  };
  Game.prototype.endDebugSandbox=async function(){
    if(!this.debugSandbox||this.restoringSandbox)return;
    this.restoringSandbox=true;
    try{
    if(this.mode==='paused')this.resume();
    const saved=this.debugSandbox;if(this.intro?.active)this.intro.finish();this.debugPanel.hide();this.harpoon.cancel();this.fishing.cancel('Тест завершён');
    this.leaveBoatMode({silent:true,resetController:true});
    this.guide.clearTarget();
    if(this.player.zone!==saved.zone)await this.zoneSystem.travel(saved.zone,{ignoreCost:true,duration:.08,force:true});
    else this.fishSystem.setZone(saved.zone);
    this.progression.importSnapshot(saved.snapshot,{save:false});
    await this.zoneSystem.setBoat(saved.snapshot.equipped.boatId);
    this.player.position.copy(saved.position);this.player.yaw=saved.yaw;this.player.pitch=saved.pitch;this.player.velocity.set(0,0,0);
    this.camera.position.copy(this.player.position);this.camera.rotation.set(saved.pitch,saved.yaw,0,'YXZ');
    if(saved.boatPosition&&this.zoneSystem.boatInstance){
      this.zoneSystem.boatInstance.position.copy(saved.boatPosition);this.zoneSystem.boatInstance.rotation.copy(saved.boatRotation);
    }
    this.selectTool(saved.tool??'rod');
    if(saved.piloting){this.boardBoat();this.boatController.setAnchored(saved.anchored,'debug-restore');this.boatCameraYawOffset=saved.boatYaw;this.boatCameraPitch=saved.boatPitch;}
    this.debugSandbox=null;this.progression._debugSandbox=false;this.debugGodMode=false;this.debugFreezeFish=false;this.debugTarget=null;this.debugBadge.hidden=true;this.deckEncounter=null;this.showBoss(null);
    if(saved.guideActive)this.guide.start();
    this.progression._touch('debug-session-restored');this.toast('Тест завершён. Прогресс и снаряжение восстановлены.','info');
    }finally{this.restoringSandbox=false;}
  };
}
