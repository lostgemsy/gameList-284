/* Tidebound 1.4 — integrated shoreline, fishing, localization and portal release. */
import {installLocale14} from './locale.js';
import {installGround} from './ground.js';
import {installFishing14} from './fishing.js';
import {installCommerce14} from './commerce.js';
import {installUI14} from './ui.js';
import {installWorld14} from './world.js';
export function installHarbor14(ctx){
  installLocale14(ctx);
  installGround(ctx);
  installFishing14(ctx);
  installCommerce14(ctx);
  installWorld14(ctx);
  installUI14(ctx);
}
