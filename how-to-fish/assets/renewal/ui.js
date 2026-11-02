import {wrap,el} from '../update/helpers.js';
import {renewal,difficulty,loc,num} from './state.js';
import {storyState} from '../homecoming/story.js';
import {LifetimeLeaderboards} from './leaderboards.js';
export function installUI15(ctx){
  const G=ctx.Game.prototype;
  wrap(G,'init',async function(original,...args){
    const r=await original(...args);this.leaderboards15=new LifetimeLeaderboards(this);
    const actions=document.querySelector('.quick-actions');
    const rankButton=el('button','leaderboard-button15',null,actions);rankButton.id='leaderboards-btn';rankButton.type='button';rankButton.title=loc('Рыбы и чайки: общий рейтинг','Fish and seagulls: global rankings');
    const cup=el('span','hud-action-icon renewal-cup',null,rankButton);cup.innerHTML='<svg viewBox="0 0 32 32" width="27" height="27" aria-hidden="true"><path d="M10 5h12v8c0 4-2.6 7-6 7s-6-3-6-7V5Zm0 2H5v4c0 3 2 5 6 5m11-9h5v4c0 3-2 5-6 5m-5 4v6m-5 2h10" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';el('small','',loc('ЛИДЕРЫ','LEADERS'),rankButton);rankButton.onclick=()=>this.leaderboards15.open();
    const main=document.querySelector('#main-menu .hero-card'),pause=document.querySelector('#pause-menu .pause-card');
    const row=el('div','renewal-menu-row',null,main);main.insertBefore(row,main.querySelector('.control-row'));
    const sound=el('button','secondary-btn',null,row);sound.dataset.sound15='';sound.type='button';sound.onclick=()=>this.setSound15(renewal(this.progression).muted);
    const leaders=el('button','secondary-btn',loc('Таблицы лидеров','Leaderboards'),row);leaders.type='button';leaders.onclick=()=>this.leaderboards15.open();
    const oldSound=document.querySelector('#sound-btn');if(oldSound){
      // Replace a legacy click listener that altered only runtime mute, not the save.
      const fresh=oldSound.cloneNode(false);oldSound.replaceWith(fresh);this.ui['sound-btn']=fresh;fresh.dataset.sound15='';fresh.onclick=()=>this.setSound15(renewal(this.progression).muted);
    }
    const lb=el('button','secondary-btn',loc('ТАБЛИЦЫ ЛИДЕРОВ','LEADERBOARDS'),pause);lb.type='button';lb.onclick=()=>this.leaderboards15.open();
    this.nextCycleButton15=el('button','secondary-btn',loc('СЛЕДУЮЩАЯ СЛОЖНОСТЬ','NEXT DIFFICULTY'),pause);this.nextCycleButton15.type='button';this.nextCycleButton15.onclick=()=>this.offerNextCycle15();
    this.difficultyBadge15=el('div','difficulty-badge15',null,this.homecoming.goal);
    this.refreshSound15?.();this.updateUI();return r;
  });
  wrap(G,'updateUI',function(original,...args){
    const result=original(...args);if(!this.progression)return result;const r=renewal(this.progression),learned=r.learned;
    document.body.classList.toggle('rod-learned15',learned.rod>=2);document.body.classList.toggle('weapon-learned15',learned.weapon>=2);document.body.classList.toggle('harpoon-learned15',learned.harpoon>=2);
    if(this.actionHint&&(this.player.tool==='rod'&&learned.rod>=2||this.player.tool==='weapon'&&learned.weapon>=2))this.actionHint.hidden=true;
    for(const tool of ['rod','weapon','utility'])if(learned[tool==='utility'?'harpoon':tool]>=2){const slot=document.querySelector(`.tool-slot[data-slot="${tool}"]`);if(slot)slot.title=loc(({rod:'Удочка',weapon:'Оружие',utility:'Гарпун'})[tool],({rod:'Rod',weapon:'Weapon',utility:'Harpoon'})[tool]);}
    if(this.oceanEncounter?.hint){const phase=this.oceanEncounter.phase;this.oceanEncounter.hint.hidden=(phase==='held'&&learned.harpoon>=2)||(phase==='recovery'&&learned.weapon>=2);}
    if(this.nextCycleButton15)this.nextCycleButton15.hidden=!storyState(this.progression).endingSeen&&!storyState(this.progression).shipAwarded;
    if(this.difficultyBadge15)this.difficultyBadge15.textContent=loc(`СЛОЖНОСТЬ ${num(r.cycle+1)}`,`DIFFICULTY ${num(r.cycle+1)}`);
    this.refreshSound15?.();return result;
  });
  wrap(ctx.UI.prototype,'_renderSettings',function(original,...args){
    const r=original(...args),g=this.game;if(!g)return r;
    const section=el('section','settings-card renewal-audio-settings',null,this.dom.panelContent);
    el('h3','',loc('Звук и статистика','Sound and statistics'),section);
    const button=el('button','secondary-btn',null,section);button.dataset.sound15='';button.type='button';button.onclick=()=>g.setSound15(renewal(this.progression).muted);
    const test=el('button','secondary-btn',loc('ПРОВЕРИТЬ ЗВУК','TEST SOUND'),section);test.type='button';
    test.onclick=async()=>{
      const p=this.progression;if(p.state.settings.sfxVolume===0)p.updateSettings({sfxVolume:.85});
      await g.setSound15(true);const note=section.querySelector('.renewal-sound-note')??el('p','renewal-sound-note','',section);
      note.textContent=g.audio.context?.state==='running'?loc('Звук включён. Проверь громкость вкладки и устройства.','Sound is enabled. Check your tab and device volume.'):loc('Браузер пока блокирует звук. Нажми кнопку ещё раз.','The browser is still blocking audio. Press the button again.');
    };
    const stats=renewal(this.progression).lifetime;
    el('p','',loc(`За всё время: ${num(stats.fish)} рыб · ${num(stats.gulls)} чаек.`,`All-time total: ${num(stats.fish)} fish · ${num(stats.gulls)} seagulls.`),section);
    g.refreshSound15?.();return r;
  });
  wrap(G,'toast',function(original,text,...args){if(renewal(this.progression).learned.rod>=2&&typeof text==='string'&&text.startsWith('КЛЮЁТ!'))text=loc('Клюёт!','Bite!');return original(text,...args);});
  wrap(G,'destroy',function(original,...args){this.leaderboards15?.destroy();this.renewalDialog?.close();return original(...args);});
}
