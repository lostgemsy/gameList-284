import {initializeApp,getApps,getApp} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {getAuth,signInAnonymously} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import {getDatabase,ref,set,update,onValue,onDisconnect,push,get} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

const firebaseConfig={apiKey:"AIzaSyC_mWlv7NuLbedCxc99DL51OlT-VF0-Bog",authDomain:"multiplayer-code.firebaseapp.com",databaseURL:"https://multiplayer-code-default-rtdb.firebaseio.com",projectId:"multiplayer-code",storageBucket:"multiplayer-code.firebasestorage.app",messagingSenderId:"976456965612",appId:"1:976456965612:web:87755c7adde2f16639b4c9"};
const app=getApps().length?getApp():initializeApp(firebaseConfig);
const auth=getAuth(app),db=getDatabase(app);
let user=null,room="",host=false,roomStarted=false;
let playersOff=null,presenceOff=null,chatOff=null,metaOff=null,stateOff=null,sendLoop=null;
let playersSnapshot={},presenceSnapshot={},playersCache={},latestNetworkState=null;
let bodyColor="#38a9ff",bodyStyle="classic",networkRoleInstalled=false;
const remote=new Map(),labels=new Map(),bubbles=new Map();
const $=id=>document.getElementById(id);
const THREE=()=>window.__THREE__||null;
const safeName=s=>String(s||"Player").replace(/[^a-z0-9 _-]/gi,"").trim().slice(0,16)||"Player";
const safeColor=c=>/^#[0-9a-f]{6}$/i.test(c||"")?c:"#38a9ff";
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const css=document.createElement("style");
css.textContent=
'#dsmp{position:fixed;z-index:1001;inset:0;display:grid;place-items:center;background:#07101def;color:#fff;font:700 15px Nunito,Arial}' +
'#dsmp.off,#dsmp[hidden]{display:none!important}#dsmp .card{position:relative;width:min(450px,calc(100vw - 30px));max-height:90vh;overflow:auto;background:#17263d;border:2px solid #52749c;border-radius:18px;padding:58px 20px 20px;box-shadow:0 20px 60px #000}' +
'#dsmp h2{text-align:center;font:30px Luckiest Guy,cursive;margin:5px 0 16px}#dsmp input,#dsmp select{box-sizing:border-box;width:100%;padding:12px;margin:7px 0 12px;border-radius:8px;border:1px solid #526985;background:#091526;color:white}' +
'#dsmp button{border:0;border-radius:8px;padding:12px;margin:4px;background:#2675d8;color:white;font-weight:900;cursor:pointer}#dsmp button:disabled{opacity:.6;cursor:wait}#dsmp .row{display:flex;gap:8px}#dsmp .row button{flex:1}#dsmp .green{background:#15965d}#dsmp .hint{font-size:13px;color:#bdcce0;min-height:18px;line-height:1.45}#dsmp .code{text-align:center;font-size:26px;letter-spacing:5px;color:#8ed5ff}' +
'#dsmp .chat{height:120px;overflow:auto;background:#091526;padding:8px;border-radius:8px;font-size:13px}#dsmp .swatches{display:flex;gap:8px}#dsmp .swatches button{width:30px;height:30px;padding:0;border:2px solid white;border-radius:50%}#dsmp .players{background:#091526;padding:9px;border-radius:8px;margin:8px 0;line-height:1.7}' +
'#dsmp .ds-close-x{position:absolute;top:9px;right:10px;width:42px;height:42px;padding:0;margin:0;border:2px solid #9bb9d8;border-radius:50%;background:#b72e3c;color:#fff;font:900 30px/1 Arial,sans-serif;display:grid;place-items:center;z-index:5;box-shadow:0 3px 0 #641923}' +
'.dsmp-name{position:fixed;z-index:45;pointer-events:none;color:white;font:bold 13px Nunito,Arial;text-shadow:0 2px 5px #000,0 0 8px #000;white-space:nowrap;transform:translate(-50%,-100%)}' +
'.dsmp-bubble{position:fixed;z-index:46;pointer-events:none;max-width:180px;background:#fff;color:#17263d;padding:6px 9px;border-radius:10px;font:700 12px Nunito,Arial;box-shadow:0 2px 8px #0008;transform:translate(-50%,-100%);overflow-wrap:anywhere}';
document.head.append(css);

