/* Coherent low-frequency bending + small leaf flutter. All deformation runs
 * in the vertex shader: no per-tree CPU animation or new draw calls. */
import {wrap} from '../update/helpers.js';
export function installWind19(ctx){
  const T=ctx.T,uniforms={coastalTime19:{value:0},coastalStrength19:{value:1}},geometries=new WeakMap(),materials=new WeakMap(),ownedMaterials=new Set(),ownedGeometries=new Set();
  function decorate(mesh){
    if(!mesh.isMesh||mesh.userData.wind19||!mesh.geometry?.attributes.position||Array.isArray(mesh.material)||mesh.isSkinnedMesh)return;
    let geometry=geometries.get(mesh.geometry);
    if(!geometry){
      geometry=mesh.geometry.clone();geometry.computeBoundingBox();const bb=geometry.boundingBox,p=geometry.attributes.position,c=geometry.attributes.color;
      const base=Math.min(0,bb.min.y),height=Math.max(.15,bb.max.y-base),weights=new Float32Array(p.count*2);
      for(let i=0;i<p.count;i++){
        const y=Math.max(0,Math.min(1,(p.getY(i)-base)/height));
        let leaf=y>.65?Math.min(1,(y-.55)*3):0;
        if(c)leaf=c.getY(i)>c.getX(i)*1.08&&c.getY(i)>c.getZ(i)*.95?Math.max(leaf,.65):0;
        weights[i*2]=y*y*Math.min(height,13)*.15;weights[i*2+1]=leaf*y;
      }
      geometry.setAttribute('coastalWind19',new T.Float32BufferAttribute(weights,2));geometries.set(mesh.geometry,geometry);ownedGeometries.add(geometry);const owned=geometry;owned.addEventListener('dispose',()=>ownedGeometries.delete(owned));
    }
    mesh.geometry=geometry;let mat=materials.get(mesh.material);
    if(!mat){
      mat=mesh.material.clone();const previous=mesh.material.onBeforeCompile;
      mat.onBeforeCompile=function(shader,renderer){
        previous?.call(this,shader,renderer);Object.assign(shader.uniforms,uniforms);
        shader.vertexShader='attribute vec2 coastalWind19;\nuniform float coastalTime19;\nuniform float coastalStrength19;\n'+shader.vertexShader;
        shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>',`#include <begin_vertex>
          vec4 coastWorld19 = vec4(position, 1.0);
          #ifdef USE_INSTANCING
            coastWorld19 = instanceMatrix * coastWorld19;
          #endif
          coastWorld19 = modelMatrix * coastWorld19;
          float coastPhase19 = coastWorld19.x * .055 + coastWorld19.z * .039;
          float coastGust19 = .68 + .20 * sin(coastalTime19 * .38 + coastPhase19 * .43);
          float coastBend19 = (sin(coastalTime19 * .92 + coastPhase19) + .30 * sin(coastalTime19 * 1.47 + coastPhase19 * 1.3)) * coastGust19;
          float coastFlutter19 = sin(coastalTime19 * 3.15 + coastWorld19.x * .86 + coastWorld19.z * .68) * .018 * coastalWind19.y;
          transformed.x += coastalStrength19 * (coastBend19 * coastalWind19.x * .13 + coastFlutter19);
          transformed.z += coastalStrength19 * (coastBend19 * coastalWind19.x * .072 + coastFlutter19 * .46);
          transformed.y += coastalStrength19 * coastFlutter19 * .35;
        `);
      };
      const priorKey=mesh.material.customProgramCacheKey?.bind(mesh.material);mat.customProgramCacheKey=()=>String(priorKey?.()??'')+'|coastal-wind-19';
      materials.set(mesh.material,mat);ownedMaterials.add(mat);const owned=mat;owned.addEventListener('dispose',()=>ownedMaterials.delete(owned));
    }
    mesh.material=mat;mesh.userData.wind19=true;mesh.userData.windBendMax19=.38;
  }
  function scan(g){let count=0;const walk=(o,vegetation=false)=>{
    const name=o.name??'',own=/palm|tree_[123]|bush_[123]|grass_[123]|plant_|wind-grass|sea oats|coastal flowers/i.test(name);
    const plant=vegetation||own;
    if(plant&&o.isMesh){decorate(o);if(o.userData.wind19)count++;}
    for(const child of o.children)walk(child,plant);
  };walk(g.scene);g.windTreeCount19=count;}
  ctx.wind19={decorate,scan,uniforms};
  wrap(ctx.Game.prototype,'makePalm',function(original,...args){const m=original(...args);decorate(m);return m;});
  wrap(ctx.Game.prototype,'init',async function(original,...args){const r=await original(...args);scan(this);this._windScanDue19=2;return r;});
  wrap(ctx.Game.prototype,'populateStarterWorldAssets',async function(original,...args){const r=await original(...args);scan(this);return r;});
  wrap(ctx.Game.prototype,'handleZoneChanged',function(original,...args){const r=original(...args);scan(this);this._windScanDue19=1;return r;});
  wrap(ctx.Game.prototype,'update',function(original,dt){
    const r=original(dt);if(this.mode!=='playing'||this.platformPaused)return r;
    if(!this.panelOpen){uniforms.coastalTime19.value+=Math.min(.1,Math.max(0,dt));uniforms.coastalStrength19.value=this.progression.state.settings.reducedMotion?0:1;}
    if(this._windScanDue19>0){this._windScanDue19-=dt;if(this._windScanDue19<=0)scan(this);}return r;
  });
  wrap(ctx.Game.prototype,'destroy',function(original,...args){const r=original(...args);for(const m of ownedMaterials)m.dispose();for(const g of ownedGeometries)g.dispose();return r;});
}
