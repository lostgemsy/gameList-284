/* How to fish 1.12 — moderation hardening for input, lifecycle and current SDK APIs. */
import {wrap} from '../update/helpers.js';

// Input guards are installed synchronously by refinement114/input-guards.js
// in index.html, before module loading and including all body-level overlays.

function setMenuReadyState(game,ready){
  game._gameReadyPending112=!ready;
  document.documentElement.classList.toggle('game-ready-pending112',!ready);
  for(const id of ['start-btn','continue-btn']){
    const button=game.ui?.[id]??document.getElementById(id);
    if(button)button.disabled=!ready;
  }
}

function installGameReady(Platform,Game){
  // Serialize Game Ready. The previous implementation could be called twice when
  // showMainMenu and Game.init reached ready() in the same microtask turn.
  wrap(Platform.prototype,'ready',function(original,...args){
    if(this._gameReadyPromise112)return this._gameReadyPromise112;
    this._gameReadyPromise112=Promise.resolve(original(...args)).catch(error=>{
      this._recordError?.('game-ready-112',error);return false;
    });
    return this._gameReadyPromise112;
  });

  // Reveal the fully rendered menu first, immediately invoke LoadingAPI.ready(),
  // and keep every start path disabled until that invocation completes. This makes
  // the API call coincide with the first interaction-ready frame, never after play.
  wrap(Game.prototype,'showMainMenu',function(original,...args){
    const result=original(...args);
    const api=this.platform?.ysdk?.features?.LoadingAPI?.ready;
    if(typeof api!=='function'||this.platform?._readyNotified){setMenuReadyState(this,true);return result;}
    setMenuReadyState(this,false);
    void this.platform.ready().finally(()=>setMenuReadyState(this,true));
    return result;
  });
  for(const method of ['start','startNewGame'])wrap(Game.prototype,method,function(original,...args){
    if(this._gameReadyPending112||this.platform?._lifecyclePaused)return false;
    return original(...args);
  });
}

function installAdPauseGuard(Platform){
  // Explicit guard in addition to SDK game_api_pause/game_api_resume. It pauses
  // BEFORE requesting an interstitial/RV and is released only after close/error.
  for(const method of ['showFullscreenAd','showRewardedAd'])wrap(Platform.prototype,method,async function(original,...args){
    const reason=`${method}-guard112`;
    this._setPauseReason?.(reason,true);
    try{return await original(...args);}finally{this._setPauseReason?.(reason,false);}
  });
}

function installCurrentLeaderboards(Platform){
  // Compatibility methods now delegate to the current SDK surface directly.
  // No runtime path invokes the deprecated leaderboard factory object.
  Platform.prototype._getLeaderboards=async function(){
    await this.init();
    return this.ysdk?.leaderboards??null;
  };
  Platform.prototype.setLeaderboardScore=async function(name,score,extraData){
    const leaderboards=await this._getLeaderboards();
    if(typeof leaderboards?.setScore!=='function')return {ok:false,reason:'unavailable'};
    try{await leaderboards.setScore(name,score,extraData);return {ok:true};}
    catch(error){this._recordError?.('leaderboard-set',error);return {ok:false,reason:'error',error};}
  };
  Platform.prototype.getLeaderboardEntries=async function(name,options={}){
    const leaderboards=await this._getLeaderboards();
    if(typeof leaderboards?.getEntries!=='function')return {ok:false,reason:'unavailable',entries:[]};
    try{return {ok:true,...await leaderboards.getEntries(name,options)};}
    catch(error){this._recordError?.('leaderboard-get',error);return {ok:false,reason:'error',error,entries:[]};}
  };
}

export function installModeration112(ctx){
  installGameReady(ctx.Platform,ctx.Game);
  installAdPauseGuard(ctx.Platform);
  installCurrentLeaderboards(ctx.Platform);
}
