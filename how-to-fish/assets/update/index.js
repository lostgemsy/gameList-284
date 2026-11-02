/*
 * Tidebound polish/update 1.1.0
 * This source module augments the supplied production bundle through explicit
 * integration points. No third-party runtime or network dependency was added.
 */
import {wrap,copy,el,clamp,facePoint,putOnGround} from './helpers.js';
import {installVisuals} from './visuals.js';
import {HarpoonController} from './harpoon.js';
import {ExpeditionIntro} from './intro.js';
import {FieldGuide} from './guide.js';
import {installDebug} from './debug.js';

const freshExpedition=()=>({version:1,introSeen:false,license:false,tutorial:{step:0,completed:false,skipped:false}});
const normalizedExpedition=(raw,oldSave=false)=>({
  ...freshExpedition(),...(raw||{}),
  introSeen:raw?!!raw.introSeen:oldSave,
  tutorial:{step:0,completed:oldSave,skipped:false,...raw?.tutorial}
});
export function installTideboundUpdate(ctx){
  const {Game,Progression,ToolView,Fishing,FishSystem,Wildlife,T}=ctx;
  installVisuals(ctx);installDebug(ctx);

  wrap(Progression.prototype,'_adapterLoad',async function(original){const data=await original();this.expedition=normalizedExpedition(data?.expedition,!!data);return data;});
  wrap(Progression.prototype,'exportSnapshot',function(original){const result=original();result.expedition=copy(this.expedition??freshExpedition());return result;});
  wrap(Progression.prototype,'importSnapshot',function(original,data,options){this.expedition=normalizedExpedition(data?.expedition,!!data);return original(data,options);});
  wrap(Progression.prototype,'newGame',function(original,options){this.expedition=freshExpedition();return original(options);});
  wrap(Progression.prototype,'_adapterSave',function(original,...args){if(this._debugSandbox)return Promise.resolve({ok:true,debugOnly:true});return original(...args);});

  wrap(Game.prototype,'setupGameplaySystems',function(original){
    original();this.fishSystem.game=this;this.wildlife.game=this;this.harpoon=new HarpoonController(this,ctx);
    const utility=document.querySelector('.tool-slot[data-slot="utility"]');utility?.classList.remove('locked');utility?.removeAttribute('disabled');
    utility?.setAttribute('title','Гарпун: 3. Действует под водой. Удерживай действие, чтобы подтягивать.');
  });
  wrap(ToolView.prototype,'setTool',function(original,tool){original(tool);if(this.harpoon)this.harpoon.visible=tool==='utility';});
  wrap(Game.prototype,'selectTool',function(original,tool){
    if(tool===this.player.tool){this.canvas.focus({preventScroll:true});return;}
    if(this.fishing?.state==='landing')return original(tool);
    this.harpoon?.cancel();
    if(tool!=='utility'){const r=original(tool);this.canvas.focus({preventScroll:true});return r;}
    if(this.fishing?.state!=='idle')this.fishing.cancel('Снасть собрана');
    this.player.tool='utility';this.toolView.setTool('utility');this.input.mouse.leftPressed=false;
    document.querySelectorAll('.tool-slot').forEach(n=>n.classList.toggle('active',n.dataset.slot==='utility'));
    document.querySelector('#ammo-panel')?.classList.add('hidden');document.querySelector('#crosshair')?.classList.add('combat');
    this.audio.play('select',{volume:.4});this.uiManager?.updateHUD({zoneId:this.player.zone,tool:'utility'});this.canvas.focus({preventScroll:true});
  });
  wrap(Game.prototype,'init',async function(original){
    await original();
    this.guide=new FieldGuide(this,ctx);this.intro=new ExpeditionIntro(this,ctx);
    const replay=el('button','secondary-btn tutorial-replay','МОРСКАЯ ПРАКТИКА · ПОВТОРИТЬ',document.querySelector('#pause-menu .pause-card')??document.querySelector('#pause-menu'));
    replay.type='button';replay.onclick=()=>{this.resume();this.restartTutorial();};
    const stamp=document.querySelector('.version-stamp');if(stamp)stamp.textContent='v1.3 · ДОРОГА ДОМОЙ · АВТОСОХРАНЕНИЕ';
    if(!this.hasSave)document.querySelector('#start-btn span').textContent='ОТПРАВИТЬСЯ В ПУТЬ';
    if(window.__TIDEBOUND_GAME__===this){
      const old=window.render_game_to_text;
      window.render_game_to_text=()=>JSON.stringify({...JSON.parse(old()),harpoon:this.harpoon.textState(),tutorial:this.guide.textState(),intro:{active:this.intro.active,time:+this.intro.time.toFixed(2)},debugSandbox:!!this.debugSandbox});
    }
    document.querySelector('.tool-slot[data-slot="utility"]')?.addEventListener('click',()=>{
      if(this.mode==='playing'&&!this.panelOpen&&!this.intro.active){this.selectTool('utility');this.canvas.focus({preventScroll:true});}
    });
    ctx.data.debugBuild='1.3.0';
  });
  wrap(Game.prototype,'setupUIManager',function(original){
    original();this.canvas.tabIndex=-1;
    const close=this.uiManager.callbacks.onClose;
    this.uiManager.callbacks.onClose=(...args)=>{
      close?.(...args);
      if(this.mode==='playing'&&!this.intro?.active&&!this.debugPanelOpen){this.input.reset();this.canvas.focus({preventScroll:true});}
      else if(this.intro?.active||this.debugPanelOpen){this.input.enabled=false;this.platform.stopGameplay();}
    };
  });
  wrap(Game.prototype,'openPanel',function(original,type,options={}){
    if(this.intro?.active)return false;
    if(type==='shop'&&this.guide?.active&&this.guide.step===6)options={...options,shopSection:'boat'};
    const result=original(type,options);this.guide?.decorateShop();this.guide?.decorateMap();return result;
  });
  wrap(Game.prototype,'travelToZone',function(original,...args){
    if(this.guide?.active&&this.guide.step<10){this.toast('Закончи морскую практику: продажу, посадку и высадку. Практику можно пропустить.','info');return Promise.resolve({ok:false,reason:'tutorial-in-progress'});}
    return original(...args);
  });
  const originalStart=Game.prototype.start;
  Game.prototype.startNewGame=async function(){
    if(this.startingExpedition)return;
    this.startingExpedition=true;
    try{
      if(this.debugSandbox)await this.endDebugSandbox();
      this.harpoon?.cancel();this.fishing?.cancel();this.guide?.clearTarget();this.leaveBoatMode({silent:true,resetController:true});
      this.progression.newGame({preserveSettings:true});this.hasSave=true;
      this.player.tool='rod';this.toolView.setTool('rod');this.syncProgressionState(true);
      originalStart.call(this);
      if(this.zoneSystem.currentZoneId!=='pier')await this.zoneSystem.travel('pier',{ignoreCost:true,duration:.08,force:true});
      putOnGround(this,3,8);this.intro.start();
    }finally{this.startingExpedition=false;}
  };
  Game.prototype.start=function(){
    if(!this.progression.expedition?.introSeen&&this.intro)return this.startNewGame();
    originalStart.call(this);this.guide?.start();
  };
  Game.prototype.restartTutorial=async function(){
    this.harpoon.cancel();this.fishing.cancel();this.guide.clearTarget();if(this.deckEncounter){this.fishSystem.remove(this.deckEncounter,0);this.deckEncounter=null;}this.leaveBoatMode({silent:true,resetController:true});
    if(this.zoneSystem.currentZoneId!=='pier')await this.zoneSystem.travel('pier',{ignoreCost:true,duration:.08,force:true});
    putOnGround(this,3,8);this.player.yaw=0;this.player.pitch=-.08;this.guide.start({replay:true});
  };
  wrap(Game.prototype,'applyLookInput',function(original,...args){if(this.intro?.active||this.debugPanelOpen)return;return original(...args);});
  wrap(Game.prototype,'resume',function(original,...args){original(...args);if(this.intro?.active){this.input.enabled=false;this.platform.stopGameplay();}else this.canvas.focus({preventScroll:true});});
  wrap(Game.prototype,'damagePlayer',function(original,...args){if(this.guide?.active||(this.debugSandbox&&this.debugGodMode))return;return original(...args);});
  wrap(Game.prototype,'update',function(original,dt){
    if(this.intro?.active){this.intro.update(dt);return;}
    if(this.debugPanelOpen){this.zoneSystem?.update(dt,this.elapsed);if(this.debugStats)this.debugStats.textContent=`${this.player.zone} · Рыб ${this.fishSystem.creatures.length} · Цель: ${this.debugTarget?ctx.nameOf(this.debugTarget.species)+' / '+Math.ceil(this.debugTarget.hp)+' HP':'—'} · Гарпун: ${this.harpoon.state}`;return;}
    if(!this.panelOpen){this.guide?.beforeUpdate(dt);if(this.input.consume('Digit3','Numpad3'))this.selectTool('utility');}
    original(dt);
    if(!this.panelOpen){this.harpoon?.update(dt,this.input,this.player.tool==='utility');this.guide?.update(dt);}
    else{this.guide?.decorateShop();this.guide?.decorateMap();
      // Purchases happen in a paused panel. Observe that event without simulating.
      if(this.guide?.active&&this.guide.step===6&&this.progression.state.owned.boats.includes('coastal_skiff')){
        this.progression.equip('boat','coastal_skiff');this.closePanel();this.guide.advance(7);
      }
    }
    if(this.touchAnchor)this.touchAnchor.hidden=!this.boatController?.isPiloting;
  });
  wrap(Game.prototype,'render',function(original){
    if(!this.validatorPanel?.active){ctx.updateVisualFrame(this);this.harpoon?.updateRope();}
    original();
  });
  wrap(Game.prototype,'handleZoneChanged',function(original,...args){this.harpoon?.cancel();const result=original(...args);if(this.guide?.active&&this.player.zone==='islands'&&this.guide.step===10)this.guide.finish(false);return result;});
  wrap(Game.prototype,'updateUI',function(original,...args){const result=original(...args);if(this.player.tool==='utility')document.querySelector('#ammo-panel')?.classList.add('hidden');return result;});

  // Fix dormant ocean-combat logic: breaches are now actually scheduled.
  wrap(FishSystem.prototype,'update',function(original,dt,time,player){
    if(this.game?.debugFreezeFish)return;
    for(const fish of this.creatures){
      if(fish.dead||fish.hooked||fish.deck||fish.state==='breach'||fish.trainingTarget)continue;
      if(fish.species.catchMethod!=='rod'){
        if(!Number.isFinite(fish.breachIn))fish.breachIn=3+this.rng()*4;
        fish.breachIn-=dt;
        if(fish.breachIn<=0&&fish.object.position.distanceTo(player)<90){this.beginBreach(fish);fish.breachIn=7+this.rng()*6;}
      }
    }
    return original(dt,time,player);
  });
  FishSystem.prototype.isShootable=function(fish){
    if(!fish||fish.dead)return false;
    return !!fish.state?.startsWith('deck_')||fish.state==='breach'||fish.object.position.y>-.08;
  };
  wrap(FishSystem.prototype,'raycast',function(original,camera,range,aim={x:0,y:0}){
    const hit=original(camera,range,aim);if(hit)return hit;
    const fish=this.game?.guide?.active&&[2,4].includes(this.game.guide.step)?this.game.guide.fish:null;
    if(!fish||fish.dead||!fish.deck)return null;
    this.raycaster.setFromCamera(aim,camera);const ray=this.raycaster.ray;
    const delta=fish.object.position.clone().sub(ray.origin),along=delta.dot(ray.direction);
    if(along<0||along>Math.min(range,14)||delta.addScaledVector(ray.direction,-along).length()>.55)return null;
    return {creature:fish,object:fish.object,point:fish.object.position.clone(),distance:along};
  });
  wrap(FishSystem.prototype,'pickForFishing',function(original,...args){
    const guide=this.game?.guide;
    if(guide?.active&&guide.step===1&&guide.fish&&!guide.fish.dead){guide.fish.hooked=true;return guide.fish;}
    return original(...args);
  });
  wrap(FishSystem.prototype,'getFishingPotential',function(original,point){
    const guide=this.game?.guide;
    if(guide?.active&&guide.step===1&&guide.fishingSpot&&point.distanceTo(guide.fishingSpot)<10)return {score:1,school:this.schools[0],distance:1};
    return original(point);
  });
  wrap(Game.prototype,'resolveFishingCastTarget',function(original,options){
    if(this.guide?.active&&this.guide.step===1&&this.guide.fishingSpot){
      const point=this.guide.fishingSpot.clone();
      if(point.distanceTo(this.player.position)<27)return {ok:true,point,challenge:0};
    }
    return original(options);
  });
  wrap(Fishing.prototype,'setState',function(original,state){original(state);const guide=this.fishSystem?.game?.guide;if(guide?.active&&guide.step===1&&state==='waiting')this.biteIn=1.6;});
  wrap(Game.prototype,'handleRodCatch',function(original,result){
    const guided=this.guide?.active&&this.guide.step===1;
    if(guided){result.forceDeck=true;this.deckEncounterStreak=0;}
    const outcome=original(result);
    if(guided){if(this.deckEncounter)this.guide.event('rod-landed',this.deckEncounter);else this.guide.advance(2);}
    return outcome;
  });
  wrap(Game.prototype,'handleCombatCatch',function(original,fish){
    const done=fish?._rewarded, harpoon=fish?.caughtWithHarpoon;
    const result=original(fish);
    if(!done&&fish?._rewarded)this.guide?.event(harpoon?'harpoon-catch':'fish-killed',fish);
    return result;
  });
  wrap(Game.prototype,'handleWildlifeKill',function(original,event){const result=original(event);this.guide?.event('gull-killed',event.bird);return result;});
  wrap(Game.prototype,'sellCatch',function(original){const before=this.player.inventory.length;const result=original();if(before>0&&!this.player.inventory.length)this.guide?.event('sold');return result;});
  wrap(Wildlife.prototype,'updateBird',function(original,bird,dt){
    if(bird.trainingTarget&&bird.hp>0&&bird.trainingHome){
      bird.stateTime+=dt;bird.object.position.copy(bird.trainingHome);bird.object.position.y+=Math.sin(bird.stateTime*1.4)*.1;
      bird.object.rotation.y=Math.PI*.35;bird.leftWing.rotation.z=Math.sin(bird.stateTime*3)*.14;bird.rightWing.rotation.z=-bird.leftWing.rotation.z;return;
    }
    return original(bird,dt);
  });
  wrap(Wildlife.prototype,'createBird',function(original,index){const bird=original(index);if(index<2){bird.height=5.6+index;bird.radius=18+index*3;bird.speed=.13;}return bird;});
  wrap(Wildlife.prototype,'raycast',function(original,camera,range,aim={x:0,y:0}){
    const result=original(camera,range,aim);if(result)return result;
    this.raycaster.setFromCamera(aim,camera);const ray=this.raycaster.ray;let best=null;
    for(const bird of this.birds){
      if(bird.hp<=0||!bird.object.visible||['falling','down','respawning'].includes(bird.state))continue;
      const delta=bird.object.position.clone().sub(ray.origin), along=delta.dot(ray.direction);
      if(along<0||along>Math.min(range,32))continue;
      const lateral=delta.addScaledVector(ray.direction,-along).length();
      const radius=bird.trainingTarget?.72:.28+Math.min(.16,along*.008);
      if(lateral>radius)continue;
      if(!best||along<best.distance)best={bird,point:bird.object.position.clone(),distance:along,object:bird.object};
    }
    return best;
  });
  wrap(Game.prototype,'destroy',async function(original){
    this.guide?.destroy();this.intro?.destroy();this.harpoon?.destroy();this.captionLayer?.remove();this.catchRibbon?.remove();this.debugBadge?.remove();
    document.removeEventListener('keydown',this.onDebugKey,true);clearTimeout(this.catchRibbonTimer);clearTimeout(this.catchRibbonEndTimer);
    return original();
  });
}
