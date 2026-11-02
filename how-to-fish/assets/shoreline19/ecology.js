import {wrap,disposeTree} from '../update/helpers.js';
import {HarborWorld} from '../harbor/world.js';
import {marketState,now} from '../harbor/commerce.js';
import {loc} from '../renewal/state.js';
import {random19} from './geometry.js';
import {SPECIES19,buildCreature19,posePart19} from './creatures.js';
export class CoastalLife19{
  constructor(g,ctx){this.g=g;this.T=ctx.T;this.time=0;this.accum=0;this.catalog=new Map();this.local=new ctx.T.Object3D();this.center=new ctx.T.Vector3();this.offset=new ctx.T.Vector3();this.rebuild();}
  state(){const s=marketState(this.g.progression);return s.shore19??(s.shore19={});}
  rebuild(){
    if(this.root)this.root.removeFromParent();for(const b of this.batches??[]){b.mesh.dispose?.();b.mesh.material.dispose();}
    const g=this.g,T=this.T,zone=g.player.zone,rand=random19(zone+'-coastal-life19');
    this.root=new T.Group();this.root.name='Coastal micro-fauna · instanced animated wildlife';this.root.userData.ignoreShots=true;g.scene.add(this.root);this.items=[];this.batches=[];
    const center=zone==='pier'?[-16,0,18]:g.zoneSystem.currentZone.bounds.center;
    const hub=new T.Vector3().fromArray(center),stored=this.state(),clock=now(g),occupied=(g.worldPolish?.crabs??[]).map(c=>c.root.position.clone()).concat((g.islandLife15?.items??[]).map(c=>c.root.position.clone()));
    const triangles=(g.terrainSampler?.triangles??[]).filter(t=>zone!=='pier'||Math.hypot((t.a[0]+t.b[0]+t.c[0])/3-hub.x,(t.a[2]+t.b[2]+t.c[2])/3-hub.z)<55);
    const sand=triangles.filter(t=>t.kind==='sand'),grass=triangles.filter(t=>t.kind==='grass');
    for(const spec of SPECIES19){
      const members=[];
      for(let n=0;n<spec.count;n++){
        let point=null;
        for(let tries=0;tries<600;tries++){
          const habitat=spec.sand?sand:grass;if(!habitat.length)break;
          const tri=habitat[Math.floor(rand()*habitat.length)];let u=rand(),v=rand();if(u+v>1){u=1-u;v=1-v;}
          const x=tri.a[0]*u+tri.b[0]*v+tri.c[0]*(1-u-v),z=tri.a[2]*u+tri.b[2]*v+tri.c[2]*(1-u-v);
          const ground=g.terrainSampler?.dry(x,z,.4);if(!ground||ground.y<.12||g.isSolidAt(x,z,.52))continue;
          if(spec.sand&&ground.kind!=='sand'||!spec.sand&&ground.kind!=='grass')continue;
          const edge=g.terrainSampler.sample(x+.22,z);if(!edge||Math.abs(edge.y-ground.y)>.16)continue;
          if(occupied.some(p=>Math.hypot(x-p.x,z-p.z)<1.4))continue;
          if(Object.values(g.village15??{}).some(p=>p&&Math.hypot(x-p.x,z-p.z)<2.2))continue;
          point=new T.Vector3(x,ground.y+.012,z);break;
        }
        if(!point)continue;occupied.push(point);const id=`${zone}:${spec.id}:${n}`,root=new T.Group();root.position.copy(point);root.visible=!(stored[id]>clock);
        const item={id,spec,root,home:point.clone(),phase:rand()*6.283,direction:rand()*6.283,gait:rand()*5,walking:false,change:1+rand()*4,index:members.length,rendered:false};
        item.target19={object:root,sizeM:spec.radius*2,ground19:item,hp:1,maxHp:1,state:'ground19'};members.push(item);this.items.push(item);
      }
      if(!members.length)continue;
      if(!this.catalog.has(spec.id))this.catalog.set(spec.id,buildCreature19(T,spec.id));
      for(const part of this.catalog.get(spec.id)){
        const mat=new T.MeshStandardMaterial({vertexColors:true,side:T.DoubleSide,roughness:spec.id==='beetle'?.38:spec.id==='scallop'?.48:.8,metalness:spec.id==='beetle'?.24:0});
        const mesh=new T.InstancedMesh(part.geo,mat,members.length*part.n);mesh.name=spec.id+' '+part.key+' batch';mesh.frustumCulled=false;mesh.castShadow=false;mesh.receiveShadow=!g.input.isTouch;mesh.userData.ignoreShots=true;this.root.add(mesh);this.batches.push({mesh,part,members});
      }
    }
    this.paint();
  }
  nearby(){
    const p=this.g.player.position;let nearest=null;
    for(const item of this.items){if(!item.root.visible)continue;const d=Math.hypot(item.root.position.x-p.x,item.root.position.z-p.z);if(d<2.05&&(!nearest||d<nearest.d))nearest={id:'shore19',shoreItem:item,position:item.root.position,d,text:loc('Собрать: ','Collect: ')+loc(item.spec.ru,item.spec.en)+` · +${item.spec.coins} ●`};}
    return nearest;
  }
  collect(item){
    const state=this.state(),g=this.g,clock=now(g);if(!item?.root.visible||state[item.id]>clock)return false;
    item.root.visible=false;state[item.id]=clock+item.spec.cooldown;g.progression.addCoins(item.spec.coins,'coastal-'+item.spec.id);
    g.audio.play('coin',{volume:.40,playbackRate:1.06,queueWhileLoading:true});g.toast(loc(item.spec.ru,item.spec.en)+loc(` · +${item.spec.coins} монеты`,` · +${item.spec.coins} coins`),'sale');this.paint();return true;
  }
  update(dt){
    const g=this.g;this.root.visible=!g.intro?.active;
    if(g.mode!=='playing'||g.panelOpen||g.platformPaused||g.intro?.active||g.homecoming?.active)return;
    this.time+=dt;this.accum+=dt;if(this.accum<1/20)return;dt=Math.min(.14,this.accum);this.accum=0;
    const state=this.state(),clock=now(g),player=g.player.position;
    for(const item of this.items){
      if(state[item.id]>clock){item.root.visible=false;continue;}
      if(!item.root.visible){item.root.visible=true;item.root.position.copy(item.home);}
      const p=item.root.position,dist=p.distanceToSquared(player);item.walking=false;
      if(dist>38*38||!item.spec.speed)continue;
      item.change-=dt;if(item.change<0){item.change=2.4+(Math.sin(this.time+item.phase)+1)*1.7;item.direction+=Math.sin(this.time*1.4+item.phase)*1.1+.32;}
      const fleeing=item.spec.id==='gecko'&&dist<3.1*3.1;
      if(fleeing)item.direction=Math.atan2(p.x-player.x,p.z-player.z)+Math.PI;
      const pause=Math.sin(this.time*.9+item.phase)>.78&&!fleeing;if(pause)continue;
      const step=dt*item.spec.speed*(fleeing?2.3:1),x=p.x-Math.sin(item.direction)*step,z=p.z-Math.cos(item.direction)*step;
      const top=g.terrainSampler.dry(x,z,.2);
      if(top&&top.y>.10&&(!item.spec.sand||top.kind==='sand')&&!g.isSolidAt(x,z,.22)&&Math.hypot(x-item.home.x,z-item.home.z)<2.4){p.set(x,top.y+.012,z);item.gait+=step*33;item.walking=true;}
      else{item.direction+=1.8;item.change=.45;}
    }
    this.paint();
  }
  paint(){
    const T=this.T,g=this.g,range=g.input.isTouch?(g.performance110?.economy?30:40):65,reduced=g.progression.state.settings.reducedMotion,d=this.local;
    for(const item of this.items){item.rendered=item.root.visible&&item.root.position.distanceToSquared(g.player.position)<range*range;item.root.rotation.y=item.direction;item.root.updateMatrix();}
    for(const {mesh,part,members} of this.batches){let visible=0;
      for(const item of members){if(!item.rendered)continue;for(let j=0;j<part.n;j++){
        posePart19(item,part.key,j,this.time,d,reduced);
        d.updateMatrix();d.matrix.premultiply(item.root.matrix);mesh.setMatrixAt(visible++,d.matrix);
      }}
      mesh.count=visible;mesh.visible=visible>0;if(visible)mesh.instanceMatrix.needsUpdate=true;
    }
  }
  raycast(camera,range,aim,best,raycaster){
    raycaster.setFromCamera(aim,camera);const ray=raycaster.ray,g=this.g;
    for(const item of this.items){
      if(!item.root.visible||!item.rendered)continue;
      this.center.copy(item.root.position);this.center.y+=item.spec.radius*.36;this.offset.copy(this.center).sub(ray.origin);
      const along=this.offset.dot(ray.direction),radius=item.spec.radius+(g.input.isTouch?Math.min(.24,Math.max(0,along)*.01):0),d2=this.offset.lengthSq()-along*along;
      if(d2>radius*radius||along+radius<0)continue;
      const distance=Math.max(0,along-Math.sqrt(Math.max(0,radius*radius-d2)));
      if(distance>range||best&&distance>=best.distance)continue;
      best={bird:item.target19,distance,point:ray.at(distance,new this.T.Vector3()),object:item.root};
    }
    return best;
  }
  destroy(){this.root?.removeFromParent();for(const b of this.batches){b.mesh.dispose?.();b.mesh.material.dispose();}for(const parts of this.catalog.values())for(const p of parts)p.geo.dispose();this.catalog.clear();}
}
export function installEcology19(ctx){
  const {Game:G,Wildlife}=ctx;
  wrap(G.prototype,'init',async function(original,...args){const r=await original(...args);this.coastalLife19=new CoastalLife19(this,ctx);return r;});
  wrap(G.prototype,'handleZoneChanged',function(original,...args){const r=original(...args);this.coastalLife19?.rebuild();return r;});
  wrap(G.prototype,'update',function(original,dt){const r=original(dt);this.coastalLife19?.update(Math.min(.1,Math.max(0,dt)));return r;});
  wrap(HarborWorld.prototype,'nearby',function(original,...args){
    const old=original(...args),g=this.game;if(g.mode!=='playing'||g.guide?.active||g.boatController?.isPiloting||g.fishing.state!=='idle'||g.harpoon?.state!=='ready'||g.deckEncounter)return old;
    const item=g.coastalLife19?.nearby();return item&&(!old||item.d<old.d)?item:old;
  });
  wrap(G.prototype,'performInteraction',function(original,...args){
    if(this.interactable?.id!=='shore19')return original(...args);this.coastalLife19.collect(this.interactable.shoreItem);this.interactable=null;this.ui['interaction-prompt']?.classList.add('hidden');
  });
  wrap(Wildlife.prototype,'raycast',function(original,camera,range=120,aim={x:0,y:0}){const best=original(camera,range,aim);return this.game?.coastalLife19?.raycast(camera,range,aim,best,this.raycaster)??best;});
  wrap(Wildlife.prototype,'damage',function(original,bird,amount,...args){if(!bird?.ground19)return original(bird,amount,...args);return amount>0&&this.game.coastalLife19.collect(bird.ground19)?{damage:1,killed:true}:null;});
  wrap(G.prototype,'handleWildlifeKill',function(original,event,...args){if(event?.bird?.ground19)return;return original(event,...args);});
  wrap(G.prototype,'handleWildlifeHit',function(original,event,...args){
    if(!event?.bird?.ground19)return original(event,...args);this.audio.play('hit',{volume:.25});const marker=document.querySelector('#hit-marker');if(marker){marker.textContent='✦';marker.classList.remove('hidden');clearTimeout(this.hitMarkerTimer);this.hitMarkerTimer=setTimeout(()=>marker.classList.add('hidden'),150);}
  });
  wrap(G.prototype,'destroy',function(original,...args){this.coastalLife19?.destroy();return original(...args);});
}
