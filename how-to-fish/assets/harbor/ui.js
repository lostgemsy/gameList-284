/* The HUD uses an isotropic design scale: images, text and controls never stretch.
   Three anchor layouts keep portrait and short landscape screens usable. */
import {wrap} from '../update/helpers.js';
import {icon,artUrl,tr} from './locale.js';
const ART={coins:'coin',coin:'coin',shop:'stall',sell:'catch_crate',collection:'collection',journal:'collection',map:'map',quests:'quest',quest:'quest',settings:'settings',upgrade:'upgrade',upgrades:'upgrade',rod:'rod',weapon:'pistol',utility:'harpoon',harpoon:'harpoon',boat:'boat_helm',inventory:'cargo',reel:'reel',reload:'reel',interact:'check',action:'lure',rank:'rank',lock:'lock',speed:'speed',hull:'hull',cargo:'cargo',pier:'island_pier',islands:'island_islands',open_sea:'island_open_sea',abyss:'island_abyss',secret_endgame:'island_secret_endgame',sonar_array:'orb',hull_plating:'hull',engine_tuning:'speed'};
export function installUI14(ctx){
  const {Game,UI}=ctx;
  globalThis.__TB_PAINT14__=(node,id,label='')=>{
    const art=ART[id];if(!art||!node)return false;
    node.classList.remove('atlas-icon','item-art');node.classList.add('harbor-icon14');node.dataset.icon=id;
    const img=icon(art);node.replaceChildren(img);if(label)node.title=tr(label);return true;
  };
  const layout=()=>{
    const w=document.documentElement.clientWidth||innerWidth,h=document.documentElement.clientHeight||innerHeight,portrait=w/h<.95,compact=!portrait&&(w<1000||h<560);
    const scale=portrait?Math.min(1.35,w/400):compact?Math.min(w/900,h/480):Math.min(1.6,w/1280,h/720);
    const html=document.documentElement;html.dataset.layout14=portrait?'portrait':compact?'compact':'wide';
    html.style.setProperty('--hud-scale14',String(scale));html.style.setProperty('--hud-width14',w/scale+'px');html.style.setProperty('--hud-height14',h/scale+'px');
  };
  layout();requestAnimationFrame(layout);window.addEventListener('resize',layout,{passive:true});window.visualViewport?.addEventListener('resize',layout,{passive:true});
  wrap(Game.prototype,'resize',function(original,...args){
    layout();const result=original(...args),w=document.documentElement.clientWidth||innerWidth,h=document.documentElement.clientHeight||innerHeight;
    this.camera.aspect=w/h;this.camera.updateProjectionMatrix();this.toolView?.resize?.(this.camera.aspect);this.renderer.setSize(w,h,false);return result;
  });
  wrap(Game.prototype,'init',async function(original,...args){
    const r=await original(...args);layout();
    const set=(selector,art)=>{const n=document.querySelector(selector);if(n){n.replaceChildren(icon(art));n.classList.add('harbor-icon14');}};
    set('.coin-icon','coin');set('.journey-goal__compass','map');
    set('.tool-slot[data-slot="rod"] .tool-icon','rod');set('.tool-slot[data-slot="weapon"] .tool-icon','pistol');set('.tool-slot[data-slot="utility"] .tool-icon','harpoon');
    document.querySelectorAll('[data-hud-icon]').forEach(n=>globalThis.__TB_PAINT14__(n,n.dataset.hudIcon));
    if(this.largeMenu){this.largeMenu.querySelector('.menu-bars').replaceChildren(icon('settings'));const keyHint=this.largeMenu.querySelector('small'),ru=(this.platform?.language??globalThis.__TB_LANG__)==='ru';if(keyHint){keyHint.textContent=ru?'':tr('Esc');keyHint.classList.toggle('hidden',ru);}}
    const stamp=document.querySelector('.version-stamp');if(stamp)stamp.textContent=tr('v1.5 · КАК ЛОВИТЬ РЫБУ · АВТОСОХРАНЕНИЕ');
    if(ctx.qa){const old=window.render_game_to_text;window.render_game_to_text=()=>JSON.stringify({...JSON.parse(old()),release:'1.5.0',language:this.platform.language,harbor14:{terrainTriangles:this.terrainSampler?.triangles.length,crabs:this.worldPolish?.crabs.filter(c=>c.root.visible).length,gift:!!this.harborWorld14?.gift,shop:!!this.harborWorld14?.premium,adSeconds:this.adBreaks14?.elapsed}});}
    return r;
  });
  wrap(UI.prototype,'_renderZoneCard',function(original,zone){const card=original(zone);const image=icon(ART[zone.id]||'island_reef','island-card-art14');card.prepend(image);return card;});
  wrap(UI.prototype,'_renderShopCard',function(original,type,item){
    const card=original(type,item),n=card.querySelector('.shop-card__icon');
    if(n&&['upgrade','inventory'].includes(type)){n.replaceChildren(icon(ART[item.id]||ART[type]));n.classList.add('harbor-icon14');}return card;
  });
  wrap(Game.prototype,'update',function(original,...args){
    const result=original(...args);document.documentElement.classList.toggle('hauling14',this.fishing?.state==='hooked'||this.harpoon?.state==='tethered');
    document.documentElement.classList.toggle('deckfight14',!!this.deckEncounter);return result;
  });
  // A resumed session must re-evaluate platform pause before restoring controls.
  wrap(Game.prototype,'applyLookInput',function(original,...args){if(this.platformPaused||this.harborDialog||this.adBreaks14?.busy)return;return original(...args);});
}
