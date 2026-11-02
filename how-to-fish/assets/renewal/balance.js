import {wrap,clamp} from '../update/helpers.js';
import {HarpoonController} from '../update/harpoon.js';
import {FieldGuide} from '../update/guide.js';
import {renewal,difficulty,learn,loc,num} from './state.js';
export const UPGRADE_COSTS=[130,340,900,2100,4800,10500];
export function masteryStats(p){
  const level=renewal(p).mastery;
  return {level,damage:Math.min(1e100,Math.pow(1.16,level)),reel:1+.035*level,haul:1+.06*level,cost:Math.min(9000000000000,Math.round(2500*Math.pow(1.13,level)))};
}
export function harpoonStats(p){
  const u=renewal(p).harpoon,m=masteryStats(p);return {range:14+u.line*3,speed:20+u.reel*3,impact:(4+u.power*3)*m.haul,haul:Math.round((7+u.power*4)*m.haul*10)/10,pull:1.05+u.reel*.32,cooldown:2.2/(1+.28*u.reel),tetherTime:16+u.line*2};
}
function haulRequired(fish,p){return Math.max(44,Math.min(220,(fish._baseHp15??fish.oceanMaxHp??fish.maxHp??60)*.8))*difficulty(p).pressure;}
export const isSmallFish16=fish=>fish?.species?.id==='harbor_sprat'||(fish?.species?.sizeRangeM?.[1]??9)<=.5;
export const healthForSize16=size=>Math.max(24,Math.round(20+70*Math.pow(Math.max(.1,Number(size)||.3),1.25)));
function tuneDeck(fish,g){
  const d=fish?.deck;if(!d)return;
  const dif=difficulty(g.progression),small=isSmallFish16(fish);
  if(!d._tuned15){d._tuned15=true;fish.maxHp=fish.hp=healthForSize16(fish.sizeM);}
  const seconds=(fish.trainingTarget?34:24)/(small?1:Math.pow(dif.motion,.55));
  d.escapeSeconds=Math.max(9,seconds);d.escapeRemaining=Math.min(d.escapeRemaining,d.escapeSeconds);
  d.restSeconds=d.restRemaining=0;d.nextHopIn=small?Math.max(1.15,d.nextHopIn):Math.min(.2,d.nextHopIn);d.hopInterval=small?1.25:.25;
}
export function installBalance(ctx){
  const G=ctx.Game.prototype,F=ctx.FishSystem.prototype,H=HarpoonController.prototype;
  for(const prototype of [F,ctx.Wildlife.prototype])wrap(prototype,'damage',function(original,creature,amount,...args){
    const p=this.game?.progression??this.progression;return original(creature,amount*(p?masteryStats(p).damage:1),...args);
  });
  wrap(ctx.Progression.prototype,'getUpgradeValue',function(original,id,...args){const value=original(id,...args);return id==='market_reputation'?value*difficulty(this).reward:value;});
  wrap(F,'spawnOne',function(original,...args){
    const f=original(...args);if(!f)return f;
    const dif=difficulty(this.progression),base=f.species.hp;f._baseHp15=base;
    const starter=['harbor_sprat','copper_bream','dock_striper'].includes(f.species.id);
    f.species={...f.species,behavior:{...f.species.behavior},deckEncounter:f.species.deckEncounter?{...f.species.deckEncounter}:starter?{chance:.78,finishHp:64,escapeSeconds:18,hopInterval:.4}:undefined};
    f.maxHp=f.hp=healthForSize16(f.sizeM);
    f.species.hp=f.maxHp;return f;
  });
  wrap(F,'beginDeckEncounter',function(original,fish,...args){const r=original(fish,...args);if(r&&this.game)tuneDeck(fish,this.game);return r;});
  wrap(G,'startDeckEncounter',function(original,...args){const r=original(...args);if(r)tuneDeck(this.deckEncounter,this);return r;});
  wrap(FieldGuide.prototype,'prepareDeck',function(original,fish,...args){
    const hp=fish.deck?._tuned15?fish.hp:null;const r=original(fish,...args);
    if(hp!==null)fish.hp=hp;
    // The old tutorial forced a 16 HP stationary target. It now teaches the real fight.
    if(fish.deck){fish.deck._tuned15=false;tuneDeck(fish,this.game);}return r;
  });
  // Genuine, unpredictable shore hops. All intermediate land points are validated.
  wrap(F,'updateDeckCreature',function(original,fish,dt,time){
    const d=fish.deck,g=this.game;
    if(!g||!d||fish.dead||fish.state==='deck_airborne'||fish.state==='deck_escaping')return original(fish,dt,time);
    dt=Math.min(.06,dt);const dif=difficulty(g.progression),small=isSmallFish16(fish),motion=small?1:dif.motion;
    d.escapeRemaining=Math.max(0,d.escapeRemaining-dt);d.attackIn-=dt;
    if(d.attackIn<=0){d.attackIn=2.5/motion;this.onAttack?.(fish,8);}
    if(d.escapeRemaining<=0){this.escapeDeckCreature(fish);return;}
    d.nextHopIn-=dt;d.impact=Math.max(0,d.impact-dt*5);
    const p=fish.object.position;
    if(d.hopElapsed<0&&d.nextHopIn<=0){
      d.hopElapsed=0;d.hopDuration=small?(.8+this.rng()*.22):(.38+this.rng()*.22)/Math.pow(motion,.35);
      d.hopStart.copy(p);d.hopTarget.copy(p);
      for(let attempt=0;attempt<16;attempt++){
        const angle=this.rng()*Math.PI*2,length=small?(.26+this.rng()*.38):(.65+this.rng()*1.15)*Math.min(1.6,motion);
        const x=clamp(p.x+Math.cos(angle)*length,d.bounds.minX+.25,d.bounds.maxX-.25),z=clamp(p.z+Math.sin(angle)*length,d.bounds.minZ+.25,d.bounds.maxZ-.25);
        if(Math.hypot(x-p.x,z-p.z)<(small?.12:.3))continue;
        let valid=true;for(let i=1;i<=5;i++){const u=i/5,xx=p.x+(x-p.x)*u,zz=p.z+(z-p.z)*u;
          if(g.surfaceAt(xx,zz,.26)==null||g.isSolidAt(xx,zz,.28)){valid=false;break;}}
        if(valid){d.hopTarget.set(x,g.surfaceAt(x,z,.25)-g.playerEyeHeight,z);break;}
      }
      d.hopHeight=small?(.17+this.rng()*.15):.42+this.rng()*.68;d.nextHopIn=d.hopDuration+(small?(.95+this.rng()*.65):(.08+this.rng()*.22)/motion);
      d.twist15=(this.rng()<.5?-1:1)*(small?.18:(.65+this.rng()*.85));
    }
    if(d.hopElapsed>=0){
      d.hopElapsed+=dt;const u=clamp(d.hopElapsed/d.hopDuration),e=u*u*(3-2*u);
      p.x=d.hopStart.x+(d.hopTarget.x-d.hopStart.x)*e;p.z=d.hopStart.z+(d.hopTarget.z-d.hopStart.z)*e;
      const ground=g.surfaceAt(p.x,p.z,.23);
      p.y=(ground==null?d.surfaceY:ground-g.playerEyeHeight)+d.bodyLift+Math.sin(u*Math.PI)*d.hopHeight;
      fish.object.rotation.y=Math.atan2(d.hopTarget.x-d.hopStart.x,d.hopTarget.z-d.hopStart.z)+Math.sin(u*Math.PI)*d.twist15;
      const cosmetic=(g.progression.state.settings.reducedMotion?.3:1)*(small?.35:1);
      fish.object.rotation.x=Math.sin(u*Math.PI*3)*.5*cosmetic;fish.object.rotation.z=Math.PI*.49+Math.sin(u*Math.PI*2)*.58*cosmetic;
      if(fish.swimAction)fish.swimAction.timeScale=small?1.2:2.8;
      if(u>=1){d.hopElapsed=-1;d.impact=1;fish.object.rotation.x=0;}
    }else{
      const y=g.surfaceAt(p.x,p.z,.23);p.y=(y==null?d.surfaceY:y-g.playerEyeHeight)+d.bodyLift;
      fish.object.rotation.z=Math.PI*.49+Math.sin(time*(small?5:18)+fish.phase)*(small?.035:.1);if(fish.swimAction)fish.swimAction.timeScale=small?.65:1.5;
    }
  });
  wrap(G,'damagePlayer',function(original,amount,...args){return original(amount*difficulty(this.progression).damage,...args);});
  wrap(G,'getFishingChallenge',function(original,...args){return original(...args)+Math.log1p(renewal(this.progression).cycle)*.7;});
  wrap(G,'getEffectiveRod',function(original,...args){
    const rod=original(...args),d=difficulty(this.progression);if(!d.cycle)return rod;
    // Existing tackle remains valuable, but each expedition has stronger current.
    return {...rod,reelSpeed:rod.reelSpeed*masteryStats(this.progression).reel/d.pressure,lineStrengthMultiplier:Math.max(1,(rod.lineStrengthMultiplier??1)/Math.sqrt(d.pressure)),tensionForgiveness:rod.tensionForgiveness/d.pressure};
  });
  wrap(ctx.Wildlife.prototype,'placePatrolBird',function(original,bird,reset,...args){
    if(reset&&this.game){const d=difficulty(this.game.progression);bird.maxHp=Math.ceil(Math.max(26,d.cycle?d.weapon*1.6:0)*d.hp);bird.speed=(.19+(Number(bird.id?.split('-').at(-1))%3)*.025)*Math.pow(d.motion,.6);}
    return original(bird,reset,...args);
  });
  H.stats15=function(){return harpoonStats(this.game.progression);};
  wrap(H,'fire',function(original,...args){const s=this.stats15();this.range=s.range;this.speed=s.speed;return original(...args);});
  H.hit=function(fish){
    this.target=fish;this.previousHook=fish.hooked;fish.hooked=true;fish.harpoonTethered=true;this.state='tethered';this.time=0;this.drain=0;this.haulProgress=0;
    this.game.effects.splash(fish.object.position,.4);this.damage(fish,this.stats15().impact);this.game.audio.play('hit',{volume:.48,playbackRate:.8});
  };
  H.damage=function(fish,amount){
    if(fish.dead||fish.deck)return;
    this.haulProgress=(this.haulProgress??0)+Math.max(0,amount);fish.hp=Math.max(1,fish.hp-Math.round(amount));fish.stun=.12;
    if(this.haulProgress<haulRequired(fish,this.game.progression))return;
    const g=this.game;
    if(g.progression.getInventoryCapacity().remainingSlots<1){g.toast(loc('Садок полон. Продай улов.','Basket full. Sell your catch.'),'info');this.cancel();return;}
    const species=fish.species.deckEncounter?fish.species:{...fish.species,deckEncounter:{chance:1,finishHp:Math.max(64,(fish._baseHp15??40)*.7),escapeSeconds:20,hopInterval:.4}};
    fish.species=species;fish.caughtWithHarpoon=true;fish.hooked=false;
    const result={creature:fish,species,speciesId:species.id,sizeM:fish.sizeM,forceDeck:true,waterPoint:fish.object.position.clone(),perfectReel:false};
    this.previousHook=false;this.cancel();
    if(g.startDeckEncounter(result)){
      fish.hooked=false;learn(g.progression,'harpoon');
      if(g.guide?.active&&g.guide.step===4)g.guide.prepareDeck(fish);
      g.toast(loc('Улов на суше — рыба ещё сопротивляется!','Catch landed — the fish is still fighting!'),'catch');
    }else{fish.caughtWithHarpoon=false;fish.hp=fish.maxHp;g.toast(loc('Нужен свободный берег для улова.','Find clear shore to land the catch.'),'info');}
  };
  H.recall=function(){this.release();this.state='returning';this.cooldown=this.stats15().cooldown;};
  wrap(H,'updateHUD',function(original,...args){
    const r=original(...args),s=this.stats15(),learned=renewal(this.game.progression).learned;
    if(this.state==='tethered'){
      const need=haulRequired(this.target??{},this.game.progression);this.label.textContent=`${loc('ПОДТЯНУТО','HAULED')} · ${Math.min(99,Math.floor((this.haulProgress??0)/need*100))}%`;
    }else if(this.state==='ready'&&this.cooldown<=0){
      this.label.textContent=loc('ГАРПУН · ГОТОВ','HARPOON · READY');
      this.hint.textContent=loc(`Выстрел и удержание · ${s.range} м · тяга ${s.haul}`,`Fire and hold · ${s.range} m · pull ${s.haul}`);
    }
    this.hint.hidden=learned.harpoon>=2;this.track.style.transform=`scaleX(${1-clamp(this.cooldown/s.cooldown)})`;return r;
  });
  G.buyHarpoon15=function(kind){
    const p=this.progression,u=renewal(p).harpoon;if(!Object.hasOwn(u,kind))return {ok:false,reason:'unknown-upgrade'};
    const cost=UPGRADE_COSTS[u[kind]];if(cost===undefined)return {ok:false,reason:'max-level'};
    if(p.state.coins<cost)return {ok:false,reason:'insufficient-coins'};
    p.state.coins-=cost;p.state.statistics.totalCoinsSpent+=cost;u[kind]++;
    p.applyGameplayEvent({type:'purchase',itemType:'upgrade',itemId:`harpoon_${kind}`,price:cost},{touch:false});p._touch('harpoon-upgrade');
    this.audio.play('coin',{volume:.55,queueWhileLoading:true});this.updateUI();return {ok:true,level:u[kind],cost};
  };
  G.buyMastery15=function(){
    const p=this.progression,r=renewal(p),m=masteryStats(p);
    if(!r.cycle)return {ok:false,reason:'finish-expedition-first'};
    if(p.state.coins<m.cost)return {ok:false,reason:'insufficient-coins'};
    p.state.coins-=m.cost;p.state.statistics.totalCoinsSpent+=m.cost;r.mastery++;
    p.applyGameplayEvent({type:'purchase',itemType:'upgrade',itemId:'expedition_mastery',price:m.cost},{touch:false});p._touch('expedition-mastery');
    this.audio.play('coin',{volume:.55,queueWhileLoading:true});this.syncProgressionState(true);this.updateUI();return {ok:true,level:r.mastery,cost:m.cost};
  };
}
