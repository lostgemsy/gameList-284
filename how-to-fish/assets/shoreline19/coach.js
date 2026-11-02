import {wrap,el} from '../update/helpers.js';
import {loc} from '../renewal/state.js';
class CatchCoach19{
  constructor(g){this.g=g;this.last='';this.state='';this.held=0;this.idle=0;
    this.node=el('aside','catch-coach19',null,g.guide?.card.querySelector('.guide-copy')??g.guide?.card??document.body);this.node.hidden=true;this.node.setAttribute('role','status');this.node.setAttribute('aria-live','polite');
    this.kicker=el('small','',null,this.node);this.title=el('strong','',null,this.node);this.detail=el('span','',null,this.node);
    this.button=document.querySelector('.touch-button--primary');
  }
  hide(){if(this.node.hidden&&!this.last)return;this.node.hidden=true;this.g.guide?.card.classList.remove('has-coach110');document.body.classList.remove('catch-coach-active19');this.button?.classList.remove('hold-target19');this.last='';}
  update(dt){
    const g=this.g;if(!g.guide?.active||g.guide.data.completed||g.mode!=='playing'||g.panelOpen||g.platformPaused||g.intro?.active||g.homecoming?.active||g.homecoming?.ending||document.hidden){this.hide();return;}
    const f=g.fishing,h=g.harpoon,rod=g.player.tool==='rod',spear=g.player.tool==='utility',down=!!g.input.mouse.left;
    const state=rod?f?.state:spear?'harpoon-'+h?.state:'none';
    if(state!==this.state){this.state=state;this.held=0;this.idle=0;}
    this.held=down?this.held+dt:0;this.idle=down?0:this.idle+dt;
    const touch=g.input.isTouch;
    const hold=touch?loc('Удерживай кнопку действия','Hold the action button'):loc('Удерживай левую кнопку мыши','Hold the left mouse button');
    let title='',kick='',detail='',tone='';
    if(rod&&f?.state==='bite'){
      kick=loc('КЛЮЁТ!','A BITE!');title=hold;detail=loc('Подсеки рыбу и продолжай удерживать.','Hook the fish, then keep holding.');
    }else if(rod&&f?.state==='hooked'){
      const tension=f.fight?.tension??f.tension??0;
      if(tension>.73&&down){kick=loc('ЛЕСКА НАТЯНУТА','HIGH LINE TENSION');title=loc('Ненадолго отпусти','Release briefly');detail=loc('Когда натяжение спадёт — снова удерживай.','Hold again when tension drops.');tone='warning19';}
      else if(this.held<1.15&&(g.guide?.active||this.idle>1.1||this.held>0)){
        kick=loc('РЫБА НА КРЮЧКЕ','FISH HOOKED');title=down?loc('Держи — подтягивай рыбу','Keep holding to reel in'):hold;detail=loc('Шкала краснеет — отпусти ненадолго.','Release briefly if the meter turns red.');
      }
    }else if(spear&&h?.state==='tethered'&&this.held<1.25){
      kick=loc('ГАРПУН ПОПАЛ!','HARPOON HIT!');title=down?loc('Держи — тяни к берегу','Keep holding to haul ashore'):hold;detail=loc('Не просто нажимай: удерживай, чтобы подтягивать.','Do not just tap: keep holding to pull the fish in.');
    }else if(spear&&h?.state==='ready'&&g.guide?.active&&g.guide.step===4){
      kick=loc('ПОПРОБУЙ ГАРПУН','TRY THE HARPOON');title=hold;detail=loc('Наведи прицел на рыбу. После попадания продолжай держать.','Aim at the fish. Keep holding after the hit.');
    }
    if(!title){this.hide();return;}
    const key=kick+title+detail+tone;if(key===this.last)return;this.last=key;
    this.node.hidden=false;g.guide?.card.classList.add('has-coach110');document.body.classList.add('catch-coach-active19');this.node.classList.toggle('warning19',tone==='warning19');this.kicker.textContent=kick;this.title.textContent=title;this.detail.textContent=detail;
    this.button?.classList.toggle('hold-target19',touch&&!tone);
  }
  destroy(){this.hide();this.node.remove();}
}
export function installCoach19(ctx){
  wrap(ctx.Game.prototype,'init',async function(original,...args){const r=await original(...args);this.catchCoach19=new CatchCoach19(this);return r;});
  wrap(ctx.Game.prototype,'update',function(original,dt){const r=original(dt);this.catchCoach19?.update(Math.min(.1,Math.max(0,dt)));return r;});
  for(const method of ['pause','openPanel','handlePlatformPause'])wrap(ctx.Game.prototype,method,function(original,...args){this.catchCoach19?.hide();return original(...args);});
  wrap(ctx.Game.prototype,'render',function(original,...args){if(this.mode!=='playing'||this.panelOpen||this.platformPaused)this.catchCoach19?.hide();return original(...args);});
  wrap(ctx.Game.prototype,'destroy',function(original,...args){this.catchCoach19?.destroy();return original(...args);});
}
