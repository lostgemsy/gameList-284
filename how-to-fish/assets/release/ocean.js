import {wrap,el,clamp} from '../update/helpers.js';
import {PROTECTION} from './progression.js';

/** One readable encounter at a time. Peaceful fishing never attracts attacks. */
export class OceanEncounter{
  constructor(game,ctx){
    this.game=game;this.ctx=ctx;this.fish=null;this.phase='idle';this.timer=0;this.angry=null;
    this.hud=el('div','ocean-warning',null,document.querySelector('#hud'));this.hud.hidden=true;
    this.title=el('strong','','',this.hud);this.hint=el('span','','',this.hud);
    this.stats={attacks:0,hits:0,dodges:0};
  }
  provoke(fish){
    if(!fish||fish.dead||fish.deck||fish.trainingTarget||fish.species.catchMethod==='rod'||fish.species.aquatic===false||this.game.guide?.active)return;
    if(this.fish&&this.fish!==fish)return;
    this.angry=fish;this.angerTime=60;
  }
  reset(){
    const f=this.fish;
    if(f&&!f.dead){f._oceanControlled=false;if(!f.harpoonTethered)f.hooked=false;f.state='flee';f.breach=null;f.breachIn=8;this.game.fishSystem.chooseTarget(f);}
    this.fish=null;this.angry=null;this.phase='idle';this.hud.hidden=true;
  }
  start(fish){
    this.fish=fish;fish.breach=null;fish._oceanControlled=true;fish.hooked=true;
    this.telegraph();
  }
  telegraph(){
    const g=this.game,f=this.fish;
    this.phase='warning';this.timer=3.5;this.hitThisPass=false;
    f.state='ocean_warning';f.object.position.y=-.12;f.breach=null;
    this.aim=g.boatController.state.position.clone().setY(-.12);
    const d=this.aim.clone().sub(f.object.position).setY(0);
    // Avoid a point-blank unavoidable attack: visibly circle out first.
    if(d.length()<10){if(d.length()<.01)d.set(0,0,-1);const out=this.aim.clone().addScaledVector(d.normalize(),-12);if(g.isWaterPoint(out,1))f.object.position.copy(out);}
    this.from=f.object.position.clone();this.direction=this.aim.clone().sub(this.from).setY(0).normalize();
    this.end=this.aim.clone().addScaledVector(this.direction,10);
    this.hud.hidden=false;this.title.textContent=`${this.ctx.nameOf(f.species)} готовится к рывку`;
    this.hint.textContent='Уходи с линии атаки — управляй лодкой';
    g.effects.ring?.(this.aim.clone().setY(.08),'#ffb46b',1,{life:3.5,grow:.05,maxScale:2.5});
    g.effects.ring?.(f.object.position.clone().setY(.08),'#ffb46b',.7,{life:2.8,grow:.2,maxScale:3});
    g.audio.play('bloop',{volume:.5,playbackRate:.65});g.showBoss(f);
  }
  update(dt){
    const g=this.game;
    if(!g.boatController?.isPiloting||g.guide?.active||g.intro?.active){if(this.fish||this.angry)this.reset();return;}
    if(!this.fish){
      if(this.angry){this.angerTime-=dt;const f=this.angry;
        if(f.dead||this.angerTime<=0||!f.object.parent){this.angry=null;return;}
        if(!f.harpoonTethered&&!f.deck&&g.fishing.state==='idle'&&f.object.position.distanceTo(g.player.position)<52)this.start(f);
      }return;
    }
    const f=this.fish;
    if(f.dead||!f.object.parent||f.object.position.distanceTo(g.player.position)>75){this.reset();g.showBoss(null);return;}
    if(f.harpoonTethered){this.phase='held';this.timer=0;this.title.textContent='Гарпун удерживает хищника';this.hint.textContent='Удерживай действие, чтобы подтягивать. Отмена — отпустить.';return;}
    if(this.phase==='held'){this.telegraph();return;}
    f.hooked=true;f._oceanControlled=true;g.showBoss(f);this.timer-=dt;
    if(this.phase==='warning'){
      f.object.position.y=-.12+Math.sin(g.elapsed*5)*.04;
      f.object.rotation.y=Math.atan2(-this.direction.x,-this.direction.z);
      this.title.textContent=`Рывок через ${Math.max(1,Math.ceil(this.timer))} · ${this.ctx.nameOf(f.species)}`;
      if(this.timer<=0){this.phase='charge';this.duration=clamp(this.from.distanceTo(this.end)/14,1.4,3.8);this.timer=this.duration;this.stats.attacks++;f.state='ocean_charge';this.title.textContent='Хищник атакует';this.hint.textContent='Продолжай движение — цель уже выбрана';}
    }else if(this.phase==='charge'){
      const prev=f.object.position.clone(),u=clamp(1-this.timer/this.duration);
      f.object.position.lerpVectors(this.from,this.end,u);f.object.position.y=.12+Math.sin(u*Math.PI)*.3;
      const boat=g.boatController.state.position.clone().setY(f.object.position.y),segment=f.object.position.clone().sub(prev),len2=segment.lengthSq();
      const nearest=prev.clone().addScaledVector(segment,len2>1e-6?clamp(boat.clone().sub(prev).dot(segment)/len2):0);
      const radius=1.2+Math.min(2,g.boatController.state.hullRadius*.55);
      if(!this.hitThisPass&&nearest.distanceTo(boat)<radius){this.hitThisPass=true;this.stats.hits++;this.strike();}
      if(this.timer<=0||!g.isWaterPoint(f.object.position,.4)){
        if(!g.isWaterPoint(f.object.position,.4))f.object.position.copy(prev);
        if(!this.hitThisPass){this.stats.dodges++;g.toast('Рывок мимо! Теперь удобный момент для выстрела.','catch');}
        this.phase='recovery';this.timer=f.species.boss?5:4;f.state='ocean_recovery';
        this.title.textContent='Хищник открыт для выстрела';this.hint.textContent='Стреляй по цели над водой или удержи её гарпуном';
      }
    }else if(this.phase==='recovery'){
      f.object.position.y=.28+Math.sin(g.elapsed*3)*.08;
      if(this.timer<=0){this.telegraph();}
    }
  }
  strike(){
    const g=this.game,f=this.fish,protection=PROTECTION[g.player.boatId]||0;
    if(g.debugSandbox&&g.debugGodMode)return;
    const raw=f.species.boss?28:18,amount=Math.min(Math.round(raw*(1-protection)),Math.max(0,g.progression.state.health-25));
    g.progression.damage(amount,f.species.id);g.lastDamageAt=g.elapsed;
    const s=g.boatController.state;s.speed*=.45;s.heading+=.1;
    g.effects.splash(s.position.clone().setY(.05),1.5);
    g.toast(amount?`Удар по борту: −${amount} ♥. Защита корпуса ${Math.round(protection*100)}%.`:'Спасательный жилет защитил тебя. Возврат к причалу — на карте.','danger');
    const flash=document.querySelector('#damage-flash');if(flash){flash.style.opacity='.65';setTimeout(()=>flash.style.opacity='0',140);}
  }
  textState(){return{phase:this.phase,fish:this.fish?.species.id??null,remaining:+Math.max(0,this.timer).toFixed(2),...this.stats};}
}
export function installOcean(ctx){
  const {Game}=ctx;
  wrap(Game.prototype,'setupGameplaySystems',function(original){original();this.oceanEncounter=new OceanEncounter(this,ctx);});
  wrap(Game.prototype,'handleWeaponHit',function(original,result){const r=original(result);this.oceanEncounter?.provoke(result?.creature);return r;});
  wrap(Game.prototype,'handleZoneChanged',function(original,...args){this.oceanEncounter?.reset();return original(...args);});
  wrap(Game.prototype,'update',function(original,dt){
    original(dt);
    if(this.mode!=='playing'||this.panelOpen||this.platformPaused||this.intro?.active||this.debugPanelOpen)return;
    this.oceanEncounter?.update(dt);
    if(!this.boatController?.isPiloting&&!this.deckEncounter&&this.elapsed-this.lastDamageAt>8){
      this._healTick=(this._healTick||0)+dt;
      if(this._healTick>=2){this._healTick=0;if(this.progression.state.health<this.progression.state.maxHealth)this.progression.heal(6,'shore-rest');}
    }
  });
}
