import EN from './en.js';
import {wrap} from '../update/helpers.js';
let language='ru';const cache=new Map();
const patterns=Object.entries(EN).filter(([key])=>key.includes('${')).map(([key,value])=>{
  const ids=[];let source='',offset=0;const re=/\$\{(\d+)\}/g;let match;
  while((match=re.exec(key))){source+=escape(key.slice(offset,match.index))+'(.*?)';ids.push(match[1]);offset=match.index+match[0].length;}
  source+=escape(key.slice(offset));return {regex:new RegExp('^'+source+'$','u'),ids,value,prefix:key.split('${')[0],length:key.replace(/\$\{\d+\}/g,'').length};
}).sort((a,b)=>b.length-a.length);
function escape(s){return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}
export function tr(value,depth=0){
  // Keep Esc as text: the former U+238B substitution can render as a missing glyph.
  if(value==null)return '';const text=String(value).replace(/\u238b/g,'Esc');if(language!=='en')return text.replace(/\bXP\b/g,'ОПЫТ').replace(/\bHP\b/g,'ОЗ').replace(/\bENTER\b/gi,'↵').replace(/\bESC\b/gi,'Esc').replace(/\bSHIFT\b/gi,'⇧');if(!/[а-яё]/i.test(text))return text;
  if(EN[text]!=null)return EN[text];if(cache.has(text))return cache.get(text);
  const trimmed=text.trim();let translated=EN[trimmed];
  if(translated!==undefined){translated=text.slice(0,text.indexOf(trimmed))+translated+text.slice(text.indexOf(trimmed)+trimmed.length);}
  if(translated===undefined&&depth<5){
    for(const pattern of patterns){if(pattern.prefix&&!text.startsWith(pattern.prefix))continue;const m=pattern.regex.exec(text);if(!m)continue;
      translated=pattern.value.replace(/\$\{(\d+)\}/g,(_,id)=>{const index=pattern.ids.indexOf(id);return index<0?'':tr(m[index+1],depth+1);});break;}
  }
  if(translated===undefined){
    // Composite HUD labels are made from already-localized semantic fragments.
    const pieces=text.split(/( · | → | — |\n)/);translated=pieces.length>1?pieces.map(s=>tr(s,depth+1)).join(''):text;
    if(translated===text&&depth<5){
      const upper=Object.keys(EN).find(k=>k.length>2&&!k.includes('${')&&k.toLocaleLowerCase('ru')===text.toLocaleLowerCase('ru'));
      if(upper)translated=text===text.toUpperCase()?EN[upper].toUpperCase():EN[upper];
    }
  }
  if(cache.size>12000)cache.clear();cache.set(text,translated);return translated;
}
export const artUrl=name=>new URL('../../ui/harbor/'+name+'.webp',import.meta.url).href;
export function icon(name,className=''){
  const img=document.createElement('img');img.src=artUrl(name);img.alt='';img.draggable=false;img.className='harbor-art14 '+className;img.setAttribute('aria-hidden','true');return img;
}
function translateTree(root){
  if(!root||!['1','3'].includes(String(root.nodeType)))return;
  if(root.nodeType===3){if(!root.parentElement?.closest('script,style,textarea,[data-no-translate]')){const next=tr(root.nodeValue);if(next!==root.nodeValue)root.nodeValue=next;}return;}
  if(root.matches?.('script,style,textarea,[data-no-translate]'))return;
  for(const attr of ['title','aria-label','placeholder'])if(root.hasAttribute?.(attr)){const old=root.getAttribute(attr),next=tr(old);if(old!==next)root.setAttribute(attr,next);}
  for(const child of root.childNodes)translateTree(child);
}
export function installLocale14(ctx){
  const {Platform}=ctx;
  globalThis.__TB_EN_NAMES__=Object.fromEntries(Object.values(ctx.data).filter(Array.isArray).flat().filter(v=>v?.id&&v?.name).map(v=>[v.id,EN[v.name]??v.name]));
  globalThis.__TB_TR__=tr;globalThis.__TB_LANG__=language;
  wrap(Platform.prototype,'_initialize',async function(original,...args){
    const result=await original(...args);
    const preferred=this.ysdk?.environment?.i18n?.lang??navigator.language??'en';
    language=String(preferred).toLowerCase().split(/[-_]/)[0]==='ru'?'ru':'en';
    this.language=language;globalThis.__TB_LANG__=language;document.documentElement.lang=language;document.title=language==='ru'?'Как ловить рыбу':'How to fish';
    cache.clear();translateTree(document.body);const pauseKeyHint=[...document.querySelectorAll('#pause-menu .pause-card > p')].find(node=>!node.classList.contains('pause-goal'));if(pauseKeyHint){pauseKeyHint.textContent=language==='ru'?'':tr('Esc — продолжить');pauseKeyHint.classList.toggle('hidden',language==='ru');}document.documentElement.dataset.localeReady17="true";document.querySelector('meta[name="description"]')?.setAttribute("content",language==="en"?"Survive a shipwreck, explore five islands, and catch the Leviathan to earn your ship home.":"Переживи кораблекрушение, исследуй пять островов и поймай Левиафана, чтобы получить корабль и вернуться домой.");return result;
  });
  const descriptor=Object.getOwnPropertyDescriptor(Node.prototype,'textContent');
  Object.defineProperty(Node.prototype,'textContent',{...descriptor,set(value){
    const next=this.nodeType===1&&this.matches?.('script,style')?value:tr(value);
    if(descriptor.get.call(this)!==String(next))descriptor.set.call(this,next);
  }});
  for(const method of ['fillText','strokeText']){const original=CanvasRenderingContext2D.prototype[method];CanvasRenderingContext2D.prototype[method]=function(text,...args){return original.call(this,tr(text),...args);};}
  const observer=new MutationObserver(records=>{for(const record of records){
    if(record.type==='characterData')translateTree(record.target);
    else if(record.type==='attributes')translateTree(record.target);
    else for(const node of record.addedNodes)translateTree(node);
  }});
  observer.observe(document.body,{childList:true,characterData:true,subtree:true,attributes:true,attributeFilter:['title','aria-label','placeholder']});
  ctx.translate=tr;
}
