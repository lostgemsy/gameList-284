/* HOW TO FISH 1.9 — local source modules, no remote dependencies. */
import {installRefinement110} from '../refinement110/index.js';
import {installTechnical111} from '../refinement111/technical.js';
import {installModeration112} from '../refinement112/moderation.js';
import {installAudio19} from './audio.js';
import {installControls19} from './controls.js';
import {installCoach19} from './coach.js';
import {installModels19} from './models.js';
import {installEcology19} from './ecology.js';
import {installPalms19} from './palms.js';
import {installWind19} from './wind.js';
import {installScenery19} from './scenery.js';
export function installShoreline19(ctx){
  installAudio19(ctx);installControls19(ctx);installCoach19(ctx);
  installModels19(ctx);installEcology19(ctx);installPalms19(ctx);installWind19(ctx);installScenery19(ctx);installRefinement110(ctx);installTechnical111(ctx);installModeration112(ctx);
}
