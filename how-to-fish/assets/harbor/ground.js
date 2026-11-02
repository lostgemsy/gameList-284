/* v1.4: one source of truth for beach collision, fishing, props and wildlife.
   A static, spatially indexed triangle sampler reads the visible terrain mesh.
   No hand-authored ellipse can extend walkable ground into the ocean. */
import {wrap} from '../update/helpers.js';

export class TerrainSampler {
  constructor(roots,T){
    this.cellSize=3;this.cells=new Map();this.triangles=[];this.meshes=[];
    const a=new T.Vector3(),b=new T.Vector3(),c=new T.Vector3();
    for(const root of roots.filter(Boolean)){
      root.updateWorldMatrix(true,true);
      root.traverse(mesh=>{
        if(!mesh.isMesh||!/(?:\bsand terrain\b|\bgrass terrain\b|\bcliff terrain\b|island-(?:terrain-cliff|sand-shore|grass-ground))/.test(mesh.name))return;
        this.meshes.push(mesh);const p=mesh.geometry.attributes.position,idx=mesh.geometry.index,n=idx?.count??p.count;
        for(let i=0;i<n;i+=3){
          a.fromBufferAttribute(p,idx?idx.getX(i):i).applyMatrix4(mesh.matrixWorld);
          b.fromBufferAttribute(p,idx?idx.getX(i+1):i+1).applyMatrix4(mesh.matrixWorld);
          c.fromBufferAttribute(p,idx?idx.getX(i+2):i+2).applyMatrix4(mesh.matrixWorld);
          const den=(b.z-c.z)*(a.x-c.x)+(c.x-b.x)*(a.z-c.z);
          // Up-facing triangles only; never use cliff bottoms or vertical walls.
          const up=(b.z-a.z)*(c.x-a.x)-(b.x-a.x)*(c.z-a.z);
          if(Math.abs(den)<1e-8||up<=1e-8)continue;
          const tri={a:a.toArray(),b:b.toArray(),c:c.toArray(),den,kind:/sand/.test(mesh.name)?'sand':'grass'};
          const id=this.triangles.push(tri)-1;
          for(let x=Math.floor(Math.min(a.x,b.x,c.x)/3);x<=Math.floor(Math.max(a.x,b.x,c.x)/3);x++)
            for(let z=Math.floor(Math.min(a.z,b.z,c.z)/3);z<=Math.floor(Math.max(a.z,b.z,c.z)/3);z++){
              const key=x+','+z;let list=this.cells.get(key);if(!list)this.cells.set(key,list=[]);list.push(id);
            }
        }
      });
    }
  }
  sample(x,z){
    let best=null;const candidates=this.cells.get(Math.floor(x/3)+','+Math.floor(z/3));
    if(!candidates)return null;
    for(const id of candidates){const t=this.triangles[id],a=t.a,b=t.b,c=t.c;
      const u=((b[2]-c[2])*(x-c[0])+(c[0]-b[0])*(z-c[2]))/t.den;
      const v=((c[2]-a[2])*(x-c[0])+(a[0]-c[0])*(z-c[2]))/t.den;
      if(u< -1e-5||v< -1e-5||u+v>1.00001)continue;
      const y=u*a[1]+v*b[1]+(1-u-v)*c[1];
      if(!best||y>best.y)best={y,kind:t.kind};
    }
    return best;
  }
  dry(x,z,margin=0){
    const p=this.sample(x,z);if(!p||p.y<.075)return null;
    if(margin>0)for(const [dx,dz] of [[margin,0],[-margin,0],[0,margin],[0,-margin]]){
      const q=this.sample(x+dx,z+dz);if(!q||q.y<.075)return null;
    }
    return p;
  }
}
export function installGround(ctx){
  const {Game,T}=ctx;
  Game.prototype.rebuildTerrainSampler=function(zoneId=this.player.zone){
    const remote=this.zoneSystem?.activeDecor?.group;
    this.terrainSampler=new TerrainSampler(zoneId==='pier'?[this.starterWorld]:[remote],T);
    this.terrainZone=zoneId;return this.terrainSampler;
  };
  wrap(Game.prototype,'buildStarterWorld',function(original,...args){const r=original(...args);this.rebuildTerrainSampler('pier');return r;});
  wrap(Game.prototype,'surfaceAt',function(original,x,z,margin=0){
    if(!this.terrainSampler?.triangles.length)return original(x,z,margin);
    let top=null;
    // Boardwalks are rectangular authored meshes. Keep them, not island ellipses.
    for(const c of this.colliders??[])if(c.shape!=='ellipse'&&this.colliderContains(c,x,z,margin))top=Math.max(top??-Infinity,c.y);
    const p=this.terrainSampler.dry(x,z,Math.max(0,margin));
    if(p)top=Math.max(top??-Infinity,p.y+this.playerEyeHeight);
    return top;
  });
  Game.prototype.landformPoint=function(land,x,z){
    const a=land?.rotationY??0,c=Math.cos(a),s=Math.sin(a),o=land?.center??[0,0,0];
    // Three.js positive Y rotation is clockwise in the world X/Z plane.
    return new T.Vector3(o[0]+x*c+z*s,0,o[2]-x*s+z*c);
  };
  wrap(Game.prototype,'isWaterPoint',function(original,p,margin=0){
    if(!p||!this.terrainSampler?.triangles.length)return original(p,margin);
    const z=this.zoneSystem?.currentZone,c=z?.bounds?.center??[0,0,0],radius=z?.bounds?.radius??115;
    if(Math.hypot(p.x-c[0],p.z-c[2])>radius-Math.max(1,margin))return false;
    const r=Math.max(.12,margin);
    for(const [dx,dz] of [[0,0],[r,0],[-r,0],[0,r],[0,-r]]){
      if(this.surfaceAt(p.x+dx,p.z+dz)!==null)return false;
      const terrain=this.terrainSampler.sample(p.x+dx,p.z+dz);
      if(terrain&&terrain.y>.015)return false;
    }
    return true;
  });
  Game.prototype.findDryPosition=function(origin,maxDistance=35,margin=.45){
    for(let radius=0;radius<=maxDistance;radius+=.65){
      const count=Math.max(1,Math.ceil(radius*9));
      for(let i=0;i<count;i++){
        const a=i/count*Math.PI*2,x=origin.x+Math.cos(a)*radius,z=origin.z+Math.sin(a)*radius;
        const y=this.surfaceAt(x,z,margin);
        if(y!==null&&!this.isSolidAt(x,z,margin))return new T.Vector3(x,y,z);
      }
    }
    return null;
  };
  // Re-seat the bottom of each visible tree on the actual triangle under it.
  Game.prototype.groundVegetation=function(){
    const roots=this.player.zone==='pier'?[this.starterWorld]:[this.zoneSystem?.activeDecor?.group];
    const plants=[];
    for(const root of roots.filter(Boolean))root.traverse(o=>{
      if(o.userData._grounded14)return;
      const name=o.name??'',id=o.userData.assetId??o.userData.modelId??'';
      if((/palm|tree[_ -]/i.test(name+' '+id))&&!o.parent?.userData._grounded14&&
        (o.userData.zoneDecor||o.userData.assetId||o.isGroup&&/palm/i.test(name)))plants.push(o);
    });
    for(const plant of plants){
      if(plants.some(p=>p!==plant&&isChild(plant,p)))continue;
      plant.updateWorldMatrix(true,true);let at=plant.getWorldPosition(new T.Vector3());
      let point=this.terrainSampler?.dry(at.x,at.z,.18);
      if(!point){const safe=this.findDryPosition(at,8,.25);if(!safe){plant.visible=false;plant.userData._grounded14=true;continue;}
        const local=plant.parent.worldToLocal(safe.clone().setY(at.y));plant.position.x=local.x;plant.position.z=local.z;plant.updateWorldMatrix(true,true);at=plant.getWorldPosition(new T.Vector3());point=this.terrainSampler.dry(at.x,at.z);}
      if(!point)continue;
      const box=new T.Box3().setFromObject(plant),delta=point.y-box.min.y-.06;
      plant.position.y+=delta;
      if(plant.userData.zoneDecor)plant.userData.zoneDecor.baseY=plant.position.y;
      plant.userData._grounded14=true;
    }
  };
  wrap(Game.prototype,'handleZoneChanged',function(original,payload){
    this.rebuildTerrainSampler(payload.zone.id);
    const r=original(payload);
    this.groundVegetation();
    if(!this.boatController?.isPiloting){const y=this.surfaceAt(this.player.position.x,this.player.position.z,.3);
      const safe=y==null?this.findDryPosition(this.player.position,50):this.player.position.clone().setY(y);
      if(safe){this.player.position.copy(safe);this.player.velocity.set(0,0,0);this.player.grounded=true;this.camera.position.copy(safe);}}
    return r;
  });
  wrap(Game.prototype,'init',async function(original,...args){const r=await original(...args);this.rebuildTerrainSampler();this.groundVegetation();this.worldPolish?.rebuild();return r;});
  wrap(Game.prototype,'populateStarterWorldAssets',async function(original,...args){const r=await original(...args);this.groundVegetation();return r;});
  wrap(Game.prototype,'update',function(original,dt){
    const r=original(dt);this._groundAudit=(this._groundAudit??0)-dt;
    if(this._groundAudit<=0){this._groundAudit=3;this.groundVegetation();}
    if(this.mode==='playing'&&!this.platformPaused&&!this.panelOpen&&!this.intro?.active&&!this.boatController?.isPiloting&&this.surfaceAt(this.player.position.x,this.player.position.z)==null){
      const safe=this.findDryPosition(this.player.position,20);
      if(safe){this.player.position.copy(safe);this.player.velocity.set(0,0,0);this.player.grounded=true;this.camera.position.copy(safe);}
    }
    return r;
  });
}
function isChild(o,parent){for(let p=o.parent;p;p=p.parent)if(p===parent)return true;return false;}
