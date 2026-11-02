import {el} from '../update/helpers.js';
import {loc} from './state.js';
let sequence=0;
/** One accessible, lifecycle-paused modal; callers always receive a close handle. */
export function dialog(game,title){
  game.renewalDialog?.close();
  const previous=document.activeElement,reason='renewal-dialog',id=`renewal-title-${++sequence}`;
  const overlay=el('section','renewal-overlay',null,document.body),card=el('div','renewal-dialog',null,overlay);
  card.setAttribute('role','dialog');card.setAttribute('aria-modal','true');card.setAttribute('aria-labelledby',id);
  const header=el('header','renewal-header',null,card),h=el('h2','',title,header);h.id=id;
  const closeButton=el('button','renewal-close','×',header);closeButton.type='button';closeButton.setAttribute('aria-label',loc('Закрыть','Close'));
  const body=el('div','renewal-body',null,card);
  game.input?.reset();document.exitPointerLock?.();game.platform?._setPauseReason(reason,true);
  let closed=false;
  const api={overlay,card,body,get closed(){return closed;},close:()=>{
    if(closed)return;closed=true;overlay.remove();document.removeEventListener('keydown',onKey,true);
    if(game.renewalDialog===api)game.renewalDialog=null;
    game.input?.reset();game.platform?._setPauseReason(reason,false);
    if(previous?.isConnected)previous.focus?.({preventScroll:true});
  }};
  function onKey(e){
    e.stopImmediatePropagation();
    if(e.key==='Escape'){e.preventDefault();api.close();}
    if(e.key==='Tab'){
      const items=[...card.querySelectorAll('button:not(:disabled),a[href],input,select,[tabindex="0"]')].filter(n=>!n.hidden),first=items[0],last=items.at(-1);
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}
    }
  }
  closeButton.onclick=api.close;overlay.addEventListener('pointerdown',e=>{if(e.target===overlay)api.close();});
  document.addEventListener('keydown',onKey,true);game.renewalDialog=api;queueMicrotask(()=>closeButton.focus());return api;
}
