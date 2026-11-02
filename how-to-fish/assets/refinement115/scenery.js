/* Authored coastal gardens: shared, baked vertex-colour meshes; no new textures,
 * point lights, shadow maps, particles or per-plant JavaScript updates. */
import {wrap,clamp} from '../update/helpers.js';
import {ModelBuilder19,random19} from '../shoreline19/geometry.js';
function petal(T){
  const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute([0,0,0,-.045,.012,.07,-.035,.014,.135,0,.009,.157,.035,.014,.135,.045,.012,.07],3));
  g.setIndex([0,1,2,0,2,3,0,3,4,0,4,5]);g.computeVertexNormals();return g;
}
function blossom(b,x,y,z,color,size=1){
  const T=b.T;for(let j=0;j<5;j++)b.mesh(petal(T),color,[x,y,z],[size,size,size],[0,j*6.283/5,0]);
  b.mesh(new T.SphereGeometry(.026*size,5,3),'#efbf62',[x,y+.017*size,z]);
}
function flowerGeometry(T){
  const b=new ModelBuilder19(T),rand=random19('frangipani-bed115');
  for(let i=0;i<6;i++){
    const a=i*2.399,r=.13+rand()*.30,x=Math.cos(a)*r,z=Math.sin(a)*r,h=.26+rand()*.36;
    b.rod('#5d845a',[x,0,z],[x+.02,h,z],.008,.004,4);
    for(let j=0;j<2;j++)b.mesh(petal(T),j?'#739564':'#508565',[x,h*(.34+j*.24),z],[.7,1,1.25],[.35,a+j*2.8,0]);
    blossom(b,x+.02,h,z,i%3?'#fff0d1':'#ee968d',.7+rand()*.35);
  }
  return b.finish();
}
function treeGeometry(T){
  const b=new ModelBuilder19(T),rand=random19('coastal-frangipani115');
  b.rod('#8b7960',[0,-.12,0],[.13,2.5,0],.19,.10,7);
  for(let i=0;i<5;i++){
    const a=i*2.399,x=Math.cos(a)*(1.0+rand()*.35),z=Math.sin(a)*(1+rand()*.35),y=2.6+rand()*.5;
    b.rod('#a39070',[.07,1.4+i*.13,0],[x,y,z],.095,.026,5);
    for(let j=0;j<3;j++){
      const xx=x+(rand()-.5)*.8,zz=z+(rand()-.5)*.8,yy=y+(rand()-.5)*.42;
      b.mesh(new T.SphereGeometry(1,7,4),['#497d63','#63916b','#81a477'][(i+j)%3],[xx,yy,zz],[.68+rand()*.3,.30+rand()*.13,.60+rand()*.3]);
      blossom(b,xx,yy+.32,zz,'#fff0d0',1.2);blossom(b,xx+.22,yy+.15,zz-.31,j%2?'#f2b5a0':'#f7e4b7',.95);
    }
  }
  return b.finish();
}
function lanternGeometry(T){
  const b=new ModelBuilder19(T);
  b.rod('#a08c65',[0,0,0],[0,1.35,0],.055,.043,6);
  b.rod('#a08c65',[0,1.30,0],[.36,1.30,0],.035,.025,5);
  b.mesh(new T.CylinderGeometry(.12,.15,.30,6),'#eec98b',[.32,1.10,0]);
  b.mesh(new T.ConeGeometry(.21,.14,6),'#2d736f',[.32,1.32,0]);
  b.mesh(new T.CylinderGeometry(.17,.17,.055,6),'#9c7750',[.32,.945,0]);
  for(let i=0;i<4;i++){const a=i*1.571;b.rod('#785f40',[.32+Math.cos(a)*.13,.96,Math.sin(a)*.13],[.32+Math.cos(a)*.1,1.25,Math.sin(a)*.1],.009,.009,4);}
  return b.finish();
}
function buntingGeometry(T){
  const b=new ModelBuilder19(T);
  // A wide, clear route below the line: the lowest flag is above head height.
  for(const x of [-3.4,3.4]){
    b.rod('#95724d',[x,-.08,0],[x,3.7,0],.085,.058,6);
    b.mesh(new T.SphereGeometry(.13,6,4),'#d4b677',[x,3.72,0]);
  }
  const line=x=>3.65-.42*(1-(x/3.4)**2);
  for(let i=0;i<20;i++){const x=-3.4+i*.34;b.rod('#c8af7f',[x,line(x),0],[x+.34,line(x+.34),0],.016,.016,4);}
  for(let i=0;i<11;i++){
    const x=-2.95+i*.59,y=line(x),geo=new T.BufferGeometry();
    geo.setAttribute('position',new T.Float32BufferAttribute([-.19,0,0,.19,0,0,0,-.43,.035],3));geo.computeVertexNormals();
    b.mesh(geo,['#f0d99d','#5caaa0','#df9180'][i%3],[x,y,0]);
  }
  return b.finish();
}
class WelcomeGarden115{
  constructor(g,ctx){
    this.g=g;this.ctx=ctx;this.T=ctx.T;this.geometries={flowers:flowerGeometry(ctx.T),trees:treeGeometry(ctx.T),lanterns:lanternGeometry(ctx.T),bunting:buntingGeometry(ctx.T)};
    this.material=new ctx.T.MeshStandardMaterial({vertexColors:true,roughness:.93,side:ctx.T.DoubleSide});this.meshes=[];this.rebuild();
  }
  clear(){this.root?.removeFromParent();for(const m of this.meshes)m.dispose?.();this.meshes=[];}
  batch(kind,points,wind=false){
    if(!points.length)return;const T=this.T,d=new T.Object3D(),m=new T.InstancedMesh(this.geometries[kind],this.material,points.length);
    m.name=`Welcome garden · ${kind}`;m.userData.ignoreShots=true;m.castShadow=false;m.receiveShadow=true;
    for(let i=0;i<points.length;i++){const p=points[i];d.position.set(p.x,p.y,p.z);d.rotation.set(0,p.a??0,0);d.scale.setScalar(p.s??1);d.updateMatrix();m.setMatrixAt(i,d.matrix);}
    m.instanceMatrix.needsUpdate=true;m.computeBoundingSphere?.();if(wind)this.ctx.wind19?.decorate(m);this.root.add(m);this.meshes.push(m);
  }
  safe(x,z,r=.65){
    const g=this.g,d=g.terrainSampler?.dry(x,z,r);if(!d||d.y<.1||d.kind!=='grass'||g.isSolidAt(x,z,r))return null;
    if([g.sellMarker,g.shopMarker].some(m=>m&&Math.hypot(x-m.position.x,z-m.position.z)<3.5))return null;
    if(Object.values(g.village15??{}).some(p=>p&&Math.hypot(x-p.x,z-p.z)<3.1))return null;
    return {x,y:d.y+.015,z};
  }
  rebuild(){
    this.clear();const g=this.g,T=this.T,rand=random19(g.player.zone+'-welcome115'),pier=g.player.zone==='pier';
    this.root=new T.Group();this.root.name='Welcome coast · batched gardens';this.root.userData.ignoreShots=true;g.scene.add(this.root);
    const main=(g.terrainSampler?.meshes??[]).find(m=>/grass terrain|island-grass-ground/.test(m.name));if(!main)return;
    const center=main.getWorldPosition(new T.Vector3()),flowers=[],trees=[],lanterns=[];
    const authored=pier?[[ -4.4,16,1.13],[8.5,17,1.03],[-2.9,30,1.25],[11,31,1.14],[-15,31,1.1],[-30,7,1.05]]:[];
    for(const [x,z,s] of authored){const p=this.safe(x,z,1.45);if(p){p.s=s;p.a=rand()*6.28;trees.push(p);}}
    if(!pier&&['islands','open_sea'].includes(g.player.zone)){
      for(let i=0;i<35&&trees.length<3;i++){const a=rand()*6.28,r=6+rand()*11,p=this.safe(center.x+Math.cos(a)*r,center.z+Math.sin(a)*r,1.25);if(p){p.s=.85+rand()*.20;p.a=a;trees.push(p);}}
    }
    // Small beds, rather than individual unbatched props. Keep every route clear.
    const limit=pier?(g.input.isTouch?55:85):(g.input.isTouch?25:42),radius=pier?25:19;
    for(let i=0;i<1600&&flowers.length<limit;i++){
      const a=rand()*6.28,r=radius*Math.sqrt(rand()),x=(pier?-7:center.x)+Math.cos(a)*r,z=(pier?20:center.z)+Math.sin(a)*r;
      if(pier&&Math.abs(x-1)<3.1&&z<30)continue;
      const p=this.safe(x,z,.46);if(!p)continue;p.a=rand()*6.28;p.s=.8+rand()*.6;flowers.push(p);
    }
    if(pier){
      for(const z of [8,15,23])for(const x of [-2.8,5.3]){const p=this.safe(x,z,.38);if(p){p.a=x<1?Math.PI/2:-Math.PI/2;lanterns.push(p);}}
      const a=this.safe(-2.4,10,.5),b=this.safe(4.4,10,.5);
      if(a&&b&&Math.abs(a.y-b.y)<.3)this.batch('bunting',[{x:1,y:(a.y+b.y)/2,z:10}]);
    }
    this.batch('trees',trees,true);this.batch('flowers',flowers,true);this.batch('lanterns',lanterns);
    this.counts={trees:trees.length,flowerBeds:flowers.length,lanterns:lanterns.length,drawCalls:this.meshes.length};
  }
  update(){this.root.visible=!this.g.intro?.active;}
  destroy(){this.clear();for(const geo of Object.values(this.geometries))geo.dispose();this.material.dispose();}
}
export function installScenery115(ctx){
  const G=ctx.Game.prototype,T=ctx.T,blue=new T.Color('#388cad'),pearl=new T.Color('#d4e9df'),warm=new T.Color('#ffedc8');
  wrap(G,'init',async function(original,...args){const r=await original(...args);this.welcomeGarden115=new WelcomeGarden115(this,ctx);return r;});
  wrap(G,'handleZoneChanged',function(original,...args){const r=original(...args);this.welcomeGarden115?.rebuild();return r;});
  wrap(G,'update',function(original,...args){const r=original(...args);this.welcomeGarden115?.update();return r;});
  wrap(G,'updateSkyColors',function(original,dt){
    const r=original(dt);if(this.player.zone==='pier'&&!this.intro?.active){
      const u=this.skyDome?.material.uniforms,t=1-Math.exp(-clamp(dt,0,.1)*1.7);
      u?.topColor?.value.lerp(blue,t*.65);u?.horizonColor?.value.lerp(pearl,t*.9);this.sun?.color.lerp(warm,t*.5);
    }return r;
  });
  wrap(G,'destroy',function(original,...args){this.welcomeGarden115?.destroy();return original(...args);});
}
