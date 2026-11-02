import {wrap,facePoint,putOnGround,el} from '../update/helpers.js';
import {FieldGuide} from '../update/guide.js';
import {HarpoonController} from '../update/harpoon.js';

// Triangle ribbons, not WebGL's implementation-dependent 1-pixel GL_LINE.
// Constant screen thickness keeps both the nylon line and tether visible on phones.
class VisibleLine {
  constructor(game,T,pixels,color){
    this.game=game;this.T=T;this.pixels=pixels;this.geometry=new T.BufferGeometry();
    this.positions=new Float32Array(64*6*3);
    this.geometry.setAttribute('position',new T.Float32BufferAttribute(this.positions,3));
    this.positions=this.geometry.attributes.position.array;
    this.mesh=new T.Mesh(this.geometry,new T.MeshBasicMaterial({color,side:T.DoubleSide,depthTest:false,depthWrite:false,transparent:true,opacity:.94}));
    this.mesh.name='Visible fishing tether ribbon';this.mesh.frustumCulled=false;this.mesh.renderOrder=950;this.mesh.userData.ignoreShots=true;this.mesh.visible=false;game.scene.add(this.mesh);
    this.a=new T.Vector3();this.b=new T.Vector3();this.side=new T.Vector3();this.view=new T.Vector3();
  }
  update(array,visible){
    this.mesh.visible=!!visible;if(!visible)return;
    const camera=this.game.camera,count=array.length/3,segments=count-1;
    if(this.positions.length<segments*18){this.geometry.setAttribute('position',new this.T.Float32BufferAttribute(new Float32Array(segments*18),3));this.positions=this.geometry.attributes.position.array;}
    const factor=2*Math.tan(camera.fov*Math.PI/360)/Math.max(240,innerHeight)*this.pixels;
    let k=0;
    for(let i=0;i<segments;i++){
      this.a.fromArray(array,i*3);this.b.fromArray(array,(i+1)*3);
      this.view.copy(camera.position).sub(this.a);this.side.copy(this.b).sub(this.a).cross(this.view).normalize();
      const wa=Math.max(.003,this.a.distanceTo(camera.position)*factor*.5),wb=Math.max(.003,this.b.distanceTo(camera.position)*factor*.5);
      const points=[[this.a,-wa],[this.a,wa],[this.b,wb],[this.a,-wa],[this.b,wb],[this.b,-wb]];
      for(const [p,w] of points){this.positions[k++]=p.x+this.side.x*w;this.positions[k++]=p.y+this.side.y*w;this.positions[k++]=p.z+this.side.z*w;}
    }
    this.geometry.setDrawRange(0,segments*6);this.geometry.attributes.position.needsUpdate=true;
  }
  destroy(){this.mesh.removeFromParent();this.geometry.dispose();this.mesh.material.dispose();}
}

