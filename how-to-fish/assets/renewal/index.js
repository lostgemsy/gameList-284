/* How to fish · release 1.5.0. Local ES modules, no CDN dependencies. */
import {installState} from './state.js';
import {installAudio} from './audio.js';
import {installBalance} from './balance.js';
import {installWorld15} from './world.js';
import {installEndless} from './endless.js';
import {installUI15} from './ui.js';
export function installRenewal15(ctx){
  // No validator query parameter or diagnostic panel is active in the shipped build.
  if(!ctx.qa)ctx.Game.prototype.setupAssetValidator=function(){this.assetValidator=null;this.validatorPanel={active:false,ready:Promise.resolve(),destroy(){}};};
  installState(ctx);installAudio(ctx);installBalance(ctx);installWorld15(ctx);installEndless(ctx);installUI15(ctx);
}
