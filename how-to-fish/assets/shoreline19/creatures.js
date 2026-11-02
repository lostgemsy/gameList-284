/* Original coastal micro-fauna. Baked coloured surfaces, shared across islands.
 * Every species has a distinct silhouette, face and articulated movement. */
import {ModelBuilder19,tube19} from './geometry.js';
export const SPECIES19=[
  {id:'hermit',ru:'Рак-отшельник',en:'Hermit crab',coins:4,count:4,speed:.19,radius:.38,cooldown:120000,sand:true},
  {id:'gecko',ru:'Островной геккон',en:'Island gecko',coins:5,count:4,speed:.48,radius:.34,cooldown:150000},
  {id:'snail',ru:'Полосатая улитка',en:'Striped snail',coins:2,count:3,speed:.055,radius:.29,cooldown:90000},
  {id:'beetle',ru:'Изумрудный жук',en:'Emerald beetle',coins:2,count:4,speed:.24,radius:.23,cooldown:90000},
  {id:'starfish',ru:'Морская звезда',en:'Starfish',coins:3,count:5,speed:0,radius:.37,cooldown:150000,sand:true},
  {id:'scallop',ru:'Жемчужная раковина',en:'Pearl scallop',coins:3,count:4,speed:0,radius:.28,cooldown:150000,sand:true}
];
function eye(b,x,y,z,r=.025){b.sphere('#202b28',[x,y,z],[r,r*1.15,r*.85],10);b.sphere('#fff4d6',[x-r*.22,y+r*.27,z-r*.74],[r*.25,r*.25,r*.20],6);}
function spiral(T,b,color,center,radius,turns=2.4){
  const points=[];for(let i=0;i<=42;i++){const t=i/42,a=t*Math.PI*2*turns,r=radius*(.10+.90*t);points.push([center[0]+Math.cos(a)*r,center[1]+Math.sin(a)*r,center[2]-.027*t]);}
  b.mesh(tube19(T,points,t=>.012+.031*t,7,72),color);
}
function hermit(T){
  const body=new ModelBuilder19(T),legs=new ModelBuilder19(T),claw=new ModelBuilder19(T);
  body.sphere('#c09d64',[0,.27,.105],[.21,.205,.22],16);body.sphere('#ddbb80',[0,.31,.115],[.15,.17,.20],14);
  spiral(T,body,'#9a703f',[.01,.29,-.07],.14,2.1);
  for(let i=0;i<7;i++){const a=i/7*6.28;body.sphere('#e8d09b',[Math.sin(a)*.155,.29+Math.cos(a)*.15,-.035],[.010,.014,.013],7);}
  body.sphere('#b86446',[0,.113,-.105],[.15,.079,.14]);body.sphere('#da9661',[0,.14,-.17],[.109,.055,.064]);
  for(const s of [-1,1]){body.rod('#d39360',[s*.065,.15,-.19],[s*.074,.26,-.235],.014,.011);eye(body,s*.074,.264,-.24,.021);body.rod('#d9a472',[s*.030,.13,-.221],[s*.049,.14,-.35],.006,.002,5);}
  legs.rod('#bc704b',[0,0,0],[.125,.035,.06],.018,.015,7);legs.rod('#d6a078',[.125,.035,.06],[.18,-.087,.10],.015,.004,7);legs.sphere('#e1b48b',[.127,.032,.06],[.018,.016,.018],7);
  claw.rod('#b86546',[0,0,0],[.09,.025,-.10],.024,.032);claw.sphere('#d17f4d',[.10,.035,-.15],[.065,.048,.083],10);
  claw.rod('#e9bd81',[.08,.04,-.20],[.08,.05,-.274],.022,.004);claw.rod('#bd663e',[.137,.04,-.19],[.114,.045,-.269],.025,.004);
  return [{key:'body',geo:body.finish(),n:1},{key:'leg',geo:legs.finish(),n:6},{key:'claw',geo:claw.finish(),n:2}];
}
function gecko(T){
  const body=new ModelBuilder19(T),leg=new ModelBuilder19(T),tail=new ModelBuilder19(T);
  body.sphere('#568c55',[0,.12,0],[.105,.068,.235],14);body.sphere('#bfca87',[0,.083,-.01],[.085,.028,.192]);
  body.sphere('#78a25f',[0,.153,-.236],[.125,.074,.125],14);body.sphere('#a4b86f',[0,.13,-.319],[.101,.040,.057]);
  for(const s of [-1,1]){body.sphere('#b5ba6d',[s*.083,.194,-.274],[.043,.047,.041],10);eye(body,s*.087,.202,-.296,.029);body.sphere('#273c2c',[s*.043,.151,-.354],[.006,.005,.005],6);}
  for(let i=0;i<11;i++){const z=.16-i*.035;body.sphere(i%2?'#d6d791':'#467344',[.014*Math.sin(i*1.4),.185-Math.abs(z)*.06,z],[.017,.005,.019],8);}
  for(const s of [-1,1])for(let i=0;i<6;i++)body.sphere('#d3d39a',[s*.074,.161,-.12+i*.051],[.006,.004,.009],6);
  leg.rod('#588b52',[0,0,0],[.095,-.015,.029],.028,.021);leg.rod('#7ca261',[.095,-.015,.029],[.123,-.068,-.036],.021,.014);
  for(let i=0;i<4;i++)leg.rod('#b8c282',[.12,-.065,-.035],[.151+i*.008,-.075,-.075+i*.022],.006,.003,5);
  tail.sphere('#67965a',[0,0,.045],[.039,.033,.070],10);return [{key:'body',geo:body.finish(),n:1},{key:'leg',geo:leg.finish(),n:4},{key:'tail',geo:tail.finish(),n:7}];
}
function snail(T){
  const body=new ModelBuilder19(T),head=new ModelBuilder19(T);
  body.sphere('#b6ae77',[0,.041,0],[.104,.030,.27],14);body.sphere('#c1b982',[0,.079,-.167],[.081,.041,.122],12);
  body.sphere('#d3a15f',[0,.208,.075],[.157,.167,.165],16);
  for(let i=0;i<5;i++){const ring=body.torus(i%2?'#725436':'#eed199',.119+i*.006,.009,[0,.208,.038+i*.025],[Math.PI/2,0,0],24);ring.scale.set(1,1,.8);}
  spiral(T,body,'#835b39',[0,.209,-.083],.122,2.3);spiral(T,body,'#eccb85',[0,.209,-.094],.112,2.3);
  head.sphere('#c6be8b',[0,.065,-.266],[.065,.032,.046],12);
  for(const s of [-1,1]){head.rod('#b6ad73',[s*.035,.075,-.25],[s*.072,.174,-.303],.009,.005,7);eye(head,s*.073,.178,-.305,.013);head.rod('#b6ad73',[s*.044,.058,-.283],[s*.075,.061,-.33],.006,.002,6);}
  return [{key:'body',geo:body.finish(),n:1},{key:'head',geo:head.finish(),n:1}];
}
function beetle(T){
  const body=new ModelBuilder19(T),leg=new ModelBuilder19(T);
  body.sphere('#244f46',[0,.092,.018],[.102,.073,.156],14);body.sphere('#6f976e',[0,.069,.013],[.11,.040,.154],14);
  for(const s of [-1,1]){body.sphere('#327e76',[s*.043,.115,.028],[.052,.058,.131],14);body.rod('#c8ac68',[s*.008,.164,-.065],[s*.008,.148,.135],.003,.003,6);body.sphere('#85b59a',[s*.045,.155,-.014],[.018,.007,.053],10);}
  body.sphere('#3f6550',[0,.097,-.13],[.075,.052,.065],12);body.sphere('#315448',[0,.086,-.201],[.051,.039,.046],10);
  for(const s of [-1,1]){eye(body,s*.043,.103,-.22,.014);body.rod('#b0a16b',[s*.024,.091,-.23],[s*.065,.142,-.284],.004,.002,6);}
  leg.rod('#6a7453',[0,0,0],[.085,.018,-.015],.010,.009,6);leg.rod('#8b8b60',[.085,.018,-.015],[.114,-.052,.024],.009,.0025,6);
  return [{key:'body',geo:body.finish(),n:1},{key:'leg',geo:leg.finish(),n:6}];
}
function starfish(T){
  const b=new ModelBuilder19(T),pos=[],idx=[],N=10;
  pos.push(0,.076,0);
  for(let i=0;i<N;i++){const a=i/N*Math.PI*2-Math.PI/2,r=i%2?.122:.375;pos.push(Math.cos(a)*r,i%2?.049:.014,Math.sin(a)*r);}
  pos.push(0,.014,0);
  for(let i=0;i<N;i++){const a=1+i,c=1+(i+1)%N;idx.push(0,c,a,11,a,c);}
  const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(pos,3));geo.setIndex(idx);geo.computeVertexNormals();b.mesh(geo,'#ce8c5d');
  for(let arm=0;arm<5;arm++){const a=arm/5*6.283-Math.PI/2;for(let j=0;j<8;j++){const r=.027+j*.041,y=.081-r*.18;for(const s of [-1,0,1]){const offset=s*.018*(1-r/.42);b.sphere(s?'#e6b480':'#f0c991',[Math.cos(a)*r-Math.sin(a)*offset,y,Math.sin(a)*r+Math.cos(a)*offset],[.007,.0045,.007],6);}}}
  return [{key:'body',geo:b.finish(),n:1}];
}
function scallop(T){
  const bottom=new ModelBuilder19(T),top=new ModelBuilder19(T);bottom.sphere('#bf9b85',[0,.034,0],[.19,.032,.205],14);bottom.sphere('#3f6267',[0,.056,0],[.155,.016,.17],14);bottom.sphere('#e3eee0',[0,.071,-.018],[.042,.035,.042],14);
  top.sphere('#c6a693',[0,.071,.05],[.184,.035,.173],16);
  for(let j=0;j<13;j++){const a=(j/12-.5)*Math.PI*.93,pts=[];for(let k=0;k<6;k++){const u=k/5;pts.push([Math.sin(a)*.181*u,.070+Math.sin(u*Math.PI)*.024,.20-Math.cos(a)*.32*u]);}top.mesh(tube19(T,pts,.003,5,12),j%2?'#e7cbb0':'#977e79');}
  return [{key:'body',geo:bottom.finish(),n:1},{key:'lid',geo:top.finish(),n:1}];
}
export function buildCreature19(T,id){return ({hermit,gecko,snail,beetle,starfish,scallop})[id](T);}
export function posePart19(item,key,j,t,o,reduced=false){
  const id=item.spec.id,phase=item.phase,tick=item.gait,walk=item.walking&&!reduced;
  o.position.set(0,0,0);o.rotation.set(0,0,0);o.scale.set(1,1,1);
  if(key==='body'){if(!reduced&&id!=='starfish')o.position.y=Math.sin(t*1.7+phase)*.003;return;}
  if(key==='leg'){
    const side=j%2?1:-1,k=Math.floor(j/2),n=id==='gecko'?2:3;
    o.position.set(side*(id==='hermit'?.115:id==='gecko'?.069:.075),id==='hermit'?.09:id==='gecko'?.099:.062,(k-(n-1)/2)*(id==='gecko'?.31:.077)+(id==='hermit'?-.13:0));
    o.scale.x=side;o.rotation.y=(k-(n-1)/2)*.42+(walk?Math.sin(tick+j*2.2)*.30:0);o.rotation.z=side*(walk?Math.max(0,Math.cos(tick+j*2.2))*.28:0);return;
  }
  if(key==='claw'){const side=j?1:-1;o.position.set(side*.11,.102,-.182);o.scale.set(side*(j?1:1.16),j?1:1.12,1);o.rotation.y=side*(.18+(reduced?0:Math.sin(t*1.9+phase+j)*.11));return;}
  if(key==='tail'){const u=(j+1)/7;o.position.set(Math.sin(t*3.4+phase-j*.32)*(reduced?0:walk?.075:.016)*u,.091-u*.044,.202+j*.060);o.scale.set(1-u*.85,1-u*.79,1);o.rotation.y=Math.sin(t*3.4+phase-j*.32)*(reduced?0:.16)*u;return;}
  if(key==='head'){o.rotation.y=reduced?0:Math.sin(t*1.2+phase)*.09;return;}
  if(key==='lid'){o.position.set(0,.018,0);o.rotation.x=reduced?-.10:-.10-Math.max(0,Math.sin(t*.65+phase))*.15;}
}