export function installFishing14(ctx){
  const {Game,FishSystem,T}=ctx;
  Game.prototype.findTutorialWater=function(distance=7){
    const search=()=>{
      const start=this.player.position;
      for(let d=5;d<=12;d+=1)for(let j=0;j<48;j++){
        const offset=(j%2?1:-1)*Math.ceil(j/2)*Math.PI/24,a=this.player.yaw+offset;
        const point=new T.Vector3(start.x-Math.sin(a)*d,-.15,start.z-Math.cos(a)*d);
        if(!this.isWaterPoint(point,.85))continue;
        if(this.harpoon?.firstObstruction(start,point))continue;
        const boat=this.zoneSystem?.boatInstance?.position;
        if(boat&&Math.hypot(point.x-boat.x,point.z-boat.z)<3)continue;
        return point;
      }
      return null;
    };
    let p=search();if(p)return p;
    // Recover the learner to a known, visible boardwalk instead of selecting a distant school.
    this.leaveBoatMode?.({silent:true,resetController:true});
    putOnGround(this,1,-17);this.player.yaw=0;return search()??new T.Vector3(6,-.15,-17);
  };
  // All forced landings use a valid piece of beach/deck close to the player.
  wrap(Game.prototype,'startDeckEncounter',function(original,result){
    if(result?.forceDeck)this.deckEncounterStreak=0;
    const ok=original(result);if(!ok)return ok;
    const fish=this.deckEncounter,d=fish?.deck;if(!d)return ok;
    if(!this.boatController?.isPiloting){
      const water=result.waterPoint??fish.object.position,inward=this.player.position.clone().sub(water).setY(0).normalize();
      let landing=null;
      for(const distance of [3.5,2.8,4.3,2.1,5]){
        for(const angle of [0,.45,-.45,1,-1,Math.PI]){
          const candidate=this.player.position.clone().addScaledVector(inward.clone().applyAxisAngle(new T.Vector3(0,1,0),angle),distance);
          const y=this.surfaceAt(candidate.x,candidate.z,.55);
          if(y!==null&&!this.isSolidAt(candidate.x,candidate.z,.65)){candidate.y=y-this.playerEyeHeight;landing=candidate;break;}
        }if(landing)break;
      }
      if(!landing){landing=this.findDryPosition?.(this.player.position,8,.55);if(landing)landing.y-=this.playerEyeHeight;}
      if(landing){
        d.landing.copy(landing);d.surfaceY=landing.y;d.hopStart.copy(landing);d.hopTarget.copy(landing);
        d.bounds={minX:landing.x-1.8,maxX:landing.x+1.8,minZ:landing.z-1.8,maxZ:landing.z+1.8,y:landing.y+this.playerEyeHeight};
        d.dryLanding14=true;
      }
    }
    if(fish.trainingTarget){d.escapeSeconds=150;d.escapeRemaining=150;d.restSeconds=140;d.restRemaining=140;}
    this.camera.position.copy(this.player.position);facePoint(this,d.landing.clone().setY(d.surfaceY+d.bodyLift));
    if(this.boatController?.isPiloting){this.boatCameraPitch=this.player.pitch;this.boatCameraYawOffset=this.player.yaw-this.boatController.state.heading;}
    this.input.reset();return ok;
  });
  // The hop animation may not cross an irregular shore onto invisible land.
  wrap(FishSystem.prototype,'updateDeckCreature',function(original,fish,dt,...args){
    const result=original(fish,dt,...args),g=this.game,d=fish.deck;
    if(g&&d?.dryLanding14&&!['deck_airborne','deck_escaping'].includes(fish.state)){
      const p=fish.object.position,y=g.surfaceAt(p.x,p.z,.25);
      if(y===null){p.copy(d.landing).setY(d.surfaceY+d.bodyLift);d.hopStart.copy(d.landing);d.hopTarget.copy(d.landing);d.hopElapsed=-1;}
      else if(fish.state==='deck_resting')p.y=y-g.playerEyeHeight+d.bodyLift;
    }
    return result;
  });
  // Harpoon drains resistance but NEVER adds a dead fish straight to the inventory.
  HarpoonController.prototype.damage=function(fish,amount){
    if(fish.dead||fish.deck)return;
    this.haulProgress=(this.haulProgress??0)+Math.max(0,amount);
    fish.hp=Math.max(1,fish.hp-Math.round(amount));fish.stun=.3;
    const required=fish.trainingTarget?34:Math.max(45,Math.min(200,fish.maxHp??60));
    if(this.haulProgress<required)return;
    const g=this.game;
    if(g.progression.getInventoryCapacity().remainingSlots<1){g.toast('Садок полон. Продай улов и возвращайся.','info');this.cancel();return;}
    const species=fish.species.deckEncounter?fish.species:{...fish.species,deckEncounter:{chance:1,finishHp:Math.max(20,Math.min(140,(fish.maxHp??40)*.55)),escapeSeconds:14,hopInterval:1.2}};
    fish.species=species;fish.caughtWithHarpoon=true;fish.hooked=false;
    const result={creature:fish,species,speciesId:species.id,sizeM:fish.sizeM,forceDeck:true,waterPoint:fish.object.position.clone(),perfectReel:false};
    // Release the tether before the pistol is equipped. No stale target gets cancelled on the next frame.
    this.previousHook=false;this.cancel();
    if(g.startDeckEncounter(result)){
      fish.hooked=false;
      if(g.guide?.active&&g.guide.step===4){g.guide.prepareDeck(fish);g.guide.hint.textContent='Рыба вылетела на сушу! Прицелься и выстрели из пистолета.';}
      g.toast(g.boatController?.isPiloting?'Улов на борту — стреляй из пистолета!':'Улов на берегу — стреляй из пистолета!','catch');
    }else{fish.caughtWithHarpoon=false;fish.hp=fish.maxHp;g.toast('Нет места для улова. Подойди к свободному берегу.','info');}
  };
  wrap(HarpoonController.prototype,'hit',function(original,fish){this.haulProgress=0;return original(fish);});
  wrap(HarpoonController.prototype,'updateHUD',function(original,...args){
    const r=original(...args);if(this.state==='tethered'){
      const fish=this.target,need=fish?.trainingTarget?34:Math.max(45,Math.min(200,fish?.maxHp??60));
      this.label.textContent=`ПОДТЯНУТО · ${Math.min(99,Math.floor((this.haulProgress??0)/need*100))}%`;
      this.hint.textContent=this.game.input.isTouch?'Удерживай ТЯНИ → затем стреляй по улову':'Удерживай ЛКМ → затем стреляй по улову';
    }return r;
  });
  wrap(Game.prototype,'init',async function(original,...args){
    const r=await original(...args);this.rodRibbon14=new VisibleLine(this,T,2.3,'#f7ffe8');this.harpoonRibbon14=new VisibleLine(this,T,3.2,'#ffd37c');
    const guide=this.guide;if(guide){
      for(const child of guide.ring.children){child.material.depthTest=false;child.material.depthWrite=false;child.renderOrder=960;child.material.opacity=1;}
      guide.ring.children[0].geometry.dispose();guide.ring.children[0].geometry=new T.TorusGeometry(1.25,.07,8,48);
      const halo=new T.Mesh(new T.TorusGeometry(1.7,.04,6,48),new T.MeshBasicMaterial({color:'#ffdc72',depthTest:false,depthWrite:false}));halo.rotation.x=Math.PI/2;halo.renderOrder=960;guide.ring.add(halo);
      const controls=el('div','guide-assistance',null,guide.card);
      const focus=el('button','','Показать цель',controls);focus.type='button';focus.onclick=()=>guide.recoverTarget14();
      const next=el('button','','Пропустить шаг',controls);next.type='button';next.onclick=()=>{
        this.fishing.cancel();this.harpoon.cancel();if(this.deckEncounter){this.fishSystem.remove(this.deckEncounter,0);this.deckEncounter=null;}
        guide.enter(({0:1,1:2,2:4,4:5,5:7,6:7,7:8,8:9,9:10})[guide.step]??10);
      };
    }return r;
  });
  wrap(Game.prototype,'render',function(original,...args){
    if(this.fishing?.linePositions)this.rodRibbon14?.update(this.fishing.linePositions,this.fishing.line?.visible&&this.fishing.state!=='idle');
    if(this.harpoon?.ropePositions)this.harpoonRibbon14?.update(this.harpoon.ropePositions,this.harpoon.rope.visible);
    return original(...args);
  });
  wrap(Game.prototype,'destroy',function(original,...args){this.rodRibbon14?.destroy();this.harpoonRibbon14?.destroy();return original(...args);});
  FieldGuide.prototype.recoverTarget14=function(){
    const g=this.game;
    if(g.panelOpen)g.closePanel();
    if(g.boatController?.isPiloting){
      if(this.target){facePoint(g,this.target);g.boatCameraPitch=g.player.pitch;g.boatCameraYawOffset=g.player.yaw-g.boatController.state.heading;}
      g.input.reset();g.canvas.focus({preventScroll:true});this.age=0;return;
    }
    if(this.target&&this.target.distanceTo(g.player.position)<15){
      facePoint(g,this.target);this.setPrompt(this.fish?.deck?'ПРИЦЕЛЬСЯ · ЛКМ':this.step===1?'ЗАБРОСЬ СЮДА':'ВОТ ТВОЯ ЦЕЛЬ');
    }else if([1,2,4].includes(this.step)){
      const step=this.step;g.fishing.cancel();g.harpoon.cancel();if(g.deckEncounter){g.fishSystem.remove(g.deckEncounter,0);g.deckEncounter=null;}
      putOnGround(g,1,-17);this.enter(step);
    }else if(this.target){const safe=g.findDryPosition(this.target,10,.5);if(safe){g.player.position.copy(safe);g.camera.position.copy(safe);}facePoint(g,this.target);}
    g.input.reset();g.canvas.focus({preventScroll:true});this.age=0;
  };
  wrap(FieldGuide.prototype,'update',function(original,dt){
    const r=original(dt);if(!this.active)return r;
    this.card.classList.toggle('needs-help',this.age>22);
    if(this.step===4){
      if(this.fish?.deck){this.target=this.fish.object.position;this.hint.textContent='Рыба на берегу или палубе. Наведи прицел и выстрели из пистолета.';}
      else if(!this.fish||this.fish.dead||!this.fish.object.parent){this.game.harpoon.cancel();this.enter(4);}
      else if(this.game.harpoon.state==='tethered')this.hint.textContent='Удерживай действие: рыба вылетит к тебе. Потом стреляй из пистолета.';
    }
    return r;
  });
}
