import {wrap,disposeTree} from '../update/helpers.js';
import {WorldPolish} from '../homecoming/world.js';
import {marketState,giftInfo,now} from './commerce.js';
import {tr,artUrl} from './locale.js';

function rngFor(name){let s=912367;for(const c of name)s=(s*31+c.charCodeAt(0))>>>0;return()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296;};}
function beachPoints(game,T,count){
  const rand=rngFor(game.player.zone),triangles=game.terrainSampler?.triangles.filter(t=>t.kind==='sand')??[],points=[];
  if(!triangles.length)return points;
  for(let i=0;i<2500&&points.length<count;i++){
    const triangle=triangles[Math.floor(rand()*triangles.length)];let u=rand(),v=rand();if(u+v>1){u=1-u;v=1-v;}
    const x=triangle.a[0]*u+triangle.b[0]*v+triangle.c[0]*(1-u-v),z=triangle.a[2]*u+triangle.b[2]*v+triangle.c[2]*(1-u-v);
    const top=game.terrainSampler.dry(x,z,.55);
    if(!top||top.kind!=='sand'||top.y<.13||game.isSolidAt(x,z,.5)||points.some(p=>Math.hypot(x-p.x,z-p.z)<1.2))continue;
    const slope=game.terrainSampler.sample(x+.2,z);if(!slope||Math.abs(slope.y-top.y)>.2)continue;
    points.push(new T.Vector3(x,top.y,z));
  }
  return points;
}
export class HarborWorld {
  constructor(game,ctx){this.game=game;this.T=ctx.T;this.root=new this.T.Group();this.root.name='Island host gift and captain premium stall';this.root.userData.ignoreShots=true;game.scene.add(this.root);this.signs=[];this.time=0;this.rebuild();}
  mesh(geo,color,parent,x=0,y=0,z=0){const m=new this.T.Mesh(geo,new this.T.MeshStandardMaterial({color,roughness:.65,metalness:/cda|e8b|ddc/.test(color)?.45:.08}));m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
  placeNear(origin,distances=[5,6.5,8]){
    const g=this.game,T=this.T;
    for(const r of distances)for(const a of [Math.PI*.5,0,Math.PI,-Math.PI*.5,.7,-.7,2.3,-2.3]){
      const x=origin.x+Math.cos(a)*r,z=origin.z+Math.sin(a)*r,y=g.surfaceAt(x,z,1.5);
      if(y===null||g.isSolidAt(x,z,1.7))continue;
      const corners=[[1.2,1.2],[-1.2,1.2],[1.2,-1.2],[-1.2,-1.2]].map(([dx,dz])=>g.surfaceAt(x+dx,z+dz,.2));
      if(corners.some(v=>v===null||Math.abs(v-y)>.5))continue;
      if([this.gift,this.premium].some(o=>o&&Math.hypot(x-o.position.x,z-o.position.z)<4.5))continue;
      return new T.Vector3(x,y-g.playerEyeHeight,z);
    }
    const p=g.findDryPosition(origin,25,1.4);if(p)p.y-=g.playerEyeHeight;return p;
  }
  rebuild(){
    const g=this.game,T=this.T;
    this.signs.forEach(s=>s.texture.dispose());this.signs=[];
    for(const o of [...this.root.children])disposeTree(o);this.gift=null;this.premium=null;
    const anchor=g.shopMarker?.visible!==false?g.shopMarker.position:g.sellMarker.position;
    const shopPoint=this.placeNear(anchor,[5.7,7,8.5,10]);
    if(shopPoint){this.premium=new T.Group();this.premium.name='Captain shop';this.premium.position.copy(shopPoint);this.root.add(this.premium);this.buildShop(this.premium);}
    const giftPoint=this.placeNear(g.sellMarker.position,[6.2,8.5,10.5,12]);
    if(giftPoint){this.gift=new T.Group();this.gift.name='Island host · rewarded-ad gift';this.gift.position.copy(giftPoint);this.root.add(this.gift);this.buildGift(this.gift);}
    giftInfo(g);this.lastSecond=-1;this.update(0);
  }
  sign(parent,y,title,sub,art,width=3.3){
    const T=this.T;const frame=new T.Group();frame.position.y=y;parent.add(frame);
    this.mesh(new T.BoxGeometry(width+.15,1.32,.16),'#5c3524',frame);
    for(const dy of [-.67,.67])this.mesh(new T.BoxGeometry(width+.25,.08,.2),'#cda75b',frame,0,dy);
    const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=380;
    const texture=new T.CanvasTexture(canvas);texture.colorSpace='srgb';
    const geo=new T.BufferGeometry();const w=width/2,h=.61;
    geo.setAttribute('position',new T.Float32BufferAttribute([-w,-h,0,w,-h,0,w,h,0,-w,h,0],3));geo.setAttribute('normal',new T.Float32BufferAttribute([0,0,1,0,0,1,0,0,1,0,0,1],3));geo.setAttribute('uv',new T.Float32BufferAttribute([0,0,1,0,1,1,0,1],2));geo.setIndex([0,1,2,0,2,3]);
    const material=new T.MeshBasicMaterial({map:texture});const face=new T.Mesh(geo,material);face.position.z=.09;frame.add(face);const back=face.clone();back.rotation.y=Math.PI;back.position.z=-.09;frame.add(back);
    const image=new Image();image.src=artUrl(art);
    const record={frame,canvas,texture,image,title,sub,paint:()=>{
      const a=canvas.getContext('2d');a.fillStyle='#103f43';a.fillRect(0,0,1024,380);a.strokeStyle='#d6b260';a.lineWidth=5;a.strokeRect(12,12,1000,356);
      if(image.complete&&image.naturalWidth)a.drawImage(image,28,65,230,230);
      a.textAlign='center';a.fillStyle='#ffe6a3';a.font='bold 58px Arial';
      const text=tr(record.title);a.fillText(text,626,110,724);
      a.fillStyle='#eff8ec';a.font='bold 42px Arial';a.fillText(tr(record.sub),626,187,714);
      if(record.timer){a.fillStyle='#ffdc73';a.font='bold 72px Arial';a.fillText(tr(record.timer),626,285,710);}
      texture.needsUpdate=true;
    }};image.onload=()=>record.paint();record.paint();this.signs.push(record);return record;
  }
  buildGift(root){
    const T=this.T;
    this.mesh(new T.CylinderGeometry(1.13,1.3,.14,12),'#756048',root,0,.07);
    this.mesh(new T.BoxGeometry(1.58,1.08,1.18),'#2e6a68',root,0,.69);
    const lid=this.mesh(new T.BoxGeometry(1.72,.2,1.3),'#36857d',root,0,1.3);this.giftLid=lid;
    this.mesh(new T.BoxGeometry(.21,1.29,1.34),'#e8bb58',root,0,.8);
    this.mesh(new T.BoxGeometry(1.76,1.29,.18),'#e8bb58',root,0,.8);
    for(const side of [-1,1]){const bow=this.mesh(new T.TorusGeometry(.28,.062,6,16),'#e8bb58',root,side*.23,1.55,0);bow.rotation.y=side*.5;bow.scale.y=.63;}
    for(const x of [-1.52,1.52])this.mesh(new T.CylinderGeometry(.09,.13,3.8,7),'#705038',root,x,1.8,-.62);
    this.giftSign=this.sign(root,3.2,'ПОДАРОК ХОЗЯИНА','ЗА ПРОСМОТР РЕКЛАМЫ','gift',3.3);this.giftSign.frame.position.z=-.62;
    this.sparkles=[];for(let i=0;i<5;i++){const star=this.mesh(new T.SphereGeometry(.048,6,4),'#fff0a4',root);star.material.emissive.set('#edb349');star.material.emissiveIntensity=.5;this.sparkles.push(star);}
  }
  buildShop(root){
    const T=this.T;
    this.mesh(new T.BoxGeometry(3.7,.18,2.75),'#61422a',root,0,.09);
    for(const x of [-1.62,1.62])for(const z of [-1.04,1.04])this.mesh(new T.CylinderGeometry(.09,.13,2.95,7),'#704e2d',root,x,1.57,z);
    this.mesh(new T.BoxGeometry(3.35,1.05,.72),'#446f64',root,0,.7,.85);
    this.mesh(new T.BoxGeometry(3.58,.17,.93),'#bc9155',root,0,1.3,.85);
    for(let i=0;i<7;i++){const cloth=this.mesh(new T.BoxGeometry(.5,.095,2.85),i%2?'#f5ddaa':'#235e72',root,-1.5+i*.5,3.04,0);cloth.rotation.x=.12;}
    this.mesh(new T.BoxGeometry(3.7,.15,2.9),'#b29353',root,0,2.96,0);
    for(let i=0;i<6;i++)this.mesh(new T.CylinderGeometry(.2,.2,.08,12),'#e8bb58',root,.65+(i%2)*.3,1.43+Math.floor(i/2)*.09,.9);
    this.mesh(new T.SphereGeometry(.26,12,8),'#dacdcc',root,-.65,1.63,.84);
    this.sign(root,3.75,'МАГАЗИН КАПИТАНА','СНАСТИ И ПРИПАСЫ','coins',3.9);
  }
  nearby(){
    const g=this.game;if(g.boatController?.isPiloting||g.guide?.active||g.fishing.state!=='idle'||g.deckEncounter||g.harpoon.state!=='ready')return null;
    const options=[];
    for(const [id,root,radius,text] of [['gift14',this.gift,2.9,'Подарок хозяина · реклама'],['premium14',this.premium,3.25,'Магазин капитана']]){
      if(!root)continue;const d=Math.hypot(root.position.x-g.player.position.x,root.position.z-g.player.position.z);if(d<radius)options.push({id,root,d,text,position:root.position.clone().setY(g.player.position.y)});
    }
    for(const c of g.worldPolish?.crabs??[]){if(!c.root.visible)continue;const d=Math.hypot(c.root.position.x-g.player.position.x,c.root.position.z-g.player.position.z);if(d<1.8)options.push({id:'crab14',crab:c,d,text:'Собрать краба · +3 монеты',position:c.root.position});}
    options.sort((a,b)=>a.d-b.d);return options[0]??null;
  }
  update(dt){
    this.time+=dt;const g=this.game,second=Math.floor(now(g)/1000),info=giftInfo(g);
    if(second!==this.lastSecond&&this.giftSign){this.lastSecond=second;this.giftSign.timer=info.ready?'ГОТОВ · E':info.text;this.giftSign.paint();}
    const motion=!g.progression.state.settings.reducedMotion;
    if(this.giftLid)this.giftLid.position.y=1.3+(info.ready&&motion?Math.sin(this.time*2)*.045:0);
    this.sparkles?.forEach((s,i)=>{s.visible=info.ready;s.position.set(Math.cos(this.time*.4+i*1.25)*1.05,1.65+(i%3)*.22+(motion?Math.sin(this.time+i)*.12:0),Math.sin(this.time*.4+i*1.25)*.75);});
  }
  destroy(){this.signs.forEach(s=>s.texture.dispose());disposeTree(this.root);}
}
export function installWorld14(ctx){
  const {Game,T}=ctx;
  WorldPolish.prototype.addShoreLife=function(){
    const g=this.game,rand=rngFor(g.player.zone),points=beachPoints(g,T,46);
    for(let i=0;i<points.length;i++){
      const p=points[i];
      if(i<8){this.addCrab(p.x,p.y,p.z,rand);const c=this.crabs[this.crabs.length-1];c.id=`${g.player.zone}:${i}`;c.home=p.clone();c.speed=.09+rand()*.07;c.changeIn=rand()*5;c.wanderTime=0;c.root.visible=(marketState(g.progression).crabs[c.id]??0)<=now(g);continue;}
      const shell=new T.Group();shell.name='Beach shell on actual sand';shell.position.copy(p).add(new T.Vector3(0,.03,0));shell.rotation.y=rand()*Math.PI*2;
      const body=this.mesh(new T.SphereGeometry(.13+rand()*.08,8,6),i%2?'#e7cdae':'#bfa49c');body.scale.set(1,.32,.85);shell.add(body);this.root.add(shell);
    }
  };
  WorldPolish.prototype.update=function(dt){
    const g=this.game;if(g.panelOpen||g.mode!=='playing'||g.platformPaused)return;this.time+=dt;this.updateArrows(dt);
    const state=marketState(g.progression),clock=now(g),motion=!g.progression.state.settings.reducedMotion;
    for(const c of this.crabs){
      if(!c.id||!c.home)continue;
      const respawn=state.crabs[c.id]??0;
      if(respawn>clock){c.root.visible=false;continue;}
      if(!c.root.visible){c.root.position.copy(c.home).add(new T.Vector3(0,.1,0));c.root.visible=true;}
      c.changeIn-=dt;if(c.changeIn<=0){c.changeIn=4+(Math.sin(this.time+c.phase)+1)*3;c.direction+=.8+Math.sin(this.time+c.phase)*1.9;}
      const x=c.root.position.x+Math.cos(c.direction)*c.speed*dt,z=c.root.position.z+Math.sin(c.direction)*c.speed*dt;
      const top=g.terrainSampler?.dry(x,z,.36);
      if(top?.kind==='sand'&&top.y>.1&&!g.isSolidAt(x,z,.28)&&Math.hypot(x-c.home.x,z-c.home.z)<2.1){c.root.position.set(x,top.y+.1,z);c.root.rotation.y=-c.direction;}
      else{c.direction+=Math.PI*.73;c.changeIn=.8;}
      if(motion)for(let i=0;i<c.legs.length;i++)c.legs[i].rotation.x=(i%4-1.5)*.24+Math.sin(this.time*4+i)*.13;
    }
    if(g.pileCaption)g.pileCaption.hidden=true;
  };
  // Replace the old painted shop/sell headings with bilingual art-bearing signs.
  wrap(WorldPolish.prototype,'addSign',function(original,title,subtitle,...args){return original(tr(title),tr(subtitle),...args);});
  wrap(Game.prototype,'init',async function(original,...args){const result=await original(...args);this.worldPolish?.rebuild();this.harborWorld14=new HarborWorld(this,ctx);return result;});
  wrap(Game.prototype,'handleZoneChanged',function(original,...args){const result=original(...args);this.harborWorld14?.rebuild();return result;});
  wrap(Game.prototype,'update',function(original,dt){const result=original(dt);if(this.mode==='playing'&&!this.platformPaused&&!this.panelOpen)this.harborWorld14?.update(dt);return result;});
  wrap(Game.prototype,'updateInteraction',function(original,...args){
    const option=this.harborWorld14?.nearby();
    if(!option)return original(...args);
    this.interactable=option;const prompt=this.ui['interaction-prompt'];prompt?.classList.remove('hidden');
    if(prompt){prompt.querySelector('kbd').textContent=this.input.isTouch?tr('НАЖМИ'):'E';this.ui['interaction-text'].textContent=tr(option.text);}
    if(this.input.consume('KeyE'))this.performInteraction();
  });
  wrap(Game.prototype,'performInteraction',function(original,...args){
    const item=this.interactable;if(item?.id==='gift14'){this.openGift14();return;}
    if(item?.id==='premium14'){this.openPremiumShop14();return;}
    if(item?.id==='crab14'){
      const c=item.crab,state=marketState(this.progression);if(!c.root.visible||(state.crabs[c.id]??0)>now(this))return;
      c.root.visible=false;state.crabs[c.id]=now(this)+90000;this.progression.addCoins(3,'beach-crab');this.audio.play('coin',{volume:.4});this.toast('Краб собран · +3 монеты','sale');this.interactable=null;this.ui['interaction-prompt']?.classList.add('hidden');return;
    }
    return original(...args);
  });
  wrap(Game.prototype,'destroy',function(original,...args){this.harborWorld14?.destroy();return original(...args);});
}
