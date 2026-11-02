import {wrap,disposeTree} from '../update/helpers.js';
import {addMesh,material,rodBetween} from './models.js';
/** Small local scene details. No new navigation obstacles or dynamic lights. */
class SeaDetails16 {
  constructor(g,ctx){this.g=g;this.T=ctx.T;this.time=0;this.rebuild();}
  rebuild(){
    if(this.root)disposeTree(this.root);const g=this.g,T=this.T;this.root=new T.Group();this.root.name='Harbour details · navigation buoys and beach driftwood';this.root.userData.ignoreShots=true;g.scene.add(this.root);this.buoys=[];
    const zone=g.zoneSystem.currentZone,dock=g.zoneSystem._dockPose(zone),dir=dock.position.clone().sub(new T.Vector3().fromArray(zone.bounds.center)).setY(0).normalize();if(dir.lengthSq()<.1)dir.set(0,0,-1);
    const side=new T.Vector3(-dir.z,0,dir.x),metal=material(T,'#315262',.58,.38),rope=material(T,'#beab80',.86,.02),wood=material(T,'#8f7557',.91,.01);
    for(const hand of [-1,1]){
      const p=dock.position.clone().addScaledVector(dir,10).addScaledVector(side,hand*6.5);if(g.surfaceAt(p.x,p.z,.35)!==null)continue;
      const body=new T.Group();body.position.set(p.x,.1,p.z);this.root.add(body);
      const paint=material(T,hand<0?'#b35f49':'#48957e',.64,.18);
      const torus=addMesh(T,body,new T.TorusGeometry(.32,.105,7,16),paint);torus.rotation.x=Math.PI/2;
      addMesh(T,body,new T.CylinderGeometry(.14,.24,.29,10),metal,0,.14,0);
      rodBetween(T,body,[0,.25,0],[0,1.33,0],.035,.02,metal,8);
      const cage=addMesh(T,body,new T.CylinderGeometry(.09,.09,.18,8),rope,0,1.21,0);
      const lamp=addMesh(T,body,new T.SphereGeometry(.062,8,6),new T.MeshBasicMaterial({color:hand<0?'#ffc48a':'#9ae8c1'}),0,1.31,0);
      const flagGeo=new T.BufferGeometry().setAttribute('position',new T.Float32BufferAttribute([0,0,0,.36,-.06,0,0,-.18,0],3));flagGeo.computeVertexNormals();
      const flag=addMesh(T,body,flagGeo,new T.MeshStandardMaterial({color:hand<0?'#d59b4f':'#70b1a5',roughness:.8,side:T.DoubleSide}),0,1.03,0);
      const ring=addMesh(T,this.root,new T.TorusGeometry(.62,.011,4,28),new T.MeshBasicMaterial({color:'#b4ddd0',transparent:true,opacity:.3,depthWrite:false}),p.x,.028,p.z);ring.rotation.x=Math.PI/2;
      this.buoys.push({body,flag,ring,lamp,phase:hand*1.7});
    }
    // A few grounded driftwood pieces off the main path; never cover a collectible.
    let placed=0;
    for(const c of g.worldPolish?.crabs??[]){
      if(placed>=3)break;const x=c.root.position.x+1.6,z=c.root.position.z+.65,ground=g.terrainSampler?.dry(x,z,.55);
      if(!ground||ground.kind!=='sand'||g.isSolidAt(x,z,.65)||(g.islandLife15?.items??[]).some(i=>Math.hypot(i.root.position.x-x,i.root.position.z-z)<.9))continue;
      const pile=new T.Group();pile.position.set(x,ground.y+.035,z);pile.rotation.y=placed*1.71;this.root.add(pile);
      rodBetween(T,pile,[-.56,.05,-.1],[.54,.065,.12],.059,.038,wood,7);rodBetween(T,pile,[-.27,.04,.21],[.33,.07,-.23],.036,.021,wood,6);
      for(let i=0;i<3;i++){const shell=addMesh(T,pile,new T.SphereGeometry(.06,7,4),rope,-.34+i*.29,.025,.29+(i%2)*.12);shell.scale.set(1,.32,1.3);shell.rotation.y=i*.87;}
      placed++;
    }
    this.driftwoodCount=placed;
  }
  update(dt){
    const g=this.g;if(g.mode!=='playing'||g.platformPaused)return;this.root.visible=!g.intro?.active;this.time+=dt;const reduced=g.progression.state.settings.reducedMotion;
    for(const b of this.buoys){const t=this.time+b.phase;b.body.position.y=.1+(reduced?0:Math.sin(t*1.6)*.055);b.body.rotation.z=reduced?0:Math.sin(t*1.1)*.06;b.flag.rotation.y=Math.sin(t*3)*.24;b.ring.scale.setScalar(.96+Math.sin(t*1.5)*.12);b.ring.material.opacity=.23+Math.sin(t*1.5)*.08;}
  }
  destroy(){disposeTree(this.root);}
}
export function installScenery16(ctx){
  wrap(ctx.Game.prototype,'init',async function(original,...args){const result=await original(...args);this.seaDetails16=new SeaDetails16(this,ctx);return result;});
  wrap(ctx.Game.prototype,'handleZoneChanged',function(original,...args){const result=original(...args);this.seaDetails16?.rebuild();return result;});
  wrap(ctx.Game.prototype,'update',function(original,dt){const result=original(dt);this.seaDetails16?.update(Math.min(.06,Math.max(0,dt)));return result;});
  wrap(ctx.Game.prototype,'destroy',function(original,...args){this.seaDetails16?.destroy();return original(...args);});
}
