/* 1.9 — semantic touch copy, including content created after startup. */
import {wrap} from '../update/helpers.js';
import {FieldGuide} from '../update/guide.js';
import {ExpeditionIntro} from '../homecoming/intro.js';
import {loc} from '../renewal/state.js';
export function touchCopy19(value){
  return String(value??'')
    .replace(/\s*[·—–-]?\s*(?:ПРОБЕЛ|SPACE(?:BAR)?)(?=\s*$)/gi,'')
    .replace(/(?:Esc|⎋)\s*[—–-]\s*продолжить/gi,'Нажми «Вернуться», чтобы продолжить')
    .replace(/(?:Esc|⎋)\s*(?:[—–-]\s*)?(?:resume|continue)/gi,'Tap Resume to continue')
    .replace(/\s*[·—–-]\s*(?:Esc|⎋)(?=\s*$)/gi,'')
    .replace(/\s*\((?:[EMBRC123]|Esc|⎋|Enter|↵)\)/gi,'')
    .replace(/\bWASD\b|W\s*\/\s*S\b/g,loc('СТИК','STICK'))
    .replace(/A\s*\/\s*D\b/g,loc('СТИК','STICK'))
    .replace(/ЛКМ/g,'кнопку действия').replace(/ПКМ/g,'кнопку сброса')
    .replace(/left mouse button|left-click|\bLMB\b/gi,'action button')
    .replace(/right mouse button|right-click|\bRMB\b/gi,'cancel button')
    .replace(/Чувствительность мыши/g,'Чувствительность обзора')
    .replace(/Mouse sensitivity/gi,'Look sensitivity')
    .replace(/\s*·\s*E\s*\/\s*B\b/g,'').replace(/\s*·\s*[EBMR](?=\s*$)/g,'');
}
function cleanNode(node){
  if(node.nodeType===3){
    if(node.parentElement?.closest('script,style,textarea,input,kbd,[data-no-touch-copy]'))return;
    const old=node.nodeValue;if(!old||old.length>1000)return;const next=touchCopy19(old);if(next!==old)node.nodeValue=next;return;
  }
  if(node.nodeType!==1||node.matches('script,style,textarea,input'))return;
  for(const name of ['title','aria-label'])if(node.hasAttribute(name)){const old=node.getAttribute(name),next=touchCopy19(old);if(next!==old)node.setAttribute(name,next);}
  for(const child of node.childNodes)cleanNode(child);
}
export function installControls19(ctx){
  wrap(FieldGuide.prototype,'touchKey',function(original,k){return ({'1':loc('УДОЧКА','ROD'),'2':loc('ОРУЖИЕ','WEAPON'),'3':loc('ГАРПУН','HARPOON')})[k]??original(k);});
  wrap(FieldGuide.prototype,'setPrompt',function(original,text){if(this.game.input.isTouch)text=touchCopy19(text).replace(/\s*·\s*[123](?=\s*$)/,'');return original(text);});
  wrap(ExpeditionIntro.prototype,'start',function(original,...args){const r=original(...args);if(this.game.input.isTouch)this.skip.textContent=loc('ПРОПУСТИТЬ ВСТУПЛЕНИЕ','SKIP INTRO');return r;});
  wrap(ctx.Game.prototype,'init',async function(original,...args){
    const r=await original(...args);
    // Some browsers return a rejected Promise for a second request in the same
    // click. Coalesce requests, preserving normal browser permission handling.
    if(!this.input.isTouch&&this.canvas.requestPointerLock){
      const canvas=this.canvas,native=canvas.requestPointerLock;let pending=null;
      this._nativePointer19=native;canvas.requestPointerLock=function(...options){
        if(document.pointerLockElement===canvas)return Promise.resolve();if(pending)return pending;
        try{pending=Promise.resolve(native.apply(canvas,options)).catch(()=>{}).finally(()=>{pending=null;});return pending;}catch{return Promise.resolve();}
      };
    }
    if(!this.input.isTouch)return r;
    document.documentElement.classList.add('touch-copy19');
    cleanNode(document.body);
    this._touchObserver19=new MutationObserver(records=>{for(const rec of records){if(rec.type==='characterData'||rec.type==='attributes')cleanNode(rec.target);else for(const n of rec.addedNodes)cleanNode(n);}});
    this._touchObserver19.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['title','aria-label']});
    const row=document.querySelector('#main-menu .control-row');if(row){row.classList.add('mobile-instructions19');row.textContent=loc('Левый стик — движение · свайп справа — обзор · кнопки — действия','Left stick to move · swipe right to look · buttons to act');}
    return r;
  });
  wrap(ctx.Game.prototype,'destroy',function(original,...args){this._touchObserver19?.disconnect();if(this._nativePointer19)this.canvas.requestPointerLock=this._nativePointer19;return original(...args);});
}