const panel=document.createElement("div");
panel.id="dsmp";
panel.className="off";
panel.hidden=true;
panel.innerHTML=
'<div class="card"><button id="ds-close-x" class="ds-close-x" type="button" aria-label="Close multiplayer">×</button><h2>ONLINE MULTIPLAYER</h2>' +
'<section id="ds-entry"><label>Username<input id="ds-name" maxlength="16" placeholder="Your name" autocomplete="nickname"></label>' +
'<div>Choose your character color</div><div class="swatches" id="ds-colors"><button data-c="#38a9ff" style="background:#38a9ff"></button><button data-c="#ff5555" style="background:#ff5555"></button><button data-c="#50d890" style="background:#50d890"></button><button data-c="#c58cff" style="background:#c58cff"></button><button data-c="#f4c542" style="background:#f4c542"></button></div>' +
'<div class="row"><button id="ds-create" class="green">CREATE ROOM</button><button id="ds-join">JOIN ROOM</button></div><input id="ds-code-in" maxlength="6" placeholder="Enter room code"><p class="hint" id="ds-hint">Create a room or enter your friend’s code.</p></section>' +
'<section id="ds-lobby" hidden><div class="hint">SHARE THIS ROOM CODE</div><div class="code" id="ds-code"></div><div class="players" id="ds-players"></div>' +
'<label>Character style<select id="ds-style"><option value="classic">Classic</option></select></label>' +
'<div class="chat" id="ds-chat"></div><div class="row"><input id="ds-msg" maxlength="100" placeholder="Message"><button id="ds-send">SEND</button></div>' +
'<p class="hint" id="ds-roomhint">Waiting for players…</p><div class="row"><button id="ds-start" class="green">START GAME (HOST)</button><button id="ds-leave">LEAVE ROOM</button></div></section>' +
'<p class="hint">Everyone in this room loads the same level. The host keeps the monster and moving world synchronized.</p><div class="row"><button id="ds-close">CLOSE</button></div></div>';
document.body.append(panel);

