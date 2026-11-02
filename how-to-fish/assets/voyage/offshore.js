import {wrap,disposeTree} from '../update/helpers.js';
import {healthForSize16} from '../renewal/balance.js';
import {loc} from '../renewal/state.js';
const rank={common:0,uncommon:1,rare:2,epic:3,legendary:4,mythic:5};
const TARGETS={ray_watch:'lagoon_ray',shark_warning:'razorfin_shark',tyrant_bounty:'trench_shark',voice_in_the_depths:'pale_colossus',eye_of_the_storm:'storm_leviathan'};
export function installOffshore17(ctx){
  const {FishSystem:F,Game:G,T}=ctx;
  wrap(F.prototype,'buildSchools',function(original,...args){
    const r=original(...args),zone=ctx.data.zones.find(z=>z.id===this.zoneId),g=this.game;
    if(!zone)return r;
    const origin=new T.Vector3().fromArray(zone.bounds.center),radius=zone.bounds.radius;
    for(let i=0;i<this.schools.length;i++){
      const s=this.schools[i];s.offshore17=i>=2;
      if(i<2){s.anchor=s.center.clone();s.roamRadius=6;continue;}
      // The fishing radius is additional to this distance; the entire school
      // stays beyond a shore cast, but inside the zone's navigable sea.
      const wanted=radius*(i===2?.60:.76);let p=null;
      const dock=g?.zoneSystem?.currentZone?.id===zone.id?g.zoneSystem._dockPose(zone)?.position:null;
      for(let step=0;step<40;step++){
        const a=(i===2?-1.0:1.65)+step*.31,tryP=origin.clone().add(new T.Vector3(Math.cos(a)*wanted,0,Math.sin(a)*wanted));
        if(dock&&Math.hypot(tryP.x-dock.x,tryP.z-dock.z)<60)continue;
        // Test the full school footprint, not just the centre.
        let water=true;
        for(const [x,z] of [[0,0],[15,0],[-15,0],[0,15],[0,-15]]){
          const sample=tryP.clone().add(new T.Vector3(x,0,z));
          if(this.isWaterPoint&&!this.isWaterPoint(sample,2)){water=false;break;}
          if(g?.surfaceAt(sample.x,sample.z)!=null){water=false;break;}
        }
        if(water){p=tryP;break;}
      }
      if(p){s.center.copy(p);s.target.copy(p);s.anchor=p.clone();s.roamRadius=5;s.radius=10;s.quality=.98;s.speed=.55;}
      else s.offshore17=false;
    }
    this._schoolPick17={};return r;
  });
  wrap(F.prototype,'spawnOne',function(original,place='far',forced=null,school=null){
    const touch=this.game?.input.isTouch,budget=touch?20:28;
    this.maxActive=budget;if(this.creatures.length>=budget&&!forced)return null;
    const s=school??this.schools[this.spawnCounter%Math.max(1,this.schools.length)];
    let species=forced;
    if(!species){
      let pool=this.speciesPool().filter(f=>!f.boss&&f.aquatic!==false);
      const current=TARGETS[this.progression?.state.story.activeQuestId];
      const needed=current&&ctx.data.fish.find(f=>f.id===current&&f.spawnZones.includes(this.zoneId));
      if(needed&&!this.creatures.some(f=>f.species.id===needed.id&&!f.dead)&&s?.offshore17)species=needed;
      else if(pool.length){
        if(s?.offshore17){
          const best=[...pool].sort((a,b)=>(rank[b.rarity]??0)-(rank[a.rarity]??0)||b.basePrice-a.basePrice);
          // One rich school showcases rarer species; the other mixes them
          // with large local fish, so a zone survey never depends on a lottery.
          pool=s===this.schools[3]?best.slice(0,Math.max(1,Math.ceil(best.length/2))):best;
        }else{
          const ordinary=pool.filter(f=>(rank[f.rarity]??0)<2);if(ordinary.length)pool=ordinary;
        }
        this._schoolPick17??={};const n=this._schoolPick17[s?.id]??0;this._schoolPick17[s?.id]=n+1;
        species=pool[n%pool.length];
      }
    }
    const f=original(place,species,s);if(!f)return f;
    f.offshore17=!!s?.offshore17;
    return f;
  });
  // Size is chosen before model creation, so model, health, record and value
  // all describe the same real fish. No multiplier is invented at sale time.
  wrap(F.prototype,'createProceduralFish',function(original,f,...args){
    const s=this.schools.find(s=>s.id===f.schoolId);
    if(s?.offshore17){
      const [lo,hi]=f.species.sizeRangeM;
      const pct=.76+this.rng()*.20;f.sizeM=lo+(hi-lo)*pct;
    }
    return original(f,...args);
  });
  wrap(F.prototype,'pickForFishing',function(original,point,power=0,challenge=0){
    if(this.game?.guide?.active)return original(point,power,challenge);
    const school=this.getFishingPotential(point).school;
    if(school){
      const discovered=this.progression.state.discoveredSpecies;
      const candidates=this.creatures.filter(f=>f.schoolId===school.id&&!f.dead&&!f.hooked&&!f.deck&&f.species.catchMethod!=='combat'&&f.species.requiredRodPower<=power*(1.35+challenge*.18));
      // Discoveries first, then the least-caught of the actual fish in range.
      // This changes selection fairness, never creates an invisible catch.
      candidates.sort((a,b)=>(discovered.includes(a.species.id)?1:0)-(discovered.includes(b.species.id)?1:0)||
        (this.progression.state.statistics.catchesBySpecies[a.species.id]??0)-(this.progression.state.statistics.catchesBySpecies[b.species.id]??0)||a.object.position.distanceToSquared(point)-b.object.position.distanceToSquared(point));
      const f=candidates[0];if(f){f.hooked=true;f.state='hooked';return f;}
    }
    return original(point,power,challenge);
  });
  wrap(F.prototype,'update',function(original,dt,...args){
    const r=original(dt,...args);this._storyCheck17=(this._storyCheck17??0)-dt;
    if(this._storyCheck17>0||this.game?.guide?.active)return r;this._storyCheck17=3;
    const id=TARGETS[this.progression.state.story.activeQuestId],f=ctx.data.fish.find(f=>f.id===id&&f.spawnZones.includes(this.zoneId));
    if(!f||this.creatures.some(c=>c.species.id===id&&!c.dead))return r;
    // Bosses are unlocked by a chapter, not by repeated random rolls. Retry
    // after an escape; do not replace or disturb an ongoing encounter.
    if(this.creatures.some(c=>c.species.boss&&!c.dead)||this.game?.oceanEncounter?.fish)return r;
    if(this.creatures.length>=this.maxActive){
      const spare=[...this.creatures].reverse().find(c=>!c.dead&&!c.hooked&&!c.deck&&!c.species.boss&&c.state!=='breach');
      if(spare)this.remove(spare,0);
    }
    this.spawnOne('far',f,this.schools[3]??this.schools[0]);return r;
  });
  G.prototype.rebuildOffshore17=function(){
    if(this.offshoreBuoys17)disposeTree(this.offshoreBuoys17);
    const root=new T.Group();root.name='Offshore fishing beacons';root.userData.ignoreShots=true;this.scene.add(root);this.offshoreBuoys17=root;this.offshoreMarkers17=[];
    const gold=new T.MeshStandardMaterial({color:'#d6b55f',roughness:.72}),teal=new T.MeshStandardMaterial({color:'#307b81',roughness:.8});
    for(const s of this.fishSystem.schools.filter(s=>s.offshore17)){
      const body=new T.Group();root.add(body);
      const ring=new T.Mesh(new T.TorusGeometry(.48,.13,6,16),teal);ring.rotation.x=Math.PI/2;body.add(ring);
      const pole=new T.Mesh(new T.CylinderGeometry(.045,.055,1.8,6),gold);pole.position.y=.8;body.add(pole);
      const flag=new T.Mesh(new T.BoxGeometry(.62,.32,.03),gold);flag.position.set(.27,1.43,0);body.add(flag);
      this.offshoreMarkers17.push({s,body,flag});
    }
  };
  wrap(G.prototype,'init',async function(original,...args){const r=await original(...args);this.rebuildOffshore17();return r;});
  wrap(G.prototype,'handleZoneChanged',function(original,...args){const r=original(...args);this.rebuildOffshore17();return r;});
  wrap(G.prototype,'update',function(original,dt){
    const r=original(dt),time=this.elapsed??0;
    if(this.offshoreBuoys17){
      this.offshoreBuoys17.visible=!this.intro?.active;
      for(const {s,body,flag} of this.offshoreMarkers17){body.position.copy(s.center);body.position.y=.1+Math.sin(time*1.6)*.045;body.rotation.z=Math.sin(time*.9)*.035;flag.rotation.y=Math.sin(time*1.8)*.12;}
    }
    return r;
  });
  wrap(G.prototype,'updateSeaNavigation',function(original,...args){
    original(...args);if(!this.seaNav||this.seaNav.hidden)return;
    const origin=this.player.position,quest=TARGETS[this.progression.state.story.activeQuestId];
    const boss=this.fishSystem.creatures.find(f=>!f.dead&&f.species.id===quest);
    const schools=this.fishSystem.schools.filter(s=>s.offshore17);
    const closest=[...this.fishSystem.schools].sort((a,b)=>a.center.distanceToSquared(origin)-b.center.distanceToSquared(origin))[0];
    const school=closest?.center.distanceTo(origin)<23?closest:[...schools].sort((a,b)=>a.center.distanceToSquared(origin)-b.center.distanceToSquared(origin))[0];
    const target=boss?.object.position??school?.center;
    if(!target)return;
    const distance=Math.hypot(target.x-origin.x,target.z-origin.z),bearing=Math.atan2(-(target.x-origin.x),-(target.z-origin.z));
    const relative=Math.atan2(Math.sin(bearing-this.boatController.state.heading),Math.cos(bearing-this.boatController.state.heading));
    const arrow=Math.abs(relative)<.32?'↑':Math.abs(relative)>2.5?'↓':relative>0?'←':'→';
    this.seaNavTitle.textContent=`${arrow} ${boss?ctx.nameOf(boss.species):school?.offshore17?loc('Богатый косяк','Rich fishing grounds'):loc('Косяк рыбы','Fish school')} · ${Math.round(distance)} ${loc('м','m')}`;
    this.seaNavHint.textContent=boss?loc('Сюжетная цель · приготовь снасти и оружие','Story encounter · ready your tackle and weapon'):distance<23?loc('Забрось с борта в косяк','Cast from the boat into the school'):loc('У золотого буйка — более крупная и редкая рыба','Larger, rarer fish by the gold buoy');
  });
  wrap(G.prototype,'destroy',function(original,...args){disposeTree(this.offshoreBuoys17);return original(...args);});
}
