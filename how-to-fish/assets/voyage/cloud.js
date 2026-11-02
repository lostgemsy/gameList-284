import {wrap,copy,el} from '../update/helpers.js';
import {loc} from '../renewal/state.js';

const LIMIT=200*1024, INTERVAL=12000, RETRY=20000;
export function bounded(promise,ms=7000){
  let timer;return Promise.race([Promise.resolve(promise),new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error('Request timeout')),ms);})]).finally(()=>clearTimeout(timer));
}
export function envelope(raw){
  try{
    const v=typeof raw==='string'?JSON.parse(raw):raw;if(!v||typeof v!=='object')return null;
    const data=v.data??v;
    if(!data.story||!data.owned||!Number.isFinite(data.coins)||!Number.isFinite(data.xp))return null;
    return {version:1,revision:Math.max(0,Number(v.revision)||0),updatedAt:Number(v.updatedAt??data.updatedAt)||0,data:copy(data)};
  }catch{return null;}
}
export function newest(a,b){
  if(!a)return b;if(!b)return a;
  return b.updatedAt>a.updatedAt||(b.updatedAt===a.updatedAt&&b.revision>a.revision)?b:a;
}
function mark(e){return e?`${e.updatedAt}:${e.revision}:${e.data.createdAt}:${e.data.statistics?.totalCatches??0}:${e.data.coins}`:'empty';}
const localRead=p=>{try{return envelope(p.storage.getItem(p.saveKey));}catch{return null;}};
function checkpoint(p,snapshot){
  const prior=p.lastEnvelope??localRead(p);
  const e={version:1,revision:(prior?.revision??0)+1,updatedAt:Date.now(),data:copy(snapshot)};
  let ok=false;try{ok=p.storage.setItem(p.saveKey,JSON.stringify(e))!==false;}catch(error){p._recordError('local-checkpoint',error);}
  // A memory copy still survives a temporary storage failure during this run.
  p.lastEnvelope=e;return {e,ok};
}
function state(p){
  return p._cloud17??={ready:false,dirty:null,writing:false,lastAttempt:0,lastRead:0,readMark:null,baseline:null,timer:null,closed:false,conflict:null};
}
function schedule(p,delay=INTERVAL){
  const s=state(p);if(s.closed||s.timer||!p.ysdk)return;
  s.timer=setTimeout(()=>{s.timer=null;p.flushCloud17().catch(error=>p._recordError('cloud-retry',error));},Math.max(0,delay));
}
async function readCloud(p){
  if(!p.player?.getData){if(!p.ysdk?.getPlayer)throw new Error('Player unavailable');p.player=await bounded(p.ysdk.getPlayer());}
  const data=await bounded(p.player.getData([p.saveKey]));
  const raw=data?.[p.saveKey],remote=envelope(raw);
  if(raw!=null&&!remote)throw new Error('Invalid remote adventure');
  return remote;
}
export function installCloud17(ctx){
  const P=ctx.Platform.prototype;
  wrap(P,'_initialize',async function(original,...args){
    // In the uploaded ZIP the SDK must resolve against the hosting origin.
    if(globalThis.location?.protocol==='https:')this.loadSdk=true;
    const r=await original(...args),s=state(this);
    const retry=()=>{if(!s.closed)schedule(this,1000);};
    this._online17=retry;globalThis.addEventListener?.('online',retry);
    this._hide17=()=>{if(document.hidden&&s.dirty)this.flushCloud17().catch(()=>{});};
    globalThis.document?.addEventListener('visibilitychange',this._hide17);
    globalThis.addEventListener?.('pagehide',this._hide17);
    return r;
  });
  P.loadWithMeta=async function(defaults={}){
    await this.init();const s=state(this),local=localRead(this),errors=[];
    s.baseline=local;s.ready=false;let remote=null;
    if(this.ysdk){
      try{remote=await readCloud(this);s.ready=true;s.readMark=mark(remote);s.lastRead=Date.now();}
      catch(error){errors.push(this._recordError('cloud-load',error));schedule(this,RETRY);}
    }
    const chosen=newest(local,remote);this.lastEnvelope=chosen;
    if(chosen){try{this.storage.setItem(this.saveKey,JSON.stringify(chosen));}catch{}}
    s.baseline=chosen;
    // Do not recursively merge inventories, coins, claimed rewards or runs.
    return {data:chosen?copy(chosen.data):(Object.keys(defaults??{}).length?copy(defaults):null),envelope:chosen,sources:{local:!!local,cloud:!!remote},errors};
  };
  P.cacheSnapshot=function(snapshot){
    const {e,ok}=checkpoint(this,snapshot),s=state(this);s.dirty=e;
    schedule(this);return ok;
  };
  P._performSave=async function(snapshot,{cloud=true,flush=false}={}){
    await this.init();const {e,ok}=checkpoint(this,snapshot),s=state(this);
    if(cloud){s.dirty=e;schedule(this);}
    let cloudSaved=false;
    if(cloud&&flush)cloudSaved=await this.flushCloud17();
    return {ok:ok||cloudSaved,localSaved:ok,cloudSaved,envelope:e,errors:[]};
  };
  P.flushCloud17=async function(){
    const s=state(this);if(s.closed||s.writing||!this.ysdk||s.conflict)return false;
    const wait=INTERVAL-(Date.now()-s.lastAttempt);
    if(wait>0){schedule(this,wait);return false;}
    s.writing=true;s.lastAttempt=Date.now();
    try{
      // A failed initial read never grants permission to replace the unseen
      // server state. Read again, then reconcile before the first write.
      if(!s.ready||Date.now()-s.lastRead>120000){
        const remote=await readCloud(this),previousMark=s.readMark;
        const remoteChanged=s.ready?mark(remote)!==previousMark:
          !!remote&&newest(s.baseline,remote)===remote&&mark(remote)!==mark(s.baseline);
        if(remoteChanged&&remote&&s.dirty&&mark(s.dirty)!==mark(remote)){
          s.conflict={local:copy(s.dirty),remote:copy(remote)};
          try{this.storage.setItem(this.saveKey+'.alternate',JSON.stringify(s.conflict));}catch{}
          this.onAdventureConflict17?.(s.conflict);return false;
        }
        s.ready=true;s.readMark=mark(remote);s.lastRead=Date.now();
      }
      if(!s.dirty)return true;
      const writing=copy(s.dirty),serialized=JSON.stringify({[this.saveKey]:writing});
      if(new TextEncoder().encode(serialized).byteLength>LIMIT)throw new Error('Adventure exceeds player-data limit');
      // flush=true means the promise represents a server-confirmed write.
      // One in-flight write, at most one attempt per twelve seconds.
      await bounded(this.player.setData({[this.saveKey]:writing},true),9000);
      s.readMark=mark(writing);s.lastRead=Date.now();s.baseline=writing;
      if(mark(s.dirty)===mark(writing))s.dirty=null;
      return true;
    }catch(error){this._recordError('cloud-save',error);schedule(this,RETRY);return false;}
    finally{s.writing=false;if(s.dirty&&!s.conflict)schedule(this);}
  };
  P.confirmPurchaseSave17=async function(){
    const s=state(this),until=Date.now()+30000;
    while(Date.now()<until){
      if(s.closed||s.conflict||!this.ysdk)return false;
      if(s.writing){await new Promise(r=>setTimeout(r,80));continue;}
      const delay=INTERVAL-(Date.now()-s.lastAttempt);
      if(delay>0){await new Promise(r=>setTimeout(r,Math.min(delay,1000)));continue;}
      if(await this.flushCloud17())return !s.dirty;
      return false;
    }
    return false;
  };
  P.resolveAdventure17=async function(useRemote){
    const s=state(this),c=s.conflict;if(!c)return false;
    const chosen=useRemote?c.remote:(this.lastEnvelope??c.local);
    // Retain the unselected adventure locally; never silently sum balances.
    try{this.storage.setItem(this.saveKey+'.alternate',JSON.stringify(useRemote?c.local:c.remote));}catch{}
    s.ready=true;s.readMark=mark(c.remote);s.lastRead=Date.now();s.conflict=null;
    const result=checkpoint(this,chosen.data);s.dirty=result.e;s.lastAttempt=0;
    await this.flushCloud17();return result.e;
  };
  wrap(P,'destroy',function(original,...args){
    const s=state(this);s.closed=true;clearTimeout(s.timer);
    globalThis.removeEventListener?.('online',this._online17);
    globalThis.removeEventListener?.('pagehide',this._hide17);
    globalThis.document?.removeEventListener('visibilitychange',this._hide17);
    return original(...args);
  });
  wrap(ctx.Game.prototype,'init',async function(original,...args){
    const r=await original(...args),g=this;
    // This is shown only after genuinely divergent offline adventures, never
    // as a recurring status banner or an unsolicited authorization request.
    this.platform.onAdventureConflict17=conflict=>{this._adventureChoice17=conflict;};
    if(this.platform._cloud17?.conflict)this._adventureChoice17=this.platform._cloud17.conflict;
    return r;
  });
  wrap(ctx.Game.prototype,'update',function(original,...args){
    const r=original(...args);
    if(this._adventureChoice17&&!this._choiceShowing17&&!this.intro?.active&&!this.homecoming?.active&&!this.deckEncounter&&!this.oceanEncounter?.fish&&this.fishing?.state==='idle'){
      const c=this._adventureChoice17;this._choiceShowing17=true;this.pause();
      const overlay=el('section','adventure-choice17',null,document.body),card=el('div','adventure-choice17__card',null,overlay);
      overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-label',loc('Выбери путешествие','Choose an adventure'));
      el('h2','',loc('Какое путешествие продолжить?','Which adventure will you continue?'),card);
      el('p','',loc('Есть два разных пути капитана. Выбери тот, который хочешь продолжить.','There are two different captain’s journeys. Choose the one to continue.'),card);
      for(const [remote,e,title] of [[false,this.platform.lastEnvelope??c.local,loc('На этом устройстве','On this device')],[true,c.remote,loc('На другом устройстве','On another device')]]){
        const d=e.data,b=el('button','secondary-btn',`${title} · ${loc('ранг','rank')} ${d.rank} · ${d.discoveredSpecies?.length??0} ${loc('видов','species')}`,card);b.type='button';
        b.onclick=async()=>{
          card.querySelectorAll('button').forEach(n=>n.disabled=true);
          try{
            await this.platform.resolveAdventure17(remote);
            if(remote){location.reload();return;}
            overlay.remove();this._adventureChoice17=null;this._choiceShowing17=false;this.resume();
          }catch{card.querySelectorAll('button').forEach(n=>n.disabled=false);}
        };
      }
      card.querySelector('button')?.focus();
    }
    return r;
  });
}
