import {wrap,el} from '../update/helpers.js';
import {CARGO_SLOTS,PROTECTION} from './progression.js';
const nf=new Intl.NumberFormat('ru-RU');
const boatRole={patched_raft:'Для знакомства с рыбалкой у пирса.',coastal_skiff:'Лёгкий скиф: короткие вылазки и первые острова.',rescue_launch:'Универсальный катер: вместительный трюм и защита в морской охоте.',wind_cutter:'Быстрые экспедиции: большой трюм и уверенный выход в Бездну.',storm_longship:'Тяжёлый драккар: максимальная защита и груз для Короны Штормов.'};
export function installHUD(ctx){
 const {Game,UI,data}=ctx;
 wrap(Game.prototype,'setupUIManager',function(original){
   original();this.uiManager.game=this;
   this.actionHint=el('div','context-action','',document.querySelector('#hud'));
   this.cargoDetail=el('span','cargo-detail','',document.querySelector('.capacity'));
 });
 wrap(UI.prototype,'updateHUD',function(original,...args){
   const r=original(...args),g=this.game;
   if(this.dom.ammoReserve)this.dom.ammoReserve.textContent='∞';
   if(g?.combat&&this.dom.ammoValue)this.dom.ammoValue.textContent=g.combat.reloadTimer>0?'↻':String(g.combat.ammo);
   if(g?.cargoDetail){const c=this.progression.getInventoryCapacity();g.cargoDetail.textContent=`${Math.round(c.usedWeightKg)} / ${c.maxWeightKg} кг`;}
   return r;
 });
 wrap(Game.prototype,'updateUI',function(original,...args){
   const r=original(...args);if(!this.actionHint)return r;
   const touch=this.input.isTouch,tool=this.player.tool,boat=this.boatController?.isPiloting;
   document.body.dataset.activeTool=tool;
   document.body.classList.toggle('fighting-fish',this.fishing?.state!=='idle');
   document.body.classList.toggle('deck-active',!!this.deckEncounter);
   document.body.classList.toggle('ocean-active',!!this.oceanEncounter?.fish);
   this.actionHint.hidden=this.panelOpen||this.guide?.active||this.fishing.state!=='idle'||this.deckEncounter!=null||this.oceanEncounter?.fish!=null||tool==='utility';
   this.actionHint.textContent=tool==='weapon'?(this.combat.reloadTimer>0?'Перезарядка…':touch?'ОГОНЬ — надводная цель · R — перезарядка':'ЛКМ — выстрел по надводной цели · R — перезарядка'):
    boat?(touch?'ДЕЙСТВИЕ — ловить с борта · СТИК — плыть':'ЛКМ — ловить с борта · WASD — плыть'):
    touch?'ЗАБРОС — в косяк · при рывке отпускай':'ЛКМ — заброс в косяк · удерживай при ловле, отпускай при рывке';
   return r;
 });
 wrap(UI.prototype,'_shopTierLabel',function(original,type,item){
   return type==='inventory'?`САДОК · УРОВЕНЬ ${item.tier}`:type==='weapon'?`ОРУЖИЕ · УРОВЕНЬ ${item.tier}`:original(type,item);
 });
 wrap(UI.prototype,'_shopStats',function(original,type,item){
   if(type==='boat')return [['Скорость',`${item.speed} м/с`],['Защита от удара',`${Math.round((PROTECTION[item.id]||0)*100)}%`],['Трюм к садку',`+${item.cargoWeightBonusKg} кг / +${CARGO_SLOTS[item.id]||0} мест`],['Маршрутов',item.accessibleZones.length]];
   if(type==='rod')return [['Мощность',item.power],['Леска',item.lineStrength],['Заброс',`${item.castRangeM} м`]];
   if(type==='inventory')return [['Мест в садке',item.slots],['Вес в садке',`${item.maxWeightKg} кг`],['Трюм лодки','добавляется сверху']];
   if(type==='weapon')return [...original(type,item),['Перезарядка',`${item.reloadSeconds} с`],['Общий запас','бесконечный']];
   return original(type,item);
 });
 wrap(UI.prototype,'_renderShopCard',function(original,type,item){
   const card=original(type,item),owned=this._isOwned(type,item.id);
   card.dataset.itemId=item.id;
   if(type==='inventory'){const action=card.querySelector('[data-action="equip"]');if(action)action.textContent='ВЫБРАТЬ САДОК';}
   if(type==='boat'){
     card.querySelector('p').textContent=boatRole[item.id]||'';
     const icon=card.querySelector('.shop-card__icon');if(icon){icon.replaceChildren();icon.classList.add('boat-preview');const img=el('img','','',icon);img.src=`./ui/boats/${item.id}.webp`;img.alt=ctx.nameOf(item);img.loading='lazy';img.onerror=()=>{img.remove();icon.textContent='⚓';};}
   }
   if(type==='upgrade'&&item.id==='sonar_array'){
     card.querySelector('p').textContent='Находит уже плавающую редкую рыбу. На лодке показывает направление и расстояние. Не создаёт рыбу из ничего.';
   }
   if(!owned){
     const level=this.progression.state.upgrades[item.id]||0;
     const price=type==='upgrade'?item.levels[level]?.cost:item.price;
     if(price!=null)el('div','honest-price',`Цена: ● ${nf.format(price)}`,card);
     const pinned=this.progression.expedition?.pinnedGoal;
     const pin=el('button','goal-pin',pinned?.id===item.id?'★ Моя цель':'☆ Сделать целью',card);pin.type='button';
     pin.onclick=e=>{e.stopPropagation();const p=this.progression;const old=p.expedition.pinnedGoal;p.expedition.pinnedGoal=old?.id===item.id?null:{id:item.id,type};p._touch('goal-pinned');};
   }
   return card;
 });
 wrap(UI.prototype,'_findNextGoal',function(original){
   const pin=this.progression.expedition?.pinnedGoal;
   if(pin&&!this._isOwned(pin.type,pin.id)){
     const entry=this._shopEntries(pin.type).find(i=>i.id===pin.id);
     if(entry){const price=pin.type==='upgrade'?entry.levels[this.progression.state.upgrades[pin.id]||0]?.cost:entry.price;return{type:pin.type,entry,price,unlocked:this.progression.getUnlockStatus(entry).unlocked};}
   }
   return original();
 });
 wrap(UI.prototype,'_renderShop',function(original){
   original();const content=this.dom.panelContent,overview=content.querySelector('.shop-overview');
   const balance=overview?.querySelector('.shop-balance'),rank=overview?.querySelector('.rank-guide'),goal=overview?.querySelector('.shop-next-goal');
   overview?.classList.add('compact-shop');
   const invTab=content.querySelector('[data-action="shop-section"][data-section="inventory"]');
   if(invTab)for(const n of invTab.childNodes)if(n.nodeType===Node.TEXT_NODE)n.textContent='Садок';
   if(rank){const details=el('details','rank-details',null,content);el('summary','','Как работают ранг и улучшения',details);details.append(rank);}
   if(goal){goal.querySelector('small').textContent=this.progression.expedition?.pinnedGoal?'МОЯ ЦЕЛЬ':'БЛИЖАЙШАЯ ПОКУПКА';}
   if(balance)balance.querySelector('small').textContent='МОНЕТЫ';
   const help=el('p','shop-help','Садок и трюм лодки складываются. Улов не портится. Топлива и ремонта нет.',content);
   this.game?.appendRewardOffer?.(content);
 });
 wrap(UI.prototype,'_handleClick',async function(original,e){
   const b=e.target.closest?.('[data-action="equip"][data-item-type="boat"]');
   if(!b)return original(e);
   const r=this.progression.equip('boat',b.dataset.itemId);
   if(!r.ok){this._toast(r.message||'Лодка пока не куплена','warning');return;}
   this._toast(`Выбрано: ${ctx.nameOf(b.dataset.itemId)}`,'info');await this._callCallback('onEquip',r,{itemType:'boat',itemId:b.dataset.itemId});this.refresh();
 });
}
