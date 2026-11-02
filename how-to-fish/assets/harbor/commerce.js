/* Platform SDK only: real callbacks, catalogue prices, saved receipts before consumption.
   No advertising/payment simulation is included in the release. */
import {wrap,el} from '../update/helpers.js';
import {tr,icon} from './locale.js';
import {loc,num} from '../renewal/state.js';
import {bounded} from '../voyage/cloud.js';

export const PRODUCTS=Object.freeze([
  {id:'coinpouch',coins:1500,title:'Кошель моряка',en:'Sailor’s Pouch',art:'coins'},
  {id:'coinchest',coins:4000,title:'Сундук капитана',en:'Captain’s Chest',art:'gift'},
  {id:'captainbundle',coins:12000,title:'Сокровища океана',en:'Ocean Treasures',art:'rare_fish'},
  {id:'noads',coins:0,title:'Без рекламы навсегда',en:'No Ads Forever',art:'check',permanent:true}
]);
export const hasNoAds=game=>!!game?.progression?.expedition?.market?.noads;
export function marketState(p){
  const e=p.expedition??(p.expedition={});
  const s=e.market??(e.market={version:1,gifts:{},crabs:{},receipts:[]});
  s.gifts??={};s.crabs??={};s.receipts=Array.isArray(s.receipts)?s.receipts:[];return s;
}
export function now(game){
  try{const t=game.platform.ysdk?.serverTime?.();if(Number.isFinite(t))return t;}catch{}
  return Date.now();
}
export function giftInfo(game,zone=game.player.zone){
  const state=marketState(game.progression),time=now(game);
  if(!Number.isFinite(state.gifts[zone])){state.gifts[zone]=time+180000;game.progression._touch('island-gift-timer');}
  const seconds=Math.max(0,Math.ceil((state.gifts[zone]-time)/1000));
  return {seconds,ready:seconds===0,stamp:state.gifts[zone],text:`${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`};
}
function sdkMethod(platform,name){return typeof platform.ysdk?.adv?.[name]==='function';}

class AdBreaks {
  constructor(game){
    this.game=game;this.elapsed=0;this.pending=false;this.busy=false;this.lastInput=performance.now();this.remaining=0;
    this.input=()=>{this.lastInput=performance.now();};
    for(const name of ['pointerdown','pointermove','keydown','keyup','touchmove'])document.addEventListener(name,this.input,{passive:true});
    this.overlay=el('div','ad-countdown14',null,document.body);this.overlay.hidden=true;this.overlay.setAttribute('role','status');this.overlay.setAttribute('aria-live','assertive');
    const card=el('div','',null,this.overlay);el('small','','РЕКЛАМНАЯ ПАУЗА',card);this.number=el('strong','','2',card);el('p','','Сейчас будет реклама. Игра и звук приостановлены.',card);
  }
  update(dt){
    const g=this.game;if(hasNoAds(g)){this.elapsed=0;this.pending=false;return;}if(this.busy||g.mode!=='playing'||g.platformPaused||g.panelOpen||g.intro?.active||g.homecoming?.active)return;
    if(!sdkMethod(g.platform,'showFullscreenAdv'))return;
    this.elapsed+=dt;if(this.elapsed<150)return;this.pending=true;
    // Never cut a cast, fight, lesson, dialogue, transaction or moving boat short.
    if(g.guide?.active||g.deckEncounter||g.harpoon?.state!=='ready'||g.fishing?.state!=='idle'||g.zoneSystem?._travel||g.harborDialog)return;
    if(g.boatController?.isPiloting&&Math.abs(g.boatController.state.speed)>.1)return;
    if(g.oceanEncounter?.active||g.player.velocity.lengthSq()>.03||g.input.mouse.left||g.input.mouse.right||g.input.keys.size||g.input.virtualMove.lengthSq()>.001)return;
    if(performance.now()-this.lastInput<1400||document.hidden)return;
    this.begin();
  }
  async begin(){
    if(this.busy||hasNoAds(this.game)||!sdkMethod(this.game.platform,'showFullscreenAdv'))return false;
    const g=this.game;this.busy=true;this.remaining=2;this.overlay.hidden=false;this.number.textContent='2';
    g.input.reset();document.exitPointerLock?.();g.platform._setPauseReason('ad-countdown14',true);
    try{
      await new Promise(resolve=>{
        let last=performance.now(),done=false;
        const visibility=()=>{last=performance.now();};
        const finish=()=>{if(done)return;done=true;document.removeEventListener('visibilitychange',visibility);this.cancelCountdown14=null;resolve();};
        this.cancelCountdown14=finish;document.addEventListener('visibilitychange',visibility);
        const tick=time=>{
          if(this.destroyed){finish();return;}
          const delta=Math.max(0,(time-last)/1000);last=time;
          if(!document.hidden)this.remaining=Math.max(0,this.remaining-delta);
          this.number.textContent=String(Math.max(1,Math.ceil(this.remaining)));
          if(this.remaining<=0){finish();return;}this.raf=requestAnimationFrame(tick);
        };this.raf=requestAnimationFrame(tick);
      });
      if(this.destroyed||hasNoAds(g))return false;
      this.overlay.hidden=true;
      await g.platform.showFullscreenAd();
    }finally{
      this.elapsed=0;this.pending=false;this.busy=false;this.remaining=0;this.overlay.hidden=true;this.lastInput=performance.now();
      g.platform._setPauseReason('ad-countdown14',false);g.input.reset();
    }
    return true;
  }
  reset(){this.elapsed=0;this.pending=false;this.lastInput=performance.now();}
  destroy(){this.destroyed=true;cancelAnimationFrame(this.raf);this.cancelCountdown14?.();this.overlay.remove();for(const name of ['pointerdown','pointermove','keydown','keyup','touchmove'])document.removeEventListener(name,this.input);}
}

