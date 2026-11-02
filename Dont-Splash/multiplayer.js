import {initializeApp} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {getAuth,signInAnonymously} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import {getDatabase,ref,set,update,onValue,onDisconnect,push} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

const app=initializeApp({apiKey:"AIzaSyC_mWlv7NuLbedCxc99DL51OlT-V0F-Bog",authDomain:"multiplayer-code.firebaseapp.com",databaseURL:"https://multiplayer-code-default-rtdb.firebaseio.com",projectId:"multiplayer-code",storageBucket:"multiplayer-code.firebasestorage.app",messagingSenderId:"976456965612",appId:"1:976456965612:web:87755c7adde2f16639b4c9"});
const auth=getAuth(app),db=getDatabase(app);
let user=null,room="",host=false,playersOff=null,chatOff=null,metaOff=null,sendLoop=null,roomStarted=false,bodyColor="#38a9ff",bodyStyle="classic",localStarted=false,sharedSeed=0,sharedNow=0,sharedDiff="easy";
const remote=new Map(),labels=new Map(),bubbles=new Map();
const $=id=>document.getElementById(id);
const safeName=s=>String(s||"Player").replace(/[^a-z0-9 _-]/gi,"").trim().slice(0,16)||"Player";
const safeColor=c=>/^#[0-9a-f]{6}$/i.test(c||"")?c:"#38a9ff";
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const css=document.createElement("style");
css.textContent=`
#dsmp{position:fixed;z-index:1001;inset:0;display:grid;place-items:center;background:#07101deF;color:#fff;font:700 15px Nunito,Arial}
#dsmp.off{display:none}#dsmp .card{width:min(430px,calc(100vw - 30px));max-height:90vh;overflow:auto;background:#17263d;border:2px solid #52749c;border-radius:18px;padding:20px;box-shadow:0 20px 60px #000}
#dsmp h2{text-align:center;font:30px 'Luckiest Guy',cursive;margin:5px 0 16px}#dsmp input,#dsmp select{box-sizing:border-box;width:100%;padding:12px;margin:7px 0 12px;border-radius:8px;border:1px solid #526985;background:#091526;color:white}
#dsmp button{border:0;border-radius:8px;padding:12px;margin:4px;background:#2675d8;color:white;font-weight:900;cursor:pointer}#dsmp .row{display:flex;gap:8px}#dsmp .row button{flex:1}#dsmp .green{background:#15965d}#dsmp .hint{font-size:13px;color:#bdcce0;min-height:18px}#dsmp .code{text-align:center;font-size:26px;letter-spacing:5px;color:#8ed5ff}
#dsmp .chat{height:120px;overflow:auto;background:#091526;padding:8px;border-radius:8px;font-size:13px}#dsmp .swatches{display:flex;gap:8px}#dsmp .swatches button{width:30px;height:30px;padding:0;border:2px solid white;border-radius:50%}
#dsmp .players{background:#091526;padding:8px;border-radius:8px;margin:8px 0}
#dsmp-controls{position:fixed;z-index:999;left:12px;top:12px;display:flex;gap:6px}#dsmp-open,#dsmp-chat-open{background:#14253c;color:#fff;border:1px solid #7aa4d1;border-radius:9px;padding:9px 12px;font:900 12px Nunito,Arial;letter-spacing:.5px;box-shadow:0 3px 12px #0008;cursor:pointer}
.dsmp-name{position:fixed;z-index:45;pointer-events:none;color:white;font:bold 13px Nunito,Arial;text-shadow:0 2px 5px #000,0 0 8px #000;white-space:nowrap;transform:translate(-50%,-100%)}
.dsmp-bubble{position:fixed;z-index:46;pointer-events:none;max-width:180px;background:#fff;color:#17263d;padding:6px 9px;border-radius:10px;font:700 12px Nunito,Arial;box-shadow:0 2px 8px #0008;transform:translate(-50%,-100%);overflow-wrap:anywhere}
`;
document.head.append(css);
const panel=document.createElement("div");panel.id="dsmp";panel.className="off";
panel.innerHTML=`<div class="card"><h2>ONLINE MULTIPLAYER</h2>
<section id="ds-entry"><label>Username<input id="ds-name" maxlength="16" placeholder="Your name" autocomplete="nickname"></label>
<div>Choose your character color</div><div class="swatches" id="ds-colors"><button data-c="#38a9ff" style="background:#38a9ff"></button><button data-c="#ff5555" style="background:#ff5555"></button><button data-c="#50d890" style="background:#50d890"></button><button data-c="#c58cff" style="background:#c58cff"></button><button data-c="#f4c542" style="background:#f4c542"></button></div>
<div class="row"><button id="ds-create" class="green">CREATE ROOM</button><button id="ds-join">JOIN ROOM</button></div><input id="ds-code-in" maxlength="6" placeholder="Enter room code"><p class="hint" id="ds-hint">Create a room or enter your friend's code.</p></section>
<section id="ds-lobby" hidden><div class="hint">SHARE THIS ROOM CODE</div><div class="code" id="ds-code"></div><div class="players" id="ds-players"></div>
<label>3D body style<select id="ds-style"><option value="classic">Classic</option><option value="tall">Tall</option><option value="round">Round</option></select></label>
<div class="chat" id="ds-chat"></div><div class="row"><input id="ds-msg" maxlength="100" placeholder="Message"><button id="ds-send">SEND</button></div>
<p class="hint" id="ds-roomhint">Waiting for host…</p><div class="row"><button id="ds-start" class="green">START GAME (HOST)</button><button id="ds-leave">LEAVE ROOM</button></div></section>
<p class="hint">The host starts the same game world for everyone in this room.</p><div class="row"><button id="ds-close">CLOSE</button></div></div>`;
document.body.append(panel);
const controls=document.createElement("div");controls.id="dsmp-controls";const openBtn=document.createElement("button");openBtn.id="dsmp-open";openBtn.textContent="ONLINE";const chatBtn=document.createElement("button");chatBtn.id="dsmp-chat-open";chatBtn.textContent="CHAT";controls.append(openBtn,chatBtn);document.body.append(controls);
function showEntry(){ $("ds-entry").hidden=false;$("ds-lobby").hidden=true;panel.classList.remove("off");}
function showLobby(){ $("ds-entry").hidden=true;$("ds-lobby").hidden=false;$("ds-code").textContent=room;panel.classList.remove("off");}
function closePanel(){panel.classList.add("off");}
async function login(){if(!auth.currentUser)await signInAnonymously(auth);user=auth.currentUser;}
function localPlayer(){return window.game?.players?.[0]||null;}
function playerData(){const p=localPlayer();return {name:safeName($("ds-name").value),color:bodyColor,style:bodyStyle,x:p?.pos?.x||0,y:p?.pos?.y||0,z:p?.pos?.z||0,yaw:p?.yaw||0,updated:Date.now()};}
async function createRoom(){
 try{await login();let exists=true;for(let n=0;n<5&&exists;n++){room=Math.random().toString(36).slice(2,8).toUpperCase();const snap=await new Promise(ok=>onValue(ref(db,"rooms/"+room),ok,{onlyOnce:true}));exists=snap.exists();}if(exists)throw Error("Could not reserve a room code. Try again.");host=true;await set(ref(db,"rooms/"+room+"/meta"),{host:user.uid,created:Date.now(),started:false});await set(ref(db,"rooms/"+room+"/players/"+user.uid),{...playerData(),host:true});await onDisconnect(ref(db,"rooms/"+room+"/players/"+user.uid)).remove();await enterRoom();}
 catch(e){$("ds-hint").textContent="Could not create room: "+e.message;}
}
async function joinRoom(){
 try{await login();room=$("ds-code-in").value.trim().toUpperCase();if(!/^[A-Z0-9]{6}$/.test(room))throw Error("Enter a valid 6-character room code.");const s=await new Promise(ok=>onValue(ref(db,"rooms/"+room),ok,{onlyOnce:true}));if(!s.exists())throw Error("Room not found.");const ps=s.child("players").val()||{};if(Object.keys(ps).length>=4&&!ps[user.uid])throw Error("Room is full (4 players maximum).");host=false;await set(ref(db,"rooms/"+room+"/players/"+user.uid),{...playerData(),host:false});await onDisconnect(ref(db,"rooms/"+room+"/players/"+user.uid)).remove();await enterRoom();}
 catch(e){$("ds-hint").textContent=e.message;}
}
async function enterRoom(){
 if(playersOff)playersOff();if(chatOff)chatOff();if(metaOff)metaOff();
 playersOff=onValue(ref(db,"rooms/"+room+"/players"),s=>{const d=s.val()||{};const entries=Object.entries(d);$("ds-players").innerHTML=entries.map(([id,p])=>"<div>● <b style=\"color:"+safeColor(p.color)+"\">"+esc(p.name)+"</b> "+(id===user.uid?"(you)":"")+(p.host?" — HOST":"")+"</div>").join("");$("ds-roomhint").textContent=entries.length+" player(s) connected";syncRemote(d);});
 chatOff=onValue(ref(db,"rooms/"+room+"/chat"),s=>{const list=Object.values(s.val()||{}).sort((a,b)=>(a.time||0)-(b.time||0)).slice(-35);$("ds-chat").innerHTML=list.map(m=>"<p><b>"+esc(m.name)+":</b> "+esc(m.text)+"</p>").join("");$("ds-chat").scrollTop=$("ds-chat").scrollHeight;});
 metaOff=onValue(ref(db,"rooms/"+room+"/meta"),s=>{const m=s.val()||{};if(m.started&&!roomStarted){roomStarted=true;sharedSeed=m.seed;sharedNow=m.now;sharedDiff=m.diff||"easy";startSynchronizedGame();closePanel();}});
 if(sendLoop)clearInterval(sendLoop);sendLoop=setInterval(()=>{if(user&&room)update(ref(db,"rooms/"+room+"/players/"+user.uid),playerData()).catch(()=>{});},100);
 showLobby();$("ds-start").hidden=!host;
}
function getThree(){const g=window.game;if(!g?.scene)return null;let sample=null;g.scene.traverse(o=>{if(!sample&&o.isMesh&&o.geometry&&o.material)sample=o;});if(!sample)return null;return {scene:g.scene,Mesh:sample.constructor,Geometry:sample.geometry.constructor,Attribute:sample.geometry.attributes.position.constructor,Material:sample.material.constructor,sourceMaterial:sample.material};}
function createAvatar(id,p){
 const T=getThree();if(!T)return null;const root=new T.scene.constructor();const col=safeColor(p.color),tall=p.style==="tall",round=p.style==="round",h=tall?1.05:.82,parts=[];
 function piece(color,scale,pos){const geo=new T.Geometry();const v=[];const faces=[[[0,0,1],[1,0,1],[1,1,1],[0,0,1],[1,1,1],[0,1,1]],[[0,0,0],[0,1,0],[1,1,0],[0,0,0],[1,1,0],[1,0,0]],[[0,0,0],[0,0,1],[0,1,1],[0,0,0],[0,1,1],[0,1,0]],[[1,0,0],[1,1,0],[1,1,1],[1,0,0],[1,1,1],[1,0,1]],[[0,1,0],[0,1,1],[1,1,1],[0,1,0],[1,1,1],[1,1,0]],[[0,0,0],[1,0,0],[1,0,1],[0,0,0],[1,0,1],[0,0,1]]];for(const face of faces)for(const q of face)v.push((q[0]-.5)*scale[0],(q[1]-.5)*scale[1],(q[2]-.5)*scale[2]);geo.setAttribute("position",new T.Attribute(new Float32Array(v),3));geo.computeVertexNormals();const mat=T.sourceMaterial.clone();if(mat.color)mat.color.set(color);if("roughness" in mat)mat.roughness=.8;const mesh=new T.Mesh(geo,mat);mesh.position.set(...pos);mesh.castShadow=true;mesh.receiveShadow=true;root.add(mesh);parts.push(mesh);}
 piece(col,round?[.48,.52,.32]:[.32,tall?.78:.56,.25],[0,h,0]);piece("#f0c7a0",[.23,.23,.23],[0,tall?1.86:1.52,0]);piece(col,[.12,.45,.12],[-.42,h,0]);piece(col,[.12,.45,.12],[.42,h,0]);piece("#263448",[.14,.46,.15],[-.17,.25,0]);piece("#263448",[.14,.46,.15],[.17,.25,0]);
 T.scene.add(root);const tag=document.createElement("div");tag.className="dsmp-name";tag.textContent=safeName(p.name);document.body.append(tag);labels.set(id,tag);
 const bubble=document.createElement("div");bubble.className="dsmp-bubble";bubble.hidden=true;document.body.append(bubble);bubbles.set(id,bubble);
 return {root,parts,target:{x:+p.x||0,y:+p.y||0,z:+p.z||0,yaw:+p.yaw||0},name:p.name};
}
function syncRemote(data){
 for(const [id,p] of Object.entries(data)){if(id===user?.uid)continue;let a=remote.get(id);if(!a){a=createAvatar(id,p);if(a)remote.set(id,a);}if(a){a.target={x:+p.x||0,y:+p.y||0,z:+p.z||0,yaw:+p.yaw||0};a.name=p.name;labels.get(id).textContent=safeName(p.name);}}
 for(const [id,a] of remote){if(!data[id]){window.game?.scene?.remove(a.root);for(const m of a.parts){m.geometry.dispose();m.material.dispose();}remote.delete(id);labels.get(id)?.remove();labels.delete(id);bubbles.get(id)?.remove();bubbles.delete(id);}}
}
function startSynchronizedGame(){
 const g=window.game;if(!g||!sharedSeed)return;
 if(g.state==="playing")return;
 g.mode="solo";g.diffKey=sharedDiff;
 const originalNow=Date.now,originalRandom=Math.random;
 Date.now=()=>sharedNow;Math.random=()=>((sharedNow^sharedSeed)>>>0)/1e9;
 try{g.startRun();}finally{Date.now=originalNow;Math.random=originalRandom;}
 localStarted=true;
 const p=localPlayer();if(p){let hash=0;for(const ch of user.uid)hash=(hash*31+ch.charCodeAt(0))|0;p.pos.x+=((Math.abs(hash)%5)-2)*1.25;}
}
async function startRoomGame(){
 if(!host||!room)return;
 const g=window.game;const now=Date.now(),seed=(now^Math.floor(Math.random()*1e9))>>>0;
 await update(ref(db,"rooms/"+room+"/meta"),{started:true,seed,now,diff:g?.diffKey||"easy",startedAt:now});
}
async function sendMessage(){
 const text=$("ds-msg").value.trim().slice(0,100);if(!text||!room||!user)return;$("ds-msg").value="";
 await push(ref(db,"rooms/"+room+"/chat"),{uid:user.uid,name:safeName($("ds-name").value),text,time:Date.now()});
 const bubble=bubbles.get(user.uid);if(bubble){bubble.textContent=text;bubble.hidden=false;setTimeout(()=>bubble.hidden=true,3500);}
}
function render3DLabels(){
 const g=window.game,p=localPlayer();if(!g?.scene||!p?.camera)return;
 for(const [id,a] of remote){const t=a.target;a.root.position.lerp(new a.root.position.constructor(t.x,t.y,t.z),.32);a.root.rotation.y=t.yaw;
 const v=new p.camera.position.constructor(t.x,t.y+2.15,t.z).project(p.camera),tag=labels.get(id),bubble=bubbles.get(id);
 const x=(v.x*.5+.5)*innerWidth,y=(-v.y*.5+.5)*innerHeight,visible=v.z<1&&v.z>-1;
 tag.style.display=visible?"block":"none";tag.style.left=x+"px";tag.style.top=y+"px";
 if(bubble&&!bubble.hidden){bubble.style.display=visible?"block":"none";bubble.style.left=x+"px";bubble.style.top=(y-22)+"px";}
 }
 requestAnimationFrame(render3DLabels);
}
function leaveRoom(){
 if(user&&room)set(ref(db,"rooms/"+room+"/players/"+user.uid),null).catch(()=>{});
 playersOff?.();chatOff?.();metaOff?.();if(sendLoop)clearInterval(sendLoop);
 for(const [id,a] of remote){window.game?.scene?.remove(a.root);a.parts.forEach(m=>{m.geometry.dispose();m.material.dispose();});labels.get(id)?.remove();bubbles.get(id)?.remove();}
 remote.clear();labels.clear();bubbles.clear();room="";host=false;roomStarted=false;localStarted=false;showEntry();
}
function showEntry(){$("ds-entry").hidden=false;$("ds-lobby").hidden=true;panel.classList.remove("off");}
$("ds-colors").addEventListener("click",e=>{const b=e.target.closest("[data-c]");if(b)bodyColor=b.dataset.c;});
$("ds-style").addEventListener("change",e=>bodyStyle=e.target.value);
$("ds-create").onclick=createRoom;$("ds-join").onclick=joinRoom;$("ds-start").onclick=startRoomGame;$("ds-leave").onclick=leaveRoom;
$("ds-send").onclick=sendMessage;$("ds-msg").addEventListener("keydown",e=>{if(e.key==="Enter")sendMessage();});
$("ds-close").onclick=closePanel;openBtn.onclick=()=>{if(room)showLobby();else showEntry();};chatBtn.onclick=()=>{if(room){showLobby();$("ds-msg").focus();}else showEntry();};
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!panel.classList.contains("off"))closePanel();});
render3DLabels();
window.addEventListener("beforeunload",()=>{if(sendLoop)clearInterval(sendLoop);});
