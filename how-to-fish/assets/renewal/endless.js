import {wrap,copy,el,putOnGround} from '../update/helpers.js';
import {HomecomingStory,storyState} from '../homecoming/story.js';
import {renewal,difficulty,loc,num} from './state.js';
import {dialog} from './dialog.js';
export function installEndless(ctx){
  const G=ctx.Game.prototype;
  G.offerNextCycle15=function(){
    if(!storyState(this.progression).shipAwarded&&!storyState(this.progression).endingSeen)return false;
    const next=renewal(this.progression).cycle+2,d=dialog(this,loc(`Следующая экспедиция · сложность ${num(next)}`,`Next expedition · difficulty ${num(next)}`));
    el('p','',loc('Острова снова ждут тебя. Рыба станет крепче и проворнее, течение — сильнее, а опасные обитатели будут наносить больше урона. Последнего уровня сложности нет.','The islands await again. Fish become tougher and quicker, currents stronger, and dangerous creatures hit harder. There is no final difficulty level.'),d.body);
    el('p','renewal-muted',loc('Улов будет продаваться дороже. В мастерской открывается мастерство снаряжения без последнего уровня: повышай урон, скорость вываживания и тягу гарпуна за монеты.','Your catch sells for more. The workshop unlocks equipment mastery with no final upgrade level: spend coins to improve damage, reeling speed and harpoon hauling.'),d.body);
    el('p','renewal-personal',loc('Сохраняются монеты, ранг, купленные снасти, суда, улучшения и вся статистика рейтингов. Улов автоматически продаётся. Маршруты, задания и коллекция текущей экспедиции начинаются заново.','Keep coins, rank, purchased tackle, boats, upgrades and all lifetime scores. Your catch is sold automatically. Routes, quests and the current expedition’s collection start afresh.'),d.body);
    const button=el('button','primary-btn',loc(`Начать сложность ${num(next)}`,`Start difficulty ${num(next)}`),d.body);button.type='button';
    button.onclick=async()=>{button.disabled=true;const result=await this.beginNextCycle15();if(!result.ok&&!d.closed){button.disabled=false;el('p','renewal-status',loc('Не удалось начать экспедицию. Прогресс сохранён.','Could not start the expedition. Progress is saved.'),d.body);}};return true;
  };
  G.beginNextCycle15=async function(){
    if(this._nextCycleBusy15)return {ok:false,reason:'busy'};
    const p=this.progression;if(!storyState(p).shipAwarded&&!storyState(p).endingSeen)return {ok:false,reason:'not-completed'};
    this._nextCycleBusy15=true;let rollback;
    try{
      this.renewalDialog?.close();this.closeHarborDialog14?.();if(this.catchShowcase?.isOpen)this.catchShowcase.close('continue');if(this.homecoming.ending)this.homecoming.finishEnding();if(this.homecoming.active)this.homecoming.close();
      if(this.mode==='paused')this.resume();if(this.panelOpen)this.closePanel();
      this.harpoon.cancel();this.fishing.cancel();this.guide.clearTarget();this.guide.active=false;this.guide.card.hidden=true;this.guide.marker.hidden=true;document.body.classList.remove('guide-active');
      this.oceanEncounter?.reset();this.leaveBoatMode({silent:true,resetController:true});if(this.deckEncounter){this.fishSystem.remove(this.deckEncounter,0);this.deckEncounter=null;}
      p.sellAll();rollback=p.exportSnapshot();const keep=copy(rollback),r=copy(renewal(p));r.cycle++;
      const best=ctx.data.weapons.filter(w=>keep.owned.weapons.includes(w.id)).reduce((m,w)=>Math.max(m,w.damage*(w.pellets??1)),18);
      r.cycleWeapon=best;
      // Commit the new run synchronously: no asynchronous gap with half-reset data.
      p.newGame({preserveSettings:true,save:false});const fresh=p.exportSnapshot();
      for(const key of ['coins','rank','xp','upgrades','inventoryTierId','ammo','equipped','maxHealth'])fresh[key]=copy(keep[key]);
      for(const key of ['weapons','rods','boats','inventoryUpgrades','titles'])fresh.owned[key]=copy(keep.owned[key]);
      fresh.health=fresh.maxHealth;fresh.catchInventory=[];
      fresh.expedition={...fresh.expedition,renewal:r,introSeen:true,license:true,tutorial:{step:10,completed:true,skipped:false},market:copy(keep.expedition.market??{}),homecoming:{version:1,welcomed:true,giftsReceived:true,leviathanCaught:false,shipAwarded:false,endingSeen:false,visited:['pier']}};
      p.importSnapshot(fresh,{save:false});this.homecoming.pendingEnding=false;this.hasSave=true;
      this.player.tool='rod';this.toolView.setTool('rod');this.syncProgressionState(true);
      if(this.zoneSystem.currentZoneId!=='pier'){
        const travel=await this.zoneSystem.travel('pier',{force:true,ignoreCost:true,immediate:true,duration:.35});if(!travel.ok)throw new Error('new-cycle-travel');
      }else this.handleZoneChanged({zone:this.zoneSystem.currentZone,center:new ctx.T.Vector3(0,0,0)});
      putOnGround(this,3,8);this.player.yaw=0;this.player.pitch=-.08;this.camera.position.copy(this.player.position);this.camera.rotation.set(this.player.pitch,0,0,'YXZ');
      this.input.reset();this.input.enabled=true;this.mode='playing';this.panelOpen=false;this.platform.startGameplay();this.updateUI();
      p._touch('next-expedition');const saved=await p.saveNow();
      this.toast(loc(`Экспедиция ${num(r.cycle+1)}. Море стало опаснее!`,`Expedition ${num(r.cycle+1)}. The sea is more dangerous!`),'zone');
      return {ok:true,cycle:r.cycle,saved};
    }catch(error){
      if(rollback){p.importSnapshot(rollback);this.syncProgressionState(true);await p.saveNow();}
      this.toast(loc('Не удалось сменить экспедицию. Прогресс восстановлен.','Could not change expedition. Your progress was restored.'),'warning');return {ok:false,reason:String(error)};
    }finally{this._nextCycleBusy15=false;}
  };
  wrap(HomecomingStory.prototype,'startEnding',async function(original,...args){
    const result=await original(...args);if(!this.ending||!this.endingOverlay||this.endingOverlay.querySelector('[data-next-cycle15]'))return result;
    const box=this.endingOverlay.querySelector('.ending-copy'),next=renewal(this.game.progression).cycle+2;
    el('p','renewal-ending-note',loc('Сохрани снаряжение и брось вызов более сильному морю.','Keep your gear and challenge a stronger sea.'),box);
    const b=el('button','secondary-btn',loc(`СЛЕДУЮЩАЯ СЛОЖНОСТЬ · ${num(next)}`,`NEXT DIFFICULTY · ${num(next)}`),box);b.dataset.nextCycle15='';b.type='button';b.onclick=()=>{this.finishEnding();this.game.offerNextCycle15();};return result;
  });
  wrap(HomecomingStory.prototype,'finishEnding',function(original,...args){const r=original(...args);this.game.updateUI();return r;});
}
