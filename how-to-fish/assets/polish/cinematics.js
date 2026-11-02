import {wrap,el,clamp,smooth,disposeTree} from '../update/helpers.js';
import {ExpeditionIntro} from '../homecoming/intro.js';
import {loc} from '../renewal/state.js';

function fogTexture(T){
  const canvas=document.createElement('canvas');canvas.width=canvas.height=128;const c=canvas.getContext('2d');
  const glow=c.createRadialGradient(64,64,4,64,64,64);glow.addColorStop(0,'rgba(189,213,218,.45)');glow.addColorStop(.38,'rgba(171,200,211,.23)');glow.addColorStop(1,'rgba(155,180,201,0)');c.fillStyle=glow;c.fillRect(0,0,128,128);return new T.CanvasTexture(canvas);
}
function createMist(T,parent,count=14){
  const texture=fogTexture(T),root=new T.Group();root.name='Layered sea mist';parent.add(root);const items=[];
  const geo=new T.BoxGeometry(1,1,.001);
  for(let i=0;i<count;i++){
    const mat=new T.MeshBasicMaterial({map:texture,color:'#9bb8c6',transparent:true,opacity:.5,depthWrite:false,side:T.DoubleSide});
    const m=new T.Mesh(geo,mat);m.name='Soft fog bank';m.frustumCulled=false;m.scale.set(38+(i%4)*12,7+(i%3)*3,1);root.add(m);items.push(m);
  }
  return {root,items,texture};
}
function updateMist(mist,camera,time,storm=false){
  if(!mist)return;
  for(let i=0;i<mist.items.length;i++){
    const m=mist.items[i],angle=i*2.399963+Math.sin(time*.07+i)*.08,dist=32+(i%5)*14;
    m.position.set(camera.position.x+Math.cos(angle)*dist+Math.sin(time*.12+i)*4,storm?2.8+(i%3)*2:1.6+(i%3)*1.2,camera.position.z+Math.sin(angle)*dist);
    m.quaternion.copy(camera.quaternion);m.material.opacity=(storm?.46:.22)+Math.sin(time*.2+i)*.06;
  }
}
function lightningGeometry(T,width=1){
  const out=[];
  const segment=(a,b,w)=>{
    const dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy)||1,x=-dy/l*w*width,y=dx/l*w*width,z=a[2];
    out.push(a[0]-x,a[1]-y,z,b[0]-x,b[1]-y,z,a[0]+x,a[1]+y,z,a[0]+x,a[1]+y,z,b[0]-x,b[1]-y,z,b[0]+x,b[1]+y,z);
  };
  const chain=[[0,70,0],[4,57,0],[-2,47,0],[6,38,0],[2,29,0],[8,17,0],[5,0,0]];
  for(let i=0;i<chain.length-1;i++)segment(chain[i],chain[i+1],.19-i*.018);
  for(const points of [[chain[2],[-10,38,0],[-7,29,0],[-14,22,0]],[chain[3],[17,34,0],[14,26,0],[24,18,0]],[chain[1],[12,52,0],[16,44,0]]])for(let i=0;i<points.length-1;i++)segment(points[i],points[i+1],.085-i*.023);
  const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(out,3));return geo;
}
class Voyage {
  constructor(g,ctx){
    this.game=g;this.ctx=ctx;this.T=ctx.T;this.active=false;
    this.overlay=el('section','voyage16',null,document.body);this.overlay.hidden=true;this.overlay.setAttribute('aria-label',loc('Морской переход','Sea voyage'));
    el('div','voyage16-vignette',null,this.overlay);el('div','voyage16-bar top',null,this.overlay);el('div','voyage16-bar bottom',null,this.overlay);
    this.fade=el('div','voyage16-fade',null,this.overlay);const heading=el('div','voyage16-heading',null,this.overlay);this.kicker=el('span','',null,heading);this.title=el('h2','',null,heading);
    const track=el('div','voyage16-track',null,this.overlay);this.progress=el('i','',null,track);
    this.skip=el('button','intro-skip',loc('ПРОПУСТИТЬ · ПРОБЕЛ','SKIP · SPACE'),this.overlay);this.skip.type='button';this.skip.onclick=()=>this.skipNow();
    this.onKey=e=>{if(!this.active)return;if(e.code==='Escape'){e.preventDefault();e.stopImmediatePropagation();if(g.mode==='playing')g.pause();else if(g.mode==='paused')g.resume();return;}if(e.code==='Space'&&g.mode==='playing'){e.preventDefault();e.stopImmediatePropagation();this.skipNow();}};
    document.addEventListener('keydown',this.onKey,true);
  }
  start(zone){
    const g=this.game;this.active=true;this.time=0;this.skipped=false;this.zone=zone;
    this.saved={exposure:g.renderer.toneMappingExposure,tools:g.toolView.root.visible};
    this.kicker.textContent=loc('ДЕРЖИМ КУРС','SETTING SAIL');this.title.textContent=this.ctx.nameOf(zone);this.overlay.hidden=false;this.fade.style.opacity='1';this.progress.style.transform='scaleX(0)';
    document.body.classList.add('voyage-active16');document.exitPointerLock?.();g.input.reset();g.input.enabled=false;g.platform.stopGameplay();g.toolView.root.visible=false;
    this.root=new this.T.Group();this.root.name='Voyage · foam wake and fog';this.root.userData.ignoreShots=true;g.scene.add(this.root);
    this.mist=createMist(this.T,this.root,g.input.isTouch?6:10);
    const T=this.T,positions=[];
    // Two curved, feathered wake ribbons trailing the hull.
    for(let side of [-1,1])for(let i=0;i<23;i++){const u=i/23,v=(i+1)/23,x=side*(.6+u*3.7),xx=side*(.6+v*3.7),z=1+u*13,zz=1+v*13,w=.11+u*.24;positions.push(x-w,.03,z,x+w,.03,z,xx+w,.03,zz,x-w,.03,z,xx+w,.03,zz,xx-w,.03,zz);}
    const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(positions,3));this.wake=new T.Mesh(geo,new T.MeshBasicMaterial({color:'#c3e9df',transparent:true,opacity:.46,depthWrite:false,side:T.DoubleSide}));this.root.add(this.wake);
  }
  skipNow(){
    if(!this.active||this.game.mode!=='playing'||this.game.platformPaused)return;this.skipped=true;
    const travel=this.game.zoneSystem?._travel;if(travel&&travel.phase!=='loading'){this.fade.style.opacity='1';travel.elapsed=travel.duration;}
  }
  update(dt){
    const g=this.game,T=this.T;if(!this.active||g.mode!=='playing'||g.platformPaused||document.hidden)return;
    dt=Math.min(.06,dt);this.time+=dt;g.elapsed+=dt;g.frame++;
    const before=g.zoneSystem._travel;
    if(before&&this.skipped&&before.phase!=='loading')before.elapsed=before.duration;
    g.zoneSystem.update(dt,g.elapsed);g.assetManager.update(dt);g.effects.update(dt);
    const travel=g.zoneSystem._travel??before,boat=g.zoneSystem.boatInstance;if(!travel||!boat)return;
    const p=travel.progress??0,depart=p<.5,u=depart?p*2:(p-.5)*2,reduced=g.progression.state.settings.reducedMotion;
    // The boat remains full size; the camera tracks from outside, with a slow
    // side-to-stern dolly on departure and a shore reveal on arrival.
    const heading=boat.rotation.y,forward=new T.Vector3(-Math.sin(heading),0,-Math.cos(heading)),side=new T.Vector3(Math.cos(heading),0,-Math.sin(heading));
    const offset=boat.position.clone().addScaledVector(forward,-(depart?9.5:11.5)).addScaledVector(side,(depart?6.5-2*u:-7+2*u));
    offset.y=boat.position.y+(reduced?5.3:5.7+Math.sin(u*Math.PI)*1.4);
    g.camera.position.copy(offset);g.camera.lookAt(boat.position.clone().addScaledVector(forward,depart?2.2:3.4).add(new T.Vector3(0,.7,0)));g.camera.updateMatrixWorld(true);
    g.updateAmbient(dt);updateMist(this.mist,g.camera,this.time);
    this.wake.position.copy(boat.position);this.wake.position.y=.055;this.wake.rotation.y=heading;this.wake.material.opacity=.3+Math.sin(this.time*2)*.04;
    this.wake.visible=travel.phase!=='loading';
    // Full cover at the actual world swap; no teleport, asset pop-in or HUD flash.
    const midpoint=1-smooth(Math.abs(p-.5)/.065),opening=1-smooth(this.time/.85),ending=smooth((p-.96)/.04);
    this.fade.style.opacity=String(this.skipped?1:Math.max(midpoint,opening,ending));this.progress.style.transform=`scaleX(${p})`;
    this.kicker.textContent=loc(depart?'ДЕРЖИМ КУРС':'ЗЕМЛЯ ВПЕРЕДИ',depart?'SETTING SAIL':'LAND AHEAD');
    this.skip.disabled=travel.phase==='loading';
  }
  finish(){
    if(!this.active)return;const g=this.game;this.active=false;this.overlay.hidden=true;document.body.classList.remove('voyage-active16');
    this.mist?.texture.dispose();disposeTree(this.root);this.root=null;this.mist=null;g.renderer.toneMappingExposure=this.saved.exposure;
    g.toolView.root.visible=this.saved.tools;g.camera.position.copy(g.player.position);g.camera.rotation.set(g.player.pitch,g.player.yaw,0,'YXZ');g.camera.updateMatrixWorld(true);g.input.reset();
    if(g.mode==='playing'&&!g.panelOpen&&!g.platformPaused){g.input.enabled=true;g.platform.startGameplay();}
  }
  destroy(){this.finish();document.removeEventListener('keydown',this.onKey,true);this.overlay.remove();}
}
export function installCinematics16(ctx){
  const {T,Game,BoatWorld}=ctx,P=ExpeditionIntro.prototype;
  P.makeLightning=function(){
    this.lightning=new T.Mesh(lightningGeometry(T),new T.MeshBasicMaterial({color:'#ecf5ff',transparent:true,opacity:0,depthWrite:false,side:T.DoubleSide,fog:false}));this.lightning.frustumCulled=false;this.root.add(this.lightning);
    this.lightningGlow16=new T.Mesh(lightningGeometry(T,4.5),new T.MeshBasicMaterial({color:'#72b9ff',transparent:true,opacity:0,depthWrite:false,side:T.DoubleSide,fog:false}));this.lightningGlow16.frustumCulled=false;this.root.add(this.lightningGlow16);
  };
  wrap(P,'start',function(original,...args){
    const r=original(...args);this.lastThunder16=-1;this.mist16=createMist(T,this.root,this.game.input.isTouch?10:20);this.overlay.classList.add('intro16');this.skip.textContent=loc('ПРОПУСТИТЬ · ПРОБЕЛ','SKIP · SPACE');return r;
  });
  wrap(P,'update',function(original,dt){
    // The old two thunder cues are replaced by timed, visible forked lightning.
    this.lastThunder=1e9;const r=original(dt);if(!this.active)return r;
    const t=this.time,g=this.game,reduced=g.progression.state.settings.reducedMotion;
    this.kicker.hidden=this.subtitle.hidden=true;
    const title=t<7?loc('ВДАЛИ ОТ ДОМА','FAR FROM HOME'):t<14?loc('СКВОЗЬ ШТОРМ','THROUGH THE STORM'):t<20.5?loc('ДЕРЖИСЬ!','HOLD ON!'):t<23.8?'':loc('ТЫ ВЫЖИЛ','YOU SURVIVED');
    if(this.title.textContent!==title)this.title.textContent=title;
    if(t<20.5){
      updateMist(this.mist16,g.camera,t,true);
      const events=[3.8,8.6,14.2,18.2];let pulse=0,which=0;
      events.forEach((at,i)=>{const d=t-at,value=d>=0&&d<.46?Math.max(0,1-d/.46)*(.6+.4*Math.cos(d*18)):0;if(value>pulse){pulse=value;which=i;}
        if(t>at+.42&&this.lastThunder16<i&&!document.hidden&&!g.audio._isEffectivelyMuted()){this.lastThunder16=i;this.thunderAudio.currentTime=0;this.thunderAudio.volume=.48;this.thunderAudio.play().catch(()=>{});}
      });
      if(reduced)pulse=0;const x=g.camera.position.x+(which%2?-23:26),z=g.camera.position.z+70;
      this.lightning.position.set(x,0,z);this.lightning.rotation.y=which%2?.2:-.22;this.lightning.material.opacity=pulse;
      this.lightningGlow16.position.copy(this.lightning.position);this.lightningGlow16.rotation.copy(this.lightning.rotation);this.lightningGlow16.material.opacity=pulse*.17;
      g.hemi.intensity=.62+pulse*.65;g.sun.intensity=.65+pulse*2.3;g.renderer.toneMappingExposure=.86+pulse*.12;
      this.droplets.style.opacity=reduced?'.1':String(.32+Math.sin(t*.9)*.08);
      if(this.boat&&!reduced&&t>16)this.boat.rotation.z+=Math.sin((t-16)*1.7)*.085*smooth((t-16)/2);
    }
    return r;
  });
  wrap(P,'restore',function(original,...args){const texture=this.mist16?.texture;this.mist16=null;const r=original(...args);texture?.dispose();this.lightningGlow16=null;return r;});
  wrap(Game.prototype,'init',async function(original,...args){const r=await original(...args);this.voyage16=new Voyage(this,ctx);return r;});
  wrap(Game.prototype,'setupZoneSystem',function(original,...args){const r=original(...args);this.zoneSystem.game16=this;return r;});
  wrap(Game.prototype,'travelToZone',async function(original,id,zone,...args){
    zone??=ctx.data.zones.find(z=>z.id===id);
    if(this.voyage16?.active)return {ok:false,reason:'busy'};
    if(!zone||id===this.player.zone||!this.progression.canAccessZone(id)||this.progression.state.coins<zone.travelCost||this.guide?.active&&this.guide.step<10)return original(id,zone,...args);
    this.harpoon?.cancel();this.voyage16.start(zone);
    try{return await original(id,zone,...args);}finally{this.voyage16.finish();}
  });
  wrap(BoatWorld.prototype,'travel',function(original,id,options={}){
    const r=original(id,options);if(this.game16?.voyage16?.active&&this._travel&&!options.immediate)this._travel.duration=this.game16.progression.state.settings.reducedMotion?6.5:10;
    return r;
  });
  wrap(BoatWorld.prototype,'_animateTravelBoat',function(original,travel,p,time){
    if(!this.game16?.voyage16?.active||!this.boatInstance)return original(travel,p,time);
    const departing=p<.5,zone=departing?travel.fromZone:travel.toZone,u=departing?p*2:(p-.5)*2,dock=this._dockPose(zone);
    const dir=dock.position.clone().sub(new T.Vector3().fromArray(zone.bounds.center)).setY(0);if(dir.lengthSq()<.1)dir.set(0,0,-1);dir.normalize();
    const distance=departing?smooth(u)*23:(1-smooth(u))*23;
    const boat=this.boatInstance;boat.position.copy(dock.position).addScaledVector(dir,distance);boat.position.y=dock.position.y+Math.sin(time*1.7)*.075;
    const heading=Math.atan2(-(departing?dir.x:-dir.x),-(departing?dir.z:-dir.z));boat.rotation.set(Math.sin(time*1.4)*.017,heading,Math.sin(time*1.1)*.026);boat.scale.copy(this._boatBaseScale);
  });
  wrap(Game.prototype,'update',function(original,dt){if(this.voyage16?.active){this.voyage16.update(dt);return;}return original(dt);});
  for(const method of ['applyLookInput','selectTool','openPanel'])wrap(Game.prototype,method,function(original,...args){if(this.voyage16?.active)return false;return original(...args);});
  wrap(Game.prototype,'resume',function(original,...args){const r=original(...args);if(this.voyage16?.active){this.input.enabled=false;this.platform.stopGameplay();}return r;});
  wrap(Game.prototype,'destroy',function(original,...args){this.voyage16?.destroy();return original(...args);});
}
