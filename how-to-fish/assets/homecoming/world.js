import {wrap,disposeTree,clamp} from '../update/helpers.js';

export function installWorld(ctx){
  const {Game,NPC,T}=ctx;
  wrap(Game.prototype,'setupGameplaySystems',function(original,...args){const r=original(...args);this.npcSystem.game=this;return r;});
  wrap(Game.prototype,'getNpcWaypoints',function(original,...args){
    const base=original(...args);if(this.player.zone==='pier')return base;
    const list=(base??[]).map(p=>({...p,fishing:false}));
    const land=this.zoneSystem?.getWalkableLandformSurfaces?.()?.[0];if(!land)return list;
    const rx=(land.outerRadiusX??land.radiusX)-.8,rz=(land.outerRadiusZ??land.radiusZ)-.8;
    for(let i=0;i<12;i++){
      const a=i*Math.PI/6,p=this.landformPoint(land,Math.cos(a)*rx,Math.sin(a)*rz);
      if(this.surfaceAt(p.x,p.z,.25)==null||this.isSolidAt(p.x,p.z,.4))continue;
      const out=p.clone().sub(new T.Vector3(land.center[0],0,land.center[2])).setY(0).normalize();
      const water=p.clone().addScaledVector(out,3.15).setY(.05);
      if(this.isWaterPoint(water,.18))list.push({x:p.x,z:p.z,fishing:true,facingY:Math.atan2(-out.x,-out.z)});
    }
    return list;
  });
  // Validate actual cast endpoints, not just a waypoint's decorative fishing flag.
  wrap(NPC.prototype,'update',function(original,dt,time){
    original(dt,time);const g=this.game;if(!g)return;
    this._castAudit=(this._castAudit??0)-dt;
    const audit=this._castAudit<=0;if(audit)this._castAudit=.25;
    for(const npc of this.npcs){
      if(npc.state!=='fish'){npc.rod.visible=false;continue;}
      if(audit||!npc.validCast){
        let found=false;
        for(let j=0;j<24;j++){
          const yaw=npc.object.rotation.y+j*Math.PI/12;
          const tip=new T.Vector3(.34,0,-3.15).applyAxisAngle(new T.Vector3(0,1,0),yaw).add(npc.object.position).setY(.05);
          if(!g.isWaterPoint(tip,.18))continue;
          const middle=tip.clone().lerp(npc.object.position,.4);
          if(g.isSolidAt(middle.x,middle.z,.1))continue;
          npc.object.rotation.y=yaw;npc.castWater=tip;found=true;break;
        }
        npc.validCast=found;
        if(!found){npc.rod.visible=false;npc.state='idle';npc.timer=Math.min(npc.timer,1);continue;}
      }
      if(!npc.castWater||!g.isWaterPoint(npc.castWater,.12)){npc.rod.visible=false;npc.validCast=false;continue;}
      npc.rod.visible=true;npc.object.updateMatrixWorld(true);
      const point=npc.castWater.clone();point.y=.075+Math.sin(time*2.2+npc.waypointIndex)*.025;
      const local=npc.rod.worldToLocal(point),bob=npc.rod.children[2],line=npc.rod.children[1];
      if(bob)bob.position.copy(local);
      if(line?.geometry?.attributes.position){const a=line.geometry.attributes.position;a.setXYZ(1,local.x,local.y,local.z);a.needsUpdate=true;line.geometry.computeBoundingSphere();}
    }
  });
  wrap(Game.prototype,'updatePolishedLabels',function(original,...args){
    const r=original(...args);this.pileCaption&&(this.pileCaption.hidden=true);this.captionLayer?.querySelectorAll('.pile-caption,.world-caption--pile').forEach(n=>n.hidden=true);
    if(this.wildlife?.catchLabel)this.wildlife.catchLabel.visible=false;return r;
  });
}

