/* 1.9 — one persistent mix, two independent categories, lifecycle-safe media. */
import {wrap,el,clamp} from '../update/helpers.js';
import {loc,renewal} from '../renewal/state.js';
const gain=x=>clamp(Number.isFinite(Number(x))?Number(x):0);
export function setupMusic19(g){
  if(g._music18)return;
  const audio=g.audio,mobile=g.input.isTouch;
  audio.registerSound('music110',{url:new URL(mobile?'../refinement110/music-mobile.ogg':'../enhancement/gone-fishin.ogg',import.meta.url).href,loop:true,volume:1});
  const state={pending:false,offset:0,started:0,volume:-1,retryAt:0,wasActive:false};
  const pause=()=>{
    const active=audio.activeLoops.get('music110');
    if(active&&state.wasActive){const duration=active.source.buffer?.duration||108;state.offset=(state.offset+Math.max(0,(audio.context?.currentTime??0)-state.started))%duration;}
    else if(state.wasActive){const saved=audio._lifecycleLoopSnapshots111?.get?.('music110');if(saved)state.offset=Number(saved.options?.offset)||0;}
    state.wasActive=false;
    if(audio.loopRequests.has('music110')||active)audio.stopLoop('music110',{fadeMs:0});
  };
  // Keep the old integration handle, but do not create a second media engine.
  g._music18={engine:'webaudio',pause,get paused(){return !audio.activeLoops.has('music110');},get currentTime(){return state.offset+(state.wasActive?Math.max(0,(audio.context?.currentTime??0)-state.started):0);},get volume(){return state.volume;}};
  const sync=()=>{
    const active=g.mode==='playing'&&!g.panelOpen&&!g.intro?.active&&!g.homecoming?.active&&!g.homecoming?.ending&&!g.platformPaused&&!document.hidden;
    const volume=gain(g.progression?.state?.settings?.musicVolume??.65)*.52;
    if(!active||audio._isEffectivelyMuted()||!audio.unlocked||volume===0){pause();return;}
    const loop=audio.activeLoops.get('music110');
    if(loop){
      if(!state.wasActive){state.wasActive=true;state.started=audio.context.currentTime;state.offset=Number(loop._resumeBase111??state.offset)||0;}
      if(state.volume!==volume){loop.volume=volume;loop.gain.gain.setTargetAtTime(volume,audio.context.currentTime,.035);state.volume=volume;}
      return;
    }
    if(state.pending||performance.now()<state.retryAt)return;
    state.pending=true;state.volume=volume;
    audio.setLoop('music110','music110',{bus:'music110',volume,offset:state.offset,fadeMs:180,retry:true}).then(result=>{
      if(result.playing){state.wasActive=true;state.started=audio.context.currentTime;}
      else state.retryAt=performance.now()+3000;
    }).catch(()=>{state.retryAt=performance.now()+3000;}).finally(()=>{state.pending=false;});
  };
  g._syncMusic18=sync;g._musicVisibility19=sync;document.addEventListener('visibilitychange',sync);
}
export function playHitCry19(g){
  if(!g||g.mode!=='playing'||g.platformPaused||document.hidden||g.audio?._isEffectivelyMuted?.())return;
  if(!g.audio.sounds.has('shore_hit110'))g.audio.registerSound('shore_hit110',{url:new URL('../enhancement/gull-hit.ogg',import.meta.url).href,bus:'sfx',maxVoices:3});
  g.audio.play('shore_hit110',{volume:.65,playbackRate:.94+Math.random()*.12,queueWhileLoading:true}).catch(()=>{});
}
function mixer(g,parent,compact=false){
  const section=el('section','audio-mixer19'+(compact?' compact19':''),null,parent);
  section.setAttribute('aria-label',loc('Громкость звуков и музыки','Sound and music volume'));
  el('h3','',loc('ЗВУК И МУЗЫКА','SOUND & MUSIC'),section);
  for(const [key,ru,en,descRu,descEn] of [
    ['sfxVolume','Звуки','Sounds','Море, выстрелы, улов и интерфейс','Sea, shots, catches and interface'],
    ['musicVolume','Музыка','Music','Фоновая мелодия','Background soundtrack']]){
    const label=el('label','mix-row19',null,section),line=el('span','mix-title19',null,label);
    el('strong','',loc(ru,en),line);const out=el('output','',Math.round(gain(g.progression.state.settings[key])*100)+'%',line);
    out.dataset.mixOutput19=key;
    const input=el('input','',null,label);input.type='range';input.min='0';input.max='100';input.step='1';input.value=String(Math.round(gain(g.progression.state.settings[key])*100));input.dataset.mix19=key;
    input.setAttribute('aria-label',loc(ru,en));input.setAttribute('aria-valuetext',input.value+'%');
    if(!compact)el('small','',loc(descRu,descEn),label);
    input.addEventListener('input',()=>{
      const ui=g.uiManager,old=ui?._suppressProgressionRefresh;
      // Updating a setting must not replace the focused slider during a drag.
      if(ui)ui._suppressProgressionRefresh=true;
      try{g.progression.updateSettings({[key]:gain(Number(input.value)/100)});}
      finally{if(ui)ui._suppressProgressionRefresh=old;}
      g.syncMixer19?.();
    });
    input.addEventListener('change',()=>{if(key==='sfxVolume')g.audio.play('select',{volume:.5,queueWhileLoading:true});});
  }
  return section;
}
export function installAudio19(ctx){
  const {Game:G,UI,Audio:A}=ctx;
  wrap(G.prototype,'applyAudioSettings',function(original,...args){
    const r=original(...args),s=this.progression?.state?.settings;
    if(s){this.audio?.setSfxVolume(gain(s.sfxVolume));this.audio?.setUiVolume(gain(s.sfxVolume));this.audio?.setAmbienceVolume(gain(s.sfxVolume));}
    this.syncMixer19?.();this._syncMusic18?.();this.intro?.syncAudio?.();return r;
  });
  wrap(A.prototype,'_applyMasterGain',function(original,...args){
    const r=original(...args),g=this.owner19;
    if(g){g._syncMusic18?.();g.intro?.syncAudio?.();}return r;
  });
  wrap(UI.prototype,'_renderSettings',function(original,...args){
    const r=original(...args),g=this.game;if(!g)return r;
    for(const i of this.dom.panelContent.querySelectorAll('input[data-setting="musicVolume"],input[data-setting="sfxVolume"]'))i.closest('label')?.remove();
    const old=this.dom.panelContent.querySelector('.renewal-audio-settings');if(old)old.remove();
    const box=mixer(g,null,false);this.dom.panelContent.prepend(box);return r;
  });
  wrap(UI.prototype,'_updatePauseSummary',function(original,...args){const r=original(...args);this.game?.syncMixer19?.();return r;});
  wrap(UI.prototype,'refresh',function(original,...args){if(this._suppressProgressionRefresh)return;return original(...args);});
  wrap(G.prototype,'init',async function(original,...args){
    const r=await original(...args);this.audio.owner19=this;
    this.syncMixer19=()=>{
      const s=this.progression.state.settings;
      document.querySelectorAll('[data-mix19]').forEach(i=>{const value=String(Math.round(gain(s[i.dataset.mix19])*100));if(i.value!==value)i.value=value;i.setAttribute('aria-valuetext',value+'%');});
      document.querySelectorAll('[data-mix-output19]').forEach(o=>{o.textContent=Math.round(gain(s[o.dataset.mixOutput19])*100)+'%';});
      const sound=document.querySelector('#sound-btn');if(sound)sound.textContent=renewal(this.progression).muted?loc('ВКЛЮЧИТЬ ЗВУК','UNMUTE'):loc('ВЫКЛЮЧИТЬ ЗВУК','MUTE');
    };
    const pause=document.querySelector('#pause-menu .pause-card');if(pause)mixer(this,pause,true);
    const menu=document.querySelector('#main-menu .hero-card');
    if(menu){const details=el('details','menu-mixer19',null,menu);el('summary','',loc('Громкость звуков и музыки','Sound and music volume'),details);mixer(this,details,true);}
    const sound=document.querySelector('#sound-btn');sound?.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();this.setSound15?.(renewal(this.progression).muted);this.syncMixer19();this._syncMusic18?.();},true);
    this.applyAudioSettings();return r;
  });
  for(const method of ['pause','resume','openPanel','closePanel','handlePlatformPause','handlePlatformResume']){
    wrap(G.prototype,method,function(original,...args){const r=original(...args);this._syncMusic18?.();this.intro?.syncAudio?.();return r;});
  }
  wrap(G.prototype,'render',function(original,...args){this._syncMusic18?.();return original(...args);});
  wrap(G.prototype,'destroy',function(original,...args){document.removeEventListener('visibilitychange',this._musicVisibility19);this.audio.owner19=null;return original(...args);});
}
