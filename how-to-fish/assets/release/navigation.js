import {wrap,el} from '../update/helpers.js';
export function installNavigation(ctx){
 const {Game}=ctx;
 wrap(Game.prototype,'setupGameplaySystems',function(original){
   original();this.seaNav=el('div','sea-navigation',null,document.querySelector('#hud'));
   this.seaNavTitle=el('strong','','',this.seaNav);this.seaNavHint=el('span','','',this.seaNav);this.seaNav.hidden=true;
 });
 Game.prototype.updateSeaNavigation=function(){
   if(!this.seaNav)return;
   this.seaNav.hidden=!this.boatController?.isPiloting||this.guide?.active||this.panelOpen||this.fishing.state!=='idle'||this.oceanEncounter?.fish!=null;
   if(this.seaNav.hidden)return;
   const origin=this.player.position,sonar=this.progression.getUpgradeValue('sonar_array',0);
   const rare=sonar>0?this.fishSystem.creatures.filter(f=>!f.dead&&f.object.visible&&['rare','epic','legendary','mythic'].includes(f.species.rarity)&&f.object.position.distanceTo(origin)<=sonar).sort((a,b)=>a.object.position.distanceToSquared(origin)-b.object.position.distanceToSquared(origin))[0]:null;
   const school=[...this.fishSystem.schools].sort((a,b)=>a.center.distanceToSquared(origin)-b.center.distanceToSquared(origin))[0];
   const target=rare?.object.position??school?.center;if(!target){this.seaNavTitle.textContent='Ищи круги на воде';this.seaNavHint.textContent='Видимый косяк — место для заброса';return;}
   const distance=Math.hypot(target.x-origin.x,target.z-origin.z);
   const bearing=Math.atan2(-(target.x-origin.x),-(target.z-origin.z));
   const relative=Math.atan2(Math.sin(bearing-this.boatController.state.heading),Math.cos(bearing-this.boatController.state.heading));
   const direction=Math.abs(relative)<.32?'↑ Прямо':Math.abs(relative)>2.5?'↓ Позади':relative>0?'← Слева':'→ Справа';
   this.seaNavTitle.textContent=`${direction} · ${rare?ctx.nameOf(rare.species):'Косяк рыбы'} · ${Math.round(distance)} м`;
   this.seaNavHint.textContent=rare?`Сонар: реальная цель в радиусе ${sonar} м`:distance<18?'Забрось с борта в круги на воде — лодка остановится сама':sonar>0?`Сонар ${sonar} м: редких целей пока нет`:'Следуй к косяку. Сонар в лавке находит редкую рыбу.';
 };
 wrap(Game.prototype,'updateUI',function(original,...args){const r=original(...args);this.updateSeaNavigation();return r;});
}
