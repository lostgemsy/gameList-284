/* 1.15: practical boat lessons, fair deck fishing and rewarding island scenery. */
import {wrap} from '../update/helpers.js';
import {installFishing115} from './fishing.js';
import {installTreasures115} from './treasures.js';
import {installScenery115} from './scenery.js';
export function installRefinement115(ctx){
  installFishing115(ctx);installTreasures115(ctx);installScenery115(ctx);
  wrap(ctx.Game.prototype,'init',async function(original,...args){const r=await original(...args);const stamp=document.querySelector('.version-stamp');if(stamp)stamp.textContent='v1.18 · КАК ЛОВИТЬ РЫБУ · АВТОСОХРАНЕНИЕ';return r;});
}
