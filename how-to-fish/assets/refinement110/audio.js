/* The soundtrack and one-shots share the same gesture-unlocked AudioContext. */
import {wrap,el} from '../update/helpers.js';
import {loc,renewal} from '../renewal/state.js';
export function installAudio110(ctx){
  const A=ctx.Audio.prototype,G=ctx.Game.prototype;
  wrap(A,'_ensureContext',function(original,...args){
    const context=original(...args);
    if(context&&this.masterGain&&!this.buses.has('music110')){const bus=context.createGain();bus.gain.value=1;bus.connect(this.masterGain);this.buses.set('music110',bus);}
    return context;
  });
  wrap(A,'setVolume',function(original,value,bus='master',options={}){
    const key=bus==='music'?'ambience':bus;
    if(!['sfx','ambience','ui'].includes(key))return original(value,bus,options);
    const number=Number(value),target=Number.isFinite(number)?Math.max(0,Math.min(1,number)):this.volumes[key];
    // Several old settings wrappers write the same bus within one audio quantum.
    // Do not repeatedly cancel/restart a ramp to an already requested target.
    if(this.volumes[key]===target)return true;
    this.volumes[key]=target;const param=this.buses.get(key)?.gain,context=this.context;
    if(param&&context){const now=context.currentTime,fade=Math.max(0,Number(options?.fadeMs??80))/1000;
      param.cancelScheduledValues(now);param.setValueAtTime(param.value,now);
      if(target===0||!fade)param.setValueAtTime(target,now);else param.linearRampToValueAtTime(target,now+fade);
    }
    return true;
  });
  wrap(A,'unlock',function(original,...args){
    // Retry resume immediately in the gesture even when a previous unlock is
    // still pending; iOS can suspend/interupt a previously unlocked context.
    if(this.context&&['suspended','interrupted'].includes(this.context.state)&&!document.hidden){try{this.context.resume()?.catch?.(()=>{});}catch{}}
    return original(...args);
  });
  wrap(A,'resume',async function(original,...args){await original(...args);const running=this.context?.state==='running';if(!running&&!this.destroyed)this.installUnlockListeners();return running;});
  wrap(G,'init',async function(original,...args){
    const r=await original(...args),g=this;
    this._gesture110=e=>{
      if(!e.isTrusted||document.hidden||this.audio.destroyed)return;
      // Clear only stale browser-focus keys, never SDK/ad lifecycle reasons.
      if(document.hasFocus())for(const key of ['document-hidden','window-blur','page-hidden'])if(this.audio.lifecyclePauseReasons.has(key))this.audio.setLifecyclePaused(false,key);
      this.audio.unlock().then(ok=>{if(ok)this._syncMusic18?.();}).catch(()=>{});
    };
    document.addEventListener('pointerdown',this._gesture110,true);document.addEventListener('keydown',this._gesture110,true);
    this.addAudioTest110=parent=>{
      if(!parent||parent.querySelector('.audio-test110'))return;
      const button=el('button','audio-test110',loc('Проверить звук','Test sound'),parent);button.type='button';
      const status=el('small','audio-test-status110','',parent);status.setAttribute('role','status');
      button.addEventListener('click',async()=>{
        // Calling unlock precedes the first await: this is a real gesture.
        const unlocked=this.audio.unlock();status.textContent=loc('Проверяем…','Testing…');
        if(!await unlocked){status.textContent=loc('Браузер пока не разрешил звук. Нажми ещё раз.','Audio is blocked. Press again.');return;}
        if(renewal(this.progression).muted){renewal(this.progression).muted=false;this.audio.setMuted(false);this.progression._touch('sound-test-unmute');this.refreshSound15?.();this.syncMixer19?.();}
        if((this.progression.state.settings.sfxVolume??.85)<=0){status.textContent=loc('Громкость звуков — 0%. Подними ползунок.','Sounds are at 0%. Raise the slider.');return;}
        const result=await this.audio.play('coin',{volume:.8,queueWhileLoading:true,retry:true});
        status.textContent=result.played?loc('Звук включён. Музыка играет во время игры.','Sound is enabled. Music plays during gameplay.'):loc('Не удалось воспроизвести звук. Проверь настройки браузера.','Playback failed. Check your browser settings.');
      });
    };
    document.querySelectorAll('.audio-mixer19').forEach(this.addAudioTest110);return r;
  });
  wrap(ctx.UI.prototype,'_renderSettings',function(original,...args){const r=original(...args);this.game?.addAudioTest110?.(this.dom.panelContent.querySelector('.audio-mixer19'));return r;});
  wrap(G,'destroy',function(original,...args){document.removeEventListener('pointerdown',this._gesture110,true);document.removeEventListener('keydown',this._gesture110,true);this.audio?.stopLoop('music110',{fadeMs:0});return original(...args);});
}
