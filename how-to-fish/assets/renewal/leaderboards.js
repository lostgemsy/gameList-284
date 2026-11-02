import {el} from '../update/helpers.js';
import {renewal,loc,num,integer} from './state.js';
import {dialog} from './dialog.js';
export const BOARDS=Object.freeze([{id:'fishalltime',key:'fish',ru:'Рыбы за всё время',en:'All-time fish'},{id:'seagullsalltime',key:'gulls',ru:'Чайки за всё время',en:'All-time seagulls'}]);
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const deadline=(promise,ms=11000)=>new Promise((resolve,reject)=>{const t=setTimeout(()=>reject(new Error('SDK timeout')),ms);Promise.resolve(promise).then(v=>{clearTimeout(t);resolve(v);},e=>{clearTimeout(t);reject(e);});});
/** Exactly two public SDK boards, no fabricated names or offline pseudo-rankings. */
export class LifetimeLeaderboards {
  constructor(game){
    this.game=game;game.progression._leaderboards15=this;this.cache=new Map();this.inflight=new Map();this.lastWrite=0;this.lastSyncAt=0;this.running=null;this.timer=null;this.destroyed=false;this.authTime=0;
    this.baseline={...renewal(game.progression).lifetime};this.dirty=true;this.schedule(4500);
    this.online=()=>this.schedule(1000);window.addEventListener('online',this.online);
    this.tick=setInterval(()=>{if(this.dirty&&!document.hidden)this.schedule(0);},25000);
  }
  get sdk(){return this.game.platform?.ysdk;}
  async allowed(method){try{return !!this.sdk?.isAvailableMethod&&await deadline(this.sdk.isAvailableMethod(`leaderboards.${method}`));}catch{return false;}}
  schedule(delay=12000){this.dirty=true;if(this.timer||this.destroyed)return;delay=Math.max(delay,12000-(Date.now()-this.lastSyncAt));this.timer=setTimeout(()=>{this.timer=null;this.sync().catch(()=>{});},delay);}
  async sync(){
    if(this.running)return this.running;
    this.running=this._sync().finally(()=>{this.running=null;});return this.running;
  }
  async _sync(){
    const sdk=this.sdk;if(this.destroyed||!sdk?.leaderboards?.setScore||!await this.allowed('setScore'))return false;
    if(!await this.allowed('getPlayerEntry'))return false;
    this.lastSyncAt=Date.now();let all=true;
    for(const board of BOARDS){
      if(this.destroyed)return false;
      const state=renewal(this.game.progression),before=this.baseline[board.key]??state.lifetime[board.key];
      try{
        let remote=0;
        try{remote=integer((await deadline(sdk.leaderboards.getPlayerEntry(board.id)))?.score);}catch(e){if(e?.code!=='LEADERBOARD_PLAYER_NOT_PRESENT')throw e;}
        const current=state.lifetime[board.key],delta=Math.max(0,current-before),target=integer(Math.max(before,remote)+delta);
        if(target>current){state.lifetime[board.key]=target;this.game.progression._touch('lifetime-cloud-merge');}
        // Advance the merge watermark BEFORE a write: a timed-out write may still
        // have reached the platform. Retrying must not count the same local delta twice.
        this.baseline[board.key]=target;
        if(target>remote){
          await wait(Math.max(0,1150-(Date.now()-this.lastWrite)));if(this.destroyed)return false;
          this.lastWrite=Date.now();await deadline(sdk.leaderboards.setScore(board.id,target));
        }
        this.baseline[board.key]=target;
      }catch(e){all=false;this.lastError=e;}
    }
    const current=renewal(this.game.progression).lifetime;
    this.dirty=!all||BOARDS.some(b=>current[b.key]>(this.baseline[b.key]??0));return all;
  }
  async entries(board){
    const cached=this.cache.get(board.id);if(cached&&Date.now()-cached.time<40000){if(cached.error)throw cached.error;return cached.value;}
    if(this.inflight.has(board.id))return this.inflight.get(board.id);
    const job=(async()=>{
      const sdk=this.sdk;if(!sdk?.leaderboards?.getEntries)throw new Error('offline');
      const includeUser=await this.allowed('getPlayerEntry');
      try{const value=await deadline(sdk.leaderboards.getEntries(board.id,{quantityTop:10,quantityAround:3,includeUser}));this.cache.set(board.id,{value,time:Date.now()});return value;}
      catch(error){this.cache.set(board.id,{error,time:Date.now()});throw error;}
    })().finally(()=>this.inflight.delete(board.id));this.inflight.set(board.id,job);return job;
  }
  async open(){
    const g=this.game,d=dialog(g,loc('Таблицы лидеров','Leaderboards'));
    const totals=renewal(g.progression).lifetime;
    const personal=el('div','renewal-personal',null,d.body);
    el('strong','',`${loc('Твой итог за всё время','Your all-time total')}: ${num(totals.fish)} ${loc('рыб','fish')} · ${num(totals.gulls)} ${loc('чаек','seagulls')}`,personal);
    el('p','renewal-muted',loc('Одна рыба — одно очко: улов удочкой или победа в бою. Чайки считаются отдельно, даже при полном садке. Счёт не сбрасывается при новом прохождении.','One fish, one point: landed with a rod or defeated in combat. Seagulls have their own board, even when the basket is full. New journeys never reset your total.'),personal);
    const tabs=el('div','renewal-tabs',null,d.body),status=el('p','renewal-status','',d.body),content=el('div','renewal-ranking',null,d.body);
    status.setAttribute('role','status');let request=0;
    const buttons=[];
    const show=async board=>{
      const token=++request;buttons.forEach((b,i)=>{b.classList.toggle('selected',BOARDS[i]===board);b.setAttribute('aria-pressed',String(BOARDS[i]===board));});
      content.replaceChildren();status.textContent=loc('Загрузка рейтинга…','Loading rankings…');
      try{
        const result=await this.entries(board);if(d.closed||token!==request)return;
        status.textContent=result?.entries?.length?loc('Лучшие игроки и место в рейтинге','Top players and your place'):loc('Пока нет результатов. Стань первым!','No scores yet. Be the first!');
        const table=el('table','',null,content),head=el('thead','',null,table),tr=el('tr','',null,head);
        for(const text of [loc('Место','Rank'),loc('Игрок','Player'),loc('Всего','Total')])el('th','',text,tr);
        const body=el('tbody','',null,table),seen=new Set();
        for(const e of result?.entries??[]){
          if(seen.has(e.rank))continue;seen.add(e.rank);
          const row=el('tr',e.rank===result.userRank?'is-you':'',null,body);
          el('td','',String(e.rank),row);el('td','',(e.player?.publicName||loc('Игрок','Player')).slice(0,80),row);el('td','',num(e.score),row);
        }
      }catch(e){if(d.closed||token!==request)return;
        status.textContent=!this.sdk?loc('Общий рейтинг доступен только в версии на платформе.','Global rankings are available only in the platform version.'):loc('Рейтинг сейчас недоступен. Попробуй позднее.','Rankings are unavailable right now. Please try again later.');
      }
    };
    for(const board of BOARDS){const b=el('button','secondary-btn',loc(board.ru,board.en),tabs);b.type='button';b.onclick=()=>show(board);buttons.push(b);}
    show(BOARDS[0]);this.schedule(1000);
    if(this.sdk?.auth?.openAuthDialog&&!await this.allowed('setScore')&&!d.closed){
      const note=el('p','renewal-muted',loc('Войди в аккаунт, чтобы твой результат попал в общий рейтинг. Играть и сохранять локальный счёт можно без входа.','Sign in to your account to appear in the global rankings. You can play and keep a local total without signing in.'),d.body);
      const auth=el('button','primary-btn',loc('Войти для участия в рейтинге','Sign in to join the rankings'),d.body);auth.type='button';
      auth.onclick=async()=>{
        if(Date.now()-this.authTime<15000)return;this.authTime=Date.now();auth.disabled=true;
        try{
          await deadline(this.sdk.auth.openAuthDialog(),90000);this.game.platform.player=await deadline(this.sdk.getPlayer());
          if(await this.allowed('setScore')){const synced=await this.sync();await g.progression.saveNow();note.remove();auth.remove();status.textContent=synced?loc('Вход выполнен. Результаты отправлены; таблица обновится при следующей загрузке.','Signed in. Scores submitted; rankings will refresh on the next update.'):loc('Вход выполнен. Прогресс сохранён; отправка результатов будет повторена.','Signed in. Progress is saved; score submission will be retried.');}
          else note.textContent=loc('Вход не завершён. Можно продолжить без авторизации.','Sign-in was not completed. You can continue as a guest.');
        }catch{note.textContent=loc('Вход отменён или недоступен. Локальный прогресс сохранён.','Sign-in cancelled or unavailable. Local progress is saved.');}
        finally{auth.disabled=false;}
      };
    }
  }
  destroy(){this.destroyed=true;clearTimeout(this.timer);clearInterval(this.tick);window.removeEventListener('online',this.online);}
}
