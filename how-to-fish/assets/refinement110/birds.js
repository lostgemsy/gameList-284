/* One instanced draw per shared gull part instead of one per bird/part. The
   original articulated meshes stay on a raycast-only layer: hit geometry,
   theft, cargo, flapping, falls and respawns retain their existing behaviour. */
import {wrap} from '../update/helpers.js';
class GullBatches110{
  constructor(game,T){this.game=game;this.T=T;this.wildlife=game.wildlife;this.entries=new Map();this.parts=[];this.known=new WeakSet();this.inverse=game.scene.matrixWorld.clone();this.matrix=game.scene.matrixWorld.clone();this.root=new T.Group();this.root.name='Instanced coastal gulls 1.10';this.root.userData.ignoreShots=true;this.wildlife.root.add(this.root);this.wildlife.raycaster.layers.enable(31);this.discover();this.paint();}
  discover(){
    for(const bird of this.wildlife.birds){if(this.known.has(bird))continue;this.known.add(bird);
      // The seven authored body/joint meshes only. Cargo remains independently
      // rendered and is not accidentally included on later inventory changes.
      const meshes=[];for(const node of [bird.object.children[0],bird.head,bird.feet,bird.leftWing,bird.rightWing])node?.traverse(o=>{if(o.isMesh)meshes.push(o);});
      for(const object of meshes){if(object.isSkinnedMesh||Array.isArray(object.material))continue;
        const key=object.geometry.uuid+'|'+object.material.uuid;let entry=this.entries.get(key);
        if(!entry){const mesh=new this.T.InstancedMesh(object.geometry,object.material,Math.max(32,this.wildlife.birds.length*2));mesh.name='Gull part batch';mesh.castShadow=object.castShadow;mesh.receiveShadow=object.receiveShadow;mesh.frustumCulled=false;mesh.userData.ignoreShots=true;this.root.add(mesh);entry={mesh,parts:[],count:0};this.entries.set(key,entry);}
        const part={object,bird,layers:object.layers.mask,entry};object.layers.set(31);entry.parts.push(part);this.parts.push(part);
      }
    }
  }
  paint(){
    if(this.knownCount!==this.wildlife.birds.length){this.discover();this.knownCount=this.wildlife.birds.length;}
    this.wildlife.root.updateWorldMatrix(true,false);this.inverse.copy(this.wildlife.root.matrixWorld).invert();
    for(const bird of this.wildlife.birds)if(bird.object.visible)bird.object.updateMatrixWorld(true);
    for(const entry of this.entries.values()){
      if(entry.parts.length>entry.mesh.instanceMatrix.count){const old=entry.mesh,mesh=new this.T.InstancedMesh(old.geometry,old.material,entry.parts.length*2);mesh.name=old.name;mesh.castShadow=old.castShadow;mesh.receiveShadow=old.receiveShadow;mesh.frustumCulled=false;mesh.userData.ignoreShots=true;this.root.add(mesh);old.removeFromParent();old.dispose();entry.mesh=mesh;}
      let count=0;
      for(const part of entry.parts){let visible=part.bird.object.visible;for(let o=part.object;visible&&o&&o!==this.wildlife.root;o=o.parent)visible=o.visible;if(!visible)continue;
        this.matrix.multiplyMatrices(this.inverse,part.object.matrixWorld);entry.mesh.setMatrixAt(count++,this.matrix);
      }
      entry.mesh.count=count;entry.mesh.visible=count>0;if(count)entry.mesh.instanceMatrix.needsUpdate=true;
    }
  }
  destroy(){for(const part of this.parts)part.object.layers.mask=part.layers;for(const {mesh} of this.entries.values())mesh.dispose();this.root.removeFromParent();this.entries.clear();this.parts.length=0;}
}
export function installBirdBatches110(ctx){
  wrap(ctx.Game.prototype,'init',async function(original,...args){const r=await original(...args);this.gullBatches110=new GullBatches110(this,ctx.T);return r;});
  wrap(ctx.Game.prototype,'render',function(original,...args){this.gullBatches110?.paint();return original(...args);});
  wrap(ctx.Game.prototype,'destroy',function(original,...args){this.gullBatches110?.destroy();return original(...args);});
}