export class HarborPayments {
  constructor(game){
    this.game=game;this.payments=null;this.catalog=[];this.busy=false;this.granting=new Map();this.status='loading';this.destroyed=false;
    this.initPromise=this.initialize();
    this.online=()=>{if(this.payments)this.recover().catch(e=>this.pending(e));else this.initPromise=this.initialize();};
    globalThis.addEventListener('online',this.online);
  }
  async initialize(){
    const sdk=this.game.platform.ysdk;if(!sdk){this.status='unavailable';return;}
    try{
      this.payments=typeof sdk.getPayments==='function'?await bounded(sdk.getPayments({signed:false})):sdk.payments;
      if(!this.payments?.getPurchases){this.status='unavailable';return;}
      // Restore permanent entitlements even when the store catalogue is offline.
      const catalog=this.payments.getCatalog?bounded(this.payments.getCatalog()).catch(()=>[]):Promise.resolve([]);
      await this.recover().catch(e=>this.pending(e));
      this.catalog=await catalog;this.status=this.catalog.length?'ready':'unavailable';
    }catch(error){this.status='unavailable';this.pending(error);}
  }
  pending(error){
    this.lastError=error;if(this.destroyed||this.retry)return;
    this.retry=setTimeout(()=>{this.retry=null;if(this.payments)this.recover().catch(e=>this.pending(e));else this.initPromise=this.initialize();},30000);
  }
  async recover(){
    if(!this.payments?.getPurchases)return;
    if(this.recovering)return this.recovering;
    this.recovering=(async()=>{
      const list=await bounded(this.payments.getPurchases());if(!Array.isArray(list))throw new Error('Unsigned purchase list required');
      // A permanent purchase is never consumed: the portal retains it for restoration.
      for(const purchase of list.filter(p=>p.productID==='noads'))await this.grant(purchase);
      for(const purchase of list.filter(p=>p.productID!=='noads'))if(PRODUCTS.some(p=>p.id===purchase.productID))await this.grant(purchase);
    })();
    try{return await this.recovering;}finally{this.recovering=null;}
  }
  async grant(purchase){
    const product=PRODUCTS.find(p=>p.id===purchase?.productID),token=purchase?.purchaseToken;
    if(!product||typeof token!=='string'||!token.length)throw new Error('Invalid purchase');
    if(this.granting.has(token))return this.granting.get(token);
    const work=(async()=>{
      const g=this.game,p=g.progression,s=marketState(p);
      if(product.permanent){
        if(!s.noads){s.noads=true;s.noadsPurchasedAt=now(g);p._touch('permanent-purchase');await p.saveNow();}
        g.adBreaks14?.reset();this.refreshOwned();return {ok:true,permanent:true};
      }
      if(g.platform._cloud17?.conflict)throw new Error('Choose an adventure before restoring currency');
      let receipt=s.receipts.find(r=>r.token===token);
      if(!receipt){receipt={token,id:product.id,coins:product.coins,at:now(g),consumed:false};s.receipts.push(receipt);p.addCoins(product.coins,'platform-purchase');}
      // The receipt and balance are committed together BEFORE consumption.
      // Local-only saves do not authorize consuming a portal purchase.
      const local=await p.saveNow();
      if(!local?.ok||!g.platform.player?.setData)throw new Error('Purchase awaiting confirmation');
      const saved=await g.platform.confirmPurchaseSave17();
      if(!saved)throw new Error('Purchase awaiting confirmation');
      if(!receipt.consumed){await bounded(this.payments.consumePurchase(token));receipt.consumed=true;p._touch('purchase-consumed');await p.saveNow();}
      return {ok:true,coins:receipt.coins};
    })();
    this.granting.set(token,work);
    try{return await work;}finally{this.granting.delete(token);}
  }
  refreshOwned(){
    if(!hasNoAds(this.game))return;
    for(const b of document.querySelectorAll('[data-product-id="noads"]')){b.disabled=true;b.textContent=loc('КУПЛЕНО','OWNED');}
  }
  async buy(id,button){
    const product=PRODUCTS.find(p=>p.id===id);
    if(this.busy||!product||!this.catalog.some(p=>p.id===id)||!this.payments||id==='noads'&&hasNoAds(this.game))return;
    const g=this.game;this.busy=true;if(button)button.disabled=true;g.platform._setPauseReason('payment14',true);g.input.reset();let purchased=false;
    try{
      const purchase=await this.payments.purchase({id});purchased=true;await this.grant(purchase);
      g.toast(product.permanent?loc('Полноэкранная реклама отключена навсегда.','Fullscreen ads are disabled forever.'):loc(`Получено ${num(product.coins)} монет.`,`Received ${num(product.coins)} coins.`),'sale');
    }catch(error){
      this.lastError=error;if(purchased)this.pending(error);
      g.toast(purchased?loc('Покупка оплачена. Товар будет выдан после восстановления соединения.','Payment received. Your item will be delivered when the connection returns.'):loc('Покупка не завершена.','Purchase not completed.'),'info');
    }finally{this.busy=false;if(button)button.disabled=id==='noads'&&hasNoAds(g);g.platform._setPauseReason('payment14',false);g.adBreaks14?.reset();this.refreshOwned();}
  }
  destroy(){this.destroyed=true;clearTimeout(this.retry);globalThis.removeEventListener('online',this.online);}
}
function dialog(game,title){
  game.closeHarborDialog14?.();game.input.reset();document.exitPointerLock?.();
  const overlay=el('section','harbor-modal14',null,document.body);overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-label',tr(title));
  const panel=el('div','harbor-modal-card14',null,overlay),header=el('header','',null,panel);el('h2','',title,header);
  const close=el('button','harbor-close14','×',header);close.type='button';close.setAttribute('aria-label',tr('Закрыть'));
  const content=el('div','harbor-modal-content14',null,panel);game.harborDialog=overlay;
  let closed=false;
  const key=e=>{if(e.code==='Escape'){e.preventDefault();e.stopImmediatePropagation();game.closeHarborDialog14();}else if(e.key==='Tab'){
    const nodes=[...overlay.querySelectorAll('button:not(:disabled)')];const first=nodes[0],last=nodes[nodes.length-1];
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}
  }};
  document.addEventListener('keydown',key,true);
  game.closeHarborDialog14=()=>{
    if(closed||game.harborPayments14?.busy)return;closed=true;document.removeEventListener('keydown',key,true);overlay.remove();game.harborDialog=null;
    clearInterval(game.harborDialogTimer14);game.platform._setPauseReason('harbor-panel14',false);game.input.reset();game.canvas.focus({preventScroll:true});
  };
  close.onclick=game.closeHarborDialog14;overlay.addEventListener('pointerdown',e=>{if(e.target===overlay)game.closeHarborDialog14();});
  game.platform._setPauseReason('harbor-panel14',true);close.focus({preventScroll:true});return content;
}
export function installCommerce14(ctx){
  const {Game,Progression,Platform}=ctx;
  wrap(Progression.prototype,'newGame',function(original,...args){
    const receipts=marketState(this).receipts.map(r=>({...r}));const result=original(...args);marketState(this).receipts=receipts;return result;
  });
  wrap(Platform.prototype,'showFullscreenAd',async function(original,...args){
    if(hasNoAds(this.game14))return {ok:true,shown:false,reason:'noads'};
    return original(...args);
  });
  // Protect all rewarded offers, including the original sell bonus, against duplicate/late callbacks.
  Platform.prototype.showRewardedAd=async function({onOpen,onRewarded,onClose,onError}={}){
    await this.init();if(!sdkMethod(this,'showRewardedVideo'))return {ok:false,reason:'unavailable',rewarded:false};
    if(this._advertisement14)return {ok:false,reason:'busy',rewarded:false};this._advertisement14=true;
    return new Promise(resolve=>{
      let settled=false,rewarded=false;
      const finish=result=>{if(settled)return;settled=true;this._advertisement14=false;this._setPauseReason('ad',false);this.game14?.adBreaks14?.reset();resolve(result);};
      const error=e=>{if(settled)return;try{onError?.(e);}finally{finish({ok:false,reason:'error',rewarded,error:e});}};
      this._setPauseReason('ad',true);
      try{const request=this.ysdk.adv.showRewardedVideo({callbacks:{
        onOpen:()=>{if(!settled)onOpen?.();},
        onRewarded:()=>{if(settled||rewarded)return;rewarded=true;try{onRewarded?.();}catch(e){this._recordError?.('reward-grant14',e);}},
        onClose:()=>{if(settled)return;try{onClose?.(rewarded);}finally{finish({ok:true,rewarded});}},onError:error
      }});Promise.resolve(request).catch(error);}catch(e){error(e);}
    });
  };
  wrap(Game.prototype,'init',async function(original,...args){
    const result=await original(...args);this.platform.game14=this;marketState(this.progression);
    this.adBreaks14=new AdBreaks(this);this.harborPayments14=new HarborPayments(this);return result;
  });
  wrap(Game.prototype,'update',function(original,dt){const result=original(dt);this.adBreaks14?.update(Math.min(.1,Math.max(0,dt)));return result;});
  Game.prototype.openGift14=function(){
    const zone=this.player.zone,amount=4*(75+(ctx.data.zones.find(z=>z.id===zone)?.order??0)*50);
    const content=dialog(this,'Подарок хозяина острова');content.append(icon('gift','harbor-gift-icon14'));
    el('p','',`Награда: ${amount} монет`,content);el('p','','Подарок доступен каждые 3 минуты. Получение — за просмотр рекламы.',content);
    const timer=el('strong','gift-timer14','',content),button=el('button','primary-btn','');
    // Keep the reward action distinct from closing/opening the gift panel.
    content.append(button);button.type='button';const status=el('p','harbor-status14','',content);
    const refresh=()=>{const info=giftInfo(this,zone);timer.textContent=info.ready?tr('Подарок готов!'):tr('До подарка: ')+info.text;button.textContent=tr(`Смотреть рекламу · +${amount} монет`);button.disabled=!info.ready||!sdkMethod(this.platform,'showRewardedVideo')||this.giftBusy14;};
    if(!sdkMethod(this.platform,'showRewardedVideo'))status.textContent=tr('Реклама сейчас недоступна. Награду можно получить позже.');
    refresh();this.harborDialogTimer14=setInterval(refresh,500);
    button.onclick=async()=>{
      const info=giftInfo(this,zone);if(!info.ready||this.giftBusy14)return;this.giftBusy14=true;refresh();let awarded=false;
      const result=await this.platform.showRewardedAd({onRewarded:()=>{
        const state=marketState(this.progression);
        if(awarded||state.gifts[zone]!==info.stamp)return;awarded=true;state.gifts[zone]=now(this)+180000;
        this.progression.addCoins(amount,'island-host-reward');this.progression.saveNow();
      }});
      this.giftBusy14=false;status.textContent=tr(awarded?'Подарок получен! Спасибо за визит.':result.ok?'Просмотр не завершён — подарок всё ещё ждёт.':'Реклама недоступна. Попробуй позднее.');refresh();
    };
  };
  Game.prototype.openPremiumShop14=async function(){
    const content=dialog(this,loc('Магазин капитана','Captain’s Shop'));
    el('p','',loc('Все острова и сюжет доступны без покупок.','All islands and the story are available without purchases.'),content);
    const status=el('p','harbor-status14',loc('Открываем магазин…','Opening the shop…'),content);
    await this.harborPayments14.initPromise;if(!content.isConnected)return;
    const store=this.harborPayments14;
    const visibleProducts=PRODUCTS.filter(product=>store.catalog.some(item=>item.id===product.id));
    status.textContent=store.status==='ready'&&visibleProducts.length?'':loc('Магазин сейчас недоступен. Попробуй позднее.','The shop is unavailable right now. Please try again later.');
    const grid=el('div','premium-grid14',null,content);
    // Requirement 1.13.6: products absent/inactive in the platform catalogue must
    // not remain visible as disabled pseudo-products inside the game.
    for(const product of visibleProducts){
      const sdk=store.catalog.find(p=>p.id===product.id),card=el('article','premium-card14',null,grid);card.append(icon(product.art));
      el('h3','',loc(product.title,product.en),card);
      el('strong','',product.permanent?loc('Навсегда','Forever'):loc(`${num(product.coins)} монет`,`${num(product.coins)} coins`),card);
      if(product.permanent)el('p','premium-description17',loc('Отключает автоматическую полноэкранную рекламу. Видео за награду остаются только по твоему желанию.','Disables automatic fullscreen ads. Reward videos remain optional.'),card);
      const buy=el('button','primary-btn',null,card);buy.type='button';buy.dataset.productId=product.id;
      buy.disabled=!sdk||store.status!=='ready'||product.id==='noads'&&hasNoAds(this);
      if(product.id==='noads'&&hasNoAds(this))buy.textContent=loc('КУПЛЕНО','OWNED');
      else if(sdk){
        el('span','',loc('Купить','Buy')+' · '+(sdk.priceValue??sdk.price??''),buy);
        let currencyImage;try{currencyImage=sdk.getPriceCurrencyImage?.('small');}catch{}
        if(currencyImage){const image=el('img','sdk-currency14',null,buy);image.src=currencyImage;image.alt=sdk.priceCurrencyCode??'';}
        else el('span','',sdk.priceCurrencyCode??'',buy);
      }else buy.textContent=loc('Недоступно','Unavailable');
      buy.onclick=()=>store.buy(product.id,buy);
    }
    const retry=el('button','secondary-btn',loc('Восстановить покупки','Restore Purchases'),content);retry.type='button';retry.disabled=!store.payments;
    retry.onclick=async()=>{if(store.busy)return;retry.disabled=true;
      try{await store.recover();store.refreshOwned();status.textContent=loc('Покупки восстановлены.','Purchases restored.');}
      catch(e){store.pending(e);status.textContent=loc('Не удалось восстановить покупки. Попробуй позднее.','Could not restore purchases. Please try again later.');}
      finally{retry.disabled=false;}
    };
  };
  wrap(Game.prototype,'destroy',function(original,...args){this.adBreaks14?.destroy();this.harborPayments14?.destroy();this.closeHarborDialog14?.();return original(...args);});
}
