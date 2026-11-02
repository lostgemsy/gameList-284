/* Small compatibility adapter for cinematic cues, using the game's audio bus.
   A late decode cannot resurrect a cue after the intro/ad has been paused. */
import {clamp} from '../update/helpers.js';
export function gameClip110(game,id,url,loop=false){
  const audio=game.audio;audio.registerSound(id,{url:String(url),bus:'sfx',loop,maxVoices:2});
  let volume=1,offset=0,desired=false,pending=false,generation=0,voice=null,started=0;
  return {
    loop,
    get volume(){return volume;},set volume(v){volume=clamp(Number(v)||0);const active=audio.activeLoops.get(id);if(active&&audio.context){active.volume=volume;active.gain.gain.setTargetAtTime(volume,audio.context.currentTime,.025);}},
    get currentTime(){return offset+(desired?Math.max(0,(audio.context?.currentTime??0)-started):0);},set currentTime(v){offset=Math.max(0,Number(v)||0);},
    get paused(){return !desired||(!pending&&(loop?!audio.loopRequests.has(id):!voice));},
    async play(){
      if(loop&&desired&&(pending||audio.loopRequests.has(id)))return;
      const restored=audio.activeLoops.get(id);if(restored?._resumeBase111!=null)offset=Math.max(0,Number(restored._resumeBase111)||0);
      const token=++generation;desired=true;pending=true;started=audio.context?.currentTime??0;
      try{
        const result=loop?await audio.setLoop(id,id,{bus:'sfx',volume,offset,fadeMs:100}):await audio.play(id,{bus:'sfx',volume,offset,unlock:true,queueWhileLoading:true});
        if(token!==generation){result.stop?.(0);return;}
        if(loop)desired=!!(result.playing||result.queued);else{voice=result.played?result:null;desired=!!voice;}
      }finally{if(token===generation)pending=false;}
    },
    pause(){
      if(loop&&desired){const active=audio.activeLoops.get(id),saved=audio._lifecycleLoopSnapshots111?.get?.(id);if(active&&audio.context){const duration=active.source?.buffer?.duration||0,base=Number(active._resumeBase111??offset)||0,rate=Number(active.source?.playbackRate?.value)||1;offset=base+Math.max(0,audio.context.currentTime-Number(active._resumeStarted111??started))*rate;if(duration>0)offset%=duration;}else if(saved)offset=Math.max(0,Number(saved.options?.offset)||0);}
      generation++;desired=false;pending=false;if(loop)audio.stopLoop(id,{fadeMs:0});voice?.stop?.(0);voice=null;
    }
  };
}