export class WorldPolish {
  constructor(game,ctx){
    this.game=game;this.T=ctx.T;this.root=new this.T.Group();this.root.name='Homecoming physical signs and shoreline life';this.root.userData.ignoreShots=true;game.scene.add(this.root);
    this.arrowRoot=new this.T.Group();this.arrowRoot.name='Walkable tutorial ground route';this.arrowRoot.userData.ignoreShots=true;game.scene.add(this.arrowRoot);
    this.arrows=[];this.time=0;this.pathTimer=0;this.createArrows();this.rebuild();
  }
  resetPath(){this.path=[];this.pathTimer=0;for(const a of this.arrows)a.visible=false;}
  rebuild(){
    for(const c of [...this.root.children]){c.traverse(o=>{if(o.material?.map)o.material.map.dispose();});disposeTree(c);}
    this.crabs=[];this.signs=[];this.resetPath();
    const g=this.game,T=this.T;
    for(const marker of [g.shopMarker,g.sellMarker,g.zoneMarker])if(marker)for(const child of marker.children)child.visible=false;
    if(g.player.zone!=='pier'){
      const s=g.sellMarker.position;let placed=false;
      for(const [dx,dz] of [[4.5,1],[-4.5,1],[0,4.5]]){
        const x=s.x+dx,z=s.z+dz,y=g.surfaceAt(x,z);
        if(y!==null&&!g.isSolidAt(x,z,.6)){g.shopMarker.position.set(x,y-g.playerEyeHeight+1.6,z);g.shopMarker.visible=true;placed=true;break;}
      }
      if(!placed)g.shopMarker.visible=false;
    }
    if(g.player.zone==='pier'){
      this.addSign('ЛАВКА','СНАСТИ · ЛОДКИ',g.shopMarker.position.x-.65,g.shopMarker.position.z+.8,0,'shop');
      this.addSign('УЛОВ','ПРОДАТЬ ДОБЫЧУ',g.sellMarker.position.x+.65,g.sellMarker.position.z+.4,-.14,'sell');
    }else{
      this.addSign('УЛОВ','ПРОДАТЬ ДОБЫЧУ',g.sellMarker.position.x,g.sellMarker.position.z,0,'sell');
      if(g.shopMarker.visible)this.addSign('ЛАВКА','СНАСТИ · ЛОДКИ',g.shopMarker.position.x,g.shopMarker.position.z,0,'shop');
    }
    this.addShoreLife();
  }
  mesh(geometry,color,roughness=.85){const T=this.T;return new T.Mesh(geometry,new T.MeshStandardMaterial({color,roughness,metalness:.06}));}
  addSign(title,subtitle,x,z,yaw,kind){
    const T=this.T,g=this.game,root=new T.Group();root.name=`Объёмная вывеска «${title}»`;root.userData.ignoreShots=true;
    let eye=g.surfaceAt(x,z);if(eye==null){x=kind==='sell'?2.85:x;eye=g.surfaceAt(x,z);}
    if(eye==null)return;
    root.position.set(x,eye-g.playerEyeHeight,z);root.rotation.y=yaw;this.root.add(root);this.signs.push(root);
    for(const px of [-1.05,1.05]){
      const post=this.mesh(new T.CylinderGeometry(.085,.12,2.65,7),'#5b3926');post.position.set(px,1.2,0);post.castShadow=true;root.add(post);
      const cap=this.mesh(new T.SphereGeometry(.13,8,6),'#c2a065');cap.position.set(px,2.54,0);root.add(cap);
    }
    const plank=this.mesh(new T.BoxGeometry(2.8,1.02,.2),'#694733');plank.position.y=2.07;plank.castShadow=true;plank.receiveShadow=true;root.add(plank);
    const rim=this.mesh(new T.BoxGeometry(2.9,.065,.23),'#cead64');rim.position.set(0,2.57,0);root.add(rim);
    const c=document.createElement('canvas');c.width=1024;c.height=360;const a=c.getContext('2d');
    const texture=new T.CanvasTexture(c);texture.colorSpace='srgb';texture.anisotropy=4;
    const image=new Image();
    const paint=()=>{
      a.fillStyle='#173d3c';a.fillRect(0,0,1024,360);
      for(let i=0;i<55;i++){a.strokeStyle=`rgba(194,164,102,${.015+(i%4)*.007})`;a.lineWidth=1+(i%3);a.beginPath();a.moveTo(0,i*7);a.bezierCurveTo(310,i*7-6,680,i*7+7,1024,i*7-3);a.stroke();}
      a.strokeStyle='#b59b60';a.lineWidth=3;a.strokeRect(16,16,992,328);
      if(image.complete&&image.naturalWidth)a.drawImage(image,38,52,250,250);
      a.textAlign='center';a.fillStyle='#ffe8a1';a.font='bold 100px Georgia, serif';a.fillText(title,634,177,686);
      a.fillStyle='#b8cfb8';a.font='bold 31px Arial, sans-serif';a.fillText(subtitle,634,267,686);texture.needsUpdate=true;
    };
    image.onload=paint;image.src=new URL('../../ui/harbor/'+(kind==='sell'?'catch_crate':'stall')+'.webp',import.meta.url).href;paint();
    const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.Float32BufferAttribute([-1.34,-.46,0,1.34,-.46,0,1.34,.46,0,-1.34,.46,0],3));geometry.setAttribute('normal',new T.Float32BufferAttribute([0,0,1,0,0,1,0,0,1,0,0,1],3));geometry.setAttribute('uv',new T.Float32BufferAttribute([0,0,1,0,1,1,0,1],2));geometry.setIndex([0,1,2,0,2,3]);
    const face=new T.Mesh(geometry,new T.MeshStandardMaterial({map:texture,roughness:.88,metalness:0,emissive:'#d8d0a0',emissiveIntensity:.15}));face.position.set(0,2.07,.105);root.add(face);
    // The reverse face remains readable from the beach, without billboard rotation.
    const back=face.clone();back.position.z=-.105;back.rotation.y=Math.PI;root.add(back);
    for(const px of [-1.23,1.23])for(const py of [1.7,2.43]){const bolt=this.mesh(new T.SphereGeometry(.035,6,4),'#d9b670',.4);bolt.position.set(px,py,.12);root.add(bolt);}
  }
  createArrows(){
    const T=this.T,geo=new T.BufferGeometry();
    // Broad flat chevrons with depth testing: they lie on the walkable ground.
    geo.setAttribute('position',new T.Float32BufferAttribute([-.45,0,.3,0,0,-.35,0,0,-.02, -.45,0,.3,0,0,-.02,-.24,0,.3, 0,0,-.35,.45,0,.3,.24,0,.3, 0,0,-.35,.24,0,.3,0,0,-.02],3));geo.computeVertexNormals();
    const mat=new T.MeshBasicMaterial({color:'#ffe38b',transparent:true,opacity:.9,side:T.DoubleSide,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2});
    for(let i=0;i<30;i++){const m=new T.Mesh(geo,mat.clone());m.visible=false;m.name='Стрелка по земле';this.arrowRoot.add(m);this.arrows.push(m);}
  }
  findPath(start,target){
    const g=this.game,step=1.2;
    const valid=(x,z)=>g.surfaceAt(x,z,.18)!=null&&!g.isSolidAt(x,z,.33);
    const key=(x,z)=>`${x},${z}`;
    const sx=Math.round(start.x/step),sz=Math.round(start.z/step),tx=Math.round(target.x/step),tz=Math.round(target.z/step);
    const minx=Math.min(sx,tx)-14,maxx=Math.max(sx,tx)+14,minz=Math.min(sz,tz)-14,maxz=Math.max(sz,tz)+14;
    let open=[{x:sx,z:sz,g:0,f:0,p:null}],scores=new Map([[key(sx,sz),0]]),end=null;
    for(let k=0;k<4500&&open.length;k++){
      let bi=0;for(let j=1;j<open.length;j++)if(open[j].f<open[bi].f)bi=j;
      const n=open.splice(bi,1)[0];if(Math.hypot(n.x-tx,n.z-tz)<1.7){end=n;break;}
      for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]]){
        const x=n.x+dx,z=n.z+dz;if(x<minx||x>maxx||z<minz||z>maxz||!valid(x*step,z*step))continue;
        if(dx&&dz&&(!valid(n.x*step,z*step)||!valid(x*step,n.z*step)))continue;
        const cost=n.g+Math.hypot(dx,dz),id=key(x,z);if(cost>=(scores.get(id)??Infinity))continue;
        scores.set(id,cost);open.push({x,z,g:cost,f:cost+Math.hypot(tx-x,tz-z),p:n});
      }
    }
    const path=[];for(let n=end;n;n=n.p)path.unshift({x:n.x*step,z:n.z*step});return path;
  }
  updateArrows(dt){
    const g=this.game,guide=g.guide;this.pathTimer-=dt;
    const active=guide?.active&&[0,5,7].includes(guide.step)&&guide.target&&!g.panelOpen&&!g.intro.active;
    if(!active){for(const a of this.arrows)a.visible=false;return;}
    if(this.pathTimer<=0){this.path=this.findPath(g.player.position,guide.target);this.pathTimer=1;}
    const path=this.path??[];
    for(let i=0;i<this.arrows.length;i++){
      const m=this.arrows[i],p=path[i+1],n=path[i+2]??path[i+1];m.visible=!!p;
      if(!p)continue;const y=g.surfaceAt(p.x,p.z);if(y==null){m.visible=false;continue;}
      m.position.set(p.x,y-g.playerEyeHeight+.15,p.z);m.rotation.y=Math.atan2(-(n.x-p.x),-(n.z-p.z));
      m.material.opacity=.55+.4*Math.max(0,Math.sin(this.time*3-i*.65));
    }
  }
  addShoreLife(){
    const T=this.T,g=this.game;
    const land=g.player.zone==='pier'?{center:[-16,0,18],outerRadiusX:44,outerRadiusZ:44}:g.zoneSystem?.getWalkableLandformSurfaces?.()?.[0];if(!land)return;
    const rand=(()=>{let s=491+g.player.zone.length*17;return()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296;};})();
    for(let i=0;i<65;i++){
      const a=rand()*Math.PI*2,r=.84+rand()*.12;
      const point=g.landformPoint?g.landformPoint(land,Math.cos(a)*(land.outerRadiusX??land.radiusX)*r,Math.sin(a)*(land.outerRadiusZ??land.radiusZ)*r):new T.Vector3();
      let x=point.x,z=point.z,y=g.surfaceAt(x,z);
      if(y==null||g.isSolidAt(x,z,.4)||y-g.playerEyeHeight>1.8)continue;
      if(i%8===0){this.addCrab(x,y-g.playerEyeHeight,z,rand);continue;}
      const shell=new T.Group();shell.name='Ракушка на песке';shell.position.set(x,y-g.playerEyeHeight+.035,z);shell.rotation.y=rand()*Math.PI*2;
      const body=this.mesh(new T.SphereGeometry(.13+rand()*.1,9,6),i%2?'#e7cdae':'#bfa49c');body.scale.set(1,.34,.85);body.castShadow=true;shell.add(body);
      for(let k=0;k<5;k++){const ridge=this.mesh(new T.TorusGeometry(.10,.009,3,12,Math.PI),'#f6e2c6');ridge.rotation.set(Math.PI/2,0,(k-2)*.14);ridge.scale.z=.4;ridge.position.set((k-2)*.025,.017,0);shell.add(ridge);}
      this.root.add(shell);
    }
  }
  addCrab(x,y,z,rand){
    const T=this.T,root=new T.Group();root.name='Живой береговой краб';root.position.set(x,y+.1,z);this.root.add(root);
    const body=this.mesh(new T.SphereGeometry(.24,10,7),'#b75d36');body.scale.set(1,.46,.75);body.castShadow=true;root.add(body);
    const legs=[];
    for(const side of [-1,1]){
      for(let i=0;i<4;i++){const leg=this.mesh(new T.CylinderGeometry(.013,.024,.26,5),'#a44829');leg.position.set(side*.24,-.02,(i-1.5)*.085);leg.rotation.z=side*1.05;leg.rotation.x=(i-1.5)*.24;root.add(leg);legs.push(leg);}
      const claw=this.mesh(new T.SphereGeometry(.09,7,5),'#da7b42');claw.scale.set(1,.65,1.5);claw.position.set(side*.27,.025,-.26);root.add(claw);
      const eye=this.mesh(new T.SphereGeometry(.035,6,5),'#1c211e');eye.position.set(side*.09,.115,-.145);root.add(eye);
    }
    this.crabs.push({root,legs,x,z,phase:rand()*6.28,direction:rand()*6.28});
  }
  update(dt){
    const g=this.game;if(g.panelOpen||g.mode!=='playing')return;this.time+=dt;this.updateArrows(dt);
    if(g.progression.state.settings.reducedMotion)return;
    for(const c of this.crabs){
      const distance=Math.hypot(g.player.position.x-c.root.position.x,g.player.position.z-c.root.position.z),scared=distance<3;
      const x=c.x+Math.sin(this.time*(scared?1.4:.25)+c.phase)*(scared?.6:.35),z=c.z+Math.cos(this.time*.28+c.phase)*.3;
      const eye=g.surfaceAt(x,z);if(eye!=null&&!g.isSolidAt(x,z,.25)){c.root.position.set(x,eye-g.playerEyeHeight+.1,z);c.root.rotation.y=c.direction;}
      for(let i=0;i<c.legs.length;i++)c.legs[i].rotation.x=(i%4-1.5)*.24+Math.sin(this.time*(scared?16:5)+i)*.2;
    }
    if(g.wildlife?.catchLabel)g.wildlife.catchLabel.visible=false;
    if(g.pileCaption)g.pileCaption.hidden=true;
  }
  destroy(){disposeTree(this.root);disposeTree(this.arrowRoot);}
}
