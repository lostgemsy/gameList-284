import {wrap,el} from '../update/helpers.js';
import {renewal,loc,num} from '../renewal/state.js';
import {harpoonStats,masteryStats,UPGRADE_COSTS} from '../renewal/balance.js';
const FISH=['harbor_sprat','copper_bream','dock_striper','lantern_koi','coral_snapper','jade_grouper','lagoon_ray','bluewater_tuna','wavecrest_dolphin','razorfin_shark','twilight_angler','void_ray','trench_shark','pale_colossus','prismfin','storm_leviathan'];
const WEAPONS=['dock_pistol','reef_revolver','breaker_shotgun','current_smg','mariner_rifle','leviathan_rifle'];
const clean=new Set([...FISH,...WEAPONS]);
export function installUI16(ctx){
  const oldPaint=globalThis.__TB_PAINT14__;
  globalThis.__TB_PAINT14__=(node,id,label='')=>{
    if(!clean.has(id)||!node)return oldPaint?.(node,id,label)??false;
    const img=el('img','item-art__image clean-art16');img.src=new URL('../../ui/clean/'+id+'.webp',import.meta.url).href;img.alt='';img.draggable=false;img.decoding='async';
    node.classList.remove('atlas-icon','harbor-icon14');node.classList.add('item-art');node.dataset.icon=id;node.replaceChildren(img);node.setAttribute('aria-hidden','true');if(label)node.title=label;return true;
  };
  wrap(ctx.UI.prototype,'_renderShop',function(original,...args){
    const result=original(...args),g=this.game;if(!g)return result;
    this.dom.panelContent.querySelector('[data-harpoon15]')?.remove();
    if(this.shopSection!=='upgrade')return result;
    const grid=this.dom.panelContent.querySelector('.shop-grid');if(!grid)return result;
    const u=renewal(this.progression).harpoon,s=harpoonStats(this.progression);
    for(const [kind,ru,en,descRu,descEn,current,next,unitRu,unitEn] of [
      ['power','Тяга гарпуна','Harpoon power','Усиливает попадание и подтягивание рыбы к берегу.','Stronger impact and steady hauling towards shore.',s.haul,Math.round((s.haul+4*masteryStats(this.progression).haul)*10)/10,'/с','/s'],
      ['line','Линь гарпуна','Harpoon line','Увеличивает дальность выстрела и время удержания рыбы.','Longer shots and more time to bring your catch ashore.',s.range,s.range+3,' м',' m'],
      ['reel','Катушка гарпуна','Harpoon reel','Ускоряет полёт гарпуна, возврат и подтягивание добычи.','Faster spear flight, recovery and movement of the catch.',s.speed,s.speed+3,' м/с',' m/s']]){
      const level=u[kind],cost=UPGRADE_COSTS[level],max=cost===undefined,card=el('article','shop-card upgrade harpoon-card16'+(max?' owned':''),null,grid);card.dataset.harpoonUpgrade16=kind;
      const icon=el('div','shop-card__icon',null,card);ctx.paintIcon(icon,'harpoon');
      const heading=el('div','shop-card__heading',null,card);el('small','',loc(`УЛУЧШЕНИЕ · ${level}/6`,`UPGRADE · ${level}/6`),heading);el('h3','',loc(ru,en),heading);el('p','',loc(descRu,descEn),card);
      const stats=el('dl','stat-grid',null,card);
      for(const [key,value] of [[loc('Сейчас','Current'),current+loc(unitRu,unitEn)],[loc('Следом','Next'),max?loc('Максимум','Maximum'):next+loc(unitRu,unitEn)],[loc('Уровень','Level'),`${level}/6`],[loc('Цена','Price'),max?'—':`${num(cost)} ●`]]){const row=el('div','',null,stats);el('dt','',key,row);el('dd','',value,row);}
      const can=!max&&this.progression.state.coins>=cost;
      const b=el('button','item-action '+(can?'primary-btn':'unavailable'),max?loc('МАКСИМУМ','MAXIMUM'):loc(`${can?'КУПИТЬ':'НУЖНО'} · ● ${num(cost)}`,`${can?'BUY':'NEED'} · ● ${num(cost)}`),card);b.type='button';b.disabled=!can;
      b.onclick=()=>{b.disabled=true;const r=g.buyHarpoon15(kind);if(r.ok){this.refresh();this.dom.panelContent.querySelector(`[data-harpoon-upgrade16="${kind}"] button`)?.focus({preventScroll:true});}else b.disabled=false;};
    }
    if(renewal(this.progression).cycle){
      const m=masteryStats(this.progression),card=el('article','shop-card upgrade',null,grid),icon=el('div','shop-card__icon',null,card);ctx.paintIcon(icon,'upgrade');
      const h=el('div','shop-card__heading',null,card);el('small','',loc('МАСТЕРСТВО','MASTERY'),h);el('h3','',loc(`Мастерство · ${m.level}`,`Mastery · ${m.level}`),h);
      el('p','',loc('Следующий уровень: +16% урона, быстрее вываживание и тяга гарпуна.','Next level: +16% damage, faster reeling and harpoon hauling.'),card);
      const b=el('button','item-action primary-btn',loc(`КУПИТЬ · ● ${num(m.cost)}`,`BUY · ● ${num(m.cost)}`),card);b.type='button';b.disabled=this.progression.state.coins<m.cost;b.onclick=()=>{if(g.buyMastery15().ok)this.refresh();};
    }
    return result;
  });
  // Backward-compatible entry point, now the SAME shop panel and upgrade grid.
  ctx.Game.prototype.openHarpoon15=function(){this.renewalDialog?.close();if(this.mode==='paused')this.resume();this.openPanel('shop',{shopSection:'upgrade'});this.uiManager.shopSection='upgrade';this.uiManager.refresh();};
  wrap(ctx.Game.prototype,'selectTool',function(original,...args){this.silentEquip16=true;try{return original(...args);}finally{this.silentEquip16=false;}});
  wrap(ctx.Game.prototype,'toast',function(original,text,...args){
    const translated=String(text??'');
    if((this.silentEquip16&&args[0]==='tool')||/^(Удочка готова|Rod ready|Fishing rod ready|Пистолет докера|Dockhand Pistol)$/i.test(translated))return;
    return original(text,...args);
  });
  wrap(ctx.Game.prototype,'init',async function(original,...args){const r=await original(...args);const stamp=document.querySelector('.version-stamp');if(stamp)stamp.textContent=loc('v1.6 · КАК ЛОВИТЬ РЫБУ · АВТОСОХРАНЕНИЕ','v1.6 · HOW TO FISH · AUTOSAVE');return r;});
}
