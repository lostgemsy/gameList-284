import {wrap,copy} from '../update/helpers.js';
import {loc} from '../renewal/state.js';

// Story rewards finance the next expedition. Rank remains a score, not a
// second, hidden requirement on top of the completed story chapter.
export const PRICES={
  coastal_skiff:650,rescue_launch:2600,wind_cutter:6000,storm_longship:18000,
  reef_fiberglass:180,bluewater_carbon:1100,abyss_composite:4200,astral_titanium:14000,
  reef_revolver:400,breaker_shotgun:1400,current_smg:3200,mariner_rifle:7000,leviathan_rifle:18000,
  reinforced_creel:120,insulated_hold:500,deck_crates:1600,pressure_vault:4800,leviathan_hold:12000
};
const goal=(type,count,extra={})=>({type,count,...extra});
export const CHAPTERS={
  reef_survey:[goal('catch_count',4,{zoneId:'islands'}),goal('unique_species',2,{zoneId:'islands'})],
  ray_watch:[goal('catch_species',1,{speciesId:'lagoon_ray'}),{type:'deal_damage',amount:90,weaponTierAtLeast:1}],
  bluewater_license:[goal('perfect_reels',2),goal('catch_size_percentile',1,{percentile:.65,zoneId:'islands'})],
  pelagic_notes:[goal('catch_count',4,{zoneId:'open_sea'}),goal('unique_species',2,{zoneId:'open_sea'})],
  abyss_key:[{type:'own_item',itemId:'wind_cutter'},goal('catch_size_percentile',1,{percentile:.70,zoneId:'open_sea'})],
  lights_below:[goal('catch_count',3,{zoneId:'abyss'}),goal('unique_species',2,{zoneId:'abyss'})],
  open_the_stormgate:[goal('collection_species',9),{type:'own_item',itemId:'storm_longship'},goal('catch_size_percentile',1,{percentile:.70,zoneId:'abyss'})]
};
const count=n=>Math.max(0,Math.floor(Number(n)||0));
export function voyage(p){
  p.expedition??={};
  const v=p.expedition.voyage??={version:1,layout:1,zones:{},perfect:0,defeats:{},hints:[],runId:globalThis.crypto?.randomUUID?.()??`voyage-${Date.now()}-${Math.random().toString(36).slice(2)}`};
  v.zones??={};v.defeats??={};v.hints??=[];return v;
}
const zoneLog=(v,id)=>v.zones[id]??={catches:0,species:[],largest:0,rare:0};
function retrospective(p,q,entry){
  const v=voyage(p);
  q.objectives.forEach((o,i)=>{
    const e=entry.objectives[i];if(!e)return;
    let evidence=null,keys=null;
    const z=v.zones[o.zoneId];
    if(o.type==='catch_count'&&o.zoneId)evidence=z?.catches??0;
    if(o.type==='unique_species'&&o.zoneId){keys=z?.species??[];evidence=keys.length;}
    if(o.type==='catch_size_percentile'&&o.zoneId)evidence=(z?.largest??0)>=o.percentile?1:0;
    if(o.type==='perfect_reels')evidence=v.perfect??0;
    if(o.type==='defeat_species')evidence=v.defeats[o.speciesId]??0;
    if(o.type==='catch_species')evidence=p.state.statistics.catchesBySpecies[o.speciesId]??0;
    if(evidence!==null){e.value=Math.max(e.value??0,evidence);if(keys)e.keys=[...new Set([...(e.keys??[]),...keys])];}
  });
}
export function installBalance17(ctx){
  const {data,Progression:P,UI}=ctx;
  for(const q of data.quests){q.unlock.level=0;if(CHAPTERS[q.id])q.objectives=copy(CHAPTERS[q.id]);}
  for(const kind of ['boats','rods','weapons','inventory'])for(const item of data[kind]){
    if(PRICES[item.id]!==undefined)item.price=PRICES[item.id];
    if(item.unlock?.level)item.unlock.level=0;
  }
  data.inventory.find(i=>i.id==='pressure_vault').maxWeightKg=1100;
  data.inventory.find(i=>i.id==='leviathan_hold').maxWeightKg=2000;
  // The skiff is the objective of pier_license, so it must NOT require that
  // same quest to be claimed first. This also works for migrated old saves.
  data.boats.find(b=>b.id==='coastal_skiff').unlock={questId:'first_market_day'};
  for(const z of data.zones){if(z.unlock?.level)z.unlock.level=0;z.travelCost=0;}
  for(const f of data.fish){if(f.unlock?.level)f.unlock.level=0;}

  wrap(UI.prototype,'_objectiveLabel',function(original,o,...args){
    const ru=globalThis.__TB_LANG__!=='en';
    const zone=data.zones.find(z=>z.id===o.zoneId),suffix=zone?` · ${ctx.nameOf(zone)}`:'';
    if(o.type==='catch_count'&&o.zoneId)return (ru?'Поймать любую рыбу':'Catch any fish')+suffix;
    if(o.type==='catch_size_percentile')return (ru?`Поймать крупную рыбу (верхние ${Math.round((1-o.percentile)*100)}% размера вида)`:`Catch a large fish (top ${Math.round((1-o.percentile)*100)}% of its species)`)+suffix;
    return original(o,...args);
  });
  // Normalize the old objective layout before the base passive synchronizer
  // touches it. Its previous index-based targets must not leak into new goals.
  wrap(P.prototype,'_adapterLoad',async function(original,...args){
    const data=await original(...args);this._legacyLayout17=!!data&&!data.expedition?.voyage?.layout;return data;
  });
  wrap(P.prototype,'_getProgressEntry',function(original,container,q){
    const existed=!!container[q.id],entry=original(container,q);
    if(container===this.state.story.progress&&CHAPTERS[q.id]&&!entry.layout17&&!this.state.story.claimed.includes(q.id)){
      if(existed&&this._legacyLayout17){
        if(q.id==='bluewater_license')voyage(this).perfect=Math.max(voyage(this).perfect??0,count(entry.objectives.find(o=>o.target===5)?.value));
        entry.objectives=q.objectives.map(o=>({value:entry.completed?(o.count??o.amount??1):0,target:o.count??o.amount??1,keys:[],streak:0}));
      }
      entry.layout17=true;
    }
    return entry;
  });
  // Base catch_count/size/perfect objectives previously ignored zoneId.
  wrap(P.prototype,'_updateObjective',function(original,o,e,event){
    if(o.zoneId&&event.type==='catch'&&event.zoneId!==o.zoneId)return false;
    return original(o,e,event);
  });
  wrap(P.prototype,'applyGameplayEvent',function(original,event,...args){
    if(event?.type==='catch'){
      const v=voyage(this),f=data.fish.find(f=>f.id===event.speciesId),z=zoneLog(v,event.zoneId??'pier');
      z.catches++;if(!z.species.includes(event.speciesId))z.species.push(event.speciesId);
      const a=f?.sizeRangeM?.[0]??0,b=f?.sizeRangeM?.[1]??1;
      const percentile=Number.isFinite(event.sizePercentile)?event.sizePercentile:(Number(event.sizeM)-a)/Math.max(.001,b-a);
      z.largest=Math.max(z.largest,Math.max(0,Math.min(1,percentile||0)));
      if(['rare','epic','legendary','mythic'].includes(event.rarity??f?.rarity))z.rare++;
      if(event.perfectReel)v.perfect=count(v.perfect)+1;
    }else if(event?.type==='defeat'){
      const v=voyage(this);v.defeats[event.speciesId]=count(v.defeats[event.speciesId])+1;
    }
    return original(event,...args);
  });
  // Real earlier accomplishments count. For example a large tuna caught while
  // surveying the sea must not have to be caught all over again one quest later.
  wrap(P.prototype,'_syncPassiveObjectives',function(original,...args){
    const r=original(...args),q=data.quests.find(q=>q.id===this.state.story.activeQuestId);
    if(q&&!this.state.story.claimed.includes(q.id)){
      const e=this._getProgressEntry(this.state.story.progress,q);retrospective(this,q,e);
      if(q.objectives.every((o,i)=>this._isObjectiveComplete(o,e.objectives[i]))){e.completed=true;e.completedAt??=this.now();}
    }
    return r;
  });
  // A completed chapter pays once and advances immediately. The journal keeps
  // the completed chapter, rewards, and all unique story scenes intact.
  P.prototype.settleVoyageChapter17=function(){
    if(this._settling17||!this.state||this._voyageLoading17)return;
    this._settling17=true;
    try{
      for(let i=0;i<data.quests.length;i++){
        this._syncPassiveObjectives();const id=this.state.story.activeQuestId;
        const q=this.getQuestStatus(id);
        if(!q?.completed||!q.unlock.unlocked||this.state.story.claimed.includes(id))break;
        const r=this.claimRewards('quest',id);if(!r.ok)break;
        this.emit('voyage-chapter',{id,granted:r.granted});
      }
    }finally{this._settling17=false;}
  };
  for(const method of ['addCatch','sellAll','buy','equip','applyGameplayEvent'])wrap(P.prototype,method,function(original,...args){
    const r=original(...args);this.settleVoyageChapter17();return r;
  });
  const migrate=p=>{
    const had=!p._legacyLayout17,v=voyage(p);
    if(!had){
      // Only recover evidence present in the old save: catches of a species
      // native to one zone, existing per-species records, and stored objectives.
      for(const f of data.fish){
        const zones=f.spawnZones??[];
        if(zones.length!==1)continue;
        const n=count(p.state.statistics.catchesBySpecies[f.id]);if(!n)continue;
        const z=zoneLog(v,zones[0]);z.catches+=n;z.species.push(f.id);
        const rec=p.state.bestSizeRecords[f.id],size=typeof rec==='number'?rec:rec?.sizeM;
        if(Number.isFinite(size))z.largest=Math.max(z.largest,(size-f.sizeRangeM[0])/(f.sizeRangeM[1]-f.sizeRangeM[0]));
      }
      const old=p.state.story.progress.bluewater_license?.objectives?.find(o=>o.target===5);
      if(old)v.perfect=count(old.value);
    }
    for(const q of data.quests){
      const e=p.state.story.progress[q.id];if(!e||p.state.story.claimed.includes(q.id))continue;
      if(CHAPTERS[q.id]&&!e.layout17){
        const completed=e.completed;
        e.objectives=q.objectives.map(o=>({value:completed?(o.count??o.amount??1):0,target:o.count??o.amount??1,keys:[],streak:0}));
        e.layout17=true;e.completed=completed;
      }
      retrospective(p,q,e);
    }
    v.layout=1;p._legacyLayout17=false;p._syncPassiveObjectives();
  };
  wrap(P.prototype,'load',async function(original,...args){
    this._voyageLoading17=true;
    try{await original(...args);migrate(this);}finally{this._voyageLoading17=false;}
    this.settleVoyageChapter17();return this.exportSnapshot();
  });
  wrap(P.prototype,'importSnapshot',function(original,...args){
    this._voyageLoading17=true;this._legacyLayout17=!!args[0]&&!args[0].expedition?.voyage?.layout;try{original(...args);migrate(this);}finally{this._voyageLoading17=false;}
    this.settleVoyageChapter17();return this.exportSnapshot();
  });
  wrap(P.prototype,'newGame',function(original,...args){const r=original(...args);voyage(this);return this.exportSnapshot();});
  wrap(ctx.Game.prototype,'init',async function(original,...args){
    const r=await original(...args);
    this.progression.on('voyage-chapter',({id})=>{
      const q=data.quests.find(q=>q.id===id);if(q&&this.mode==='playing')this.toast(loc(`Глава завершена: ${ctx.nameOf(q)}`,`Chapter complete: ${ctx.nameOf(q)}`),'quest');
    });
    return r;
  });
}
