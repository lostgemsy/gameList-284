import {wrap,disposeTree} from '../update/helpers.js';
import {WorldPolish} from '../homecoming/world.js';
import {HarborWorld} from '../harbor/world.js';
import {marketState,now,giftInfo} from '../harbor/commerce.js';
import {loc} from './state.js';
function randomFor(seed){let s=3155917;for(const c of seed)s=(Math.imul(s,31)+c.charCodeAt(0))>>>0;return()=>((s=(Math.imul(s,1664525)+1013904223)>>>0)/4294967296);}
function centerOf(g){const land=g.zoneSystem?.getWalkableLandformSurfaces?.()?.[0];return g.player.zone==='pier'?{x:-16,z:18}:land?{x:land.center[0],z:land.center[2]}:{x:g.shopMarker.position.x,z:g.shopMarker.position.z};}
function safePoint(g,T,x,z,r=1.8){
  const p=g.terrainSampler?.dry(x,z,r);if(!p||p.y<.14||g.isSolidAt(x,z,r))return null;
  // A terrain-supported foundation. Use the highest corner so no foot floats.
  const corners=[[r*.7,0],[-r*.7,0],[0,r*.7],[0,-r*.7]].map(([dx,dz])=>g.terrainSampler.sample(x+dx,z+dz)?.y);
  if(corners.some(y=>y==null||Math.abs(y-p.y)>.42))return null;
  return new T.Vector3(x,p.y,z);
}
function choose(g,T,preferred,avoid=[],radius=2){
  const c=centerOf(g),candidates=[...preferred];
  for(let r=2;r<=25;r+=2.5)for(let i=0;i<20;i++){const a=i*Math.PI/10;candidates.push([c.x+Math.cos(a)*r,c.z+Math.sin(a)*r]);}
  for(const [x,z] of candidates){if(avoid.some(p=>p&&Math.hypot(x-p.x,z-p.z)<5.4))continue;
    const p=safePoint(g,T,x,z,radius);if(p)return p;}
  return null;
}
function planVillage(g,T){
  const c=centerOf(g);let shop;
  if(g.player.zone==='pier')shop=choose(g,T,[[-10,15.5],[-10,17],[-16.8,11.5]],[],1.5);
  else{
    const house=g.solids.find(s=>/house|hut|keeper/.test(s.id??''));
    const x=house?.x??(house?.minX!=null?(house.minX+house.maxX)/2:c.x-7),z=house?.z??(house?.minZ!=null?(house.minZ+house.maxZ)/2:c.z-3),r=house?.radius??4;
    shop=choose(g,T,[[x,z+r+2.1],[x+r+2.1,z],[x-r-2.1,z],[x,z-r-2.1]],[],1.45);
  }
  const premium=choose(g,T,g.player.zone==='pier'?[[-20,14],[-21,17],[-16,18]]:[[c.x+4,c.z+2],[c.x-3,c.z+5]],[shop],2.1);
  const gift=choose(g,T,g.player.zone==='pier'?[[-27,20],[-24,23],[-28,14]]:[[c.x-3,c.z+3],[c.x+3,c.z-3],[c.x,c.z]],[shop,premium],2.7);
  return {shop,premium,gift};
}
function mesh(T,root,geometry,color,x,y,z){const m=new T.Mesh(geometry,new T.MeshStandardMaterial({color,roughness:.82}));m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;root.add(m);return m;}
function counter(g,T,root,p){
  if(!p)return;const group=new T.Group();group.name='Owner house · shop counter';group.position.copy(p);root.add(group);
  mesh(T,group,new T.BoxGeometry(2.7,1.02,.85),'#6c5136',0,.56,0);
  mesh(T,group,new T.BoxGeometry(2.94,.16,1.04),'#c2a068',0,1.14,0);
  for(const x of [-1.02,1.02])mesh(T,group,new T.BoxGeometry(.11,1.12,.96),'#394b42',x,.58,0);
  for(let i=0;i<3;i++)mesh(T,group,new T.BoxGeometry(.38,.3,.45),['#abb9a1','#877453','#c58e59'][i],-.66+i*.54,1.38,0);
  const barrel=mesh(T,group,new T.CylinderGeometry(.47,.42,1,10),'#876744',2,.51,0);
  for(const y of [.22,.76])mesh(T,group,new T.TorusGeometry(.45,.043,5,12),'#384c48',2,y,0).rotation.x=Math.PI/2;
  const rod=mesh(T,group,new T.CylinderGeometry(.025,.05,2.85,7),'#ab9060',2.2,1.65,.1);rod.rotation.z=-.15;
  const rope=mesh(T,group,new T.TorusGeometry(.24,.052,6,16),'#d4bd89',.9,1.27,.1);rope.rotation.x=Math.PI/2;
  // A warm, static emissive lantern and a cloth flag add life without extra lights.
  mesh(T,group,new T.CylinderGeometry(.05,.07,3.4,7),'#624a32',-2,1.65,.1);
  const lantern=mesh(T,group,new T.BoxGeometry(.27,.4,.27),'#ffe3a0',-2,2.8,.1);lantern.material.emissive.set('#f8c879');lantern.material.emissiveIntensity=.7;
  const flag=mesh(T,group,new T.BoxGeometry(.9,.4,.024),'#40887f',-1.5,3.1,.1);group.userData.flag=flag;return group;
}
/** Batched, articulated crawlers: 18 creatures / island, only four draw calls. */
export class IslandLife {
  constructor(g,ctx){this.game=g;this.T=ctx.T;this.root=new ctx.T.Group();this.root.name='Regenerating worms and larvae';this.root.userData.ignoreShots=true;g.scene.add(this.root);this.time=0;this.accumulator=0;this.rebuild();}
  rebuild(){
    const g=this.game,T=this.T;for(const child of [...this.root.children])disposeTree(child);
    this.items=[];this.meshes=[];this.counter=null;const center=centerOf(g),rand=randomFor(g.player.zone+'crawlers'),state=marketState(g.progression);state.crawlers??={};
    let points=[];
    // Sample the main walkable island, not inaccessible decorative sandbanks.
    for(let i=0;i<2200&&points.length<18;i++){
      const radius=(g.player.zone==='pier'?23:19)*Math.sqrt(rand()),a=rand()*Math.PI*2,x=center.x+Math.cos(a)*radius,z=center.z+Math.sin(a)*radius;
      const top=g.terrainSampler?.dry(x,z,.9);
      if(!top||top.y<.15||g.isSolidAt(x,z,.6)||points.some(p=>Math.hypot(p.x-x,p.z-z)<1.7))continue;
      if(Object.values(g.village15??{}).some(p=>p&&Math.hypot(p.x-x,p.z-z)<3.1))continue;
      points.push(new T.Vector3(x,top.y,z));
    }
    for(let i=0;i<points.length;i++){
      const point=points[i],id=`${g.player.zone}:crawler:${i}`,root=new T.Group();root.position.copy(point);root.visible=(state.crawlers[id]??0)<=now(g);
      this.items.push({id,kind:i%2?'larva':'worm',index:Math.floor(i/2),root,home:point.clone(),phase:rand()*6.28,direction:rand()*6.28,speed:i%2?.16:.22,change:2+rand()*4});
    }
    this.dummy=new T.Object3D();
    for(const kind of ['worm','larva']){
      const count=this.items.filter(x=>x.kind===kind).length,body=new T.InstancedMesh(new T.SphereGeometry(1,8,5),new T.MeshStandardMaterial({color:kind==='worm'?'#bf735d':'#e7d49b',roughness:.92}),count*9);
      const eyes=new T.InstancedMesh(new T.SphereGeometry(1,6,4),new T.MeshStandardMaterial({color:'#29271e',roughness:.7}),count*2);
      body.name=kind+' animated segmented bodies';eyes.name=kind+' eyes';body.frustumCulled=eyes.frustumCulled=false;this.root.add(body,eyes);this.meshes.push({kind,body,eyes});
    }
    this.paint();
  }
  nearby(){
    const p=this.game.player.position;let best=null;
    for(const item of this.items){if(!item.root.visible)continue;const d=Math.hypot(p.x-item.root.position.x,p.z-item.root.position.z);
      if(d<1.85&&(!best||d<best.d))best={id:'crawler15',crawler:item,d,text:item.kind==='worm'?loc('Собрать червяка · +1 монета','Collect worm · +1 coin'):loc('Собрать личинку · +1 монета','Collect larva · +1 coin'),position:item.root.position};}
    return best;
  }
  collect(item){
    const g=this.game,state=marketState(g.progression);state.crawlers??={};
    if(!item?.root.visible||(state.crawlers[item.id]??0)>now(g))return false;
    item.root.visible=false;state.crawlers[item.id]=now(g)+(item.kind==='worm'?45000:60000);
    g.progression.addCoins(1,'island-crawler');g.audio.play('coin',{volume:.36,playbackRate:item.kind==='worm'?1.18:1.3,queueWhileLoading:true});
    g.toast(item.kind==='worm'?loc('Червяк собран · +1 монета','Worm collected · +1 coin'):loc('Личинка собрана · +1 монета','Larva collected · +1 coin'),'sale');this.paint();return true;
  }
  update(dt){
    this.time+=dt;this.accumulator+=dt;if(this.accumulator<1/20)return;dt=Math.min(.12,this.accumulator);this.accumulator=0;
    const g=this.game,state=marketState(g.progression),clock=now(g);
    for(const item of this.items){
      if((state.crawlers?.[item.id]??0)>clock){item.root.visible=false;continue;}
      if(!item.root.visible){item.root.visible=true;item.root.position.copy(item.home);}
      item.change-=dt;if(item.change<0){item.change=2.5+(Math.sin(this.time+item.phase)+1)*2;item.direction+=Math.sin(this.time*2+item.phase)*1.5+.3;}
      const p=item.root.position,x=p.x+Math.cos(item.direction)*dt*item.speed,z=p.z+Math.sin(item.direction)*dt*item.speed,top=g.terrainSampler.dry(x,z,.25);
      if(top&&top.y>.1&&!g.isSolidAt(x,z,.3)&&Math.hypot(x-item.home.x,z-item.home.z)<2.1)p.set(x,top.y,z);else{item.direction+=2;item.change=.5;}
    }
    this.paint();
  }
  paint(){
    const d=this.dummy;if(!d)return;const reduced=this.game.progression.state.settings.reducedMotion;
    for(const {kind,body,eyes} of this.meshes){
      for(const item of this.items.filter(i=>i.kind===kind)){
        const p=item.root.position,a=item.direction,cos=Math.cos(a),sin=Math.sin(a),fat=kind==='larva'?.073:.047,spacing=kind==='larva'?.071:.075;
        for(let j=0;j<9;j++){
          const along=(j-4)*spacing,wave=reduced?0:Math.sin(this.time*6+item.phase-j*.65)*(kind==='larva'?.022:.065);
          const x=p.x+along*cos-wave*sin,z=p.z+along*sin+wave*cos;
          const ground=this.game.terrainSampler.sample(x,z)?.y??p.y;
          d.position.set(x,ground+fat*.7,z);d.scale.set(spacing*.72,fat*.75,fat);d.rotation.set(0,-a,0);
          if(!item.root.visible)d.scale.setScalar(0);d.updateMatrix();body.setMatrixAt(item.index*9+j,d.matrix);
        }
        for(let eye=0;eye<2;eye++){
          const along=4*spacing,wave=(reduced?0:Math.sin(this.time*6+item.phase-8*.65)*(kind==='larva'?.022:.065))+(eye?1:-1)*fat*.48;
          d.position.set(p.x+along*cos-wave*sin,p.y+fat*1.43,p.z+along*sin+wave*cos);d.scale.setScalar(item.root.visible?.014:0);d.updateMatrix();eyes.setMatrixAt(item.index*2+eye,d.matrix);
        }
      }
      body.instanceMatrix.needsUpdate=eyes.instanceMatrix.needsUpdate=true;
    }
  }
  destroy(){disposeTree(this.root);}
}
export function installWorld15(ctx){
  const {Game,T}=ctx;
  wrap(WorldPolish.prototype,'rebuild',function(original,...args){
    const g=this.game;g.village15=null;const result=original(...args),plan=planVillage(g,T);g.village15=plan;
    // Remove the old shop board, then put the counter at the actual owner's home.
    for(const sign of [...this.signs])if(!/УЛОВ|CATCH/i.test(sign.name)){
      sign.traverse(o=>o.material?.map?.dispose());disposeTree(sign);this.signs.splice(this.signs.indexOf(sign),1);
    }
    this.shopCounter15=counter(g,T,this.root,plan.shop);
    if(plan.shop){g.shopMarker.position.copy(plan.shop).y+=1.5;g.shopMarker.visible=true;
      let sign=choose(g,T,[[plan.shop.x-1.6,plan.shop.z+1.3],[plan.shop.x+1,plan.shop.z+1.8]],[],.8);
      if(sign)this.addSign(loc('ЛАВКА','SHOP'),loc('ДОМ ХОЗЯИНА · СНАСТИ','OWNER’S HOME · TACKLE'),sign.x,sign.z,0,'shop');
    }
    return result;
  });
  // Build directly at inland foundations; the arrival/NPC corridor stays empty.
  HarborWorld.prototype.rebuild=function(){
    const g=this.game,plan=g.village15??planVillage(g,T);g.village15=plan;
    this.signs.forEach(s=>s.texture.dispose());this.signs=[];for(const o of [...this.root.children])disposeTree(o);this.gift=this.premium=null;
    if(plan.premium){this.premium=new T.Group();this.premium.name='Captain supplies by owner home';this.premium.position.copy(plan.premium);this.root.add(this.premium);this.buildShop(this.premium);}
    if(plan.gift){this.gift=new T.Group();this.gift.name='Inland reward gift';this.gift.position.copy(plan.gift);this.root.add(this.gift);this.buildGift(this.gift);}
    giftInfo(g);this.lastSecond=-1;this.update(0);g.islandLife15?.rebuild();
  };
  wrap(HarborWorld.prototype,'nearby',function(original,...args){
    const g=this.game,old=original(...args);
    if(g.boatController?.isPiloting||g.guide?.active||g.fishing.state!=='idle'||g.deckEncounter||g.harpoon.state!=='ready')return old;
    const crawler=g.islandLife15?.nearby();return crawler&&(!old||crawler.d<old.d)?crawler:old;
  });
  wrap(Game.prototype,'performInteraction',function(original,...args){
    if(this.interactable?.id!=='crawler15')return original(...args);
    this.islandLife15?.collect(this.interactable.crawler);this.interactable=null;this.ui['interaction-prompt']?.classList.add('hidden');
  });
  wrap(Game.prototype,'init',async function(original,...args){const result=await original(...args);this.islandLife15=new IslandLife(this,ctx);return result;});
  wrap(Game.prototype,'update',function(original,dt){
    const result=original(dt);
    if(this.mode==='playing'&&!this.panelOpen&&!this.platformPaused){this.islandLife15?.update(dt);
      const flag=this.worldPolish?.shopCounter15?.userData.flag;if(flag&&!this.progression.state.settings.reducedMotion)flag.rotation.y=Math.sin(this.elapsed*1.7)*.13;
    }return result;
  });
  wrap(Game.prototype,'destroy',function(original,...args){this.islandLife15?.destroy();return original(...args);});
}
