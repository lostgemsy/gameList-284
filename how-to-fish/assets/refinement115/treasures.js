/* Small, persistent satellite-island rewards. No ads, extra currency or remote assets. */
import {wrap,clamp} from '../update/helpers.js';
import {marketState,now} from '../harbor/commerce.js';
import {ModelBuilder19,random19} from '../shoreline19/geometry.js';
export const TREASURE_RESPAWN115=Object.freeze({minMs:12*60*1000,maxMs:18*60*1000});
function ledger(g){const s=marketState(g.progression);if(!s.treasures115||typeof s.treasures115!=='object'||Array.isArray(s.treasures115))s.treasures115=Object.create(null);return s.treasures115;}
function chestGeometry(T,opened){
  const b=new ModelBuilder19(T),wood=opened?'#82735c':'#81522f',gold=opened?'#a39772':'#e2b853';
  b.mesh(new T.BoxGeometry(.92,.39,.63),wood,[0,.235,0]);
  b.mesh(new T.BoxGeometry(.81,.035,.51),'#312d26',[0,.444,0]);
  for(const x of [-.32,.32]){
    b.mesh(new T.BoxGeometry(.055,.41,.66),gold,[x,.24,0]);
    b.mesh(new T.BoxGeometry(.055,.12,.68),gold,[x,.49,opened?.37:0],null,opened?[-1.12,0,0]:null);
  }
  b.mesh(new T.BoxGeometry(.98,.12,.68),wood,[0,opened?.72:.49,opened?.40:0],null,opened?[-1.12,0,0]:null);
  for(const x of [-.32,.32])b.mesh(new T.BoxGeometry(.057,.126,.69),gold,[x,opened?.72:.49,opened?.40:0],null,opened?[-1.12,0,0]:null);
  b.mesh(new T.BoxGeometry(.13,.17,.045),gold,[0,.41,-.335]);
  if(!opened)for(let i=0;i<6;i++){
    b.mesh(new T.CylinderGeometry(.082,.082,.022,9),'#f6d677',[-.56+(i%3)*.13,.055+Math.floor(i/3)*.018,-.22-Math.floor(i/3)*.14]);
  }
  return b.finish();
}
export function satelliteIslands115(g,T){
  const meshes=(g.terrainSampler?.meshes??[]).filter(m=>/grass terrain|island-grass-ground/.test(m.name));
  const lands=meshes.map(m=>{
    const center=m.getWorldPosition(new T.Vector3()),box=new T.Box3().setFromObject(m);
    return {id:m.name,center,rx:Math.max(1,(box.max.x-box.min.x)/2),rz:Math.max(1,(box.max.z-box.min.z)/2),mesh:m};
  });
  // The first authored landmass is the main island; decorative horizon rocks
  // are absent from the terrain sampler and can never receive a reward.
  return lands.slice(1).filter(l=>Math.min(l.rx,l.rz)>1.5);
}
export class IslandTreasures115{
  constructor(g,ctx){
    this.g=g;this.ctx=ctx;this.T=ctx.T;this.time=0;this.tick=0;this.visualTick=0;
    this.geometry={full:chestGeometry(this.T,false),empty:chestGeometry(this.T,true),glint:new this.T.SphereGeometry(1,4,2)};
    this.material=new this.T.MeshStandardMaterial({vertexColors:true,roughness:.82});
    this.glintMaterial=new this.T.MeshBasicMaterial({color:'#ffe1a0'});
    this.dummy=new this.T.Object3D();this.rebuild();
  }
  clear(){this.root?.removeFromParent();for(const m of this.meshes??[])m.dispose?.();this.meshes=[];}
  rebuild(){
    this.clear();const g=this.g,T=this.T,zone=g.zoneSystem.currentZone,hub=new T.Vector3().fromArray(zone.bounds.center);
    this.root=new T.Group();this.root.name='Small satellite-island treasures';this.root.userData.ignoreShots=true;g.scene.add(this.root);this.items=[];
    const main=(g.terrainSampler?.meshes??[]).find(m=>/grass terrain|island-grass-ground/.test(m.name))?.getWorldPosition(new T.Vector3())??hub;
    for(const land of satelliteIslands115(g,T)){
      const id=`${g.player.zone}:${land.id}`,rand=random19(id),toward=Math.atan2(main.z-land.center.z,main.x-land.center.x);let position=null;
      for(let i=0;i<160;i++){
        const a=toward+(rand()-.5)*Math.PI*1.1,r=.28+rand()*.43;
        const x=land.center.x+Math.cos(a)*land.rx*r,z=land.center.z+Math.sin(a)*land.rz*r;
        if(Math.hypot(x-hub.x,z-hub.z)>zone.bounds.radius-9)continue;
        const dry=g.terrainSampler.dry(x,z,.85);
        if(!dry||dry.y<.08||g.isSolidAt(x,z,.9)||!g.canOccupy(x,z,dry.y+g.playerEyeHeight))continue;
        position=new T.Vector3(x,dry.y+.025,z);break;
      }
      if(!position)continue;
      const tier=Math.max(0,this.ctx.data.zones.findIndex(z=>z.id===g.player.zone));
      this.items.push({id,position,rotation:rand()*Math.PI*2,coins:24+Math.floor(rand()*19)+tier*9,phase:rand()*6.28,ready:false,index:this.items.length});
    }
    const count=this.items.length;
    this.full=new T.InstancedMesh(this.geometry.full,this.material,count);
    this.empty=new T.InstancedMesh(this.geometry.empty,this.material,count);
    this.glints=new T.InstancedMesh(this.geometry.glint,this.glintMaterial,count*3);
    this.full.name='Small treasure chests';this.empty.name='Opened chests waiting for the tide';this.glints.name='Nearby treasure glints';
    for(const m of [this.full,this.empty,this.glints]){m.castShadow=false;m.receiveShadow=m!==this.glints;m.frustumCulled=false;this.root.add(m);this.meshes.push(m);}
    this.refresh(true);this.paintGlints();
  }
  refresh(force=false){
    const state=ledger(this.g),clock=now(this.g);let changed=force;
    for(const item of this.items){const ready=!(Number(state[item.id]?.readyAt)>clock);if(ready!==item.ready){item.ready=ready;changed=true;}}
    if(changed)this.paint();
  }
  paint(){
    const d=this.dummy;
    for(const item of this.items){
      d.position.copy(item.position);d.rotation.set(0,item.rotation,0);
      for(const [mesh,on] of [[this.full,item.ready],[this.empty,!item.ready]]){d.scale.setScalar(on?1:0);d.updateMatrix();mesh.setMatrixAt(item.index,d.matrix);}
    }
    this.full.instanceMatrix.needsUpdate=this.empty.instanceMatrix.needsUpdate=true;
  }
  paintGlints(){
    const g=this.g,d=this.dummy,reduced=g.progression.state.settings.reducedMotion;
    for(const item of this.items){
      const near=item.position.distanceToSquared(g.player.position)<90*90;
      for(let j=0;j<3;j++){
        const t=(reduced?0:this.time*.7)+item.phase+j*2.094;
        d.position.copy(item.position);d.position.x+=Math.cos(t)*.4;d.position.z+=Math.sin(t)*.38;
        d.position.y+=.75+j*.18+(reduced?0:Math.sin(t*1.6)*.09);
        const visible=item.ready&&near;d.scale.set(visible?.042:0,visible?.10:0,visible?.042:0);d.rotation.set(0,t,0);d.updateMatrix();this.glints.setMatrixAt(item.index*3+j,d.matrix);
      }
    }
    this.glints.instanceMatrix.needsUpdate=true;
  }
  available(){const g=this.g;return g.mode==='playing'&&!g.platformPaused&&!g.panelOpen&&!g.intro?.active&&!g.homecoming?.active&&!g.homecoming?.ending&&!g.guide?.active&&!g.boatController?.isPiloting&&!g.deckEncounter&&g.fishing?.state==='idle'&&g.harpoon?.state==='ready';}
  nearby(){
    if(!this.available())return null;const g=this.g;
    const item=this.items.find(item=>Math.hypot(item.position.x-g.player.position.x,item.position.z-g.player.position.z)<2.5&&Math.abs(item.position.y+g.playerEyeHeight-g.player.position.y)<1.1);
    if(!item)return null;
    this.refresh();
    const seconds=Math.max(0,Math.ceil(((ledger(g)[item.id]?.readyAt??0)-now(g))/1000));
    return {id:'treasure115',treasure:item,enabled:item.ready,position:item.position,text:item.ready?`Открыть маленький сундук · +${item.coins} монет`:`Сундук опустел · новый прилив через ${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`};
  }
  collect(item){
    const g=this.g;if(!item||!this.items.includes(item)||!this.available())return false;
    if(Math.hypot(item.position.x-g.player.position.x,item.position.z-g.player.position.z)>2.65||Math.abs(item.position.y+g.playerEyeHeight-g.player.position.y)>1.1)return false;
    const state=ledger(g),clock=now(g),old=state[item.id];if(Number(old?.readyAt)>clock)return false;
    const cycle=clamp(Math.floor(Number(old?.cycle)||0)+1,1,1e6),rand=random19(`${item.id}:tide:${cycle}`);
    const delay=TREASURE_RESPAWN115.minMs+Math.floor(rand()*(TREASURE_RESPAWN115.maxMs-TREASURE_RESPAWN115.minMs));
    // Persist the deadline before reward notifications: repeated E cannot pay twice.
    state[item.id]={readyAt:clock+delay,collectedAt:clock,cycle};item.ready=false;this.paint();this.paintGlints();
    g.progression.addCoins(item.coins,'satellite-island-treasure');g.progression._touch('satellite-treasure-timer');
    g.audio.play('coin',{volume:.6});g.floatingReward(`+${item.coins} ●`,'#ffe1a0',1.2);
    g.toast(`Маленькое сокровище! +${item.coins} монет. Прилив принесёт новое через 12–18 минут.`,'sale');return true;
  }
  update(dt){
    this.root.visible=!this.g.intro?.active;
    if(this.g.mode!=='playing'||this.g.panelOpen||this.g.platformPaused)return;
    this.time+=dt;this.tick-=dt;this.visualTick-=dt;
    if(this.tick<=0){this.tick=1;this.refresh();}
    if(this.visualTick<=0){this.visualTick=this.g.input.isTouch?.12:.08;this.paintGlints();}
  }
  destroy(){this.clear();for(const geo of Object.values(this.geometry))geo.dispose();this.material.dispose();this.glintMaterial.dispose();}
}
export function installTreasures115(ctx){
  const G=ctx.Game.prototype;
  wrap(G,'init',async function(original,...args){const r=await original(...args);this.islandTreasures115=new IslandTreasures115(this,ctx);return r;});
  wrap(G,'handleZoneChanged',function(original,...args){const r=original(...args);this.islandTreasures115?.rebuild();return r;});
  wrap(G,'update',function(original,dt){const r=original(dt);this.islandTreasures115?.update(dt);return r;});
  wrap(G,'updateInteraction',function(original,...args){
    const option=this.islandTreasures115?.nearby();if(!option){this.ui?.['interaction-prompt']?.removeAttribute('aria-disabled');return original(...args);}
    this.interactable=option;const p=this.ui['interaction-prompt'];p.classList.remove('hidden','hint-retired17');p.setAttribute('aria-disabled',String(!option.enabled));
    p.querySelector('kbd').textContent=option.enabled?(this.input.isTouch?'НАЖМИ':'E'):'◷';this.ui['interaction-text'].textContent=option.text;
    // This interaction has priority over older world props. Synchronise the
    // existing mobile E button explicitly rather than consuming E in that chain.
    const button=document.querySelector('[data-touch-key="KeyE"]');
    if(button){button.classList.toggle('is-available17',option.enabled);button.setAttribute('aria-label',option.text);const label=button.querySelector('small');if(label)label.textContent=option.enabled?'СУНДУК':'ПУСТО';}
    if(this.input.consume('KeyE')&&option.enabled)this.performInteraction();
  });
  wrap(G,'performInteraction',function(original,...args){
    if(this.interactable?.id!=='treasure115')return original(...args);
    this.islandTreasures115?.collect(this.interactable.treasure);this.interactable=null;this.ui['interaction-prompt']?.classList.add('hidden');
  });
  wrap(G,'destroy',function(original,...args){this.islandTreasures115?.destroy();return original(...args);});
}
