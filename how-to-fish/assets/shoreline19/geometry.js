/* Small authored meshes. Baking vertex colours collapses multi-part models to
 * one draw call; source primitives never survive into the rendered scene. */
export function bake19(T,root){
  root.updateMatrixWorld(true);const inverse=root.matrixWorld.clone().invert();const parts=[];let total=0;
  root.traverse(o=>{
    if(!o.isMesh)return;const matrix=inverse.clone().multiply(o.matrixWorld);
    let geo=o.geometry.clone();geo.applyMatrix4(matrix);if(geo.index){const flat=geo.toNonIndexed();geo.dispose();geo=flat;}
    const p=geo.attributes.position,n=geo.attributes.normal,c=geo.attributes.color;
    const mat=Array.isArray(o.material)?o.material[0]:o.material,color=mat?.color??new T.Color('white');
    const colors=new Float32Array(p.count*3);
    for(let i=0;i<p.count;i++){colors[i*3]=color.r*(c&&mat.vertexColors?c.getX(i):1);colors[i*3+1]=color.g*(c&&mat.vertexColors?c.getY(i):1);colors[i*3+2]=color.b*(c&&mat.vertexColors?c.getZ(i):1);}
    parts.push({geo,p,n,colors});total+=p.count;
  });
  const positions=new Float32Array(total*3),normals=new Float32Array(total*3),colors=new Float32Array(total*3);let offset=0;
  for(const p of parts){positions.set(p.p.array,offset);if(p.n)normals.set(p.n.array,offset);colors.set(p.colors,offset);offset+=p.p.count*3;p.geo.dispose();}
  const out=new T.BufferGeometry();out.setAttribute('position',new T.Float32BufferAttribute(positions,3));out.setAttribute('normal',new T.Float32BufferAttribute(normals,3));out.setAttribute('color',new T.Float32BufferAttribute(colors,3));out.computeBoundingSphere();return out;
}
export class ModelBuilder19{
  constructor(T){this.T=T;this.root=new T.Group();this.materials=new Map();}
  material(color){if(!this.materials.has(color))this.materials.set(color,new this.T.MeshStandardMaterial({color}));return this.materials.get(color);}
  mesh(geo,color,p=[0,0,0],scale=null,rotation=null){const m=new this.T.Mesh(geo,this.material(color));m.position.fromArray(p);if(scale)m.scale.fromArray(scale);if(rotation)m.rotation.set(...rotation);this.root.add(m);return m;}
  sphere(color,p,scale,segments=12){return this.mesh(new this.T.SphereGeometry(1,segments,8),color,p,scale);}
  rod(color,a,b,r1,r2=r1,segments=8){const T=this.T,from=new T.Vector3(...a),to=new T.Vector3(...b),d=to.clone().sub(from),m=this.mesh(new T.CylinderGeometry(r2,r1,d.length(),segments),color);m.position.copy(from).add(to).multiplyScalar(.5);m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d.normalize());return m;}
  torus(color,r,t,p,rotation=[0,0,0],segments=24){return this.mesh(new this.T.TorusGeometry(r,t,6,segments),color,p,null,rotation);}
  finish(){const g=bake19(this.T,this.root),geos=new Set();this.root.traverse(o=>{if(o.geometry)geos.add(o.geometry);});for(const x of geos)x.dispose();for(const m of this.materials.values())m.dispose();this.root.clear();return g;}
}
/* Elliptical cross sections with smooth normals and caps; no sphere-shaped
 * forearms or cuboid palms. Canonical longitudinal axis is +Y. */
export function loft19(T,rings,segments=14){
  if(rings.at(-1)[1]<rings[0][1])rings=rings.slice().reverse();
  const pos=[],uv=[],idx=[];
  for(let j=0;j<rings.length;j++){const [x,y,z,rx,rz]=rings[j];for(let i=0;i<segments;i++){const a=i/segments*Math.PI*2;pos.push(x+Math.cos(a)*rx,y,z+Math.sin(a)*rz);uv.push(i/segments,j/(rings.length-1));}}
  for(let j=0;j<rings.length-1;j++)for(let i=0;i<segments;i++){const a=j*segments+i,b=j*segments+(i+1)%segments,c=a+segments,d=b+segments;idx.push(a,c,b,b,c,d);}
  for(const [ring,flip] of [[0,true],[rings.length-1,false]]){const offset=pos.length/3;pos.push(...rings[ring].slice(0,3));uv.push(.5,.5);for(let i=0;i<segments;i++){const a=ring*segments+i,b=ring*segments+(i+1)%segments;idx.push(...(flip?[offset,a,b]:[offset,b,a]));}}
  const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(pos,3));g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();return g;
}
/* Smooth tube along an authored polyline, used for fingers and shell spirals. */
export function tube19(T,points,radius=.015,sides=9,steps=28){
  const centers=[],tangent=new T.Vector3(),ref=new T.Vector3(),u=new T.Vector3(),v=new T.Vector3(),positions=[],indices=[];
  for(let k=0;k<=steps;k++){
    const f=k/steps*(points.length-1),i=Math.min(points.length-2,Math.floor(f)),t=f-i;
    const a=points[Math.max(0,i-1)],b=points[i],c=points[i+1],d=points[Math.min(points.length-1,i+2)],p=[];
    for(let q=0;q<3;q++)p.push(.5*((2*b[q])+(-a[q]+c[q])*t+(2*a[q]-5*b[q]+4*c[q]-d[q])*t*t+(-a[q]+3*b[q]-3*c[q]+d[q])*t*t*t));
    centers.push(new T.Vector3(...p));
  }
  for(let k=0;k<=steps;k++){
    tangent.copy(centers[Math.min(steps,k+1)]).sub(centers[Math.max(0,k-1)]).normalize();ref.set(0,0,1);if(Math.abs(tangent.dot(ref))>.92)ref.set(0,1,0);u.crossVectors(tangent,ref).normalize();v.crossVectors(tangent,u).normalize();
    const r=typeof radius==='function'?radius(k/steps):radius;
    for(let j=0;j<sides;j++){const a=j/sides*Math.PI*2,p=centers[k].clone().addScaledVector(u,Math.cos(a)*r).addScaledVector(v,Math.sin(a)*r);positions.push(p.x,p.y,p.z);}
  }
  for(let k=0;k<steps;k++)for(let j=0;j<sides;j++){const a=k*sides+j,b=k*sides+(j+1)%sides,c=a+sides,d=b+sides;indices.push(a,b,c,b,d,c);}
  for(const k of [0,steps]){const idx=positions.length/3;positions.push(...centers[k].toArray());for(let j=0;j<sides;j++){const a=k*sides+j,b=k*sides+(j+1)%sides;indices.push(...(k?[idx,a,b]:[idx,b,a]));}}
  const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(positions,3));g.setIndex(indices);g.computeVertexNormals();return g;
}
export function random19(seed){let h=2166136261;for(const c of String(seed))h=Math.imul(h^c.charCodeAt(0),16777619);return()=>{h=(Math.imul(1664525,h)+1013904223)|0;return(h>>>0)/4294967296;};}
