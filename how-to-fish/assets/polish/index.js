/* How to fish 1.6.0 — source modules, no CDN or build step required. */
import {installModels16} from './models.js';
import {installLife16} from './life.js';
import {installUI16} from './ui.js';
import {installCinematics16} from './cinematics.js';
import {installScenery16} from './scenery.js';
import {wrap} from '../update/helpers.js';
import {isSmallFish16} from '../renewal/balance.js';
export function installPolish16(ctx){
  installModels16(ctx);installLife16(ctx);installUI16(ctx);installCinematics16(ctx);installScenery16(ctx);
  // Slightly larger visual targets. Apply at each actual model creation, so
  // late asynchronous GLB replacement cannot undo the new scale.
  const F=ctx.FishSystem.prototype;
  wrap(F,'createProceduralFish',function(original,fish,...args){const model=original(fish,...args);if(isSmallFish16(fish))model.scale.multiplyScalar(1.22);return model;});
  wrap(F,'loadModel',async function(original,fish,...args){const before=fish.object;const r=await original(fish,...args);if(isSmallFish16(fish)&&fish.object!==before&&!fish.object.userData.enlarged16){fish.object.scale.multiplyScalar(1.22);fish.object.userData.enlarged16=true;}return r;});
}
