import {wrap,el} from '../update/helpers.js';
export function installOptionalAds(ctx){
 const {Progression:P,Game}=ctx;
 // An ordinary sale is always paid immediately. A video is an optional extra,
 // never a prerequisite for the boat, progression, or return to the harbour.
 wrap(P.prototype,'sellAll',function(original,...args){
   const r=original(...args);
   if(r.ok&&this.expedition){this.expedition.saleBonus={id:`${this.now()}-${this.state.statistics.totalSold}`,amount:Math.min(2000,r.coins),claimed:false};this._touch('sale-bonus-available');}
   return r;
 });
 Game.prototype.appendRewardOffer=function(parent){
   const reward=this.progression.expedition?.saleBonus;
   if(!reward||reward.claimed||!this.platform.ysdk?.adv?.showRewardedVideo)return;
   const row=el('div','reward-offer',null,parent);el('span','','Улов уже оплачен. Дополнительная награда — по желанию.',row);
   const button=el('button','secondary-btn',`Реклама: +${reward.amount} монет`,row);button.type='button';button.disabled=!!this._rewardBusy;
   button.onclick=async()=>{
     if(this._rewardBusy||reward.claimed)return;this._rewardBusy=true;button.disabled=true;
     let paid=false;
     try{
       const result=await this.platform.showRewardedAd({onRewarded:()=>{
         if(paid||reward.claimed)return;paid=true;reward.claimed=true;
         // Keep the captured receipt: a duplicate SDK callback cannot pay twice.
         if(this.progression.expedition.saleBonus?.id===reward.id)this.progression.expedition.saleBonus.claimed=true;
         this.progression.addCoins(reward.amount,{source:'rewarded-sale'});
         this.progression._touch('rewarded-sale-claimed');
       }});
       if(paid)this.toast(`Дополнительная награда: +${reward.amount} монет`,'sale');
       else this.toast(result.ok?'Просмотр не завершён. Обычная оплата улова уже у тебя.':'Реклама недоступна. Можно продолжать играть.','info');
     }catch(error){this.toast('Реклама недоступна. Прогресс сохранён.','info');}
     finally{this._rewardBusy=false;this.uiManager.refresh();}
   };
 };
}
