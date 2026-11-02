import {wrap,disposeTree,clamp} from '../update/helpers.js';
import {WorldPolish} from '../homecoming/world.js';
import {marketState,now} from '../harbor/commerce.js';
import {loc} from '../renewal/state.js';
import {addMesh,material,rodBetween} from './models.js';

function crabModel(T){
  const root=new T.Group();root.name='Shore crab · jointed legs, eye stalks and working pincers';
  const shell=material(T,'#ba5739',.53,.07),red=material(T,'#d5784c',.52,.04),cream=material(T,'#e3be88',.7,0),dark=material(T,'#19292b',.27,.1),bright=material(T,'#f4e5be',.3,0);
  const sphere=(p,m,x,y,z,a,b,c)=>{const o=addMesh(T,p,new T.SphereGeometry(1,12,8),m,x,y,z);o.scale.set(a,b,c);return o;};
  const body=new T.Group();root.add(body);
  sphere(body,shell,0,.04,0,.29,.135,.225);sphere(body,cream,0,-.023,-.018,.242,.058,.18);
  // Raised carapace edge and paired marks, not a featureless red sphere.
  const rim=addMesh(T,body,new T.TorusGeometry(.235,.018,5,24),red,0,.025,0);rim.rotation.x=Math.PI/2;rim.scale.y=1.18;
  for(const side of [-1,1]){
    sphere(body,red,side*.10,.159,-.005,.072,.012,.10);
    for(let i=0;i<3;i++)rodBetween(T,body,[side*.21,.045,.105-i*.075],[side*(.32-i*.014),.055,.09-i*.076],.024,.002,red,5);
    rodBetween(T,body,[side*.085,.09,-.145],[side*.10,.245,-.184],.02,.015,red,8);
    sphere(body,dark,side*.10,.245,-.184,.031,.039,.032);sphere(body,bright,side*.111,.257,-.207,.009,.010,.007);
  }
  const legs=[];
  for(const side of [-1,1])for(let i=0;i<4;i++){
    const pivot=new T.Group();pivot.position.set(side*.207,.001,(i-1.5)*.087);root.add(pivot);
    const spread=(i-1.5)*.10;
    rodBetween(T,pivot,[0,0,0],[side*.19,.005,spread],.029,.02,red,7);
    const knee=new T.Group();knee.position.set(side*.19,.005,spread);pivot.add(knee);
    rodBetween(T,knee,[0,0,0],[side*.11,-.094,spread*.28],.023,.004,shell,7);
    sphere(pivot,cream,side*.19,.005,spread,.025,.02,.025);
    legs.push({pivot,knee,side,index:i});
  }
  const claws=[];
  for(const side of [-1,1]){
    const arm=new T.Group();arm.position.set(side*.20,.02,-.16);root.add(arm);
    rodBetween(T,arm,[0,0,0],[side*.13,.035,-.12],.033,.043,shell,8);
    const wrist=new T.Group();wrist.position.set(side*.13,.035,-.12);arm.add(wrist);
    sphere(wrist,red,0,.015,-.043,.095,.064,.12);
    const a=new T.Group(),b=new T.Group();wrist.add(a,b);a.position.set(-.033,.01,-.098);b.position.set(.034,.01,-.098);
    rodBetween(T,a,[0,0,0],[.016,.014,-.126],.036,.006,cream,8);rodBetween(T,b,[0,0,0],[-.014,.014,-.12],.036,.005,red,8);
    claws.push({arm,wrist,a,b,side});
  }
  root.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});return {root,body,legs,claws};
}
function target(item,kind){
  if(!item.hitTarget16)item.hitTarget16={object:item.root,sizeM:kind==='crab'?.7:.65,ground16:item,kind16:kind,hp:1,maxHp:1};
  return item.hitTarget16;
}
function collectGround(g,bird){
  const item=bird.ground16;if(!item?.root.visible)return false;
  if(bird.kind16!=='crab')return g.islandLife15?.collect(item)??false;
  const state=marketState(g.progression),clock=now(g);if((state.crabs[item.id]??0)>clock)return false;
  item.root.visible=false;state.crabs[item.id]=clock+90000;g.progression.addCoins(3,'beach-crab');
  g.audio.play('coin',{volume:.4,queueWhileLoading:true});g.toast(loc('Краб · +3 монеты','Crab · +3 coins'),'sale');return true;
}
export function installLife16(ctx){
  const {T,Game,Wildlife}=ctx;
  WorldPolish.prototype.addCrab=function(x,y,z,rand){const rig=crabModel(T),root=rig.root;root.position.set(x,y+.1,z);this.root.add(root);this.crabs.push({root,legs:[],x,z,phase:rand()*6.28,direction:rand()*6.28,rig16:rig});};
  wrap(WorldPolish.prototype,'update',function(original,dt){
    const r=original(dt),reduced=this.game.progression.state.settings.reducedMotion;
    if(this.game.panelOpen||this.game.platformPaused||this.game.mode!=='playing')return r;
    for(const c of this.crabs){const rig=c.rig16;if(!rig||!c.root.visible)continue;
      const distance=c.lastPosition16?c.root.position.distanceTo(c.lastPosition16):0;c.lastPosition16??=c.root.position.clone();c.lastPosition16.copy(c.root.position);
      c.gait16=(c.gait16??0)+distance*27;const walk=distance>.00001;
      rig.body.position.y=reduced?0:Math.sin(this.time*1.6+c.phase)*.007;
      for(const leg of rig.legs){const phase=c.gait16+leg.index*Math.PI*.75+(leg.side>0?Math.PI:0),s=Math.sin(phase);leg.pivot.rotation.y=walk?s*.2:Math.sin(this.time*.7+c.phase)*.02;leg.pivot.rotation.z=leg.side*Math.max(0,Math.cos(phase))*(walk?.2:0);leg.knee.rotation.z=-leg.side*Math.max(0,Math.cos(phase))*(walk?.24:0);}
      for(const claw of rig.claws){const a=reduced?.06:.12+(Math.sin(this.time*1.5+c.phase+claw.side)+1)*.065;claw.a.rotation.y=-a;claw.b.rotation.y=a;claw.arm.rotation.x=reduced?0:Math.sin(this.time*1.2+c.phase)*.045;}
    }return r;
  });
  // Reuse the combat system's closest-hit and world-occlusion rules. Ground
  // creatures are wildlife targets, but never enter the seagull leaderboard.
  wrap(Wildlife.prototype,'raycast',function(original,camera,range=120,aim={x:0,y:0}){
    let best=original(camera,range,aim);const g=this.game;if(!g)return best;
    this.raycaster.setFromCamera(aim,camera);const ray=this.raycaster.ray;
    const test=(item,kind,center,radius)=>{
      if(!item.root.visible)return;const offset=center.clone().sub(ray.origin),t=offset.dot(ray.direction),d2=offset.lengthSq()-t*t;
      if(d2>radius*radius||t+radius<0)return;const distance=Math.max(0,t-Math.sqrt(Math.max(0,radius*radius-d2)));
      if(distance>range||best&&distance>=best.distance)return;best={bird:target(item,kind),point:ray.at(distance,new T.Vector3()),distance,object:item.root};
    };
    for(const c of g.worldPolish?.crabs??[])test(c,'crab',c.root.position.clone().add(new T.Vector3(0,.055,-.015)),.285);
    for(const item of g.islandLife15?.items??[]){for(const along of [-.24,0,.24]){const p=item.root.position.clone().add(new T.Vector3(Math.cos(item.direction)*along,.065,Math.sin(item.direction)*along));test(item,item.kind,p,item.kind==='larva'?.11:.095);}}
    return best;
  });
  wrap(Wildlife.prototype,'damage',function(original,bird,amount,...args){
    if(!bird?.ground16)return original(bird,amount,...args);if(!(amount>0)||!collectGround(this.game,bird))return null;
    return {damage:1,killed:true};
  });
  wrap(Game.prototype,'handleWildlifeKill',function(original,event,...args){if(event?.bird?.ground16)return;return original(event,...args);});
  wrap(Game.prototype,'handleWildlifeHit',function(original,event,...args){
    if(!event?.bird?.ground16)return original(event,...args);
    this.audio.play('hit',{volume:.32});const marker=document.querySelector('#hit-marker');
    if(marker){marker.textContent='✦';marker.classList.remove('hidden');marker.style.color='#ffd45c';clearTimeout(this.hitMarkerTimer);this.hitMarkerTimer=setTimeout(()=>marker.classList.add('hidden'),150);}
  });
}
