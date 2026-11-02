/* How to fish 1.11 — platform technical lifecycle hardening.
   WebAudio only: backgrounding physically stops every source and suspends the
   context. Loop positions are remembered so foregrounding behaves as pause/
   resume to the player rather than restarting ambience or music. */
import {wrap} from '../update/helpers.js';

const finite=(v,f=0)=>Number.isFinite(Number(v))?Number(v):f;
const disconnect=node=>{try{node?.disconnect?.();}catch{}};

function loopOffset(audio,channel,request){
  const active=audio.activeLoops.get(channel),options=request?.options??{};
  let base=finite(active?._resumeBase111,finite(options.offset,0));
  if(!active||!audio.context)return Math.max(0,base);
  const started=finite(active._resumeStarted111,audio.context.currentTime),rate=Math.max(.01,finite(active.source?.playbackRate?.value,finite(options.playbackRate??options.rate,1)));
  let offset=base+Math.max(0,audio.context.currentTime-started)*rate;
  const duration=finite(active.source?.buffer?.duration,0);
  if(duration>0)offset=((offset%duration)+duration)%duration;
  return Math.max(0,offset);
}

function snapshotLoops(audio){
  const map=new Map();
  for(const [channel,request] of audio.loopRequests){
    map.set(channel,{id:request.id,options:{...request.options,offset:loopOffset(audio,channel,request)}});
  }
  audio._lifecycleLoopSnapshots111=map;
  return map;
}

function hardStopSources(audio){
  if(!audio._lifecycleLoopSnapshots111)snapshotLoops(audio);
  // One-shots are deliberately not resumed: they are short effects and must
  // never finish in the background. Continuous sounds are restored below.
  audio.stopAllOneShots?.(0);
  audio.stopAllLoops?.(0);
}

async function suspendContext(audio){
  const context=audio.context;
  if(!context||context.state==='closed'||context.state==='suspended')return;
  try{await context.suspend?.();}catch(error){audio._recordError?.('lifecycle-suspend111',error);}
}

async function restoreLoops(audio){
  if(audio.destroyed||audio.lifecyclePauseReasons.size||audio.muted||!audio.unlocked)return false;
  const context=audio.context;
  if(!context||context.state==='closed')return false;
  try{if(context.state==='suspended'||context.state==='interrupted')await context.resume?.();}
  catch(error){audio._recordError?.('lifecycle-resume111',error);return false;}
  if(context.state!=='running')return false;
  const snapshots=audio._lifecycleLoopSnapshots111;
  if(!snapshots?.size){audio._lifecycleLoopSnapshots111=null;return true;}
  audio._lifecycleLoopSnapshots111=null;
  for(const [channel,saved] of snapshots){
    try{await audio.setLoop(channel,saved.id,{...saved.options,offset:finite(saved.options?.offset,0),fadeMs:0});}
    catch(error){audio._recordError?.('lifecycle-loop-resume111',error,saved.id);}
  }
  return true;
}

async function closeContextForPageExit(audio){
  if(!audio||audio.destroyed)return;
  // pagehide normally arrives after the manager's own lifecycle listener, but
  // enforce the pause here as well so unload ordering cannot leak sound.
  audio.setLifecyclePaused?.(true,'page-exit111');
  hardStopSources(audio);
  const context=audio.context;
  if(!context)return;
  try{audio._contextStateHandler&&context.removeEventListener?.('statechange',audio._contextStateHandler);}catch{}
  audio._contextStateHandler=null;
  for(const pool of audio.voicePools?.values?.()??[])for(const voice of pool){try{voice.source?.stop?.(0);}catch{}disconnect(voice.source);disconnect(voice.gain);}
  audio.voicePools?.clear?.();
  for(const loop of audio.activeLoops?.values?.()??[]){try{loop.source?.stop?.(0);}catch{}disconnect(loop.source);disconnect(loop.gain);}
  audio.activeLoops?.clear?.();audio.loopRequests?.clear?.();
  try{if(context.state!=='closed')await context.close?.();}catch(error){audio._recordError?.('page-exit-close111',error);}
  audio.context=null;audio.masterGain=null;audio.buses?.clear?.();audio.unlocked=false;audio._unlockPromise=null;
  // A BFCache restore may return to the same JS realm. It will remain silent
  // until a new trusted gesture creates/unlocks a fresh AudioContext.
  audio.installUnlockListeners?.();
}

export function installTechnical111(ctx){
  const A=ctx.Audio.prototype,G=ctx.Game.prototype;

  // Remember the exact starting offset of every real WebAudio loop. WebAudio
  // BufferSource nodes cannot be paused, so resume uses a new source at this
  // saved offset.
  wrap(A,'_realizeLoop',async function(original,channel,...args){
    const result=await original(channel,...args),active=this.activeLoops.get(String(channel));
    if(active&&result?.playing&&!result.reused){
      const request=this.loopRequests.get(String(channel));
      active._resumeBase111=Math.max(0,finite(request?.options?.offset,0));
      active._resumeStarted111=this.context?.currentTime??0;
    }
    return result;
  });

  // Replace gain-only lifecycle muting with hard source stop + context suspend.
  // Multiple reasons (SDK, visibility, blur, ads) compose safely.
  A.setLifecyclePaused=function(paused,reason='external'){
    const key=String(reason),wasPaused=this.lifecyclePauseReasons.size>0;
    if(paused)this.lifecyclePauseReasons.add(key);else this.lifecyclePauseReasons.delete(key);
    const isPaused=this.lifecyclePauseReasons.size>0;
    this._applyMasterGain?.(0);
    if(!wasPaused&&isPaused){
      hardStopSources(this);
      void suspendContext(this);
    }else if(wasPaused&&!isPaused){
      if(!this.muted&&this.unlocked)void restoreLoops(this);
      else this.installUnlockListeners?.();
    }
    return isPaused;
  };

  // If a closed/suspended context is unlocked again after BFCache/page return,
  // rebuild the paused continuous sounds only when the user left sound enabled.
  wrap(A,'unlock',async function(original,...args){
    const ok=await original(...args);if(ok&&!this.muted&&!this.lifecyclePauseReasons.size)await restoreLoops(this);return ok;
  });
  wrap(A,'setMuted',function(original,value,...args){
    const result=original(value,...args);
    if(!result&&!this.lifecyclePauseReasons.size&&this.unlocked)void restoreLoops(this);
    return result;
  });

  A.closeForPageExit111=function(){return closeContextForPageExit(this);};

  wrap(G,'init',async function(original,...args){
    const result=await original(...args),audio=this.audio;
    this._pageExitAudio111=()=>{void audio?.closeForPageExit111?.();};
    this._pageShowAudio111=()=>{audio?.setLifecyclePaused?.(false,'page-exit111');};
    globalThis.addEventListener('pagehide',this._pageExitAudio111,{capture:true});
    globalThis.addEventListener('unload',this._pageExitAudio111,{capture:true});
    globalThis.addEventListener('pageshow',this._pageShowAudio111,{capture:true});
    return result;
  });
  wrap(G,'destroy',async function(original,...args){
    globalThis.removeEventListener('pagehide',this._pageExitAudio111,true);
    globalThis.removeEventListener('unload',this._pageExitAudio111,true);
    globalThis.removeEventListener('pageshow',this._pageShowAudio111,true);
    return original(...args);
  });
}
