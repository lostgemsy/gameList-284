import {gameClip110} from '../refinement110/clip.js';
import {clamp,smooth,el,putOnGround,disposeTree} from '../update/helpers.js';

/** A real in-engine night storm: displaced geometry, world-space rain and approach. */
export class ExpeditionIntro {
  constructor(game,ctx){
    this.game=game;this.T=ctx.T;this.active=false;this.time=0;this.duration=29;
    this.overlay=el('section','expedition-intro',null,document.body);this.overlay.hidden=true;
    this.overlay.setAttribute('aria-label','Кораблекрушение: ночной шторм и незнакомый остров');
    el('div','intro-vignette',null,this.overlay);this.droplets=el('div','intro-droplets',null,this.overlay);
    el('div','intro-letterbox intro-letterbox--top',null,this.overlay);el('div','intro-letterbox intro-letterbox--bottom',null,this.overlay);
    this.fade=el('div','intro-fade',null,this.overlay);const head=el('div','intro-heading',null,this.overlay);
    this.kicker=el('small','','ДАЛЕКО ОТ ДОМА · ОТКРЫТЫЙ ОКЕАН',head);
    this.title=el('h2','','Море не обещало пощады.',head);this.subtitle=el('p','','',head);
    this.skip=el('button','intro-skip','ПРОПУСТИТЬ ВСТУПЛЕНИЕ · ПРОБЕЛ',this.overlay);this.skip.type='button';this.skip.onclick=()=>{if(game.mode==='playing')this.finish();};
    this.onKey=e=>{if(this.active&&e.code==='Space'&&game.mode==='playing'){e.preventDefault();e.stopImmediatePropagation();this.finish();}};
    this.onVisibility=()=>this.syncAudio();document.addEventListener('keydown',this.onKey,true);document.addEventListener('visibilitychange',this.onVisibility);
    this.rainAudio=gameClip110(game,'storm_rain110',new URL('./storm-rain.ogg',import.meta.url),true);
    this.thunderAudio=gameClip110(game,'storm_thunder110',new URL('./storm-thunder.ogg',import.meta.url));
  }
  wave(x,z,t){return Math.sin(x*.048+z*.062+t*1.4)*2.1+Math.sin(x*.105-z*.045+t*2.05)*1.3+Math.sin(x*.19+z*.19+t*2.9)*.4;}
  start(){
    const g=this.game,T=this.T;if(this.active)this.restore(false);
    this.active=true;this.time=0;this.lastThunder=-10;this.daylight=false;this.overlay.hidden=false;
    document.body.classList.add('intro-active');document.exitPointerLock?.();g.input.enabled=false;g.input.reset();g.panelOpen=false;g.platform.stopGameplay();g.ui.hud.classList.add('hidden');g.toolView.root.visible=false;
    this.saved={sun:g.sun.intensity,sunColor:g.sun.color.clone(),sunPos:g.sun.position.clone(),hemi:g.hemi.intensity,hemiColor:g.hemi.color.clone(),ground:g.hemi.groundColor.clone(),fog:g.scene.fog.color.clone(),density:g.scene.fog.density,bg:g.scene.background.clone(),exposure:g.renderer.toneMappingExposure,environment:g.scene.environmentIntensity,water:g.water.visible,clouds:(g.clouds??[]).map(c=>c.visible),birds:(g.birds??[]).map(c=>c.visible)};
    for(const o of [...(g.clouds??[]),...(g.birds??[])])o.visible=false;
    this.root=new T.Group();this.root.name='Night shipwreck: geometric storm';this.root.userData.ignoreShots=true;g.scene.add(this.root);
    this.makeSea();this.makeRain();this.makeLightning();
    this.boat=g.zoneSystem.boatInstance?.clone(true)??new T.Group();this.boat.visible=true;this.boat.name='Shipwreck boat';this.root.add(this.boat);this.borrowedBoat=true;
    // Upgrade the tiny starter raft to an actual sailing vessel, without blocking playback.
    const run=this.root;
    g.assetManager.instantiate('boat_with_sail',{targetLength:9,uniqueMaterials:true,castShadow:false}).then(model=>{
      if(!this.active||this.root!==run){g.assetManager.disposeInstance?.(model);return;}
      this.boat.removeFromParent();this.boat=model;this.borrowedBoat=false;this.boat.name='Shipwreck sailing vessel';this.root.add(model);
    }).catch(()=>{});
    g.water.visible=false;g.audio.unlock().catch(()=>{});g.audio.setOcean(true,{volume:.2,fadeMs:100});this.rainAudio.currentTime=0;this.syncAudio();this.update(0);
  }
  makeSea(){
    const T=this.T,segments=this.game.input.isTouch?56:100,extent=480,pos=[],normal=[],uv=[],indices=[];
    for(let z=0;z<=segments;z++)for(let x=0;x<=segments;x++){pos.push((x/segments-.5)*extent,0,(z/segments-.5)*extent);normal.push(0,1,0);uv.push(x/segments,z/segments);}
    for(let z=0;z<segments;z++)for(let x=0;x<segments;x++){const a=z*(segments+1)+x,b=a+segments+1;indices.push(a,b,a+1,a+1,b,b+1);}
    const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(pos,3));geo.setAttribute('normal',new T.Float32BufferAttribute(normal,3));geo.setAttribute('uv',new T.Float32BufferAttribute(uv,2));geo.setIndex(indices);
    const mat=new T.MeshStandardMaterial({color:'#123844',roughness:.48,metalness:.08,side:T.DoubleSide});
    this.seaUniforms={uStormTime:{value:0},uStormOrigin:{value:new T.Vector2()}};
    mat.onBeforeCompile=shader=>{
      Object.assign(shader.uniforms,this.seaUniforms);
      const pre=`uniform float uStormTime; uniform vec2 uStormOrigin; varying float vCrest; varying vec2 vSeaWorld;
      float waveHeight(vec2 p){return sin(p.x*.048+p.y*.062+uStormTime*1.4)*2.1+sin(p.x*.105-p.y*.045+uStormTime*2.05)*1.3+sin(p.x*.19+p.y*.19+uStormTime*2.9)*.4;}`;
      shader.vertexShader=pre+"\n"+shader.vertexShader;
      shader.vertexShader=shader.vertexShader.replace('#include <beginnormal_vertex>',`vec2 wp=position.xz+uStormOrigin; float a=wp.x*.048+wp.y*.062+uStormTime*1.4; float b=wp.x*.105-wp.y*.045+uStormTime*2.05; float c=wp.x*.19+wp.y*.19+uStormTime*2.9; vec3 objectNormal=normalize(vec3(-(.1008*cos(a)+.1365*cos(b)+.076*cos(c)),1.,-(.1302*cos(a)-.0585*cos(b)+.076*cos(c))));`);
      shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>',`vec3 transformed=position; transformed.y=waveHeight(position.xz+uStormOrigin); vCrest=transformed.y; vSeaWorld=position.xz+uStormOrigin;`);
      shader.fragmentShader='varying float vCrest; varying vec2 vSeaWorld;\n'+shader.fragmentShader;
      shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
      if(distance(vSeaWorld,vec2(-16.,18.))<43. || distance(vSeaWorld,vec2(70.,-58.))<31. || distance(vSeaWorld,vec2(-92.,-42.))<42.) discard;
      float foam=smoothstep(1.65,3.15,vCrest); float flecks=sin(vSeaWorld.x*1.31+sin(vSeaWorld.y*1.75))*sin(vSeaWorld.y*1.57+sin(vSeaWorld.x*2.35)); float lines=.52+.48*smoothstep(-.6,.75,flecks); diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.57,.72,.77),foam*lines*.87);`);
    };
    this.sea=new T.Mesh(geo,mat);this.sea.name='Three-metre rolling storm waves';this.sea.frustumCulled=false;this.root.add(this.sea);
  }
  makeRain(){
    const T=this.T;this.dropCount=this.game.input.isTouch?220:750;this.drops=[];
    let seed=118;const rand=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296;};
    for(let i=0;i<this.dropCount;i++)this.drops.push({x:(rand()-.5)*65,y:rand()*34-12,z:(rand()-.5)*65,s:22+rand()*18,l:.75+rand()*1.6});
    const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(new Float32Array(this.dropCount*18),3));
    this.rainMesh=new T.Mesh(geo,new T.MeshBasicMaterial({color:'#a9c6d8',transparent:true,opacity:.4,depthWrite:false,side:T.DoubleSide}));this.rainMesh.frustumCulled=false;this.rainMesh.name='World-space slanted rain';this.root.add(this.rainMesh);
  }
  makeLightning(){
    const T=this.T,vertices=[],points=[[-45,65,-65],[-40,48,-65],[-46,38,-65],[-36,25,-65],[-39,8,-65]];
    for(let i=0;i<points.length-1;i++){const a=points[i],b=points[i+1],w=.23;vertices.push(a[0]-w,a[1],a[2],b[0]-w,b[1],b[2],a[0]+w,a[1],a[2],a[0]+w,a[1],a[2],b[0]-w,b[1],b[2],b[0]+w,b[1],b[2]);}
    const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(vertices,3));
    this.lightning=new T.Mesh(geo,new T.MeshBasicMaterial({color:'#d0e5ff',transparent:true,opacity:0,depthWrite:false,side:T.DoubleSide}));this.root.add(this.lightning);
  }
  updateRain(dt){
    const g=this.game,arr=this.rainMesh.geometry.attributes.position;
    const camera=g.camera.position;this.rainMesh.position.copy(camera);
    for(let i=0;i<this.drops.length;i++){
      const d=this.drops[i];d.y=((d.y-d.s*dt+14)%36+36)%36-14;d.x=((d.x-10*dt+33)%66+66)%66-33;d.z=((d.z+3*dt+33)%66+66)%66-33;
      const x=d.x,y=d.y,z=d.z,dx=.28*d.l,dy=d.l,w=.018;
      const v=[x-w,y,z,x+w,y,z,x+dx+w,y+dy,z,x-w,y,z,x+dx+w,y+dy,z,x+dx-w,y+dy,z];
      for(let k=0;k<18;k++)arr.array[i*18+k]=v[k];
    }
    arr.needsUpdate=true;
  }
  update(dt){
    if(!this.active)return;const g=this.game,T=this.T;this.time+=dt;const t=this.time,reduced=g.progression.state.settings.reducedMotion;
    if(t<20.5){
      const u=smooth(t/20.5),x=45-38*u,z=-240+215*u;
      const h=this.wave(x,z,t),roll=reduced?Math.sin(t*.75)*.015:Math.sin(t*1.4)*.095+Math.sin(t*2.5)*.025;
      this.boat.visible=true;this.boat.position.set(x,h+.2,z);this.boat.rotation.set(Math.sin(t*1.1)*(reduced?.018:.055),Math.PI-.18,roll);
      g.camera.position.set(x+5.2,h+(reduced?4.7:4.4),z-9.3);g.camera.lookAt(new T.Vector3(x-3,1.7,z+42));g.camera.rotateZ(roll*.72);
      this.sea.position.set(x,0,z);this.seaUniforms.uStormTime.value=t;this.seaUniforms.uStormOrigin.value.set(x,z);
      g.sun.intensity=.7;g.sun.color.set('#8aa8d6');g.sun.position.set(-65,38,-80);g.hemi.intensity=.62;g.hemi.color.set('#7188b2');g.hemi.groundColor.set('#071220');
      g.scene.environmentIntensity=.08;g.scene.fog.color.set('#142434');g.scene.fog.density=.0068-u*.002;g.scene.background.set('#081523');g.renderer.toneMappingExposure=.83;
      const pulse=reduced?0:Math.max(0,1-Math.abs(t-8.4)/.42)+Math.max(0,1-Math.abs(t-15.2)/.6);
      this.lightning.material.opacity=pulse*.75;g.sun.intensity+=pulse*1.7;
      if(((t>8.7&&this.lastThunder<8)||(t>15.6&&this.lastThunder<15))&&!document.hidden&&!g.audio.muted){this.lastThunder=t;this.thunderAudio.currentTime=0;this.thunderAudio.volume=.55;this.thunderAudio.play().catch(()=>{});}
      const sky=g.skyDome?.material.uniforms;if(sky){g.skyDome.position.copy(g.camera.position);sky.topColor.value.set('#06101e');sky.horizonColor.value.set('#23394b');sky.lowColor.value.set('#102432');sky.sunColor.value.set('#7096b8');}
      this.updateRain(dt);this.fade.style.opacity=String(smooth((t-19.1)/1.5));this.droplets.style.opacity=reduced?'.12':'.48';
      if(t<6){this.kicker.textContent='ДАЛЕКО ОТ ДОМА · ОТКРЫТЫЙ ОКЕАН';this.title.textContent='Море не обещало пощады.';this.subtitle.textContent='Ветер рвёт парус. Волны скрывают горизонт.';}
      else if(t<13){this.kicker.textContent='ВПЕРЕДИ — НЕЗНАКОМЫЙ БЕРЕГ';this.title.textContent='Сквозь дождь проступает остров.';this.subtitle.textContent='Единственный шанс — добраться до суши.';}
      else{this.kicker.textContent='НОЧНОЙ ПРИБОЙ';this.title.textContent='Держись. Берег уже близко.';this.subtitle.textContent='Ещё одна волна…';}
    }else if(t<23.8){
      this.root.visible=false;this.fade.style.opacity='1';this.droplets.style.opacity='0';
      this.kicker.textContent='ПОСЛЕ КОРАБЛЕКРУШЕНИЯ';this.title.textContent='Тишина.';this.subtitle.textContent='Кажется, кто-то зовёт тебя с берега.';
    }else{
      if(!this.daylight){this.restoreLighting();this.daylight=true;putOnGround(g,3,8);}
      const u=smooth((t-23.8)/5.2);this.fade.style.opacity=String(1-smooth((t-23.8)/2.2));
      const y=g.surfaceAt(3,8)??3.02;g.camera.position.set(3,y-1.15*(1-u),8);g.camera.lookAt(new T.Vector3(-1,1.6+u*.7,3));
      g.water.material.uniforms.time.value+=dt*.6;g.assetManager.update(dt);
      this.kicker.textContent='УТРО · ПИРС КОРЯГИ';this.title.textContent='Ты выжил.';this.subtitle.textContent='Но до дома — целый океан.';
    }
    g.camera.updateMatrixWorld(true);this.syncAudio();if(t>=this.duration)this.finish();
  }
  syncAudio(){
    const g=this.game,play=this.active&&this.time<21&&g.mode==='playing'&&!g.platformPaused&&!document.hidden&&!g.audio?._isEffectivelyMuted?.();
    const volume=clamp(.58*(1-smooth((this.time-19)/2)));
    this.rainAudio.volume=volume;
    if(play){if(this.rainAudio.paused)this.rainAudio.play().catch(()=>{});}else this.rainAudio.pause();
    if(!play)this.thunderAudio.pause();
  }
  restoreLighting(){
    const g=this.game,s=this.saved;if(!s)return;
    g.sun.intensity=s.sun;g.sun.color.copy(s.sunColor);g.sun.position.copy(s.sunPos);g.hemi.intensity=s.hemi;g.hemi.color.copy(s.hemiColor);g.hemi.groundColor.copy(s.ground);
    g.scene.fog.color.copy(s.fog);g.scene.fog.density=s.density;g.scene.background.copy(s.bg);g.scene.environmentIntensity=s.environment;g.renderer.toneMappingExposure=s.exposure;g.water.visible=s.water;g.updateSkyColors(10);
    (g.clouds??[]).forEach((c,i)=>c.visible=s.clouds[i]??true);(g.birds??[]).forEach((c,i)=>c.visible=s.birds[i]??true);
  }
  restore(gameplay=true){
    const g=this.game;this.active=false;this.overlay.hidden=true;document.body.classList.remove('intro-active');this.restoreLighting();this.rainAudio.pause();this.thunderAudio.pause();
    if(this.boat){this.boat.removeFromParent();if(!this.borrowedBoat)g.assetManager.disposeInstance?.(this.boat);this.boat=null;}
    disposeTree(this.root);this.root=null;
    if(gameplay){putOnGround(g,3,8);g.player.yaw=0;g.player.pitch=-.08;g.camera.rotation.set(-.08,0,0,'YXZ');g.toolView.root.visible=true;g.ui.hud.classList.remove('hidden');g.input.reset();}
  }
  finish(){
    if(!this.active)return;const g=this.game;this.restore();g.progression.expedition.introSeen=true;g.progression._touch('intro-complete');
    g.audio.setOcean(true,{volume:.3,fadeMs:500});
    if(g.homecoming)g.homecoming.welcome();else{g.input.enabled=g.mode==='playing';g.platform.startGameplay();g.guide.start();}
  }
  destroy(){if(this.active)this.restore(false);this.rainAudio.pause();this.thunderAudio.pause();this.overlay.remove();document.removeEventListener('keydown',this.onKey,true);document.removeEventListener('visibilitychange',this.onVisibility);}
}