function showEntry(){
 $("ds-entry").hidden=false;
 $("ds-lobby").hidden=true;
 panel.hidden=false;
 panel.classList.remove("off");
}
function showLobby(){
 $("ds-entry").hidden=true;
 $("ds-lobby").hidden=false;
 $("ds-code").textContent=room;
 panel.hidden=false;
 panel.classList.remove("off");
}
function closePanel(){
 panel.classList.add("off");
 panel.hidden=true;
}
async function login(){
 if(!auth.currentUser)await signInAnonymously(auth);
 user=auth.currentUser;
 if(!user)throw new Error("Firebase sign-in did not return a user.");
}
function localPlayer(){
 return window.game&&window.game.players&&window.game.players[0]||null;
}
function playerData(){
 const p=localPlayer(),g=window.game;
 return {
  name:safeName($("ds-name").value),
  color:bodyColor,
  style:bodyStyle,
  x:p?Number(p.pos.x)||0:0,
  y:p?Number(p.pos.y)||0:0,
  z:p?Number(p.pos.z)||0:0,
  yaw:p?Number(p.yaw)||0:0,
  vx:p?Number(p.vel.x)||0:0,
  vy:p?Number(p.vel.y)||0:0,
  vz:p?Number(p.vel.z)||0:0,
  inWater:!!(p&&p.inWater),
  grounded:!!(p&&p.grounded),
  down:!!(p&&p.down),
  frozen:!!(p&&p.frozen),
  dead:!!(p&&p.dead),
  ready:!!(p&&g&&g.state==="playing"),
  host:!!host,
  updated:Date.now()
 };
}
function roomPath(suffix){
 return "rooms/"+room+(suffix?"/"+suffix:"");
}
function renderPlayers(){
 const merged={...playersSnapshot};
 for(const [id,p] of Object.entries(presenceSnapshot))merged[id]={...(merged[id]||{}),...p};
 playersCache=merged;
 const entries=Object.entries(merged);
 $("ds-players").innerHTML=entries.map(([id,p])=>
  '<div><span style="color:'+safeColor(p.color)+'">●</span> <b>'+esc(p.name)+'</b> '+
  (id===user?.uid?"(you) ":"")+(p.host?"— HOST ":"")+(p.ready?"— READY":"")+'</div>'
 ).join("")||"Waiting for players…";
 $("ds-roomhint").textContent=entries.length+" / 4 players connected"+(entries.length<2?" — waiting for your friend":"");
 syncRemotePlayers(merged);
 const hostState=Object.entries(merged).find(([id,p])=>p.host&&p.gameState);
 if(!host&&roomStarted&&hostState){latestNetworkState=hostState[1].gameState;applyNetworkState(latestNetworkState);}
}
function createRoomCode(){
 const chars="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
 let code="";
 for(let i=0;i<6;i++)code+=chars[Math.floor(Math.random()*chars.length)];
 return code;
}
async function createRoom(){
 $("ds-create").disabled=true;
 try{
  await login();
  let exists=true;
  for(let n=0;n<8&&exists;n++){
   room=createRoomCode();
   const snap=await get(ref(db,roomPath("")));
   exists=snap.exists();
  }
  if(exists)throw new Error("Could not reserve a room code. Please try again.");
  host=true;
  await set(ref(db,roomPath("meta")),{host:user.uid,created:Date.now(),started:false});
  await set(ref(db,roomPath("players/"+user.uid)),playerData());
  await onDisconnect(ref(db,roomPath("players/"+user.uid))).remove();
  await enterRoom();
 }catch(e){
  console.error("Firebase create-room error:",e);
  $("ds-hint").textContent="Could not create room: "+firebaseMessage(e);
 }finally{$("ds-create").disabled=false;}
}
async function joinRoom(){
 $("ds-join").disabled=true;
 try{
  await login();
  room=$("ds-code-in").value.trim().toUpperCase();
  if(!/^[A-Z0-9]{6}$/.test(room))throw new Error("Enter a valid 6-character room code.");
  const snap=await get(ref(db,roomPath("")));
  if(!snap.exists())throw new Error("Room not found. Check the code.");
  const meta=snap.child("meta").val()||{};
  if(meta.started)throw new Error("This match has already started. Ask the host to create a new room.");
  const existing=snap.child("players").val()||{};
  if(Object.keys(existing).length>=4&&!existing[user.uid])throw new Error("Room is full (4 players maximum).");
  host=false;
  await set(ref(db,roomPath("players/"+user.uid)),playerData());
  await onDisconnect(ref(db,roomPath("players/"+user.uid))).remove();
  await enterRoom();
 }catch(e){
  console.error("Firebase join-room error:",e);
  $("ds-hint").textContent="Could not join room: "+firebaseMessage(e);
 }finally{$("ds-join").disabled=false;}
}
function firebaseMessage(e){
 if(e&&e.code==="auth/admin-restricted-operation")return "Enable Anonymous sign-in in Firebase Authentication.";
 if(e&&e.code==="PERMISSION_DENIED")return "Firebase denied access. Check your Realtime Database rules.";
 return e&&e.message?e.message:String(e);
}
async function enterRoom(){
 if(playersOff)playersOff();
 if(presenceOff)presenceOff();
 if(chatOff)chatOff();
 if(metaOff)metaOff();
 if(sendLoop)clearInterval(sendLoop);
 playersSnapshot={};
 presenceSnapshot={};
 playersCache={};
 latestNetworkState=null;
 roomStarted=false;
 try{
  await set(ref(db,roomPath("presence/"+user.uid)),playerData());
  await onDisconnect(ref(db,roomPath("presence/"+user.uid))).remove();
 }catch(e){console.warn("Presence registration failed; player list will use room membership.",e);}
 playersOff=onValue(ref(db,roomPath("players")),snap=>{
  playersSnapshot=snap.val()||{};
  renderPlayers();
 },e=>{$("ds-roomhint").textContent="Firebase player list error: "+e.message;console.error(e);});
 presenceOff=onValue(ref(db,roomPath("presence")),snap=>{
  presenceSnapshot=snap.val()||{};
  renderPlayers();
 },e=>{console.warn("Presence listener error:",e);});
 chatOff=onValue(ref(db,roomPath("chat")),snap=>{
  const list=Object.entries(snap.val()||{}).sort((a,b)=>(a[1].time||0)-(b[1].time||0)).slice(-40);
  $("ds-chat").innerHTML=list.map(([id,m])=>"<p><b>"+esc(m.name)+":</b> "+esc(m.text)+"</p>").join("");
  $("ds-chat").scrollTop=$("ds-chat").scrollHeight;
  const latest=list[list.length-1];
  if(latest){
   const m=latest[1],bubble=bubbles.get(m.uid);
   if(bubble){
    bubble.textContent=m.text;
    bubble.hidden=false;
    clearTimeout(bubble._hideTimer);
    bubble._hideTimer=setTimeout(()=>bubble.hidden=true,3500);
   }
  }
 },e=>{$("ds-roomhint").textContent="Firebase chat error: "+e.message;console.error(e);});
 metaOff=onValue(ref(db,roomPath("meta")),snap=>{
  const meta=snap.val()||{};
  if(meta.started&&!roomStarted){
   roomStarted=true;
   startSynchronizedGame(meta);
  }
 },e=>{$("ds-roomhint").textContent="Firebase room error: "+e.message;console.error(e);});
 sendLoop=setInterval(()=>{
  if(!user||!room)return;
  const data=playerData();
  const g=window.game;
  if(host&&roomStarted&&g&&g.state==="playing")data.gameState=buildNetworkState();
  update(ref(db,roomPath("players/"+user.uid)),data).catch(e=>console.warn("Player heartbeat failed:",e));
  update(ref(db,roomPath("presence/"+user.uid)),data).catch(()=>{});
 },100);
 showLobby();
 $("ds-start").hidden=!host;
 renderPlayers();
}
function syncRemotePlayers(data){
 for(const [id,p] of Object.entries(data)){
  if(id===user?.uid)continue;
  let avatar=remote.get(id);
  if(avatar){
   avatar.target={x:Number(p.x)||0,y:Number(p.y)||0,z:Number(p.z)||0,yaw:Number(p.yaw)||0};
   avatar.name=safeName(p.name);
   avatar.tag.style.color=safeColor(p.color);
   avatar.tag.textContent=avatar.name;
  }
 }
 for(const [id,avatar] of remote){
  if(!data[id]){
   window.game?.scene?.remove(avatar.root);
   avatar.tag.remove();
   avatar.bubble.remove();
   remote.delete(id);
   labels.delete(id);
   bubbles.delete(id);
  }
 }
}
function makeRemoteAvatar(id,p){
 const g=window.game,T=THREE(),local=localPlayer();
 if(!g||!T||!local||!local.body||!g.scene)return null;
 const model=local.body.clone(true);
 model.visible=true;
 model.traverse(o=>{
  o.layers.set(0);
  if(o.isMesh){
   if(Array.isArray(o.material))o.material=o.material.map(m=>m.clone());
   else if(o.material)o.material=o.material.clone();
   o.castShadow=true;
   o.receiveShadow=true;
  }
 });
 model.position.set(Number(p.x)||0,Number(p.y)||0,Number(p.z)||0);
 model.rotation.y=Number(p.yaw)||0;
 model.visible=true;
 g.scene.add(model);
 const tag=document.createElement("div");
 tag.className="dsmp-name";
 tag.textContent=safeName(p.name);
 tag.style.color=safeColor(p.color);
 document.body.append(tag);
 const bubble=document.createElement("div");
 bubble.className="dsmp-bubble";
 bubble.hidden=true;
 document.body.append(bubble);
 labels.set(id,tag);
 bubbles.set(id,bubble);
 const avatar={root:model,target:{x:Number(p.x)||0,y:Number(p.y)||0,z:Number(p.z)||0,yaw:Number(p.yaw)||0},name:safeName(p.name),tag,bubble};
 remote.set(id,avatar);
 return avatar;
}
function updateRemoteVisuals(){
 const T=THREE(),g=window.game,local=localPlayer();
 if(T&&g&&local&&local.camera&&g.scene){
  for(const [id,p] of Object.entries(playersCache)){
   if(id===user?.uid)continue;
   let a=remote.get(id);
   if(!a)a=makeRemoteAvatar(id,p);
   if(!a)continue;
   a.target={x:Number(p.x)||0,y:Number(p.y)||0,z:Number(p.z)||0,yaw:Number(p.yaw)||0};
   const target=new T.Vector3(a.target.x,a.target.y,a.target.z);
   a.root.position.lerp(target,.32);
   let yaw=a.target.yaw-currentYaw(a.root.rotation.y,a.target.yaw);
   a.root.rotation.y+=yaw*.32;
   const projected=new T.Vector3(a.target.x,a.target.y+2.05,a.target.z).project(local.camera);
   const x=(projected.x*.5+.5)*window.innerWidth;
   const y=(-projected.y*.5+.5)*window.innerHeight;
   const visible=projected.z>-1&&projected.z<1&&x>-80&&x<window.innerWidth+80&&y>-80&&y<window.innerHeight+80;
   a.tag.style.display=visible?"block":"none";
   a.tag.style.left=x+"px";
   a.tag.style.top=y+"px";
   if(!a.bubble.hidden){
    a.bubble.style.display=visible?"block":"none";
    a.bubble.style.left=x+"px";
    a.bubble.style.top=(y-22)+"px";
   }
  }
 }
 requestAnimationFrame(updateRemoteVisuals);
}
function currentYaw(from,to){
 let d=(to-from+Math.PI)%(Math.PI*2);
 if(d<0)d+=Math.PI*2;
 return d-Math.PI;
}
function buildNetworkState(){
 const g=window.game,w=g&&g.world;
 if(!g||!w)return {updated:Date.now(),monsters:[]};
 return {
  updated:Date.now(),
  seed:Number(g.seed)||0,
  diff:g.diffKey||"easy",
  worldTime:Number(w.time)||0,
  monsters:(g.monsters||[]).map(m=>({
   x:m.pos.x,y:m.pos.y,z:m.pos.z,
   vx:m.vel.x,vy:m.vel.y,vz:m.vel.z,
   yaw:m.yaw,state:m.state,targetX:m.target.x,targetY:m.target.y,targetZ:m.target.z,
   headYaw:m.headYaw,headPitch:m.headPitch,headOpen:m.headOpen,
   lungeY:m.lungeY,gait:m.gait,twitch:m.twitch,stun:m.stun,
   speed:Math.hypot(m.vel.x,m.vel.z),roomIdx:m.roomIdx,
   roomBounds:m.roomBounds||null
  })),
  platforms:w.platforms.map((p,i)=>p.dynamic?{
   i,x:p.pos.x,y:p.pos.y,z:p.pos.z,yaw:p.yaw,
   vx:p.vel.x,vy:p.vel.y,vz:p.vel.z,
   sinkT:p.sinkT,collapsed:!!p.collapsed,collapseT:p.collapseT||0,glow:!!p.glow
  }:null).filter(Boolean),
  memory:w.memory?{
   state:w.memory.state,cooldown:w.memory.cooldown,timer:Number(w.memory.timer)||0,
   total:Number(w.memory.total)||0,lastTick:Number(w.memory.lastTick)||0,shownOnce:!!w.memory.shownOnce,
   dingIdx:Number(w.memory.dingIdx)||0,dingTimer:Number(w.memory.dingTimer)||0
  }:null,
  crushing:w.crushing?{
   active:!!w.crushing.active,timer:Number(w.crushing.timer)||0,openLane:Number.isFinite(w.crushing.openLane)?w.crushing.openLane:-1,
   walls:(w.crushing.walls||[]).map(q=>({W:Number(q.W)||0,H:Number(q.H)||0,D:Number(q.D)||0,finalX:Number(q.finalX)||0,dir:Number(q.dir)||0,x:Number(q.x)||0,state:q.state||"done",hold:Number(q.hold)||0}))
  }:null,
  door:w.door?{open:!!w.door.open,openT:w.door.openT}:null,
  found:(w.found||[]).slice()
 };
}
function installHostAuthority(g){
 if(networkRoleInstalled)return;
 networkRoleInstalled=true;
 const THREE=THREE_NS();
 if(!THREE)return;
 for(const monster of g.monsters||[]){
  const originalSwimmer=monster.swimmer.bind(monster);
  monster.swimmer=function(){
   let nearest=originalSwimmer(),best=nearest?Math.hypot(nearest.pos.x-this.pos.x,nearest.pos.z-this.pos.z):Infinity;
   for(const [id,p] of Object.entries(playersCache)){
    if(id===user?.uid||!p.inWater||p.down||p.frozen||p.dead)continue;
    const d=Math.hypot((Number(p.x)||0)-this.pos.x,(Number(p.z)||0)-this.pos.z);
    if(d<best){
     best=d;
     nearest={pos:{x:Number(p.x)||0,y:0,z:Number(p.z)||0},inWater:true,remoteUid:id};
    }
   }
   return nearest;
  };
 }
}
function THREE_NS(){return window.__THREE__||null;}
function installGuestAuthority(g){
 if(networkRoleInstalled)return;
 networkRoleInstalled=true;
 const w=g.world;
 if(w){
  for(const platform of w.platforms){
   if(platform.dynamic){
    platform.update=function(){
     this.prevPos.copy(this.pos);
     this.prevYaw=this.yaw;
     this.standing=0;
    };
   }
  }
  w._updateMemory=function(){};
  w._updateCrushing=function(){};
 }
 for(const monster of g.monsters||[]){
  const originalUpdate=monster.update.bind(monster);
  monster.update=function(dt){
   const n=this.__mpNetwork;
   if(!n){originalUpdate(dt);return;}
   const alpha=1-Math.exp(-dt*14);
   this.pos.x+=(n.x-this.pos.x)*alpha;
   this.pos.y+=(n.y-this.pos.y)*alpha;
   this.pos.z+=(n.z-this.pos.z)*alpha;
   this.yaw+=currentYaw(this.yaw,Number(n.yaw)||0)*alpha;
   this.vel.set(Number(n.vx)||0,Number(n.vy)||0,Number(n.vz)||0);
   this.state=n.state||this.state;
   this.target.set(Number(n.targetX)||0,Number(n.targetY)||0,Number(n.targetZ)||0);
   this.headYaw=Number(n.headYaw)||0;
   this.headPitch=Number(n.headPitch)||0;
   this.headOpen=Number(n.headOpen)||0;
   this.lungeY=Number(n.lungeY)||0;
   this.gait=Number(n.gait)||0;
   this.twitch=Number(n.twitch)||0;
   this.stun=Number(n.stun)||0;
   this.roomIdx=Number(n.roomIdx)||0;
   if(n.roomBounds)this.roomBounds={...n.roomBounds};
   this.animate(dt,Number(n.speed)||Math.hypot(this.vel.x,this.vel.z));
  };
 }
}
function applyNetworkState(state){
 const g=window.game,T=THREE_NS();
 if(!g||!T||!g.world||!state)return;
 if(Array.isArray(state.monsters)){
  state.monsters.forEach((n,i)=>{
   const m=g.monsters&&g.monsters[i];
   if(m)m.__mpNetwork=n;
  });
 }
 if(Array.isArray(state.platforms)){
  for(const n of state.platforms){
   const p=g.world.platforms[n.i];
   if(!p)continue;
   p.prevPos.copy(p.pos);
   p.pos.set(Number(n.x)||0,Number(n.y)||0,Number(n.z)||0);
   p.yaw=Number(n.yaw)||0;
   p.vel.set(Number(n.vx)||0,Number(n.vy)||0,Number(n.vz)||0);
   p.sinkT=Number(n.sinkT)||0;
   p.collapsed=!!n.collapsed;
   p.collapseT=Number(n.collapseT)||0;
   p.glow=!!n.glow;
   if(p.mesh){
    p.mesh.position.copy(p.pos);
    p.mesh.rotation.y=p.yaw;
    if(p.kind==="memory"&&g.mats){
     p.mesh.material=p.glow?g.mats.platformGlow:g.mats.platformMemory;
    }
   }
  }
 }
 if(Number.isFinite(state.worldTime))g.world.time=state.worldTime;
 if(state.memory&&g.world.memory)Object.assign(g.world.memory,state.memory);
 if(state.door&&g.world.door){
  g.world.door.open=!!state.door.open;
  g.world.door.openT=Number(state.door.openT)||0;
 }
 if(Array.isArray(state.found)&&g.world.found){
  state.found.forEach((found,i)=>{
   if(found&&!g.world.found[i]&&g.world.markFound)g.world.markFound(i);
  });
 }
 if(state.crushing&&g.world.crushing)applyCrushingState(g,state.crushing,T);
}
function applyCrushingState(g,data,T){
 const c=g.world.crushing;
 c.active=!!data.active;
 c.timer=Number(data.timer)||0;
 c.openLane=data.openLane==null?c.openLane:data.openLane;
 const walls=Array.isArray(data.walls)?data.walls:[];
 if(walls.length!==c.walls.length){
  for(const old of c.walls)if(old.mesh&&old.mesh.geometry)old.mesh.geometry.dispose();
  c.group.clear();
  c.walls=[];
  for(const q of walls){
   const mesh=new T.Mesh(new T.BoxGeometry(q.W,q.H,q.D),g.mats.redWall);
   mesh.position.set(q.x,q.H/2-1,(c.z0+c.z1)/2);
   c.group.add(mesh);
   c.walls.push({mesh,W:q.W,H:q.H,D:q.D,finalX:q.finalX,dir:q.dir,x:q.x,state:q.state,hold:q.hold});
  }
 }
 for(let i=0;i<walls.length;i++){
  const q=walls[i],local=c.walls[i];
  if(!local)continue;
  Object.assign(local,{W:q.W,H:q.H,D:q.D,finalX:q.finalX,dir:q.dir,x:q.x,state:q.state,hold:q.hold});
  local.mesh.position.x=q.x;
 }
 if(!walls.length&&c.walls.length){
  for(const old of c.walls)if(old.mesh&&old.mesh.geometry)old.mesh.geometry.dispose();
  c.group.clear();
  c.walls=[];
 }
}
function startSynchronizedGame(meta){
 try{
  const g=window.game;
  if(!g||typeof g.startRun!=="function")throw new Error("Game engine is not ready yet. Reload and try again.");
  const sharedNow=Number(meta.now)||Date.now();
  const sharedSeed=Number(meta.seed)>>>0;
  const diff=["easy","normal","hard"].includes(meta.diff)?meta.diff:"easy";
  if(g.state==="playing"&&(Number(g.seed)>>>0)===sharedSeed){
   installRole(g);
   closePanel();
   return;
  }
  g.mode="solo";
  g.diffKey=diff;
  const neededRandom=(((sharedNow>>>0)^sharedSeed)>>>0)/1e9;
  const oldNow=Date.now,oldRandom=Math.random;
  Date.now=()=>sharedNow;
  Math.random=()=>neededRandom;
  try{g.startRun();}finally{Date.now=oldNow;Math.random=oldRandom;}
  if((Number(g.seed)>>>0)!==sharedSeed){
   console.error("World seed mismatch. Expected",sharedSeed,"received",g.seed);
   $("ds-roomhint").textContent="Warning: world seed mismatch. Please leave and rejoin.";
  }
  installRole(g);
  closePanel();
 }catch(e){
  console.error("Could not start synchronized game:",e);
  $("ds-roomhint").textContent="Game start failed: "+e.message;
 }
}
function installRole(g){
 if(host)installHostAuthority(g);
 else{
  installGuestAuthority(g);
  if(latestNetworkState)applyNetworkState(latestNetworkState);
 }
}
async function startRoomGame(){
 if(!host||!room)return;
 const button=$("ds-start");
 button.disabled=true;
 try{
  const g=window.game,now=Date.now();
  const seed=(now^Math.floor(Math.random()*1e9))>>>0;
  await update(ref(db,roomPath("meta")),{started:true,seed,now,diff:g?.diffKey||"easy",startedAt:now});
  $("ds-roomhint").textContent="Starting the shared game…";
 }catch(e){
  $("ds-roomhint").textContent="Could not start game: "+firebaseMessage(e);
  button.disabled=false;
  console.error("Firebase start-game error:",e);
 }
}
async function sendMessage(){
 const message=$("ds-msg").value.trim().slice(0,100);
 if(!message||!room||!user)return;
 $("ds-msg").value="";
 try{
  await push(ref(db,roomPath("chat")),{uid:user.uid,name:safeName($("ds-name").value),text:message,time:Date.now()});
  const bubble=bubbles.get(user.uid);
  if(bubble){
   bubble.textContent=message;
   bubble.hidden=false;
   clearTimeout(bubble._hideTimer);
   bubble._hideTimer=setTimeout(()=>bubble.hidden=true,3500);
  }
 }catch(e){$("ds-roomhint").textContent="Chat failed: "+firebaseMessage(e);}
}
function leaveRoom(){
 if(user&&room){
  set(ref(db,roomPath("players/"+user.uid)),null).catch(()=>{});
  set(ref(db,roomPath("presence/"+user.uid)),null).catch(()=>{});
 }
 playersOff?.();presenceOff?.();chatOff?.();metaOff?.();
 if(sendLoop)clearInterval(sendLoop);
 for(const [id,a] of remote){
  window.game?.scene?.remove(a.root);
  a.tag.remove();
  a.bubble.remove();
 }
 remote.clear();labels.clear();bubbles.clear();
 playersSnapshot={};presenceSnapshot={};playersCache={};latestNetworkState=null;
 room="";host=false;roomStarted=false;networkRoleInstalled=false;
 showEntry();
}
$("ds-colors").addEventListener("click",e=>{
 const b=e.target.closest("[data-c]");
 if(b)bodyColor=b.dataset.c;
});
$("ds-style").addEventListener("change",e=>bodyStyle=e.target.value);
$("ds-create").onclick=createRoom;
$("ds-join").onclick=joinRoom;
$("ds-start").onclick=startRoomGame;
$("ds-leave").onclick=leaveRoom;
$("ds-send").onclick=sendMessage;
$("ds-msg").addEventListener("keydown",e=>{if(e.key==="Enter")sendMessage();});
$("ds-close").onclick=closePanel;
$("ds-close-x").onclick=closePanel;
requestAnimationFrame(updateRemoteVisuals);
window.addEventListener("beforeunload",()=>{
 if(sendLoop)clearInterval(sendLoop);
});

export function openMultiplayer(){
 if(room)showLobby();
 else showEntry();
}
export default {openMultiplayer};
