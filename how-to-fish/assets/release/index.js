/* Tidebound 1.2 · targeted gameplay and release fixes. No runtime dependencies. */
import {wrap} from '../update/helpers.js';
import {installProgression} from './progression.js';
import {installBoats} from './boats.js';
import {installOcean} from './ocean.js';
import {installNavigation} from './navigation.js';
import {installHUD} from './hud.js';
import {installOptionalAds} from './ads.js';
export function installRelease(ctx){
 installProgression(ctx);installBoats(ctx);installOcean(ctx);installNavigation(ctx);installHUD(ctx);installOptionalAds(ctx);
 const {Game,FishSystem}=ctx;
 // The diagnostic sandbox remains opt-in; F9 must not expose cheats to players.
 if(!ctx.qa)Game.prototype.setupDebugPanel=function(){};
 // Sonar now detects actual targets. It no longer secretly changes spawn rates.
 const weighted=FishSystem.prototype.weightedSpecies;
 FishSystem.prototype.weightedSpecies=function(){
   const p=this.progression,original=p?.getUpgradeValue;
   if(!p)return weighted.call(this);
   p.getUpgradeValue=function(id,fallback){return id==='sonar_array'?0:original.call(this,id,fallback);};
   try{return weighted.call(this);}finally{p.getUpgradeValue=original;}
 };
 wrap(Game.prototype,'init',async function(original,...args){
   const r=await original(...args);
   document.addEventListener('pointerlockchange',()=>{if(this.intro?.active&&document.pointerLockElement)document.exitPointerLock?.();});
   this.progression.on('harbor-reward',({id})=>{
     if(id==='first_market_day')this.toast('Первая продажа! Лицензия и 950 монет на скиф уже получены.','sale');
   });
   if(ctx.qa){
     window.__TIDEBOUND_RELEASE_CONTEXT__=ctx;
     const old=window.render_game_to_text;
     window.render_game_to_text=()=>JSON.stringify({...JSON.parse(old()),release:'1.2.0',ocean:this.oceanEncounter.textState(),capacity:this.progression.getInventoryCapacity()});
   }
   return r;
 });
 wrap(Game.prototype,'travelToZone',function(original,id,zone){
   const target=zone??ctx.data.zones.find(z=>z.id===id);
   return target?original(id,target):Promise.resolve({ok:false,reason:'unknown-zone'});
 });
 // The old extension updated the harpoon/tutorial even during platform pause.
 wrap(Game.prototype,'update',function(original,dt){
   if(this.mode!=='playing'||this.platformPaused)return;
   return original(Math.min(Math.max(0,dt),.1));
 });
 document.addEventListener('contextmenu',e=>{if(e.target.closest?.('#app'))e.preventDefault();});
}
