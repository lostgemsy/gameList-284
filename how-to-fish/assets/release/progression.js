import {wrap,copy} from '../update/helpers.js';
export const CARGO_SLOTS={patched_raft:0,coastal_skiff:4,rescue_launch:8,wind_cutter:12,storm_longship:18,homeward_ship:22};
export const PROTECTION={patched_raft:0,coastal_skiff:.15,rescue_launch:.30,wind_cutter:.45,storm_longship:.60,homeward_ship:.70};

export function installProgression(ctx){
  const {Progression:P,Combat,Platform,data}=ctx;
  const boat=id=>data.boats.find(b=>b.id===id);
  // One shared catch inventory: unloading at shore never deletes a boat's cargo.
  wrap(P.prototype,'getInventoryCapacity',function(original){
    const c=original(),b=boat(this.state.equipped.boatId),slots=CARGO_SLOTS[b?.id]||0,kg=b?.cargoWeightBonusKg||0;
    c.baseSlots=c.slots;c.baseWeightKg=c.maxWeightKg;c.boatSlots=slots;c.boatWeightKg=kg;
    c.slots+=slots;c.maxWeightKg+=kg;
    c.remainingSlots=Math.max(0,c.slots-c.usedSlots);c.remainingWeightKg=Math.max(0,Math.round((c.maxWeightKg-c.usedWeightKg)*100)/100);
    c.full=c.remainingSlots===0||c.remainingWeightKg<=0;c.overloaded=c.usedSlots>c.slots||c.usedWeightKg>c.maxWeightKg+.001;
    return c;
  });
  wrap(P.prototype,'equip',function(original,type,id){
    if(type==='boat'&&id!==this.state.equipped.boatId){
      const b=boat(id),c=this.getInventoryCapacity();
      if(b&&(c.usedSlots>c.baseSlots+(CARGO_SLOTS[id]||0)||c.usedWeightKg>c.baseWeightKg+b.cargoWeightBonusKg+.001))
        return {ok:false,reason:'cargo-too-large',message:'Сначала продай улов: в этой лодке трюм меньше.'};
    }
    const r=original(type,id);this.completeHarborObjectives();return r;
  });
  // Infinite reserve, finite magazine. Do not serialize Infinity into save data.
  wrap(P.prototype,'getAmmo',function(original,id=this.state.equipped.weaponId){
    const a=original(id),w=data.weapons.find(w=>w.id===id);return {...a,reserve:w?.reserveAmmo??a.reserve,infiniteReserve:true};
  });
  wrap(P.prototype,'reload',function(original,id=this.state.equipped.weaponId){
    const w=data.weapons.find(w=>w.id===id),a=this._ensureAmmo(id);
    if(a&&w)a.reserve=w.reserveAmmo;
    const r=original(id);if(a&&w)a.reserve=w.reserveAmmo;return r;
  });
  wrap(Combat.prototype,'notifyAmmo',function(original){
    this.onAmmoChange?.({ammo:this.ammo,reserve:'∞',reloading:this.reloadTimer>0,infinite:false,infiniteReserve:true,weapon:this.weapon});
  });
  wrap(Combat.prototype,'textState',function(original){return {...original(),reserve:'∞',infiniteAmmo:false,infiniteReserve:true};});
  // A synchronous local checkpoint precedes debounced cloud synchronization.
  Platform.prototype.cacheSnapshot=function(snapshot){
    try{
      const prior=this.lastEnvelope;
      const envelope={version:1,revision:(prior?.revision??0)+1,updatedAt:Date.now(),data:copy(snapshot)};
      const ok=this.storage.setItem(this.saveKey,JSON.stringify(envelope));
      if(ok!==false)this.lastEnvelope=envelope;
      return ok!==false;
    }catch(error){this._recordError('local-checkpoint',error);return false;}
  };
  wrap(P.prototype,'_touch',function(original,reason,payload={},save=true){
    const r=original(reason,payload,save);
    if(save&&!this._debugSandbox&&!this._disposed)this.adapter?.cacheSnapshot?.(this.exportSnapshot());
    return r;
  });
  // Retrospective evidence is deliberately limited to introductory objectives.
  // Later quests still require their real game events and are not fabricated.
  P.prototype.completeHarborObjectives=function(){
    if(this._completingHarbor||!this.state)return;
    this._completingHarbor=true;
    try{
      for(let i=0;i<3;i++){
        const id=this.state.story.activeQuestId;
        const proven=id==='first_cast'?this.state.statistics.totalCatches>=1:
          id==='first_market_day'?this.state.statistics.totalSold>=1:
          id==='pier_license'?this.state.owned.boats.includes('coastal_skiff'):false;
        if(!proven)break;
        const status=this.getQuestStatus(id);if(!status?.unlock.unlocked)break;
        const entry=this.state.story.progress[id];
        entry.objectives=status.definition.objectives.map(()=>({value:1,target:1,keys:[],streak:0}));
        entry.completed=true;entry.completedAt=this.now();
        const r=this.claimRewards('quest',id);if(!r.ok)break;
        if(id==='first_market_day'&&this.expedition)this.expedition.license=true;
        this.emit('harbor-reward',{id,granted:r.granted});
      }
    }finally{this._completingHarbor=false;}
  };
  for(const method of ['addCatch','sellAll','buy'])wrap(P.prototype,method,function(original,...args){
    const r=original(...args);this.completeHarborObjectives();return r;
  });
  wrap(P.prototype,'load',async function(original,...args){
    const r=await original(...args);this.completeHarborObjectives();return this.exportSnapshot();
  });
}
