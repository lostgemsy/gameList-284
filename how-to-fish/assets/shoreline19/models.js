import {wrap} from '../update/helpers.js';
import {ModelBuilder19,loft19,tube19} from './geometry.js';
/** Human grip: a continuous tapered forearm, an oval wrist, thenar pad,
 * four differently sized curled fingers, an opposing thumb and short nails.
 * All skin detail is baked; each hand costs only three render calls. */
export function makeHumanHand19(T,{side=1}={}){
  const root=new T.Group();root.name=side>0?'Human right hand · anatomical grip':'Human left hand · anatomical grip';
  const skin=new ModelBuilder19(T),nails=new ModelBuilder19(T),cloth=new ModelBuilder19(T);
  const tan='#c18b68',warm='#ca9474',knuckle='#c99273',palm='#d3a382';
  skin.mesh(loft19(T,[[.15,-.365,.265,.069,.059],[.095,-.29,.172,.067,.052],[.047,-.205,.085,.054,.042],[.012,-.13,.035,.043,.030],[0,-.077,.018,.041,.029],[0,-.046,.012,.047,.031],[0,-.008,.009,.060,.034],[0,.042,.004,.065,.032],[0,.074,-.002,.058,.028]],18),tan);
  skin.sphere(palm,[.038,-.005,-.02],[.030,.055,.029],14);skin.sphere(warm,[-.037,.013,-.014],[.021,.051,.023],12);
  for(let i=0;i<4;i++){
    const x=[.046,.016,-.017,-.047][i],len=[.068,.091,.086,.068][i],r=[.013,.016,.015,.012][i];
    const points=[[x,.054,.002],[x,.082,-.010],[x,.064+len*.56,-.037],[x,.068+len*.41,-.073],[x,.049+len*.26,-.085]];
    skin.mesh(tube19(T,points,t=>r*(1-.20*t)+Math.sin(t*Math.PI*3)*.0008,12,22),i%2?warm:tan);
    skin.sphere(knuckle,[x,.072,-.003],[r*1.04,r*.78,r*.95],10);
    const tip=points.at(-1);nails.sphere('#dfb9a2',[tip[0],tip[1]-.001,tip[2]-.008],[r*.66,.014,.0035],10);
    for(const z of [-.03,-.068])skin.rod('#b67d60',[x-r*.60,.079+len*.30,z],[x+r*.60,.079+len*.30,z],.0009,.0009,5);
  }
  // The thumb crosses the grip rather than appearing as a fifth parallel finger.
  const thumb=[[.047,-.018,-.003],[.075,.008,-.031],[.064,.045,-.072],[.033,.062,-.092],[.012,.071,-.090]];
  skin.mesh(tube19(T,thumb,t=>.020-.007*t,12,24),warm);nails.sphere('#e1bea8',[.012,.075,-.099],[.012,.013,.004],12);
  // Tendon relief is deliberately subtle under the skin, not dark ink lines.
  for(const x of [-.017,.017])skin.mesh(tube19(T,[[x,-.081,.047],[x-.004,-.039,.043],[x*.8,.012,.038]],.0015,5,8),'#c89573');
  cloth.mesh(loft19(T,[[.16,-.365,.267,.077,.068],[.22,-.47,.43,.092,.077],[.26,-.58,.57,.103,.087],[.29,-.68,.70,.113,.094]],16),'#244b5a');
  cloth.mesh(loft19(T,[[.14,-.339,.238,.079,.068],[.151,-.363,.267,.082,.071],[.163,-.388,.302,.079,.069]],16),'#456673');
  for(let i=0;i<10;i++){
    const a=i/10*Math.PI*2,p=[.153+Math.cos(a)*.082,-.364,.269+Math.sin(a)*.072];
    cloth.sphere('#96a1a0',p,[.002,.007,.002],6);
  }
  for(const [builder,roughness,name] of [[skin,.72,'Warm human skin'],[nails,.43,'Natural short fingernails'],[cloth,.96,'Rolled sailor sleeve']]){
    const mesh=new T.Mesh(builder.finish(),new T.MeshStandardMaterial({vertexColors:true,roughness,metalness:0}));mesh.name=name;mesh.frustumCulled=false;mesh.renderOrder=1002;root.add(mesh);
  }
  root.rotation.y=side*Math.PI/2;root.scale.x=side;root.userData.humanHand19=true;return root;
}
export function installModels19(ctx){
  const {T,ToolView:V}=ctx;
  // The weapon shared the old capsule-arm helper; replace it for every gun.
  V.prototype.makeArm=function(x,y,z,angle){const side=angle>0?1:-1,g=makeHumanHand19(T,{side});g.position.set(side>0?.095:-.064,side>0?-.245:-.27,side>0?.015:.07);g.scale.multiplyScalar(.96);return g;};
  wrap(V.prototype,'update',function(original,...args){const r=original(...args);if(this.tool==='rod'){this.root.position.y+=.12;this.root.position.x-=.035;}return r;});
  wrap(V.prototype,'buildRod',function(original,...args){
    const g=original(...args);g.name='Shoreline rod · graphite blank, spinning reel and human hands';
    const b=new ModelBuilder19(T);
    // A knurled reel seat, neatly bound guide feet and a graduated butt cap.
    for(let i=0;i<10;i++)b.torus(i%2?'#9f915d':'#283e44',.041,.003,[.08,-.035,-.40-i*.007]);
    for(const z of [-.56,-.58,-.60])b.torus('#c09851',.024,.002,[.08,.015,z]);
    b.sphere('#7d9c9a',[.08,-.035,.332],[.037,.037,.006]);
    const detail=new T.Mesh(b.finish(),new T.MeshStandardMaterial({vertexColors:true,roughness:.38,metalness:.6}));detail.name='Fine reel-seat fittings';detail.frustumCulled=false;detail.renderOrder=1001;g.add(detail);
    return g;
  });
}
