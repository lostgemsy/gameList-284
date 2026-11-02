import {wrap} from '../update/helpers.js';
import {ModelBuilder19,random19} from './geometry.js';
function grassGeometry(T){
  const b=new ModelBuilder19(T);
  for(let j=0;j<9;j++){
    const a=j*2.399,h=.47+(j%4)*.15,pts=[],idx=[];
    for(let k=0;k<=6;k++){const t=k/6,w=.025*Math.sin((t*.95+.04)*Math.PI),x=Math.cos(a)*(t*t*.28+(j%2)*.08),z=Math.sin(a)*t*t*.28;pts.push(x-Math.sin(a)*w,h*t,z+Math.cos(a)*w,x+Math.sin(a)*w,h*t,z-Math.cos(a)*w);}
    for(let k=0;k<6;k++){const n=k*2;idx.push(n,n+1,n+2,n+1,n+3,n+2);}
    const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(pts,3));g.setIndex(idx);g.computeVertexNormals();b.mesh(g,['#54794d','#8fa36a','#6b9154'][j%3]);
  }
  return b.finish();
}
function flowersGeometry(T){
  const b=new ModelBuilder19(T);
  for(let n=0;n<3;n++){
    const x=(n-1)*.19,z=n%2?.14:-.1,h=.28+n*.095;
    b.rod('#578858',[x,0,z],[x+.04,h,z],.008,.004,6);
    for(let j=0;j<5;j++){const a=j/5*6.283;const p=b.sphere(n===1?'#e8bd78':'#f2e7c0',[x+.04+Math.cos(a)*.05,h, z+Math.sin(a)*.05],[.050,.012,.025],8);p.rotation.y=-a;}
    b.sphere('#d4a24d',[x+.04,h+.009,z],[.018,.012,.018],8);
    const leaf=b.sphere('#69a16d',[x-.035,h*.48,z],[.07,.008,.022],8);leaf.rotation.z=.4;
  }
  return b.finish();
}
class CoastalScenery19{
  constructor(g,ctx){this.g=g;this.ctx=ctx;this.T=ctx.T;this.meshes=[];this.geometry={grass:grassGeometry(ctx.T),flowers:flowersGeometry(ctx.T),pebbles:new ctx.T.SphereGeometry(1,7,5)};this.rebuild();}
  clear(){this.root?.removeFromParent();for(const m of this.meshes){m.dispose?.();m.material.dispose();}this.meshes=[];}
  rebuild(){
    this.clear();const g=this.g,T=this.T,rand=random19(g.player.zone+'-coastal-garden19'),center=g.player.zone==='pier'?[-16,0,18]:g.zoneSystem.currentZone.bounds.center;
    this.root=new T.Group();this.root.name='Coastal garden · batched groundcover';this.root.userData.ignoreShots=true;g.scene.add(this.root);
    const points=[],limit=g.input.isTouch?85:125,hub=new T.Vector3().fromArray(center);
    for(let i=0;i<2600&&points.length<limit;i++){
      const a=rand()*6.283,r=(g.player.zone==='pier'?25:20)*Math.sqrt(rand()),x=hub.x+Math.cos(a)*r,z=hub.z+Math.sin(a)*r;
      const top=g.terrainSampler?.dry(x,z,.45);if(!top||top.y<.12||g.isSolidAt(x,z,.65))continue;
      if(g.player.zone==='pier'&&Math.abs(x-1)<3.3&&z<17)continue;
      if(Object.values(g.village15??{}).some(p=>p&&Math.hypot(x-p.x,z-p.z)<2.6))continue;
      if((g.coastalLife19?.items??[]).some(p=>Math.hypot(p.home.x-x,p.home.z-z)<.75))continue;
      points.push({x,y:top.y,z,kind:top.kind,size:.7+rand()*.65,a:rand()*6.283});
    }
    const d=new T.Object3D();
    for(const [kind,subset,color] of [
      ['grass',points,'#ffffff'],['flowers',points.filter((p,i)=>i%4===0),'#ffffff'],['pebbles',points.filter((p,i)=>i%3===0),'#9caaa0']]){
      const mat=new T.MeshStandardMaterial({color,vertexColors:kind!=='pebbles',roughness:1,side:T.DoubleSide});
      const mesh=new T.InstancedMesh(this.geometry[kind],mat,subset.length);mesh.name=kind==='grass'?'New sea oats':kind==='flowers'?'New coastal flowers':'Smooth beach pebbles';mesh.castShadow=false;mesh.receiveShadow=true;mesh.userData.ignoreShots=true;this.root.add(mesh);this.meshes.push(mesh);
      subset.forEach((p,i)=>{d.position.set(p.x+(kind==='flowers'?.14:0),p.y+(kind==='pebbles'?.026:0),p.z);d.rotation.set(0,p.a,0);d.scale.set(kind==='pebbles'?.10+p.size*.12:p.size,kind==='pebbles'?.045:p.size,kind==='pebbles'?.14+p.size*.08:p.size);d.updateMatrix();mesh.setMatrixAt(i,d.matrix);});
      mesh.instanceMatrix.needsUpdate=true;mesh.computeBoundingSphere?.();if(kind!=='pebbles')this.ctx.wind19?.decorate(mesh);
    }
    this.plantCount=points.length;
  }
  update(){this.root.visible=!this.g.intro?.active;}
  destroy(){this.clear();for(const geo of Object.values(this.geometry))geo.dispose();}
}
export function installScenery19(ctx){
  const G=ctx.Game.prototype,T=ctx.T,warm=new T.Color('#ffe2b8'),horizon=new T.Color('#c7e8dd');
  wrap(G,'init',async function(original,...args){const r=await original(...args);this.coastalScenery19=new CoastalScenery19(this,ctx);return r;});
  wrap(G,'handleZoneChanged',function(original,...args){const r=original(...args);this.coastalScenery19?.rebuild();return r;});
  wrap(G,'update',function(original,...args){const r=original(...args);this.coastalScenery19?.update();return r;});
  wrap(G,'updateSkyColors',function(original,...args){const r=original(...args);if(this.player.zone==='pier'&&!this.intro?.active){this.sun?.color.lerp(warm,.18);const u=this.skyDome?.material.uniforms;if(u?.horizonColor)u.horizonColor.value.lerp(horizon,.16);}return r;});
  wrap(G,'destroy',function(original,...args){this.coastalScenery19?.destroy();return original(...args);});
}
