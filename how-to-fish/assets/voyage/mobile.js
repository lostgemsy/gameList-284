import {wrap} from '../update/helpers.js';
import {HarpoonController} from '../update/harpoon.js';
import {loc} from '../renewal/state.js';

/** Intersection of a finite ray segment with a forgiving, distance-capped
 * target volume. Occlusion remains the combat system's responsibility. */
export function sphereHit(T,origin,direction,length,center,radius){
  const d=center.clone().sub(origin),along=d.dot(direction),d2=d.lengthSq()-along*along;
  if(d2>radius*radius||along+radius<0)return null;
  const distance=Math.max(0,along-Math.sqrt(Math.max(0,radius*radius-d2)));
  return distance<=length?{distance,point:origin.clone().addScaledVector(direction,distance)}:null;
}
export function installMobile17(ctx){
  const {Game,FishSystem,Combat,T}=ctx;
  wrap(FishSystem.prototype,'raycast',function(original,camera,range,aim={x:0,y:0}){
    let best=original(camera,range,aim);if(!this.game?.input.isTouch)return best;
    this.raycaster.setFromCamera(aim,camera);const ray=this.raycaster.ray;
    for(const f of this.creatures){
      if(!this.isShootable(f)||!f.object.visible||f.hooked&&!f.deck)continue;
      const center=f.object.position,dist=center.distanceTo(ray.origin);
      const radius=Math.min(2.4,Math.max(.42,Math.min(1.3,f.sizeM*.22)) + dist*.025);
      const hit=sphereHit(T,ray.origin,ray.direction,range,center,radius);
      if(!hit||best&&hit.distance>=best.distance)continue;
      // The wider silhouette must never reach around a pier, rock or wall.
      const targetAim=center.clone().project(camera);
      const block=this.game.raycastEnvironment(camera,dist,{x:targetAim.x,y:targetAim.y});
      if(block&&block.surface!=='water'&&block.distance<dist-Math.min(.45,f.sizeM*.16))continue;
      best={...hit,creature:f,object:f.object,assisted:true};
    }
    return best;
  });
  wrap(ctx.Wildlife.prototype,'raycast',function(original,camera,range=120,aim={x:0,y:0}){
    let best=original(camera,range,aim);if(!this.game?.input.isTouch)return best;
    this.raycaster.setFromCamera(aim,camera);const ray=this.raycaster.ray;
    for(const bird of this.birds){
      if(!bird.object.visible||['down','respawning'].includes(bird.state))continue;
      const center=bird.object.position,dist=center.distanceTo(ray.origin);
      const hit=sphereHit(T,ray.origin,ray.direction,range,center,Math.min(1.5,.4+dist*.018));
      if(!hit||best&&hit.distance>=best.distance)continue;
      const a=center.clone().project(camera),wall=this.game.raycastEnvironment(camera,dist,{x:a.x,y:a.y});
      if(wall&&wall.surface!=='water'&&wall.distance<dist-.25)continue;
      best={...hit,bird,object:bird.object,assisted:true};
    }
    return best;
  });
  wrap(HarpoonController.prototype,'sweep',function(original,from,to){
    if(!this.game.input.isTouch)return original(from,to);
    const d=to.clone().sub(from),length=d.length();if(length<1e-6)return null;
    d.multiplyScalar(1/length);let best=null;
    for(const f of this.game.fishSystem.creatures){
      if(f.dead||!f.object.visible||f.state?.startsWith('deck_')||f===this.game.fishing.creature)continue;
      const distance=this.game.camera.position.distanceTo(f.object.position);
      const radius=Math.min(2.65,Math.max(.43,Math.min(2.15,f.sizeM*.23))+distance*.018);
      const hit=sphereHit(T,from,d,length,f.object.position,radius);
      if(!hit||best&&hit.distance>=best.distance)continue;
      if(length>2&&this.firstObstruction(from,f.object.position))continue;
      best={...hit,creature:f};
    }
    return best;
  });
  // A fast tap is still one shot even when pointerup arrives before the next
  // simulation tick (automatic weapons originally inspected only held state).
  wrap(Combat.prototype,'update',function(original,dt,input,active){
    if(!this.fishSystem?.game?.input.isTouch)return original(dt,input,active);
    if(active&&input.mouse.leftPressed)this._tapBuffer17=.14;
    this._tapBuffer17=Math.max(0,(this._tapBuffer17??0)-dt);
    const held=input.mouse.left,pressed=input.mouse.leftPressed;
    if(active&&this._tapBuffer17>0&&this.cooldown<=dt&&this.reloadTimer<=0){input.mouse.left=input.mouse.leftPressed=true;this._tapBuffer17=0;}
    try{return original(dt,input,active);}finally{input.mouse.left=held;input.mouse.leftPressed=pressed;}
  });
  Game.prototype.paintAction17=function(){
    const b=document.querySelector('.touch-button--primary');if(!b)return;
    const tool=this.player.tool,icon=b.querySelector('.touch-action-icon');
    const id=tool==='weapon'?'weapon':tool==='utility'?'harpoon':'rod';
    if(icon.dataset.tool17!==id){ctx.paintIcon(icon,id);icon.dataset.tool17=id;}
    const state=this.fishing?.state;
    const label=tool==='weapon'?loc('ОГОНЬ','FIRE'):tool==='utility'?(this.harpoon?.state==='tethered'?loc('ТЯНИ','HAUL'):loc('ГАРПУН','HARPOON')):
      state==='bite'?loc('ПОДСЕЧЬ','HOOK'):state==='hooked'?loc('ТЯНИ','REEL'):loc('ЗАБРОС','CAST');
    const small=b.querySelector('small');if(small.textContent!==label)small.textContent=label;b.setAttribute('aria-label',label);
  };
  wrap(Game.prototype,'selectTool',function(original,tool){
    if(!['rod','weapon','utility'].includes(tool))return;
    if(this.fishing?.state==='landing'){
      this._nextTool17=tool;
      document.querySelectorAll('.tool-slot').forEach(n=>n.classList.toggle('pending17',n.dataset.slot===tool));return;
    }
    if(this.player.tool!==tool){
      this.input.mouse.left=this.input.mouse.leftPressed=this.input.mouse.rightPressed=false;
      if(this.combat)this.combat._tapBuffer17=0;
    }
    const r=original(tool);this._nextTool17=null;
    document.querySelectorAll('.tool-slot').forEach(n=>n.classList.remove('pending17'));this.paintAction17();return r;
  });
  wrap(Game.prototype,'init',async function(original,...args){
    const r=await original(...args);this.paintAction17();
    for(const b of document.querySelectorAll('.tool-slot[data-slot]')){
      b.style.touchAction='manipulation';b.removeAttribute('disabled');b.classList.remove('locked');
      b.setAttribute('aria-label',b.dataset.slot==='rod'?loc('Удочка','Fishing rod'):b.dataset.slot==='weapon'?loc('Оружие','Weapon'):loc('Гарпун','Harpoon'));
      b.addEventListener('pointerdown',e=>{
        if(e.pointerType!=='touch'&&e.pointerType!=='pen')return;
        if(this.mode!=='playing'||this.panelOpen||this.intro?.active)return;
        e.preventDefault();e.stopImmediatePropagation();
        this.selectTool(b.dataset.slot);b.dataset.touchHandled17=String(performance.now());
        try{b.setPointerCapture(e.pointerId);}catch{}
      },{capture:true,passive:false});
      b.addEventListener('click',e=>{
        if(performance.now()-Number(b.dataset.touchHandled17||-1e6)<700){e.preventDefault();e.stopImmediatePropagation();}
      },true);
    }
    return r;
  });
  wrap(Game.prototype,'update',function(original,...args){
    const r=original(...args);
    if(this._nextTool17&&this.fishing?.state!=='landing')this.selectTool(this._nextTool17);
    return r;
  });
  wrap(Game.prototype,'updateUI',function(original,...args){const r=original(...args);this.paintAction17();return r;});
}
