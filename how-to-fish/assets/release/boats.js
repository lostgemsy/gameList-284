import {wrap,el,disposeTree} from '../update/helpers.js';
export function installBoats(ctx){
  const {Game,T,BoatWorld}=ctx;
  // Interaction point lies on walkable shore, not at a large hull's centre.
  Game.prototype.getBoatBoardingPoint=function(){
    const b=this.zoneSystem?.boatInstance;if(!b)return null;
    const pos=b.position;
    if(this._boardCache&&this._boardCache.boat===b&&(this.elapsed-this._boardCache.time<.5||this._boardCache.pos.distanceToSquared(pos)<.04))return this._boardCache.point;
    let best=null,bestD=Infinity;
    for(let radius=1.5;radius<=18;radius+=.5){
      for(let a=0;a<Math.PI*2;a+=Math.PI/32){
        const x=pos.x+Math.cos(a)*radius,z=pos.z+Math.sin(a)*radius,y=this.surfaceAt(x,z,.48);
        if(y==null||!this.canOccupy(x,z,y))continue;
        const p=new T.Vector3(x,y,z),d=p.distanceToSquared(pos);
        if(d<bestD){best=p;bestD=d;}
      }
      if(best&&radius>Math.sqrt(bestD)+1)break;
    }
    this._boardCache={boat:b,pos:pos.clone(),point:best,time:this.elapsed};return best;
  };
  Game.prototype.updateInteraction=function(){
    const prompt=this.ui['interaction-prompt'],label=this.ui['interaction-text'];
    if(!prompt)return;
    if(this.fishing?.state!=='idle'||this.harpoon?.state==='tethered'){
      this.interactable=null;prompt.classList.add('hidden');return;
    }
    const b=this.zoneSystem?.boatInstance;
    if(this.boatController?.isPiloting){
      const lessonStep=this.guide?.active?this.guide.step:null;
      if(lessonStep===8){
        this.interactable=null;prompt.classList.add('hidden');
        if(this.input.consume('KeyE'))this.toast('Сначала доплыви по стрелке до точки разворота.','info');
        return;
      }
      const point=this.getBoatBoardingPoint();
      if(lessonStep===9&&this.guide?.boatLessonShore115){
        const p=this.boatController.position,t=this.guide.boatLessonShore115;
        const nearReturn=Math.hypot(p.x-t.x,p.z-t.z)<=5.5;
        if(!nearReturn){
          this.interactable=null;prompt.classList.add('hidden');
          if(this.input.consume('KeyE'))this.toast('Следуй по стрелке обратно к причалу. Кнопка высадки появится у берега.','info');
          return;
        }
      }
      this.interactable=point?{id:'boat-exit',enabled:true,text:'Высадиться на берег',position:point}:null;
      prompt.classList.toggle('hidden',!point);
      if(point)label.textContent='Высадиться на берег';
      if(this.input.consume('KeyE'))point?this.leaveBoatMode():this.toast('Подойди на лодке ближе к берегу, чтобы высадиться.','info');
      return;
    }
    const point=this.getBoatBoardingPoint(),candidates=[
      {id:'sell',position:this.sellMarker?.position,radius:3.7,text:'Продать весь улов'},
      {id:'shop',position:this.shopMarker?.visible===false?null:this.shopMarker?.position,radius:4.5,text:'Лавка: снасти и лодки'},
      {id:'boat',position:point,radius:3.6,text:'Сесть в лодку'},
      {id:'travel',position:this.zoneMarker?.position,radius:4,text:'Карта морских путей'}
    ];
    const stage=this.guide?.active?this.guide.step:null;
    const allowed=stage==null||stage>=7?null:stage===5?'sell':stage===6?'shop':'none';
    this.interactable=candidates.find(c=>(allowed==null||c.id===allowed)&&c.position&&c.position.distanceTo(this.player.position)<c.radius)||null;
    prompt.classList.toggle('hidden',!this.interactable);
    prompt.querySelector('kbd').textContent=this.input.isTouch?'НАЖМИ':'E';
    if(this.interactable)label.textContent=this.interactable.text;
    if(this.interactable&&this.input.consume('KeyE'))this.performInteraction();
  };
  Game.prototype.performInteraction=function(){
    const id=this.interactable?.id;
    if(id==='sell')this.sellCatch();else if(id==='shop')this.openPanel('shop');
    else if(id==='boat')this.boardBoat();else if(id==='boat-exit')this.leaveBoatMode();
    else if(id==='travel')this.openPanel('map');
  };
  Game.prototype.returnToDock=async function(){
    if(this._returningDock||this.intro?.active)return;
    this._returningDock=true;
    try{
      this.harpoon?.cancel();this.fishing?.cancel('Возвращаемся к причалу');
      this.leaveBoatMode({silent:true,resetController:true});
      if(this.deckEncounter){this.fishSystem.remove(this.deckEncounter,0);this.deckEncounter=null;}
      this.oceanEncounter?.reset();this.showBoss(null);
      this.zoneSystem.resetBoatToDock(this.zoneSystem.currentZone);
      const p=this.sellMarker?.position;
      const shore=p?this.nearestWalkablePosition(p,25):null;
      if(shore){this.player.position.copy(shore);this.player.velocity.set(0,0,0);this.player.grounded=true;}
      this._boardCache=null;
      this.progression.heal(this.progression.state.maxHealth,'safe-dock');
      this.closePanel();this.camera.position.copy(this.player.position);this.camera.updateMatrixWorld(true);
      this.toast('Ты у причала. Улов сохранён. Возврат бесплатный.','zone');
    }finally{this._returningDock=false;}
  };
  wrap(Game.prototype,'setupUIManager',function(original){
    original();
    const p=this.ui['interaction-prompt'];p?.setAttribute('role','button');p?.setAttribute('tabindex','0');
    p?.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();if(this.mode==='playing'&&!this.panelOpen)this.performInteraction();});
    p?.addEventListener('keydown',e=>{if(e.code==='Enter'||e.code==='Space'){e.preventDefault();this.performInteraction();}});
  });
  wrap(Game.prototype,'updateBoatHUD',function(original){
    original();if(!this.boatController)return;
    const s=this.boatController.state,p=this.ui['boat-hud'];
    document.body.classList.toggle('at-helm',s.piloting);
    document.body.classList.toggle('boat-anchored',s.piloting&&s.anchored);
    if(p){p.classList.toggle('hidden',!s.piloting);p.dataset.anchored=String(s.anchored);}
    if(this.ui['boat-status'])this.ui['boat-status'].textContent=s.boundaryContact?'Край района — поверни обратно':s.exclusionContact?'Мелководье — поверни от берега':this.input.isTouch?'Стик — ход и поворот':'W/S — ход · A/D — поворот';
  });
  wrap(Game.prototype,'leaveBoatMode',function(original,...args){const r=original(...args);document.body.classList.remove('at-helm','boat-anchored');this._boardCache=null;return r;});
}
