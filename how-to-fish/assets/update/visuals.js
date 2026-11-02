import {wrap, clamp, smooth, el, disposeTree} from './helpers.js';

export function installVisuals(ctx) {
  const {T, ToolView, Fishing, BoatWorld, Game, NPC, Wildlife} = ctx;
  const p = new T.Vector3(), origin = new T.Vector3();

  // The weapon camera uses 55°, the world camera 70°. Convert through their
  // projections, preserving eye depth. A plain quaternion transform is wrong.
  ToolView.prototype.projectAttachmentToWorld = function (object, local, out = new T.Vector3()) {
    this.camera.updateMatrixWorld(true);
    object.updateWorldMatrix(true, false);
    out.copy(local).applyMatrix4(object.matrixWorld).applyMatrix4(this.camera.matrixWorldInverse);
    const view = this.camera.projectionMatrix.elements, world = this.worldCamera.projectionMatrix.elements;
    out.x *= view[0] / world[0];
    out.y *= view[5] / world[5];
    this.worldCamera.updateMatrixWorld(true);
    return out.applyMatrix4(this.worldCamera.matrixWorld);
  };
  ToolView.prototype.getRodTipWorld = function (out = new T.Vector3()) {
    const line = this.rod.getObjectByName('Visible rod line');
    const a = line?.geometry.attributes.position;
    if (a) p.fromBufferAttribute(a, a.count - 1); else p.set(.08, .12, -3.86);
    return this.projectAttachmentToWorld(this.rod, p, out);
  };

  wrap(Fishing.prototype, 'buildVisuals', function (original) {
    original();
    // Dispose the three old float meshes; the parent is retained for the rig API.
    for (const child of [...this.bobber.children]) disposeTree(child);
    const cream = new T.MeshStandardMaterial({color:'#fff3ce', roughness:.42, metalness:.04});
    const red = new T.MeshStandardMaterial({color:'#f05c3d', roughness:.32, metalness:.08});
    const graphite = new T.MeshStandardMaterial({color:'#243942', roughness:.35, metalness:.4});
    const brass = new T.MeshStandardMaterial({color:'#dcb666', roughness:.3, metalness:.65});
    const make = (geo, mat, y, scale) => {
      const m = new T.Mesh(geo, mat); m.position.y = y;
      if (scale) m.scale.set(...scale); this.bobber.add(m); return m;
    };
    make(new T.SphereGeometry(1, 16, 12), cream, -.015, [.116, .19, .116]);
    make(new T.SphereGeometry(1, 16, 10), red, .075, [.102, .108, .102]);
    make(new T.CylinderGeometry(.117, .117, .022, 16), graphite, -.025);
    make(new T.CylinderGeometry(.013, .019, .32, 8), graphite, .285);
    make(new T.CylinderGeometry(.024, .018, .105, 10), red, .385);
    make(new T.SphereGeometry(.025, 10, 8), new T.MeshBasicMaterial({color:'#ffe5a1'}), .45);
    make(new T.CylinderGeometry(.026, .017, .20, 9), brass, -.255);
    const eye = make(new T.TorusGeometry(.025, .0055, 6, 12), graphite, -.365);
    eye.name = 'Float line eye';
    this.bobber.name = 'Balanced balsa float · antenna / waterline / ballast / eye';
    this.lineGeometry.dispose();
    this.linePositions = new Float32Array(33 * 3);
    this.lineGeometry = new T.BufferGeometry();
    this.lineGeometry.setAttribute('position', new T.Float32BufferAttribute(this.linePositions, 3));
    this.line.geometry = this.lineGeometry;
    this.line.material.opacity = .74;
    this.line.material.depthTest = true;
    this.line.material.depthWrite = false;
    this.line.renderOrder = 5;
  });
  Fishing.prototype.updateLine = function (time) {
    if (!this.line.visible) return;
    this._lineOrigin(origin);
    // Monofilament ends at the eye, not at the float's centre. Endpoint wave = 0.
    p.set(0, -.365, 0).applyQuaternion(this.bobber.quaternion).multiply(this.bobber.scale).add(this.bobber.position);
    const taut = ['hooked','landing'].includes(this.state);
    const distance = origin.distanceTo(p);
    const sag = taut ? .035 + (1 - clamp(this.tension || 0)) * .13 : Math.min(.85, distance * .024);
    const count = this.linePositions.length / 3;
    for (let i = 0; i < count; i++) {
      const u = i / (count - 1), bow = Math.sin(u * Math.PI), k = i * 3;
      this.linePositions[k] = origin.x + (p.x - origin.x) * u + Math.sin(time * 1.7 + u * 5) * bow * .016;
      this.linePositions[k + 1] = origin.y + (p.y - origin.y) * u - bow * sag;
      this.linePositions[k + 2] = origin.z + (p.z - origin.z) * u;
    }
    this.lineGeometry.attributes.position.needsUpdate = true;
  };

  wrap(Fishing.prototype, 'update', function(original,dt,time,...args){
    const result=original(dt,time,...args);
    if(this.state==='bite')this.bobber.position.y=-.46+Math.sin(time*14)*.065;
    if(this.state==='landing'&&this.creature){
      const u=clamp(this.landingTimer/this.landingDuration);
      this.creature.object.scale.copy(this.landingScale).multiplyScalar(1+Math.sin(u*Math.PI)*.55);
      this.bobber.scale.setScalar(1+Math.sin(u*Math.PI)*.15);
      this.bobber.rotation.x=Math.sin(u*Math.PI)*.65;
    }
    return result;
  });

  // Remove the oversized solid rectangle. Cut only the water shader inside
  // the actual hull cross-section; underwater geometry and shadows stay intact.
  wrap(BoatWorld.prototype, 'setBoat', async function (original, id) {
    const result = await original(id);
    const boat = this.boatInstance;
    if (!boat || boat.userData.dryHull) return result;
    const liner = boat.getObjectByName('Low dry boat deck liner');
    if (liner) disposeTree(liner);
    boat.updateWorldMatrix(true, true);
    const inv = boat.matrixWorld.clone().invert();
    const localWaterY = new T.Vector3(boat.position.x, 0, boat.position.z).applyMatrix4(inv).y;
    const box = new T.Box3(), cuts = [];
    const a = new T.Vector3(), b = new T.Vector3(), c = new T.Vector3();
    boat.traverse(mesh => {
      if (!mesh.isMesh || !mesh.geometry?.attributes.position) return;
      mesh.geometry.computeBoundingBox();
      const matrix = inv.clone().multiply(mesh.matrixWorld);
      box.union(mesh.geometry.boundingBox.clone().applyMatrix4(matrix));
      const attr = mesh.geometry.attributes.position, index = mesh.geometry.index;
      const count = index ? index.count : attr.count;
      for (let i = 0; i + 2 < count; i += 3) {
        a.fromBufferAttribute(attr, index ? index.getX(i) : i).applyMatrix4(matrix);
        b.fromBufferAttribute(attr, index ? index.getX(i+1) : i+1).applyMatrix4(matrix);
        c.fromBufferAttribute(attr, index ? index.getX(i+2) : i+2).applyMatrix4(matrix);
        for (const [u,v] of [[a,b],[b,c],[c,a]]) {
          if ((u.y-localWaterY)*(v.y-localWaterY) > 0 || Math.abs(u.y-v.y)<1e-6) continue;
          const k=(localWaterY-u.y)/(v.y-u.y);
          cuts.push([u.x+(v.x-u.x)*k,u.z+(v.z-u.z)*k]);
        }
      }
    });
    let hull = convexHull(cuts);
    const size = box.getSize(new T.Vector3()), center = box.getCenter(new T.Vector3());
    // Rafts are flat: no water-plane intersection. Keep their cut conservative.
    if (hull.length < 3) {
      const w = size.x * (id === 'patched_raft' ? .35 : .23), l = size.z * .30;
      hull = [[-w,-l*.8],[-w*.6,-l],[w*.6,-l],[w,-l*.8],[w,l*.5],[w*.5,l],[-w*.5,l],[-w,l*.5]].map(([x,z])=>[x+center.x,z+center.z]);
    }
    // Maximum 16 convex edges; inset avoids cutting a halo outside the gunwale.
    if (hull.length > 16) hull = Array.from({length:16},(_,i)=>hull[Math.floor(i*hull.length/16)]);
    const cx=hull.reduce((s,v)=>s+v[0],0)/hull.length, cz=hull.reduce((s,v)=>s+v[1],0)/hull.length;
    hull=hull.map(([x,z])=>new T.Vector2(cx+(x-cx)*.925,cz+(z-cz)*.925));
    boat.userData.dryHull={points:hull, minX:Math.min(...hull.map(v=>v.x)),maxX:Math.max(...hull.map(v=>v.x)),minZ:Math.min(...hull.map(v=>v.y)),maxZ:Math.max(...hull.map(v=>v.y))};
    installHullShader(this.water, T);
    return result;
  });

  // Speech is a bounded screen-space caption, never a gigantic 3D billboard.
  wrap(NPC.prototype, 'showSpeech', function (_original, npc) {
    const lines = ['Поплавок ушёл под воду? Подсекай!', 'Лодка открывает путь к новым стаям.', 'У берега тихо. В море — трофеи.', 'Гарпун достаёт рыбу под водой.', 'Продай улов — обнови снасти.', 'Рыба дёргает? Немного отпусти леску.'];
    npc.speechText=lines[Math.floor(this.random()*lines.length)];
    npc.speechTime=4.2; npc.speakIn=10+this.random()*12;
    npc.speech.visible=false;
  });
  wrap(NPC.prototype, 'update', function (original, ...args) {
    original(...args); for (const npc of this.npcs) npc.speech.visible=false;
  });
  Game.prototype.updatePolishedLabels = function () {
    if (!this.npcSystem || !this.camera) return;
    this.captionLayer ??= el('div','world-captions',null,document.body);
    this.captionLayer.hidden=this.mode!=='playing'||this.panelOpen||this.intro?.active;
    this.pileCaption ??= el('div','world-caption pile-caption',null,this.captionLayer);
    const pile=this.wildlife?.catchLabel;
    if(pile){
      pile.visible=false;
      const n=this.pileCaption, d=pile.getWorldPosition(p).distanceTo(this.camera.position);
      p.project(this.camera);
      n.hidden=!this.wildlife.stored.size||d<1.6||d>32||p.z>1||p.z< -1||Math.abs(p.x)>.9||Math.abs(p.y)>.82;
      if(!n.hidden){n.textContent=`УЛОВ · ${this.wildlife.stored.size}`;n.style.opacity=String(Math.min(.85,(d-1.6)/1.6));
        n.style.transform=`translate(${(p.x*.5+.5)*innerWidth}px,${(-p.y*.5+.5)*innerHeight}px) translate(-50%,-100%)`;}
    }
    const used=[];
    for (const npc of this.npcSystem.npcs) {
      npc.caption ??= el('div','world-caption',null,this.captionLayer);
      const n=npc.caption;
      const distance=npc.object.getWorldPosition(p).distanceTo(this.camera.position);
      n.hidden=npc.speechTime<=0||distance<1.8||distance>27||!this.npcSystem.group.visible;
      if (n.hidden) continue;
      npc.object.getWorldPosition(p); p.y+=2.18; p.project(this.camera);
      if (p.z < -1 || p.z > 1 || Math.abs(p.x)>.95 || Math.abs(p.y)>.85) {n.hidden=true;continue;}
      const x=clamp((p.x*.5+.5)*innerWidth,112,innerWidth-112), y=clamp((-p.y*.5+.5)*innerHeight,90,innerHeight-100);
      if (used.some(q=>Math.abs(q.x-x)<214&&Math.abs(q.y-y)<55)){n.hidden=true;continue;}
      used.push({x,y});
      n.textContent=npc.speechText;
      n.style.transform=`translate(${x}px,${y}px) translate(-50%,-100%)`;
      n.style.opacity=String(Math.min(.90,smooth((distance-1.8)/1.4))*Math.min(1,(27-distance)/5));
      // Query the existing world collider ray only a few times per second.
      if (!npc.captionCheckAt || this.elapsed>npc.captionCheckAt) {
        const hit=this.raycastEnvironment(this.camera,distance,{x:p.x,y:p.y});
        npc.captionOccluded=!!hit&&hit.surface!=='water'&&hit.distance<distance-.8;
        npc.captionCheckAt=this.elapsed+.2;
      }
      if(npc.captionOccluded)n.hidden=true;
    }
  };
  Game.prototype.showCatchResult = function (caught, result) {
    if (!caught?.ok || !result?.species) return;
    this.catchRibbon ??= el('aside','catch-ribbon',null,document.body);
    const box=this.catchRibbon; box.replaceChildren();
    box.setAttribute('role','status'); box.setAttribute('aria-live','polite');
    el('span','catch-ribbon__icon','◇',box);
    const text=el('div','catch-ribbon__text',null,box);
    el('small','',caught.firstDiscovery?'НОВЫЙ ВИД В КОЛЛЕКЦИИ':'УЛОВ В САДКЕ',text);
    el('strong','',ctx.nameOf(result.species),text);
    el('span','',`${Number(result.sizeM||caught.catch?.sizeM||0).toFixed(2)} м  ·  ${caught.catch?.estimatedValue??0} ●`,text);
    const button=el('button','catch-ribbon__journal','C · Улов',box);
    button.type='button'; button.onclick=()=>this.openPanel('collection');
    clearTimeout(this.catchRibbonTimer);clearTimeout(this.catchRibbonEndTimer); box.classList.add('visible');document.body.classList.add('catch-visible');
    this.catchRibbonTimer=setTimeout(()=>{box.classList.remove('visible');this.catchRibbonEndTimer=setTimeout(()=>document.body.classList.remove('catch-visible'),260);},4200);
  };
  Game.prototype.floatingReward = function (text, color='#fff0c1', seconds=1.3) {
    const layer=document.querySelector('#floating-layer');
    if(!layer)return;
    while(layer.children.length>=3)layer.firstElementChild.remove();
    const item=el('div','floating-reward',text,layer); item.style.color=color;
    requestAnimationFrame(()=>item.classList.add('rise'));
    setTimeout(()=>item.remove(),Math.max(1,seconds)*1000);
  };
  ctx.updateVisualFrame = game => {
    // Evaluate the attachment after the current frame's hand animation.
    game.fishing?.updateLine(game.elapsed);
    updateHullUniforms(game.water,game.intro?.active?game.intro.boat:game.zoneSystem?.boatInstance);
    game.updatePolishedLabels();
    // Clamp any legacy catch-pile label sprites, while keeping effect sprites.
    if(game.wildlife?.stored) for(const stored of game.wildlife.stored.values()) {
      stored.object?.traverse?.(o=>{
        if(!o.isSprite)return;
        o.material.depthTest=true; o.material.opacity=.82;
        if(!o.userData.captionBase)o.userData.captionBase=o.scale.clone();
        const d=o.getWorldPosition(p).distanceTo(game.camera.position);
        o.scale.copy(o.userData.captionBase).multiplyScalar(clamp(d/7,.12,1));
        o.visible=d>1.1&&d<28;
      });
    }
  };
}
function convexHull(points) {
  const pts=[...new Map(points.map(p=>[p.map(x=>x.toFixed(4)).join(','),p])).values()].sort((a,b)=>a[0]-b[0]||a[1]-b[1]);
  if(pts.length<3)return pts;
  const cross=(o,a,b)=>(a[0]-o[0])*(b[1]-o[1])-(a[1]-o[1])*(b[0]-o[0]);
  const lower=[],upper=[];
  for(const p of pts){while(lower.length>=2&&cross(lower.at(-2),lower.at(-1),p)<=0)lower.pop();lower.push(p);}
  for(const p of [...pts].reverse()){while(upper.length>=2&&cross(upper.at(-2),upper.at(-1),p)<=0)upper.pop();upper.push(p);}
  lower.pop();upper.pop();return lower.concat(upper);
}
function installHullShader(water,T) {
  const m=water?.material;if(!m||m.uniforms.dryHullEnabled)return;
  m.uniforms.dryHullEnabled={value:0};
  m.uniforms.dryHullInverse={value:water.matrixWorld.clone()};
  m.uniforms.dryHullBounds={value:new T.Vector4()};
  m.uniforms.dryHullCount={value:0};
  m.uniforms.dryHullPoints={value:Array.from({length:16},()=>new T.Vector2())};
  m.fragmentShader=m.fragmentShader.replace('void main() {',`
    uniform float dryHullEnabled;
    uniform mat4 dryHullInverse;
    uniform vec4 dryHullBounds;
    uniform int dryHullCount;
    uniform vec2 dryHullPoints[16];
    void main() {
      if (dryHullEnabled > 0.5) {
        vec2 hp = (dryHullInverse * vec4(worldPosition.xyz,1.0)).xz;
        if(hp.x>dryHullBounds.x && hp.x<dryHullBounds.y && hp.y>dryHullBounds.z && hp.y<dryHullBounds.w) {
          bool inside=true;
          for(int h=0;h<16;h++) {
            if(h>=dryHullCount) break;
            int next=h+1; if(next>=dryHullCount) next=0;
            vec2 a=dryHullPoints[h], b=dryHullPoints[next];
            if((b.x-a.x)*(hp.y-a.y)-(b.y-a.y)*(hp.x-a.x)<0.0) inside=false;
          }
          if(inside) discard;
        }
      }
  `);
  m.needsUpdate=true;
}
function updateHullUniforms(water,boat) {
  const u=water?.material?.uniforms;if(!u?.dryHullEnabled)return;
  const hull=boat?.userData?.dryHull;
  u.dryHullEnabled.value=hull&&boat.visible?1:0;
  if(!hull)return;
  boat.updateWorldMatrix(true,false);u.dryHullInverse.value.copy(boat.matrixWorld).invert();
  u.dryHullBounds.value.set(hull.minX,hull.maxX,hull.minZ,hull.maxZ);
  u.dryHullCount.value=hull.points.length;
  hull.points.forEach((p,i)=>u.dryHullPoints.value[i].copy(p));
}
