import {wrap,el} from '../update/helpers.js';
import {HomecomingStory,installStoryProgression,storyState,goalText} from './story.js';
import {installWorld,WorldPolish} from './world.js';
export function installHomecoming(ctx){
  const {Game,UI,BoatController,Progression,T}=ctx;
  installStoryProgression(ctx);installWorld(ctx);
  wrap(Game.prototype,'setupZoneSystem',function(original,...args){const r=original(...args);if(this.boatController)this.boatController.game=this;return r;});
  // Anchoring is retired. Casts gently stop the boat; the next movement input sails.
  BoatController.prototype.setAnchored=function(){this.state.anchored=false;this.state.anchorReason=null;return true;};
  BoatController.prototype.prepareFishing=function(){
    if(!this.isPiloting)return{ok:false,reason:'not-piloting'};
    Object.assign(this.state,{anchored:false,anchorReason:null,throttle:0,steering:0,speed:0,boosting:false,bank:0,pitch:0});
    this.state.velocity.set(0,0,0);this._setEngine?.(false);return{ok:true,droppedAnchor:false};
  };
  wrap(BoatController.prototype,'_readControls',function(original,...args){
    const c=original(...args);c.anchor=false;c.anchorToggle=false;this.state.anchored=false;this.state.anchorReason=null;
    const g=this.game;if(g&&(g.fishing.state!=='idle'||g.deckEncounter||g.harpoon?.state==='tethered')){c.throttle=0;c.steer=0;c.boost=false;this.state.speed=0;this.state.velocity.set(0,0,0);}
    return c;
  });
  wrap(Game.prototype,'updateBoatHUD',function(original,...args){
    const r=original(...args);const s=this.boatController?.state;
    if(this.ui['boat-status']&&s)this.ui['boat-status'].textContent=s.boundaryContact?'Край района · поверни обратно':s.exclusionContact?'Мелководье · отойди от берега':
      this.fishing?.state!=='idle'?'Лови с борта · лодка ждёт окончания ловли':this.input.isTouch?'Стик — плыть · действие — ловить с борта':'WASD — плыть · ЛКМ — ловить с борта · E — высадка';
    return r;
  });
  const compactCatch=Game.prototype.showCatchResult;
  Game.prototype.showCatchResult=function(caught,result){
    if(!caught?.ok||!result?.species)return;
    if(caught.firstDiscovery&&this.catchShowcase){
      this.catchRibbon?.classList.remove('visible');document.body.classList.remove('catch-visible');
      this.panelOpen=true;this.input.enabled=false;this.input.reset();document.exitPointerLock?.();this.audio.setReel(false);this.platform.stopGameplay();
      this.catchShowcase.show({caught,result,displayName:ctx.nameOf(result.species),reducedMotion:!!this.progression.state.settings.reducedMotion});
    }else{
      compactCatch.call(this,caught,result);const icon=this.catchRibbon?.querySelector('.catch-ribbon__icon');
      if(icon){icon.textContent='';ctx.paintArt(icon,result.species.id,{label:ctx.nameOf(result.species)})||ctx.paintIcon(icon,result.species.id,{label:ctx.nameOf(result.species)});}
    }
  };
  wrap(Game.prototype,'init',async function(original,...args){
    const r=await original(...args);this.homecoming=new HomecomingStory(this,ctx);this.worldPolish=new WorldPolish(this,ctx);
    const menu=el('button','main-menu-button',null,document.querySelector('#hud'));menu.type='button';menu.setAttribute('aria-label','Меню и настройки');
    menu.innerHTML='<span class="menu-bars" aria-hidden="true">☰</span><span><strong>МЕНЮ</strong><small>Настройки · Esc</small></span>';
    menu.onclick=()=>{if(this.mode==='playing'&&!this.intro?.active)this.pause();};this.largeMenu=menu;
    const pause=document.querySelector('#pause-menu .pause-card');
    const settings=el('button','secondary-btn home-settings','НАСТРОЙКИ',pause);settings.type='button';settings.onclick=()=>{this.resume();this.openPanel('settings');};
    el('p','pause-goal','Пять островов. Один легендарный улов. Корабль домой.',pause);
    this.uiManager.refresh();
    if(ctx.qa){ctx.homecomingVersion='1.3.0';const old=window.render_game_to_text;
      window.render_game_to_text=()=>JSON.stringify({...JSON.parse(old()),release:'1.3.0',homecoming:{...storyState(this.progression),dialogue:this.homecoming.active,ending:this.homecoming.ending},groundArrows:this.worldPolish.arrows.filter(a=>a.visible).length});}
    return r;
  });
  wrap(Game.prototype,'start',function(original,...args){
    const r=original(...args);const s=this.homecoming?.state;
    if(s&&!s.welcomed&&this.progression.expedition.introSeen&&!this.intro.active)this.homecoming.welcome();
    return r;
  });
  wrap(Game.prototype,'startNewGame',async function(original,...args){
    if(this.homecoming?.active)this.homecoming.close();this.worldPolish?.resetPath();return original(...args);
  });
  wrap(Game.prototype,'update',function(original,dt){
    if(this.mode!=='playing'||this.platformPaused)return;
    dt=Math.min(.1,Math.max(0,dt));
    if(this.homecoming?.active||this.homecoming?.ending){this.homecoming.update(dt);return;}
    original(dt);this.homecoming?.update(dt);
    if(!this.intro?.active)this.worldPolish?.update(dt);
  });
  wrap(Game.prototype,'applyLookInput',function(original,...args){if(this.homecoming?.active||this.homecoming?.ending)return;return original(...args);});
  wrap(Game.prototype,'openPanel',function(original,...args){if(this.homecoming?.active||this.homecoming?.ending)return false;return original(...args);});
  wrap(Game.prototype,'render',function(original,...args){this.intro?.syncAudio?.();return original(...args);});
  wrap(Game.prototype,'pause',function(original,...args){const r=original(...args);this.intro?.syncAudio?.();return r;});
  wrap(Game.prototype,'resume',function(original,...args){const r=original(...args);if(this.homecoming?.active||this.homecoming?.ending){this.input.enabled=false;this.platform.stopGameplay();}return r;});
  wrap(Game.prototype,'handleZoneChanged',function(original,...args){
    const r=original(...args),p=this.progression;if(p?.expedition){const s=storyState(p);if(!s.visited.includes(this.player.zone)){s.visited.push(this.player.zone);p._touch('island-visited');}}
    this.worldPolish?.rebuild();return r;
  });
  wrap(UI.prototype,'_renderShopCard',function(original,type,item){
    const card=original(type,item);
    if(type==='boat'&&item.id==='homeward_ship'){
      card.classList.add('homeward-reward');card.querySelector('p').textContent='Личный парусный корабль Макара. Награда за поимку Левиафана — не продаётся.';
      card.querySelector('.goal-pin')?.remove();card.querySelector('.honest-price')?.remove();
      const lock=card.querySelector('.item-action.locked,.item-action:disabled');if(!this.progression.state.owned.boats.includes(item.id)&&lock)lock.textContent='НАГРАДА: ПОЙМАЙ ЛЕВИАФАНА';
    }
    return card;
  });
  wrap(UI.prototype,'_findNextGoal',function(original,...args){
    const next=original(...args);if(next?.entry?.id!=='homeward_ship')return next;
    const choices=[];
    for(const type of ['weapon','rod','boat','inventory','upgrade'])for(const entry of this._shopEntries(type)){
      if(entry.id==='homeward_ship'||this._isOwned(type,entry.id))continue;
      const price=type==='upgrade'?entry.levels[this.progression.state.upgrades[entry.id]||0]?.cost:entry.price;
      if(!(price>0))continue;choices.push({type,entry,price,unlocked:this.progression.getUnlockStatus(entry).unlocked});
    }
    choices.sort((a,b)=>Number(b.unlocked)-Number(a.unlocked)||a.price-b.price);return choices[0]??null;
  });
  function journeyPanel(ui,full=false){
    const p=ui.progression,s=storyState(p),box=el('section','journey-panel',null);
    el('small','','ГЛАВНАЯ ЦЕЛЬ · ДОРОГА ДОМОЙ',box);el('h3','',s.shipAwarded?'Корабль «Возвращение» получен':'Поймай Левиафана и получи корабль домой',box);
    el('p','',goalText(p,ctx),box);
    if(full){
      const path=el('div','journey-route',null,box);
      for(const z of ctx.data.zones){const n=el('span','',null,path);n.classList.toggle('is-visited',s.visited.includes(z.id));n.classList.toggle('is-current',z.id===ui.currentZoneId);el('b','',String(z.order+1).padStart(2,'0'),n);el('span','',ctx.nameOf(z),n);}
      el('p','journey-optional','Двигайся вперёд: новые виды → крупные трофеи → морские испытания → новый маршрут. Награды глав помогут улучшить лодку и снасти. На каждом острове доступны лавка и продажа. На старые берега возвращайся по желанию — за спокойной рыбалкой и коллекцией.',box);
    }
    return box;
  }
  wrap(UI.prototype,'_renderMap',function(original,...args){original(...args);this.dom.panelContent.prepend(journeyPanel(this,true));});
  wrap(UI.prototype,'_renderQuests',function(original,...args){original(...args);this.dom.panelContent.prepend(journeyPanel(this,false));});
  wrap(Game.prototype,'destroy',async function(original,...args){this.homecoming?.destroy();this.worldPolish?.destroy();this.largeMenu?.remove();return original(...args);});
}
