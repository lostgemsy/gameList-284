/* Feathered, gently curved palm crowns; a shared baked mesh per trunk height.
 * No alpha cards, skeletal animation or extra material passes. */
import {wrap} from '../update/helpers.js';
import {ModelBuilder19,loft19} from './geometry.js';
function palmGeometry(T,h){
  const b=new ModelBuilder19(T),rings=[];
  const trunk=t=>[-.055*h*t+.038*h*t*t,h*t,.05*Math.sin(t*2.2)];
  for(let k=0;k<=14;k++){const t=k/14,p=trunk(t),r=.36*(1-t)+.175*t;rings.push([...p,r,r*.95]);}
  b.mesh(loft19(T,rings,12),'#a1845e');
  for(let j=1;j<15;j++){const t=j/15,p=trunk(t),r=.36*(1-t)+.175*t;b.torus(j%3?'#937852':'#b49a70',r+.004,.009,p,[Math.PI/2,0,.015],12);}
  const crown=trunk(1);
  b.sphere('#809050',[crown[0],h+.02,crown[2]],[.28,.32,.25],12);
  for(let n=0;n<10;n++){
    const angle=n/10*Math.PI*2+h*.12,cs=Math.cos(angle),sn=Math.sin(angle),length=2.8+n%3*.29,drop=1.20+(n%2)*.35;
    const point=(u,side=0)=>[crown[0]+cs*length*u-sn*side,h+.12+Math.sin(u*Math.PI)*(.54+(n%3)*.13)-u*u*drop,crown[2]+sn*length*u+cs*side];
    for(let j=0;j<8;j++)b.rod(j<3?'#a6a658':'#839645',point(j/8),point((j+1)/8),.025*(1-j/9),.019*(1-j/9),5);
    const positions=[],indices=[];
    for(let j=0;j<15;j++){
      const u=.11+j*.055,width=Math.pow(Math.sin((u*.91+.03)*Math.PI),.7)*.60;
      for(const side of [-1,1]){
        const root=point(u),middle=point(u+.028,side*width*.56),tip=point(Math.min(1,u+.095),side*width),half=.044+Math.sin(u*Math.PI)*.014;
        middle[1]-=.06+u*.09;tip[1]-=.10+u*.24;
        const i=positions.length/3;
        positions.push(...root,middle[0]-cs*half,middle[1],middle[2]-sn*half,middle[0],middle[1]+.022,middle[2],middle[0]+cs*half,middle[1],middle[2]+sn*half,...tip);
        indices.push(i,i+1,i+2,i,i+2,i+3,i+1,i+4,i+2,i+2,i+4,i+3);
      }
    }
    const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(positions,3));geo.setIndex(indices);geo.computeVertexNormals();
    b.mesh(geo,['#648b45','#527f40','#7d9b4d','#48824d'][n%4]);
  }
  for(let j=0;j<4;j++){const a=j*2.39;b.sphere(j%2?'#8a744c':'#9b8654',[crown[0]+Math.cos(a)*.23,h-.22-(j%2)*.10,crown[2]+Math.sin(a)*.23],[.16,.21,.17],10);}
  const geo=b.finish();geo.name='Feathered curved palm canopy 1.9';return geo;
}
export function installPalms19(ctx){
  const {Game:G,T}=ctx;
  G.prototype.makePalm=function(height){
    this.palmCache19??=new Map();const key=height.toFixed(2);
    if(!this.palmCache19.has(key))this.palmCache19.set(key,palmGeometry(T,height));
    this.palmMaterial19??=new T.MeshStandardMaterial({vertexColors:true,roughness:.92,side:T.DoubleSide});
    const mesh=new T.Mesh(this.palmCache19.get(key),this.palmMaterial19);mesh.name='Merged tropical palm · feathered crown';mesh.castShadow=true;mesh.receiveShadow=false;return mesh;
  };
  wrap(G.prototype,'destroy',function(original,...args){for(const g of this.palmCache19?.values()??[])g.dispose();this.palmMaterial19?.dispose();return original(...args);});
}
