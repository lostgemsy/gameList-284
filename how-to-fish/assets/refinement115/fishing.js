/* 1.15 — a reachable deck target and an honest, readable aiming window. */
import {wrap,clamp,disposeTree} from '../update/helpers.js';
import {ModelBuilder19} from '../shoreline19/geometry.js';
import {FieldGuide} from '../update/guide.js';
import {isSmallFish16} from '../renewal/balance.js';

export const DECK_TIMING115=Object.freeze({firstRest:2.5,restMin:1.45,restMax:1.95,smallRestMin:2.1,smallRestMax:2.7,hopMin:.72,hopMax:.98});
export function installFishing115(ctx){
  const {Game,FishSystem,T}=ctx,G=Game.prototype,F=FishSystem.prototype;
  const down=new T.Vector3(0,-1,0);
  const deckRay=new T.Raycaster(),lineRay=new T.Raycaster(),box=new T.Box3();
  const point=new T.Vector3(),normal=new T.Vector3(),rayTarget=new T.Vector3(),boards=new Set();
  // Sample the VISIBLE hull rather than the axis-aligned navigation rectangle.
  function topAt(boat,x,z){
    box.setFromObject(boat);point.set(x,box.max.y+2,z);deckRay.set(point,down);deckRay.far=box.max.y-box.min.y+4;
    for(const hit of deckRay.intersectObject(boat,true)){
      if(!hit.object.visible||!hit.face)continue;
      normal.copy(hit.face.normal).transformDirection(hit.object.matrixWorld);
      if(normal.y>.5)return hit.point.clone();
    }
    return null;
  }
  function visibleFrom(g,boat,p,lift){
    rayTarget.copy(p).y+=Math.max(.22,lift);normal.copy(rayTarget).sub(g.camera.position);
    const distance=normal.length();if(distance<.1)return false;
    lineRay.set(g.camera.position,normal.multiplyScalar(1/distance));lineRay.near=.03;lineRay.far=Math.max(.03,distance-.16);
    return !lineRay.intersectObject(boat,true).some(h=>h.object.visible);
  }
  function tune(g,fish){
    const d=fish?.deck;if(!d)return;
    d._fair115=true;d.rest115=DECK_TIMING115.firstRest;d.hopElapsed=-1;d.nextHopIn=d.rest115;
    d.restSeconds=d.restRemaining=d.rest115;
    // Longer aiming windows must not silently consume the old escape budget.
    const shots=Math.ceil(fish.hp/Math.max(18,g.combat?.weapon?.damage??18));
    d.escapeSeconds=fish.trainingTarget?120:clamp(24+shots*1.35,28,48);
    d.escapeRemaining=d.escapeSeconds;
  }
  function mount(g,fish){
    const d=fish.deck,boat=g.zoneSystem?.boatInstance;if(!boat||!g.boatController?.isPiloting)return;
    boat.updateWorldMatrix(true,true);g.boatController.prepareFishing();
    g.updateBoatPlayer(0); // The first placement uses the actual cockpit camera, not last frame's shore view.
    const pose=g.boatController.getCockpitPose(),eye=pose.playerPosition,forward=pose.forward,right=pose.right;
    let landing=null,wetLanding=null;
    // Start well in front of the feet. Test visibility as well as deck support.
    for(const along of [1.7,2.15,2.65,3.3,1.3,-1.6,-2.2]){
      for(const side of [0,-.4,.4,-.8,.8]){
        const p=eye.clone().addScaledVector(forward,along).addScaledVector(right,side),top=topAt(boat,p.x,p.z);
        if(top&&top.y<eye.y-.25&&visibleFrom(g,boat,top,d.bodyLift)){
          if(top.y>.18){landing=top;break;}
          wetLanding??=top;
        }
      }
      if(landing)break;
    }
    // Some original sailing hulls have their entire cockpit floor BELOW sea
    // level. A visible, supported catch board is required there: lowering the
    // camera alone would still leave the water plane in front of every shot.
    if(!landing&&wetLanding){
      const old=boat.userData.catchBoard115;if(old){boards.delete(old);disposeTree(old);delete boat.userData.catchBoard115;wetLanding=topAt(boat,wetLanding.x,wetLanding.z)??wetLanding;}
      const b=new ModelBuilder19(T),height=Math.max(.28,wetLanding.y+.10),leg=Math.max(.12,height-wetLanding.y),w=1.44,len=1.62;
      for(let i=0;i<5;i++)b.mesh(new T.BoxGeometry(w,.075,len/5-.012),i%2?'#ac8455':'#bc9564',[0,0,-len/2+len/10+i*len/5]);
      for(const x of [-w*.36,w*.36])for(const z of [-len*.34,len*.34])b.mesh(new T.BoxGeometry(.085,leg,.085),'#765233',[x,-leg/2,z]);
      const board=new T.Mesh(b.finish(),new T.MeshStandardMaterial({vertexColors:true,roughness:.91}));
      board.name='Dry wooden catch board 1.15';board.receiveShadow=true;board.castShadow=false;
      board.position.set(wetLanding.x,height-.0375,wetLanding.z);board.rotation.y=g.boatController.state.heading;g.scene.add(board);boat.attach(board);boat.updateWorldMatrix(true,true);
      boat.userData.catchBoard115=board;boards.add(board);landing=topAt(boat,wetLanding.x,wetLanding.z);
    }
    // No imaginary landing pad or off-hull aim target is ever accepted.
    if(!landing){const p=topAt(boat,d.landing.x,d.landing.z);if(p&&p.y>.18)landing=p;}
    if(!landing)return;
    d.landing.copy(landing);d.surfaceY=landing.y;d.hopStart.copy(landing);d.hopTarget.copy(landing);
    const local=boat.worldToLocal(landing.clone());
    d.boat115={boat,home:local.clone(),current:local.clone(),from:local.clone(),to:local.clone()};
    d.dryLanding14=false;
    // Land facing the catch, but never track or auto-aim the player's later shots.
    rayTarget.copy(landing).y+=Math.max(.15,d.bodyLift);
    normal.copy(rayTarget).sub(g.camera.position);
    g.player.yaw=Math.atan2(-normal.x,-normal.z);g.player.pitch=clamp(Math.atan2(normal.y,Math.hypot(normal.x,normal.z)),-1.555,1.35);
    g.boatCameraPitch=g.player.pitch;g.boatCameraYawOffset=g.player.yaw-g.boatController.state.heading;
    g.camera.rotation.set(g.player.pitch,g.player.yaw,0,'YXZ');g.camera.updateMatrixWorld(true);
  }
  wrap(G,'applyLookInput',function(original,look={dx:0,dy:0}){
    if(!this.boatController?.isPiloting)return original(look);
    if(!this.input.enabled||this.panelOpen||this.intro?.active||this.homecoming?.active||this.homecoming?.ending||this.harborDialog||this.adBreaks14?.busy||this.platformPaused||this.mode!=='playing'||this.debugPanelOpen)return;
    const settings=this.progression.state.settings,sensitivity=.0019*settings.mouseSensitivity;
    this.boatCameraYawOffset-=(Number(look.dx)||0)*sensitivity;
    this.boatCameraPitch=clamp(this.boatCameraPitch+(Number(look.dy)||0)*sensitivity*(settings.invertY?1:-1),-1.555,1.35);
  });
  wrap(G,'startDeckEncounter',function(original,...args){
    const ok=original(...args);if(ok&&this.deckEncounter?.deck){tune(this,this.deckEncounter);mount(this,this.deckEncounter);}return ok;
  });
  wrap(FieldGuide.prototype,'prepareDeck',function(original,fish,...args){const r=original(fish,...args);tune(this.game,fish);return r;});
  wrap(F,'updateDeckCreature',function(original,fish,dt,time){
    const d=fish.deck,g=this.game;if(!g||!d||fish.dead)return original(fish,dt,time);
    if(!d._fair115)tune(g,fish);
    const frame=d.boat115;
    if(frame){
      frame.boat.updateWorldMatrix(true,false);
      d.landing.copy(frame.home);frame.boat.localToWorld(d.landing);d.surfaceY=d.landing.y;
    }
    dt=clamp(Number(dt)||0,0,.1);
    if(fish.state==='deck_airborne'){
      // Own the arrival arc as well: the retired 1.8 update used the top of a
      // mast (including hidden sails) as the landing height on every frame.
      d.elapsed+=dt;const u=clamp(d.elapsed/d.airborneDuration),p=fish.object.position;
      p.lerpVectors(d.start,d.landing,u);
      p.y=Math.max(.08,d.start.y)*(1-u)+(d.surfaceY+d.bodyLift)*u+Math.sin(u*Math.PI)*Math.min(2.6,1.6+fish.sizeM*.22);
      fish.object.rotation.x+=dt*2.5;fish.object.rotation.z+=dt*2;
      if(u>=1){
        fish.state='deck_resting';d.elapsed=0;p.copy(d.landing);p.y+=d.bodyLift;
        fish.object.rotation.set(0,fish.object.rotation.y,Math.PI*.49);d.impact=1;
        d.rest115=DECK_TIMING115.firstRest;d.nextHopIn=d.restRemaining=d.rest115;d.hopElapsed=-1;
        this.effects?.splash?.(d.start.clone().setY(.05),Math.min(1.8,.7+fish.sizeM*.18));
      }return;
    }
    if(fish.state==='deck_escaping')return original(fish,dt,time);
    const small=isSmallFish16(fish),reduced=!!g.progression.state.settings.reducedMotion;
    d.escapeRemaining=Math.max(0,d.escapeRemaining-dt);d.attackIn-=dt;
    if(d.attackIn<=0){d.attackIn=2.8;this.onAttack?.(fish,8);}
    if(d.escapeRemaining<=0){this.escapeDeckCreature(fish);return;}
    d.impact=Math.max(0,d.impact-dt*4);
    const p=fish.object.position;
    if(d.hopElapsed<0){
      d.rest115=Math.max(0,d.rest115-dt);d.nextHopIn=d.rest115;d.restRemaining=d.rest115;
      fish.state='deck_resting';
      if(d.rest115<=0&&fish.stun<=0){
        d.hopElapsed=0;d.hopDuration=DECK_TIMING115.hopMin+this.rng()*(DECK_TIMING115.hopMax-DECK_TIMING115.hopMin);
        d.hopHeight=small?.14+this.rng()*.12:.32+this.rng()*.28;
        if(frame){
          frame.from.copy(frame.current);frame.to.copy(frame.current);
          for(let attempt=0;attempt<10;attempt++){
            const a=this.rng()*Math.PI*2,r=.22+this.rng()*.35;
            point.copy(frame.home);point.x+=Math.cos(a)*r;point.z+=Math.sin(a)*r;frame.boat.localToWorld(point);
            if(Math.hypot(point.x-g.camera.position.x,point.z-g.camera.position.z)<1.1)continue;
            const top=topAt(frame.boat,point.x,point.z);
            if(!top||top.y<.18||Math.abs(top.y-d.surfaceY)>.32||!visibleFrom(g,frame.boat,top,d.bodyLift))continue;
            frame.to.copy(frame.boat.worldToLocal(top));break;
          }
        }else{
          d.hopStart.copy(p);d.hopTarget.copy(p);d.hopStart.y-=d.bodyLift;d.hopTarget.y-=d.bodyLift;
          for(let attempt=0;attempt<14;attempt++){
            const a=this.rng()*Math.PI*2,r=small?.22+this.rng()*.28:.4+this.rng()*.55;
            const x=clamp(p.x+Math.cos(a)*r,d.bounds.minX+.3,d.bounds.maxX-.3),z=clamp(p.z+Math.sin(a)*r,d.bounds.minZ+.3,d.bounds.maxZ-.3);
            if(Math.hypot(x-g.player.position.x,z-g.player.position.z)<1.15)continue;
            let valid=true,y=null;
            for(let i=1;i<=5;i++){const t=i/5,xx=p.x+(x-p.x)*t,zz=p.z+(z-p.z)*t;y=g.surfaceAt(xx,zz,.3);if(y==null||g.isSolidAt(xx,zz,.3)){valid=false;break;}}
            if(valid){d.hopTarget.set(x,y-g.playerEyeHeight,z);break;}
          }
        }
      }
    }
    if(d.hopElapsed>=0){
      fish.state='deck_flopping';d.hopElapsed+=dt;
      const u=clamp(d.hopElapsed/d.hopDuration),ease=u*u*(3-2*u);
      if(frame){frame.current.lerpVectors(frame.from,frame.to,ease);p.copy(frame.current);frame.boat.localToWorld(p);}
      else p.lerpVectors(d.hopStart,d.hopTarget,ease);
      p.y+=d.bodyLift+Math.sin(u*Math.PI)*d.hopHeight;
      const cosmetic=reduced?.25:1;fish.object.rotation.x=Math.sin(u*Math.PI*2)*.18*cosmetic;
      fish.object.rotation.z=Math.PI*.49+Math.sin(u*Math.PI*2)*.24*cosmetic;
      if(fish.swimAction)fish.swimAction.timeScale=1.05;
      if(u>=1){
        d.hopElapsed=-1;d.impact=1;fish.object.rotation.x=0;
        d.rest115=small?DECK_TIMING115.smallRestMin+this.rng()*(DECK_TIMING115.smallRestMax-DECK_TIMING115.smallRestMin):DECK_TIMING115.restMin+this.rng()*(DECK_TIMING115.restMax-DECK_TIMING115.restMin);
        d.nextHopIn=d.restRemaining=d.rest115;fish.state='deck_resting';
      }
    }else{
      if(frame){p.copy(frame.current);frame.boat.localToWorld(p);p.y+=d.bodyLift;}
      else {const ground=g.surfaceAt(p.x,p.z,.23);p.y=(ground==null?d.surfaceY:ground-g.playerEyeHeight)+d.bodyLift;}
      fish.object.rotation.x=0;fish.object.rotation.z=Math.PI*.49+(reduced?0:Math.sin(time*3+fish.phase)*.018);
      if(fish.swimAction)fish.swimAction.timeScale=.16;
    }
    const parts=fish.object.userData.articulation;
    if(parts){const strength=reduced?0:d.hopElapsed<0?.07:.35,phase=time*(d.hopElapsed<0?2.5:5)+fish.phase;
      if(parts.tail)parts.tail.rotation.y=Math.sin(phase)*.52*strength;
      parts.fins?.forEach((fin,i)=>{fin.rotation.z=Math.sin(phase*.63+i*Math.PI)*.28*strength;});
    }
  });
  // Small local forgiveness for a deck fish only. World occlusion is still
  // resolved by Combat.fire; this never hits fish through the boat or terrain.
  wrap(F,'raycast',function(original,camera,range=150,aim={x:0,y:0}){
    const exact=original(camera,range,aim);if(exact)return exact;
    const fish=this.game?.deckEncounter;
    if(!fish?.deck||fish.dead||!fish.state?.startsWith('deck_')||fish.state==='deck_airborne'||!fish.object.visible||!fish.object.parent)return null;
    fish.object.updateWorldMatrix(true,true);box.setFromObject(fish.object);
    const padding=this.game.input.isTouch?.13:.085;box.expandByScalar(padding);
    this.raycaster.setFromCamera(aim,camera);const hit=this.raycaster.ray.intersectBox(box,new T.Vector3());
    if(!hit)return null;const distance=hit.distanceTo(camera.position);if(distance>range)return null;
    return {creature:fish,object:fish.object,point:hit,distance,deckAssist115:true};
  });
  wrap(ctx.BoatWorld.prototype,'setBoat',async function(original,id,...args){
    if(this.boatId!==id){const old=this.boatInstance?.userData.catchBoard115;if(old){boards.delete(old);disposeTree(old);delete this.boatInstance.userData.catchBoard115;}}
    return original(id,...args);
  });
  wrap(G,'destroy',function(original,...args){for(const board of boards)disposeTree(board);boards.clear();return original(...args);});
  wrap(G,'updateUI',function(original,...args){
    const r=original(...args),d=this.deckEncounter?.deck;
    if(d&&this.elapsed>=(this._deckCopyNext115??0)){
      this._deckCopyNext115=this.elapsed+.12;
      const root=document.getElementById('deck-encounter'),text=root?.querySelector(':scope > span');
      if(text)text.textContent=this.deckEncounter.state==='deck_airborne'?'Улов летит к тебе — приготовь прицел':d.hopElapsed<0?`Прицелься и стреляй · пауза ${Math.max(0,d.rest115??0).toFixed(1)} с`:'Рыба прыгает — после приземления будет пауза';
      root?.classList.toggle('deck-resting115',d.hopElapsed<0&&this.deckEncounter.state!=='deck_airborne');
    }
    return r;
  });
}
