/* 1.6: authored low-poly viewmodels. All dimensions are visual game units. */
import {wrap,clamp,disposeTree} from '../update/helpers.js';
import {HarpoonController} from '../update/harpoon.js';
import {makeHumanHand19} from '../shoreline19/models.js';

export function roundedBox(T,w,h,d,r=.025){
  r=Math.min(r,w*.45,h*.45,d*.45);
  const g=new T.BoxGeometry(w,h,d,4,4,4),p=g.attributes.position;
  for(let i=0;i<p.count;i++){
    const x=p.getX(i),y=p.getY(i),z=p.getZ(i),a=clamp(x,-w/2+r,w/2-r),b=clamp(y,-h/2+r,h/2-r),c=clamp(z,-d/2+r,d/2-r);
    const len=Math.hypot(x-a,y-b,z-c)||1;p.setXYZ(i,a+(x-a)*r/len,b+(y-b)*r/len,c+(z-c)*r/len);
  }
  p.needsUpdate=true;g.computeVertexNormals();return g;
}
export function material(T,color,roughness=.45,metalness=.5){return new T.MeshStandardMaterial({color,roughness,metalness});}
export function addMesh(T,parent,geo,mat,x=0,y=0,z=0){const m=new T.Mesh(geo,mat);m.position.set(x,y,z);m.frustumCulled=false;parent.add(m);return m;}
export function rodBetween(T,parent,a,b,r1,r2,mat,segments=12){
  const from=new T.Vector3(...a),to=new T.Vector3(...b),v=to.clone().sub(from);
  const m=addMesh(T,parent,new T.CylinderGeometry(r2,r1,v.length(),segments),mat);m.position.copy(from).add(to).multiplyScalar(.5);m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),v.normalize());return m;
}
const grainCache16=new WeakMap();
function grain(T,kind){
  let maps=grainCache16.get(T);if(!maps){maps={};grainCache16.set(T,maps);}if(maps[kind])return maps[kind];
  const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d');
  x.fillStyle=kind==='cork'?'#e4dfcd':'#cbbdaf';x.fillRect(0,0,128,128);
  for(let i=0;i<(kind==='cork'?450:90);i++){
    const u=(i*73+19)%128,v=(i*i*11+37)%128;
    x.fillStyle=i%3===0?'rgba(54,35,21,.26)':'rgba(255,247,219,.15)';
    if(kind==='cork')x.fillRect(u,v,1+i%3,1+i%2);
    else{x.lineWidth=.6+i%3*.3;x.beginPath();x.moveTo(u,0);x.bezierCurveTo(u-7,v,u+8,v+25,u-2,128);x.strokeStyle=x.fillStyle;x.stroke();}
  }
  const texture=new T.CanvasTexture(c);texture.colorSpace='srgb';maps[kind]=texture;return texture;
}
function palette(T){
  const p={steel:material(T,'#274753',.29,.78),edge:material(T,'#7896a0',.26,.8),dark:material(T,'#12232b',.6,.3),brass:material(T,'#b08c4b',.35,.67),wood:material(T,'#a16943',.7,.03),cork:material(T,'#d4b888',.85,.02),rope:material(T,'#cab990',.9,0),rubber:material(T,'#192932',.9,.03),glass:material(T,'#329cb2',.17,.48)};
  p.wood.map=grain(T,'wood');p.cork.map=grain(T,'cork');return p;
}
function box(T,p,mat,w,h,d,x,y,z,r=.022){return addMesh(T,p,roundedBox(T,w,h,d,r),mat,x,y,z);}
function cylinderZ(T,p,mat,r,len,x,y,z){const m=addMesh(T,p,new T.CylinderGeometry(r,r,len,16),mat,x,y,z);m.rotation.x=Math.PI/2;return m;}
function ring(T,p,mat,r,t,x,y,z){return addMesh(T,p,new T.TorusGeometry(r,t,6,20),mat,x,y,z);}
function gripWrap(T,p,M,x,y,z,length,r,count=7){for(let i=0;i<count;i++)ring(T,p,M,r,.005,x,y,z+i*length/(count-1));}
function hand(T,parent,x,y,z,side=1){
  const g=makeHumanHand19(T,{side});g.position.set(x,y,z);parent.add(g);return g;
}
function newRod(T){
  const P=palette(T),g=new T.Group();g.name='Shore rod · flexible blank and spinning reel';
  P.steel.name='Rod blank';P.cork.name='Cork grip';
  cylinderZ(T,g,P.cork,.039,.61,.08,-.035,-.05);cylinderZ(T,g,P.dark,.055,.095,.08,-.035,.28);
  cylinderZ(T,g,P.steel,.039,.27,.08,-.035,-.46);
  for(const z of [-.34,-.39,-.54,-.60])ring(T,g,P.brass,.041,.009,.08,-.035,z);
  for(let i=0;i<24;i++){const mark=box(T,g,P.wood,.014,.006,.009,.043+(i%3)*.028,-.076,-.3+i*.021,.002);mark.material=P.wood;}
  const flexible=new T.Group();flexible.name='Continuous flexible graphite blank';g.add(flexible);const sections=[],guides=[];
  for(let i=0;i<14;i++){
    const u=i/14,v=(i+1)/14;
    sections.push(rodBetween(T,flexible,[.08,.015,-.59-3.52*u],[.08,.015,-.59-3.52*v],.021*(1-u)+.003,.021*(1-v)+.003,P.steel,10));
  }
  for(let i=0;i<8;i++){
    const u=i/7,group=new T.Group();group.name='Ceramic line guide';flexible.add(group);
    const radius=.034*(1-u)+.010;
    cylinderZ(T,group,P.brass,.027*(1-u)+.008,.045,0,0,0);
    const eye=ring(T,group,P.edge,radius,.004,0,.02+radius,0);ring(T,group,P.dark,radius-.004,.0025,0,.02+radius,0);
    rodBetween(T,group,[-radius*.5,0,.023],[0,.021,0],.004,.004,P.edge,6);guides.push({group,u,radius});
  }
  const line=new T.Line(new T.BufferGeometry().setFromPoints(Array.from({length:9},()=>new T.Vector3())),new T.LineBasicMaterial({color:'#d6eee1',transparent:true,opacity:.85}));line.name='Visible rod line';line.frustumCulled=false;g.add(line);
  box(T,g,P.steel,.09,.11,.21,.08,-.14,-.44);rodBetween(T,g,[.08,-.09,-.35],[.08,-.24,-.5],.022,.024,P.edge);
  const reel=new T.Group();reel.position.set(.08,-.265,-.47);g.add(reel);
  const spool=cylinderZ(T,reel,P.brass,.083,.13,0,0,-.018);
  const thread=cylinderZ(T,reel,P.rope,.068,.10,0,0,-.028);
  for(const z of [-.086,.053])ring(T,reel,P.edge,.087,.007,0,0,z);
  const bail=ring(T,reel,P.edge,.112,.005,0,0,-.01);bail.rotation.x=.28;
  const crank=new T.Group();crank.position.copy(reel.position);g.add(crank);crank.name='Winding reel handle';
  rodBetween(T,crank,[.075,0,0],[.17,0,0],.012,.012,P.brass);rodBetween(T,crank,[.17,0,0],[.17,-.095,.025],.012,.01,P.brass);box(T,crank,P.wood,.085,.036,.038,.2,-.095,.025,.015);
  const support=hand(T,g,.12,-.11,.02,1);const windingHand=hand(T,g,.22,-.44,-.435,-1);windingHand.scale.multiplyScalar(.9);
  g.rotation.set(.20,.035,-.08);g.position.set(.01,.065,-.08);g.userData.rig16={sections,guides,line,crank,bail,spool,flex:0,support,windingHand};return g;
}
function animateRod(T,view,dt,time,reeling,reduced,fishing){
  const r=view.rod.userData.rig16;if(!r)return;
  const target=(fishing?.state==='hooked'?.15+.52*(fishing.tension??0):0)+view.castKick*.45;
  r.flex+=(target-r.flex)*(1-Math.exp(-dt*9));const flex=r.flex;
  const curve=u=>new T.Vector3(.08+(reduced?0:Math.sin(time*2.2)*.012)*u*u,.015-flex*u*u*.72,-.59-3.52*u+flex*u*u*.2);
  const up=new T.Vector3(0,1,0);
  for(let i=0;i<r.sections.length;i++){const a=curve(i/14),b=curve((i+1)/14),m=r.sections[i];m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(up,b.sub(a).normalize());}
  const arr=r.line.geometry.attributes.position;arr.setXYZ(0,.08,-.24,-.47);
  for(let i=0;i<r.guides.length;i++){const q=r.guides[i],p=curve(q.u);q.group.position.copy(p);q.group.rotation.x=-Math.atan(flex*q.u*.41);arr.setXYZ(i+1,p.x,p.y+.02+q.radius,p.z);}
  arr.needsUpdate=true;
  if(r.windingHand){const a=r.crank.rotation.x;r.windingHand.position.y=r.crank.position.y-.095*Math.cos(a)-.025*Math.sin(a)-.081;r.windingHand.position.z=r.crank.position.z-.095*Math.sin(a)+.025*Math.cos(a)+.0135;}
  if(reeling){r.bail.rotation.z-=dt*7.5;r.spool.position.z=-.018+Math.sin(time*7)*.012;}
}
function buildHarpoon(T,view){
  const P=palette(T),g=new T.Group();g.name='Reef harpoon · teak stock, loaded spear, elastic bands and reel';
  box(T,g,P.wood,.145,.12,.86,.025,.015,-.51,.045);box(T,g,P.steel,.085,.055,1.03,.025,.09,-.7,.02);
  cylinderZ(T,g,P.steel,.048,.46,.025,.022,-1.12);ring(T,g,P.brass,.054,.012,.025,.022,-1.35);
  box(T,g,P.rubber,.135,.32,.13,.025,-.18,-.18,.044).rotation.x=-.24;
  const trigger=ring(T,g,P.brass,.074,.009,.025,-.13,-.32);trigger.rotation.y=Math.PI/2;trigger.scale.y=.86;
  box(T,g,P.edge,.018,.072,.023,.025,-.105,-.29,.007).rotation.x=.35;
  for(let i=0;i<5;i++)box(T,g,P.dark,.141,.014,.12,.025,-.10-i*.044,-.163-i*.008,.006);
  for(const z of [-.28,-.68,-1.05]){const band=ring(T,g,P.brass,.085,.008,.025,.014,z);band.scale.y=.7;}
  const spear=new T.Group();spear.name='Loaded harpoon spear';g.add(spear);
  cylinderZ(T,spear,P.edge,.012,1.67,.025,.119,-.93);
  const tip=addMesh(T,spear,new T.ConeGeometry(.037,.18,5),P.edge,.025,.119,-1.846);tip.rotation.x=-Math.PI/2;
  for(const side of [-1,1])rodBetween(T,spear,[.025,.12,-1.83],[.025+side*.045,.12,-1.74],.012,.002,P.brass,5);
  const bands=[];for(const side of [-1,1])bands.push(rodBetween(T,g,[.025+side*.072,.075,-1.31],[.025+side*.051,.126,-.32],.012,.012,P.rubber,8));
  const reel=new T.Group();reel.position.set(.025,-.13,-.70);g.add(reel);
  const spool=cylinderZ(T,reel,P.rope,.083,.14,0,0,0);spool.rotation.set(0,0,Math.PI/2);
  for(const x of [-.078,.078]){const rim=ring(T,reel,P.brass,.105,.012,x,0,0);rim.rotation.y=Math.PI/2;}
  for(let i=0;i<5;i++){const coil=ring(T,reel,P.rope,.082,.006,-.05+i*.025,0,0);coil.rotation.y=Math.PI/2;}
  const crank=new T.Group();reel.add(crank);rodBetween(T,crank,[.09,0,0],[.13,.065,0],.009,.009,P.brass);box(T,crank,P.rubber,.049,.026,.033,.15,.065,0,.009);
  hand(T,g,.10,-.21,-.15,1);hand(T,g,-.06,-.10,-.93,-1);
  g.userData.rig16={spear,bands,crank,spool,kick:0};g.traverse(o=>{if(o.isMesh)o.renderOrder=1000;});return g;
}
function weaponModel(T,id){
  const P=palette(T),g=new T.Group(),rig={};g.name='Authored '+id+' · bevelled naval weapon';
  const revolver=id==='reef_revolver',shotgun=id==='breaker_shotgun',smg=id==='current_smg',sniper=id==='leviathan_rifle';
  if(sniper){P.wood.color.set('#433957');P.steel.color.set('#323e66');P.brass.color.set('#d4ab52');}
  const barrelEnd=revolver?-1.02:shotgun?-1.54:smg?-1.05:sniper?-1.86:-1.59;
  // Receiver with metal edge rails; beveled silhouettes instead of raw boxes.
  if(revolver){box(T,g,P.steel,.11,.045,.35,.03,-.07,-.30,.015);box(T,g,P.steel,.11,.19,.10,.03,.035,-.12,.018);}
  else box(T,g,P.steel,.18,.2,smg?.56:.68,.03,.045,-.40,.028);
  box(T,g,P.edge,.155,.028,revolver?.30:.56,.03,.155,revolver?-.3:-.4,.008);
  const grip=box(T,g,P.wood,.128,.29,.155,.03,-.19,-.03,.035);grip.rotation.x=-.29;
  box(T,g,P.brass,.14,.022,.17,.03,-.34,.015,.009);
  const guard=ring(T,g,P.brass,.095,.009,.03,-.13,-.245);guard.rotation.y=Math.PI/2;guard.scale.set(1, .72,1);
  box(T,g,P.dark,.018,.065,.026,.03,-.115,-.205,.007).rotation.x=.25;
  if(revolver){
    const drum=new T.Group();drum.position.set(.03,.039,-.37);g.add(drum);rig.drum=drum;
    cylinderZ(T,drum,P.brass,.109,.27,0,0,0);
    for(let i=0;i<6;i++){const a=i*Math.PI/3; cylinderZ(T,drum,P.dark,.025,.275,Math.cos(a)*.075,Math.sin(a)*.075,-.002);ring(T,drum,P.edge,.025,.004,Math.cos(a)*.075,Math.sin(a)*.075,-.144);}
    cylinderZ(T,g,P.steel,.055,.59,.03,.10,-.74);cylinderZ(T,g,P.brass,.032,.46,.03,.006,-.70);
    rig.hammer=box(T,g,P.dark,.04,.076,.087,.03,.16,-.06,.012);rig.hammer.rotation.x=-.3;
    for(let i=0;i<4;i++)box(T,g,P.brass,.135,.008,.13,.03,-.11-i*.051,-.002+i*.01,.004);
  }else{
    // Buttstock and cheek rest.
    const stock=box(T,g,smg?P.steel:P.wood,.15,.21,smg?.32:.46,.03,-.025,.15,.045);stock.rotation.x=.04;
    box(T,g,P.rubber,.165,.235,.055,.03,-.024,smg?.315:.40,.025);
    box(T,g,P.dark,.125,.045,.27,.03,.096,.16,.018);
    cylinderZ(T,g,P.steel,shotgun?.046:sniper?.033:.03,Math.abs(barrelEnd+.72),.03,.07,(barrelEnd-.72)/2);
    if(shotgun){
      cylinderZ(T,g,P.steel,.043,.72,.03,-.043,-1.08);
      const pump=new T.Group();pump.position.set(.03,-.019,-.86);g.add(pump);rig.pump=pump;
      box(T,pump,P.wood,.17,.145,.36,0,0,0,.036);
      for(let i=0;i<7;i++)box(T,pump,P.dark,.174,.017,.021,0,-.034,-.15+i*.05,.006);
      for(let i=0;i<3;i++){cylinderZ(T,g,P.brass,.024,.12,-.073,-.04-i*.058,.16);cylinderZ(T,g,P.wood,.025,.08,-.074,-.04-i*.058,.095);}
    }else{
      box(T,g,smg?P.steel:P.wood,.15,.142,smg?.28:.47,.03,.024,smg?-.70:-.91,.028);
      for(let i=0;i<(smg?3:6);i++){box(T,g,P.dark,.158,.04,.027,.03,.051,-.57-i*.08,.008);}
      const magazine=new T.Group();magazine.position.set(.03,-.092,-.40);g.add(magazine);rig.magazine=magazine;
      box(T,magazine,P.steel,.098,smg?.34:.22,.15,0,-.15,0,.014).rotation.x=smg?.05:-.14;
      if(!smg&&!sniper)box(T,magazine,P.steel,.097,.14,.15,0,-.3,.045,.014).rotation.x=-.35;
      box(T,magazine,P.brass,.103,.025,.163,0,smg?-.325:sniper?-.26:-.37,smg?0:.06,.006);
    }
    const bolt=new T.Group();bolt.position.set(.13,.068,-.25);g.add(bolt);rig.bolt=bolt;
    box(T,bolt,P.dark,.015,.07,.18,0,0,0,.005);rodBetween(T,bolt,[0,.012,-.016],[.11,-.016,-.016],.012,.012,P.edge);addMesh(T,bolt,new T.SphereGeometry(.024,10,8),P.dark,.115,-.016,-.016);
    // Mechanical sight or optic; lenses have small emissive highlights, no bloom dependency.
    if(sniper){
      box(T,g,P.brass,.11,.09,.065,.03,.22,-.29,.015);box(T,g,P.brass,.11,.09,.065,.03,.22,-.62,.015);
      cylinderZ(T,g,P.steel,.065,.52,.03,.30,-.46);cylinderZ(T,g,P.brass,.093,.115,.03,.30,-.74);cylinderZ(T,g,P.brass,.078,.11,.03,.30,-.17);
      cylinderZ(T,g,P.glass,.071,.008,.03,.30,-.11);cylinderZ(T,g,P.glass,.085,.008,.03,.30,-.801);
      addMesh(T,g,new T.CylinderGeometry(.035,.035,.051,12),P.dark,.03,.377,-.42);
      for(const z of [-.64,-.24])ring(T,g,P.brass,.070,.012,.03,.3,z);
    }else{
      box(T,g,P.dark,.10,.055,.06,.03,.196,-.25,.008);
      if(smg){const sight=ring(T,g,P.brass,.07,.013,.03,.25,-.51);sight.scale.x=.72;}
    }
  }
  // Muzzle recess and raised front sight, plus screws that break large flat areas.
  const radius=shotgun?.047:revolver?.054:.04;
  cylinderZ(T,g,P.edge,radius+.01,.067,.03,revolver?.10:.07,barrelEnd);
  cylinderZ(T,g,P.dark,radius*.72,.008,.03,revolver?.10:.07,barrelEnd-.037);
  box(T,g,P.brass,.022,.055,.06,.03,revolver?.17:.137,barrelEnd+.055,.006);
  for(const z of [-.12,-.36,-.56])for(const side of [-1,1]){const screw=addMesh(T,g,new T.CylinderGeometry(.011,.011,.011,8),P.brass,.03+side*.096,.055,z);screw.rotation.z=Math.PI/2;}
  g.userData.rig16=rig;g.userData.muzzle16={x:.03,y:revolver?.10:.07,z:barrelEnd-.08};g.traverse(o=>{if(o.isMesh)o.renderOrder=1001;});return g;
}
export function installModels16(ctx){
  const {T,ToolView,Game}=ctx,V=ToolView.prototype,H=HarpoonController.prototype;
  V.buildRod=function(){const g=newRod(T);this.reelHandle=g.userData.rig16.crank;return g;};
  H.buildView=function(){return buildHarpoon(T,this.game.toolView);};
  wrap(Game.prototype,'setupGameplaySystems',function(original,...args){const r=original(...args);this.harpoon.muzzlePoint.set(.025,.119,-1.86);return r;});
  const originalTip=V.getRodTipWorld;
  V.getRodTipWorld=function(out=new T.Vector3()){
    const r=this.rod.userData.rig16;if(!r)return originalTip.call(this,out);
    const p=r.line.geometry.attributes.position;return this.projectAttachmentToWorld(this.rod,new T.Vector3().fromBufferAttribute(p,p.count-1),out);
  };
  wrap(V,'loadWeapon',async function(original,id){
    const pistol=['pistol_1','dock_pistol'].includes(id);
    if(this.customWeapon16){disposeTree(this.customWeapon16);this.customWeapon16=null;}
    this.equipped16=id;this.equipTime16=.28;
    if(pistol){this.muzzle?.position.set(.03,.05,-.91);return original(id);}
    const data=ctx.data.weapons.find(w=>w.id===id||w.modelId===id);if(!data)return original(id);
    this.weaponRequest=Symbol('authored-'+id);
    if(this.importedWeapon){this.assetManager.disposeInstance(this.importedWeapon);this.importedWeapon=null;}
    this.gunBody.visible=false;const model=weaponModel(T,data.id);this.weapon.add(model);this.customWeapon16=model;
    if(this.muzzle){const p=model.userData.muzzle16;this.muzzle.position.set(p.x,p.y,p.z);}
  });
  wrap(V,'fire',function(original,...args){this.fireTime16=0;return original(...args);});
  wrap(V,'reload',function(original,duration=1.5,...args){this.reloadDuration16=duration;return original(duration,...args);});
  wrap(V,'setTool',function(original,...args){const r=original(...args);this.equipTime16=.24;return r;});
  wrap(V,'update',function(original,dt,time,moving,mouse,reeling,reduced,fishing){
    const rodPitch=this.rod.rotation.x;const result=original(dt,time,moving,mouse,reeling,reduced,fishing);
    const h=fishing?.state==='hooked'?(fishing.tension??0):0;
    this.rod.rotation.x=rodPitch+(.20-h*.07-rodPitch)*(1-Math.exp(-dt*10));
    this.rod.rotation.y=.035+(fishing?.fight?.direction??0)*.035;
    this.weapon.rotation.set(this.customWeapon16?.035:-.06,this.customWeapon16?.18:-.04,.01);
    animateRod(T,this,dt,time,reeling,reduced,fishing);
    this.equipTime16=Math.max(0,(this.equipTime16??0)-dt);if(!reduced)this.root.position.y-=Math.pow(this.equipTime16/.28,2)*.24;
    this.fireTime16=(this.fireTime16??10)+dt;const t=this.fireTime16,cycle=clamp(t/.45),snap=Math.sin(Math.PI*clamp(t/.14));
    const g=this.customWeapon16,r=g?.userData.rig16;
    if(r){
      const reload=this.reloadAmount>0?clamp(1-this.reloadAmount/(this.reloadDuration16||1.5)):0,w=Math.sin(reload*Math.PI);
      if(r.bolt)r.bolt.position.z=-.25+snap*.095;
      if(r.pump)r.pump.position.z=-.86+(t<.45?Math.sin(cycle*Math.PI)*.20:0);
      if(r.drum){r.drum.position.x=.03-w*.18;r.drum.rotation.z=(this.shotSequence??0)*Math.PI/3+reload*Math.PI*3;}
      if(r.hammer)r.hammer.rotation.x=-.3-snap*.4;
      if(r.magazine){r.magazine.position.y=-.092-w*.25;r.magazine.rotation.x=-w*.18;}
      g.rotation.z=reduced?0:-w*.12;g.position.y=-w*.045;
    }
    return result;
  });
  wrap(H,'update',function(original,dt,...args){
    const result=original(dt,...args),r=this.view.userData.rig16;if(!r)return result;
    r.spear.visible=this.state==='ready';r.crank.rotation.x-=this.state==='tethered'?dt*9:this.state==='returning'?dt*14:0;
    r.kick+=(this.state==='flying'?1-r.kick:-r.kick)*(1-Math.exp(-dt*12));
    this.view.position.z=r.kick*.1;this.view.rotation.x=-r.kick*.055;
    for(const b of r.bands)b.scale.y=1-r.kick*.52;
    return result;
  });
  wrap(Game.prototype,'destroy',function(original,...args){
    // The view scene is separate from the world and is not owned by AssetManager.
    if(this.toolView?.rod)disposeTree(this.toolView.rod);if(this.toolView?.customWeapon16)disposeTree(this.toolView.customWeapon16);
    return original(...args);
  });
}
