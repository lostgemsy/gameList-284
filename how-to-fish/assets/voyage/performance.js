import {wrap} from '../update/helpers.js';
import {WorldPolish} from '../homecoming/world.js';

export function installPerformance17(ctx){
  const {Game:G,NPC,T}=ctx;
  wrap(G.prototype,'setupRenderer',function(original,...args){
    const r=original(...args);
    if(this.input.isTouch){
      this._pixelRatio17=Math.min(globalThis.devicePixelRatio||1,1);
      this.renderer.setPixelRatio(this._pixelRatio17);
      this.renderer.shadowMap.enabled=false;
    }
    return r;
  });
  wrap(G.prototype,'resize',function(original,...args){
    const r=original(...args);
    if(this.input.isTouch)this.renderer.setPixelRatio(this._pixelRatio17??Math.min(devicePixelRatio,1));
    this._lastRender17=0;return r;
  });
  wrap(G.prototype,'setupGameplaySystems',function(original,...args){
    const r=original(...args),g=this;
    if(this.input.isTouch){
      this.effects.maxParticles=Math.min(this.effects.maxParticles,110);
      const manager=this.assetManager,accum=new WeakMap(),pos=new T.Vector3();
      manager.update=function(dt){
        if(!Number.isFinite(dt)||dt<=0)return;
        for(const [root,mixer] of this.mixers){
          if(!root.parent)continue;
          let visible=true;for(let p=root;p;p=p.parent)if(!p.visible){visible=false;break;}
          if(!visible)continue;
          root.getWorldPosition(pos);
          const distance=pos.distanceToSquared(g.camera.position),interval=distance>75*75?.1:1/30;
          const elapsed=(accum.get(root)??0)+dt;
          if(elapsed>=interval){mixer.update(Math.min(elapsed,.2));accum.set(root,0);}else accum.set(root,elapsed);
        }
      };
    }
    return r;
  });
  wrap(G.prototype,'init',async function(original,...args){
    const r=await original(...args),g=this;
    if(this.input.isTouch&&this.water?.onBeforeRender){
      const renderReflection=this.water.onBeforeRender;
      this.water.onBeforeRender=function(...renderArgs){
        const now=performance.now();
        if(g._reflection17&&now-g._reflection17<100&&!g.intro?.active)return;
        g._reflection17=now;return renderReflection.apply(this,renderArgs);
      };
    }
    return r;
  });
  wrap(G.prototype,'updateUI',function(original,...args){
    if(this.input?.isTouch){
      const now=performance.now();if(now-(this._hudAt17??-1e6)<80)return;
      this._hudAt17=now;
    }
    return original(...args);
  });
  // Filter scene branches BEFORE raycasting, instead of intersecting fish,
  // foliage labels, sky, effects and every decorative creature for each pellet.
  G.prototype.raycastEnvironment=function(camera,range=150,aim={x:0,y:0}){
    const ray=this.environmentRaycaster;ray.setFromCamera(aim,camera);ray.near=.5;ray.far=range;
    if(this._shotFrame17!==this.frame||!this._shotMeshes17){
      this._shotFrame17=this.frame;this._shotMeshes17=[];
      const walk=(o,names='',isWater=false)=>{
        if(!o.visible||o===this.skyDome||o===this.fishSystem?.group||o.userData?.ignoreShots)return;
        const name=names+' '+(o.name??'');
        if(/cloud|bird|speech|marker|fishing rig|shore foam/i.test(name))return;
        const water=isWater||o===this.water;
        if(o.isMesh){o.userData.surface17=water?'water':/sand|grass|island|terrain|ground/i.test(name)?'land':/pier|deck|dock|plank|hut|boat|wood/i.test(name)?'wood':'solid';this._shotMeshes17.push(o);}
        for(const c of o.children)walk(c,name,water);
      };
      for(const child of this.scene.children)walk(child);
    }
    const hit=ray.intersectObjects(this._shotMeshes17,false)[0];if(!hit)return null;
    const normal=hit.face?.normal?.clone?.()??new T.Vector3(0,1,0);normal.transformDirection(hit.object.matrixWorld).normalize();
    return {point:hit.point.clone(),normal,distance:hit.distance,surface:hit.object.userData.surface17,object:hit.object};
  };
  // Shore search is expensive, and was executed every tick even hundreds of
  // metres from land. Cache short-range disembark probes, not actual movement.
  wrap(G.prototype,'nearestWalkablePosition',function(original,origin,max=Infinity){
    if(!this.input.isTouch||max!==22||!this.boatController?.isPiloting)return original(origin,max);
    const old=this._shoreProbe17,now=performance.now();
    if(old&&old.zone===this.player.zone&&now-old.at<240&&old.origin.distanceToSquared(origin)<1.44)return old.point?.clone()??null;
    const point=original(origin,max);this._shoreProbe17={zone:this.player.zone,at:now,origin:origin.clone(),point:point?.clone()??null};return point;
  });
  wrap(WorldPolish.prototype,'update',function(original,dt){
    const g=this.game;if(!g.input.isTouch)return original(dt);
    this._coastDt17=(this._coastDt17??0)+dt;
    if(this._coastDt17<1/24)return;
    const elapsed=this._coastDt17;this._coastDt17=0;
    const r=original(elapsed);
    for(const crab of this.crabs){
      // Keep the collectible root state intact. Only tiny distant mesh details
      // are culled; pickup/respawn code continues to use root.visible normally.
      const visible=crab.root.position.distanceToSquared(g.player.position)<34*34;
      if(crab._detail17!==visible){crab._detail17=visible;crab.root.traverse(o=>{if(o.isMesh)o.visible=visible;});}
    }
    return r;
  });
  wrap(NPC.prototype,'update',function(original,dt,...args){
    const before=this.npcs.map(n=>[n,n.object.position.x,n.object.position.z]),r=original(dt,...args);
    for(const [n,x,z] of before){
      if(n.state!=='walk'){n._blockedIdle17=false;continue;}
      const moved=Math.hypot(n.object.position.x-x,n.object.position.z-z)>.0001;
      n._stationary17=moved?0:(n._stationary17??0)+dt;
      if(n._stationary17>.18&&!n._blockedIdle17){this.play(n,'idle',1);n._blockedIdle17=true;}
      else if(moved&&n._blockedIdle17){this.play(n,'walk',1);n._blockedIdle17=false;}
    }
    return r;
  });
}
