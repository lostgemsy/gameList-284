/* Release integration. Configuration is resolved before the game is created. */
import {installBalance17} from './balance.js';
import {installCloud17} from './cloud.js';
import {installMobile17} from './mobile.js';
import {installOffshore17} from './offshore.js';
import {installPerformance17} from './performance.js';
import {installUI17} from './ui.js';
export function installVoyage17(ctx){
 installBalance17(ctx);installCloud17(ctx);installPerformance17(ctx);
 installOffshore17(ctx);installMobile17(ctx);installUI17(ctx);
}
