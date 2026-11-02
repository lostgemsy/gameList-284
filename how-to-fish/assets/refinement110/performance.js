/* 1.10: spend the frame budget on image clarity, not redundant scene work. */
import {wrap,clamp} from '../update/helpers.js';
import {WorldPolish} from '../homecoming/world.js';

function materialKey(mesh){
  const m=mesh.material;
  if(!m||Array.isArray(m)||m.transparent||m.map||m.normalMap||m.alphaMap||m.emissiveMap||m.roughnessMap||m.metalnessMap||m.onBeforeCompile?.toString().includes('shader.uniforms'))return null;
  const json=m.toJSON();for(const k of ['uuid','metadata','name','userData'])delete json[k];
  return JSON.stringify(json)+'|'+mesh.castShadow+'|'+mesh.receiveShadow+'|'+mesh.renderOrder+'|'+mesh.layers.mask;
}
/* Merge only rigid siblings. Animated joints, hit targets, materials and vertex
   normals are retained. No simplified models or removed species are involved. */
function mergeMeshes(T,anchor,meshes,retired){
  const groups=new Map();
  for(const mesh of meshes){
    if(!mesh.isMesh||mesh.isSkinnedMesh||mesh.isInstancedMesh||mesh.children.length||!mesh.visible||Object.keys(mesh.geometry.morphAttributes??{}).length)continue;
    const k=materialKey(mesh);if(k===null)continue;
    if(!groups.has(k))groups.set(k,[]);groups.get(k).push(mesh);
  }
  anchor.updateWorldMatrix(true,true);const inverse=anchor.matrixWorld.clone().invert();
  for(const list of groups.values()){
    if(list.length<2)continue;
    const parts=[],attrs=new Set(['position','normal']);let count=0;
    for(const m of list){
      let geo=m.geometry.clone();geo.applyMatrix4(inverse.clone().multiply(m.matrixWorld));
      if(geo.index){const flat=geo.toNonIndexed();geo.dispose();geo=flat;}
      for(const name of ['uv','color'])if(geo.attributes[name])attrs.add(name);
      if(!geo.attributes.normal)geo.computeVertexNormals();parts.push(geo);count+=geo.attributes.position.count;
    }
    const geometry=new T.BufferGeometry();
    for(const name of attrs){const size=name==='uv'?2:3,data=new Float32Array(count*size);let offset=0;
      for(const part of parts){const a=part.attributes[name],n=part.attributes.position.count;
        if(a)for(let i=0;i<n;i++){data[offset+i*size]=a.getX(i);data[offset+i*size+1]=a.getY(i);if(size===3)data[offset+i*size+2]=a.getZ(i);}
        else if(name==='color')data.fill(1,offset,offset+n*size);offset+=n*size;
      }geometry.setAttribute(name,new T.Float32BufferAttribute(data,size));
    }
    geometry.computeBoundingBox();geometry.computeBoundingSphere();for(const geo of parts)geo.dispose();
    const first=list[0],out=new T.Mesh(geometry,first.material);out.name='Rigid detail batch 1.10';out.castShadow=first.castShadow;out.receiveShadow=first.receiveShadow;out.layers.mask=first.layers.mask;out.renderOrder=first.renderOrder;out.userData.ignoreShots=true;
    out.matrixAutoUpdate=false;out.updateMatrix();anchor.add(out);
    for(const mesh of list){retired.geometries.add(mesh.geometry);retired.materials.add(mesh.material);mesh.removeFromParent();retired.saved++;}
    retired.saved--;
  }
}
function compactCoast(world,T){
  const root=world.root;if(!root)return;
  const retired={geometries:new Set(),materials:new Set(),saved:0};
  const shells=root.children.filter(o=>/Beach shell|Ракушка на песке/.test(o.name));
  const shellMeshes=[];for(const shell of shells)shell.traverse(o=>{if(o.isMesh)shellMeshes.push(o);});
  mergeMeshes(T,root,shellMeshes,retired);
  for(const shell of shells)if(!shell.isMesh&&!shell.children.length)shell.removeFromParent();
  for(const crab of world.crabs??[]){
    const walk=o=>{for(const c of [...o.children])if(!c.isMesh)walk(c);mergeMeshes(T,o,o.children.filter(c=>c.isMesh),retired);};walk(crab.root);
  }
  root.traverse(o=>{if(o.geometry)retired.geometries.delete(o.geometry);if(o.material)retired.materials.delete(o.material);});
  for(const geo of retired.geometries)geo.dispose();for(const mat of retired.materials)mat.dispose();
  world.drawCallsSaved110=retired.saved;
}
function resolution(g,reset=false){
  if(!g.renderer)return;
  const touch=g.input.isTouch,w=innerWidth,h=innerHeight,dpr=globalThis.devicePixelRatio||1;
  const floor=Math.min(1,dpr),ceiling=Math.max(floor,Math.min(dpr,touch?1.5:1.75,Math.sqrt((touch?1600000:3400000)/Math.max(1,w*h))));
  const q=g.performance110??={average:20,economy:false,last:0,changed:0,good:0,bad:0};
  q.min=floor;q.max=ceiling;q.ratio=reset?ceiling:clamp(q.ratio??ceiling,floor,ceiling);q.last=0;
  g._pixelRatio17=q.ratio;g.renderer.setPixelRatio(q.ratio);
}
function updateQuality(g,now){
  const q=g.performance110;if(!q)return;
  const active=g.mode==='playing'&&!g.panelOpen&&!g.platformPaused&&!g.intro?.active&&!g.homecoming?.active&&!document.hidden;
  if(!active){q.last=0;q.good=0;q.bad=0;return;}
  const dt=q.last?now-q.last:0;q.last=now;if(dt<3||dt>200)return;
  q.average=q.average*.975+dt*.025;
  const slow=q.average>42,fast=q.average<23;
  q.bad=slow?q.bad+dt:Math.max(0,q.bad-dt);q.good=fast?q.good+dt:0;
  if(q.bad>7000&&now-q.changed>8000){
    // First reduce distant micro-animation/reflection work, then pixels. Never
    // go below one render pixel per CSS pixel on phones.
    if(!q.economy)q.economy=true;
    else if(q.ratio>q.min+.01){q.ratio=Math.max(q.min,q.ratio-.1);g._pixelRatio17=q.ratio;g.renderer.setPixelRatio(q.ratio);}
    q.changed=now;q.bad=0;q.good=0;
  }else if(q.good>10000&&now-q.changed>10000){
    if(q.ratio<q.max-.01){q.ratio=Math.min(q.max,q.ratio+.1);g._pixelRatio17=q.ratio;g.renderer.setPixelRatio(q.ratio);}
    else q.economy=false;q.changed=now;q.good=0;
  }
}
export function installPerformance110(ctx){
  const {Game:G,FishSystem:Fish,T}=ctx;
  wrap(WorldPolish.prototype,'rebuild',function(original,...args){const r=original(...args);compactCoast(this,T);return r;});
  wrap(G.prototype,'setupRenderer',function(original,...args){const r=original(...args);resolution(this,true);return r;});
  wrap(G.prototype,'resize',function(original,...args){const r=original(...args);resolution(this);return r;});
  // Throttle the OUTERMOST HUD chain, not just its old innermost implementation.
  wrap(G.prototype,'updateUI',function(original,...args){
    const state=this.mode+':'+this.player?.tool+':'+this.fishing?.state+':'+this.harpoon?.state+':'+!!this.deckEncounter;
    const now=performance.now();if(state===this._hudState110&&now-(this._hudAt110??-1e6)<(this.input.isTouch?75:50))return;
    this._hudState110=state;this._hudAt110=now;return original(...args);
  });
  wrap(G.prototype,'render',function(original,...args){
    const now=performance.now();updateQuality(this,now);
    if(this.renderer?.shadowMap.enabled){this.renderer.shadowMap.autoUpdate=false;if(now-(this._shadowAt110??-1e6)>=(this.performance110?.economy?50:33)){this.renderer.shadowMap.needsUpdate=true;this._shadowAt110=now;}}
    return original(...args);
  });
  wrap(G.prototype,'init',async function(original,...args){
    const r=await original(...args),g=this;
    // The previous mobile reflection cap is replaced, not stacked twice.
    if(this.water?.onBeforeRender){const reflection=this.water.onBeforeRender;
      this.water.onBeforeRender=function(...a){const now=performance.now(),interval=g.input.isTouch?(g.performance110?.economy?125:80):(g.performance110?.economy?60:40);
        if(now-(g._reflectionAt110??-1e6)<interval)return;g._reflectionAt110=now;g._reflection17=0;return reflection.apply(this,a);
      };
    }
    const manager=this.assetManager,accum=new WeakMap(),pos=new T.Vector3();
    manager.update=function(dt){
      if(!Number.isFinite(dt)||dt<=0)return;
      for(const [root,mixer] of this.mixers){
        if(!root.parent)continue;let visible=true;for(let p=root;p;p=p.parent)if(!p.visible){visible=false;break;}if(!visible)continue;
        root.getWorldPosition(pos);const d=pos.distanceToSquared(g.camera.position);
        const interval=d>80*80?.1:(d>32*32||g.input.isTouch)?1/30:1/60,elapsed=(accum.get(root)??0)+dt;
        if(elapsed+1e-7>=interval){mixer.update(Math.min(elapsed,.2));accum.set(root,0);}else accum.set(root,elapsed);
      }
    };
    if(this.worldPolish){let elapsed=0;const update=this.worldPolish.update.bind(this.worldPolish);this.worldPolish.update=dt=>{elapsed+=dt;if(elapsed+1e-7<1/30)return;const step=elapsed;elapsed=0;return update(Math.min(step,.12));};}
    if(this.progression.expedition.tutorial.completed)document.body.classList.add('tutorial-complete110');
    const stamp=document.querySelector('.version-stamp');if(stamp)stamp.textContent='v1.10 · '+(globalThis.__TB_LANG__==='en'?'HOW TO FISH · AUTOSAVE':'КАК ЛОВИТЬ РЫБУ · АВТОСОХРАНЕНИЕ');
    return r;
  });
  // The old method allocated vectors and quaternions per eye and uploaded all
  // unused slots. Reuse scratch values; draw only the actual live eye count.
  Fish.prototype.updateEyeInstances=function(){
    if(!this.eyeWhites||!this.eyePupils)return;
    const tmp=this.eyeScratch110??={q:this.eyeDummy.quaternion.clone(),scale:new T.Vector3(),point:new T.Vector3(),position:new T.Vector3()};let count=0;
    for(const fish of this.creatures){if(fish.dead||!fish.eyeLayout||!fish.object.visible||count>=this.eyeCapacity)continue;
      fish.object.updateWorldMatrix(true,false);fish.object.matrixWorld.decompose(tmp.position,tmp.q,tmp.scale);
      for(const point of fish.eyeLayout.points){if(count>=this.eyeCapacity)break;const radius=fish.eyeLayout.radius;
        this.eyeDummy.position.copy(point).applyMatrix4(fish.object.matrixWorld);this.eyeDummy.quaternion.copy(tmp.q);this.eyeDummy.scale.copy(tmp.scale).multiplyScalar(radius);this.eyeDummy.updateMatrix();this.eyeWhites.setMatrixAt(count,this.eyeDummy.matrix);
        tmp.point.copy(point);tmp.point.z-=radius*.72;this.eyeDummy.position.copy(tmp.point).applyMatrix4(fish.object.matrixWorld);this.eyeDummy.scale.copy(tmp.scale).multiplyScalar(radius*.56);this.eyeDummy.updateMatrix();this.eyePupils.setMatrixAt(count++,this.eyeDummy.matrix);
      }
    }
    this.eyeWhites.count=count;this.eyePupils.count=count;this.eyeWhites.instanceMatrix.needsUpdate=true;this.eyePupils.instanceMatrix.needsUpdate=true;
  };
}
