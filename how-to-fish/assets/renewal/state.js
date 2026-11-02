import {wrap,copy} from '../update/helpers.js';
export const integer=n=>Math.min(Number.MAX_SAFE_INTEGER,Math.max(0,Math.floor(Number(n)||0)));
export const loc=(ru,en)=>globalThis.__TB_LANG__==='en'?en:ru;
export const num=n=>integer(n).toLocaleString(globalThis.__TB_LANG__==='en'?'en-US':'ru-RU');
export function renewal(p){
  p.expedition??={introSeen:false,tutorial:{step:0,completed:false,skipped:false}};
  if(!p.expedition.renewal){
    const s=p.state?.statistics??{},g=integer(s.catchesBySpecies?.coastal_gull);
    p.expedition.renewal={version:1,cycle:0,lifetime:{fish:Math.max(0,integer(s.totalCatches)-g),gulls:g,caught:0,killed:0,legacy:Math.max(0,integer(s.totalCatches)-g)},learned:{rod:0,weapon:0,harpoon:0},harpoon:{power:0,line:0,reel:0},muted:false,cycleWeapon:18};
  }
  const r=p.expedition.renewal;r.version=1;r.cycle=integer(r.cycle);r.cycleWeapon=Number.isFinite(Number(r.cycleWeapon))?Math.max(18,Number(r.cycleWeapon)):18;
  r.lifetime??={};for(const k of ['fish','gulls','caught','killed','legacy'])r.lifetime[k]=integer(r.lifetime[k]);
  r.learned??={};for(const k of ['rod','weapon','harpoon'])r.learned[k]=Math.min(2,integer(r.learned[k]));
  r.harpoon??={};for(const k of ['power','line','reel'])r.harpoon[k]=Math.min(6,integer(r.harpoon[k]));
  r.mastery=integer(r.mastery);r.muted=!!r.muted;return r;
}
export function difficulty(p){
  const r=renewal(p),n=r.cycle;
  return {cycle:n,level:n+1,hp:1+.34*n+.018*n*n,motion:1+.18*Math.log1p(n),pressure:1+.13*Math.log1p(n),damage:1+.2*n,reward:1+.22*n+.08*n*n,weapon:r.cycleWeapon};
}
export function learn(p,tool){const r=renewal(p);if(r.learned[tool]<2){r.learned[tool]++;p._touch('control-learned');}}
export function score(p,kind){
  if(p._qaSandbox15||p._debugSandbox)return;
  const r=renewal(p),s=r.lifetime;
  if(kind==='gulls')s.gulls=integer(s.gulls+1);
  else {s.fish=integer(s.fish+1);s[kind]=integer(s[kind]+1);}
  p._touch('lifetime-score');p._leaderboards15?.schedule();
}
export function installState(ctx){
  const P=ctx.Progression.prototype,G=ctx.Game.prototype;
  wrap(P,'load',async function(original,...args){const r=await original(...args);renewal(this);return r;});
  // A fresh adventure resets the journey, never the player's lifetime record.
  wrap(P,'newGame',function(original,...args){
    const old=copy(renewal(this)),market=copy(this.expedition.market??{});
    const r=original(...args);const fresh=renewal(this);fresh.lifetime=old.lifetime;fresh.learned=old.learned;fresh.muted=old.muted;
    // Ad timers and purchases must not be farmable by resetting an expedition.
    this.expedition.market={...market,receipts:market.receipts??[]};if(args[0]?.save!==false)this._touch('lifetime-preserved');return this.exportSnapshot();
  });
  wrap(P,'importSnapshot',function(original,...args){const r=original(...args);renewal(this);return r;});
  wrap(P,'addCatch',function(original,...args){
    const result=original(...args);
    if(result?.ok&&!this._killInFlight15){const c=result.catch;score(this,c.speciesId==='coastal_gull'?'gulls':c.method==='combat'?'killed':'caught');}
    return result;
  });
  wrap(G,'handleRodCatch',function(original,result){const r=original(result);if(r?.caught||r?.deferred)learn(this.progression,'rod');return r;});
  wrap(G,'handleCombatCatch',function(original,fish){
    if(!fish||fish._rewarded)return original(fish);
    const p=this.progression;p._killInFlight15=true;
    try{const r=original(fish);score(p,'killed');learn(p,'weapon');return r;}finally{p._killInFlight15=false;}
  });
  wrap(G,'handleWildlifeKill',function(original,event){
    const bird=event?.bird;if(!bird||bird._lifeCounted15)return;
    bird._lifeCounted15=true;const p=this.progression;p._killInFlight15=true;
    try{const r=original(event);score(p,'gulls');learn(p,'weapon');return r;}finally{p._killInFlight15=false;}
  });
  wrap(ctx.Wildlife.prototype,'placePatrolBird',function(original,bird,reset=false,...args){const r=original(bird,reset,...args);if(bird&&reset)bird._lifeCounted15=false;return r;});
  for(const name of ['handleWeaponHit','handleWildlifeHit'])wrap(G,name,function(original,event,...args){
    const r=original(event,...args);if(event?.damage>0&&event.weapon?.id!=='harpoon')learn(this.progression,'weapon');return r;
  });
}
