import {wrap,el} from '../update/helpers.js';
import {renewal,loc} from './state.js';
export function installAudio(ctx){
  const A=ctx.Audio.prototype,G=ctx.Game.prototype;
  // Platform reports aggregate lifecycle state, not matching add/remove pairs.
  // A single stable key fixes permanently muted audio after overlapping ad/blur pauses.
  wrap(A,'getPlatformHooks',function(original,...args){
    const hooks=original(...args);return {...hooks,onLifecycleMute:(paused)=>this.setLifecyclePaused(paused,'platform')};
  });
  wrap(A,'unlock',async function(original,...args){
    if(this.unlocked&&this.context?.state!=='running')return this.resume();
    return original(...args);
  });
  // OGG is kept for efficient delivery; MP3 is a codec fallback, not a remote dependency.
  wrap(A,'load',async function(original,key,options){
    let buffer=await original(key,options);if(buffer||this.destroyed)return buffer;
    const resolved=this.resolve(key),definition=resolved?.definition;
    if(!definition?.url?.endsWith('.ogg')||this._fallbackTried15?.has(resolved.id))return buffer;
    this._fallbackTried15??=new Set();this._fallbackTried15.add(resolved.id);
    try{
      const response=await this.fetchImpl(this._assetUrl(definition.url.replace(/\.ogg$/,'.mp3')),{cache:'force-cache'});
      if(!response.ok)return null;buffer=await this._decode(await response.arrayBuffer());
      if(buffer){this.buffers.set(resolved.id,buffer);this.failedSounds.delete(resolved.id);}
    }catch(e){this._recordError('codec-fallback',e,resolved.id);}return buffer;
  });
  wrap(G,'applyAudioSettings',function(original,...args){const r=original(...args);this.audio?.setMuted?.(renewal(this.progression).muted);return r;});
  wrap(G,'init',async function(original,...args){
    const r=await original(...args);
    this.audio.setMuted(renewal(this.progression).muted);
    this._audioGesture15=()=>{
      if(this.audio.destroyed)return;
      // A browser may suspend an already-unlocked AudioContext at any time.
      this.audio.unlock().then(ok=>{
        if(!ok)return;
        if(this.mode==='playing'&&!this.platformPaused&&!this.intro?.active)this.audio.setOcean(true,{volume:.3});
        for(const key of ['coin','hit','reward','bloop'])this.audio.load(key);
      }).catch(()=>{});
    };
    document.addEventListener('pointerdown',this._audioGesture15,true);document.addEventListener('keydown',this._audioGesture15,true);
    this.setSound15=async enabled=>{
      const state=renewal(this.progression);state.muted=!enabled;
      // Preserve both category faders, including intentional zero levels.
      this.audio.setMuted(!enabled);this.progression._touch('sound-toggle');
      this.refreshSound15();
      if(enabled){await this.audio.unlock();if(this.mode==='playing')this.audio.setOcean(true,{volume:.3});this.audio.play('coin',{volume:.65,queueWhileLoading:true});}
    };
    this.refreshSound15=()=>document.querySelectorAll('[data-sound15]').forEach(button=>{
      const enabled=!renewal(this.progression).muted;button.textContent=enabled?loc('Звук: вкл.','Sound: on'):loc('Звук: выкл.','Sound: off');button.setAttribute('aria-pressed',String(enabled));
    });
    for(const parent of [document.querySelector('.main-menu .menu-actions'),document.querySelector('.pause-menu .menu-actions'),document.querySelector('#pause-menu .menu-actions')].filter(Boolean)){
      if(parent.querySelector('[data-sound15]'))continue;const button=el('button','secondary-btn renewal-sound',null,parent);button.dataset.sound15='';button.type='button';button.onclick=()=>this.setSound15(renewal(this.progression).muted);
    }
    this.refreshSound15();return r;
  });
  wrap(G,'destroy',function(original,...args){document.removeEventListener('pointerdown',this._audioGesture15,true);document.removeEventListener('keydown',this._audioGesture15,true);return original(...args);});
}
