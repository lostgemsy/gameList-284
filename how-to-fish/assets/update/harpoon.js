import {clamp, el, disposeTree} from './helpers.js';

/** A reusable projectile with swept collision, underwater hits and a real tether. */
export class HarpoonController {
  constructor(game, ctx) {
    this.game=game; this.ctx=ctx; this.T=ctx.T;
    this.state='ready';this.cooldown=0;this.target=null;this.time=0;this.range=14;this.speed=20;
    const T=this.T;
    this.start=new T.Vector3();this.position=new T.Vector3();this.previous=new T.Vector3();this.velocity=new T.Vector3();
    this.muzzlePoint=new T.Vector3(.025,.025,-1.35);this.muzzleWorld=new T.Vector3();
    this.root=new T.Group();this.root.name='Harpoon projectile and tether';this.root.userData.ignoreShots=true;game.scene.add(this.root);
    this.dart=this.buildDart();this.root.add(this.dart);this.dart.visible=false;
    this.ropeGeometry=new T.BufferGeometry();this.ropePositions=new Float32Array(25*3);
    this.ropeGeometry.setAttribute('position',new T.Float32BufferAttribute(this.ropePositions,3));
    this.rope=new T.Line(this.ropeGeometry,new T.LineBasicMaterial({color:'#8cddd2',transparent:true,opacity:.8,depthWrite:false}));
    this.rope.frustumCulled=false;this.rope.visible=false;this.root.add(this.rope);
    this.view=this.buildView();game.toolView.harpoon=this.view;game.toolView.root.add(this.view);this.view.visible=false;
    this.hud=el('div','harpoon-readout',null,document.querySelector('#hud'));
    this.hud.hidden=true;this.label=el('strong','','ГАРПУН',this.hud);this.hint=el('span','','',this.hud);
    this.track=el('i','harpoon-recharge',null,this.hud);
  }
  mesh(geometry,material,x=0,y=0,z=0,parent=this.view) {
    const mesh=new this.T.Mesh(geometry,material);mesh.position.set(x,y,z);parent?.add(mesh);return mesh;
  }
  buildDart() {
    const T=this.T, group=new T.Group();
    const steel=new T.MeshStandardMaterial({color:'#c8e3df',metalness:.78,roughness:.26});
    let m=this.mesh(new T.CylinderGeometry(.018,.021,.72,8),steel,0,0,0,group);m.rotation.x=Math.PI/2;
    m=this.mesh(new T.ConeGeometry(.06,.22,5),steel,0,0,-.45,group);m.rotation.x=-Math.PI/2;
    for(const x of [-.06,.06]){m=this.mesh(new T.CylinderGeometry(.012,.018,.15,6),steel,x,0,-.36,group);m.rotation.z=x>0?.5:-.5;m.rotation.x=Math.PI/2;}
    return group;
  }
  buildView() {
    const T=this.T, group=new T.Group();group.name='Handheld harpoon · pressure chamber / rubber / reel';
    const steel=new T.MeshStandardMaterial({color:'#306778',metalness:.62,roughness:.33});
    const dark=new T.MeshStandardMaterial({color:'#1a2d36',metalness:.18,roughness:.64});
    const brass=new T.MeshStandardMaterial({color:'#d3ae63',metalness:.64,roughness:.34});
    let m=this.mesh(new T.CylinderGeometry(.047,.065,1.04,12),steel,.025,.025,-.59,group);m.rotation.x=Math.PI/2;
    m=this.mesh(new T.BoxGeometry(.125,.28,.14),dark,.025,-.13,-.1,group);m.rotation.x=-.24;
    this.mesh(new T.BoxGeometry(.17,.095,.35),dark,.025,-.028,-.24,group);
    m=this.mesh(new T.CylinderGeometry(.091,.091,.105,16),brass,.025,-.125,-.44,group);m.rotation.z=Math.PI/2;
    for(const x of [-.085,.135]){m=this.mesh(new T.CylinderGeometry(.012,.012,.7,8),dark,x,.06,-.58,group);m.rotation.x=Math.PI/2;}
    m=this.mesh(new T.CylinderGeometry(.012,.012,1.1,8),brass,.025,.07,-.83,group);m.rotation.x=Math.PI/2;
    m=this.mesh(new T.ConeGeometry(.052,.19,5),brass,.025,.07,-1.45,group);m.rotation.x=-Math.PI/2;
    group.add(this.game.toolView.makeArm(-.13,-.22,.15,-.46),this.game.toolView.makeArm(.32,-.24,-.24,.48));
    group.traverse(o=>{if(o.isMesh){o.frustumCulled=false;o.renderOrder=1000;}});
    return group;
  }
  muzzle() {
    return this.game.toolView.projectAttachmentToWorld(this.view,this.muzzlePoint,this.muzzleWorld);
  }
  fire() {
    const g=this.game,T=this.T;
    if(this.state!=='ready'||this.cooldown>0||g.panelOpen)return false;
    // Trace from the camera centreline so a low decorative barrel cannot hit
    // the pier while the reticle has a clear view of the target. The rope and
    // first-person model still originate at the hand.
    g.camera.updateMatrixWorld(true);
    const forward=new T.Vector3(0,0,-1).applyQuaternion(g.camera.quaternion);
    this.start.copy(g.camera.position).addScaledVector(forward,.65);
    this.position.copy(this.start);this.previous.copy(this.start);
    // Aim at the actual camera-ray target. The off-centre muzzle no longer
    // converges at an arbitrary 28 m, and there is no invisible gravity drop.
    g.camera.updateMatrixWorld(true);
    const end=new T.Vector3(0,0,-1).applyQuaternion(g.camera.quaternion).multiplyScalar(this.range).add(g.camera.position);
    const intended=this.sweep(g.camera.position,end);
    const aim=intended?intended.creature.object.position.clone():end;
    this.velocity.copy(aim).sub(this.start).normalize().multiplyScalar(this.speed);
    this.time=0;this.state='flying';this.dart.visible=this.rope.visible=true;this.dart.position.copy(this.position);
    this.dart.quaternion.setFromUnitVectors(new T.Vector3(0,0,-1),this.velocity.clone().normalize());
    g.toolView.recoil=.45;g.audio.play('bloop',{volume:.52,playbackRate:.65});
    this.ctx.events?.(g,'harpoon-fire');return true;
  }
  update(dt,input,active) {
    this.hud.hidden=!active;
    if(!active){if(this.state!=='ready')this.cancel();return;}
    this.cooldown=Math.max(0,this.cooldown-dt);
    if(input.mouse.rightPressed){this.cancel();return;}
    if(input.mouse.leftPressed&&this.state==='ready')this.queuedShot=true;
    if(this.state==='ready'&&this.queuedShot&&this.cooldown<=0){this.queuedShot=false;this.fire();}
    if(this.state==='flying') {
      this.time+=dt;this.previous.copy(this.position);
      this.position.addScaledVector(this.velocity,dt);
      const hit=this.sweep(this.previous,this.position);
      const obstruction=this.firstObstruction(this.previous,hit?hit.point:this.position);
      if(obstruction){this.position.copy(obstruction);this.game.effects.impact?.(obstruction,new this.T.Vector3(0,1,0),'wood',.5);this.recall();}
      else if(hit){this.position.copy(hit.point);this.hit(hit.creature);}
      else {
        const surface=this.game.surfaceAt(this.position.x,this.position.z);
        const ground=surface==null?null:surface-this.game.playerEyeHeight;
        const underLand=ground!=null&&this.position.y<ground+.025;
        const wall=this.position.y>0&&this.game.isSolidAt(this.position.x,this.position.z,.07);
        if(this.time>.09&&(underLand||wall)){this.game.effects.impact?.(this.position,new this.T.Vector3(0,1,0),'wood',.5);this.recall();}
        else if(this.time>this.range/this.speed||this.position.y< -5)this.recall();
      }
    } else if(this.state==='tethered') {
      const fish=this.target;
      if(!fish||fish.dead||!fish.object.parent){this.recall();}
      else {
        this.time+=dt;
        const distance=fish.object.position.distanceTo(this.game.player.position);
        if(distance>this.range+4||this.time>(this.stats15?.().tetherTime??16)){this.cancel();return;}
        if(input.mouse.left) {
          const shore=this.game.player.position.clone().sub(fish.object.position).setY(0).normalize();
          const next=fish.object.position.clone().addScaledVector(shore,dt*(this.stats15?.().pull??1.05)*(fish.species.boss?.65:1));
          if(this.game.isWaterPoint(next,.15))fish.object.position.copy(next);
          fish.object.position.y=Math.min(-.05,fish.object.position.y+dt*.25);
          this.drain+=dt*(this.stats15?.().haul??7);
          if(this.drain>=4){const damage=Math.floor(this.drain);this.drain-=damage;this.damage(fish,damage);}
        }
        this.position.copy(fish.object.position);
      }
    } else if(this.state==='returning') {
      this.position.lerp(this.muzzle(),1-Math.exp(-dt*14));
      if(this.position.distanceTo(this.muzzle())<.35){this.state='ready';this.dart.visible=this.rope.visible=false;}
    }
    this.dart.position.copy(this.position);this.updateRope();this.updateHUD();
  }
  firstObstruction(from,to) {
    const distance=from.distanceTo(to),steps=Math.max(1,Math.ceil(distance/.16));
    for(let i=1;i<=steps;i++){
      const p=from.clone().lerp(to,i/steps),surface=this.game.surfaceAt(p.x,p.z);
      const ground=surface==null?null:surface-this.game.playerEyeHeight;
      if((ground!=null&&p.y<ground+.025)||(p.y>0&&this.game.isSolidAt(p.x,p.z,.065)))return p;
    }
    return null;
  }
  sweep(from,to) {
    const delta=to.clone().sub(from), len=delta.length();if(len<1e-6)return null;
    const direction=delta.multiplyScalar(1/len);let best=null;
    for(const fish of this.game.fishSystem.creatures) {
      if(fish.dead||!fish.object.visible||fish.state?.startsWith('deck_')||fish===this.game.fishing.creature)continue;
      const center=fish.object.position;
      const radius=Math.max(fish.trainingTarget?.38:.16,Math.min(2.8,fish.sizeM*.23));
      const oc=from.clone().sub(center), b=oc.dot(direction), disc=b*b-(oc.lengthSq()-radius*radius);
      if(disc<0)continue;
      const near=-b-Math.sqrt(disc), far=-b+Math.sqrt(disc);
      if(far<0||near>len)continue;
      const distance=Math.max(0,near);
      if(!best||distance<best.distance)best={creature:fish,distance,point:from.clone().addScaledVector(direction,distance)};
    }
    return best;
  }
  hit(fish) {
    this.target=fish;this.previousHook=fish.hooked;fish.hooked=true;fish.harpoonTethered=true;
    this.state='tethered';this.time=0;this.drain=0;
    this.game.effects.splash(fish.object.position,.5);
    this.damage(fish,fish.trainingTarget?8:36+Math.min(24,this.game.player.rank*1.2));
    this.game.audio.play('hit',{volume:.55,playbackRate:.8});
  }
  damage(fish,amount) {
    if(fish.dead)return;
    fish.hp=Math.max(0,fish.hp-Math.round(amount));fish.stun=.3;
    this.game.handleWeaponHit({creature:fish,point:fish.object.position.clone(),damage:Math.round(amount),critical:false,killed:fish.hp<=0,streak:1,weapon:{id:'harpoon',tier:1,name:'Гарпун'}});
    if(fish.hp<=0){fish.dead=true;fish.caughtWithHarpoon=true;this.game.handleCombatCatch(fish);this.recall();}
  }
  recall() {
    this.release();this.state='returning';this.cooldown=1.05;
  }
  release() {
    if(this.target){this.target.hooked=!!this.previousHook;this.target.harpoonTethered=false;this.target.stun=.2;}
    this.target=null;
  }
  cancel() {this.release();this.queuedShot=false;this.state='ready';this.cooldown=.35;this.dart.visible=this.rope.visible=false;this.time=0;}
  updateRope() {
    if(!this.rope.visible)return;
    const a=this.muzzle(),b=this.position,taut=this.state==='tethered';
    for(let i=0;i<25;i++){const u=i/24,k=i*3;this.ropePositions[k]=a.x+(b.x-a.x)*u;this.ropePositions[k+1]=a.y+(b.y-a.y)*u-Math.sin(u*Math.PI)*(taut?.055:.2);this.ropePositions[k+2]=a.z+(b.z-a.z)*u;}
    this.ropeGeometry.attributes.position.needsUpdate=true;
  }
  updateHUD() {
    if(this.game.input.isTouch){
      const button=document.querySelector('.touch-button--primary');
      const label=this.state==='tethered'?'ТЯНИ':'ГАРПУН';
      if(button){button.querySelector('small').textContent=label;button.setAttribute('aria-label',label);}
    }
    this.label.textContent=this.state==='tethered'?`НА ЛИНЕ · ${Math.ceil(this.target?.hp??0)} ♥`:this.state==='flying'?'ГАРПУН · В ПОЛЁТЕ':this.cooldown>0?'ГАРПУН · ВОЗВРАТ':'ГАРПУН · ГОТОВ';
    this.hint.textContent=this.state==='tethered'?(this.game.input.isTouch?'Удерживай ТЯНИ · ОТМЕНА — отпустить':'Удерживай ЛКМ — подтягивай · ПКМ — отпустить'):this.state==='flying'?'Гарпун в воде':(this.game.input.isTouch?'ГАРПУН — выстрел · Дальность 28 м':'ЛКМ — выстрел · Дальность 28 м');
    this.track.style.transform=`scaleX(${1-clamp(this.cooldown/1.05)})`;
  }
  textState(){return {state:this.state,cooldown:+this.cooldown.toFixed(2),target:this.target?.id??null,position:this.position.toArray(),range:this.range};}
  destroy(){this.cancel();disposeTree(this.root);disposeTree(this.view);this.hud.remove();}
}
