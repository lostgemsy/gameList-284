import {wrap,el} from '../update/helpers.js';
import {loc} from '../renewal/state.js';
import {voyage} from './balance.js';
import {HomecomingStory} from '../homecoming/story.js';
import {ExpeditionIntro} from '../homecoming/intro.js';

const shortAction=id=>({shop:loc('ЛАВКА','SHOP'),sell:loc('ПРОДАТЬ','SELL'),travel:loc('КАРТА','MAP'),boat:loc('В ЛОДКУ','BOARD'),'boat-exit':loc('НА БЕРЕГ','ASHORE')})[id]??loc('ДЕЙСТВИЕ','INTERACT');
function stopBackground(g,mentor=null){
  g._stillNPC17??=new Map();
  for(const npc of g.npcSystem?.npcs??[]){
    if(npc===mentor||g._stillNPC17.has(npc)||!npc.object)continue;
    const saved={state:npc.state,waypoint:npc.waypointIndex};g._stillNPC17.set(npc,saved);
    // An idle clip on the actual rig, not a walking mixer on a fixed body.
    g.npcSystem.play(npc,'idle',1);
  }
}
function restoreBackground(g){
  for(const [npc,saved] of g._stillNPC17??[]){
    if(npc.object?.parent)g.npcSystem.play(npc,saved.state==='walk'?'walk':'idle',1);
  }
  g._stillNPC17?.clear();
}
export function installUI17(ctx){
  const {Game:G,UI}=ctx;
  wrap(G.prototype,'init',async function(original,...args){
    const r=await original(...args);
    document.querySelectorAll('.version-stamp,.debug-launcher,.build-info').forEach(n=>n.remove());
    const panel=document.querySelector('#game-panel .game-panel__inner'),tabs=document.querySelector('#panel-tabs'),close=document.querySelector('#panel-close');
    if(panel&&tabs&&close&&!panel.querySelector('.panel-nav17')){
      const row=el('div','panel-nav17');tabs.before(row);row.append(tabs,close);
      const title=document.querySelector('#panel-title');if(title)title.closest('header').classList.add('panel-title-hidden17');
    }
    if(this.input.isTouch){
      document.querySelectorAll('kbd').forEach(n=>{n.hidden=true;});
      const reload=document.querySelector('[data-touch-key="KeyR"] small');if(reload)reload.textContent='↻';
    }
    const kbd=document.querySelector('#interaction-prompt kbd');if(kbd)kbd.textContent='E';
    this.uiManager.refresh();return r;
  });
  wrap(UI.prototype,'refresh',function(original,...args){
    const result=original(...args);
    for(const n of this.dom.panelFooter?.children??[])if(/автосохран|версия|сохраняются автоматически|цели автоматически|autosav|data version|saved automatically|track your progress automatically/i.test(n.textContent))n.remove();
    return result;
  });
  wrap(UI.prototype,'_renderSettings',function(original,...args){
    const r=original(...args);
    for(const n of this.dom.panelFooter?.children??[])if(/автосохран|версия|autosav|data version/i.test(n.textContent))n.remove();
    const technical=this.dom.panelContent.querySelector('.renewal-audio-settings');
    if(technical){const buttons=technical.querySelectorAll('button');if(buttons.length>1)buttons[1].remove();technical.querySelector('.renewal-sound-note')?.remove();}
    const explainer=this.dom.panelContent.querySelector('.rank-explainer');
    if(explainer)explainer.textContent=loc('Ранг — опыт капитана. Открывай виды и районы, лови крупную рыбу и побеждай морских обитателей. Сюжетные задания открывают новые маршруты и снаряжение; награды помогают подготовиться к следующему плаванию.','Rank is your experience as a captain. Discover species and regions, catch large fish, and face sea creatures. Story chapters unlock routes and equipment; their rewards fund the next voyage.');
    const sensitivity=[...this.dom.panelContent.querySelectorAll('label')].find(n=>/Чувствительность мыши|Mouse sensitivity/.test(n.textContent));
    if(sensitivity&&document.querySelector('.touch-input')){const text=loc('Чувствительность обзора','Look sensitivity');sensitivity.querySelector('span').textContent=text;sensitivity.querySelector('input').setAttribute('aria-label',text);}
    return r;
  });
  wrap(G.prototype,'updateInteraction',function(original,...args){
    const r=original(...args),prompt=this.ui?.['interaction-prompt'],action=this.interactable;
    const b=document.querySelector('[data-touch-key="KeyE"]');
    if(b){
      const available=!!action&&action.enabled!==false;
      b.classList.toggle('is-available17',available);b.setAttribute('aria-label',available?shortAction(action.id):loc('Взаимодействовать','Interact'));
      const small=b.querySelector('small'),label=available?shortAction(action.id):(this.input.isTouch?'✓':'E');if(small&&small.textContent!==label)small.textContent=label;
    }
    if(!prompt)return r;
    const id=action?.id??null,v=voyage(this.progression);
    if(id!==this._hintId17){this._hintId17=id;this._hintStart17=performance.now();}
    const elapsed=performance.now()-(this._hintStart17??0),retired=!id||v.hints.includes(id)||elapsed>4500;
    prompt.classList.toggle('hint-retired17',retired);
    if(id&&elapsed>4500&&!v.hints.includes(id)){v.hints.push(id);this.progression._touch('interaction-learned');}
    if(this.input.isTouch&&this.ui['interaction-text']&&action)this.ui['interaction-text'].textContent=shortAction(id);
    return r;
  });
  wrap(G.prototype,'updateUI',function(original,...args){
    const r=original(...args);
    if(this.actionHint)this.actionHint.hidden=true;
    if(this.harpoon?.hud){
      this.harpoon.hud.dataset.state17=this.harpoon.state;
      // The ready state is already conveyed by the action button and icon.
      if(this.harpoon.state==='ready')this.harpoon.hud.hidden=true;
    }
    return r;
  });
  wrap(ExpeditionIntro.prototype,'start',function(original,...args){
    const r=original(...args);stopBackground(this.game);return r;
  });
  wrap(ExpeditionIntro.prototype,'update',function(original,...args){
    if(this.active)stopBackground(this.game);return original(...args);
  });
  wrap(ExpeditionIntro.prototype,'restore',function(original,...args){
    const r=original(...args);restoreBackground(this.game);return r;
  });
  wrap(HomecomingStory.prototype,'begin',function(original,...args){
    const r=original(...args);stopBackground(this.game,this.mentor);return r;
  });
  wrap(HomecomingStory.prototype,'update',function(original,...args){
    if(this.active)stopBackground(this.game,this.mentor);return original(...args);
  });
  wrap(HomecomingStory.prototype,'close',function(original,...args){
    const r=original(...args);restoreBackground(this.game);return r;
  });
  // Preserve the full dialogue; split long mobile speeches into readable
  // pages instead of enlarging the window over the shopkeeper's face.
  wrap(HomecomingStory.prototype,'begin',function(original,lines,options={}){
    if(this.game.input.isTouch){
      const pages=[];
      for(const line of lines){
        const localized=ctx.translate(line.text);
        const sentences=localized.match(/[^.!?]+[.!?]+[»”]?|[^.!?]+$/g)??[localized];
        let text='';let first=true;
        for(const sentence of sentences){
          if(text.length+sentence.length>220&&text){pages.push({...line,text:text.trim(),gifts:first&&line.gifts});first=false;text='';}
          text+=sentence;
        }
        if(text)pages.push({...line,text:text.trim(),gifts:first&&line.gifts});
      }
      return original(pages,options);
    }
    return original(lines,options);
  });
}
