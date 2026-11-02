(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const qa="170",Hc=0,So=1,Vc=2,Xl=1,ql=2,Tn=3,Jn=0,Ue=1,sn=2,Yn=0,ki=1,ta=2,wo=3,bo=4,Gc=5,li=100,Wc=101,Xc=102,qc=103,Yc=104,Kc=200,jc=201,Jc=202,$c=203,ea=204,na=205,Zc=206,Qc=207,th=208,eh=209,nh=210,ih=211,sh=212,rh=213,ah=214,ia=0,sa=1,ra=2,Hi=3,aa=4,oa=5,la=6,ca=7,Yl=0,oh=1,lh=2,Ln=0,ch=1,hh=2,uh=3,dh=4,fh=5,ph=6,mh=7,Kl=300,Vi=301,Gi=302,ha=303,ua=304,nr=306,di=1e3,hi=1001,da=1002,on=1003,gh=1004,_s=1005,dn=1006,cr=1007,ui=1008,In=1009,jl=1010,Jl=1011,fs=1012,Ya=1013,fi=1014,Cn=1015,Kn=1016,Ka=1017,ja=1018,Wi=1020,$l=35902,Zl=1021,Ql=1022,rn=1023,tc=1024,ec=1025,zi=1026,Xi=1027,nc=1028,Ja=1029,ic=1030,$a=1031,Za=1033,qs=33776,Ys=33777,Ks=33778,js=33779,fa=35840,pa=35841,ma=35842,ga=35843,va=36196,_a=37492,xa=37496,ya=37808,Ma=37809,Sa=37810,wa=37811,ba=37812,Ea=37813,Ta=37814,Aa=37815,Ra=37816,Ca=37817,Pa=37818,La=37819,Da=37820,Ia=37821,Js=36492,Ua=36494,Na=36495,sc=36283,Oa=36284,Fa=36285,ka=36286,vh=3200,_h=3201,rc=0,xh=1,Xn="",ve="srgb",pi="srgb-linear",ir="linear",ne="srgb",vi=7680,Eo=519,yh=512,Mh=513,Sh=514,ac=515,wh=516,bh=517,Eh=518,Th=519,za=35044,To="300 es",Pn=2e3,Zs=2001;class Yi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,t);t.target=null}}}const Ae=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],hr=Math.PI/180,Ba=180/Math.PI;function jn(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ae[s&255]+Ae[s>>8&255]+Ae[s>>16&255]+Ae[s>>24&255]+"-"+Ae[t&255]+Ae[t>>8&255]+"-"+Ae[t>>16&15|64]+Ae[t>>24&255]+"-"+Ae[e&63|128]+Ae[e>>8&255]+"-"+Ae[e>>16&255]+Ae[e>>24&255]+Ae[n&255]+Ae[n>>8&255]+Ae[n>>16&255]+Ae[n>>24&255]).toLowerCase()}function Ee(s,t,e){return Math.max(t,Math.min(e,s))}function Ah(s,t){return(s%t+t)%t}function ur(s,t,e){return(1-e)*s+e*t}function un(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function ie(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}class et{constructor(t=0,e=0){et.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ee(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*i+t.x,this.y=r*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ot{constructor(t,e,n,i,r,a,o,l,c){Ot.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c)}set(t,e,n,i,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],p=n[5],g=n[8],v=i[0],m=i[3],f=i[6],_=i[1],S=i[4],x=i[7],L=i[2],A=i[5],b=i[8];return r[0]=a*v+o*_+l*L,r[3]=a*m+o*S+l*A,r[6]=a*f+o*x+l*b,r[1]=c*v+h*_+u*L,r[4]=c*m+h*S+u*A,r[7]=c*f+h*x+u*b,r[2]=d*v+p*_+g*L,r[5]=d*m+p*S+g*A,r[8]=d*f+p*x+g*b,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+i*r*c-i*a*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,d=o*l-h*r,p=c*r-a*l,g=e*u+n*d+i*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=u*v,t[1]=(i*c-h*n)*v,t[2]=(o*n-i*a)*v,t[3]=d*v,t[4]=(h*e-i*l)*v,t[5]=(i*r-o*e)*v,t[6]=p*v,t[7]=(n*l-c*e)*v,t[8]=(a*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-i*c,i*l,-i*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(dr.makeScale(t,e)),this}rotate(t){return this.premultiply(dr.makeRotation(-t)),this}translate(t,e){return this.premultiply(dr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const dr=new Ot;function oc(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function Qs(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Rh(){const s=Qs("canvas");return s.style.display="block",s}const Ao={};function os(s){s in Ao||(Ao[s]=!0,console.warn(s))}function Ch(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function Ph(s){const t=s.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Lh(s){const t=s.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const qt={enabled:!0,workingColorSpace:pi,spaces:{},convert:function(s,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ne&&(s.r=Dn(s.r),s.g=Dn(s.g),s.b=Dn(s.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(s.applyMatrix3(this.spaces[t].toXYZ),s.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ne&&(s.r=Bi(s.r),s.g=Bi(s.g),s.b=Bi(s.b))),s},fromWorkingColorSpace:function(s,t){return this.convert(s,this.workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Xn?ir:this.spaces[s].transfer},getLuminanceCoefficients:function(s,t=this.workingColorSpace){return s.fromArray(this.spaces[t].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,t,e){return s.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function Dn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Bi(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const Ro=[.64,.33,.3,.6,.15,.06],Co=[.2126,.7152,.0722],Po=[.3127,.329],Lo=new Ot().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Do=new Ot().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);qt.define({[pi]:{primaries:Ro,whitePoint:Po,transfer:ir,toXYZ:Lo,fromXYZ:Do,luminanceCoefficients:Co,workingColorSpaceConfig:{unpackColorSpace:ve},outputColorSpaceConfig:{drawingBufferColorSpace:ve}},[ve]:{primaries:Ro,whitePoint:Po,transfer:ne,toXYZ:Lo,fromXYZ:Do,luminanceCoefficients:Co,outputColorSpaceConfig:{drawingBufferColorSpace:ve}}});let _i;class Dh{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{_i===void 0&&(_i=Qs("canvas")),_i.width=t.width,_i.height=t.height;const n=_i.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=_i}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Qs("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=Dn(r[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Dn(e[n]/255)*255):e[n]=Dn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Ih=0;class lc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ih++}),this.uuid=jn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(fr(i[a].image)):r.push(fr(i[a]))}else r=fr(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function fr(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Dh.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Uh=0;class Ne extends Yi{constructor(t=Ne.DEFAULT_IMAGE,e=Ne.DEFAULT_MAPPING,n=hi,i=hi,r=dn,a=ui,o=rn,l=In,c=Ne.DEFAULT_ANISOTROPY,h=Xn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Uh++}),this.uuid=jn(),this.name="",this.source=new lc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new et(0,0),this.repeat=new et(1,1),this.center=new et(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ot,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Kl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case di:t.x=t.x-Math.floor(t.x);break;case hi:t.x=t.x<0?0:1;break;case da:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case di:t.y=t.y-Math.floor(t.y);break;case hi:t.y=t.y<0?0:1;break;case da:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ne.DEFAULT_IMAGE=null;Ne.DEFAULT_MAPPING=Kl;Ne.DEFAULT_ANISOTROPY=1;class se{constructor(t=0,e=0,n=0,i=1){se.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],p=l[5],g=l[9],v=l[2],m=l[6],f=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const S=(c+1)/2,x=(p+1)/2,L=(f+1)/2,A=(h+d)/4,b=(u+v)/4,R=(g+m)/4;return S>x&&S>L?S<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(S),i=A/n,r=b/n):x>L?x<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(x),n=A/i,r=R/i):L<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(L),n=b/r,i=R/r),this.set(n,i,r,e),this}let _=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(_)<.001&&(_=1),this.x=(m-g)/_,this.y=(u-v)/_,this.z=(d-h)/_,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Nh extends Yi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new se(0,0,t,e),this.scissorTest=!1,this.viewport=new se(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:dn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Ne(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new lc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class fn extends Nh{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class cc extends Ne{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=on,this.minFilter=on,this.wrapR=hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Oh extends Ne{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=on,this.minFilter=on,this.wrapR=hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ps{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const d=r[a+0],p=r[a+1],g=r[a+2],v=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=d,t[e+1]=p,t[e+2]=g,t[e+3]=v;return}if(u!==v||l!==d||c!==p||h!==g){let m=1-o;const f=l*d+c*p+h*g+u*v,_=f>=0?1:-1,S=1-f*f;if(S>Number.EPSILON){const L=Math.sqrt(S),A=Math.atan2(L,f*_);m=Math.sin(m*A)/L,o=Math.sin(o*A)/L}const x=o*_;if(l=l*m+d*x,c=c*m+p*x,h=h*m+g*x,u=u*m+v*x,m===1-o){const L=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=L,c*=L,h*=L,u*=L}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,r,a){const o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[a],d=r[a+1],p=r[a+2],g=r[a+3];return t[e]=o*g+h*u+l*p-c*d,t[e+1]=l*g+h*d+c*u-o*p,t[e+2]=c*g+h*p+o*d-l*u,t[e+3]=h*g-o*u-l*d-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),u=o(r/2),d=l(n/2),p=l(i/2),g=l(r/2);switch(a){case"XYZ":this._x=d*h*u+c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u-d*p*g;break;case"YXZ":this._x=d*h*u+c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u+d*p*g;break;case"ZXY":this._x=d*h*u-c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u-d*p*g;break;case"ZYX":this._x=d*h*u-c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u+d*p*g;break;case"YZX":this._x=d*h*u+c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u-d*p*g;break;case"XZY":this._x=d*h*u-c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+o+u;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(a-i)*p}else if(n>o&&n>u){const p=2*Math.sqrt(1+n-o-u);this._w=(h-l)/p,this._x=.25*p,this._y=(i+a)/p,this._z=(r+c)/p}else if(o>u){const p=2*Math.sqrt(1+o-n-u);this._w=(r-c)/p,this._x=(i+a)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+u-n-o);this._w=(a-i)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ee(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+i*c-r*l,this._y=i*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+i*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-e;return this._w=p*a+e*this._w,this._x=p*n+e*this._x,this._y=p*i+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class T{constructor(t=0,e=0,n=0){T.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Io.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Io.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*i-o*n),h=2*(o*e-r*i),u=2*(r*n-a*e);return this.x=e+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=i+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return pr.copy(this).projectOnVector(t),this.sub(pr)}reflect(t){return this.sub(pr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ee(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const pr=new T,Io=new ps;class ms{constructor(t=new T(1/0,1/0,1/0),e=new T(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Qe.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Qe.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Qe.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Qe):Qe.fromBufferAttribute(r,a),Qe.applyMatrix4(t.matrixWorld),this.expandByPoint(Qe);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),xs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),xs.copy(n.boundingBox)),xs.applyMatrix4(t.matrixWorld),this.union(xs)}const i=t.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Qe),Qe.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter($i),ys.subVectors(this.max,$i),xi.subVectors(t.a,$i),yi.subVectors(t.b,$i),Mi.subVectors(t.c,$i),Fn.subVectors(yi,xi),kn.subVectors(Mi,yi),Qn.subVectors(xi,Mi);let e=[0,-Fn.z,Fn.y,0,-kn.z,kn.y,0,-Qn.z,Qn.y,Fn.z,0,-Fn.x,kn.z,0,-kn.x,Qn.z,0,-Qn.x,-Fn.y,Fn.x,0,-kn.y,kn.x,0,-Qn.y,Qn.x,0];return!mr(e,xi,yi,Mi,ys)||(e=[1,0,0,0,1,0,0,0,1],!mr(e,xi,yi,Mi,ys))?!1:(Ms.crossVectors(Fn,kn),e=[Ms.x,Ms.y,Ms.z],mr(e,xi,yi,Mi,ys))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Qe).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Qe).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(_n[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),_n[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),_n[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),_n[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),_n[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),_n[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),_n[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),_n[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(_n),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const _n=[new T,new T,new T,new T,new T,new T,new T,new T],Qe=new T,xs=new ms,xi=new T,yi=new T,Mi=new T,Fn=new T,kn=new T,Qn=new T,$i=new T,ys=new T,Ms=new T,ti=new T;function mr(s,t,e,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){ti.fromArray(s,r);const o=i.x*Math.abs(ti.x)+i.y*Math.abs(ti.y)+i.z*Math.abs(ti.z),l=t.dot(ti),c=e.dot(ti),h=n.dot(ti);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Fh=new ms,Zi=new T,gr=new T;class sr{constructor(t=new T,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Fh.setFromPoints(t).getCenter(n);let i=0;for(let r=0,a=t.length;r<a;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Zi.subVectors(t,this.center);const e=Zi.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Zi,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(gr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Zi.copy(t.center).add(gr)),this.expandByPoint(Zi.copy(t.center).sub(gr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const xn=new T,vr=new T,Ss=new T,zn=new T,_r=new T,ws=new T,xr=new T;class hc{constructor(t=new T,e=new T(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,xn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=xn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(xn.copy(this.origin).addScaledVector(this.direction,e),xn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){vr.copy(t).add(e).multiplyScalar(.5),Ss.copy(e).sub(t).normalize(),zn.copy(this.origin).sub(vr);const r=t.distanceTo(e)*.5,a=-this.direction.dot(Ss),o=zn.dot(this.direction),l=-zn.dot(Ss),c=zn.lengthSq(),h=Math.abs(1-a*a);let u,d,p,g;if(h>0)if(u=a*l-o,d=a*o-l,g=r*h,u>=0)if(d>=-g)if(d<=g){const v=1/h;u*=v,d*=v,p=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=r,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),p=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),p=d*(d+2*l)+c):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),p=-u*u+d*(d+2*l)+c);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(vr).addScaledVector(Ss,d),p}intersectSphere(t,e){xn.subVectors(t.center,this.origin);const n=xn.dot(this.direction),i=xn.dot(xn)-n*n,r=t.radius*t.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,i=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,i=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,a=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,a=(t.min.y-d.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),u>=0?(o=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(o=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,xn)!==null}intersectTriangle(t,e,n,i,r){_r.subVectors(e,t),ws.subVectors(n,t),xr.crossVectors(_r,ws);let a=this.direction.dot(xr),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;zn.subVectors(this.origin,t);const l=o*this.direction.dot(ws.crossVectors(zn,ws));if(l<0)return null;const c=o*this.direction.dot(_r.cross(zn));if(c<0||l+c>a)return null;const h=-o*zn.dot(xr);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Zt{constructor(t,e,n,i,r,a,o,l,c,h,u,d,p,g,v,m){Zt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c,h,u,d,p,g,v,m)}set(t,e,n,i,r,a,o,l,c,h,u,d,p,g,v,m){const f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=i,f[1]=r,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=h,f[10]=u,f[14]=d,f[3]=p,f[7]=g,f[11]=v,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Zt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/Si.setFromMatrixColumn(t,0).length(),r=1/Si.setFromMatrixColumn(t,1).length(),a=1/Si.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=a*h,p=a*u,g=o*h,v=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=p+g*c,e[5]=d-v*c,e[9]=-o*l,e[2]=v-d*c,e[6]=g+p*c,e[10]=a*l}else if(t.order==="YXZ"){const d=l*h,p=l*u,g=c*h,v=c*u;e[0]=d+v*o,e[4]=g*o-p,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=p*o-g,e[6]=v+d*o,e[10]=a*l}else if(t.order==="ZXY"){const d=l*h,p=l*u,g=c*h,v=c*u;e[0]=d-v*o,e[4]=-a*u,e[8]=g+p*o,e[1]=p+g*o,e[5]=a*h,e[9]=v-d*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const d=a*h,p=a*u,g=o*h,v=o*u;e[0]=l*h,e[4]=g*c-p,e[8]=d*c+v,e[1]=l*u,e[5]=v*c+d,e[9]=p*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const d=a*l,p=a*c,g=o*l,v=o*c;e[0]=l*h,e[4]=v-d*u,e[8]=g*u+p,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=p*u+g,e[10]=d-v*u}else if(t.order==="XZY"){const d=a*l,p=a*c,g=o*l,v=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+v,e[5]=a*h,e[9]=p*u-g,e[2]=g*u-p,e[6]=o*h,e[10]=v*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(kh,t,zh)}lookAt(t,e,n){const i=this.elements;return He.subVectors(t,e),He.lengthSq()===0&&(He.z=1),He.normalize(),Bn.crossVectors(n,He),Bn.lengthSq()===0&&(Math.abs(n.z)===1?He.x+=1e-4:He.z+=1e-4,He.normalize(),Bn.crossVectors(n,He)),Bn.normalize(),bs.crossVectors(He,Bn),i[0]=Bn.x,i[4]=bs.x,i[8]=He.x,i[1]=Bn.y,i[5]=bs.y,i[9]=He.y,i[2]=Bn.z,i[6]=bs.z,i[10]=He.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],p=n[13],g=n[2],v=n[6],m=n[10],f=n[14],_=n[3],S=n[7],x=n[11],L=n[15],A=i[0],b=i[4],R=i[8],M=i[12],y=i[1],P=i[5],F=i[9],I=i[13],k=i[2],V=i[6],W=i[10],Y=i[14],G=i[3],nt=i[7],ht=i[11],vt=i[15];return r[0]=a*A+o*y+l*k+c*G,r[4]=a*b+o*P+l*V+c*nt,r[8]=a*R+o*F+l*W+c*ht,r[12]=a*M+o*I+l*Y+c*vt,r[1]=h*A+u*y+d*k+p*G,r[5]=h*b+u*P+d*V+p*nt,r[9]=h*R+u*F+d*W+p*ht,r[13]=h*M+u*I+d*Y+p*vt,r[2]=g*A+v*y+m*k+f*G,r[6]=g*b+v*P+m*V+f*nt,r[10]=g*R+v*F+m*W+f*ht,r[14]=g*M+v*I+m*Y+f*vt,r[3]=_*A+S*y+x*k+L*G,r[7]=_*b+S*P+x*V+L*nt,r[11]=_*R+S*F+x*W+L*ht,r[15]=_*M+S*I+x*Y+L*vt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],p=t[14],g=t[3],v=t[7],m=t[11],f=t[15];return g*(+r*l*u-i*c*u-r*o*d+n*c*d+i*o*p-n*l*p)+v*(+e*l*p-e*c*d+r*a*d-i*a*p+i*c*h-r*l*h)+m*(+e*c*u-e*o*p-r*a*u+n*a*p+r*o*h-n*c*h)+f*(-i*o*h-e*l*u+e*o*d+i*a*u-n*a*d+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],p=t[11],g=t[12],v=t[13],m=t[14],f=t[15],_=u*m*c-v*d*c+v*l*p-o*m*p-u*l*f+o*d*f,S=g*d*c-h*m*c-g*l*p+a*m*p+h*l*f-a*d*f,x=h*v*c-g*u*c+g*o*p-a*v*p-h*o*f+a*u*f,L=g*u*l-h*v*l-g*o*d+a*v*d+h*o*m-a*u*m,A=e*_+n*S+i*x+r*L;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const b=1/A;return t[0]=_*b,t[1]=(v*d*r-u*m*r-v*i*p+n*m*p+u*i*f-n*d*f)*b,t[2]=(o*m*r-v*l*r+v*i*c-n*m*c-o*i*f+n*l*f)*b,t[3]=(u*l*r-o*d*r-u*i*c+n*d*c+o*i*p-n*l*p)*b,t[4]=S*b,t[5]=(h*m*r-g*d*r+g*i*p-e*m*p-h*i*f+e*d*f)*b,t[6]=(g*l*r-a*m*r-g*i*c+e*m*c+a*i*f-e*l*f)*b,t[7]=(a*d*r-h*l*r+h*i*c-e*d*c-a*i*p+e*l*p)*b,t[8]=x*b,t[9]=(g*u*r-h*v*r-g*n*p+e*v*p+h*n*f-e*u*f)*b,t[10]=(a*v*r-g*o*r+g*n*c-e*v*c-a*n*f+e*o*f)*b,t[11]=(h*o*r-a*u*r-h*n*c+e*u*c+a*n*p-e*o*p)*b,t[12]=L*b,t[13]=(h*v*i-g*u*i+g*n*d-e*v*d-h*n*m+e*u*m)*b,t[14]=(g*o*i-a*v*i-g*n*l+e*v*l+a*n*m-e*o*m)*b,t[15]=(a*u*i-h*o*i+h*n*l-e*u*l-a*n*d+e*o*d)*b,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,a){return this.set(1,n,r,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,d=r*c,p=r*h,g=r*u,v=a*h,m=a*u,f=o*u,_=l*c,S=l*h,x=l*u,L=n.x,A=n.y,b=n.z;return i[0]=(1-(v+f))*L,i[1]=(p+x)*L,i[2]=(g-S)*L,i[3]=0,i[4]=(p-x)*A,i[5]=(1-(d+f))*A,i[6]=(m+_)*A,i[7]=0,i[8]=(g+S)*b,i[9]=(m-_)*b,i[10]=(1-(d+v))*b,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let r=Si.set(i[0],i[1],i[2]).length();const a=Si.set(i[4],i[5],i[6]).length(),o=Si.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],tn.copy(this);const c=1/r,h=1/a,u=1/o;return tn.elements[0]*=c,tn.elements[1]*=c,tn.elements[2]*=c,tn.elements[4]*=h,tn.elements[5]*=h,tn.elements[6]*=h,tn.elements[8]*=u,tn.elements[9]*=u,tn.elements[10]*=u,e.setFromRotationMatrix(tn),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,i,r,a,o=Pn){const l=this.elements,c=2*r/(e-t),h=2*r/(n-i),u=(e+t)/(e-t),d=(n+i)/(n-i);let p,g;if(o===Pn)p=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Zs)p=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,r,a,o=Pn){const l=this.elements,c=1/(e-t),h=1/(n-i),u=1/(a-r),d=(e+t)*c,p=(n+i)*h;let g,v;if(o===Pn)g=(a+r)*u,v=-2*u;else if(o===Zs)g=r*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Si=new T,tn=new Zt,kh=new T(0,0,0),zh=new T(1,1,1),Bn=new T,bs=new T,He=new T,Uo=new Zt,No=new ps;class pn{constructor(t=0,e=0,n=0,i=pn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],p=i[10];switch(e){case"XYZ":this._y=Math.asin(Ee(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ee(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ee(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ee(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ee(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Ee(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Uo.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Uo,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return No.setFromEuler(this),this.setFromQuaternion(No,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}pn.DEFAULT_ORDER="XYZ";class uc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Bh=0;const Oo=new T,wi=new ps,yn=new Zt,Es=new T,Qi=new T,Hh=new T,Vh=new ps,Fo=new T(1,0,0),ko=new T(0,1,0),zo=new T(0,0,1),Bo={type:"added"},Gh={type:"removed"},bi={type:"childadded",child:null},yr={type:"childremoved",child:null};class _e extends Yi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Bh++}),this.uuid=jn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=_e.DEFAULT_UP.clone();const t=new T,e=new pn,n=new ps,i=new T(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Zt},normalMatrix:{value:new Ot}}),this.matrix=new Zt,this.matrixWorld=new Zt,this.matrixAutoUpdate=_e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=_e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new uc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return wi.setFromAxisAngle(t,e),this.quaternion.multiply(wi),this}rotateOnWorldAxis(t,e){return wi.setFromAxisAngle(t,e),this.quaternion.premultiply(wi),this}rotateX(t){return this.rotateOnAxis(Fo,t)}rotateY(t){return this.rotateOnAxis(ko,t)}rotateZ(t){return this.rotateOnAxis(zo,t)}translateOnAxis(t,e){return Oo.copy(t).applyQuaternion(this.quaternion),this.position.add(Oo.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Fo,t)}translateY(t){return this.translateOnAxis(ko,t)}translateZ(t){return this.translateOnAxis(zo,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(yn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Es.copy(t):Es.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Qi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yn.lookAt(Qi,Es,this.up):yn.lookAt(Es,Qi,this.up),this.quaternion.setFromRotationMatrix(yn),i&&(yn.extractRotation(i.matrixWorld),wi.setFromRotationMatrix(yn),this.quaternion.premultiply(wi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Bo),bi.child=t,this.dispatchEvent(bi),bi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Gh),yr.child=t,this.dispatchEvent(yr),yr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),yn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),yn.multiply(t.parent.matrixWorld)),t.applyMatrix4(yn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Bo),bi.child=t,this.dispatchEvent(bi),bi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qi,t,Hh),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qi,Vh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));i.material=o}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),d=a(t.skeletons),p=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}_e.DEFAULT_UP=new T(0,1,0);_e.DEFAULT_MATRIX_AUTO_UPDATE=!0;_e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const en=new T,Mn=new T,Mr=new T,Sn=new T,Ei=new T,Ti=new T,Ho=new T,Sr=new T,wr=new T,br=new T,Er=new se,Tr=new se,Ar=new se;class je{constructor(t=new T,e=new T,n=new T){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),en.subVectors(t,e),i.cross(en);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){en.subVectors(i,e),Mn.subVectors(n,e),Mr.subVectors(t,e);const a=en.dot(en),o=en.dot(Mn),l=en.dot(Mr),c=Mn.dot(Mn),h=Mn.dot(Mr),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const d=1/u,p=(c*l-o*h)*d,g=(a*h-o*l)*d;return r.set(1-p-g,g,p)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Sn)===null?!1:Sn.x>=0&&Sn.y>=0&&Sn.x+Sn.y<=1}static getInterpolation(t,e,n,i,r,a,o,l){return this.getBarycoord(t,e,n,i,Sn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Sn.x),l.addScaledVector(a,Sn.y),l.addScaledVector(o,Sn.z),l)}static getInterpolatedAttribute(t,e,n,i,r,a){return Er.setScalar(0),Tr.setScalar(0),Ar.setScalar(0),Er.fromBufferAttribute(t,e),Tr.fromBufferAttribute(t,n),Ar.fromBufferAttribute(t,i),a.setScalar(0),a.addScaledVector(Er,r.x),a.addScaledVector(Tr,r.y),a.addScaledVector(Ar,r.z),a}static isFrontFacing(t,e,n,i){return en.subVectors(n,e),Mn.subVectors(t,e),en.cross(Mn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return en.subVectors(this.c,this.b),Mn.subVectors(this.a,this.b),en.cross(Mn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return je.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return je.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return je.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return je.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return je.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let a,o;Ei.subVectors(i,n),Ti.subVectors(r,n),Sr.subVectors(t,n);const l=Ei.dot(Sr),c=Ti.dot(Sr);if(l<=0&&c<=0)return e.copy(n);wr.subVectors(t,i);const h=Ei.dot(wr),u=Ti.dot(wr);if(h>=0&&u<=h)return e.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(Ei,a);br.subVectors(t,r);const p=Ei.dot(br),g=Ti.dot(br);if(g>=0&&p<=g)return e.copy(r);const v=p*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(Ti,o);const m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return Ho.subVectors(r,i),o=(u-h)/(u-h+(p-g)),e.copy(i).addScaledVector(Ho,o);const f=1/(m+v+d);return a=v*f,o=d*f,e.copy(n).addScaledVector(Ei,a).addScaledVector(Ti,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const dc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Hn={h:0,s:0,l:0},Ts={h:0,s:0,l:0};function Rr(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class zt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ve){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,qt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=qt.workingColorSpace){return this.r=t,this.g=e,this.b=n,qt.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=qt.workingColorSpace){if(t=Ah(t,1),e=Ee(e,0,1),n=Ee(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Rr(a,r,t+1/3),this.g=Rr(a,r,t),this.b=Rr(a,r,t-1/3)}return qt.toWorkingColorSpace(this,i),this}setStyle(t,e=ve){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ve){const n=dc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Dn(t.r),this.g=Dn(t.g),this.b=Dn(t.b),this}copyLinearToSRGB(t){return this.r=Bi(t.r),this.g=Bi(t.g),this.b=Bi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ve){return qt.fromWorkingColorSpace(Re.copy(this),t),Math.round(Ee(Re.r*255,0,255))*65536+Math.round(Ee(Re.g*255,0,255))*256+Math.round(Ee(Re.b*255,0,255))}getHexString(t=ve){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=qt.workingColorSpace){qt.fromWorkingColorSpace(Re.copy(this),e);const n=Re.r,i=Re.g,r=Re.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=qt.workingColorSpace){return qt.fromWorkingColorSpace(Re.copy(this),e),t.r=Re.r,t.g=Re.g,t.b=Re.b,t}getStyle(t=ve){qt.fromWorkingColorSpace(Re.copy(this),t);const e=Re.r,n=Re.g,i=Re.b;return t!==ve?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Hn),this.setHSL(Hn.h+t,Hn.s+e,Hn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Hn),t.getHSL(Ts);const n=ur(Hn.h,Ts.h,e),i=ur(Hn.s,Ts.s,e),r=ur(Hn.l,Ts.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Re=new zt;zt.NAMES=dc;let Wh=0;class mi extends Yi{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Wh++}),this.uuid=jn(),this.name="",this.blending=ki,this.side=Jn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ea,this.blendDst=na,this.blendEquation=li,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new zt(0,0,0),this.blendAlpha=0,this.depthFunc=Hi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Eo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=vi,this.stencilZFail=vi,this.stencilZPass=vi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ki&&(n.blending=this.blending),this.side!==Jn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ea&&(n.blendSrc=this.blendSrc),this.blendDst!==na&&(n.blendDst=this.blendDst),this.blendEquation!==li&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Hi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Eo&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==vi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==vi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==vi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=i(t.textures),a=i(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class an extends mi{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new pn,this.combine=Yl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const me=new T,As=new et;class ze{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=za,this.updateRanges=[],this.gpuType=Cn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)As.fromBufferAttribute(this,e),As.applyMatrix3(t),this.setXY(e,As.x,As.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)me.fromBufferAttribute(this,e),me.applyMatrix3(t),this.setXYZ(e,me.x,me.y,me.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)me.fromBufferAttribute(this,e),me.applyMatrix4(t),this.setXYZ(e,me.x,me.y,me.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)me.fromBufferAttribute(this,e),me.applyNormalMatrix(t),this.setXYZ(e,me.x,me.y,me.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)me.fromBufferAttribute(this,e),me.transformDirection(t),this.setXYZ(e,me.x,me.y,me.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=un(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ie(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=un(e,this.array)),e}setX(t,e){return this.normalized&&(e=ie(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=un(e,this.array)),e}setY(t,e){return this.normalized&&(e=ie(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=un(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ie(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=un(e,this.array)),e}setW(t,e){return this.normalized&&(e=ie(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ie(e,this.array),n=ie(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=ie(e,this.array),n=ie(n,this.array),i=ie(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=ie(e,this.array),n=ie(n,this.array),i=ie(i,this.array),r=ie(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==za&&(t.usage=this.usage),t}}class fc extends ze{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class pc extends ze{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Qt extends ze{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Xh=0;const Ye=new Zt,Cr=new _e,Ai=new T,Ve=new ms,ts=new ms,Me=new T;class be extends Yi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Xh++}),this.uuid=jn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(oc(t)?pc:fc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ot().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ye.makeRotationFromQuaternion(t),this.applyMatrix4(Ye),this}rotateX(t){return Ye.makeRotationX(t),this.applyMatrix4(Ye),this}rotateY(t){return Ye.makeRotationY(t),this.applyMatrix4(Ye),this}rotateZ(t){return Ye.makeRotationZ(t),this.applyMatrix4(Ye),this}translate(t,e,n){return Ye.makeTranslation(t,e,n),this.applyMatrix4(Ye),this}scale(t,e,n){return Ye.makeScale(t,e,n),this.applyMatrix4(Ye),this}lookAt(t){return Cr.lookAt(t),Cr.updateMatrix(),this.applyMatrix4(Cr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ai).negate(),this.translate(Ai.x,Ai.y,Ai.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,r=t.length;i<r;i++){const a=t[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Qt(n,3))}else{for(let n=0,i=e.count;n<i;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ms);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new T(-1/0,-1/0,-1/0),new T(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];Ve.setFromBufferAttribute(r),this.morphTargetsRelative?(Me.addVectors(this.boundingBox.min,Ve.min),this.boundingBox.expandByPoint(Me),Me.addVectors(this.boundingBox.max,Ve.max),this.boundingBox.expandByPoint(Me)):(this.boundingBox.expandByPoint(Ve.min),this.boundingBox.expandByPoint(Ve.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new sr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new T,1/0);return}if(t){const n=this.boundingSphere.center;if(Ve.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];ts.setFromBufferAttribute(o),this.morphTargetsRelative?(Me.addVectors(Ve.min,ts.min),Ve.expandByPoint(Me),Me.addVectors(Ve.max,ts.max),Ve.expandByPoint(Me)):(Ve.expandByPoint(ts.min),Ve.expandByPoint(ts.max))}Ve.getCenter(n);let i=0;for(let r=0,a=t.count;r<a;r++)Me.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Me));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Me.fromBufferAttribute(o,c),l&&(Ai.fromBufferAttribute(t,c),Me.add(Ai)),i=Math.max(i,n.distanceToSquared(Me))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ze(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let R=0;R<n.count;R++)o[R]=new T,l[R]=new T;const c=new T,h=new T,u=new T,d=new et,p=new et,g=new et,v=new T,m=new T;function f(R,M,y){c.fromBufferAttribute(n,R),h.fromBufferAttribute(n,M),u.fromBufferAttribute(n,y),d.fromBufferAttribute(r,R),p.fromBufferAttribute(r,M),g.fromBufferAttribute(r,y),h.sub(c),u.sub(c),p.sub(d),g.sub(d);const P=1/(p.x*g.y-g.x*p.y);isFinite(P)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(P),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(P),o[R].add(v),o[M].add(v),o[y].add(v),l[R].add(m),l[M].add(m),l[y].add(m))}let _=this.groups;_.length===0&&(_=[{start:0,count:t.count}]);for(let R=0,M=_.length;R<M;++R){const y=_[R],P=y.start,F=y.count;for(let I=P,k=P+F;I<k;I+=3)f(t.getX(I+0),t.getX(I+1),t.getX(I+2))}const S=new T,x=new T,L=new T,A=new T;function b(R){L.fromBufferAttribute(i,R),A.copy(L);const M=o[R];S.copy(M),S.sub(L.multiplyScalar(L.dot(M))).normalize(),x.crossVectors(A,M);const P=x.dot(l[R])<0?-1:1;a.setXYZW(R,S.x,S.y,S.z,P)}for(let R=0,M=_.length;R<M;++R){const y=_[R],P=y.start,F=y.count;for(let I=P,k=P+F;I<k;I+=3)b(t.getX(I+0)),b(t.getX(I+1)),b(t.getX(I+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ze(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);const i=new T,r=new T,a=new T,o=new T,l=new T,c=new T,h=new T,u=new T;if(t)for(let d=0,p=t.count;d<p;d+=3){const g=t.getX(d+0),v=t.getX(d+1),m=t.getX(d+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),a.fromBufferAttribute(e,m),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,p=e.count;d<p;d+=3)i.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Me.fromBufferAttribute(t,e),Me.normalize(),t.setXYZ(e,Me.x,Me.y,Me.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h);let p=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?p=l[v]*o.data.stride+o.offset:p=l[v]*h;for(let f=0;f<h;f++)d[g++]=c[p++]}return new ze(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new be,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const d=c[h],p=t(d,n);l.push(p)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const p=c[u];h.push(p.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Vo=new Zt,ei=new hc,Rs=new sr,Go=new T,Cs=new T,Ps=new T,Ls=new T,Pr=new T,Ds=new T,Wo=new T,Is=new T;class dt extends _e{constructor(t=new be,e=new an){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const o=this.morphTargetInfluences;if(r&&o){Ds.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(Pr.fromBufferAttribute(u,t),a?Ds.addScaledVector(Pr,h):Ds.addScaledVector(Pr.sub(e),h))}e.add(Ds)}return e}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Rs.copy(n.boundingSphere),Rs.applyMatrix4(r),ei.copy(t.ray).recast(t.near),!(Rs.containsPoint(ei.origin)===!1&&(ei.intersectSphere(Rs,Go)===null||ei.origin.distanceToSquared(Go)>(t.far-t.near)**2))&&(Vo.copy(r).invert(),ei.copy(t.ray).applyMatrix4(Vo),!(n.boundingBox!==null&&ei.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ei)))}_computeIntersections(t,e,n){let i;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=d.length;g<v;g++){const m=d[g],f=a[m.materialIndex],_=Math.max(m.start,p.start),S=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let x=_,L=S;x<L;x+=3){const A=o.getX(x),b=o.getX(x+1),R=o.getX(x+2);i=Us(this,f,t,n,c,h,u,A,b,R),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);for(let m=g,f=v;m<f;m+=3){const _=o.getX(m),S=o.getX(m+1),x=o.getX(m+2);i=Us(this,a,t,n,c,h,u,_,S,x),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=d.length;g<v;g++){const m=d[g],f=a[m.materialIndex],_=Math.max(m.start,p.start),S=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let x=_,L=S;x<L;x+=3){const A=x,b=x+1,R=x+2;i=Us(this,f,t,n,c,h,u,A,b,R),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,p.start),v=Math.min(l.count,p.start+p.count);for(let m=g,f=v;m<f;m+=3){const _=m,S=m+1,x=m+2;i=Us(this,a,t,n,c,h,u,_,S,x),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}}function qh(s,t,e,n,i,r,a,o){let l;if(t.side===Ue?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,t.side===Jn,o),l===null)return null;Is.copy(o),Is.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(Is);return c<e.near||c>e.far?null:{distance:c,point:Is.clone(),object:s}}function Us(s,t,e,n,i,r,a,o,l,c){s.getVertexPosition(o,Cs),s.getVertexPosition(l,Ps),s.getVertexPosition(c,Ls);const h=qh(s,t,e,n,Cs,Ps,Ls,Wo);if(h){const u=new T;je.getBarycoord(Wo,Cs,Ps,Ls,u),i&&(h.uv=je.getInterpolatedAttribute(i,o,l,c,u,new et)),r&&(h.uv1=je.getInterpolatedAttribute(r,o,l,c,u,new et)),a&&(h.normal=je.getInterpolatedAttribute(a,o,l,c,u,new T),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new T,materialIndex:0};je.getNormal(Cs,Ps,Ls,d.normal),h.face=d,h.barycoord=u}return h}class Ce extends be{constructor(t=1,e=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let d=0,p=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,i,a,2),g("x","z","y",1,-1,t,n,-e,i,a,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new Qt(c,3)),this.setAttribute("normal",new Qt(h,3)),this.setAttribute("uv",new Qt(u,2));function g(v,m,f,_,S,x,L,A,b,R,M){const y=x/b,P=L/R,F=x/2,I=L/2,k=A/2,V=b+1,W=R+1;let Y=0,G=0;const nt=new T;for(let ht=0;ht<W;ht++){const vt=ht*P-I;for(let Pt=0;Pt<V;Pt++){const jt=Pt*y-F;nt[v]=jt*_,nt[m]=vt*S,nt[f]=k,c.push(nt.x,nt.y,nt.z),nt[v]=0,nt[m]=0,nt[f]=A>0?1:-1,h.push(nt.x,nt.y,nt.z),u.push(Pt/b),u.push(1-ht/R),Y+=1}}for(let ht=0;ht<R;ht++)for(let vt=0;vt<b;vt++){const Pt=d+vt+V*ht,jt=d+vt+V*(ht+1),q=d+(vt+1)+V*(ht+1),tt=d+(vt+1)+V*ht;l.push(Pt,jt,tt),l.push(jt,q,tt),G+=6}o.addGroup(p,G,M),p+=G,d+=Y}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ce(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function qi(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function De(s){const t={};for(let e=0;e<s.length;e++){const n=qi(s[e]);for(const i in n)t[i]=n[i]}return t}function Yh(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function mc(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:qt.workingColorSpace}const Kh={clone:qi,merge:De};var jh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Jh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Je extends mi{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=jh,this.fragmentShader=Jh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=qi(t.uniforms),this.uniformsGroups=Yh(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class gc extends _e{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Zt,this.projectionMatrix=new Zt,this.projectionMatrixInverse=new Zt,this.coordinateSystem=Pn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Vn=new T,Xo=new et,qo=new et;class ke extends gc{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ba*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(hr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ba*2*Math.atan(Math.tan(hr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Vn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Vn.x,Vn.y).multiplyScalar(-t/Vn.z),Vn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Vn.x,Vn.y).multiplyScalar(-t/Vn.z)}getViewSize(t,e){return this.getViewBounds(t,Xo,qo),e.subVectors(qo,Xo)}setViewOffset(t,e,n,i,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(hr*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,e-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ri=-90,Ci=1;class $h extends _e{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new ke(Ri,Ci,t,e);i.layers=this.layers,this.add(i);const r=new ke(Ri,Ci,t,e);r.layers=this.layers,this.add(r);const a=new ke(Ri,Ci,t,e);a.layers=this.layers,this.add(a);const o=new ke(Ri,Ci,t,e);o.layers=this.layers,this.add(o);const l=new ke(Ri,Ci,t,e);l.layers=this.layers,this.add(l);const c=new ke(Ri,Ci,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===Pn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Zs)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,a),t.setRenderTarget(n,2,i),t.render(e,o),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,d,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class vc extends Ne{constructor(t,e,n,i,r,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Vi,super(t,e,n,i,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Zh extends fn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new vc(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:dn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Ce(5,5,5),r=new Je({name:"CubemapFromEquirect",uniforms:qi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ue,blending:Yn});r.uniforms.tEquirect.value=e;const a=new dt(i,r),o=e.minFilter;return e.minFilter===ui&&(e.minFilter=dn),new $h(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,i){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(r)}}const Lr=new T,Qh=new T,tu=new Ot;class ai{constructor(t=new T(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Lr.subVectors(n,e).cross(Qh.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Lr),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||tu.getNormalMatrix(t),i=this.coplanarPoint(Lr).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ni=new sr,Ns=new T;class Qa{constructor(t=new ai,e=new ai,n=new ai,i=new ai,r=new ai,a=new ai){this.planes=[t,e,n,i,r,a]}set(t,e,n,i,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Pn){const n=this.planes,i=t.elements,r=i[0],a=i[1],o=i[2],l=i[3],c=i[4],h=i[5],u=i[6],d=i[7],p=i[8],g=i[9],v=i[10],m=i[11],f=i[12],_=i[13],S=i[14],x=i[15];if(n[0].setComponents(l-r,d-c,m-p,x-f).normalize(),n[1].setComponents(l+r,d+c,m+p,x+f).normalize(),n[2].setComponents(l+a,d+h,m+g,x+_).normalize(),n[3].setComponents(l-a,d-h,m-g,x-_).normalize(),n[4].setComponents(l-o,d-u,m-v,x-S).normalize(),e===Pn)n[5].setComponents(l+o,d+u,m+v,x+S).normalize();else if(e===Zs)n[5].setComponents(o,u,v,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ni.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ni.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ni)}intersectsSprite(t){return ni.center.set(0,0,0),ni.radius=.7071067811865476,ni.applyMatrix4(t.matrixWorld),this.intersectsSphere(ni)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(Ns.x=i.normal.x>0?t.max.x:t.min.x,Ns.y=i.normal.y>0?t.max.y:t.min.y,Ns.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Ns)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function _c(){let s=null,t=!1,e=null,n=null;function i(r,a){e(r,a),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function eu(s){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,u=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),o.onUploadCallback();let p;if(c instanceof Float32Array)p=s.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=s.HALF_FLOAT:p=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=s.SHORT;else if(c instanceof Uint32Array)p=s.UNSIGNED_INT;else if(c instanceof Int32Array)p=s.INT;else if(c instanceof Int8Array)p=s.BYTE;else if(c instanceof Uint8Array)p=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const h=l.array,u=l.updateRanges;if(s.bindBuffer(c,o),u.length===0)s.bufferSubData(c,0,h);else{u.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<u.length;p++){const g=u[d],v=u[p];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++d,u[d]=v)}u.length=d+1;for(let p=0,g=u.length;p<g;p++){const v=u[p];s.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(s.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:r,update:a}}class ln extends be{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,u=t/o,d=e/l,p=[],g=[],v=[],m=[];for(let f=0;f<h;f++){const _=f*d-a;for(let S=0;S<c;S++){const x=S*u-r;g.push(x,-_,0),v.push(0,0,1),m.push(S/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let _=0;_<o;_++){const S=_+c*f,x=_+c*(f+1),L=_+1+c*(f+1),A=_+1+c*f;p.push(S,x,A),p.push(x,L,A)}this.setIndex(p),this.setAttribute("position",new Qt(g,3)),this.setAttribute("normal",new Qt(v,3)),this.setAttribute("uv",new Qt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ln(t.width,t.height,t.widthSegments,t.heightSegments)}}var nu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,iu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,su=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ru=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,au=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ou=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,lu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,cu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,hu=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,uu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,du=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,fu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,pu=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,mu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,gu=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,vu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,_u=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,xu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,yu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Mu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Su=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,wu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,bu=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Eu=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Tu=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Au=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Ru=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Cu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Pu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Lu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Du="gl_FragColor = linearToOutputTexel( gl_FragColor );",Iu=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Uu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Nu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ou=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Fu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ku=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,zu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Bu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Hu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Vu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Gu=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Wu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Xu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,qu=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Yu=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Ku=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,ju=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ju=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,$u=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Zu=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Qu=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,td=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,ed=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,nd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,id=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,sd=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,rd=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ad=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,od=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ld=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,cd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,hd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,ud=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,dd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,fd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,pd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,md=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,gd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vd=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,_d=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,yd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Md=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Sd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,bd=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Ed=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Td=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ad=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Rd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Cd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Pd=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Ld=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Dd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Id=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ud=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Nd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Od=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Fd=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,kd=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,zd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Bd=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Hd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Vd=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Gd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Wd=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Xd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,qd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Yd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Kd=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,jd=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Jd=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,$d=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Zd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Qd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,tf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ef=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,nf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,af=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,of=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,cf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,hf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,uf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,df=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ff=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,mf=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,gf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,vf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_f=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Mf=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sf=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,wf=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,bf=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ef=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tf=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Af=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rf=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Cf=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pf=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Lf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Df=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,If=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Uf=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Nf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,kt={alphahash_fragment:nu,alphahash_pars_fragment:iu,alphamap_fragment:su,alphamap_pars_fragment:ru,alphatest_fragment:au,alphatest_pars_fragment:ou,aomap_fragment:lu,aomap_pars_fragment:cu,batching_pars_vertex:hu,batching_vertex:uu,begin_vertex:du,beginnormal_vertex:fu,bsdfs:pu,iridescence_fragment:mu,bumpmap_pars_fragment:gu,clipping_planes_fragment:vu,clipping_planes_pars_fragment:_u,clipping_planes_pars_vertex:xu,clipping_planes_vertex:yu,color_fragment:Mu,color_pars_fragment:Su,color_pars_vertex:wu,color_vertex:bu,common:Eu,cube_uv_reflection_fragment:Tu,defaultnormal_vertex:Au,displacementmap_pars_vertex:Ru,displacementmap_vertex:Cu,emissivemap_fragment:Pu,emissivemap_pars_fragment:Lu,colorspace_fragment:Du,colorspace_pars_fragment:Iu,envmap_fragment:Uu,envmap_common_pars_fragment:Nu,envmap_pars_fragment:Ou,envmap_pars_vertex:Fu,envmap_physical_pars_fragment:Ku,envmap_vertex:ku,fog_vertex:zu,fog_pars_vertex:Bu,fog_fragment:Hu,fog_pars_fragment:Vu,gradientmap_pars_fragment:Gu,lightmap_pars_fragment:Wu,lights_lambert_fragment:Xu,lights_lambert_pars_fragment:qu,lights_pars_begin:Yu,lights_toon_fragment:ju,lights_toon_pars_fragment:Ju,lights_phong_fragment:$u,lights_phong_pars_fragment:Zu,lights_physical_fragment:Qu,lights_physical_pars_fragment:td,lights_fragment_begin:ed,lights_fragment_maps:nd,lights_fragment_end:id,logdepthbuf_fragment:sd,logdepthbuf_pars_fragment:rd,logdepthbuf_pars_vertex:ad,logdepthbuf_vertex:od,map_fragment:ld,map_pars_fragment:cd,map_particle_fragment:hd,map_particle_pars_fragment:ud,metalnessmap_fragment:dd,metalnessmap_pars_fragment:fd,morphinstance_vertex:pd,morphcolor_vertex:md,morphnormal_vertex:gd,morphtarget_pars_vertex:vd,morphtarget_vertex:_d,normal_fragment_begin:xd,normal_fragment_maps:yd,normal_pars_fragment:Md,normal_pars_vertex:Sd,normal_vertex:wd,normalmap_pars_fragment:bd,clearcoat_normal_fragment_begin:Ed,clearcoat_normal_fragment_maps:Td,clearcoat_pars_fragment:Ad,iridescence_pars_fragment:Rd,opaque_fragment:Cd,packing:Pd,premultiplied_alpha_fragment:Ld,project_vertex:Dd,dithering_fragment:Id,dithering_pars_fragment:Ud,roughnessmap_fragment:Nd,roughnessmap_pars_fragment:Od,shadowmap_pars_fragment:Fd,shadowmap_pars_vertex:kd,shadowmap_vertex:zd,shadowmask_pars_fragment:Bd,skinbase_vertex:Hd,skinning_pars_vertex:Vd,skinning_vertex:Gd,skinnormal_vertex:Wd,specularmap_fragment:Xd,specularmap_pars_fragment:qd,tonemapping_fragment:Yd,tonemapping_pars_fragment:Kd,transmission_fragment:jd,transmission_pars_fragment:Jd,uv_pars_fragment:$d,uv_pars_vertex:Zd,uv_vertex:Qd,worldpos_vertex:tf,background_vert:ef,background_frag:nf,backgroundCube_vert:sf,backgroundCube_frag:rf,cube_vert:af,cube_frag:of,depth_vert:lf,depth_frag:cf,distanceRGBA_vert:hf,distanceRGBA_frag:uf,equirect_vert:df,equirect_frag:ff,linedashed_vert:pf,linedashed_frag:mf,meshbasic_vert:gf,meshbasic_frag:vf,meshlambert_vert:_f,meshlambert_frag:xf,meshmatcap_vert:yf,meshmatcap_frag:Mf,meshnormal_vert:Sf,meshnormal_frag:wf,meshphong_vert:bf,meshphong_frag:Ef,meshphysical_vert:Tf,meshphysical_frag:Af,meshtoon_vert:Rf,meshtoon_frag:Cf,points_vert:Pf,points_frag:Lf,shadow_vert:Df,shadow_frag:If,sprite_vert:Uf,sprite_frag:Nf},st={common:{diffuse:{value:new zt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ot}},envmap:{envMap:{value:null},envMapRotation:{value:new Ot},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ot},normalScale:{value:new et(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new zt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new zt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0},uvTransform:{value:new Ot}},sprite:{diffuse:{value:new zt(16777215)},opacity:{value:1},center:{value:new et(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}}},hn={basic:{uniforms:De([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.fog]),vertexShader:kt.meshbasic_vert,fragmentShader:kt.meshbasic_frag},lambert:{uniforms:De([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.fog,st.lights,{emissive:{value:new zt(0)}}]),vertexShader:kt.meshlambert_vert,fragmentShader:kt.meshlambert_frag},phong:{uniforms:De([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.fog,st.lights,{emissive:{value:new zt(0)},specular:{value:new zt(1118481)},shininess:{value:30}}]),vertexShader:kt.meshphong_vert,fragmentShader:kt.meshphong_frag},standard:{uniforms:De([st.common,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.roughnessmap,st.metalnessmap,st.fog,st.lights,{emissive:{value:new zt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag},toon:{uniforms:De([st.common,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.gradientmap,st.fog,st.lights,{emissive:{value:new zt(0)}}]),vertexShader:kt.meshtoon_vert,fragmentShader:kt.meshtoon_frag},matcap:{uniforms:De([st.common,st.bumpmap,st.normalmap,st.displacementmap,st.fog,{matcap:{value:null}}]),vertexShader:kt.meshmatcap_vert,fragmentShader:kt.meshmatcap_frag},points:{uniforms:De([st.points,st.fog]),vertexShader:kt.points_vert,fragmentShader:kt.points_frag},dashed:{uniforms:De([st.common,st.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:kt.linedashed_vert,fragmentShader:kt.linedashed_frag},depth:{uniforms:De([st.common,st.displacementmap]),vertexShader:kt.depth_vert,fragmentShader:kt.depth_frag},normal:{uniforms:De([st.common,st.bumpmap,st.normalmap,st.displacementmap,{opacity:{value:1}}]),vertexShader:kt.meshnormal_vert,fragmentShader:kt.meshnormal_frag},sprite:{uniforms:De([st.sprite,st.fog]),vertexShader:kt.sprite_vert,fragmentShader:kt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:kt.background_vert,fragmentShader:kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ot}},vertexShader:kt.backgroundCube_vert,fragmentShader:kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:kt.cube_vert,fragmentShader:kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:kt.equirect_vert,fragmentShader:kt.equirect_frag},distanceRGBA:{uniforms:De([st.common,st.displacementmap,{referencePosition:{value:new T},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:kt.distanceRGBA_vert,fragmentShader:kt.distanceRGBA_frag},shadow:{uniforms:De([st.lights,st.fog,{color:{value:new zt(0)},opacity:{value:1}}]),vertexShader:kt.shadow_vert,fragmentShader:kt.shadow_frag}};hn.physical={uniforms:De([hn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ot},clearcoatNormalScale:{value:new et(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ot},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ot},sheen:{value:0},sheenColor:{value:new zt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ot},transmissionSamplerSize:{value:new et},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ot},attenuationDistance:{value:0},attenuationColor:{value:new zt(0)},specularColor:{value:new zt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ot},anisotropyVector:{value:new et},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ot}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag};const Os={r:0,b:0,g:0},ii=new pn,Of=new Zt;function Ff(s,t,e,n,i,r,a){const o=new zt(0);let l=r===!0?0:1,c,h,u=null,d=0,p=null;function g(_){let S=_.isScene===!0?_.background:null;return S&&S.isTexture&&(S=(_.backgroundBlurriness>0?e:t).get(S)),S}function v(_){let S=!1;const x=g(_);x===null?f(o,l):x&&x.isColor&&(f(x,1),S=!0);const L=s.xr.getEnvironmentBlendMode();L==="additive"?n.buffers.color.setClear(0,0,0,1,a):L==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||S)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(_,S){const x=g(S);x&&(x.isCubeTexture||x.mapping===nr)?(h===void 0&&(h=new dt(new Ce(1,1,1),new Je({name:"BackgroundCubeMaterial",uniforms:qi(hn.backgroundCube.uniforms),vertexShader:hn.backgroundCube.vertexShader,fragmentShader:hn.backgroundCube.fragmentShader,side:Ue,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(L,A,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),ii.copy(S.backgroundRotation),ii.x*=-1,ii.y*=-1,ii.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(ii.y*=-1,ii.z*=-1),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Of.makeRotationFromEuler(ii)),h.material.toneMapped=qt.getTransfer(x.colorSpace)!==ne,(u!==x||d!==x.version||p!==s.toneMapping)&&(h.material.needsUpdate=!0,u=x,d=x.version,p=s.toneMapping),h.layers.enableAll(),_.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new dt(new ln(2,2),new Je({name:"BackgroundMaterial",uniforms:qi(hn.background.uniforms),vertexShader:hn.background.vertexShader,fragmentShader:hn.background.fragmentShader,side:Jn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=qt.getTransfer(x.colorSpace)!==ne,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||d!==x.version||p!==s.toneMapping)&&(c.material.needsUpdate=!0,u=x,d=x.version,p=s.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null))}function f(_,S){_.getRGB(Os,mc(s)),n.buffers.color.setClear(Os.r,Os.g,Os.b,S,a)}return{getClearColor:function(){return o},setClearColor:function(_,S=1){o.set(_),l=S,f(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(_){l=_,f(o,l)},render:v,addToRenderList:m}}function kf(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null);let r=i,a=!1;function o(y,P,F,I,k){let V=!1;const W=u(I,F,P);r!==W&&(r=W,c(r.object)),V=p(y,I,F,k),V&&g(y,I,F,k),k!==null&&t.update(k,s.ELEMENT_ARRAY_BUFFER),(V||a)&&(a=!1,x(y,P,F,I),k!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(k).buffer))}function l(){return s.createVertexArray()}function c(y){return s.bindVertexArray(y)}function h(y){return s.deleteVertexArray(y)}function u(y,P,F){const I=F.wireframe===!0;let k=n[y.id];k===void 0&&(k={},n[y.id]=k);let V=k[P.id];V===void 0&&(V={},k[P.id]=V);let W=V[I];return W===void 0&&(W=d(l()),V[I]=W),W}function d(y){const P=[],F=[],I=[];for(let k=0;k<e;k++)P[k]=0,F[k]=0,I[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:F,attributeDivisors:I,object:y,attributes:{},index:null}}function p(y,P,F,I){const k=r.attributes,V=P.attributes;let W=0;const Y=F.getAttributes();for(const G in Y)if(Y[G].location>=0){const ht=k[G];let vt=V[G];if(vt===void 0&&(G==="instanceMatrix"&&y.instanceMatrix&&(vt=y.instanceMatrix),G==="instanceColor"&&y.instanceColor&&(vt=y.instanceColor)),ht===void 0||ht.attribute!==vt||vt&&ht.data!==vt.data)return!0;W++}return r.attributesNum!==W||r.index!==I}function g(y,P,F,I){const k={},V=P.attributes;let W=0;const Y=F.getAttributes();for(const G in Y)if(Y[G].location>=0){let ht=V[G];ht===void 0&&(G==="instanceMatrix"&&y.instanceMatrix&&(ht=y.instanceMatrix),G==="instanceColor"&&y.instanceColor&&(ht=y.instanceColor));const vt={};vt.attribute=ht,ht&&ht.data&&(vt.data=ht.data),k[G]=vt,W++}r.attributes=k,r.attributesNum=W,r.index=I}function v(){const y=r.newAttributes;for(let P=0,F=y.length;P<F;P++)y[P]=0}function m(y){f(y,0)}function f(y,P){const F=r.newAttributes,I=r.enabledAttributes,k=r.attributeDivisors;F[y]=1,I[y]===0&&(s.enableVertexAttribArray(y),I[y]=1),k[y]!==P&&(s.vertexAttribDivisor(y,P),k[y]=P)}function _(){const y=r.newAttributes,P=r.enabledAttributes;for(let F=0,I=P.length;F<I;F++)P[F]!==y[F]&&(s.disableVertexAttribArray(F),P[F]=0)}function S(y,P,F,I,k,V,W){W===!0?s.vertexAttribIPointer(y,P,F,k,V):s.vertexAttribPointer(y,P,F,I,k,V)}function x(y,P,F,I){v();const k=I.attributes,V=F.getAttributes(),W=P.defaultAttributeValues;for(const Y in V){const G=V[Y];if(G.location>=0){let nt=k[Y];if(nt===void 0&&(Y==="instanceMatrix"&&y.instanceMatrix&&(nt=y.instanceMatrix),Y==="instanceColor"&&y.instanceColor&&(nt=y.instanceColor)),nt!==void 0){const ht=nt.normalized,vt=nt.itemSize,Pt=t.get(nt);if(Pt===void 0)continue;const jt=Pt.buffer,q=Pt.type,tt=Pt.bytesPerElement,Mt=q===s.INT||q===s.UNSIGNED_INT||nt.gpuType===Ya;if(nt.isInterleavedBufferAttribute){const at=nt.data,Rt=at.stride,It=nt.offset;if(at.isInstancedInterleavedBuffer){for(let Bt=0;Bt<G.locationSize;Bt++)f(G.location+Bt,at.meshPerAttribute);y.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let Bt=0;Bt<G.locationSize;Bt++)m(G.location+Bt);s.bindBuffer(s.ARRAY_BUFFER,jt);for(let Bt=0;Bt<G.locationSize;Bt++)S(G.location+Bt,vt/G.locationSize,q,ht,Rt*tt,(It+vt/G.locationSize*Bt)*tt,Mt)}else{if(nt.isInstancedBufferAttribute){for(let at=0;at<G.locationSize;at++)f(G.location+at,nt.meshPerAttribute);y.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=nt.meshPerAttribute*nt.count)}else for(let at=0;at<G.locationSize;at++)m(G.location+at);s.bindBuffer(s.ARRAY_BUFFER,jt);for(let at=0;at<G.locationSize;at++)S(G.location+at,vt/G.locationSize,q,ht,vt*tt,vt/G.locationSize*at*tt,Mt)}}else if(W!==void 0){const ht=W[Y];if(ht!==void 0)switch(ht.length){case 2:s.vertexAttrib2fv(G.location,ht);break;case 3:s.vertexAttrib3fv(G.location,ht);break;case 4:s.vertexAttrib4fv(G.location,ht);break;default:s.vertexAttrib1fv(G.location,ht)}}}}_()}function L(){R();for(const y in n){const P=n[y];for(const F in P){const I=P[F];for(const k in I)h(I[k].object),delete I[k];delete P[F]}delete n[y]}}function A(y){if(n[y.id]===void 0)return;const P=n[y.id];for(const F in P){const I=P[F];for(const k in I)h(I[k].object),delete I[k];delete P[F]}delete n[y.id]}function b(y){for(const P in n){const F=n[P];if(F[y.id]===void 0)continue;const I=F[y.id];for(const k in I)h(I[k].object),delete I[k];delete F[y.id]}}function R(){M(),a=!0,r!==i&&(r=i,c(r.object))}function M(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:R,resetDefaultState:M,dispose:L,releaseStatesOfGeometry:A,releaseStatesOfProgram:b,initAttributes:v,enableAttribute:m,disableUnusedAttributes:_}}function zf(s,t,e){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),e.update(h,n,1)}function a(c,h,u){u!==0&&(s.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function o(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let p=0;for(let g=0;g<u;g++)p+=h[g];e.update(p,n,1)}function l(c,h,u,d){if(u===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)a(c[g],h[g],d[g]);else{p.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let g=0;for(let v=0;v<u;v++)g+=h[v]*d[v];e.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Bf(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const b=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(b){return!(b!==rn&&n.convert(b)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(b){const R=b===Kn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(b!==In&&n.convert(b)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&b!==Cn&&!R)}function l(b){if(b==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),f=s.getParameter(s.MAX_VERTEX_ATTRIBS),_=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),S=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),L=g>0,A=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:p,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:_,maxVaryings:S,maxFragmentUniforms:x,vertexTextures:L,maxSamples:A}}function Hf(s){const t=this;let e=null,n=0,i=!1,r=!1;const a=new ai,o=new Ot,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const p=u.length!==0||d||n!==0||i;return i=d,n=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,p){const g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,f=s.get(u);if(!i||g===null||g.length===0||r&&!m)r?h(null):c();else{const _=r?0:n,S=_*4;let x=f.clippingState||null;l.value=x,x=h(g,d,S,p);for(let L=0;L!==S;++L)x[L]=e[L];f.clippingState=x,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,p,g){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const f=p+v*4,_=d.matrixWorldInverse;o.getNormalMatrix(_),(m===null||m.length<f)&&(m=new Float32Array(f));for(let S=0,x=p;S!==v;++S,x+=4)a.copy(u[S]).applyMatrix4(_,o),a.normal.toArray(m,x),m[x+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function Vf(s){let t=new WeakMap;function e(a,o){return o===ha?a.mapping=Vi:o===ua&&(a.mapping=Gi),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===ha||o===ua)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Zh(l.height);return c.fromEquirectangularTexture(s,a),t.set(a,c),a.addEventListener("dispose",i),e(c.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class to extends gc{constructor(t=-1,e=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Oi=4,Yo=[.125,.215,.35,.446,.526,.582],ci=20,Dr=new to,Ko=new zt;let Ir=null,Ur=0,Nr=0,Or=!1;const oi=(1+Math.sqrt(5))/2,Pi=1/oi,jo=[new T(-oi,Pi,0),new T(oi,Pi,0),new T(-Pi,0,oi),new T(Pi,0,oi),new T(0,oi,-Pi),new T(0,oi,Pi),new T(-1,1,-1),new T(1,1,-1),new T(-1,1,1),new T(1,1,1)];class Jo{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){Ir=this._renderer.getRenderTarget(),Ur=this._renderer.getActiveCubeFace(),Nr=this._renderer.getActiveMipmapLevel(),Or=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,i,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Qo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Zo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ir,Ur,Nr),this._renderer.xr.enabled=Or,t.scissorTest=!1,Fs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Vi||t.mapping===Gi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ir=this._renderer.getRenderTarget(),Ur=this._renderer.getActiveCubeFace(),Nr=this._renderer.getActiveMipmapLevel(),Or=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:dn,minFilter:dn,generateMipmaps:!1,type:Kn,format:rn,colorSpace:pi,depthBuffer:!1},i=$o(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=$o(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Gf(r)),this._blurMaterial=Wf(r,t,e)}return i}_compileMaterial(t){const e=new dt(this._lodPlanes[0],t);this._renderer.compile(e,Dr)}_sceneToCubeUV(t,e,n,i){const o=new ke(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Ko),h.toneMapping=Ln,h.autoClear=!1;const p=new an({name:"PMREM.Background",side:Ue,depthWrite:!1,depthTest:!1}),g=new dt(new Ce,p);let v=!1;const m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,v=!0):(p.color.copy(Ko),v=!0);for(let f=0;f<6;f++){const _=f%3;_===0?(o.up.set(0,l[f],0),o.lookAt(c[f],0,0)):_===1?(o.up.set(0,0,l[f]),o.lookAt(0,c[f],0)):(o.up.set(0,l[f],0),o.lookAt(0,0,c[f]));const S=this._cubeSize;Fs(i,_*S,f>2?S:0,S,S),h.setRenderTarget(i),v&&h.render(g,o),h.render(t,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===Vi||t.mapping===Gi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Qo()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Zo());const r=i?this._cubemapMaterial:this._equirectMaterial,a=new dt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;Fs(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Dr)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=jo[(i-r-1)%jo.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,i,"latitudinal",r),this._halfBlur(a,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new dt(this._lodPlanes[i],c),d=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*ci-1),v=r/g,m=isFinite(r)?1+Math.floor(h*v):ci;m>ci&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ci}`);const f=[];let _=0;for(let b=0;b<ci;++b){const R=b/v,M=Math.exp(-R*R/2);f.push(M),b===0?_+=M:b<m&&(_+=2*M)}for(let b=0;b<f.length;b++)f[b]=f[b]/_;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:S}=this;d.dTheta.value=g,d.mipInt.value=S-n;const x=this._sizeLods[i],L=3*x*(i>S-Oi?i-S+Oi:0),A=4*(this._cubeSize-x);Fs(e,L,A,3*x,2*x),l.setRenderTarget(e),l.render(u,Dr)}}function Gf(s){const t=[],e=[],n=[];let i=s;const r=s-Oi+1+Yo.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);e.push(o);let l=1/o;a>s-Oi?l=Yo[a-s+Oi-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,v=3,m=2,f=1,_=new Float32Array(v*g*p),S=new Float32Array(m*g*p),x=new Float32Array(f*g*p);for(let A=0;A<p;A++){const b=A%3*2/3-1,R=A>2?0:-1,M=[b,R,0,b+2/3,R,0,b+2/3,R+1,0,b,R,0,b+2/3,R+1,0,b,R+1,0];_.set(M,v*g*A),S.set(d,m*g*A);const y=[A,A,A,A,A,A];x.set(y,f*g*A)}const L=new be;L.setAttribute("position",new ze(_,v)),L.setAttribute("uv",new ze(S,m)),L.setAttribute("faceIndex",new ze(x,f)),t.push(L),i>Oi&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function $o(s,t,e){const n=new fn(s,t,e);return n.texture.mapping=nr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Fs(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function Wf(s,t,e){const n=new Float32Array(ci),i=new T(0,1,0);return new Je({name:"SphericalGaussianBlur",defines:{n:ci,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:eo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function Zo(){return new Je({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:eo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function Qo(){return new Je({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:eo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function eo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Xf(s){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===ha||l===ua,h=l===Vi||l===Gi;if(c||h){let u=t.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return e===null&&(e=new Jo(s)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const p=o.image;return c&&p&&p.height>0||h&&p&&i(p)?(e===null&&(e=new Jo(s)),u=c?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function i(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function qf(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&os("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Yf(s,t,e,n){const i={},r=new WeakMap;function a(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);for(const g in d.morphAttributes){const v=d.morphAttributes[g];for(let m=0,f=v.length;m<f;m++)t.remove(v[m])}d.removeEventListener("dispose",a),delete i[d.id];const p=r.get(d);p&&(t.remove(p),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(u,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const g in d)t.update(d[g],s.ARRAY_BUFFER);const p=u.morphAttributes;for(const g in p){const v=p[g];for(let m=0,f=v.length;m<f;m++)t.update(v[m],s.ARRAY_BUFFER)}}function c(u){const d=[],p=u.index,g=u.attributes.position;let v=0;if(p!==null){const _=p.array;v=p.version;for(let S=0,x=_.length;S<x;S+=3){const L=_[S+0],A=_[S+1],b=_[S+2];d.push(L,A,A,b,b,L)}}else if(g!==void 0){const _=g.array;v=g.version;for(let S=0,x=_.length/3-1;S<x;S+=3){const L=S+0,A=S+1,b=S+2;d.push(L,A,A,b,b,L)}}else return;const m=new(oc(d)?pc:fc)(d,1);m.version=v;const f=r.get(u);f&&t.remove(f),r.set(u,m)}function h(u){const d=r.get(u);if(d){const p=u.index;p!==null&&d.version<p.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function Kf(s,t,e){let n;function i(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,p){s.drawElements(n,p,r,d*a),e.update(p,n,1)}function c(d,p,g){g!==0&&(s.drawElementsInstanced(n,p,r,d*a,g),e.update(p,n,g))}function h(d,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,d,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];e.update(m,n,1)}function u(d,p,g,v){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<d.length;f++)c(d[f]/a,p[f],v[f]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,d,0,v,0,g);let f=0;for(let _=0;_<g;_++)f+=p[_]*v[_];e.update(f,n,1)}}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function jf(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Jf(s,t,e){const n=new WeakMap,i=new se;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let y=function(){R.dispose(),n.delete(o),o.removeEventListener("dispose",y)};var p=y;d!==void 0&&d.texture.dispose();const g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],_=o.morphAttributes.normal||[],S=o.morphAttributes.color||[];let x=0;g===!0&&(x=1),v===!0&&(x=2),m===!0&&(x=3);let L=o.attributes.position.count*x,A=1;L>t.maxTextureSize&&(A=Math.ceil(L/t.maxTextureSize),L=t.maxTextureSize);const b=new Float32Array(L*A*4*u),R=new cc(b,L,A,u);R.type=Cn,R.needsUpdate=!0;const M=x*4;for(let P=0;P<u;P++){const F=f[P],I=_[P],k=S[P],V=L*A*4*P;for(let W=0;W<F.count;W++){const Y=W*M;g===!0&&(i.fromBufferAttribute(F,W),b[V+Y+0]=i.x,b[V+Y+1]=i.y,b[V+Y+2]=i.z,b[V+Y+3]=0),v===!0&&(i.fromBufferAttribute(I,W),b[V+Y+4]=i.x,b[V+Y+5]=i.y,b[V+Y+6]=i.z,b[V+Y+7]=0),m===!0&&(i.fromBufferAttribute(k,W),b[V+Y+8]=i.x,b[V+Y+9]=i.y,b[V+Y+10]=i.z,b[V+Y+11]=k.itemSize===4?i.w:1)}}d={count:u,texture:R,size:new et(L,A)},n.set(o,d),o.addEventListener("dispose",y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const v=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(s,"morphTargetBaseInfluence",v),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function $f(s,t,e,n){let i=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(i.get(u)!==c&&(t.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function a(){i=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}class xc extends Ne{constructor(t,e,n,i,r,a,o,l,c,h=zi){if(h!==zi&&h!==Xi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===zi&&(n=fi),n===void 0&&h===Xi&&(n=Wi),super(null,i,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:on,this.minFilter=l!==void 0?l:on,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const yc=new Ne,tl=new xc(1,1),Mc=new cc,Sc=new Oh,wc=new vc,el=[],nl=[],il=new Float32Array(16),sl=new Float32Array(9),rl=new Float32Array(4);function Ki(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=el[i];if(r===void 0&&(r=new Float32Array(i),el[i]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function xe(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function ye(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function rr(s,t){let e=nl[t];e===void 0&&(e=new Int32Array(t),nl[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function Zf(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function Qf(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(xe(e,t))return;s.uniform2fv(this.addr,t),ye(e,t)}}function tp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(xe(e,t))return;s.uniform3fv(this.addr,t),ye(e,t)}}function ep(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(xe(e,t))return;s.uniform4fv(this.addr,t),ye(e,t)}}function np(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(xe(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),ye(e,t)}else{if(xe(e,n))return;rl.set(n),s.uniformMatrix2fv(this.addr,!1,rl),ye(e,n)}}function ip(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(xe(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),ye(e,t)}else{if(xe(e,n))return;sl.set(n),s.uniformMatrix3fv(this.addr,!1,sl),ye(e,n)}}function sp(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(xe(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),ye(e,t)}else{if(xe(e,n))return;il.set(n),s.uniformMatrix4fv(this.addr,!1,il),ye(e,n)}}function rp(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function ap(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(xe(e,t))return;s.uniform2iv(this.addr,t),ye(e,t)}}function op(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(xe(e,t))return;s.uniform3iv(this.addr,t),ye(e,t)}}function lp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(xe(e,t))return;s.uniform4iv(this.addr,t),ye(e,t)}}function cp(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function hp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(xe(e,t))return;s.uniform2uiv(this.addr,t),ye(e,t)}}function up(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(xe(e,t))return;s.uniform3uiv(this.addr,t),ye(e,t)}}function dp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(xe(e,t))return;s.uniform4uiv(this.addr,t),ye(e,t)}}function fp(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(tl.compareFunction=ac,r=tl):r=yc,e.setTexture2D(t||r,i)}function pp(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Sc,i)}function mp(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||wc,i)}function gp(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Mc,i)}function vp(s){switch(s){case 5126:return Zf;case 35664:return Qf;case 35665:return tp;case 35666:return ep;case 35674:return np;case 35675:return ip;case 35676:return sp;case 5124:case 35670:return rp;case 35667:case 35671:return ap;case 35668:case 35672:return op;case 35669:case 35673:return lp;case 5125:return cp;case 36294:return hp;case 36295:return up;case 36296:return dp;case 35678:case 36198:case 36298:case 36306:case 35682:return fp;case 35679:case 36299:case 36307:return pp;case 35680:case 36300:case 36308:case 36293:return mp;case 36289:case 36303:case 36311:case 36292:return gp}}function _p(s,t){s.uniform1fv(this.addr,t)}function xp(s,t){const e=Ki(t,this.size,2);s.uniform2fv(this.addr,e)}function yp(s,t){const e=Ki(t,this.size,3);s.uniform3fv(this.addr,e)}function Mp(s,t){const e=Ki(t,this.size,4);s.uniform4fv(this.addr,e)}function Sp(s,t){const e=Ki(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function wp(s,t){const e=Ki(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function bp(s,t){const e=Ki(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function Ep(s,t){s.uniform1iv(this.addr,t)}function Tp(s,t){s.uniform2iv(this.addr,t)}function Ap(s,t){s.uniform3iv(this.addr,t)}function Rp(s,t){s.uniform4iv(this.addr,t)}function Cp(s,t){s.uniform1uiv(this.addr,t)}function Pp(s,t){s.uniform2uiv(this.addr,t)}function Lp(s,t){s.uniform3uiv(this.addr,t)}function Dp(s,t){s.uniform4uiv(this.addr,t)}function Ip(s,t,e){const n=this.cache,i=t.length,r=rr(e,i);xe(n,r)||(s.uniform1iv(this.addr,r),ye(n,r));for(let a=0;a!==i;++a)e.setTexture2D(t[a]||yc,r[a])}function Up(s,t,e){const n=this.cache,i=t.length,r=rr(e,i);xe(n,r)||(s.uniform1iv(this.addr,r),ye(n,r));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||Sc,r[a])}function Np(s,t,e){const n=this.cache,i=t.length,r=rr(e,i);xe(n,r)||(s.uniform1iv(this.addr,r),ye(n,r));for(let a=0;a!==i;++a)e.setTextureCube(t[a]||wc,r[a])}function Op(s,t,e){const n=this.cache,i=t.length,r=rr(e,i);xe(n,r)||(s.uniform1iv(this.addr,r),ye(n,r));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||Mc,r[a])}function Fp(s){switch(s){case 5126:return _p;case 35664:return xp;case 35665:return yp;case 35666:return Mp;case 35674:return Sp;case 35675:return wp;case 35676:return bp;case 5124:case 35670:return Ep;case 35667:case 35671:return Tp;case 35668:case 35672:return Ap;case 35669:case 35673:return Rp;case 5125:return Cp;case 36294:return Pp;case 36295:return Lp;case 36296:return Dp;case 35678:case 36198:case 36298:case 36306:case 35682:return Ip;case 35679:case 36299:case 36307:return Up;case 35680:case 36300:case 36308:case 36293:return Np;case 36289:case 36303:case 36311:case 36292:return Op}}class kp{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=vp(e.type)}}class zp{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Fp(e.type)}}class Bp{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(t,e[o.id],n)}}}const Fr=/(\w+)(\])?(\[|\.)?/g;function al(s,t){s.seq.push(t),s.map[t.id]=t}function Hp(s,t,e){const n=s.name,i=n.length;for(Fr.lastIndex=0;;){const r=Fr.exec(n),a=Fr.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){al(e,c===void 0?new kp(o,s,t):new zp(o,s,t));break}else{let u=e.map[o];u===void 0&&(u=new Bp(o),al(e,u)),e=u}}}class $s{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=t.getActiveUniform(e,i),a=t.getUniformLocation(e,r.name);Hp(r,a,this)}}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const a=t[i];a.id in e&&n.push(a)}return n}}function ol(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const Vp=37297;let Gp=0;function Wp(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const ll=new Ot;function Xp(s){qt._getMatrix(ll,qt.workingColorSpace,s);const t=`mat3( ${ll.elements.map(e=>e.toFixed(4))} )`;switch(qt.getTransfer(s)){case ir:return[t,"LinearTransferOETF"];case ne:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function cl(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+Wp(s.getShaderSource(t),a)}else return i}function qp(s,t){const e=Xp(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Yp(s,t){let e;switch(t){case ch:e="Linear";break;case hh:e="Reinhard";break;case uh:e="Cineon";break;case dh:e="ACESFilmic";break;case ph:e="AgX";break;case mh:e="Neutral";break;case fh:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const ks=new T;function Kp(){qt.getLuminanceCoefficients(ks);const s=ks.x.toFixed(4),t=ks.y.toFixed(4),e=ks.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function jp(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ls).join(`
`)}function Jp(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function $p(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function ls(s){return s!==""}function hl(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ul(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Zp=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ha(s){return s.replace(Zp,tm)}const Qp=new Map;function tm(s,t){let e=kt[t];if(e===void 0){const n=Qp.get(t);if(n!==void 0)e=kt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Ha(e)}const em=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function dl(s){return s.replace(em,nm)}function nm(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function fl(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function im(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Xl?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===ql?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Tn&&(t="SHADOWMAP_TYPE_VSM"),t}function sm(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Vi:case Gi:t="ENVMAP_TYPE_CUBE";break;case nr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function rm(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Gi:t="ENVMAP_MODE_REFRACTION";break}return t}function am(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Yl:t="ENVMAP_BLENDING_MULTIPLY";break;case oh:t="ENVMAP_BLENDING_MIX";break;case lh:t="ENVMAP_BLENDING_ADD";break}return t}function om(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function lm(s,t,e,n){const i=s.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=im(e),c=sm(e),h=rm(e),u=am(e),d=om(e),p=jp(e),g=Jp(r),v=i.createProgram();let m,f,_=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ls).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ls).join(`
`),f.length>0&&(f+=`
`)):(m=[fl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ls).join(`
`),f=[fl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ln?"#define TONE_MAPPING":"",e.toneMapping!==Ln?kt.tonemapping_pars_fragment:"",e.toneMapping!==Ln?Yp("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",kt.colorspace_pars_fragment,qp("linearToOutputTexel",e.outputColorSpace),Kp(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ls).join(`
`)),a=Ha(a),a=hl(a,e),a=ul(a,e),o=Ha(o),o=hl(o,e),o=ul(o,e),a=dl(a),o=dl(o),e.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",e.glslVersion===To?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===To?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const S=_+m+a,x=_+f+o,L=ol(i,i.VERTEX_SHADER,S),A=ol(i,i.FRAGMENT_SHADER,x);i.attachShader(v,L),i.attachShader(v,A),e.index0AttributeName!==void 0?i.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v);function b(P){if(s.debug.checkShaderErrors){const F=i.getProgramInfoLog(v).trim(),I=i.getShaderInfoLog(L).trim(),k=i.getShaderInfoLog(A).trim();let V=!0,W=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(V=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,v,L,A);else{const Y=cl(i,L,"vertex"),G=cl(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+F+`
`+Y+`
`+G)}else F!==""?console.warn("THREE.WebGLProgram: Program Info Log:",F):(I===""||k==="")&&(W=!1);W&&(P.diagnostics={runnable:V,programLog:F,vertexShader:{log:I,prefix:m},fragmentShader:{log:k,prefix:f}})}i.deleteShader(L),i.deleteShader(A),R=new $s(i,v),M=$p(i,v)}let R;this.getUniforms=function(){return R===void 0&&b(this),R};let M;this.getAttributes=function(){return M===void 0&&b(this),M};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=i.getProgramParameter(v,Vp)),y},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Gp++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=L,this.fragmentShader=A,this}let cm=0;class hm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new um(t),e.set(t,n)),n}}class um{constructor(t){this.id=cm++,this.code=t,this.usedTimes=0}}function dm(s,t,e,n,i,r,a){const o=new uc,l=new hm,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let p=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(M){return c.add(M),M===0?"uv":`uv${M}`}function m(M,y,P,F,I){const k=F.fog,V=I.geometry,W=M.isMeshStandardMaterial?F.environment:null,Y=(M.isMeshStandardMaterial?e:t).get(M.envMap||W),G=Y&&Y.mapping===nr?Y.image.height:null,nt=g[M.type];M.precision!==null&&(p=i.getMaxPrecision(M.precision),p!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",p,"instead."));const ht=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,vt=ht!==void 0?ht.length:0;let Pt=0;V.morphAttributes.position!==void 0&&(Pt=1),V.morphAttributes.normal!==void 0&&(Pt=2),V.morphAttributes.color!==void 0&&(Pt=3);let jt,q,tt,Mt;if(nt){const te=hn[nt];jt=te.vertexShader,q=te.fragmentShader}else jt=M.vertexShader,q=M.fragmentShader,l.update(M),tt=l.getVertexShaderID(M),Mt=l.getFragmentShaderID(M);const at=s.getRenderTarget(),Rt=s.state.buffers.depth.getReversed(),It=I.isInstancedMesh===!0,Bt=I.isBatchedMesh===!0,de=!!M.map,Wt=!!M.matcap,pe=!!Y,O=!!M.aoMap,Xe=!!M.lightMap,Ht=!!M.bumpMap,Vt=!!M.normalMap,Tt=!!M.displacementMap,oe=!!M.emissiveMap,Et=!!M.metalnessMap,C=!!M.roughnessMap,w=M.anisotropy>0,z=M.clearcoat>0,j=M.dispersion>0,$=M.iridescence>0,K=M.sheen>0,St=M.transmission>0,ot=w&&!!M.anisotropyMap,ft=z&&!!M.clearcoatMap,Xt=z&&!!M.clearcoatNormalMap,Z=z&&!!M.clearcoatRoughnessMap,pt=$&&!!M.iridescenceMap,At=$&&!!M.iridescenceThicknessMap,Ct=K&&!!M.sheenColorMap,mt=K&&!!M.sheenRoughnessMap,Gt=!!M.specularMap,Ft=!!M.specularColorMap,re=!!M.specularIntensityMap,D=St&&!!M.transmissionMap,rt=St&&!!M.thicknessMap,X=!!M.gradientMap,J=!!M.alphaMap,ut=M.alphaTest>0,lt=!!M.alphaHash,Ut=!!M.extensions;let fe=Ln;M.toneMapped&&(at===null||at.isXRRenderTarget===!0)&&(fe=s.toneMapping);const Te={shaderID:nt,shaderType:M.type,shaderName:M.name,vertexShader:jt,fragmentShader:q,defines:M.defines,customVertexShaderID:tt,customFragmentShaderID:Mt,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:p,batching:Bt,batchingColor:Bt&&I._colorsTexture!==null,instancing:It,instancingColor:It&&I.instanceColor!==null,instancingMorph:It&&I.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:at===null?s.outputColorSpace:at.isXRRenderTarget===!0?at.texture.colorSpace:pi,alphaToCoverage:!!M.alphaToCoverage,map:de,matcap:Wt,envMap:pe,envMapMode:pe&&Y.mapping,envMapCubeUVHeight:G,aoMap:O,lightMap:Xe,bumpMap:Ht,normalMap:Vt,displacementMap:d&&Tt,emissiveMap:oe,normalMapObjectSpace:Vt&&M.normalMapType===xh,normalMapTangentSpace:Vt&&M.normalMapType===rc,metalnessMap:Et,roughnessMap:C,anisotropy:w,anisotropyMap:ot,clearcoat:z,clearcoatMap:ft,clearcoatNormalMap:Xt,clearcoatRoughnessMap:Z,dispersion:j,iridescence:$,iridescenceMap:pt,iridescenceThicknessMap:At,sheen:K,sheenColorMap:Ct,sheenRoughnessMap:mt,specularMap:Gt,specularColorMap:Ft,specularIntensityMap:re,transmission:St,transmissionMap:D,thicknessMap:rt,gradientMap:X,opaque:M.transparent===!1&&M.blending===ki&&M.alphaToCoverage===!1,alphaMap:J,alphaTest:ut,alphaHash:lt,combine:M.combine,mapUv:de&&v(M.map.channel),aoMapUv:O&&v(M.aoMap.channel),lightMapUv:Xe&&v(M.lightMap.channel),bumpMapUv:Ht&&v(M.bumpMap.channel),normalMapUv:Vt&&v(M.normalMap.channel),displacementMapUv:Tt&&v(M.displacementMap.channel),emissiveMapUv:oe&&v(M.emissiveMap.channel),metalnessMapUv:Et&&v(M.metalnessMap.channel),roughnessMapUv:C&&v(M.roughnessMap.channel),anisotropyMapUv:ot&&v(M.anisotropyMap.channel),clearcoatMapUv:ft&&v(M.clearcoatMap.channel),clearcoatNormalMapUv:Xt&&v(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Z&&v(M.clearcoatRoughnessMap.channel),iridescenceMapUv:pt&&v(M.iridescenceMap.channel),iridescenceThicknessMapUv:At&&v(M.iridescenceThicknessMap.channel),sheenColorMapUv:Ct&&v(M.sheenColorMap.channel),sheenRoughnessMapUv:mt&&v(M.sheenRoughnessMap.channel),specularMapUv:Gt&&v(M.specularMap.channel),specularColorMapUv:Ft&&v(M.specularColorMap.channel),specularIntensityMapUv:re&&v(M.specularIntensityMap.channel),transmissionMapUv:D&&v(M.transmissionMap.channel),thicknessMapUv:rt&&v(M.thicknessMap.channel),alphaMapUv:J&&v(M.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(Vt||w),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!V.attributes.uv&&(de||J),fog:!!k,useFog:M.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Rt,skinning:I.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:vt,morphTextureStride:Pt,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:M.dithering,shadowMapEnabled:s.shadowMap.enabled&&P.length>0,shadowMapType:s.shadowMap.type,toneMapping:fe,decodeVideoTexture:de&&M.map.isVideoTexture===!0&&qt.getTransfer(M.map.colorSpace)===ne,decodeVideoTextureEmissive:oe&&M.emissiveMap.isVideoTexture===!0&&qt.getTransfer(M.emissiveMap.colorSpace)===ne,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===sn,flipSided:M.side===Ue,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Ut&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ut&&M.extensions.multiDraw===!0||Bt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return Te.vertexUv1s=c.has(1),Te.vertexUv2s=c.has(2),Te.vertexUv3s=c.has(3),c.clear(),Te}function f(M){const y=[];if(M.shaderID?y.push(M.shaderID):(y.push(M.customVertexShaderID),y.push(M.customFragmentShaderID)),M.defines!==void 0)for(const P in M.defines)y.push(P),y.push(M.defines[P]);return M.isRawShaderMaterial===!1&&(_(y,M),S(y,M),y.push(s.outputColorSpace)),y.push(M.customProgramCacheKey),y.join()}function _(M,y){M.push(y.precision),M.push(y.outputColorSpace),M.push(y.envMapMode),M.push(y.envMapCubeUVHeight),M.push(y.mapUv),M.push(y.alphaMapUv),M.push(y.lightMapUv),M.push(y.aoMapUv),M.push(y.bumpMapUv),M.push(y.normalMapUv),M.push(y.displacementMapUv),M.push(y.emissiveMapUv),M.push(y.metalnessMapUv),M.push(y.roughnessMapUv),M.push(y.anisotropyMapUv),M.push(y.clearcoatMapUv),M.push(y.clearcoatNormalMapUv),M.push(y.clearcoatRoughnessMapUv),M.push(y.iridescenceMapUv),M.push(y.iridescenceThicknessMapUv),M.push(y.sheenColorMapUv),M.push(y.sheenRoughnessMapUv),M.push(y.specularMapUv),M.push(y.specularColorMapUv),M.push(y.specularIntensityMapUv),M.push(y.transmissionMapUv),M.push(y.thicknessMapUv),M.push(y.combine),M.push(y.fogExp2),M.push(y.sizeAttenuation),M.push(y.morphTargetsCount),M.push(y.morphAttributeCount),M.push(y.numDirLights),M.push(y.numPointLights),M.push(y.numSpotLights),M.push(y.numSpotLightMaps),M.push(y.numHemiLights),M.push(y.numRectAreaLights),M.push(y.numDirLightShadows),M.push(y.numPointLightShadows),M.push(y.numSpotLightShadows),M.push(y.numSpotLightShadowsWithMaps),M.push(y.numLightProbes),M.push(y.shadowMapType),M.push(y.toneMapping),M.push(y.numClippingPlanes),M.push(y.numClipIntersection),M.push(y.depthPacking)}function S(M,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),M.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reverseDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),M.push(o.mask)}function x(M){const y=g[M.type];let P;if(y){const F=hn[y];P=Kh.clone(F.uniforms)}else P=M.uniforms;return P}function L(M,y){let P;for(let F=0,I=h.length;F<I;F++){const k=h[F];if(k.cacheKey===y){P=k,++P.usedTimes;break}}return P===void 0&&(P=new lm(s,y,M,r),h.push(P)),P}function A(M){if(--M.usedTimes===0){const y=h.indexOf(M);h[y]=h[h.length-1],h.pop(),M.destroy()}}function b(M){l.remove(M)}function R(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:x,acquireProgram:L,releaseProgram:A,releaseShaderCache:b,programs:h,dispose:R}}function fm(){let s=new WeakMap;function t(a){return s.has(a)}function e(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function pm(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function pl(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function ml(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function a(u,d,p,g,v,m){let f=s[t];return f===void 0?(f={id:u.id,object:u,geometry:d,material:p,groupOrder:g,renderOrder:u.renderOrder,z:v,group:m},s[t]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=p,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=v,f.group=m),t++,f}function o(u,d,p,g,v,m){const f=a(u,d,p,g,v,m);p.transmission>0?n.push(f):p.transparent===!0?i.push(f):e.push(f)}function l(u,d,p,g,v,m){const f=a(u,d,p,g,v,m);p.transmission>0?n.unshift(f):p.transparent===!0?i.unshift(f):e.unshift(f)}function c(u,d){e.length>1&&e.sort(u||pm),n.length>1&&n.sort(d||pl),i.length>1&&i.sort(d||pl)}function h(){for(let u=t,d=s.length;u<d;u++){const p=s[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:o,unshift:l,finish:h,sort:c}}function mm(){let s=new WeakMap;function t(n,i){const r=s.get(n);let a;return r===void 0?(a=new ml,s.set(n,[a])):i>=r.length?(a=new ml,r.push(a)):a=r[i],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function gm(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new T,color:new zt};break;case"SpotLight":e={position:new T,direction:new T,color:new zt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new T,color:new zt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new T,skyColor:new zt,groundColor:new zt};break;case"RectAreaLight":e={color:new zt,position:new T,halfWidth:new T,halfHeight:new T};break}return s[t.id]=e,e}}}function vm(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let _m=0;function xm(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function ym(s){const t=new gm,e=vm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new T);const i=new T,r=new Zt,a=new Zt;function o(c){let h=0,u=0,d=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let p=0,g=0,v=0,m=0,f=0,_=0,S=0,x=0,L=0,A=0,b=0;c.sort(xm);for(let M=0,y=c.length;M<y;M++){const P=c[M],F=P.color,I=P.intensity,k=P.distance,V=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=F.r*I,u+=F.g*I,d+=F.b*I;else if(P.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(P.sh.coefficients[W],I);b++}else if(P.isDirectionalLight){const W=t.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const Y=P.shadow,G=e.get(P);G.shadowIntensity=Y.intensity,G.shadowBias=Y.bias,G.shadowNormalBias=Y.normalBias,G.shadowRadius=Y.radius,G.shadowMapSize=Y.mapSize,n.directionalShadow[p]=G,n.directionalShadowMap[p]=V,n.directionalShadowMatrix[p]=P.shadow.matrix,_++}n.directional[p]=W,p++}else if(P.isSpotLight){const W=t.get(P);W.position.setFromMatrixPosition(P.matrixWorld),W.color.copy(F).multiplyScalar(I),W.distance=k,W.coneCos=Math.cos(P.angle),W.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),W.decay=P.decay,n.spot[v]=W;const Y=P.shadow;if(P.map&&(n.spotLightMap[L]=P.map,L++,Y.updateMatrices(P),P.castShadow&&A++),n.spotLightMatrix[v]=Y.matrix,P.castShadow){const G=e.get(P);G.shadowIntensity=Y.intensity,G.shadowBias=Y.bias,G.shadowNormalBias=Y.normalBias,G.shadowRadius=Y.radius,G.shadowMapSize=Y.mapSize,n.spotShadow[v]=G,n.spotShadowMap[v]=V,x++}v++}else if(P.isRectAreaLight){const W=t.get(P);W.color.copy(F).multiplyScalar(I),W.halfWidth.set(P.width*.5,0,0),W.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=W,m++}else if(P.isPointLight){const W=t.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),W.distance=P.distance,W.decay=P.decay,P.castShadow){const Y=P.shadow,G=e.get(P);G.shadowIntensity=Y.intensity,G.shadowBias=Y.bias,G.shadowNormalBias=Y.normalBias,G.shadowRadius=Y.radius,G.shadowMapSize=Y.mapSize,G.shadowCameraNear=Y.camera.near,G.shadowCameraFar=Y.camera.far,n.pointShadow[g]=G,n.pointShadowMap[g]=V,n.pointShadowMatrix[g]=P.shadow.matrix,S++}n.point[g]=W,g++}else if(P.isHemisphereLight){const W=t.get(P);W.skyColor.copy(P.color).multiplyScalar(I),W.groundColor.copy(P.groundColor).multiplyScalar(I),n.hemi[f]=W,f++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=st.LTC_FLOAT_1,n.rectAreaLTC2=st.LTC_FLOAT_2):(n.rectAreaLTC1=st.LTC_HALF_1,n.rectAreaLTC2=st.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const R=n.hash;(R.directionalLength!==p||R.pointLength!==g||R.spotLength!==v||R.rectAreaLength!==m||R.hemiLength!==f||R.numDirectionalShadows!==_||R.numPointShadows!==S||R.numSpotShadows!==x||R.numSpotMaps!==L||R.numLightProbes!==b)&&(n.directional.length=p,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=_,n.directionalShadowMap.length=_,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=_,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=x+L-A,n.spotLightMap.length=L,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=b,R.directionalLength=p,R.pointLength=g,R.spotLength=v,R.rectAreaLength=m,R.hemiLength=f,R.numDirectionalShadows=_,R.numPointShadows=S,R.numSpotShadows=x,R.numSpotMaps=L,R.numLightProbes=b,n.version=_m++)}function l(c,h){let u=0,d=0,p=0,g=0,v=0;const m=h.matrixWorldInverse;for(let f=0,_=c.length;f<_;f++){const S=c[f];if(S.isDirectionalLight){const x=n.directional[u];x.direction.setFromMatrixPosition(S.matrixWorld),i.setFromMatrixPosition(S.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),u++}else if(S.isSpotLight){const x=n.spot[p];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(S.matrixWorld),i.setFromMatrixPosition(S.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),p++}else if(S.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(m),a.identity(),r.copy(S.matrixWorld),r.premultiply(m),a.extractRotation(r),x.halfWidth.set(S.width*.5,0,0),x.halfHeight.set(0,S.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),g++}else if(S.isPointLight){const x=n.point[d];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(m),d++}else if(S.isHemisphereLight){const x=n.hemi[v];x.direction.setFromMatrixPosition(S.matrixWorld),x.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:n}}function gl(s){const t=new ym(s),e=[],n=[];function i(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function Mm(s){let t=new WeakMap;function e(i,r=0){const a=t.get(i);let o;return a===void 0?(o=new gl(s),t.set(i,[o])):r>=a.length?(o=new gl(s),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class Sm extends mi{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=vh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class wm extends mi{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const bm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Em=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Tm(s,t,e){let n=new Qa;const i=new et,r=new et,a=new se,o=new Sm({depthPacking:_h}),l=new wm,c={},h=e.maxTextureSize,u={[Jn]:Ue,[Ue]:Jn,[sn]:sn},d=new Je({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new et},radius:{value:4}},vertexShader:bm,fragmentShader:Em}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const g=new be;g.setAttribute("position",new ze(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new dt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Xl;let f=this.type;this.render=function(A,b,R){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const M=s.getRenderTarget(),y=s.getActiveCubeFace(),P=s.getActiveMipmapLevel(),F=s.state;F.setBlending(Yn),F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const I=f!==Tn&&this.type===Tn,k=f===Tn&&this.type!==Tn;for(let V=0,W=A.length;V<W;V++){const Y=A[V],G=Y.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;i.copy(G.mapSize);const nt=G.getFrameExtents();if(i.multiply(nt),r.copy(G.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/nt.x),i.x=r.x*nt.x,G.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/nt.y),i.y=r.y*nt.y,G.mapSize.y=r.y)),G.map===null||I===!0||k===!0){const vt=this.type!==Tn?{minFilter:on,magFilter:on}:{};G.map!==null&&G.map.dispose(),G.map=new fn(i.x,i.y,vt),G.map.texture.name=Y.name+".shadowMap",G.camera.updateProjectionMatrix()}s.setRenderTarget(G.map),s.clear();const ht=G.getViewportCount();for(let vt=0;vt<ht;vt++){const Pt=G.getViewport(vt);a.set(r.x*Pt.x,r.y*Pt.y,r.x*Pt.z,r.y*Pt.w),F.viewport(a),G.updateMatrices(Y,vt),n=G.getFrustum(),x(b,R,G.camera,Y,this.type)}G.isPointLightShadow!==!0&&this.type===Tn&&_(G,R),G.needsUpdate=!1}f=this.type,m.needsUpdate=!1,s.setRenderTarget(M,y,P)};function _(A,b){const R=t.update(v);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new fn(i.x,i.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,s.setRenderTarget(A.mapPass),s.clear(),s.renderBufferDirect(b,null,R,d,v,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,s.setRenderTarget(A.map),s.clear(),s.renderBufferDirect(b,null,R,p,v,null)}function S(A,b,R,M){let y=null;const P=R.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(P!==void 0)y=P;else if(y=R.isPointLight===!0?l:o,s.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0){const F=y.uuid,I=b.uuid;let k=c[F];k===void 0&&(k={},c[F]=k);let V=k[I];V===void 0&&(V=y.clone(),k[I]=V,b.addEventListener("dispose",L)),y=V}if(y.visible=b.visible,y.wireframe=b.wireframe,M===Tn?y.side=b.shadowSide!==null?b.shadowSide:b.side:y.side=b.shadowSide!==null?b.shadowSide:u[b.side],y.alphaMap=b.alphaMap,y.alphaTest=b.alphaTest,y.map=b.map,y.clipShadows=b.clipShadows,y.clippingPlanes=b.clippingPlanes,y.clipIntersection=b.clipIntersection,y.displacementMap=b.displacementMap,y.displacementScale=b.displacementScale,y.displacementBias=b.displacementBias,y.wireframeLinewidth=b.wireframeLinewidth,y.linewidth=b.linewidth,R.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const F=s.properties.get(y);F.light=R}return y}function x(A,b,R,M,y){if(A.visible===!1)return;if(A.layers.test(b.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&y===Tn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,A.matrixWorld);const I=t.update(A),k=A.material;if(Array.isArray(k)){const V=I.groups;for(let W=0,Y=V.length;W<Y;W++){const G=V[W],nt=k[G.materialIndex];if(nt&&nt.visible){const ht=S(A,nt,M,y);A.onBeforeShadow(s,A,b,R,I,ht,G),s.renderBufferDirect(R,null,I,ht,A,G),A.onAfterShadow(s,A,b,R,I,ht,G)}}}else if(k.visible){const V=S(A,k,M,y);A.onBeforeShadow(s,A,b,R,I,V,null),s.renderBufferDirect(R,null,I,V,A,null),A.onAfterShadow(s,A,b,R,I,V,null)}}const F=A.children;for(let I=0,k=F.length;I<k;I++)x(F[I],b,R,M,y)}function L(A){A.target.removeEventListener("dispose",L);for(const R in c){const M=c[R],y=A.target.uuid;y in M&&(M[y].dispose(),delete M[y])}}}const Am={[ia]:sa,[ra]:la,[aa]:ca,[Hi]:oa,[sa]:ia,[la]:ra,[ca]:aa,[oa]:Hi};function Rm(s,t){function e(){let D=!1;const rt=new se;let X=null;const J=new se(0,0,0,0);return{setMask:function(ut){X!==ut&&!D&&(s.colorMask(ut,ut,ut,ut),X=ut)},setLocked:function(ut){D=ut},setClear:function(ut,lt,Ut,fe,Te){Te===!0&&(ut*=fe,lt*=fe,Ut*=fe),rt.set(ut,lt,Ut,fe),J.equals(rt)===!1&&(s.clearColor(ut,lt,Ut,fe),J.copy(rt))},reset:function(){D=!1,X=null,J.set(-1,0,0,0)}}}function n(){let D=!1,rt=!1,X=null,J=null,ut=null;return{setReversed:function(lt){if(rt!==lt){const Ut=t.get("EXT_clip_control");rt?Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.ZERO_TO_ONE_EXT):Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.NEGATIVE_ONE_TO_ONE_EXT);const fe=ut;ut=null,this.setClear(fe)}rt=lt},getReversed:function(){return rt},setTest:function(lt){lt?at(s.DEPTH_TEST):Rt(s.DEPTH_TEST)},setMask:function(lt){X!==lt&&!D&&(s.depthMask(lt),X=lt)},setFunc:function(lt){if(rt&&(lt=Am[lt]),J!==lt){switch(lt){case ia:s.depthFunc(s.NEVER);break;case sa:s.depthFunc(s.ALWAYS);break;case ra:s.depthFunc(s.LESS);break;case Hi:s.depthFunc(s.LEQUAL);break;case aa:s.depthFunc(s.EQUAL);break;case oa:s.depthFunc(s.GEQUAL);break;case la:s.depthFunc(s.GREATER);break;case ca:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}J=lt}},setLocked:function(lt){D=lt},setClear:function(lt){ut!==lt&&(rt&&(lt=1-lt),s.clearDepth(lt),ut=lt)},reset:function(){D=!1,X=null,J=null,ut=null,rt=!1}}}function i(){let D=!1,rt=null,X=null,J=null,ut=null,lt=null,Ut=null,fe=null,Te=null;return{setTest:function(te){D||(te?at(s.STENCIL_TEST):Rt(s.STENCIL_TEST))},setMask:function(te){rt!==te&&!D&&(s.stencilMask(te),rt=te)},setFunc:function(te,$e,gn){(X!==te||J!==$e||ut!==gn)&&(s.stencilFunc(te,$e,gn),X=te,J=$e,ut=gn)},setOp:function(te,$e,gn){(lt!==te||Ut!==$e||fe!==gn)&&(s.stencilOp(te,$e,gn),lt=te,Ut=$e,fe=gn)},setLocked:function(te){D=te},setClear:function(te){Te!==te&&(s.clearStencil(te),Te=te)},reset:function(){D=!1,rt=null,X=null,J=null,ut=null,lt=null,Ut=null,fe=null,Te=null}}}const r=new e,a=new n,o=new i,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,p=[],g=null,v=!1,m=null,f=null,_=null,S=null,x=null,L=null,A=null,b=new zt(0,0,0),R=0,M=!1,y=null,P=null,F=null,I=null,k=null;const V=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,Y=0;const G=s.getParameter(s.VERSION);G.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(G)[1]),W=Y>=1):G.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),W=Y>=2);let nt=null,ht={};const vt=s.getParameter(s.SCISSOR_BOX),Pt=s.getParameter(s.VIEWPORT),jt=new se().fromArray(vt),q=new se().fromArray(Pt);function tt(D,rt,X,J){const ut=new Uint8Array(4),lt=s.createTexture();s.bindTexture(D,lt),s.texParameteri(D,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(D,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Ut=0;Ut<X;Ut++)D===s.TEXTURE_3D||D===s.TEXTURE_2D_ARRAY?s.texImage3D(rt,0,s.RGBA,1,1,J,0,s.RGBA,s.UNSIGNED_BYTE,ut):s.texImage2D(rt+Ut,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,ut);return lt}const Mt={};Mt[s.TEXTURE_2D]=tt(s.TEXTURE_2D,s.TEXTURE_2D,1),Mt[s.TEXTURE_CUBE_MAP]=tt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Mt[s.TEXTURE_2D_ARRAY]=tt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Mt[s.TEXTURE_3D]=tt(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),at(s.DEPTH_TEST),a.setFunc(Hi),Ht(!1),Vt(So),at(s.CULL_FACE),O(Yn);function at(D){h[D]!==!0&&(s.enable(D),h[D]=!0)}function Rt(D){h[D]!==!1&&(s.disable(D),h[D]=!1)}function It(D,rt){return u[D]!==rt?(s.bindFramebuffer(D,rt),u[D]=rt,D===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=rt),D===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=rt),!0):!1}function Bt(D,rt){let X=p,J=!1;if(D){X=d.get(rt),X===void 0&&(X=[],d.set(rt,X));const ut=D.textures;if(X.length!==ut.length||X[0]!==s.COLOR_ATTACHMENT0){for(let lt=0,Ut=ut.length;lt<Ut;lt++)X[lt]=s.COLOR_ATTACHMENT0+lt;X.length=ut.length,J=!0}}else X[0]!==s.BACK&&(X[0]=s.BACK,J=!0);J&&s.drawBuffers(X)}function de(D){return g!==D?(s.useProgram(D),g=D,!0):!1}const Wt={[li]:s.FUNC_ADD,[Wc]:s.FUNC_SUBTRACT,[Xc]:s.FUNC_REVERSE_SUBTRACT};Wt[qc]=s.MIN,Wt[Yc]=s.MAX;const pe={[Kc]:s.ZERO,[jc]:s.ONE,[Jc]:s.SRC_COLOR,[ea]:s.SRC_ALPHA,[nh]:s.SRC_ALPHA_SATURATE,[th]:s.DST_COLOR,[Zc]:s.DST_ALPHA,[$c]:s.ONE_MINUS_SRC_COLOR,[na]:s.ONE_MINUS_SRC_ALPHA,[eh]:s.ONE_MINUS_DST_COLOR,[Qc]:s.ONE_MINUS_DST_ALPHA,[ih]:s.CONSTANT_COLOR,[sh]:s.ONE_MINUS_CONSTANT_COLOR,[rh]:s.CONSTANT_ALPHA,[ah]:s.ONE_MINUS_CONSTANT_ALPHA};function O(D,rt,X,J,ut,lt,Ut,fe,Te,te){if(D===Yn){v===!0&&(Rt(s.BLEND),v=!1);return}if(v===!1&&(at(s.BLEND),v=!0),D!==Gc){if(D!==m||te!==M){if((f!==li||x!==li)&&(s.blendEquation(s.FUNC_ADD),f=li,x=li),te)switch(D){case ki:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ta:s.blendFunc(s.ONE,s.ONE);break;case wo:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case bo:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case ki:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ta:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case wo:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case bo:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}_=null,S=null,L=null,A=null,b.set(0,0,0),R=0,m=D,M=te}return}ut=ut||rt,lt=lt||X,Ut=Ut||J,(rt!==f||ut!==x)&&(s.blendEquationSeparate(Wt[rt],Wt[ut]),f=rt,x=ut),(X!==_||J!==S||lt!==L||Ut!==A)&&(s.blendFuncSeparate(pe[X],pe[J],pe[lt],pe[Ut]),_=X,S=J,L=lt,A=Ut),(fe.equals(b)===!1||Te!==R)&&(s.blendColor(fe.r,fe.g,fe.b,Te),b.copy(fe),R=Te),m=D,M=!1}function Xe(D,rt){D.side===sn?Rt(s.CULL_FACE):at(s.CULL_FACE);let X=D.side===Ue;rt&&(X=!X),Ht(X),D.blending===ki&&D.transparent===!1?O(Yn):O(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);const J=D.stencilWrite;o.setTest(J),J&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),oe(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?at(s.SAMPLE_ALPHA_TO_COVERAGE):Rt(s.SAMPLE_ALPHA_TO_COVERAGE)}function Ht(D){y!==D&&(D?s.frontFace(s.CW):s.frontFace(s.CCW),y=D)}function Vt(D){D!==Hc?(at(s.CULL_FACE),D!==P&&(D===So?s.cullFace(s.BACK):D===Vc?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Rt(s.CULL_FACE),P=D}function Tt(D){D!==F&&(W&&s.lineWidth(D),F=D)}function oe(D,rt,X){D?(at(s.POLYGON_OFFSET_FILL),(I!==rt||k!==X)&&(s.polygonOffset(rt,X),I=rt,k=X)):Rt(s.POLYGON_OFFSET_FILL)}function Et(D){D?at(s.SCISSOR_TEST):Rt(s.SCISSOR_TEST)}function C(D){D===void 0&&(D=s.TEXTURE0+V-1),nt!==D&&(s.activeTexture(D),nt=D)}function w(D,rt,X){X===void 0&&(nt===null?X=s.TEXTURE0+V-1:X=nt);let J=ht[X];J===void 0&&(J={type:void 0,texture:void 0},ht[X]=J),(J.type!==D||J.texture!==rt)&&(nt!==X&&(s.activeTexture(X),nt=X),s.bindTexture(D,rt||Mt[D]),J.type=D,J.texture=rt)}function z(){const D=ht[nt];D!==void 0&&D.type!==void 0&&(s.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function j(){try{s.compressedTexImage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function $(){try{s.compressedTexImage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function K(){try{s.texSubImage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function St(){try{s.texSubImage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ot(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ft(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Xt(){try{s.texStorage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Z(){try{s.texStorage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function pt(){try{s.texImage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function At(){try{s.texImage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ct(D){jt.equals(D)===!1&&(s.scissor(D.x,D.y,D.z,D.w),jt.copy(D))}function mt(D){q.equals(D)===!1&&(s.viewport(D.x,D.y,D.z,D.w),q.copy(D))}function Gt(D,rt){let X=c.get(rt);X===void 0&&(X=new WeakMap,c.set(rt,X));let J=X.get(D);J===void 0&&(J=s.getUniformBlockIndex(rt,D.name),X.set(D,J))}function Ft(D,rt){const J=c.get(rt).get(D);l.get(rt)!==J&&(s.uniformBlockBinding(rt,J,D.__bindingPointIndex),l.set(rt,J))}function re(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},nt=null,ht={},u={},d=new WeakMap,p=[],g=null,v=!1,m=null,f=null,_=null,S=null,x=null,L=null,A=null,b=new zt(0,0,0),R=0,M=!1,y=null,P=null,F=null,I=null,k=null,jt.set(0,0,s.canvas.width,s.canvas.height),q.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:at,disable:Rt,bindFramebuffer:It,drawBuffers:Bt,useProgram:de,setBlending:O,setMaterial:Xe,setFlipSided:Ht,setCullFace:Vt,setLineWidth:Tt,setPolygonOffset:oe,setScissorTest:Et,activeTexture:C,bindTexture:w,unbindTexture:z,compressedTexImage2D:j,compressedTexImage3D:$,texImage2D:pt,texImage3D:At,updateUBOMapping:Gt,uniformBlockBinding:Ft,texStorage2D:Xt,texStorage3D:Z,texSubImage2D:K,texSubImage3D:St,compressedTexSubImage2D:ot,compressedTexSubImage3D:ft,scissor:Ct,viewport:mt,reset:re}}function vl(s,t,e,n){const i=Cm(n);switch(e){case Zl:return s*t;case tc:return s*t;case ec:return s*t*2;case nc:return s*t/i.components*i.byteLength;case Ja:return s*t/i.components*i.byteLength;case ic:return s*t*2/i.components*i.byteLength;case $a:return s*t*2/i.components*i.byteLength;case Ql:return s*t*3/i.components*i.byteLength;case rn:return s*t*4/i.components*i.byteLength;case Za:return s*t*4/i.components*i.byteLength;case qs:case Ys:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Ks:case js:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case pa:case ga:return Math.max(s,16)*Math.max(t,8)/4;case fa:case ma:return Math.max(s,8)*Math.max(t,8)/2;case va:case _a:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case xa:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case ya:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Ma:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case Sa:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case wa:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case ba:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case Ea:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case Ta:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case Aa:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case Ra:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case Ca:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Pa:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case La:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case Da:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Ia:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Js:case Ua:case Na:return Math.ceil(s/4)*Math.ceil(t/4)*16;case sc:case Oa:return Math.ceil(s/4)*Math.ceil(t/4)*8;case Fa:case ka:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Cm(s){switch(s){case In:case jl:return{byteLength:1,components:1};case fs:case Jl:case Kn:return{byteLength:2,components:1};case Ka:case ja:return{byteLength:2,components:4};case fi:case Ya:case Cn:return{byteLength:4,components:1};case $l:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function Pm(s,t,e,n,i,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new et,h=new WeakMap;let u;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,w){return p?new OffscreenCanvas(C,w):Qs("canvas")}function v(C,w,z){let j=1;const $=Et(C);if(($.width>z||$.height>z)&&(j=z/Math.max($.width,$.height)),j<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const K=Math.floor(j*$.width),St=Math.floor(j*$.height);u===void 0&&(u=g(K,St));const ot=w?g(K,St):u;return ot.width=K,ot.height=St,ot.getContext("2d").drawImage(C,0,0,K,St),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+K+"x"+St+")."),ot}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),C;return C}function m(C){return C.generateMipmaps}function f(C){s.generateMipmap(C)}function _(C){return C.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?s.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function S(C,w,z,j,$=!1){if(C!==null){if(s[C]!==void 0)return s[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let K=w;if(w===s.RED&&(z===s.FLOAT&&(K=s.R32F),z===s.HALF_FLOAT&&(K=s.R16F),z===s.UNSIGNED_BYTE&&(K=s.R8)),w===s.RED_INTEGER&&(z===s.UNSIGNED_BYTE&&(K=s.R8UI),z===s.UNSIGNED_SHORT&&(K=s.R16UI),z===s.UNSIGNED_INT&&(K=s.R32UI),z===s.BYTE&&(K=s.R8I),z===s.SHORT&&(K=s.R16I),z===s.INT&&(K=s.R32I)),w===s.RG&&(z===s.FLOAT&&(K=s.RG32F),z===s.HALF_FLOAT&&(K=s.RG16F),z===s.UNSIGNED_BYTE&&(K=s.RG8)),w===s.RG_INTEGER&&(z===s.UNSIGNED_BYTE&&(K=s.RG8UI),z===s.UNSIGNED_SHORT&&(K=s.RG16UI),z===s.UNSIGNED_INT&&(K=s.RG32UI),z===s.BYTE&&(K=s.RG8I),z===s.SHORT&&(K=s.RG16I),z===s.INT&&(K=s.RG32I)),w===s.RGB_INTEGER&&(z===s.UNSIGNED_BYTE&&(K=s.RGB8UI),z===s.UNSIGNED_SHORT&&(K=s.RGB16UI),z===s.UNSIGNED_INT&&(K=s.RGB32UI),z===s.BYTE&&(K=s.RGB8I),z===s.SHORT&&(K=s.RGB16I),z===s.INT&&(K=s.RGB32I)),w===s.RGBA_INTEGER&&(z===s.UNSIGNED_BYTE&&(K=s.RGBA8UI),z===s.UNSIGNED_SHORT&&(K=s.RGBA16UI),z===s.UNSIGNED_INT&&(K=s.RGBA32UI),z===s.BYTE&&(K=s.RGBA8I),z===s.SHORT&&(K=s.RGBA16I),z===s.INT&&(K=s.RGBA32I)),w===s.RGB&&z===s.UNSIGNED_INT_5_9_9_9_REV&&(K=s.RGB9_E5),w===s.RGBA){const St=$?ir:qt.getTransfer(j);z===s.FLOAT&&(K=s.RGBA32F),z===s.HALF_FLOAT&&(K=s.RGBA16F),z===s.UNSIGNED_BYTE&&(K=St===ne?s.SRGB8_ALPHA8:s.RGBA8),z===s.UNSIGNED_SHORT_4_4_4_4&&(K=s.RGBA4),z===s.UNSIGNED_SHORT_5_5_5_1&&(K=s.RGB5_A1)}return(K===s.R16F||K===s.R32F||K===s.RG16F||K===s.RG32F||K===s.RGBA16F||K===s.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function x(C,w){let z;return C?w===null||w===fi||w===Wi?z=s.DEPTH24_STENCIL8:w===Cn?z=s.DEPTH32F_STENCIL8:w===fs&&(z=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===fi||w===Wi?z=s.DEPTH_COMPONENT24:w===Cn?z=s.DEPTH_COMPONENT32F:w===fs&&(z=s.DEPTH_COMPONENT16),z}function L(C,w){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==on&&C.minFilter!==dn?Math.log2(Math.max(w.width,w.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?w.mipmaps.length:1}function A(C){const w=C.target;w.removeEventListener("dispose",A),R(w),w.isVideoTexture&&h.delete(w)}function b(C){const w=C.target;w.removeEventListener("dispose",b),y(w)}function R(C){const w=n.get(C);if(w.__webglInit===void 0)return;const z=C.source,j=d.get(z);if(j){const $=j[w.__cacheKey];$.usedTimes--,$.usedTimes===0&&M(C),Object.keys(j).length===0&&d.delete(z)}n.remove(C)}function M(C){const w=n.get(C);s.deleteTexture(w.__webglTexture);const z=C.source,j=d.get(z);delete j[w.__cacheKey],a.memory.textures--}function y(C){const w=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(w.__webglFramebuffer[j]))for(let $=0;$<w.__webglFramebuffer[j].length;$++)s.deleteFramebuffer(w.__webglFramebuffer[j][$]);else s.deleteFramebuffer(w.__webglFramebuffer[j]);w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer[j])}else{if(Array.isArray(w.__webglFramebuffer))for(let j=0;j<w.__webglFramebuffer.length;j++)s.deleteFramebuffer(w.__webglFramebuffer[j]);else s.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&s.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let j=0;j<w.__webglColorRenderbuffer.length;j++)w.__webglColorRenderbuffer[j]&&s.deleteRenderbuffer(w.__webglColorRenderbuffer[j]);w.__webglDepthRenderbuffer&&s.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const z=C.textures;for(let j=0,$=z.length;j<$;j++){const K=n.get(z[j]);K.__webglTexture&&(s.deleteTexture(K.__webglTexture),a.memory.textures--),n.remove(z[j])}n.remove(C)}let P=0;function F(){P=0}function I(){const C=P;return C>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+i.maxTextures),P+=1,C}function k(C){const w=[];return w.push(C.wrapS),w.push(C.wrapT),w.push(C.wrapR||0),w.push(C.magFilter),w.push(C.minFilter),w.push(C.anisotropy),w.push(C.internalFormat),w.push(C.format),w.push(C.type),w.push(C.generateMipmaps),w.push(C.premultiplyAlpha),w.push(C.flipY),w.push(C.unpackAlignment),w.push(C.colorSpace),w.join()}function V(C,w){const z=n.get(C);if(C.isVideoTexture&&Tt(C),C.isRenderTargetTexture===!1&&C.version>0&&z.__version!==C.version){const j=C.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(z,C,w);return}}e.bindTexture(s.TEXTURE_2D,z.__webglTexture,s.TEXTURE0+w)}function W(C,w){const z=n.get(C);if(C.version>0&&z.__version!==C.version){q(z,C,w);return}e.bindTexture(s.TEXTURE_2D_ARRAY,z.__webglTexture,s.TEXTURE0+w)}function Y(C,w){const z=n.get(C);if(C.version>0&&z.__version!==C.version){q(z,C,w);return}e.bindTexture(s.TEXTURE_3D,z.__webglTexture,s.TEXTURE0+w)}function G(C,w){const z=n.get(C);if(C.version>0&&z.__version!==C.version){tt(z,C,w);return}e.bindTexture(s.TEXTURE_CUBE_MAP,z.__webglTexture,s.TEXTURE0+w)}const nt={[di]:s.REPEAT,[hi]:s.CLAMP_TO_EDGE,[da]:s.MIRRORED_REPEAT},ht={[on]:s.NEAREST,[gh]:s.NEAREST_MIPMAP_NEAREST,[_s]:s.NEAREST_MIPMAP_LINEAR,[dn]:s.LINEAR,[cr]:s.LINEAR_MIPMAP_NEAREST,[ui]:s.LINEAR_MIPMAP_LINEAR},vt={[yh]:s.NEVER,[Th]:s.ALWAYS,[Mh]:s.LESS,[ac]:s.LEQUAL,[Sh]:s.EQUAL,[Eh]:s.GEQUAL,[wh]:s.GREATER,[bh]:s.NOTEQUAL};function Pt(C,w){if(w.type===Cn&&t.has("OES_texture_float_linear")===!1&&(w.magFilter===dn||w.magFilter===cr||w.magFilter===_s||w.magFilter===ui||w.minFilter===dn||w.minFilter===cr||w.minFilter===_s||w.minFilter===ui)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(C,s.TEXTURE_WRAP_S,nt[w.wrapS]),s.texParameteri(C,s.TEXTURE_WRAP_T,nt[w.wrapT]),(C===s.TEXTURE_3D||C===s.TEXTURE_2D_ARRAY)&&s.texParameteri(C,s.TEXTURE_WRAP_R,nt[w.wrapR]),s.texParameteri(C,s.TEXTURE_MAG_FILTER,ht[w.magFilter]),s.texParameteri(C,s.TEXTURE_MIN_FILTER,ht[w.minFilter]),w.compareFunction&&(s.texParameteri(C,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(C,s.TEXTURE_COMPARE_FUNC,vt[w.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===on||w.minFilter!==_s&&w.minFilter!==ui||w.type===Cn&&t.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){const z=t.get("EXT_texture_filter_anisotropic");s.texParameterf(C,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,i.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function jt(C,w){let z=!1;C.__webglInit===void 0&&(C.__webglInit=!0,w.addEventListener("dispose",A));const j=w.source;let $=d.get(j);$===void 0&&($={},d.set(j,$));const K=k(w);if(K!==C.__cacheKey){$[K]===void 0&&($[K]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,z=!0),$[K].usedTimes++;const St=$[C.__cacheKey];St!==void 0&&($[C.__cacheKey].usedTimes--,St.usedTimes===0&&M(w)),C.__cacheKey=K,C.__webglTexture=$[K].texture}return z}function q(C,w,z){let j=s.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(j=s.TEXTURE_2D_ARRAY),w.isData3DTexture&&(j=s.TEXTURE_3D);const $=jt(C,w),K=w.source;e.bindTexture(j,C.__webglTexture,s.TEXTURE0+z);const St=n.get(K);if(K.version!==St.__version||$===!0){e.activeTexture(s.TEXTURE0+z);const ot=qt.getPrimaries(qt.workingColorSpace),ft=w.colorSpace===Xn?null:qt.getPrimaries(w.colorSpace),Xt=w.colorSpace===Xn||ot===ft?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Xt);let Z=v(w.image,!1,i.maxTextureSize);Z=oe(w,Z);const pt=r.convert(w.format,w.colorSpace),At=r.convert(w.type);let Ct=S(w.internalFormat,pt,At,w.colorSpace,w.isVideoTexture);Pt(j,w);let mt;const Gt=w.mipmaps,Ft=w.isVideoTexture!==!0,re=St.__version===void 0||$===!0,D=K.dataReady,rt=L(w,Z);if(w.isDepthTexture)Ct=x(w.format===Xi,w.type),re&&(Ft?e.texStorage2D(s.TEXTURE_2D,1,Ct,Z.width,Z.height):e.texImage2D(s.TEXTURE_2D,0,Ct,Z.width,Z.height,0,pt,At,null));else if(w.isDataTexture)if(Gt.length>0){Ft&&re&&e.texStorage2D(s.TEXTURE_2D,rt,Ct,Gt[0].width,Gt[0].height);for(let X=0,J=Gt.length;X<J;X++)mt=Gt[X],Ft?D&&e.texSubImage2D(s.TEXTURE_2D,X,0,0,mt.width,mt.height,pt,At,mt.data):e.texImage2D(s.TEXTURE_2D,X,Ct,mt.width,mt.height,0,pt,At,mt.data);w.generateMipmaps=!1}else Ft?(re&&e.texStorage2D(s.TEXTURE_2D,rt,Ct,Z.width,Z.height),D&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,Z.width,Z.height,pt,At,Z.data)):e.texImage2D(s.TEXTURE_2D,0,Ct,Z.width,Z.height,0,pt,At,Z.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){Ft&&re&&e.texStorage3D(s.TEXTURE_2D_ARRAY,rt,Ct,Gt[0].width,Gt[0].height,Z.depth);for(let X=0,J=Gt.length;X<J;X++)if(mt=Gt[X],w.format!==rn)if(pt!==null)if(Ft){if(D)if(w.layerUpdates.size>0){const ut=vl(mt.width,mt.height,w.format,w.type);for(const lt of w.layerUpdates){const Ut=mt.data.subarray(lt*ut/mt.data.BYTES_PER_ELEMENT,(lt+1)*ut/mt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,X,0,0,lt,mt.width,mt.height,1,pt,Ut)}w.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,X,0,0,0,mt.width,mt.height,Z.depth,pt,mt.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,X,Ct,mt.width,mt.height,Z.depth,0,mt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ft?D&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,X,0,0,0,mt.width,mt.height,Z.depth,pt,At,mt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,X,Ct,mt.width,mt.height,Z.depth,0,pt,At,mt.data)}else{Ft&&re&&e.texStorage2D(s.TEXTURE_2D,rt,Ct,Gt[0].width,Gt[0].height);for(let X=0,J=Gt.length;X<J;X++)mt=Gt[X],w.format!==rn?pt!==null?Ft?D&&e.compressedTexSubImage2D(s.TEXTURE_2D,X,0,0,mt.width,mt.height,pt,mt.data):e.compressedTexImage2D(s.TEXTURE_2D,X,Ct,mt.width,mt.height,0,mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ft?D&&e.texSubImage2D(s.TEXTURE_2D,X,0,0,mt.width,mt.height,pt,At,mt.data):e.texImage2D(s.TEXTURE_2D,X,Ct,mt.width,mt.height,0,pt,At,mt.data)}else if(w.isDataArrayTexture)if(Ft){if(re&&e.texStorage3D(s.TEXTURE_2D_ARRAY,rt,Ct,Z.width,Z.height,Z.depth),D)if(w.layerUpdates.size>0){const X=vl(Z.width,Z.height,w.format,w.type);for(const J of w.layerUpdates){const ut=Z.data.subarray(J*X/Z.data.BYTES_PER_ELEMENT,(J+1)*X/Z.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,J,Z.width,Z.height,1,pt,At,ut)}w.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,pt,At,Z.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,Ct,Z.width,Z.height,Z.depth,0,pt,At,Z.data);else if(w.isData3DTexture)Ft?(re&&e.texStorage3D(s.TEXTURE_3D,rt,Ct,Z.width,Z.height,Z.depth),D&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,pt,At,Z.data)):e.texImage3D(s.TEXTURE_3D,0,Ct,Z.width,Z.height,Z.depth,0,pt,At,Z.data);else if(w.isFramebufferTexture){if(re)if(Ft)e.texStorage2D(s.TEXTURE_2D,rt,Ct,Z.width,Z.height);else{let X=Z.width,J=Z.height;for(let ut=0;ut<rt;ut++)e.texImage2D(s.TEXTURE_2D,ut,Ct,X,J,0,pt,At,null),X>>=1,J>>=1}}else if(Gt.length>0){if(Ft&&re){const X=Et(Gt[0]);e.texStorage2D(s.TEXTURE_2D,rt,Ct,X.width,X.height)}for(let X=0,J=Gt.length;X<J;X++)mt=Gt[X],Ft?D&&e.texSubImage2D(s.TEXTURE_2D,X,0,0,pt,At,mt):e.texImage2D(s.TEXTURE_2D,X,Ct,pt,At,mt);w.generateMipmaps=!1}else if(Ft){if(re){const X=Et(Z);e.texStorage2D(s.TEXTURE_2D,rt,Ct,X.width,X.height)}D&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,pt,At,Z)}else e.texImage2D(s.TEXTURE_2D,0,Ct,pt,At,Z);m(w)&&f(j),St.__version=K.version,w.onUpdate&&w.onUpdate(w)}C.__version=w.version}function tt(C,w,z){if(w.image.length!==6)return;const j=jt(C,w),$=w.source;e.bindTexture(s.TEXTURE_CUBE_MAP,C.__webglTexture,s.TEXTURE0+z);const K=n.get($);if($.version!==K.__version||j===!0){e.activeTexture(s.TEXTURE0+z);const St=qt.getPrimaries(qt.workingColorSpace),ot=w.colorSpace===Xn?null:qt.getPrimaries(w.colorSpace),ft=w.colorSpace===Xn||St===ot?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ft);const Xt=w.isCompressedTexture||w.image[0].isCompressedTexture,Z=w.image[0]&&w.image[0].isDataTexture,pt=[];for(let J=0;J<6;J++)!Xt&&!Z?pt[J]=v(w.image[J],!0,i.maxCubemapSize):pt[J]=Z?w.image[J].image:w.image[J],pt[J]=oe(w,pt[J]);const At=pt[0],Ct=r.convert(w.format,w.colorSpace),mt=r.convert(w.type),Gt=S(w.internalFormat,Ct,mt,w.colorSpace),Ft=w.isVideoTexture!==!0,re=K.__version===void 0||j===!0,D=$.dataReady;let rt=L(w,At);Pt(s.TEXTURE_CUBE_MAP,w);let X;if(Xt){Ft&&re&&e.texStorage2D(s.TEXTURE_CUBE_MAP,rt,Gt,At.width,At.height);for(let J=0;J<6;J++){X=pt[J].mipmaps;for(let ut=0;ut<X.length;ut++){const lt=X[ut];w.format!==rn?Ct!==null?Ft?D&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,ut,0,0,lt.width,lt.height,Ct,lt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,ut,Gt,lt.width,lt.height,0,lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ft?D&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,ut,0,0,lt.width,lt.height,Ct,mt,lt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,ut,Gt,lt.width,lt.height,0,Ct,mt,lt.data)}}}else{if(X=w.mipmaps,Ft&&re){X.length>0&&rt++;const J=Et(pt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,rt,Gt,J.width,J.height)}for(let J=0;J<6;J++)if(Z){Ft?D&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,pt[J].width,pt[J].height,Ct,mt,pt[J].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Gt,pt[J].width,pt[J].height,0,Ct,mt,pt[J].data);for(let ut=0;ut<X.length;ut++){const Ut=X[ut].image[J].image;Ft?D&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,ut+1,0,0,Ut.width,Ut.height,Ct,mt,Ut.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,ut+1,Gt,Ut.width,Ut.height,0,Ct,mt,Ut.data)}}else{Ft?D&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Ct,mt,pt[J]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Gt,Ct,mt,pt[J]);for(let ut=0;ut<X.length;ut++){const lt=X[ut];Ft?D&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,ut+1,0,0,Ct,mt,lt.image[J]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,ut+1,Gt,Ct,mt,lt.image[J])}}}m(w)&&f(s.TEXTURE_CUBE_MAP),K.__version=$.version,w.onUpdate&&w.onUpdate(w)}C.__version=w.version}function Mt(C,w,z,j,$,K){const St=r.convert(z.format,z.colorSpace),ot=r.convert(z.type),ft=S(z.internalFormat,St,ot,z.colorSpace),Xt=n.get(w),Z=n.get(z);if(Z.__renderTarget=w,!Xt.__hasExternalTextures){const pt=Math.max(1,w.width>>K),At=Math.max(1,w.height>>K);$===s.TEXTURE_3D||$===s.TEXTURE_2D_ARRAY?e.texImage3D($,K,ft,pt,At,w.depth,0,St,ot,null):e.texImage2D($,K,ft,pt,At,0,St,ot,null)}e.bindFramebuffer(s.FRAMEBUFFER,C),Vt(w)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,j,$,Z.__webglTexture,0,Ht(w)):($===s.TEXTURE_2D||$>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,j,$,Z.__webglTexture,K),e.bindFramebuffer(s.FRAMEBUFFER,null)}function at(C,w,z){if(s.bindRenderbuffer(s.RENDERBUFFER,C),w.depthBuffer){const j=w.depthTexture,$=j&&j.isDepthTexture?j.type:null,K=x(w.stencilBuffer,$),St=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ot=Ht(w);Vt(w)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ot,K,w.width,w.height):z?s.renderbufferStorageMultisample(s.RENDERBUFFER,ot,K,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,K,w.width,w.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,St,s.RENDERBUFFER,C)}else{const j=w.textures;for(let $=0;$<j.length;$++){const K=j[$],St=r.convert(K.format,K.colorSpace),ot=r.convert(K.type),ft=S(K.internalFormat,St,ot,K.colorSpace),Xt=Ht(w);z&&Vt(w)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Xt,ft,w.width,w.height):Vt(w)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Xt,ft,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,ft,w.width,w.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Rt(C,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,C),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const j=n.get(w.depthTexture);j.__renderTarget=w,(!j.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),V(w.depthTexture,0);const $=j.__webglTexture,K=Ht(w);if(w.depthTexture.format===zi)Vt(w)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,$,0,K):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,$,0);else if(w.depthTexture.format===Xi)Vt(w)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,$,0,K):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,$,0);else throw new Error("Unknown depthTexture format")}function It(C){const w=n.get(C),z=C.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==C.depthTexture){const j=C.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),j){const $=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,j.removeEventListener("dispose",$)};j.addEventListener("dispose",$),w.__depthDisposeCallback=$}w.__boundDepthTexture=j}if(C.depthTexture&&!w.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");Rt(w.__webglFramebuffer,C)}else if(z){w.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(e.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer[j]),w.__webglDepthbuffer[j]===void 0)w.__webglDepthbuffer[j]=s.createRenderbuffer(),at(w.__webglDepthbuffer[j],C,!1);else{const $=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,K=w.__webglDepthbuffer[j];s.bindRenderbuffer(s.RENDERBUFFER,K),s.framebufferRenderbuffer(s.FRAMEBUFFER,$,s.RENDERBUFFER,K)}}else if(e.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=s.createRenderbuffer(),at(w.__webglDepthbuffer,C,!1);else{const j=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,$=w.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,$),s.framebufferRenderbuffer(s.FRAMEBUFFER,j,s.RENDERBUFFER,$)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function Bt(C,w,z){const j=n.get(C);w!==void 0&&Mt(j.__webglFramebuffer,C,C.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),z!==void 0&&It(C)}function de(C){const w=C.texture,z=n.get(C),j=n.get(w);C.addEventListener("dispose",b);const $=C.textures,K=C.isWebGLCubeRenderTarget===!0,St=$.length>1;if(St||(j.__webglTexture===void 0&&(j.__webglTexture=s.createTexture()),j.__version=w.version,a.memory.textures++),K){z.__webglFramebuffer=[];for(let ot=0;ot<6;ot++)if(w.mipmaps&&w.mipmaps.length>0){z.__webglFramebuffer[ot]=[];for(let ft=0;ft<w.mipmaps.length;ft++)z.__webglFramebuffer[ot][ft]=s.createFramebuffer()}else z.__webglFramebuffer[ot]=s.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){z.__webglFramebuffer=[];for(let ot=0;ot<w.mipmaps.length;ot++)z.__webglFramebuffer[ot]=s.createFramebuffer()}else z.__webglFramebuffer=s.createFramebuffer();if(St)for(let ot=0,ft=$.length;ot<ft;ot++){const Xt=n.get($[ot]);Xt.__webglTexture===void 0&&(Xt.__webglTexture=s.createTexture(),a.memory.textures++)}if(C.samples>0&&Vt(C)===!1){z.__webglMultisampledFramebuffer=s.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let ot=0;ot<$.length;ot++){const ft=$[ot];z.__webglColorRenderbuffer[ot]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,z.__webglColorRenderbuffer[ot]);const Xt=r.convert(ft.format,ft.colorSpace),Z=r.convert(ft.type),pt=S(ft.internalFormat,Xt,Z,ft.colorSpace,C.isXRRenderTarget===!0),At=Ht(C);s.renderbufferStorageMultisample(s.RENDERBUFFER,At,pt,C.width,C.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ot,s.RENDERBUFFER,z.__webglColorRenderbuffer[ot])}s.bindRenderbuffer(s.RENDERBUFFER,null),C.depthBuffer&&(z.__webglDepthRenderbuffer=s.createRenderbuffer(),at(z.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(K){e.bindTexture(s.TEXTURE_CUBE_MAP,j.__webglTexture),Pt(s.TEXTURE_CUBE_MAP,w);for(let ot=0;ot<6;ot++)if(w.mipmaps&&w.mipmaps.length>0)for(let ft=0;ft<w.mipmaps.length;ft++)Mt(z.__webglFramebuffer[ot][ft],C,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ot,ft);else Mt(z.__webglFramebuffer[ot],C,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0);m(w)&&f(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(St){for(let ot=0,ft=$.length;ot<ft;ot++){const Xt=$[ot],Z=n.get(Xt);e.bindTexture(s.TEXTURE_2D,Z.__webglTexture),Pt(s.TEXTURE_2D,Xt),Mt(z.__webglFramebuffer,C,Xt,s.COLOR_ATTACHMENT0+ot,s.TEXTURE_2D,0),m(Xt)&&f(s.TEXTURE_2D)}e.unbindTexture()}else{let ot=s.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ot=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(ot,j.__webglTexture),Pt(ot,w),w.mipmaps&&w.mipmaps.length>0)for(let ft=0;ft<w.mipmaps.length;ft++)Mt(z.__webglFramebuffer[ft],C,w,s.COLOR_ATTACHMENT0,ot,ft);else Mt(z.__webglFramebuffer,C,w,s.COLOR_ATTACHMENT0,ot,0);m(w)&&f(ot),e.unbindTexture()}C.depthBuffer&&It(C)}function Wt(C){const w=C.textures;for(let z=0,j=w.length;z<j;z++){const $=w[z];if(m($)){const K=_(C),St=n.get($).__webglTexture;e.bindTexture(K,St),f(K),e.unbindTexture()}}}const pe=[],O=[];function Xe(C){if(C.samples>0){if(Vt(C)===!1){const w=C.textures,z=C.width,j=C.height;let $=s.COLOR_BUFFER_BIT;const K=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,St=n.get(C),ot=w.length>1;if(ot)for(let ft=0;ft<w.length;ft++)e.bindFramebuffer(s.FRAMEBUFFER,St.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ft,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,St.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ft,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,St.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,St.__webglFramebuffer);for(let ft=0;ft<w.length;ft++){if(C.resolveDepthBuffer&&(C.depthBuffer&&($|=s.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&($|=s.STENCIL_BUFFER_BIT)),ot){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,St.__webglColorRenderbuffer[ft]);const Xt=n.get(w[ft]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Xt,0)}s.blitFramebuffer(0,0,z,j,0,0,z,j,$,s.NEAREST),l===!0&&(pe.length=0,O.length=0,pe.push(s.COLOR_ATTACHMENT0+ft),C.depthBuffer&&C.resolveDepthBuffer===!1&&(pe.push(K),O.push(K),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,O)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,pe))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ot)for(let ft=0;ft<w.length;ft++){e.bindFramebuffer(s.FRAMEBUFFER,St.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ft,s.RENDERBUFFER,St.__webglColorRenderbuffer[ft]);const Xt=n.get(w[ft]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,St.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ft,s.TEXTURE_2D,Xt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,St.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){const w=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[w])}}}function Ht(C){return Math.min(i.maxSamples,C.samples)}function Vt(C){const w=n.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function Tt(C){const w=a.render.frame;h.get(C)!==w&&(h.set(C,w),C.update())}function oe(C,w){const z=C.colorSpace,j=C.format,$=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||z!==pi&&z!==Xn&&(qt.getTransfer(z)===ne?(j!==rn||$!==In)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),w}function Et(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=I,this.resetTextureUnits=F,this.setTexture2D=V,this.setTexture2DArray=W,this.setTexture3D=Y,this.setTextureCube=G,this.rebindTextures=Bt,this.setupRenderTarget=de,this.updateRenderTargetMipmap=Wt,this.updateMultisampleRenderTarget=Xe,this.setupDepthRenderbuffer=It,this.setupFrameBufferTexture=Mt,this.useMultisampledRTT=Vt}function Lm(s,t){function e(n,i=Xn){let r;const a=qt.getTransfer(i);if(n===In)return s.UNSIGNED_BYTE;if(n===Ka)return s.UNSIGNED_SHORT_4_4_4_4;if(n===ja)return s.UNSIGNED_SHORT_5_5_5_1;if(n===$l)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===jl)return s.BYTE;if(n===Jl)return s.SHORT;if(n===fs)return s.UNSIGNED_SHORT;if(n===Ya)return s.INT;if(n===fi)return s.UNSIGNED_INT;if(n===Cn)return s.FLOAT;if(n===Kn)return s.HALF_FLOAT;if(n===Zl)return s.ALPHA;if(n===Ql)return s.RGB;if(n===rn)return s.RGBA;if(n===tc)return s.LUMINANCE;if(n===ec)return s.LUMINANCE_ALPHA;if(n===zi)return s.DEPTH_COMPONENT;if(n===Xi)return s.DEPTH_STENCIL;if(n===nc)return s.RED;if(n===Ja)return s.RED_INTEGER;if(n===ic)return s.RG;if(n===$a)return s.RG_INTEGER;if(n===Za)return s.RGBA_INTEGER;if(n===qs||n===Ys||n===Ks||n===js)if(a===ne)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===qs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ys)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ks)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===js)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===qs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ys)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ks)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===js)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===fa||n===pa||n===ma||n===ga)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===fa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===pa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ma)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ga)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===va||n===_a||n===xa)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===va||n===_a)return a===ne?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===xa)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ya||n===Ma||n===Sa||n===wa||n===ba||n===Ea||n===Ta||n===Aa||n===Ra||n===Ca||n===Pa||n===La||n===Da||n===Ia)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ya)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ma)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Sa)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===wa)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ba)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ea)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ta)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Aa)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ra)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ca)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Pa)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===La)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Da)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ia)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Js||n===Ua||n===Na)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Js)return a===ne?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ua)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Na)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===sc||n===Oa||n===Fa||n===ka)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Js)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Oa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Fa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ka)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Wi?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}class Dm extends ke{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class ee extends _e{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Im={type:"move"};class kr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ee,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ee,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new T,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new T),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ee,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new T,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new T),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,n),f=this._getHandJoint(c,v);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,g=.005;c.inputState.pinching&&d>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Im)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new ee;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Um=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Nm=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Om{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new Ne,r=t.properties.get(i);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Je({vertexShader:Um,fragmentShader:Nm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new dt(new ln(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Fm extends Yi{constructor(t,e){super();const n=this;let i=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,p=null,g=null;const v=new Om,m=e.getContextAttributes();let f=null,_=null;const S=[],x=[],L=new et;let A=null;const b=new ke;b.viewport=new se;const R=new ke;R.viewport=new se;const M=[b,R],y=new Dm;let P=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let tt=S[q];return tt===void 0&&(tt=new kr,S[q]=tt),tt.getTargetRaySpace()},this.getControllerGrip=function(q){let tt=S[q];return tt===void 0&&(tt=new kr,S[q]=tt),tt.getGripSpace()},this.getHand=function(q){let tt=S[q];return tt===void 0&&(tt=new kr,S[q]=tt),tt.getHandSpace()};function I(q){const tt=x.indexOf(q.inputSource);if(tt===-1)return;const Mt=S[tt];Mt!==void 0&&(Mt.update(q.inputSource,q.frame,c||a),Mt.dispatchEvent({type:q.type,data:q.inputSource}))}function k(){i.removeEventListener("select",I),i.removeEventListener("selectstart",I),i.removeEventListener("selectend",I),i.removeEventListener("squeeze",I),i.removeEventListener("squeezestart",I),i.removeEventListener("squeezeend",I),i.removeEventListener("end",k),i.removeEventListener("inputsourceschange",V);for(let q=0;q<S.length;q++){const tt=x[q];tt!==null&&(x[q]=null,S[q].disconnect(tt))}P=null,F=null,v.reset(),t.setRenderTarget(f),p=null,d=null,u=null,i=null,_=null,jt.stop(),n.isPresenting=!1,t.setPixelRatio(A),t.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(q){if(i=q,i!==null){if(f=t.getRenderTarget(),i.addEventListener("select",I),i.addEventListener("selectstart",I),i.addEventListener("selectend",I),i.addEventListener("squeeze",I),i.addEventListener("squeezestart",I),i.addEventListener("squeezeend",I),i.addEventListener("end",k),i.addEventListener("inputsourceschange",V),m.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(L),i.renderState.layers===void 0){const tt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(i,e,tt),i.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),_=new fn(p.framebufferWidth,p.framebufferHeight,{format:rn,type:In,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let tt=null,Mt=null,at=null;m.depth&&(at=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,tt=m.stencil?Xi:zi,Mt=m.stencil?Wi:fi);const Rt={colorFormat:e.RGBA8,depthFormat:at,scaleFactor:r};u=new XRWebGLBinding(i,e),d=u.createProjectionLayer(Rt),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),_=new fn(d.textureWidth,d.textureHeight,{format:rn,type:In,depthTexture:new xc(d.textureWidth,d.textureHeight,Mt,void 0,void 0,void 0,void 0,void 0,void 0,tt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),jt.setContext(i),jt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function V(q){for(let tt=0;tt<q.removed.length;tt++){const Mt=q.removed[tt],at=x.indexOf(Mt);at>=0&&(x[at]=null,S[at].disconnect(Mt))}for(let tt=0;tt<q.added.length;tt++){const Mt=q.added[tt];let at=x.indexOf(Mt);if(at===-1){for(let It=0;It<S.length;It++)if(It>=x.length){x.push(Mt),at=It;break}else if(x[It]===null){x[It]=Mt,at=It;break}if(at===-1)break}const Rt=S[at];Rt&&Rt.connect(Mt)}}const W=new T,Y=new T;function G(q,tt,Mt){W.setFromMatrixPosition(tt.matrixWorld),Y.setFromMatrixPosition(Mt.matrixWorld);const at=W.distanceTo(Y),Rt=tt.projectionMatrix.elements,It=Mt.projectionMatrix.elements,Bt=Rt[14]/(Rt[10]-1),de=Rt[14]/(Rt[10]+1),Wt=(Rt[9]+1)/Rt[5],pe=(Rt[9]-1)/Rt[5],O=(Rt[8]-1)/Rt[0],Xe=(It[8]+1)/It[0],Ht=Bt*O,Vt=Bt*Xe,Tt=at/(-O+Xe),oe=Tt*-O;if(tt.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(oe),q.translateZ(Tt),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),Rt[10]===-1)q.projectionMatrix.copy(tt.projectionMatrix),q.projectionMatrixInverse.copy(tt.projectionMatrixInverse);else{const Et=Bt+Tt,C=de+Tt,w=Ht-oe,z=Vt+(at-oe),j=Wt*de/C*Et,$=pe*de/C*Et;q.projectionMatrix.makePerspective(w,z,j,$,Et,C),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function nt(q,tt){tt===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(tt.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(i===null)return;let tt=q.near,Mt=q.far;v.texture!==null&&(v.depthNear>0&&(tt=v.depthNear),v.depthFar>0&&(Mt=v.depthFar)),y.near=R.near=b.near=tt,y.far=R.far=b.far=Mt,(P!==y.near||F!==y.far)&&(i.updateRenderState({depthNear:y.near,depthFar:y.far}),P=y.near,F=y.far),b.layers.mask=q.layers.mask|2,R.layers.mask=q.layers.mask|4,y.layers.mask=b.layers.mask|R.layers.mask;const at=q.parent,Rt=y.cameras;nt(y,at);for(let It=0;It<Rt.length;It++)nt(Rt[It],at);Rt.length===2?G(y,b,R):y.projectionMatrix.copy(b.projectionMatrix),ht(q,y,at)};function ht(q,tt,Mt){Mt===null?q.matrix.copy(tt.matrixWorld):(q.matrix.copy(Mt.matrixWorld),q.matrix.invert(),q.matrix.multiply(tt.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(tt.projectionMatrix),q.projectionMatrixInverse.copy(tt.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Ba*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(q){l=q,d!==null&&(d.fixedFoveation=q),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=q)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(y)};let vt=null;function Pt(q,tt){if(h=tt.getViewerPose(c||a),g=tt,h!==null){const Mt=h.views;p!==null&&(t.setRenderTargetFramebuffer(_,p.framebuffer),t.setRenderTarget(_));let at=!1;Mt.length!==y.cameras.length&&(y.cameras.length=0,at=!0);for(let It=0;It<Mt.length;It++){const Bt=Mt[It];let de=null;if(p!==null)de=p.getViewport(Bt);else{const pe=u.getViewSubImage(d,Bt);de=pe.viewport,It===0&&(t.setRenderTargetTextures(_,pe.colorTexture,d.ignoreDepthValues?void 0:pe.depthStencilTexture),t.setRenderTarget(_))}let Wt=M[It];Wt===void 0&&(Wt=new ke,Wt.layers.enable(It),Wt.viewport=new se,M[It]=Wt),Wt.matrix.fromArray(Bt.transform.matrix),Wt.matrix.decompose(Wt.position,Wt.quaternion,Wt.scale),Wt.projectionMatrix.fromArray(Bt.projectionMatrix),Wt.projectionMatrixInverse.copy(Wt.projectionMatrix).invert(),Wt.viewport.set(de.x,de.y,de.width,de.height),It===0&&(y.matrix.copy(Wt.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),at===!0&&y.cameras.push(Wt)}const Rt=i.enabledFeatures;if(Rt&&Rt.includes("depth-sensing")){const It=u.getDepthInformation(Mt[0]);It&&It.isValid&&It.texture&&v.init(t,It,i.renderState)}}for(let Mt=0;Mt<S.length;Mt++){const at=x[Mt],Rt=S[Mt];at!==null&&Rt!==void 0&&Rt.update(at,tt,c||a)}vt&&vt(q,tt),tt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:tt}),g=null}const jt=new _c;jt.setAnimationLoop(Pt),this.setAnimationLoop=function(q){vt=q},this.dispose=function(){}}}const si=new pn,km=new Zt;function zm(s,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,mc(s)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function i(m,f,_,S,x){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),u(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f)):f.isMeshStandardMaterial?(r(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,x)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),v(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,_,S):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Ue&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Ue&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const _=t.get(f),S=_.envMap,x=_.envMapRotation;S&&(m.envMap.value=S,si.copy(x),si.x*=-1,si.y*=-1,si.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(si.y*=-1,si.z*=-1),m.envMapRotation.value.setFromMatrix4(km.makeRotationFromEuler(si)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,_,S){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*_,m.scale.value=S*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,_){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ue&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function v(m,f){const _=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Bm(s,t,e,n){let i={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,S){const x=S.program;n.uniformBlockBinding(_,x)}function c(_,S){let x=i[_.id];x===void 0&&(g(_),x=h(_),i[_.id]=x,_.addEventListener("dispose",m));const L=S.program;n.updateUBOMapping(_,L);const A=t.render.frame;r[_.id]!==A&&(d(_),r[_.id]=A)}function h(_){const S=u();_.__bindingPointIndex=S;const x=s.createBuffer(),L=_.__size,A=_.usage;return s.bindBuffer(s.UNIFORM_BUFFER,x),s.bufferData(s.UNIFORM_BUFFER,L,A),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,S,x),x}function u(){for(let _=0;_<o;_++)if(a.indexOf(_)===-1)return a.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(_){const S=i[_.id],x=_.uniforms,L=_.__cache;s.bindBuffer(s.UNIFORM_BUFFER,S);for(let A=0,b=x.length;A<b;A++){const R=Array.isArray(x[A])?x[A]:[x[A]];for(let M=0,y=R.length;M<y;M++){const P=R[M];if(p(P,A,M,L)===!0){const F=P.__offset,I=Array.isArray(P.value)?P.value:[P.value];let k=0;for(let V=0;V<I.length;V++){const W=I[V],Y=v(W);typeof W=="number"||typeof W=="boolean"?(P.__data[0]=W,s.bufferSubData(s.UNIFORM_BUFFER,F+k,P.__data)):W.isMatrix3?(P.__data[0]=W.elements[0],P.__data[1]=W.elements[1],P.__data[2]=W.elements[2],P.__data[3]=0,P.__data[4]=W.elements[3],P.__data[5]=W.elements[4],P.__data[6]=W.elements[5],P.__data[7]=0,P.__data[8]=W.elements[6],P.__data[9]=W.elements[7],P.__data[10]=W.elements[8],P.__data[11]=0):(W.toArray(P.__data,k),k+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,F,P.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function p(_,S,x,L){const A=_.value,b=S+"_"+x;if(L[b]===void 0)return typeof A=="number"||typeof A=="boolean"?L[b]=A:L[b]=A.clone(),!0;{const R=L[b];if(typeof A=="number"||typeof A=="boolean"){if(R!==A)return L[b]=A,!0}else if(R.equals(A)===!1)return R.copy(A),!0}return!1}function g(_){const S=_.uniforms;let x=0;const L=16;for(let b=0,R=S.length;b<R;b++){const M=Array.isArray(S[b])?S[b]:[S[b]];for(let y=0,P=M.length;y<P;y++){const F=M[y],I=Array.isArray(F.value)?F.value:[F.value];for(let k=0,V=I.length;k<V;k++){const W=I[k],Y=v(W),G=x%L,nt=G%Y.boundary,ht=G+nt;x+=nt,ht!==0&&L-ht<Y.storage&&(x+=L-ht),F.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=x,x+=Y.storage}}}const A=x%L;return A>0&&(x+=L-A),_.__size=x,_.__cache={},this}function v(_){const S={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(S.boundary=4,S.storage=4):_.isVector2?(S.boundary=8,S.storage=8):_.isVector3||_.isColor?(S.boundary=16,S.storage=12):_.isVector4?(S.boundary=16,S.storage=16):_.isMatrix3?(S.boundary=48,S.storage=48):_.isMatrix4?(S.boundary=64,S.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),S}function m(_){const S=_.target;S.removeEventListener("dispose",m);const x=a.indexOf(S.__bindingPointIndex);a.splice(x,1),s.deleteBuffer(i[S.id]),delete i[S.id],delete r[S.id]}function f(){for(const _ in i)s.deleteBuffer(i[_]);a=[],i={},r={}}return{bind:l,update:c,dispose:f}}class Hm{constructor(t={}){const{canvas:e=Rh(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,f=null;const _=[],S=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ve,this.toneMapping=Ln,this.toneMappingExposure=1;const x=this;let L=!1,A=0,b=0,R=null,M=-1,y=null;const P=new se,F=new se;let I=null;const k=new zt(0);let V=0,W=e.width,Y=e.height,G=1,nt=null,ht=null;const vt=new se(0,0,W,Y),Pt=new se(0,0,W,Y);let jt=!1;const q=new Qa;let tt=!1,Mt=!1;const at=new Zt,Rt=new Zt,It=new T,Bt=new se,de={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Wt=!1;function pe(){return R===null?G:1}let O=n;function Xe(E,U){return e.getContext(E,U)}try{const E={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${qa}`),e.addEventListener("webglcontextlost",J,!1),e.addEventListener("webglcontextrestored",ut,!1),e.addEventListener("webglcontextcreationerror",lt,!1),O===null){const U="webgl2";if(O=Xe(U,E),O===null)throw Xe(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Ht,Vt,Tt,oe,Et,C,w,z,j,$,K,St,ot,ft,Xt,Z,pt,At,Ct,mt,Gt,Ft,re,D;function rt(){Ht=new qf(O),Ht.init(),Ft=new Lm(O,Ht),Vt=new Bf(O,Ht,t,Ft),Tt=new Rm(O,Ht),Vt.reverseDepthBuffer&&d&&Tt.buffers.depth.setReversed(!0),oe=new jf(O),Et=new fm,C=new Pm(O,Ht,Tt,Et,Vt,Ft,oe),w=new Vf(x),z=new Xf(x),j=new eu(O),re=new kf(O,j),$=new Yf(O,j,oe,re),K=new $f(O,$,j,oe),Ct=new Jf(O,Vt,C),Z=new Hf(Et),St=new dm(x,w,z,Ht,Vt,re,Z),ot=new zm(x,Et),ft=new mm,Xt=new Mm(Ht),At=new Ff(x,w,z,Tt,K,p,l),pt=new Tm(x,K,Vt),D=new Bm(O,oe,Vt,Tt),mt=new zf(O,Ht,oe),Gt=new Kf(O,Ht,oe),oe.programs=St.programs,x.capabilities=Vt,x.extensions=Ht,x.properties=Et,x.renderLists=ft,x.shadowMap=pt,x.state=Tt,x.info=oe}rt();const X=new Fm(x,O);this.xr=X,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const E=Ht.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Ht.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(E){E!==void 0&&(G=E,this.setSize(W,Y,!1))},this.getSize=function(E){return E.set(W,Y)},this.setSize=function(E,U,B=!0){if(X.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=E,Y=U,e.width=Math.floor(E*G),e.height=Math.floor(U*G),B===!0&&(e.style.width=E+"px",e.style.height=U+"px"),this.setViewport(0,0,E,U)},this.getDrawingBufferSize=function(E){return E.set(W*G,Y*G).floor()},this.setDrawingBufferSize=function(E,U,B){W=E,Y=U,G=B,e.width=Math.floor(E*B),e.height=Math.floor(U*B),this.setViewport(0,0,E,U)},this.getCurrentViewport=function(E){return E.copy(P)},this.getViewport=function(E){return E.copy(vt)},this.setViewport=function(E,U,B,H){E.isVector4?vt.set(E.x,E.y,E.z,E.w):vt.set(E,U,B,H),Tt.viewport(P.copy(vt).multiplyScalar(G).round())},this.getScissor=function(E){return E.copy(Pt)},this.setScissor=function(E,U,B,H){E.isVector4?Pt.set(E.x,E.y,E.z,E.w):Pt.set(E,U,B,H),Tt.scissor(F.copy(Pt).multiplyScalar(G).round())},this.getScissorTest=function(){return jt},this.setScissorTest=function(E){Tt.setScissorTest(jt=E)},this.setOpaqueSort=function(E){nt=E},this.setTransparentSort=function(E){ht=E},this.getClearColor=function(E){return E.copy(At.getClearColor())},this.setClearColor=function(){At.setClearColor.apply(At,arguments)},this.getClearAlpha=function(){return At.getClearAlpha()},this.setClearAlpha=function(){At.setClearAlpha.apply(At,arguments)},this.clear=function(E=!0,U=!0,B=!0){let H=0;if(E){let N=!1;if(R!==null){const Q=R.texture.format;N=Q===Za||Q===$a||Q===Ja}if(N){const Q=R.texture.type,ct=Q===In||Q===fi||Q===fs||Q===Wi||Q===Ka||Q===ja,_t=At.getClearColor(),xt=At.getClearAlpha(),Lt=_t.r,Nt=_t.g,yt=_t.b;ct?(g[0]=Lt,g[1]=Nt,g[2]=yt,g[3]=xt,O.clearBufferuiv(O.COLOR,0,g)):(v[0]=Lt,v[1]=Nt,v[2]=yt,v[3]=xt,O.clearBufferiv(O.COLOR,0,v))}else H|=O.COLOR_BUFFER_BIT}U&&(H|=O.DEPTH_BUFFER_BIT),B&&(H|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",J,!1),e.removeEventListener("webglcontextrestored",ut,!1),e.removeEventListener("webglcontextcreationerror",lt,!1),ft.dispose(),Xt.dispose(),Et.dispose(),w.dispose(),z.dispose(),K.dispose(),re.dispose(),D.dispose(),St.dispose(),X.dispose(),X.removeEventListener("sessionstart",po),X.removeEventListener("sessionend",mo),Zn.stop()};function J(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),L=!0}function ut(){console.log("THREE.WebGLRenderer: Context Restored."),L=!1;const E=oe.autoReset,U=pt.enabled,B=pt.autoUpdate,H=pt.needsUpdate,N=pt.type;rt(),oe.autoReset=E,pt.enabled=U,pt.autoUpdate=B,pt.needsUpdate=H,pt.type=N}function lt(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Ut(E){const U=E.target;U.removeEventListener("dispose",Ut),fe(U)}function fe(E){Te(E),Et.remove(E)}function Te(E){const U=Et.get(E).programs;U!==void 0&&(U.forEach(function(B){St.releaseProgram(B)}),E.isShaderMaterial&&St.releaseShaderCache(E))}this.renderBufferDirect=function(E,U,B,H,N,Q){U===null&&(U=de);const ct=N.isMesh&&N.matrixWorld.determinant()<0,_t=kc(E,U,B,H,N);Tt.setMaterial(H,ct);let xt=B.index,Lt=1;if(H.wireframe===!0){if(xt=$.getWireframeAttribute(B),xt===void 0)return;Lt=2}const Nt=B.drawRange,yt=B.attributes.position;let Yt=Nt.start*Lt,ae=(Nt.start+Nt.count)*Lt;Q!==null&&(Yt=Math.max(Yt,Q.start*Lt),ae=Math.min(ae,(Q.start+Q.count)*Lt)),xt!==null?(Yt=Math.max(Yt,0),ae=Math.min(ae,xt.count)):yt!=null&&(Yt=Math.max(Yt,0),ae=Math.min(ae,yt.count));const le=ae-Yt;if(le<0||le===1/0)return;re.setup(N,H,_t,B,xt);let Fe,Jt=mt;if(xt!==null&&(Fe=j.get(xt),Jt=Gt,Jt.setIndex(Fe)),N.isMesh)H.wireframe===!0?(Tt.setLineWidth(H.wireframeLinewidth*pe()),Jt.setMode(O.LINES)):Jt.setMode(O.TRIANGLES);else if(N.isLine){let wt=H.linewidth;wt===void 0&&(wt=1),Tt.setLineWidth(wt*pe()),N.isLineSegments?Jt.setMode(O.LINES):N.isLineLoop?Jt.setMode(O.LINE_LOOP):Jt.setMode(O.LINE_STRIP)}else N.isPoints?Jt.setMode(O.POINTS):N.isSprite&&Jt.setMode(O.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)Jt.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(Ht.get("WEBGL_multi_draw"))Jt.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const wt=N._multiDrawStarts,vn=N._multiDrawCounts,$t=N._multiDrawCount,Ze=xt?j.get(xt).bytesPerElement:1,gi=Et.get(H).currentProgram.getUniforms();for(let Be=0;Be<$t;Be++)gi.setValue(O,"_gl_DrawID",Be),Jt.render(wt[Be]/Ze,vn[Be])}else if(N.isInstancedMesh)Jt.renderInstances(Yt,le,N.count);else if(B.isInstancedBufferGeometry){const wt=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,vn=Math.min(B.instanceCount,wt);Jt.renderInstances(Yt,le,vn)}else Jt.render(Yt,le)};function te(E,U,B){E.transparent===!0&&E.side===sn&&E.forceSinglePass===!1?(E.side=Ue,E.needsUpdate=!0,vs(E,U,B),E.side=Jn,E.needsUpdate=!0,vs(E,U,B),E.side=sn):vs(E,U,B)}this.compile=function(E,U,B=null){B===null&&(B=E),f=Xt.get(B),f.init(U),S.push(f),B.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(f.pushLight(N),N.castShadow&&f.pushShadow(N))}),E!==B&&E.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(f.pushLight(N),N.castShadow&&f.pushShadow(N))}),f.setupLights();const H=new Set;return E.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const Q=N.material;if(Q)if(Array.isArray(Q))for(let ct=0;ct<Q.length;ct++){const _t=Q[ct];te(_t,B,N),H.add(_t)}else te(Q,B,N),H.add(Q)}),S.pop(),f=null,H},this.compileAsync=function(E,U,B=null){const H=this.compile(E,U,B);return new Promise(N=>{function Q(){if(H.forEach(function(ct){Et.get(ct).currentProgram.isReady()&&H.delete(ct)}),H.size===0){N(E);return}setTimeout(Q,10)}Ht.get("KHR_parallel_shader_compile")!==null?Q():setTimeout(Q,10)})};let $e=null;function gn(E){$e&&$e(E)}function po(){Zn.stop()}function mo(){Zn.start()}const Zn=new _c;Zn.setAnimationLoop(gn),typeof self<"u"&&Zn.setContext(self),this.setAnimationLoop=function(E){$e=E,X.setAnimationLoop(E),E===null?Zn.stop():Zn.start()},X.addEventListener("sessionstart",po),X.addEventListener("sessionend",mo),this.render=function(E,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),X.enabled===!0&&X.isPresenting===!0&&(X.cameraAutoUpdate===!0&&X.updateCamera(U),U=X.getCamera()),E.isScene===!0&&E.onBeforeRender(x,E,U,R),f=Xt.get(E,S.length),f.init(U),S.push(f),Rt.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),q.setFromProjectionMatrix(Rt),Mt=this.localClippingEnabled,tt=Z.init(this.clippingPlanes,Mt),m=ft.get(E,_.length),m.init(),_.push(m),X.enabled===!0&&X.isPresenting===!0){const Q=x.xr.getDepthSensingMesh();Q!==null&&lr(Q,U,-1/0,x.sortObjects)}lr(E,U,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(nt,ht),Wt=X.enabled===!1||X.isPresenting===!1||X.hasDepthSensing()===!1,Wt&&At.addToRenderList(m,E),this.info.render.frame++,tt===!0&&Z.beginShadows();const B=f.state.shadowsArray;pt.render(B,E,U),tt===!0&&Z.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=m.opaque,N=m.transmissive;if(f.setupLights(),U.isArrayCamera){const Q=U.cameras;if(N.length>0)for(let ct=0,_t=Q.length;ct<_t;ct++){const xt=Q[ct];vo(H,N,E,xt)}Wt&&At.render(E);for(let ct=0,_t=Q.length;ct<_t;ct++){const xt=Q[ct];go(m,E,xt,xt.viewport)}}else N.length>0&&vo(H,N,E,U),Wt&&At.render(E),go(m,E,U);R!==null&&(C.updateMultisampleRenderTarget(R),C.updateRenderTargetMipmap(R)),E.isScene===!0&&E.onAfterRender(x,E,U),re.resetDefaultState(),M=-1,y=null,S.pop(),S.length>0?(f=S[S.length-1],tt===!0&&Z.setGlobalState(x.clippingPlanes,f.state.camera)):f=null,_.pop(),_.length>0?m=_[_.length-1]:m=null};function lr(E,U,B,H){if(E.visible===!1)return;if(E.layers.test(U.layers)){if(E.isGroup)B=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(U);else if(E.isLight)f.pushLight(E),E.castShadow&&f.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||q.intersectsSprite(E)){H&&Bt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Rt);const ct=K.update(E),_t=E.material;_t.visible&&m.push(E,ct,_t,B,Bt.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||q.intersectsObject(E))){const ct=K.update(E),_t=E.material;if(H&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Bt.copy(E.boundingSphere.center)):(ct.boundingSphere===null&&ct.computeBoundingSphere(),Bt.copy(ct.boundingSphere.center)),Bt.applyMatrix4(E.matrixWorld).applyMatrix4(Rt)),Array.isArray(_t)){const xt=ct.groups;for(let Lt=0,Nt=xt.length;Lt<Nt;Lt++){const yt=xt[Lt],Yt=_t[yt.materialIndex];Yt&&Yt.visible&&m.push(E,ct,Yt,B,Bt.z,yt)}}else _t.visible&&m.push(E,ct,_t,B,Bt.z,null)}}const Q=E.children;for(let ct=0,_t=Q.length;ct<_t;ct++)lr(Q[ct],U,B,H)}function go(E,U,B,H){const N=E.opaque,Q=E.transmissive,ct=E.transparent;f.setupLightsView(B),tt===!0&&Z.setGlobalState(x.clippingPlanes,B),H&&Tt.viewport(P.copy(H)),N.length>0&&gs(N,U,B),Q.length>0&&gs(Q,U,B),ct.length>0&&gs(ct,U,B),Tt.buffers.depth.setTest(!0),Tt.buffers.depth.setMask(!0),Tt.buffers.color.setMask(!0),Tt.setPolygonOffset(!1)}function vo(E,U,B,H){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[H.id]===void 0&&(f.state.transmissionRenderTarget[H.id]=new fn(1,1,{generateMipmaps:!0,type:Ht.has("EXT_color_buffer_half_float")||Ht.has("EXT_color_buffer_float")?Kn:In,minFilter:ui,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qt.workingColorSpace}));const Q=f.state.transmissionRenderTarget[H.id],ct=H.viewport||P;Q.setSize(ct.z,ct.w);const _t=x.getRenderTarget();x.setRenderTarget(Q),x.getClearColor(k),V=x.getClearAlpha(),V<1&&x.setClearColor(16777215,.5),x.clear(),Wt&&At.render(B);const xt=x.toneMapping;x.toneMapping=Ln;const Lt=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),f.setupLightsView(H),tt===!0&&Z.setGlobalState(x.clippingPlanes,H),gs(E,B,H),C.updateMultisampleRenderTarget(Q),C.updateRenderTargetMipmap(Q),Ht.has("WEBGL_multisampled_render_to_texture")===!1){let Nt=!1;for(let yt=0,Yt=U.length;yt<Yt;yt++){const ae=U[yt],le=ae.object,Fe=ae.geometry,Jt=ae.material,wt=ae.group;if(Jt.side===sn&&le.layers.test(H.layers)){const vn=Jt.side;Jt.side=Ue,Jt.needsUpdate=!0,_o(le,B,H,Fe,Jt,wt),Jt.side=vn,Jt.needsUpdate=!0,Nt=!0}}Nt===!0&&(C.updateMultisampleRenderTarget(Q),C.updateRenderTargetMipmap(Q))}x.setRenderTarget(_t),x.setClearColor(k,V),Lt!==void 0&&(H.viewport=Lt),x.toneMapping=xt}function gs(E,U,B){const H=U.isScene===!0?U.overrideMaterial:null;for(let N=0,Q=E.length;N<Q;N++){const ct=E[N],_t=ct.object,xt=ct.geometry,Lt=H===null?ct.material:H,Nt=ct.group;_t.layers.test(B.layers)&&_o(_t,U,B,xt,Lt,Nt)}}function _o(E,U,B,H,N,Q){E.onBeforeRender(x,U,B,H,N,Q),E.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),N.onBeforeRender(x,U,B,H,E,Q),N.transparent===!0&&N.side===sn&&N.forceSinglePass===!1?(N.side=Ue,N.needsUpdate=!0,x.renderBufferDirect(B,U,H,N,E,Q),N.side=Jn,N.needsUpdate=!0,x.renderBufferDirect(B,U,H,N,E,Q),N.side=sn):x.renderBufferDirect(B,U,H,N,E,Q),E.onAfterRender(x,U,B,H,N,Q)}function vs(E,U,B){U.isScene!==!0&&(U=de);const H=Et.get(E),N=f.state.lights,Q=f.state.shadowsArray,ct=N.state.version,_t=St.getParameters(E,N.state,Q,U,B),xt=St.getProgramCacheKey(_t);let Lt=H.programs;H.environment=E.isMeshStandardMaterial?U.environment:null,H.fog=U.fog,H.envMap=(E.isMeshStandardMaterial?z:w).get(E.envMap||H.environment),H.envMapRotation=H.environment!==null&&E.envMap===null?U.environmentRotation:E.envMapRotation,Lt===void 0&&(E.addEventListener("dispose",Ut),Lt=new Map,H.programs=Lt);let Nt=Lt.get(xt);if(Nt!==void 0){if(H.currentProgram===Nt&&H.lightsStateVersion===ct)return yo(E,_t),Nt}else _t.uniforms=St.getUniforms(E),E.onBeforeCompile(_t,x),Nt=St.acquireProgram(_t,xt),Lt.set(xt,Nt),H.uniforms=_t.uniforms;const yt=H.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(yt.clippingPlanes=Z.uniform),yo(E,_t),H.needsLights=Bc(E),H.lightsStateVersion=ct,H.needsLights&&(yt.ambientLightColor.value=N.state.ambient,yt.lightProbe.value=N.state.probe,yt.directionalLights.value=N.state.directional,yt.directionalLightShadows.value=N.state.directionalShadow,yt.spotLights.value=N.state.spot,yt.spotLightShadows.value=N.state.spotShadow,yt.rectAreaLights.value=N.state.rectArea,yt.ltc_1.value=N.state.rectAreaLTC1,yt.ltc_2.value=N.state.rectAreaLTC2,yt.pointLights.value=N.state.point,yt.pointLightShadows.value=N.state.pointShadow,yt.hemisphereLights.value=N.state.hemi,yt.directionalShadowMap.value=N.state.directionalShadowMap,yt.directionalShadowMatrix.value=N.state.directionalShadowMatrix,yt.spotShadowMap.value=N.state.spotShadowMap,yt.spotLightMatrix.value=N.state.spotLightMatrix,yt.spotLightMap.value=N.state.spotLightMap,yt.pointShadowMap.value=N.state.pointShadowMap,yt.pointShadowMatrix.value=N.state.pointShadowMatrix),H.currentProgram=Nt,H.uniformsList=null,Nt}function xo(E){if(E.uniformsList===null){const U=E.currentProgram.getUniforms();E.uniformsList=$s.seqWithValue(U.seq,E.uniforms)}return E.uniformsList}function yo(E,U){const B=Et.get(E);B.outputColorSpace=U.outputColorSpace,B.batching=U.batching,B.batchingColor=U.batchingColor,B.instancing=U.instancing,B.instancingColor=U.instancingColor,B.instancingMorph=U.instancingMorph,B.skinning=U.skinning,B.morphTargets=U.morphTargets,B.morphNormals=U.morphNormals,B.morphColors=U.morphColors,B.morphTargetsCount=U.morphTargetsCount,B.numClippingPlanes=U.numClippingPlanes,B.numIntersection=U.numClipIntersection,B.vertexAlphas=U.vertexAlphas,B.vertexTangents=U.vertexTangents,B.toneMapping=U.toneMapping}function kc(E,U,B,H,N){U.isScene!==!0&&(U=de),C.resetTextureUnits();const Q=U.fog,ct=H.isMeshStandardMaterial?U.environment:null,_t=R===null?x.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:pi,xt=(H.isMeshStandardMaterial?z:w).get(H.envMap||ct),Lt=H.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Nt=!!B.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),yt=!!B.morphAttributes.position,Yt=!!B.morphAttributes.normal,ae=!!B.morphAttributes.color;let le=Ln;H.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(le=x.toneMapping);const Fe=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,Jt=Fe!==void 0?Fe.length:0,wt=Et.get(H),vn=f.state.lights;if(tt===!0&&(Mt===!0||E!==y)){const qe=E===y&&H.id===M;Z.setState(H,E,qe)}let $t=!1;H.version===wt.__version?(wt.needsLights&&wt.lightsStateVersion!==vn.state.version||wt.outputColorSpace!==_t||N.isBatchedMesh&&wt.batching===!1||!N.isBatchedMesh&&wt.batching===!0||N.isBatchedMesh&&wt.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&wt.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&wt.instancing===!1||!N.isInstancedMesh&&wt.instancing===!0||N.isSkinnedMesh&&wt.skinning===!1||!N.isSkinnedMesh&&wt.skinning===!0||N.isInstancedMesh&&wt.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&wt.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&wt.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&wt.instancingMorph===!1&&N.morphTexture!==null||wt.envMap!==xt||H.fog===!0&&wt.fog!==Q||wt.numClippingPlanes!==void 0&&(wt.numClippingPlanes!==Z.numPlanes||wt.numIntersection!==Z.numIntersection)||wt.vertexAlphas!==Lt||wt.vertexTangents!==Nt||wt.morphTargets!==yt||wt.morphNormals!==Yt||wt.morphColors!==ae||wt.toneMapping!==le||wt.morphTargetsCount!==Jt)&&($t=!0):($t=!0,wt.__version=H.version);let Ze=wt.currentProgram;$t===!0&&(Ze=vs(H,U,N));let gi=!1,Be=!1,ji=!1;const ce=Ze.getUniforms(),cn=wt.uniforms;if(Tt.useProgram(Ze.program)&&(gi=!0,Be=!0,ji=!0),H.id!==M&&(M=H.id,Be=!0),gi||y!==E){Tt.buffers.depth.getReversed()?(at.copy(E.projectionMatrix),Ph(at),Lh(at),ce.setValue(O,"projectionMatrix",at)):ce.setValue(O,"projectionMatrix",E.projectionMatrix),ce.setValue(O,"viewMatrix",E.matrixWorldInverse);const Nn=ce.map.cameraPosition;Nn!==void 0&&Nn.setValue(O,It.setFromMatrixPosition(E.matrixWorld)),Vt.logarithmicDepthBuffer&&ce.setValue(O,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&ce.setValue(O,"isOrthographic",E.isOrthographicCamera===!0),y!==E&&(y=E,Be=!0,ji=!0)}if(N.isSkinnedMesh){ce.setOptional(O,N,"bindMatrix"),ce.setOptional(O,N,"bindMatrixInverse");const qe=N.skeleton;qe&&(qe.boneTexture===null&&qe.computeBoneTexture(),ce.setValue(O,"boneTexture",qe.boneTexture,C))}N.isBatchedMesh&&(ce.setOptional(O,N,"batchingTexture"),ce.setValue(O,"batchingTexture",N._matricesTexture,C),ce.setOptional(O,N,"batchingIdTexture"),ce.setValue(O,"batchingIdTexture",N._indirectTexture,C),ce.setOptional(O,N,"batchingColorTexture"),N._colorsTexture!==null&&ce.setValue(O,"batchingColorTexture",N._colorsTexture,C));const Ji=B.morphAttributes;if((Ji.position!==void 0||Ji.normal!==void 0||Ji.color!==void 0)&&Ct.update(N,B,Ze),(Be||wt.receiveShadow!==N.receiveShadow)&&(wt.receiveShadow=N.receiveShadow,ce.setValue(O,"receiveShadow",N.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(cn.envMap.value=xt,cn.flipEnvMap.value=xt.isCubeTexture&&xt.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&U.environment!==null&&(cn.envMapIntensity.value=U.environmentIntensity),Be&&(ce.setValue(O,"toneMappingExposure",x.toneMappingExposure),wt.needsLights&&zc(cn,ji),Q&&H.fog===!0&&ot.refreshFogUniforms(cn,Q),ot.refreshMaterialUniforms(cn,H,G,Y,f.state.transmissionRenderTarget[E.id]),$s.upload(O,xo(wt),cn,C)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&($s.upload(O,xo(wt),cn,C),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&ce.setValue(O,"center",N.center),ce.setValue(O,"modelViewMatrix",N.modelViewMatrix),ce.setValue(O,"normalMatrix",N.normalMatrix),ce.setValue(O,"modelMatrix",N.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const qe=H.uniformsGroups;for(let Nn=0,On=qe.length;Nn<On;Nn++){const Mo=qe[Nn];D.update(Mo,Ze),D.bind(Mo,Ze)}}return Ze}function zc(E,U){E.ambientLightColor.needsUpdate=U,E.lightProbe.needsUpdate=U,E.directionalLights.needsUpdate=U,E.directionalLightShadows.needsUpdate=U,E.pointLights.needsUpdate=U,E.pointLightShadows.needsUpdate=U,E.spotLights.needsUpdate=U,E.spotLightShadows.needsUpdate=U,E.rectAreaLights.needsUpdate=U,E.hemisphereLights.needsUpdate=U}function Bc(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(E,U,B){Et.get(E.texture).__webglTexture=U,Et.get(E.depthTexture).__webglTexture=B;const H=Et.get(E);H.__hasExternalTextures=!0,H.__autoAllocateDepthBuffer=B===void 0,H.__autoAllocateDepthBuffer||Ht.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,U){const B=Et.get(E);B.__webglFramebuffer=U,B.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(E,U=0,B=0){R=E,A=U,b=B;let H=!0,N=null,Q=!1,ct=!1;if(E){const xt=Et.get(E);if(xt.__useDefaultFramebuffer!==void 0)Tt.bindFramebuffer(O.FRAMEBUFFER,null),H=!1;else if(xt.__webglFramebuffer===void 0)C.setupRenderTarget(E);else if(xt.__hasExternalTextures)C.rebindTextures(E,Et.get(E.texture).__webglTexture,Et.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const yt=E.depthTexture;if(xt.__boundDepthTexture!==yt){if(yt!==null&&Et.has(yt)&&(E.width!==yt.image.width||E.height!==yt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(E)}}const Lt=E.texture;(Lt.isData3DTexture||Lt.isDataArrayTexture||Lt.isCompressedArrayTexture)&&(ct=!0);const Nt=Et.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Nt[U])?N=Nt[U][B]:N=Nt[U],Q=!0):E.samples>0&&C.useMultisampledRTT(E)===!1?N=Et.get(E).__webglMultisampledFramebuffer:Array.isArray(Nt)?N=Nt[B]:N=Nt,P.copy(E.viewport),F.copy(E.scissor),I=E.scissorTest}else P.copy(vt).multiplyScalar(G).floor(),F.copy(Pt).multiplyScalar(G).floor(),I=jt;if(Tt.bindFramebuffer(O.FRAMEBUFFER,N)&&H&&Tt.drawBuffers(E,N),Tt.viewport(P),Tt.scissor(F),Tt.setScissorTest(I),Q){const xt=Et.get(E.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+U,xt.__webglTexture,B)}else if(ct){const xt=Et.get(E.texture),Lt=U||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,xt.__webglTexture,B||0,Lt)}M=-1},this.readRenderTargetPixels=function(E,U,B,H,N,Q,ct){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let _t=Et.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ct!==void 0&&(_t=_t[ct]),_t){Tt.bindFramebuffer(O.FRAMEBUFFER,_t);try{const xt=E.texture,Lt=xt.format,Nt=xt.type;if(!Vt.textureFormatReadable(Lt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Vt.textureTypeReadable(Nt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=E.width-H&&B>=0&&B<=E.height-N&&O.readPixels(U,B,H,N,Ft.convert(Lt),Ft.convert(Nt),Q)}finally{const xt=R!==null?Et.get(R).__webglFramebuffer:null;Tt.bindFramebuffer(O.FRAMEBUFFER,xt)}}},this.readRenderTargetPixelsAsync=async function(E,U,B,H,N,Q,ct){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let _t=Et.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ct!==void 0&&(_t=_t[ct]),_t){const xt=E.texture,Lt=xt.format,Nt=xt.type;if(!Vt.textureFormatReadable(Lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Vt.textureTypeReadable(Nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=E.width-H&&B>=0&&B<=E.height-N){Tt.bindFramebuffer(O.FRAMEBUFFER,_t);const yt=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,yt),O.bufferData(O.PIXEL_PACK_BUFFER,Q.byteLength,O.STREAM_READ),O.readPixels(U,B,H,N,Ft.convert(Lt),Ft.convert(Nt),0);const Yt=R!==null?Et.get(R).__webglFramebuffer:null;Tt.bindFramebuffer(O.FRAMEBUFFER,Yt);const ae=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await Ch(O,ae,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,yt),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,Q),O.deleteBuffer(yt),O.deleteSync(ae),Q}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,U=null,B=0){E.isTexture!==!0&&(os("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,E=arguments[1]);const H=Math.pow(2,-B),N=Math.floor(E.image.width*H),Q=Math.floor(E.image.height*H),ct=U!==null?U.x:0,_t=U!==null?U.y:0;C.setTexture2D(E,0),O.copyTexSubImage2D(O.TEXTURE_2D,B,0,0,ct,_t,N,Q),Tt.unbindTexture()},this.copyTextureToTexture=function(E,U,B=null,H=null,N=0){E.isTexture!==!0&&(os("WebGLRenderer: copyTextureToTexture function signature has changed."),H=arguments[0]||null,E=arguments[1],U=arguments[2],N=arguments[3]||0,B=null);let Q,ct,_t,xt,Lt,Nt,yt,Yt,ae;const le=E.isCompressedTexture?E.mipmaps[N]:E.image;B!==null?(Q=B.max.x-B.min.x,ct=B.max.y-B.min.y,_t=B.isBox3?B.max.z-B.min.z:1,xt=B.min.x,Lt=B.min.y,Nt=B.isBox3?B.min.z:0):(Q=le.width,ct=le.height,_t=le.depth||1,xt=0,Lt=0,Nt=0),H!==null?(yt=H.x,Yt=H.y,ae=H.z):(yt=0,Yt=0,ae=0);const Fe=Ft.convert(U.format),Jt=Ft.convert(U.type);let wt;U.isData3DTexture?(C.setTexture3D(U,0),wt=O.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(C.setTexture2DArray(U,0),wt=O.TEXTURE_2D_ARRAY):(C.setTexture2D(U,0),wt=O.TEXTURE_2D),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,U.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,U.unpackAlignment);const vn=O.getParameter(O.UNPACK_ROW_LENGTH),$t=O.getParameter(O.UNPACK_IMAGE_HEIGHT),Ze=O.getParameter(O.UNPACK_SKIP_PIXELS),gi=O.getParameter(O.UNPACK_SKIP_ROWS),Be=O.getParameter(O.UNPACK_SKIP_IMAGES);O.pixelStorei(O.UNPACK_ROW_LENGTH,le.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,le.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,xt),O.pixelStorei(O.UNPACK_SKIP_ROWS,Lt),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Nt);const ji=E.isDataArrayTexture||E.isData3DTexture,ce=U.isDataArrayTexture||U.isData3DTexture;if(E.isRenderTargetTexture||E.isDepthTexture){const cn=Et.get(E),Ji=Et.get(U),qe=Et.get(cn.__renderTarget),Nn=Et.get(Ji.__renderTarget);Tt.bindFramebuffer(O.READ_FRAMEBUFFER,qe.__webglFramebuffer),Tt.bindFramebuffer(O.DRAW_FRAMEBUFFER,Nn.__webglFramebuffer);for(let On=0;On<_t;On++)ji&&O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Et.get(E).__webglTexture,N,Nt+On),E.isDepthTexture?(ce&&O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Et.get(U).__webglTexture,N,ae+On),O.blitFramebuffer(xt,Lt,Q,ct,yt,Yt,Q,ct,O.DEPTH_BUFFER_BIT,O.NEAREST)):ce?O.copyTexSubImage3D(wt,N,yt,Yt,ae+On,xt,Lt,Q,ct):O.copyTexSubImage2D(wt,N,yt,Yt,ae+On,xt,Lt,Q,ct);Tt.bindFramebuffer(O.READ_FRAMEBUFFER,null),Tt.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else ce?E.isDataTexture||E.isData3DTexture?O.texSubImage3D(wt,N,yt,Yt,ae,Q,ct,_t,Fe,Jt,le.data):U.isCompressedArrayTexture?O.compressedTexSubImage3D(wt,N,yt,Yt,ae,Q,ct,_t,Fe,le.data):O.texSubImage3D(wt,N,yt,Yt,ae,Q,ct,_t,Fe,Jt,le):E.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,N,yt,Yt,Q,ct,Fe,Jt,le.data):E.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,N,yt,Yt,le.width,le.height,Fe,le.data):O.texSubImage2D(O.TEXTURE_2D,N,yt,Yt,Q,ct,Fe,Jt,le);O.pixelStorei(O.UNPACK_ROW_LENGTH,vn),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,$t),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Ze),O.pixelStorei(O.UNPACK_SKIP_ROWS,gi),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Be),N===0&&U.generateMipmaps&&O.generateMipmap(wt),Tt.unbindTexture()},this.copyTextureToTexture3D=function(E,U,B=null,H=null,N=0){return E.isTexture!==!0&&(os("WebGLRenderer: copyTextureToTexture3D function signature has changed."),B=arguments[0]||null,H=arguments[1]||null,E=arguments[2],U=arguments[3],N=arguments[4]||0),os('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(E,U,B,H,N)},this.initRenderTarget=function(E){Et.get(E).__webglFramebuffer===void 0&&C.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?C.setTextureCube(E,0):E.isData3DTexture?C.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?C.setTexture2DArray(E,0):C.setTexture2D(E,0),Tt.unbindTexture()},this.resetState=function(){A=0,b=0,R=null,Tt.reset(),re.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Pn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=qt._getDrawingBufferColorSpace(t),e.unpackColorSpace=qt._getUnpackColorSpace()}}class no{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new zt(t),this.density=e}clone(){return new no(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Vm extends _e{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new pn,this.environmentIntensity=1,this.environmentRotation=new pn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Gm{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=za,this.updateRanges=[],this.version=0,this.uuid=jn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=jn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=jn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Le=new T;class tr{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.applyMatrix4(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.applyNormalMatrix(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.transformDirection(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=un(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ie(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=ie(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ie(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ie(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ie(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=un(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=un(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=un(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=un(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ie(e,this.array),n=ie(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=ie(e,this.array),n=ie(n,this.array),i=ie(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ie(e,this.array),n=ie(n,this.array),i=ie(i,this.array),r=ie(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new ze(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new tr(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class io extends mi{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new zt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Li;const es=new T,Di=new T,Ii=new T,Ui=new et,ns=new et,bc=new Zt,zs=new T,is=new T,Bs=new T,_l=new et,zr=new et,xl=new et;class Ec extends _e{constructor(t=new io){if(super(),this.isSprite=!0,this.type="Sprite",Li===void 0){Li=new be;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Gm(e,5);Li.setIndex([0,1,2,0,2,3]),Li.setAttribute("position",new tr(n,3,0,!1)),Li.setAttribute("uv",new tr(n,2,3,!1))}this.geometry=Li,this.material=t,this.center=new et(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Di.setFromMatrixScale(this.matrixWorld),bc.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Ii.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Di.multiplyScalar(-Ii.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const a=this.center;Hs(zs.set(-.5,-.5,0),Ii,a,Di,i,r),Hs(is.set(.5,-.5,0),Ii,a,Di,i,r),Hs(Bs.set(.5,.5,0),Ii,a,Di,i,r),_l.set(0,0),zr.set(1,0),xl.set(1,1);let o=t.ray.intersectTriangle(zs,is,Bs,!1,es);if(o===null&&(Hs(is.set(-.5,.5,0),Ii,a,Di,i,r),zr.set(0,1),o=t.ray.intersectTriangle(zs,Bs,is,!1,es),o===null))return;const l=t.ray.origin.distanceTo(es);l<t.near||l>t.far||e.push({distance:l,point:es.clone(),uv:je.getInterpolation(es,zs,is,Bs,_l,zr,xl,new et),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Hs(s,t,e,n,i,r){Ui.subVectors(s,e).addScalar(.5).multiply(n),i!==void 0?(ns.x=r*Ui.x-i*Ui.y,ns.y=i*Ui.x+r*Ui.y):ns.copy(Ui),s.copy(t),s.x+=ns.x,s.y+=ns.y,s.applyMatrix4(bc)}class Wm extends mi{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new zt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const yl=new Zt,Va=new hc,Vs=new sr,Gs=new T;class Xm extends _e{constructor(t=new be,e=new Wm){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Vs.copy(n.boundingSphere),Vs.applyMatrix4(i),Vs.radius+=r,t.ray.intersectsSphere(Vs)===!1)return;yl.copy(i).invert(),Va.copy(t.ray).applyMatrix4(yl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let g=d,v=p;g<v;g++){const m=c.getX(g);Gs.fromBufferAttribute(u,m),Ml(Gs,m,l,i,t,e,this)}}else{const d=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let g=d,v=p;g<v;g++)Gs.fromBufferAttribute(u,g),Ml(Gs,g,l,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Ml(s,t,e,n,i,r,a){const o=Va.distanceSqToPoint(s);if(o<e){const l=new T;Va.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class Un extends Ne{constructor(t,e,n,i,r,a,o,l,c){super(t,e,n,i,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class mn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(r-1);const h=n[i],d=n[i+1]-h,p=(a-h)/d;return(i+p)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);const a=this.getPoint(i),o=this.getPoint(r),l=e||(a.isVector2?new et:new T);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new T,i=[],r=[],a=[],o=new T,l=new Zt;for(let p=0;p<=t;p++){const g=p/t;i[p]=this.getTangentAt(g,new T)}r[0]=new T,a[0]=new T;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let p=1;p<=t;p++){if(r[p]=r[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(i[p-1],i[p]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Ee(i[p-1].dot(i[p]),-1,1));r[p].applyMatrix4(l.makeRotationAxis(o,g))}a[p].crossVectors(i[p],r[p])}if(e===!0){let p=Math.acos(Ee(r[0].dot(r[t]),-1,1));p/=t,i[0].dot(o.crossVectors(r[0],r[t]))>0&&(p=-p);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(i[g],p*g)),a[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class so extends mn{constructor(t=0,e=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new et){const n=e,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);const o=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,p=c-this.aY;l=d*h-p*u+this.aX,c=d*u+p*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class qm extends so{constructor(t,e,n,i,r,a){super(t,e,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function ro(){let s=0,t=0,e=0,n=0;function i(r,a,o,l){s=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){i(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,u){let d=(a-r)/c-(o-r)/(c+h)+(o-a)/h,p=(o-a)/h-(l-a)/(h+u)+(l-o)/u;d*=h,p*=h,i(a,o,d,p)},calc:function(r){const a=r*r,o=a*r;return s+t*r+e*a+n*o}}}const Ws=new T,Br=new ro,Hr=new ro,Vr=new ro;class Ym extends mn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new T){const n=e,i=this.points,r=i.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%r]:(Ws.subVectors(i[0],i[1]).add(i[0]),c=Ws);const u=i[o%r],d=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(Ws.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Ws),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),p),v=Math.pow(u.distanceToSquared(d),p),m=Math.pow(d.distanceToSquared(h),p);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),Br.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,v,m),Hr.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,v,m),Vr.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,v,m)}else this.curveType==="catmullrom"&&(Br.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),Hr.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Vr.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(Br.calc(l),Hr.calc(l),Vr.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new T().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Sl(s,t,e,n,i){const r=(n-t)*.5,a=(i-e)*.5,o=s*s,l=s*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*s+e}function Km(s,t){const e=1-s;return e*e*t}function jm(s,t){return 2*(1-s)*s*t}function Jm(s,t){return s*s*t}function cs(s,t,e,n){return Km(s,t)+jm(s,e)+Jm(s,n)}function $m(s,t){const e=1-s;return e*e*e*t}function Zm(s,t){const e=1-s;return 3*e*e*s*t}function Qm(s,t){return 3*(1-s)*s*s*t}function t0(s,t){return s*s*s*t}function hs(s,t,e,n,i){return $m(s,t)+Zm(s,e)+Qm(s,n)+t0(s,i)}class Tc extends mn{constructor(t=new et,e=new et,n=new et,i=new et){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new et){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(hs(t,i.x,r.x,a.x,o.x),hs(t,i.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class e0 extends mn{constructor(t=new T,e=new T,n=new T,i=new T){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new T){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(hs(t,i.x,r.x,a.x,o.x),hs(t,i.y,r.y,a.y,o.y),hs(t,i.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Ac extends mn{constructor(t=new et,e=new et){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new et){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new et){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class n0 extends mn{constructor(t=new T,e=new T){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new T){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new T){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Rc extends mn{constructor(t=new et,e=new et,n=new et){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new et){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(cs(t,i.x,r.x,a.x),cs(t,i.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class i0 extends mn{constructor(t=new T,e=new T,n=new T){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new T){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(cs(t,i.x,r.x,a.x),cs(t,i.y,r.y,a.y),cs(t,i.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Cc extends mn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new et){const n=e,i=this.points,r=(i.length-1)*t,a=Math.floor(r),o=r-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(Sl(o,l.x,c.x,h.x,u.x),Sl(o,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new et().fromArray(i))}return this}}var wl=Object.freeze({__proto__:null,ArcCurve:qm,CatmullRomCurve3:Ym,CubicBezierCurve:Tc,CubicBezierCurve3:e0,EllipseCurve:so,LineCurve:Ac,LineCurve3:n0,QuadraticBezierCurve:Rc,QuadraticBezierCurve3:i0,SplineCurve:Cc});class s0 extends mn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new wl[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const a=i[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const a=r[i],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new wl[i.type]().fromJSON(i))}return this}}class r0 extends s0{constructor(t){super(),this.type="Path",this.currentPoint=new et,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Ac(this.currentPoint.clone(),new et(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const r=new Rc(this.currentPoint.clone(),new et(t,e),new et(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,a){const o=new Tc(this.currentPoint.clone(),new et(t,e),new et(n,i),new et(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Cc(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,i,r,a),this}absarc(t,e,n,i,r,a){return this.absellipse(t,e,n,n,i,r,a),this}ellipse(t,e,n,i,r,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,r,a,o,l),this}absellipse(t,e,n,i,r,a,o,l){const c=new so(t,e,n,i,r,a,o,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class ao extends be{constructor(t=[new et(0,-.5),new et(.5,0),new et(0,.5)],e=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=Ee(i,0,Math.PI*2);const r=[],a=[],o=[],l=[],c=[],h=1/e,u=new T,d=new et,p=new T,g=new T,v=new T;let m=0,f=0;for(let _=0;_<=t.length-1;_++)switch(_){case 0:m=t[_+1].x-t[_].x,f=t[_+1].y-t[_].y,p.x=f*1,p.y=-m,p.z=f*0,v.copy(p),p.normalize(),l.push(p.x,p.y,p.z);break;case t.length-1:l.push(v.x,v.y,v.z);break;default:m=t[_+1].x-t[_].x,f=t[_+1].y-t[_].y,p.x=f*1,p.y=-m,p.z=f*0,g.copy(p),p.x+=v.x,p.y+=v.y,p.z+=v.z,p.normalize(),l.push(p.x,p.y,p.z),v.copy(g)}for(let _=0;_<=e;_++){const S=n+_*h*i,x=Math.sin(S),L=Math.cos(S);for(let A=0;A<=t.length-1;A++){u.x=t[A].x*x,u.y=t[A].y,u.z=t[A].x*L,a.push(u.x,u.y,u.z),d.x=_/e,d.y=A/(t.length-1),o.push(d.x,d.y);const b=l[3*A+0]*x,R=l[3*A+1],M=l[3*A+0]*L;c.push(b,R,M)}}for(let _=0;_<e;_++)for(let S=0;S<t.length-1;S++){const x=S+_*t.length,L=x,A=x+t.length,b=x+t.length+1,R=x+1;r.push(L,A,R),r.push(b,R,A)}this.setIndex(r),this.setAttribute("position",new Qt(a,3)),this.setAttribute("uv",new Qt(o,2)),this.setAttribute("normal",new Qt(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ao(t.points,t.segments,t.phiStart,t.phiLength)}}class ar extends ao{constructor(t=1,e=1,n=4,i=8){const r=new r0;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:i}}static fromJSON(t){return new ar(t.radius,t.length,t.capSegments,t.radialSegments)}}class oo extends be{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const r=[],a=[],o=[],l=[],c=new T,h=new et;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const p=n+u/e*i;c.x=t*Math.cos(p),c.y=t*Math.sin(p),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[d]/t+1)/2,h.y=(a[d+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Qt(a,3)),this.setAttribute("normal",new Qt(o,3)),this.setAttribute("uv",new Qt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new oo(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Pe extends be{constructor(t=1,e=1,n=1,i=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const h=[],u=[],d=[],p=[];let g=0;const v=[],m=n/2;let f=0;_(),a===!1&&(t>0&&S(!0),e>0&&S(!1)),this.setIndex(h),this.setAttribute("position",new Qt(u,3)),this.setAttribute("normal",new Qt(d,3)),this.setAttribute("uv",new Qt(p,2));function _(){const x=new T,L=new T;let A=0;const b=(e-t)/n;for(let R=0;R<=r;R++){const M=[],y=R/r,P=y*(e-t)+t;for(let F=0;F<=i;F++){const I=F/i,k=I*l+o,V=Math.sin(k),W=Math.cos(k);L.x=P*V,L.y=-y*n+m,L.z=P*W,u.push(L.x,L.y,L.z),x.set(V,b,W).normalize(),d.push(x.x,x.y,x.z),p.push(I,1-y),M.push(g++)}v.push(M)}for(let R=0;R<i;R++)for(let M=0;M<r;M++){const y=v[M][R],P=v[M+1][R],F=v[M+1][R+1],I=v[M][R+1];(t>0||M!==0)&&(h.push(y,P,I),A+=3),(e>0||M!==r-1)&&(h.push(P,F,I),A+=3)}c.addGroup(f,A,0),f+=A}function S(x){const L=g,A=new et,b=new T;let R=0;const M=x===!0?t:e,y=x===!0?1:-1;for(let F=1;F<=i;F++)u.push(0,m*y,0),d.push(0,y,0),p.push(.5,.5),g++;const P=g;for(let F=0;F<=i;F++){const k=F/i*l+o,V=Math.cos(k),W=Math.sin(k);b.x=M*W,b.y=m*y,b.z=M*V,u.push(b.x,b.y,b.z),d.push(0,y,0),A.x=V*.5+.5,A.y=W*.5*y+.5,p.push(A.x,A.y),g++}for(let F=0;F<i;F++){const I=L+F,k=P+F;x===!0?h.push(k,k+1,I):h.push(k+1,k,I),R+=3}c.addGroup(f,R,x===!0?1:2),f+=R}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Pe(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class us extends Pe{constructor(t=1,e=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new us(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class lo extends be{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const r=[],a=[];o(i),c(n),h(),this.setAttribute("position",new Qt(r,3)),this.setAttribute("normal",new Qt(r.slice(),3)),this.setAttribute("uv",new Qt(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(_){const S=new T,x=new T,L=new T;for(let A=0;A<e.length;A+=3)p(e[A+0],S),p(e[A+1],x),p(e[A+2],L),l(S,x,L,_)}function l(_,S,x,L){const A=L+1,b=[];for(let R=0;R<=A;R++){b[R]=[];const M=_.clone().lerp(x,R/A),y=S.clone().lerp(x,R/A),P=A-R;for(let F=0;F<=P;F++)F===0&&R===A?b[R][F]=M:b[R][F]=M.clone().lerp(y,F/P)}for(let R=0;R<A;R++)for(let M=0;M<2*(A-R)-1;M++){const y=Math.floor(M/2);M%2===0?(d(b[R][y+1]),d(b[R+1][y]),d(b[R][y])):(d(b[R][y+1]),d(b[R+1][y+1]),d(b[R+1][y]))}}function c(_){const S=new T;for(let x=0;x<r.length;x+=3)S.x=r[x+0],S.y=r[x+1],S.z=r[x+2],S.normalize().multiplyScalar(_),r[x+0]=S.x,r[x+1]=S.y,r[x+2]=S.z}function h(){const _=new T;for(let S=0;S<r.length;S+=3){_.x=r[S+0],_.y=r[S+1],_.z=r[S+2];const x=m(_)/2/Math.PI+.5,L=f(_)/Math.PI+.5;a.push(x,1-L)}g(),u()}function u(){for(let _=0;_<a.length;_+=6){const S=a[_+0],x=a[_+2],L=a[_+4],A=Math.max(S,x,L),b=Math.min(S,x,L);A>.9&&b<.1&&(S<.2&&(a[_+0]+=1),x<.2&&(a[_+2]+=1),L<.2&&(a[_+4]+=1))}}function d(_){r.push(_.x,_.y,_.z)}function p(_,S){const x=_*3;S.x=t[x+0],S.y=t[x+1],S.z=t[x+2]}function g(){const _=new T,S=new T,x=new T,L=new T,A=new et,b=new et,R=new et;for(let M=0,y=0;M<r.length;M+=9,y+=6){_.set(r[M+0],r[M+1],r[M+2]),S.set(r[M+3],r[M+4],r[M+5]),x.set(r[M+6],r[M+7],r[M+8]),A.set(a[y+0],a[y+1]),b.set(a[y+2],a[y+3]),R.set(a[y+4],a[y+5]),L.copy(_).add(S).add(x).divideScalar(3);const P=m(L);v(A,y+0,_,P),v(b,y+2,S,P),v(R,y+4,x,P)}}function v(_,S,x,L){L<0&&_.x===1&&(a[S]=_.x-1),x.x===0&&x.z===0&&(a[S]=L/2/Math.PI+.5)}function m(_){return Math.atan2(_.z,-_.x)}function f(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new lo(t.vertices,t.indices,t.radius,t.details)}}class or extends lo{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new or(t.radius,t.detail)}}class co extends be{constructor(t=.5,e=1,n=32,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],l=[],c=[],h=[];let u=t;const d=(e-t)/i,p=new T,g=new et;for(let v=0;v<=i;v++){for(let m=0;m<=n;m++){const f=r+m/n*a;p.x=u*Math.cos(f),p.y=u*Math.sin(f),l.push(p.x,p.y,p.z),c.push(0,0,1),g.x=(p.x/e+1)/2,g.y=(p.y/e+1)/2,h.push(g.x,g.y)}u+=d}for(let v=0;v<i;v++){const m=v*(n+1);for(let f=0;f<n;f++){const _=f+m,S=_,x=_+n+1,L=_+n+2,A=_+1;o.push(S,x,A),o.push(x,L,A)}}this.setIndex(o),this.setAttribute("position",new Qt(l,3)),this.setAttribute("normal",new Qt(c,3)),this.setAttribute("uv",new Qt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new co(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class nn extends be{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new T,d=new T,p=[],g=[],v=[],m=[];for(let f=0;f<=n;f++){const _=[],S=f/n;let x=0;f===0&&a===0?x=.5/e:f===n&&l===Math.PI&&(x=-.5/e);for(let L=0;L<=e;L++){const A=L/e;u.x=-t*Math.cos(i+A*r)*Math.sin(a+S*o),u.y=t*Math.cos(a+S*o),u.z=t*Math.sin(i+A*r)*Math.sin(a+S*o),g.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),m.push(A+x,1-S),_.push(c++)}h.push(_)}for(let f=0;f<n;f++)for(let _=0;_<e;_++){const S=h[f][_+1],x=h[f][_],L=h[f+1][_],A=h[f+1][_+1];(f!==0||a>0)&&p.push(S,x,A),(f!==n-1||l<Math.PI)&&p.push(x,L,A)}this.setIndex(p),this.setAttribute("position",new Qt(g,3)),this.setAttribute("normal",new Qt(v,3)),this.setAttribute("uv",new Qt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new nn(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class er extends be{constructor(t=1,e=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const a=[],o=[],l=[],c=[],h=new T,u=new T,d=new T;for(let p=0;p<=n;p++)for(let g=0;g<=i;g++){const v=g/i*r,m=p/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(v),u.y=(t+e*Math.cos(m))*Math.sin(v),u.z=e*Math.sin(m),o.push(u.x,u.y,u.z),h.x=t*Math.cos(v),h.y=t*Math.sin(v),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(g/i),c.push(p/n)}for(let p=1;p<=n;p++)for(let g=1;g<=i;g++){const v=(i+1)*p+g-1,m=(i+1)*(p-1)+g-1,f=(i+1)*(p-1)+g,_=(i+1)*p+g;a.push(v,m,_),a.push(m,f,_)}this.setIndex(a),this.setAttribute("position",new Qt(o,3)),this.setAttribute("normal",new Qt(l,3)),this.setAttribute("uv",new Qt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new er(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Kt extends mi{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new zt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new zt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=rc,this.normalScale=new et(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new pn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class ho extends _e{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new zt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class a0 extends ho{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(_e.DEFAULT_UP),this.updateMatrix(),this.groundColor=new zt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Gr=new Zt,bl=new T,El=new T;class Pc{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new et(512,512),this.map=null,this.mapPass=null,this.matrix=new Zt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Qa,this._frameExtents=new et(1,1),this._viewportCount=1,this._viewports=[new se(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;bl.setFromMatrixPosition(t.matrixWorld),e.position.copy(bl),El.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(El),e.updateMatrixWorld(),Gr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Gr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Gr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Tl=new Zt,ss=new T,Wr=new T;class o0 extends Pc{constructor(){super(new ke(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new et(4,2),this._viewportCount=6,this._viewports=[new se(2,1,1,1),new se(0,1,1,1),new se(3,1,1,1),new se(1,1,1,1),new se(3,0,1,1),new se(1,0,1,1)],this._cubeDirections=[new T(1,0,0),new T(-1,0,0),new T(0,0,1),new T(0,0,-1),new T(0,1,0),new T(0,-1,0)],this._cubeUps=[new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,0,1),new T(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ss.setFromMatrixPosition(t.matrixWorld),n.position.copy(ss),Wr.copy(n.position),Wr.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Wr),n.updateMatrixWorld(),i.makeTranslation(-ss.x,-ss.y,-ss.z),Tl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Tl)}}class Al extends ho{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new o0}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class l0 extends Pc{constructor(){super(new to(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class c0 extends ho{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(_e.DEFAULT_UP),this.updateMatrix(),this.target=new _e,this.shadow=new l0}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class h0{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Rl(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Rl();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Rl(){return performance.now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:qa}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=qa);const Ie={fog:11315338,waterNear:7248491,waterFar:11118213,floorTile:"#E0D69B",platformTile:"#B2A16E",wallTile:"#A6A27F",grout:"#8a6a42",groutDark:"#6f5433",safeGlow:15462890,monsterBody:3814950,monsterHead:7950384,frame:4863520},bt={gravity:15,jumpVel:6.8,walkSpeed:4.2,sprintSpeed:6.8,swimSpeed:1.6,radius:.35,height:1.7,eye:1.6,waterY:0,platformThick:.5,platformTop:.25,stepUp:.4,swimFeetY:-.75},qn={playerSplash:40,swimMove:15,swimInterval:1.5,pebble:25,bottle:35},Xr={easy:{key:"easy",label:"EASY",hint:"Kısa bölümler, bol platform, yavaş canavar. Easy yarım coin öder.",monsters:1,chaseSpeed:7.4,huntMul:1.6,wanderSpeed:1.8,hearMult:1,catchRadius:1.6,searchTime:3,sinkTime:3,riseTime:3,safeEvery:3,bridgePeriod:16,bridgeCount:3,moveAmp:[3,4.5],movePeriod:[5,7],conveyorFrac:.5,memoryRows:6,memoryTime:10,wallInterval:8,wallSpeed:.6,lanes:4,platformScale:1,gapScale:1,coinMult:.5,mixRules:!1,bleedTime:20},normal:{key:"normal",label:"NORMAL",hint:"Daha az platform, daha kısa süreler, daha hızlı canavar.",monsters:1,chaseSpeed:8.4,huntMul:1.75,wanderSpeed:2.2,hearMult:1.15,catchRadius:1.8,searchTime:4,sinkTime:2.5,riseTime:3,safeEvery:4,bridgePeriod:14,bridgeCount:4,moveAmp:[3.5,5.5],movePeriod:[4.5,6],conveyorFrac:.6,memoryRows:8,memoryTime:8,wallInterval:7,wallSpeed:.6,lanes:4,platformScale:.85,gapScale:1.12,coinMult:1,mixRules:!1,bleedTime:20},hard:{key:"hard",label:"HARD",hint:"3 canavar, geniş duyma yarıçapı, karışık oda kuralları. Normal’i 2 kez bitirince açılır.",monsters:3,chaseSpeed:9.4,huntMul:1.9,wanderSpeed:2.6,hearMult:1.3,catchRadius:2,searchTime:5,sinkTime:2,riseTime:3,safeEvery:5,bridgePeriod:12,bridgeCount:5,moveAmp:[4,6],movePeriod:[4,5.5],conveyorFrac:.7,memoryRows:10,memoryTime:6.5,wallInterval:6,wallSpeed:.6,lanes:3,platformScale:.75,gapScale:1.22,coinMult:1,mixRules:!0,bleedTime:20}},u0=[{id:"pillar",title:"PILLAR HALL",rule:"Jump between the platforms. Reach the exit."},{id:"broken",title:"BROKEN WALKWAY",rule:"Narrow ledges with short jumps, or wide platforms with long jumps."},{id:"sinking",title:"SINKING PLATFORMS",rule:"Platforms sink while you stand on them. Keep moving. Dark-bordered platforms are safe."},{id:"rotating",title:"ROTATING BRIDGE",rule:"Ride the rotating bridges. Time your jumps onto the platforms."},{id:"moving",title:"MOVING PLATFORMS",rule:"Every platform moves. Time your jumps."},{id:"drifting",title:"DRIFTING PLATFORMS",rule:"The arrows push you. Don't get carried into the water."},{id:"memory",title:"MEMORY BRIDGE",rule:"Watch for the safe tiles to light up. Remember them."},{id:"crushing",title:"CRUSHING WALLS",rule:"The walls slide in and shove you into the water. One lane always stays open."},{id:"locked",title:"LOCKED EXIT",rule:"Find the 4 numbers on the pillars. Take a photo of each with your camera."}];function Ni(s){if(s==null||!isFinite(s))return"--:--.-";const t=Math.floor(s/60),e=Math.floor(s%60),n=Math.floor(s*10%10);return`${t}:${String(e).padStart(2,"0")}.${n}`}function We(s,t,e){return s<t?t:s>e?e:s}function d0(s,t,e){return s+(t-s)*e}function ge(s,t,e,n){return d0(s,t,1-Math.exp(-e*n))}function Ga(s){let t=s>>>0;const e=()=>{t|=0,t=t+1831565813|0;let n=Math.imul(t^t>>>15,1|t);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296};return e.range=(n,i)=>n+(i-n)*e(),e.int=(n,i)=>Math.floor(e.range(n,i+1)),e.pick=n=>n[Math.floor(e()*n.length)],e.sign=()=>e()<.5?-1:1,e}const Lc="do-not-splash-save-v1",Wa={coins:0,normalWins:0,firstEscape:{easy:!1,normal:!1,hard:!1},lastDaily:"",bestTimes:{solo:{easy:[],normal:[],hard:[]},duo:{easy:[],normal:[],hard:[]}},upgrades:{pebble:0,bleed:0,quiet:0,push:0},settings:{sens:1,fov:78,volume:.8,friendlyPush:!0,shake:!0,lowQ:!1,lang:"auto"}};function Dc(s,t){if(typeof s!="object"||s===null)return t===void 0?s:t;const e=Array.isArray(s)?[...s]:{...s};if(typeof t!="object"||t===null)return e;for(const n of Object.keys(t))e[n]=Dc(s[n],t[n]);return e}const Ge=(()=>{let s;try{s=Dc(Wa,JSON.parse(localStorage.getItem(Lc)||"{}"))}catch{s=structuredClone(Wa)}return s})();function Fi(){try{localStorage.setItem(Lc,JSON.stringify(Ge))}catch{}}function f0(){const s=structuredClone(Wa);for(const t of Object.keys(Ge))delete Ge[t];Object.assign(Ge,s),Fi()}function qr(){return Ge.normalWins>=2}function p0(s,t,e){const n=Ge.bestTimes[s][t],i=n.length?n[0].t:null,r={t:e,d:new Date().toISOString().slice(0,10)};n.push(r),n.sort((o,l)=>o.t-l.t),n.length>10&&(n.length=10);const a=n.indexOf(r);return Fi(),{rank:a,isRecord:i===null||e<i,prevBest:i}}function $n(s,t){const e=document.createElement("canvas");return e.width=s,e.height=t,e}function m0(s,t){const e=new zt(s),n={};return e.getHSL(n),e.setHSL(n.h,n.s,Math.min(1,Math.max(0,n.l+t))),"#"+e.getHexString()}function g0(s,t){return s.wrapS=s.wrapT=di,s.colorSpace=ve,s.anisotropy=8,s.repeat.set(1/t,1/t),s.needsUpdate=!0,s}function Yr({px:s=512,tilesPerUnit:t=4,unitsAcross:e=2,base:n=Ie.floorTile,grout:i=Ie.grout,groutPx:r=5,variation:a=.035,seed:o=1}={}){const l=$n(s,s),c=l.getContext("2d"),h=t*e,u=s/h;c.fillStyle=i,c.fillRect(0,0,s,s);let d=o*9301+49297;const p=()=>(d=d*1103515245+12345&2147483647,d/2147483647);for(let S=0;S<h;S++)for(let x=0;x<h;x++){const L=(p()-.5)*2*a;c.fillStyle=m0(n,L);const A=S*u+r/2,b=x*u+r/2,R=u-r;c.fillRect(A,b,R,R),c.fillStyle="rgba(255,255,255,0.18)",c.fillRect(A,b,R,1.5),c.fillRect(A,b,1.5,R),c.fillStyle="rgba(0,0,0,0.12)",c.fillRect(A,b+R-1.5,R,1.5),c.fillRect(A+R-1.5,b,1.5,R),p()<.25&&(c.fillStyle="rgba(80,60,30,0.08)",c.beginPath(),c.arc(A+p()*R,b+p()*R,1+p()*3,0,Math.PI*2),c.fill())}const g=g0(new Un(l),e),v=$n(s,s),m=v.getContext("2d");m.fillStyle="rgb(128,128,255)",m.fillRect(0,0,s,s);const f=Math.max(2,r*.8);for(let S=0;S<=h;S++){const x=S*u;m.fillStyle="rgb(96,128,255)",m.fillRect(x+r/2,0,f,s),m.fillStyle="rgb(160,128,255)",m.fillRect(x-r/2-f,0,f,s);const L=S*u;m.fillStyle="rgb(128,160,255)",m.fillRect(0,L+r/2,s,f),m.fillStyle="rgb(128,96,255)",m.fillRect(0,L-r/2-f,s,f)}const _=new Un(v);return _.wrapS=_.wrapT=di,_.anisotropy=8,_.repeat.set(1/e,1/e),_.needsUpdate=!0,{map:g,normalMap:_}}function v0(){const t=$n(256,256),e=t.getContext("2d");e.clearRect(0,0,256,256),e.strokeStyle="rgba(70,50,25,0.85)",e.lineWidth=14,e.lineCap="round",e.lineJoin="round";const n=2,i=3;for(let a=0;a<n;a++)for(let o=0;o<i;o++){const l=(a+.5)*(256/n),c=(o+.5)*(256/i),h=36,u=26;e.beginPath(),e.moveTo(l-h,c+u),e.lineTo(l,c-u),e.lineTo(l+h,c+u),e.stroke()}const r=new Un(t);return r.wrapS=r.wrapT=di,r.colorSpace=ve,r.anisotropy=4,r}function _0(){const s=$n(256,256),t=s.getContext("2d");t.clearRect(0,0,256,256),t.fillStyle="rgba(20,16,12,0.88)",t.beginPath(),t.moveTo(128,30),t.lineTo(210,120),t.lineTo(160,120),t.lineTo(160,226),t.lineTo(96,226),t.lineTo(96,120),t.lineTo(46,120),t.closePath(),t.fill();for(let n=0;n<40;n++)t.clearRect(40+Math.random()*176,30+Math.random()*200,2,2);const e=new Un(s);return e.colorSpace=ve,e}const Xa='"Marker Felt", "Chalkboard SE", "Comic Sans MS", "Segoe Print", cursive';function rs(s,{w:t=1024,h:e=256,size:n=110,color:i="rgba(32,24,16,0.88)"}={}){const r=$n(t,e),a=r.getContext("2d");a.clearRect(0,0,t,e),a.font=`bold ${n}px ${Xa}`,a.textAlign="center",a.textBaseline="middle",a.fillStyle=i,a.save(),a.translate(t/2,e/2),a.rotate((Math.random()-.5)*.06),a.fillText(s,0,0),a.restore(),a.fillStyle=i;for(let l=0;l<6;l++){const c=t*.2+Math.random()*t*.6;a.fillRect(c,e/2+n*.3,3,10+Math.random()*30)}const o=new Un(r);return o.colorSpace=ve,o}function x0(s,t){const i=$n(512,768),r=i.getContext("2d");r.clearRect(0,0,512,768),r.fillStyle="rgba(28,20,14,0.92)",r.font=`bold 520px ${Xa}`,r.textAlign="center",r.textBaseline="middle",r.save(),r.translate(512/2,768/2-40),r.rotate((Math.random()-.5)*.12),r.fillText(String(s),0,0),r.restore(),r.font=`bold 90px ${Xa}`,r.fillText("#"+(t+1),512/2,678);const a=new Un(i);return a.colorSpace=ve,a}function Cl(s,t){const e=$n(256,320),n=e.getContext("2d");n.fillStyle="#2a2824",n.fillRect(0,0,256,320),n.fillStyle="#121",n.fillRect(20,20,216,70),n.font="bold 50px monospace",n.textAlign="center",n.textBaseline="middle",n.fillStyle="#6cff8a";let i="";for(let o=0;o<4;o++)i+=t[o]?s[o]:"_";n.fillText(i.split("").join(" "),128,56);const r=["1","2","3","4","5","6","7","8","9","*","0","#"];n.font="bold 30px sans-serif",r.forEach((o,l)=>{const c=36+l%3*72,h=110+Math.floor(l/3)*52;n.fillStyle="#d9d2bc",n.fillRect(c,h,56,40),n.fillStyle="#222",n.fillText(o,c+28,h+21)});const a=new Un(e);return a.colorSpace=ve,a}function y0(){const s=$n(64,64),t=s.getContext("2d"),e=t.createRadialGradient(32,32,0,32,32,32);e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.5,"rgba(255,255,255,0.6)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,64,64);const n=new Un(s);return n.colorSpace=ve,n}function M0(){return{floor:Yr({tilesPerUnit:1,unitsAcross:4,base:Ie.floorTile,grout:Ie.grout,groutPx:6,seed:3}),platform:Yr({tilesPerUnit:4,unitsAcross:2,base:Ie.platformTile,grout:Ie.groutDark,groutPx:5,seed:7}),wall:Yr({tilesPerUnit:8,unitsAcross:2,base:Ie.wallTile,grout:"#8f8c70",groutPx:3,variation:.03,seed:11}),chevron:v0(),arrow:_0(),particle:y0()}}function Kr(s,t,e){const n=new Ce(s,t,e),i=n.attributes.uv,r=[[e,t],[e,t],[s,e],[s,e],[s,t],[s,t]];for(let a=0;a<6;a++){const[o,l]=r[a];for(let c=0;c<4;c++){const h=a*4+c;i.setXY(h,i.getX(h)*o,i.getY(h)*l)}}return i.needsUpdate=!0,n}function S0(s,t,e=28,n=!0){const i=new Pe(s,s,t,e,1,n),r=i.attributes.uv,a=2*Math.PI*s;for(let o=0;o<r.count;o++)r.setXY(o,r.getX(o)*a,r.getY(o)*t);return r.needsUpdate=!0,i}function Pl(s,t){const e=new ln(s,t),n=e.attributes.uv;for(let i=0;i<n.count;i++)n.setXY(i,n.getX(i)*s,n.getY(i)*t);return n.needsUpdate=!0,e}function w0(s,t,e=20){const n=new Pe(s,s,t,e,1,!0,0,Math.PI);n.rotateZ(Math.PI/2),n.rotateY(Math.PI/2);const i=n.attributes.uv,r=Math.PI*s;for(let a=0;a<i.count;a++)i.setXY(a,i.getX(a)*r,i.getY(a)*t);return i.needsUpdate=!0,n}let b0=0;new T;class E0{constructor(t){this.id=b0++,this.w=t.w,this.d=t.d,this.h=t.h??bt.platformThick,this.base=new T(t.x,t.y??0,t.z),this.pos=this.base.clone(),this.prevPos=this.base.clone(),this.vel=new T,this.baseYaw=t.yaw||0,this.yaw=this.baseYaw,this.prevYaw=this.yaw,this.kind=t.kind||"static",this.walkable=t.walkable??this.kind!=="solid",this.dynamic=["sinking","rotating","moving","memory"].includes(this.kind),this.standing=0,this.room=t.room??-1,this.mesh=null,this.extra=null,this.framed=!!t.framed,this.sinkT=0,this.sinkTime=t.sinkTime||2.5,this.riseTime=t.riseTime||3,this.sinkDepth=t.sinkDepth||1.1,this.period=t.period||14,this.dir=t.dir||1,this.axis=t.axis||new T(1,0,0),this.amp=t.amp||0,this.phase=t.phase||0,this.mixSink=!!t.mixSink,this.convDir=t.convDir||new et(0,1),this.convSpeed=t.convSpeed||2.5,this.safe=t.safe??!0,this.collapsed=!1,this.collapseT=0,this.glow=!1,this.hidden=!1,this.decoy=!!t.decoy,this.connector=!!t.connector}top(){return this.pos.y+this.h/2}bottom(){return this.pos.y-this.h/2}toLocal(t,e,n={x:0,z:0}){const i=t-this.pos.x,r=e-this.pos.z,a=Math.cos(this.yaw),o=Math.sin(this.yaw);return n.x=i*a-r*o,n.z=i*o+r*a,n}toWorld(t,e,n={x:0,z:0}){const i=Math.cos(this.yaw),r=Math.sin(this.yaw);return n.x=this.pos.x+t*i+e*r,n.z=this.pos.z-t*r+e*i,n}dirToWorld(t,e,n={x:0,z:0}){const i=Math.cos(this.yaw),r=Math.sin(this.yaw);return n.x=t*i+e*r,n.z=-t*r+e*i,n}convWorld(t=new et){const e=this.dirToWorld(this.convDir.x,this.convDir.y);return t.set(e.x,e.z),t}containsXZ(t,e,n=0){const i=this.toLocal(t,e);return Math.abs(i.x)<=this.w/2+n&&Math.abs(i.z)<=this.d/2+n}update(t,e){switch(this.prevPos.copy(this.pos),this.prevYaw=this.yaw,this.kind){case"sinking":{if(this.framed)break;this.standing>0?this.sinkT=Math.min(1,this.sinkT+t/this.sinkTime):this.sinkT=Math.max(0,this.sinkT-t/this.riseTime),this.pos.y=this.base.y-this.sinkT*this.sinkDepth;break}case"rotating":{this.yaw=this.baseYaw+this.dir*(2*Math.PI*e)/this.period;break}case"moving":{const n=Math.sin(2*Math.PI*e/this.period+this.phase)*this.amp;this.pos.x=this.base.x+this.axis.x*n,this.pos.z=this.base.z+this.axis.z*n,this.mixSink&&(this.standing>0?this.sinkT=Math.min(1,this.sinkT+t/this.sinkTime):this.sinkT=Math.max(0,this.sinkT-t/this.riseTime),this.pos.y=this.base.y-this.sinkT*this.sinkDepth);break}case"memory":{if(this.collapsed){this.collapseT+=t;let n;this.collapseT<.5?n=-this.collapseT/.5*1.4:this.collapseT<4?n=-1.4:this.collapseT<5.5?n=-1.4*(1-(this.collapseT-4)/1.5):(n=0,this.collapsed=!1,this.collapseT=0),this.pos.y=this.base.y+n}break}}this.vel.subVectors(this.pos,this.prevPos).divideScalar(Math.max(t,1e-4)),this.standing=0,this.mesh&&(this.mesh.position.copy(this.pos),this.mesh.rotation.y=this.yaw)}}function T0(s,t,e){let n;if(s.kind==="solid"?(n=new dt(Kr(s.w,s.h,s.d),t.wall),n.castShadow=!0,n.receiveShadow=!0):s.kind==="floor"?(n=new dt(Kr(s.w,s.h,s.d),t.floor),n.receiveShadow=!0):(n=new dt(Kr(s.w,s.h,s.d),s.kind==="memory"?t.platformMemory:t.platform),n.castShadow=!0,n.receiveShadow=!0),n.position.copy(s.pos),n.rotation.y=s.yaw,n.userData.platform=s,s.mesh=n,s.framed){const a=new ee,o=new Ce(s.w+.2,.18,.35),l=new Ce(.35,.18,s.d+.2),c=new dt(o,t.frame);c.position.set(0,s.h/2+.18/2-.02,s.d/2+.1-.35/2);const h=new dt(o,t.frame);h.position.set(0,s.h/2+.18/2-.02,-s.d/2-.1+.35/2);const u=new dt(l,t.frame);u.position.set(s.w/2+.1-.35/2,s.h/2+.18/2-.02,0);const d=new dt(l,t.frame);d.position.set(-s.w/2-.1+.35/2,s.h/2+.18/2-.02,0);for(const p of[c,h,u,d])p.castShadow=!0,a.add(p);n.add(a)}if(s.kind==="conveyor"){const i=s.convDir.x,r=s.convDir.y,a=Math.abs(r)>Math.abs(i),o=a?s.w:s.d,l=a?s.d:s.w,c=new ln(o-.2,l-.2),h=c.attributes.uv;for(let g=0;g<h.count;g++)h.setXY(g,h.getX(g)*o/2,h.getY(g)*l/2);h.needsUpdate=!0;const u=new dt(c,t.chevron);u.rotation.x=-Math.PI/2,u.position.y=s.h/2+.012;const d=Math.atan2(-i,-r),p=new ee;p.rotation.y=d,p.add(u),n.add(p),s.extra=u}return n}const Ic={time:{value:0}};function A0(){const s=new Kt({color:Ie.waterNear,roughness:.42,metalness:0});return s.onBeforeCompile=t=>{t.uniforms.uTime=Ic.time,t.uniforms.uFar={value:new zt(Ie.waterFar)},t.vertexShader=t.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vWPos;`).replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
vWPos = (modelMatrix * vec4(transformed, 1.0)).xyz;`),t.fragmentShader=t.fragmentShader.replace("#include <common>",`#include <common>
        varying vec3 vWPos; uniform float uTime; uniform vec3 uFar;
        float wv(vec2 p, float t){ return sin(p.x*1.3+t*0.9)*0.5 + sin(p.y*1.1 - t*0.7)*0.5 + sin((p.x+p.y)*0.6 + t*0.5)*0.4 + sin((p.x-p.y)*2.1 - t*1.3)*0.15; }`).replace("#include <normal_fragment_begin>",`#include <normal_fragment_begin>
        { vec2 p = vWPos.xz; float e = 0.2; float h0 = wv(p, uTime); float hx = wv(p + vec2(e, 0.0), uTime); float hz = wv(p + vec2(0.0, e), uTime);
          vec3 nw = normalize(vec3(-(hx - h0) / e * 0.08, 1.0, -(hz - h0) / e * 0.08));
          normal = normalize((viewMatrix * vec4(nw, 0.0)).xyz); nonPerturbedNormal = normal; }`).replace("#include <color_fragment>",`#include <color_fragment>
        { vec2 p = vWPos.xz;
          float c1 = abs(sin(p.x * 2.1 + uTime * 0.8 + sin(p.y * 1.7)));
          float c2 = abs(sin(p.y * 2.3 - uTime * 0.6 + sin(p.x * 1.4 + uTime * 0.3)));
          float ca = pow(1.0 - min(c1, c2), 6.0);
          diffuseColor.rgb += vec3(0.10, 0.11, 0.08) * ca;
          float dist = length(vWPos - cameraPosition);
          float farK = 1.0 - exp(-dist * dist * 0.0011);
          diffuseColor.rgb = mix(diffuseColor.rgb, uFar, farK * 0.9); }`)},s.customProgramCacheKey=()=>"dns-water",s}function R0(s,t=!1){const e=new Kt({map:s.platform.map,normalMap:s.platform.normalMap,normalScale:new et(.6,.6),roughness:.42,metalness:.05}),n=e.clone(),i=new Kt({map:s.platform.map,color:16777215,emissive:new zt(Ie.safeGlow),emissiveIntensity:2.6,roughness:.3}),r=new Kt({map:s.floor.map,normalMap:s.floor.normalMap,normalScale:new et(.5,.5),roughness:.38,metalness:.05}),a=new Kt({map:s.wall.map,normalMap:s.wall.normalMap,normalScale:new et(.4,.4),roughness:.5,metalness:.02}),o=a.clone();o.side=Ue;const l=new Kt({color:Ie.frame,roughness:.7}),c=new an({map:s.chevron,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,fog:!0,opacity:.9}),h=new an({color:11745834,transparent:!0,opacity:.38,depthWrite:!1,side:sn,fog:!0}),u=A0();return{platform:e,platformMemory:n,platformGlow:i,floor:r,wall:a,wallInside:o,frame:l,chevron:c,redWall:h,water:u}}const ri=80,wn=12,Gn=6,Ll=46,Dl=["DON'T SPLASH","IT KNOWS","IT HEARS YOU","SHHH","NO SPLASH!!","QUIET","STAY DRY","<<<","KEEP MOVING","IT CAN'T SEE"];class he{constructor(t,e,n,i,r=1,a=!1){this.scene=t,this.textures=e,this.mats=n,this.diff=i,this.duo=a,this.rng=Ga(r),this.group=new ee,t.add(this.group),this.platforms=[],this.pillars=[],this.rooms=[],this.tunnels=[],this.pickups=[],this.digits=[],this.decals=[],this.code=[0,0,0,0].map(()=>this.rng.int(0,9)),this.found=[!1,!1,!1,!1],this.memory=null,this.crushing=null,this.door=null,this.events=[],this.time=0,this._build()}addPlatform(t){const e=new E0(t);this.platforms.push(e);const n=T0(e,this.mats,this.textures);return this.group.add(n),e}addPillar(t,e,n){for(const a of this.platforms)if(!(a.kind==="solid"||a.kind==="floor")&&a.containsXZ(t,e,n+.8))return null;for(const a of this.pillars)if(Math.hypot(a.x-t,a.z-e)<a.r+n+2)return null;const i=new dt(S0(n,Ll,32,!0),this.mats.wall);i.position.set(t,Ll/2-6,e),i.castShadow=!0,i.receiveShadow=!0,this.group.add(i);const r={x:t,z:e,r:n,mesh:i};return this.pillars.push(r),r}addWallPlane(t,e,n,i,r=!1){const a=new dt(Pl(t,e),this.mats.wall);return a.position.copy(n),a.rotation.y=i,a.receiveShadow=!0,r&&(a.material=this.mats.wall),this.group.add(a),a}addDecal(t,e,n,i,r,a=0,o=1){const l=new an({map:t,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-4,fog:!0,opacity:o}),c=new dt(new ln(e,n),l);return c.position.copy(i),c.rotation.order="YXZ",c.rotation.y=r,c.rotation.x=a,this.group.add(c),this.decals.push(c),c}floorArrow(t,e,n=0,i=bt.platformTop+.01){return this.addDecal(this.textures.arrow,1.6,1.6,new T(t,i,e),n+Math.PI,-Math.PI/2,.9)}addPickup(t,e,n,i=bt.platformTop,r=null){let a;if(t==="pebble"){a=new ee;const c=new Kt({color:8224120,roughness:.9});for(let h=0;h<3;h++){const u=new dt(new or(.11,0),c);u.position.set((h-1)*.16,.08,h%2*.1),u.castShadow=!0,a.add(u)}}else t==="bottle"?(a=uo(),a.scale.setScalar(1.3)):t==="camera"?(a=Uc(),a.scale.setScalar(1.3)):(a=new dt(new Pe(.28,.28,.06,20),new Kt({color:15779658,emissive:6966784,emissiveIntensity:.6,metalness:.6,roughness:.3})),a.rotation.x=Math.PI/2,a.castShadow=!0);const o=new ee;o.add(a),o.position.set(e,i,n),this.group.add(o);const l={kind:t,pos:o.position,mesh:o,taken:!1,platform:r,local:null};return r&&(l.local=r.toLocal(e,n)),this.pickups.push(l),l}static ez(t){return t.d/2*Math.abs(Math.cos(t.yaw||0))+t.w/2*Math.abs(Math.sin(t.yaw||0))}static fp(t){return t.pos?{x:t.pos.x,z:t.pos.z,w:t.w,d:t.d,yaw:t.yaw}:t}chain(t,e,n,i){const r=[];let a=he.fp(t);for(let o=0;o<e;o++){const l=n(o,a),c=l.yaw||0,h=l.d/2*Math.abs(Math.cos(c))+l.w/2*Math.abs(Math.sin(c)),u=a.z+he.ez(a)+l.gap+h,d=Math.max(0,a.w/2+l.w/2-1.8),p=Math.max(-d,Math.min(d,l.lateral||0));let g=a.x+p;g=Math.max(-26,Math.min(26,g));const v=this.addPlatform({x:g,z:u,w:l.w,d:l.d,yaw:c,kind:l.kind||"static",room:i,...l.opts||{}});r.push(v),a={x:g,z:u,w:l.w,d:l.d,yaw:c}}return r}scatterPillars(t,e,n,i=3,r=5,a=[-32,32]){let o=0,l=0;for(;o<n&&l<n*20;){l++;const c=this.rng.range(a[0],a[1]),h=this.rng.range(t+6,e-6),u=this.rng.range(i,r);this.addPillar(c,h,u)&&o++}}scatterPickups(t,e,n){const r=[...t.filter(a=>a.kind!=="solid"&&a.kind!=="floor"&&a.kind!=="memory")].sort(()=>this.rng()-.5);for(let a=0;a<e&&a<r.length;a++){const o=r[a],l={x:this.rng.range(-o.w/2+.6,o.w/2-.6),z:this.rng.range(-o.d/2+.6,o.d/2-.6)},c=o.toWorld(l.x,l.z);this.addPickup("pebble",c.x,c.z,o.top(),o)}for(let a=0;a<0&&a+e<r.length;a++){const o=r[a+e],l={x:this.rng.range(-o.w/2+.6,o.w/2-.6),z:this.rng.range(-o.d/2+.6,o.d/2-.6)},c=o.toWorld(l.x,l.z);this.addPickup("coin",c.x,c.z,o.top()+.45,o)}}_build(){this.rng,this.diff;let t=0;this._buildStartHall(-34,0),this.startPos=new T(0,bt.platformTop,-29),this._buildTunnel(0,0,"start"),t=wn;const e=[this._pillarHall,this._brokenWalkway,this._sinking,this._rotating,this._moving,this._drifting,this._memoryBridge,this._crushing,this._lockedExit];for(let a=0;a<e.length;a++){const o=u0[a],l={idx:a,id:o.id,title:o.title,rule:o.rule,z0:t,z1:0,entry:new T(0,bt.platformTop,t+3),platforms:[]},c=this.platforms.length,h=e[a].call(this,t,l);l.z1=t+h,l.platforms=this.platforms.slice(c).filter(u=>u.kind!=="solid"),this.rooms.push(l),t=l.z1,a<e.length-1&&(this._buildTunnel(t,a+1,"between"),t+=wn)}this.endZ=t;const n=this.endZ+40,i=this.endZ/2-17;this.addWallPlane(n,40,new T(-ri/2,14,i),Math.PI/2),this.addWallPlane(n,40,new T(ri/2,14,i),-Math.PI/2),this.addPlatform({x:-ri/2-.5,z:i,w:1,d:n,h:40,y:14,kind:"solid"}).mesh.visible=!1,this.addPlatform({x:ri/2+.5,z:i,w:1,d:n,h:40,y:14,kind:"solid"}).mesh.visible=!1,this.addWallPlane(ri,40,new T(0,14,this.endZ+2),Math.PI),this.addPlatform({x:0,z:this.endZ+2.5,w:ri,d:1,h:40,y:14,kind:"solid"}).mesh.visible=!1;const r=new ln(ri+60,n+60,1,1);r.rotateX(-Math.PI/2),this.water=new dt(r,this.mats.water),this.water.position.set(0,bt.waterY,i),this.water.receiveShadow=!0,this.group.add(this.water)}_buildStartHall(t,e){const i=e-t,r=(t+e)/2;this.addPlatform({x:0,z:r,w:26,d:i,h:.5,kind:"floor"}),this.addWallPlane(26,12,new T(0,6,t),0),this.addPlatform({x:0,z:t-.5,w:26,d:1,h:12,y:6,kind:"solid"}).mesh.visible=!1,this.addWallPlane(i,12,new T(-26/2,6,r),Math.PI/2),this.addWallPlane(i,12,new T(26/2,6,r),-Math.PI/2),this.addPlatform({x:-26/2-.5,z:r,w:1,d:i,h:12,y:6,kind:"solid"}).mesh.visible=!1,this.addPlatform({x:26/2+.5,z:r,w:1,d:i,h:12,y:6,kind:"solid"}).mesh.visible=!1;const a=new dt(Pl(26,i),this.mats.wall);a.rotation.x=Math.PI/2,a.position.set(0,12,r),this.group.add(a),["EQUIPMENT","UPGRADES","SHOP"].forEach((l,c)=>{const h=(c-1)*6,u=t+12,d=this.addPlatform({x:h,z:u,w:2.4,d:1.2,h:1,y:bt.platformTop+.5,kind:"solid"});d.mesh.material=this.mats.platform;const p=new dt(new Ce(3,.12,1.8),new Kt({color:c===1?5147226:13214282,roughness:.8}));p.position.set(h,3,u),p.castShadow=!0,this.group.add(p);for(const v of[-1,1]){const m=new dt(new Pe(.05,.05,2.8,8),this.mats.frame);m.position.set(h+v*1.4,1.65,u+.7),this.group.add(m)}const g=this.addDecal(rs(l,{size:120,color:"rgba(40,28,16,0.95)"}),3,.75,new T(h,3.4,u+.95),0,0,1);g.material.polygonOffset=!1}),this.addDecal(rs("DON'T SPLASH. IT KNOWS.",{size:96}),10,2.5,new T(0,6.5,t+.1),0),this.addDecal(rs("PEBBLES. BOTTLE. CAMERA. OUT THERE.",{size:72}),11,2,new T(-26/2+.1,3.5,t+14),Math.PI/2),this.addDecal(rs("STAY ON THE TILES",{size:100}),8,2,new T(26/2-.1,3.5,t+20),-Math.PI/2),this.floorArrow(0,t+20,0,bt.platformTop+.01),this.floorArrow(0,t+26,0,bt.platformTop+.01),this.floorArrow(0,e-3,0,bt.platformTop+.01)}_buildTunnel(t,e,n){const i=t+wn/2,r=this.addPlatform({x:0,z:i,w:Gn+.6,d:wn,h:.5,kind:"floor"});for(const h of[-1,1]){const u=this.addPlatform({x:h*(Gn/2+.3),z:i,w:.6,d:wn,h:4.2,y:2.1,kind:"solid"});u.mesh.castShadow=!0;const d=Dl[this.rng.int(0,Dl.length-1)];this.addDecal(rs(d,{size:100}),5,1.25,new T(h*(Gn/2-.02),2.2,i+this.rng.range(-3,3)),h>0?-Math.PI/2:Math.PI/2);const p=10;for(const g of[t,t+wn]){const v=g===t?Math.PI:0;this.addWallPlane(p,9,new T(h*(Gn/2+.6+p/2),4.5,g+(g===t?-.01:.01)),v)}}for(const h of[t,t+wn]){const u=h===t?Math.PI:0;this.addWallPlane(Gn+1.2,5,new T(0,6.5,h+(h===t?-.01:.01)),u),this.addPlatform({x:0,z:h,w:Gn+21,d:.3,h:5,y:6.5,kind:"solid"}).mesh.visible=!1;for(const d of[-1,1])this.addPlatform({x:d*(Gn/2+.6+5),z:h,w:10,d:.3,h:9,y:4.5,kind:"solid"}).mesh.visible=!1}const a=new dt(w0(Gn/2+.3,wn),this.mats.wall);a.material=this.mats.wallInside,a.position.set(0,4,i),this.group.add(a);const o=new dt(new nn(.35,12,8),new an({color:16774358}));o.position.set(0,6.4,i),this.group.add(o);const l=new Al(16771512,12,18,1.6);l.position.set(0,5.8,i),this.group.add(l),this.floorArrow(0,i-3,0,r.top()+.01),this.floorArrow(0,i+3,0,r.top()+.01);const c={z0:t,z1:t+wn,checkpoint:new T(0,r.top(),i),roomIdx:e,kind:n,triggered:!1};return this.tunnels.push(c),c}entrySlab(t,e=8,n=6,i){const r=this.addPlatform({x:0,z:t+n/2,w:e,d:n,room:i});return this.floorArrow(0,t+n/2+.5,0,r.top()+.01),r}exitSlab(t,e=8,n=6,i){const r=this.addPlatform({x:0,z:t-n/2,w:e,d:n,room:i});return this.floorArrow(0,t-n/2-.5,0,r.top()+.01),r}finishRoom(t,e,n,i=8,r=2.2){const a=he.fp(e);let o=t;for(const p of this.platforms){if(p.room!==n||!p.walkable||p.decoy)continue;const g=p.kind==="moving"&&Math.abs(p.axis.z)>.5?p.amp:0;o=Math.max(o,p.pos.z+he.ez(p)+g)}const l=o+r;let c=a.x,h=a.z+he.ez(a);for(let p=0;p<6;p++){const g=l-h,v=Math.abs(c)>3;if(g<=r+.3&&!v)break;const m=Math.max(3,Math.min(6,g-r)),f=v&&Math.abs(c)>8?c-Math.sign(c)*8:0,_=Math.abs(c-f)+6;this.addPlatform({x:(c+f)/2,z:h+r+m/2,w:_,d:m,room:n,connector:!0}),h+=r+m,c=f}const u=Math.max(l,h+r),d=this.addPlatform({x:0,z:u+3,w:i,d:6,room:n});return this.floorArrow(0,u+2.5,0,d.top()+.01),this.pruneDecoys(n),u+6-t}pruneDecoys(t){for(let e=this.platforms.length-1;e>=0;e--){const n=this.platforms[e];if(n.room!==t||!n.decoy)continue;this.platforms.some(r=>r!==n&&r.room===t&&r.walkable&&Math.abs(r.top()-n.top())<.02&&he.overlap(r,n))&&(this.group.remove(n.mesh),this.platforms.splice(e,1))}}static overlap(t,e){const n=he.fp(t),i=he.fp(e),r=l=>{const c=Math.cos(l.yaw||0),h=Math.sin(l.yaw||0),u=l.w/2,d=l.d/2;return[[u,d],[-u,d],[-u,-d],[u,-d]].map(([p,g])=>[l.x+p*c+g*h,l.z-p*h+g*c])},a=r(n),o=r(i);for(const l of[n,i])for(const c of[[Math.cos(l.yaw||0),-Math.sin(l.yaw||0)],[Math.sin(l.yaw||0),Math.cos(l.yaw||0)]]){const h=a.map(d=>d[0]*c[0]+d[1]*c[1]),u=o.map(d=>d[0]*c[0]+d[1]*c[1]);if(Math.max(...h)<=Math.min(...u)+.05||Math.max(...u)<=Math.min(...h)+.05)return!1}return!0}bridgeToExit(t,e,n,i=2){const r=he.fp(t),a=he.fp(e),o=a.z-he.ez(a)-(r.z+he.ez(r));if(o>i+.5){const l=Math.max(3,o-i*2);this.addPlatform({x:r.x*.5,z:r.z+he.ez(r)+i+l/2,w:Math.max(4,Math.min(6,a.w)),d:l,room:n})}}_pillarHall(t,e){const n=this.rng,i=this.diff,r=this.entrySlab(t,8,6,e.idx),a=i.key==="easy"?9:i.key==="normal"?8:7,o=this.chain(r,a,u=>{const d=u%2===0,p=d?n.range(4,8)*i.platformScale:6*i.platformScale,g=d?n.range(9,14)*1:6*i.platformScale;return{w:p,d:g,gap:n.range(1.5,2.5)*i.gapScale,lateral:n.range(-2.5,2.5),yaw:n.range(-.25,.25)}},e.idx);for(let u=0;u<6;u++){const d=n.pick(o.slice(0,-2)).pos;this.addPlatform({x:d.x+n.sign()*n.range(7,12),z:d.z+n.range(-6,6),w:n.range(4,7),d:n.range(4,9),yaw:n.range(-.4,.4),room:e.idx,decoy:!0})}const l=this.finishRoom(t,o[o.length-1],e.idx,8);this.scatterPillars(t,t+l,12,3,5),this.addPickup("pebble",1.6,r.pos.z+1.2,r.top(),r);const c=o[1],h=c.toWorld(0,0);return this.addPickup("pebble",h.x,h.z,c.top(),c),this.scatterPickups(o.slice(2),i.key==="easy"?2:1,4),l}_brokenWalkway(t,e){const n=this.rng,i=this.diff,r=this.entrySlab(t,14,6,e.idx),a=this.addPlatform({x:0,z:r.pos.z+3+2+3,w:16,d:6,room:e.idx});this.floorArrow(-5,a.pos.z+1,0,a.top()+.01),this.floorArrow(5,a.pos.z+1,0,a.top()+.01);const o=Math.min(6.1,5.6*i.gapScale),l={x:-5,z:a.pos.z,w:16,d:6,yaw:0},c=this.chain(l,9,f=>({w:n.range(1,1.5),d:n.range(4.5,7),gap:n.range(2,3)*Math.min(i.gapScale,1.1),lateral:f===0?-5:n.range(-1,1)}),e.idx),h={x:5,z:a.pos.z,w:16,d:6,yaw:0},u=this.chain(h,6,f=>({w:n.range(5,6),d:n.range(6.5,9),gap:f===0?2.5:o,lateral:f===0?5:n.range(-.8,.8)}),e.idx),d=he.fp(c[c.length-1]),p=he.fp(u[u.length-1]),g=Math.max(d.z+he.ez(d),p.z+he.ez(p))+2.4+3,v=this.addPlatform({x:0,z:g,w:16,d:6,room:e.idx});this.addPickup("bottle",0,g,v.top(),v);const m=this.finishRoom(t,v,e.idx,16);return this.scatterPillars(t,t+m,8,3,5,[-34,34]),this.scatterPickups([...u,...c],1,4),m}_sinking(t,e){const n=this.rng,i=this.diff,r=this.entrySlab(t,8,6,e.idx),a=i.key==="easy"?12:10,o=this.chain(r,a,c=>{const h=(c+1)%i.safeEvery===0,u=n.range(3,5)*(h?1:i.platformScale);return{w:u,d:u*n.range(.9,1.3),gap:n.range(2,3)*i.gapScale,lateral:n.range(-2,2),yaw:n.range(-.15,.15),kind:"sinking",opts:{framed:h,sinkTime:i.sinkTime,riseTime:i.riseTime}}},e.idx);for(let c=0;c<4;c++){const h=n.pick(o.slice(0,-2)).pos;this.addPlatform({x:h.x+n.sign()*n.range(6,10),z:h.z+n.range(-5,5),w:n.range(3,5),d:n.range(3,5),kind:"sinking",room:e.idx,sinkTime:i.sinkTime,riseTime:i.riseTime,decoy:!0})}const l=this.finishRoom(t,o[o.length-1],e.idx,8);return this.scatterPillars(t,t+l,8,3,5,[-34,34]),this.scatterPickups(o.filter(c=>c.framed),1,3),l}_rotating(t,e){const n=this.rng,i=this.diff,r=this.entrySlab(t,8,6,e.idx);let a=he.fp(r);const o=i.key==="easy"?16:18,l=[];for(let h=0;h<i.bridgeCount;h++){const u=a.z+a.d/2+1.6+o/2,d=n()<.35?-1:1,p=i.key==="hard"?2.2:2.8;this.addPlatform({x:a.x,z:u,w:p,d:o,kind:"rotating",period:i.bridgePeriod+n.range(-1,1),dir:d,yaw:n.range(0,Math.PI),room:e.idx});const g=u+o/2+1.6+3,v=this.addPlatform({x:a.x+n.range(-1.5,1.5),z:g,w:6,d:6,room:e.idx});l.push(v),a=he.fp(v)}const c=this.finishRoom(t,a,e.idx,8);return this.scatterPillars(t,t+c,7,3,5,[-34,-14]),this.scatterPillars(t,t+c,7,3,5,[14,34]),this.scatterPickups(l,1,3),c}_moving(t,e){const n=this.rng,i=this.diff,r=this.entrySlab(t,8,6,e.idx);let a=0;const o=i.key==="easy"?11:10,l=this.chain(r,o,h=>{const u=n()<.65,d=u?n.range(i.moveAmp[0],i.moveAmp[1]):n.range(1.2,1.7),p=n.range(i.movePeriod[0],i.movePeriod[1]),g=n.range(4,5.5)*i.platformScale,v=n.range(4,6),m=u?2.4*i.gapScale:2+a+d;a=u?0:d;const f=i.mixRules&&n()<.3;return{w:g,d:v,gap:m,lateral:0,kind:"moving",opts:{axis:u?new T(1,0,0):new T(0,0,1),amp:d,period:p,phase:n.range(0,Math.PI*2),mixSink:f,sinkTime:i.sinkTime,riseTime:i.riseTime}}},e.idx),c=this.finishRoom(t,l[l.length-1],e.idx,8,2.5);return this.scatterPillars(t,t+c,10,3,5,[-34,34]),this.scatterPickups(l,1,3),c}_drifting(t,e){const n=this.rng,i=this.diff,r=this.entrySlab(t,8,6,e.idx),a=[new et(1,0),new et(-1,0),new et(0,-1)],o=i.key==="easy"?8:9,l=this.chain(r,o,u=>({w:n.range(5,6.5),d:n.range(8,12)*i.platformScale,gap:n.range(2,3)*i.gapScale,lateral:n.range(-1.5,1.5),kind:"conveyor",opts:{convDir:n.pick(a).clone(),convSpeed:bt.walkSpeed*i.conveyorFrac}}),e.idx),c=this.finishRoom(t,l[l.length-1],e.idx,8,2.5),h=this.platforms[this.platforms.length-1];return this.addPickup("bottle",-2,h.pos.z,h.top(),h),this.scatterPillars(t,t+c,9,3,5,[-34,34]),this.scatterPickups(l,1,3),c}_memoryBridge(t,e){const n=this.rng,i=this.diff,r=i.memoryRows,a=4,o=3,l=3.35,c=this.addPlatform({x:0,z:t+5,w:14,d:9.6,room:e.idx});this.floorArrow(0,t+5,0,c.top()+.01);const h=c.pos.z+4.8+.6+o/2;let u=n.int(1,2);const d=[];for(let m=0;m<r;m++){const f=[];for(let _=0;_<a;_++){const S=(_-(a-1)/2)*l,x=h+m*l,L=this.addPlatform({x:S,z:x,w:o,d:o,kind:"memory",safe:_===u,room:e.idx});f.push(L)}d.push(f),u=Math.max(0,Math.min(a-1,u+n.int(-1,1)))}const p=h+(r-1)*l+o/2,g=this.addPlatform({x:0,z:p+.6+4,w:14,d:8,room:e.idx});this.floorArrow(0,g.pos.z,0,g.top()+.01);const v=g.pos.z+4+.4-t;return this.memory={tiles:d,rows:r,cols:a,entry:c,exit:g,state:"idle",timer:0,total:i.memoryTime,lastTick:0,shownOnce:!1,zone:{x0:-7,x1:7,z0:c.pos.z-4.8,z1:c.pos.z+4.8},cooldown:0,dingIdx:0,dingTimer:0},this.scatterPillars(t,t+v,8,3,5,[-34,-12]),this.scatterPillars(t,t+v,8,3,5,[12,34]),v}_crushing(t,e){const n=this.rng,i=this.diff,r=i.lanes,a=7,o=5,l=r*a,c=this.addPlatform({x:0,z:t+3.2,w:l,d:6,room:e.idx}),h=[],u=[];for(let _=0;_<r;_++){const S=(_-(r-1)/2)*a;h.push(S),this.floorArrow(S,c.pos.z+1,0,c.top()+.01);const x={x:S,z:c.pos.z,w:o,d:6,yaw:0},L=this.chain(x,8,(A,b)=>({w:o,d:n.range(4.5,6.5),gap:n.range(1.5,2.4),lateral:0}),e.idx);u.push(L)}const d=Math.max(...u.map(_=>{const S=_[_.length-1];return S.pos.z+S.d/2})),p=this.addPlatform({x:0,z:d+2.2+3,w:l,d:6,room:e.idx});this.floorArrow(0,p.pos.z,0,p.top()+.01);const g=p.pos.z+3+.4-t,v=c.pos.z+3.2,m=p.pos.z-3.2,f=[];return this.crushing={laneX:h,n:r,pitch:a,z0:v,z1:m,walls:f,timer:i.wallInterval*.6,interval:i.wallInterval,speed:i.wallSpeed*bt.sprintSpeed,active:!1,group:new ee,openLane:-1},this.group.add(this.crushing.group),this.scatterPillars(t,t+g,6,3,4.5,[-34,-l/2-5]),this.scatterPillars(t,t+g,6,3,4.5,[l/2+5,34]),this.scatterPickups(u.flat(),1,4),g}_lockedExit(t,e){const n=this.rng,i=this.diff,r=this.entrySlab(t,10,6,e.idx);this.addPickup("camera",0,r.pos.z+2.2,r.top(),r);const a=this.chain(r,9,I=>({w:n.range(4,7),d:n.range(5,9),gap:n.range(1.5,2.5)*i.gapScale,lateral:n.range(-4,4),yaw:n.range(-.3,.3)}),e.idx),o=[];for(let I=0;I<4;I++){const k=a[2+I*2],V=n.sign();let W=he.fp(k);for(let Y=0;Y<3;Y++){const G=n.range(4,6),nt=n.range(4,6),ht=W.x+V*(W.w/2+2+G/2),vt=W.z+n.range(-2,2),Pt=this.addPlatform({x:Math.max(-30,Math.min(30,ht)),z:vt,w:G,d:nt,yaw:n.range(-.2,.2),room:e.idx});o.push(Pt),W={x:Pt.pos.x,z:vt,w:G,d:nt,yaw:Pt.yaw}}}const l=30,c=he.fp(a[a.length-1]),h=c.z+he.ez(c)+2+3;let d=this.addPlatform({x:c.x,z:h,w:6,d:6,room:e.idx}).pos.x,p=3,g=h;const v=[],m=l-1.6;for(let I=0;I<12;I++){const k=n.range(3.5,5),V=d+p+2+k/2;if(V+k/2>m-2.2)break;d=V,g+=n.range(-1,1),p=k/2,v.push(this.addPlatform({x:d,z:g,w:k,d:n.range(3.5,5),room:e.idx}))}const f=g-3,_=f+44,S=_+4.4-t,x=this.addPlatform({x:l,z:(f+_)/2,w:3.2,d:_-f,kind:"floor",room:e.idx});x.mesh.material=this.mats.platform,this.floorArrow(l,f+4,0,x.top()+.01),this.floorArrow(l,(f+_)/2,0,x.top()+.01);const L=_+.2;this.addWallPlane(10,9,new T(l,4.5,L),Math.PI),this.addPlatform({x:l,z:L+.4,w:10,d:.8,h:9,y:4.5,kind:"solid"}).mesh.visible=!1;const A=new dt(new Ce(2.2,3.2,.2),new Kt({color:16052710,roughness:.6}));A.position.set(l,bt.platformTop+1.6,L-.12),A.castShadow=!0,this.group.add(A);const b=new dt(new Ce(2.8,3.6,.3),new Kt({color:9407092,roughness:.8}));b.position.set(l,bt.platformTop+1.75,L-.02),this.group.add(b);const R=new dt(new nn(.22,12,8),new an({color:8257434}));R.position.set(l,bt.platformTop+4,L-.4),this.group.add(R);const M=new Ec(new io({map:this.textures.particle,color:8257434,transparent:!0,opacity:.55,depthWrite:!1,fog:!0}));M.scale.set(3.2,3.2,1),M.position.copy(R.position),this.group.add(M);const y=new Al(8257434,10,14,1.5);y.position.copy(R.position),this.group.add(y);const P=new dt(new ln(.5,.62),new an({map:Cl(this.code,this.found)}));P.position.set(l+1.9,bt.platformTop+1.5,L-.35),P.rotation.y=Math.PI,this.group.add(P),this.door={pos:new T(l,bt.platformTop,L-1.2),mesh:A,lamp:R,halo:M,keypad:P,open:!1,openT:0},this.scatterPillars(t,t+S-8,12,3.5,5,[-34,24]);const F=this.pillars.filter(I=>I.z>t&&I.z<t+S).sort(()=>n()-.5);for(let I=0;I<4&&I<F.length;I++){const k=F[I];let V=a[0],W=1/0;for(const jt of[...a,...o,...v]){const q=Math.hypot(jt.pos.x-k.x,jt.pos.z-k.z);q<W&&(W=q,V=jt)}const Y=Math.atan2(V.pos.x-k.x,V.pos.z-k.z),G=Math.sin(Y),nt=Math.cos(Y),ht=new T(k.x+G*(k.r+.06),4.2,k.z+nt*(k.r+.06)),vt=x0(this.code[I],I),Pt=this.addDecal(vt,2.6,3.9,ht,Y,0,1);Pt.material.polygonOffset=!1,this.digits.push({digit:this.code[I],slot:I,pos:ht,normal:new T(G,0,nt),pillar:k,found:!1,mesh:Pt})}return this.scatterPickups([...a,...o],1,5),S}prePlayers(t){this.time+=t;for(const e of this.platforms)e.dynamic&&e.update(t,this.time);this.mats.chevron.map&&(this.mats.chevron.map.offset.y-=t*.9);for(const e of this.pickups)if(!e.taken&&(e.mesh.rotation.y+=t*(e.kind==="coin"?2.5:.6),e.platform)){const n=e.platform.toWorld(e.local.x,e.local.z);e.mesh.position.set(n.x,e.platform.top()+(e.kind==="coin"?.45:0),n.z)}if(this.door&&this.door.open){this.door.openT=Math.min(1,this.door.openT+t);const e=this.door.openT*1.9;this.door.mesh.rotation.y=-e,this.door.mesh.position.x=this.door.pos.x-1.1+Math.cos(e)*1.1,this.door.mesh.position.z=this.door.pos.z+1.08-Math.sin(e)*1.1}}postPlayers(t,e,n){this._updateMemory(t,e,n),this._updateCrushing(t,e,n);for(const i of this.platforms)i.dynamic||(i.standing=0)}_updateMemory(t,e,n){const i=this.memory;if(!i)return;i.cooldown=Math.max(0,i.cooldown-t);const r=e.some(o=>!o.down&&o.pos.x>i.zone.x0&&o.pos.x<i.zone.x1&&o.pos.z>i.zone.z0&&o.pos.z<i.zone.z1&&o.grounded),a=e.some(o=>o.groundPlatform&&o.groundPlatform.kind==="memory");if(i.state==="idle"&&r&&i.cooldown<=0&&!a&&(i.state="show",i.total=i.shownOnce?Math.max(3.5,this.diff.memoryTime*.6):this.diff.memoryTime,i.timer=i.total,i.lastTick=Math.ceil(i.total),i.dingIdx=0,i.dingTimer=0,this.events.push({type:"memoryStart",total:i.total}),n&&n.memoryStart()),i.state==="show"){if(i.timer-=t,i.dingTimer-=t,i.dingIdx<i.rows&&i.dingTimer<=0){const l=i.tiles[i.dingIdx];for(const c of l)c.safe&&(c.glow=!0,c.mesh.material=this.mats.platformGlow);n&&n.ding(i.dingIdx),i.dingIdx++,i.dingTimer=Math.min(.35,i.total*.35/i.rows)}const o=Math.ceil(i.timer);if(o<i.lastTick&&(i.lastTick=o,n&&o>0&&n.tick(o%2===0),this.events.push({type:"memoryTick",sec:o})),i.timer<=0){i.state="play",i.shownOnce=!0,i.cooldown=4;for(const l of i.tiles)for(const c of l)c.glow=!1,c.mesh.material=this.mats.platformMemory;this.events.push({type:"memoryEnd"})}}if(i.state==="play"){for(const o of i.tiles)for(const l of o)!l.safe&&!l.collapsed&&l.standing>0&&(l.collapsed=!0,l.collapseT=0,n&&n.collapse(l.pos),this.events.push({type:"collapse",pos:l.pos.clone()}));r&&!a&&i.cooldown<=0&&(i.state="idle")}}_updateCrushing(t,e,n){const i=this.crushing;if(!i)return;if(!e.some(a=>a.pos.z>i.z0-10&&a.pos.z<i.z1+10)&&!i.active){i.timer=Math.min(i.timer,i.interval*.6);return}if(i.timer-=t,!i.active&&i.timer<=0){i.active=!0;const a=this.rng.int(0,i.n-1);i.openLane=a,i.walls.length=0,i.group.clear();const o=10,l=i.z1-i.z0,c=(d,p)=>{if(!d.length)return;const g=i.laneX[d[0]]-i.pitch/2,v=i.laneX[d[d.length-1]]+i.pitch/2,m=v-g,f=(g+v)/2,_=new dt(new Ce(m,o,l),this.mats.redWall);_.position.set(f-p*(m+4),o/2-1,(i.z0+i.z1)/2),i.group.add(_),i.walls.push({mesh:_,W:m,H:o,D:l,finalX:f,dir:p,x:f-p*(m+4),state:"in",hold:0})},h=[],u=[];for(let d=0;d<i.n;d++)d<a?h.push(d):d>a&&u.push(d);c(h,1),c(u,-1),this.events.push({type:"wave",open:a})}if(i.active){let a=!0;for(const o of i.walls){if(o.state==="in")o.x+=o.dir*i.speed*t,(o.dir>0&&o.x>=o.finalX||o.dir<0&&o.x<=o.finalX)&&(o.x=o.finalX,o.state="hold",o.hold=1.6),a=!1;else if(o.state==="hold")o.hold-=t,o.hold<=0&&(o.state="out"),a=!1;else if(o.state==="out"){o.x-=o.dir*i.speed*1.4*t;const l=o.finalX-o.dir*(o.W+4);o.dir>0&&o.x<=l||o.dir<0&&o.x>=l?o.state="done":a=!1}o.mesh.position.x=o.x}a&&(i.active=!1,i.timer=i.interval,i.group.clear(),i.walls.length=0)}}wallQuery(t){const e=this.crushing,n={inside:!1,pushX:0,proximity:0};if(!e||!e.active||t.z<e.z0-2||t.z>e.z1+2)return n;for(const i of e.walls){if(i.state==="done")continue;const r=i.W/2,a=t.x-i.x;if(Math.abs(a)<=r)n.inside=!0,n.pushX=(i.state==="out"?-i.dir:i.dir)*e.speed;else{const o=Math.abs(a)-r;i.state==="in"&&Math.sign(a)===Math.sign(i.dir)&&(n.proximity=Math.max(n.proximity,Math.max(0,1-o/12)))}}return n}roomAt(t){for(const e of this.rooms)if(t>=e.z0-.5&&t<e.z1+.5)return e;return null}markFound(t){this.found[t]=!0;const e=this.digits.find(n=>n.slot===t);e&&(e.found=!0),this.door.keypad.material.map.dispose(),this.door.keypad.material.map=Cl(this.code,this.found),this.door.keypad.material.needsUpdate=!0}codeComplete(){return this.found.every(Boolean)}dispose(){this.scene.remove(this.group),this.group.traverse(t=>{t.geometry&&t.geometry.dispose(),t.material&&t.material.map&&t.userData.ownMap&&t.material.map.dispose()})}}function uo(){const s=new ee,t=new Kt({color:4164175,roughness:.25,metalness:.1,transparent:!0,opacity:.9}),e=new dt(new Pe(.09,.1,.36,12),t);e.position.y=.18;const n=new dt(new Pe(.035,.06,.16,12),t);n.position.y=.43;const i=new dt(new Pe(.04,.04,.04,12),new Kt({color:2894892}));return i.position.y=.52,e.castShadow=n.castShadow=!0,s.add(e,n,i),s}function Uc(){const s=new ee,t=new Kt({color:15854034,roughness:.5}),e=new dt(new Ce(.34,.22,.2),t);e.position.y=.11;const n=new dt(new Pe(.06,.07,.06,16),new Kt({color:1776411,roughness:.3}));n.rotation.x=Math.PI/2,n.position.set(0,.12,.12);const i=new dt(new Pe(.025,.025,.03,10),new Kt({color:14036526,emissive:4849664}));i.position.set(.12,.23,0);const r=new dt(new Ce(.28,.02,.04),new Kt({color:819}));return r.position.set(0,.03,.11),e.castShadow=!0,s.add(e,n,i,r),s}function Nc(){const s=new dt(new or(.09,0),new Kt({color:8224120,roughness:.9}));return s.castShadow=!0,s}const as=new T;function Ke(s,t,e,n,i,r){const a=2*Math.PI*i/4,o=Math.max(r-2*i,0),l=Math.PI/4;as.copy(t),as[n]=0,as.normalize();const c=.5*a/(a+o),h=1-as.angleTo(s)/l;return Math.sign(as[e])===1?h*c:o/(a+o)+c+c*(1-h)}class C0 extends Ce{constructor(t=1,e=1,n=1,i=2,r=.1){if(i=i*2+1,r=Math.min(t/2,e/2,n/2,r),super(1,1,1,i,i,i),i===1)return;const a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;const o=new T,l=new T,c=new T(t,e,n).divideScalar(2).subScalar(r),h=this.attributes.position.array,u=this.attributes.normal.array,d=this.attributes.uv.array,p=h.length/6,g=new T,v=.5/i;for(let m=0,f=0;m<h.length;m+=3,f+=2)switch(o.fromArray(h,m),l.copy(o),l.x-=Math.sign(l.x)*v,l.y-=Math.sign(l.y)*v,l.z-=Math.sign(l.z)*v,l.normalize(),h[m+0]=c.x*Math.sign(o.x)+l.x*r,h[m+1]=c.y*Math.sign(o.y)+l.y*r,h[m+2]=c.z*Math.sign(o.z)+l.z*r,u[m+0]=l.x,u[m+1]=l.y,u[m+2]=l.z,Math.floor(m/p)){case 0:g.set(1,0,0),d[f+0]=Ke(g,l,"z","y",r,n),d[f+1]=1-Ke(g,l,"y","z",r,e);break;case 1:g.set(-1,0,0),d[f+0]=1-Ke(g,l,"z","y",r,n),d[f+1]=1-Ke(g,l,"y","z",r,e);break;case 2:g.set(0,1,0),d[f+0]=1-Ke(g,l,"x","z",r,t),d[f+1]=Ke(g,l,"z","x",r,n);break;case 3:g.set(0,-1,0),d[f+0]=1-Ke(g,l,"x","z",r,t),d[f+1]=1-Ke(g,l,"z","x",r,n);break;case 4:g.set(0,0,1),d[f+0]=1-Ke(g,l,"x","y",r,t),d[f+1]=1-Ke(g,l,"y","x",r,e);break;case 5:g.set(0,0,-1),d[f+0]=Ke(g,l,"x","y",r,t),d[f+1]=1-Ke(g,l,"y","x",r,e);break}}}const gt=.32,Il=[{shirt:"#2a5fd8",print:"#0c1533",tag:"#2fa6ff",tagDark:"#1458a8"},{shirt:"#d8382b",print:"#3a0b08",tag:"#ff4d3d",tagDark:"#a8241a"}];function fo(s){let t=s>>>0;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ds(s,t,e){const n=document.createElement("canvas");n.width=s,n.height=t,e(n.getContext("2d"),s,t);const i=new Un(n);return i.colorSpace=ve,i.anisotropy=4,i.userData.redraw=r=>{r(n.getContext("2d"),s,t),i.needsUpdate=!0},i}const Rn=(s,t,e,n,i)=>{s.beginPath(),s.ellipse(t,e,n,i,0,0,Math.PI*2),s.fill()},Ul=(s,t,e,n,i)=>{s.beginPath(),s.moveTo(t,e),s.lineTo(n,i),s.stroke()};function jr(s,t,e,n){s.fillStyle="#9edbff",s.strokeStyle="#2b86c9",s.lineWidth=n*.28,s.beginPath(),s.moveTo(t,e-n*2.1),s.bezierCurveTo(t+n*.35,e-n*1.25,t+n*1.05,e-n*.45,t+n,e+n*.15),s.arc(t,e+n*.15,n,0,Math.PI,!1),s.bezierCurveTo(t-n*1.05,e-n*.45,t-n*.35,e-n*1.25,t,e-n*2.1),s.fill(),s.stroke(),s.fillStyle="rgba(255,255,255,0.85)",Rn(s,t-n*.35,e-n*.1,n*.22,n*.34)}function P0(s,t){s.clearRect(0,0,t,t),s.fillStyle="#121212",Rn(s,t*.37,t*.42,t*.048,t*.085),Rn(s,t*.63,t*.42,t*.048,t*.085),s.strokeStyle="#121212",s.lineWidth=t*.04,s.lineCap="round",s.beginPath(),s.arc(t*.5,t*.5,t*.21,Math.PI*.22,Math.PI*.78),s.stroke()}function L0(s,t){s.clearRect(0,0,t,t),s.strokeStyle="#121212",s.lineCap="round",s.lineWidth=t*.036,Ul(s,t*.21,t*.27,t*.42,t*.19),Ul(s,t*.58,t*.19,t*.79,t*.27),s.fillStyle="#121212",Rn(s,t*.34,t*.42,t*.07,t*.112),Rn(s,t*.66,t*.42,t*.07,t*.112),s.fillStyle="#ffffff",Rn(s,t*.318,t*.382,t*.022,t*.032),Rn(s,t*.638,t*.382,t*.022,t*.032),s.fillStyle="#1b0909",s.beginPath(),s.ellipse(t*.5,t*.735,t*.155,t*.115,0,0,Math.PI*2),s.fill(),s.save(),s.clip(),s.fillStyle="#ffffff",s.fillRect(t*.3,t*.6,t*.4,t*.06),s.fillStyle="#e2525e",Rn(s,t*.5,t*.84,t*.11,t*.065),s.restore(),jr(s,t*.86,t*.3,t*.042),jr(s,t*.9,t*.54,t*.032),jr(s,t*.13,t*.36,t*.03)}function D0(s){return ds(128,256,(t,e,n)=>{t.fillStyle=s.shirt,t.fillRect(0,0,e,n);const i=fo(7);t.fillStyle=s.print;for(let r=0;r<30;r++){const a=e*.5+(i()-.5)*e*.95,o=n*.52+(i()-.5)*n*.55,l=2+i()*13;Rn(t,a,o,l,l*(.7+i()*.6))}for(let r=0;r<9;r++){const a=e*.5+(i()-.5)*e*.8,o=n*.45+i()*n*.2;t.fillRect(a,o,2+i()*3,10+i()*40)}})}function I0(){const s=ds(64,64,(t,e,n)=>{t.fillStyle="#2b2c33",t.fillRect(0,0,e,n);const i=fo(3);for(let r=0;r<700;r++)t.fillStyle=i()<.55?"rgba(0,0,0,0.38)":"rgba(255,255,255,0.07)",t.fillRect(i()*e,i()*n,1+i()*2,1+i()*2)});return s.wrapS=s.wrapT=di,s.repeat.set(1,2),s}function Nl(s,t,e,n,i,r){s.clearRect(0,0,t,e);const a=10,o=10,l=t-20,c=e-20,h=30;s.beginPath(),s.roundRect?s.roundRect(a,o,l,c,h):s.rect(a,o,l,c),s.fillStyle=i.tag,s.fill(),s.lineWidth=9,s.strokeStyle="#15213a",s.stroke(),s.fillStyle="rgba(0,0,0,0.18)",s.fillRect(a+6,o+c*.62,l-12,c*.3),s.font=`${Math.round(e*.56)}px ${r}`,s.textAlign="center",s.textBaseline="middle",s.lineJoin="round",s.lineWidth=10,s.strokeStyle="#15213a",s.strokeText(n,t/2,e/2+4),s.fillStyle="#ffffff",s.fillText(n,t/2,e/2+4)}class U0{constructor(t=0,e=""){const n=Il[t%Il.length];this.root=new ee,this.rig=new ee,this.root.add(this.rig),this.phase=0,this.t=Math.random()*10,this.scared=!1;const i=(R,M={})=>new Kt({color:R,roughness:.5,metalness:0,...M}),r=i(15987180,{roughness:.42,emissive:15987180,emissiveIntensity:.3}),a=i(1513502,{roughness:.6}),o=i(2895158,{roughness:.6}),l=[14837277,12733719,15960623].map(R=>i(R,{roughness:.48,emissive:R,emissiveIntensity:.14})),c=D0(n),h=i(16777215,{map:c,roughness:.65,emissive:16777215,emissiveMap:c,emissiveIntensity:.16}),u=i(16777215,{map:I0(),roughness:.85}),d=i(16119285,{roughness:.45,emissive:16119285,emissiveIntensity:.22}),p=(R,M,y,P,F=.035)=>{const I=new dt(new C0(R,M,y,2,Math.min(F,R/2-.002,M/2-.002,y/2-.002)),P);return I.castShadow=!0,I.receiveShadow=!0,I};this.legs=[-1,1].map(R=>{const M=new ee;M.position.set(R*.5*gt,2*gt,0);const y=p(.98*gt,1.56*gt,.98*gt,u,.03);y.position.y=-.78*gt;const P=p(1*gt,.44*gt,1.14*gt,d,.045);return P.position.set(0,-1.78*gt,-.07*gt),M.add(y,P),this.rig.add(M),M});const g=new ee;g.position.y=3*gt,g.add(p(2.02*gt,2*gt,1.02*gt,a,.05));const v=new dt(new ln(1*gt,1.92*gt),h);v.position.set(0,-.02*gt,-.516*gt),v.rotation.y=Math.PI,g.add(v);for(const R of[-1,1]){const M=p(.12*gt,1.92*gt,.06*gt,o,.02);M.position.set(R*.56*gt,-.02*gt,-.52*gt),g.add(M)}this.rig.add(g),this.torso=g,this.arms=[-1,1].map(R=>{const M=new ee;M.position.set(R*1.5*gt,3.5*gt,0);const y=p(.99*gt,.95*gt,.99*gt,a,.04);y.position.y=.025*gt;const P=p(.92*gt,1.12*gt,.92*gt,r,.05);return P.position.y=-.98*gt,M.add(y,P),this.rig.add(M),M});const m=new ee;m.position.y=4.66*gt,m.add(p(1.22*gt,1.2*gt,1.22*gt,r,.1)),this.faceTex={calm:ds(256,256,(R,M)=>P0(R,M)),scared:ds(256,256,(R,M)=>L0(R,M))},this.faceMat=new Kt({map:this.faceTex.calm,transparent:!0,roughness:.45,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2});const f=new dt(new ln(1.02*gt,1.02*gt),this.faceMat);f.position.set(0,-.04*gt,-.612*gt),f.rotation.y=Math.PI,m.add(f);const _=new ee,S=p(1.34*gt,.42*gt,1.34*gt,l[0],.1);S.position.y=.54*gt;const x=p(1.3*gt,.95*gt,.34*gt,l[1],.08);x.position.set(0,.14*gt,.52*gt),_.add(S,x);const L=new Ce(.21*gt,.75*gt,.15*gt);L.translate(0,-.375*gt,0);const A=fo(11+t),b=24;for(let R=0;R<b;R++){const M=R/b*Math.PI*2+.05,y=Math.sin(M),P=Math.cos(M),F=P<-.55,I=F?.3+A()*.14:.85+A()*.45,k=new dt(L,l[R%3]),V=.61*gt/Math.max(Math.abs(y),Math.abs(P));k.position.set(y*V,.6*gt,P*V),k.scale.set(1,I,1),k.rotation.order="YXZ",k.rotation.y=M,k.rotation.x=-((F?.8:.28)+A()*.3),k.rotation.z=(A()-.5)*.35,k.castShadow=!0,_.add(k)}for(let R=0;R<8;R++){const M=new dt(L,l[(R+1)%3]);M.position.set((A()-.5)*.95*gt,.68*gt,(A()-.35)*.95*gt),M.scale.set(1.15,.4+A()*.3,1.15),M.rotation.set(Math.PI+.7+A()*.5,0,(A()-.5)*.7),M.castShadow=!0,_.add(M)}if(m.add(_),this.rig.add(m),this.head=m,this.tag=null,e){const R=ds(256,112,(M,y,P)=>Nl(M,y,P,e,n,'"Arial Black", sans-serif'));document.fonts?.load('60px "Luckiest Guy"').then(()=>R.userData.redraw((M,y,P)=>Nl(M,y,P,e,n,'"Luckiest Guy", "Arial Black", sans-serif'))).catch(()=>{}),this.tag=new Ec(new io({map:R,depthTest:!1,depthWrite:!1,fog:!1,transparent:!0})),this.tag.center.set(.5,0),this.tag.position.y=5.95*gt,this.tag.renderOrder=20,this.tagBase=new et(.56,.245),this.tag.scale.set(this.tagBase.x,this.tagBase.y,1),this.root.add(this.tag)}}setScared(t){t!==this.scared&&(this.scared=t,this.faceMat.map=t?this.faceTex.scared:this.faceTex.calm,this.faceMat.needsUpdate=!0)}setTagDistance(t){if(!this.tag)return;const e=Math.max(1,Math.min(3.2,t/9));this.tag.scale.set(this.tagBase.x*e,this.tagBase.y*e,1)}update(t,e){this.t+=t;const n=this.t,i=Math.min(1,e.speed/3.5)*(e.sprint?1:.78);e.grounded&&!e.inWater&&(this.phase+=t*e.speed*1.9);let r=0,a=0,o=0,l=0,c=0,h=0,u=0,d=0,p=0;if(e.down)d=Math.PI/2-.08,u=.5*gt,o=l=.25,c=.9,r=.15,a=-.15,p=-.3;else if(e.inWater)o=1.45+Math.sin(n*7)*.65,l=1.45+Math.sin(n*7+Math.PI)*.65,c=.25,r=Math.sin(n*9)*.35,a=-r,h=-.2;else if(!e.grounded)e.vy<-2.5?(o=2.75+Math.sin(n*17)*.25,l=2.75+Math.sin(n*17+1.7)*.25,c=.35+Math.sin(n*13)*.15,r=.45,a=-.3,p=.15):(o=l=2.45,c=.18,r=.55,a=-.2);else{const v=Math.sin(this.phase);r=v*.85*i,a=-r,o=-v*.8*i,l=-o,h=e.sprint&&e.speed>3?-.14:0}e.action>0&&(l=Math.max(l,1.65*Math.min(1,e.action*1.4)));const g=16;this.legs[0].rotation.x=ge(this.legs[0].rotation.x,r,g,t),this.legs[1].rotation.x=ge(this.legs[1].rotation.x,a,g,t),this.arms[0].rotation.x=ge(this.arms[0].rotation.x,o,g,t),this.arms[1].rotation.x=ge(this.arms[1].rotation.x,l,g,t),this.arms[0].rotation.z=ge(this.arms[0].rotation.z,-c,g,t),this.arms[1].rotation.z=ge(this.arms[1].rotation.z,c,g,t),this.head.rotation.x=ge(this.head.rotation.x,p,10,t),this.rig.rotation.x=ge(this.rig.rotation.x,d||h,10,t),this.rig.position.y=ge(this.rig.position.y,u+(e.grounded&&!e.inWater&&!e.down?Math.abs(Math.sin(this.phase))*.035*i:0),14,t)}}const ue={x:0,z:0},bn={x:0,z:0},N0={x:0,z:0};class O0{constructor(t,e,n,{fov:i=78,name:r="P1"}={}){this.index=t,this.game=e,this.input=n,this.name=r,this.pos=new T(0,bt.platformTop,0),this.vel=new T,this.yaw=Math.PI,this.pitch=0,this.grounded=!1,this.groundPlatform=null,this.lastGroundVel=new T,this.coyote=0,this.inWater=!1,this.carry=null,this.swimNoiseTimer=0,this.stepDist=0,this.bobT=0,this.shake=0,this.thirdPerson=!1,this.items={pebbles:0,bottle:!1,camera:!1},this.slot=-1,this.pushCd=0,this.down=!1,this.bleed=0,this.bleedMax=20,this.frozen=!1,this.lookAt=null,this.autoLook=!1,this.yawVel=0,this.turnHold=0,this.turnTo=null,this.guide=null,this.guideBeam=null,this.jumpBuf=0,this.wet=0,this.wash=0,this.wetT=99,this.wetSeed=0,this.reviveProgress=0,this.redFlash=0,this.whiteFlash=0,this.vignette=0,this.inRed=!1,this.wallProximity=0,this.roomIdx=-1,this.useCooldown=0,this.throwAnim=0,this.fovKick=0,this.camera=new ke(i,1,.08,260),this.camera.rotation.order="YXZ",this.camera.layers.enable(0),this.camera.layers.enable(1+t),this.camera.layers.enable(3+(1-t)),e.scene.add(this.camera),this.viewmodel=new ee,this.viewmodel.position.set(.3,-.32,-.55),this.camera.add(this.viewmodel);const a=new Kt({color:15323046,roughness:.7}),o=new dt(new ar(.065,.55,4,10),a);o.rotation.x=Math.PI/2-.5,o.rotation.z=-.25,o.position.set(.08,-.12,.25),this.viewmodel.add(o),this.arm=o,this.vmPebble=Nc(),this.vmPebble.position.set(0,.05,-.08),this.vmBottle=uo(),this.vmBottle.position.set(0,-.12,-.1),this.vmBottle.rotation.x=-.3,this.vmCamera=Uc(),this.vmCamera.scale.setScalar(.55),this.vmCamera.position.set(-.08,-.02,.02),this.vmCamera.rotation.y=Math.PI+.08,this.viewmodel.add(this.vmPebble,this.vmBottle,this.vmCamera),this.viewmodel.traverse(l=>{l.layers.set(1+t),l.castShadow=!1}),this.avatar=new U0(t,r),this.body=this.avatar.root,this.body.traverse(l=>l.layers.set(3+t)),e.scene.add(this.body),this.hud=null}get eyeY(){return this.pos.y+(this.down?.5:bt.eye)}get forward(){return new T(-Math.sin(this.yaw)*Math.cos(this.pitch),Math.sin(this.pitch),-Math.cos(this.yaw)*Math.cos(this.pitch))}get flatForward(){return new T(-Math.sin(this.yaw),0,-Math.cos(this.yaw))}spawn(t,e=Math.PI){this.pos.copy(t),this.vel.set(0,0,0),this.yaw=e,this.pitch=0,this.grounded=!0,this.inWater=!1,this.carry=null,this.groundPlatform=null,this.down=!1,this.frozen=!1,this.lookAt=null,this.bleed=0,this.reviveProgress=0,this.shake=0,this.redFlash=0,this.inRed=!1,this.yawVel=0,this.turnHold=0,this.jumpBuf=0,this.turnTo=null,this.wet=0,this.wash=0,this.wetT=99,this.updateCamera(0)}setThirdPerson(t){this.thirdPerson=t,t?this.camera.layers.enable(3+this.index):this.camera.layers.disable(3+this.index),this.viewmodel.visible=!t}update(t){const e=this.input,n=this.game,i=n.world,r=!this.frozen&&!this.down;if(r&&this.turnTo!=null){const b=Math.abs(e.lookX)+Math.abs(e.lookY)>.002||this.autoLook&&Math.abs(e.move.x)>.1;let R=this.turnTo-this.yaw;R=Math.atan2(Math.sin(R),Math.cos(R)),b||Math.abs(R)<.01?this.turnTo=null:(this.yaw+=R*Math.min(1,t*6),this.autoLook||(this.pitch+=(0-this.pitch)*Math.min(1,t*6)))}if(r)if(this.autoLook){const b=Math.abs(e.move.x)>.1?e.move.x:0;this.turnHold=b?this.turnHold+t:0;const R=1.2+1.7*Math.min(1,this.turnHold/.4);this.yawVel=ge(this.yawVel,-b*R,18,t),this.yaw+=this.yawVel*t;const y=!this.grounded&&!this.inWater&&this.vel.y<-1.5?-.42:e.move.y>.2?-.2:-.12;this.pitch+=(y-this.pitch)*Math.min(1,t*4)}else this.yaw+=e.lookX,this.pitch=We(this.pitch+e.lookY,-1.45,1.45);if(e.thirdPerson&&r&&this.setThirdPerson(!this.thirdPerson),this.carry){const b=this.carry.p;b.toWorld(this.carry.lx,this.carry.lz,bn),this.pos.x=bn.x,this.pos.z=bn.z,this.pos.y=b.top()+this.carry.ly,this.yaw+=b.yaw-this.carry.yaw,this.carry=null}const a=this.autoLook,o=-Math.sin(this.yaw),l=-Math.cos(this.yaw),c=Math.cos(this.yaw),h=-Math.sin(this.yaw),u=a?0:e.move.x,d=a&&e.move.y<0?e.move.y*.75:e.move.y;let p=0,g=0;if(r){p=o*d+c*u,g=l*d+h*u;const b=Math.hypot(p,g);b>1&&(p/=b,g/=b)}const v=r&&e.sprint&&e.move.y>.2&&!this.inWater,m=this.inWater?bt.swimSpeed:v?bt.sprintSpeed:bt.walkSpeed,f=this.grounded?14:this.inWater?5:2.2;if(this.vel.x=ge(this.vel.x,p*m,f,t),this.vel.z=ge(this.vel.z,g*m,f,t),this.coyote=this.grounded?.13:Math.max(0,this.coyote-t),this.jumpBuf=e.jump?.15:Math.max(0,this.jumpBuf-t),this.jumpBuf>0&&r&&(this.grounded||this.coyote>0?(this.vel.y=bt.jumpVel,this.groundPlatform&&(this.vel.x+=this.groundPlatform.vel.x,this.vel.z+=this.groundPlatform.vel.z),this.grounded=!1,this.coyote=0,this.groundPlatform=null,this.bobT=0,this.jumpBuf=0):this.inWater&&e.jump&&(this.vel.y=3.4,this.jumpBuf=0)),this.inWater){const b=(bt.swimFeetY-this.pos.y)*4;this.vel.y=ge(this.vel.y,b,5,t)}else this.vel.y-=bt.gravity*t,this.vel.y<-30&&(this.vel.y=-30);if(this.grounded&&this.groundPlatform&&this.groundPlatform.kind==="conveyor"){const b=this.groundPlatform.convWorld();this.pos.x+=b.x*this.groundPlatform.convSpeed*t,this.pos.z+=b.y*this.groundPlatform.convSpeed*t}if(i.crushing){const b=i.wallQuery(this.pos);this.inRed=b.inside,this.wallProximity=b.proximity,b.inside&&(this.pos.x+=b.pushX*t*1.15)}else this.inRed=!1,this.wallProximity=0;const _=this.pos.y,S=this.grounded,x=this.groundPlatform?this.groundPlatform.vel.clone():null;this.pos.addScaledVector(this.vel,t),this.collide(_),S&&!this.grounded&&x&&this.vel.y<=.01&&(this.vel.x+=x.x,this.vel.z+=x.z);const L=this.pos.y<bt.waterY-.05;if(L&&!this.inWater&&(n.onPlayerSplash(this),this.splashLens(1,1),this.vel.y*=.25,this.shake=Math.max(this.shake,.6),this.swimNoiseTimer=qn.swimInterval*.6),this.inWater=L,this.inWater&&Math.hypot(this.vel.x,this.vel.z)>.4&&(this.swimNoiseTimer-=t,this.swimNoiseTimer<=0&&(this.swimNoiseTimer=qn.swimInterval,n.onSwimNoise(this),this.splashLens(.45,.18))),this.grounded&&!this.inWater){const b=Math.hypot(this.vel.x,this.vel.z);this.stepDist+=b*t,this.stepDist>(v?2.6:2)&&b>1&&(this.stepDist=0,n.audio.footstep(!0)),this.bobT+=b*t*1.6}else this.stepDist=0;if(this.grounded&&this.groundPlatform&&this.groundPlatform.dynamic){const b=this.groundPlatform;b.toLocal(this.pos.x,this.pos.z,ue),this.carry={p:b,lx:ue.x,lz:ue.z,ly:this.pos.y-b.top(),yaw:b.yaw}}this.pushCd=Math.max(0,this.pushCd-t),this.useCooldown=Math.max(0,this.useCooldown-t),this.throwAnim=Math.max(0,this.throwAnim-t*3),r&&(e.slot>=0&&this.selectSlot(e.slot),e.slot===-2&&this.selectSlot(-1),e.use&&this.useCooldown<=0&&this.useItem(),e.snap&&this.slot===2&&this.items.camera&&this.useCooldown<=0&&(n.snap(this),this.useCooldown=.5),e.push&&this.pushCd<=0&&n.push(this)),this.down&&(this.rescuing||(this.bleed+=t),e.bleed&&this.bleed>.5&&n.bleedOut(this)),this.shake=Math.max(0,this.shake-t*1.6),this.redFlash=Math.max(0,this.redFlash-t*.9),this.whiteFlash=Math.max(0,this.whiteFlash-t*2.2),this.frozen||(this.fovKick=ge(this.fovKick,0,6,t)),this.wetT+=t,this.wash=Math.max(0,this.wash-t*2.4),this.wetT>1.3&&(this.wet=Math.max(0,this.wet-t*.4)),this.updateCamera(t),this.updateViewmodel(t),this.body.position.copy(this.pos),this.body.rotation.y=this.yaw;const A=n.monsters?.some(b=>Math.hypot(b.pos.x-this.pos.x,b.pos.z-this.pos.z)<12);if(this.avatar.setScared(this.inWater||this.down||this.frozen||A||!this.grounded&&this.vel.y<-3),this.avatar.update(t,{speed:Math.hypot(this.vel.x,this.vel.z),grounded:this.grounded,inWater:this.inWater,down:this.down,vy:this.vel.y,sprint:v,action:this.throwAnim}),this.avatar.tag){const b=n.players.find(R=>R!==this);this.avatar.tag.visible=!!b&&!this.dead,b&&this.avatar.setTagDistance(b.camera.position.distanceTo(this.body.position))}}splashLens(t,e){t>=this.wet*.8&&(this.wetT=0,this.wetSeed=Math.random()*100),this.wet=Math.max(this.wet,t),this.wash=Math.max(this.wash,e)}selectSlot(t){if(t===this.slot){this.slot=-1;return}t===0&&this.items.pebbles>0||t===1&&this.items.bottle||t===2&&this.items.camera?this.slot=t:t>=0&&t<=2&&this.game.audio.denied()}useItem(){const t=this.game;this.slot===0&&this.items.pebbles>0?(this.items.pebbles--,t.throwItem(this,"pebble"),this.items.pebbles<=0&&(this.slot=-1),this.useCooldown=.45,this.throwAnim=1):this.slot===1&&this.items.bottle?(this.items.bottle=!1,t.throwItem(this,"bottle"),this.slot=-1,this.useCooldown=.5,this.throwAnim=1):this.slot===2&&this.items.camera&&(t.snap(this),this.useCooldown=.5)}collide(t){const e=this.game.world,n=bt.radius,i=bt.height,r=this.pos;let a=!1,o=null;const l=(c,h)=>this.vel.x*c+this.vel.z*h<-.2||this.input.move.x!==0||this.input.move.y!==0;for(let c=0;c<2;c++)for(const h of e.platforms){const u=r.x-h.pos.x,d=r.z-h.pos.z,p=Math.max(h.w,h.d)*.72+n+.5;if(u*u+d*d>p*p)continue;const g=h.top(),v=h.bottom(),m=r.y,f=r.y+i;if(f<v-.05||m>g+.3)continue;h.toLocal(r.x,r.z,ue);const _=h.w/2,S=h.d/2,x=We(ue.x,-_,_),L=We(ue.z,-S,S),A=ue.x-x,b=ue.z-L,R=A*A+b*b;if(!(R>n*n)){if(h.walkable&&this.vel.y<=.05&&m<=g+.3&&t>=g-bt.stepUp&&f>v&&!(this.inWater&&g<bt.waterY-.12)&&(m<=g+.08||this.grounded)){r.y=g,this.vel.y=0,a=!0,o=h,h.standing++;continue}if(m<g-.02&&f>v+.02){if(this.vel.y>0&&t+i<=v+.08){r.y=v-i-.01,this.vel.y=0;continue}if(this.inWater&&h.walkable&&g-m<1.35&&(this.input.jumpHeld||this.input.jump||l(A,b))){r.y=g,this.vel.y=0,a=!0,o=h,h.standing++;const V=x-ue.x,W=L-ue.z,Y=Math.hypot(V,W)||1;ue.x+=V/Y*.3,ue.z+=W/Y*.3,h.toWorld(ue.x,ue.z,bn),r.x=bn.x,r.z=bn.z;continue}let M,y;if(R>1e-8){const V=Math.sqrt(R);M=A/V,y=b/V,ue.x+=M*(n-V),ue.z+=y*(n-V)}else{const V=_-Math.abs(ue.x),W=S-Math.abs(ue.z);if(V<W){const Y=ue.x>=0?1:-1;ue.x=Y*(_+n),M=Y,y=0}else{const Y=ue.z>=0?1:-1;ue.z=Y*(S+n),M=0,y=Y}}h.toWorld(ue.x,ue.z,bn),r.x=bn.x,r.z=bn.z;const P=h.dirToWorld(M,y,N0),F=P.x,I=P.z,k=this.vel.x*F+this.vel.z*I;k<0&&(this.vel.x-=F*k,this.vel.z-=I*k)}}}for(const c of e.pillars){const h=r.x-c.x,u=r.z-c.z,d=Math.hypot(h,u),p=c.r+n;if(d<p){const g=(p-d)/(d||1);r.x+=h*g,r.z+=u*g;const v=h/(d||1),m=u/(d||1),f=this.vel.x*v+this.vel.z*m;f<0&&(this.vel.x-=v*f,this.vel.z-=m*f)}}r.x=We(r.x,-39.3,39.3),r.z=We(r.z,-33.3,e.endZ+1.8),a&&this.lastGroundVel.copy(o.vel),this.grounded=a,this.groundPlatform=o}updateCamera(t){const e=this.camera;let n=this.yaw,i=this.pitch;if(this.lookAt){const u=new T().subVectors(this.lookAt,new T(this.pos.x,this.eyeY,this.pos.z)),d=Math.atan2(-u.x,-u.z),p=Math.atan2(u.y,Math.hypot(u.x,u.z));let g=d-this.yaw;g=Math.atan2(Math.sin(g),Math.cos(g)),this.yaw+=g*Math.min(1,t*7),this.pitch+=(p-this.pitch)*Math.min(1,t*7),n=this.yaw,i=this.pitch}const r=this.grounded&&!this.down?Math.sin(this.bobT*2.2)*.035:0,a=this.shake*(this.game.settings.shake?1:0),o=(Math.random()-.5)*a*.08,l=(Math.random()-.5)*a*.08,c=(Math.random()-.5)*a*.05,h=new T(this.pos.x,this.eyeY+r,this.pos.z);if(this.down&&(i=-.6),this.thirdPerson&&!this.frozen){const u=new T(Math.sin(n)*Math.cos(i),-Math.sin(i),Math.cos(n)*Math.cos(i)),d=h.clone().addScaledVector(u,3.6).add(new T(0,.6,0));d.y<.4&&(d.y=.4),e.position.copy(d)}else e.position.copy(h);e.rotation.set(i+l,n+o,(this.down?.35:0)+c)}updateViewmodel(t){const e=this.viewmodel;this.vmPebble.visible=this.slot===0&&this.items.pebbles>0,this.vmBottle.visible=this.slot===1&&this.items.bottle,this.vmCamera.visible=this.slot===2&&this.items.camera,this.arm.visible=!this.vmCamera.visible;const n=Math.hypot(this.vel.x,this.vel.z),i=this.grounded?Math.sin(this.bobT*2.2)*.012*Math.min(1,n/4):0,r=this.vmCamera.visible?new T(.22,-.24,-.5):new T(.3,-.32,-.55);e.position.x=ge(e.position.x,r.x+i,8,t),e.position.y=ge(e.position.y,r.y+Math.abs(i)*.6+(this.inWater?-.05:0),8,t),e.position.z=ge(e.position.z,r.z,8,t),e.rotation.x=-this.throwAnim*.8,e.rotation.z=-this.input.lookX*1.5,e.visible=!this.thirdPerson&&!this.down}dispose(){this.game.scene.remove(this.camera),this.game.scene.remove(this.body),this.guideBeam&&(this.game.scene.remove(this.guideBeam),this.guideBeam.geometry.dispose(),this.guideBeam.material.dispose())}}const F0=new T(0,1,0),Se={x:0,z:0},Jr={x:0,z:0};function Ol(s,t,e){const n=new dt(new Pe(t*.7,t,1,8),s);return n.castShadow=!0,n.userData.len=e,n}function Fl(s,t,e){const n=new T().subVectors(e,t),i=n.length()||.001;s.position.copy(t).addScaledVector(n,.5),s.scale.set(1,i,1),s.quaternion.setFromUnitVectors(F0,n.normalize())}class kl{constructor(t,e,n){this.game=t,this.index=e,this.diff=n,this.pos=new T(0,bt.waterY,60),this.yaw=0,this.vel=new T,this.state="wander",this.target=new T,this.waypoint=null,this.waitT=0,this.alertT=0,this.searchT=0,this.searchAng=0,this.lastNoiseTime=-1,this.victim=null,this.headOpen=0,this.headYaw=0,this.headPitch=0,this.twitchT=1,this.twitch=0,this.gait=0,this.stepT=0,this.growlT=3+Math.random()*4,this.chitterT=2+Math.random()*3,this.breathT=1,this.stallT=0,this.stallPos=new T,this.roomBounds={x0:-28,x1:28,z0:20,z1:80},this.retreatTarget=null,this.stun=0,this.speedMul=1,this.lungeY=0,this.roomIdx=0,this.path=null,this.pathGoal=new T,this.pathAge=0,this.pathIdx=0,this.pathFail=0,this.chaseT=0,this._build()}_build(){const t=new Kt({color:Ie.monsterBody,roughness:.82,metalness:.08}),e=new Kt({color:2828834,roughness:.95}),n=new Kt({color:Ie.monsterHead,roughness:.55}),i=new Kt({color:4864554,roughness:.7}),r=new Kt({color:1315599,roughness:.35,metalness:.2}),a=new Kt({color:721923,roughness:1}),o=new Kt({color:14930596,roughness:.45}),l=new Kt({color:2756612,emissive:16734740,emissiveIntensity:1.6,roughness:.4});this.mats={bodyMat:t,headMat:n,emberMat:l};const c=new ee;this.root=c,this.game.scene.add(c),this.limbGroup=new ee,this.game.scene.add(this.limbGroup),this.torso=new ee;const h=new dt(new ar(.22,1.25,6,12),t);h.rotation.x=Math.PI/2,h.scale.set(1,1,.75),h.castShadow=!0;const u=new dt(new nn(.34,12,10),t);u.position.set(0,.2,.25),u.scale.set(.9,.7,1.3),u.castShadow=!0;const d=new dt(new nn(.26,10,8),t);d.position.set(0,.05,.75),d.scale.set(1.1,.8,.9),this.torso.add(h,u,d);for(let _=0;_<4;_++){const S=new dt(new er(.25-_*.015,.025,6,16,Math.PI*1.3),i);S.position.set(0,-.02,-.35+_*.22),S.rotation.z=Math.PI*.85,S.rotation.y=0,this.torso.add(S)}for(let _=0;_<7;_++){const S=new dt(new us(.035,.16+_%2*.06,5),r);S.position.set(0,.3+(_<3?.06:0),-.5+_*.2),S.rotation.x=-.4,this.torso.add(S)}c.add(this.torso),this.neck=new ee,this.neck.position.set(0,.12,-.85),this.torso.add(this.neck);const p=new dt(new Pe(.075,.12,.5,8),e);p.rotation.x=Math.PI/2-.7,p.position.set(0,.12,-.18),this.neck.add(p),this.head=new ee,this.head.position.set(0,.3,-.42),this.neck.add(this.head),this.petals=[];for(let _=0;_<4;_++){const S=new ee;S.rotation.y=_*Math.PI/2;const x=new dt(new nn(.38,16,12,0,Math.PI/2,0,Math.PI*.8),n);x.position.y=.1,x.castShadow=!0;const L=new dt(new nn(.386,8,8,.08,Math.PI/2-.16,.25,Math.PI*.7),new Kt({color:5123608,roughness:.7}));L.position.y=.1;const A=new dt(new nn(.355,12,10,.05,Math.PI/2-.1,.1,Math.PI*.75),a);A.position.y=.1,S.add(x,L,A),this.head.add(S),this.petals.push(S)}this.eyes=[];for(const _ of[-1,1]){const S=new dt(new nn(.035,8,6),l);S.position.set(_*.12,.06,-.36),this.head.add(S),this.eyes.push(S)}const g=new dt(new Pe(.035,.07,.26,7),new Kt({color:3029538,roughness:.9}));g.position.y=.5,g.rotation.z=.3,this.stem=g,this.head.add(g),this.mouth=new ee,this.mouth.position.y=.1;const v=new dt(new nn(.25,12,10),a);this.mouth.add(v);const m=new dt(new er(.26,.05,8,24),new Kt({color:4856338,roughness:.8}));m.rotation.x=Math.PI/2,this.mouth.add(m),this.teethRing=new ee;for(let _=0;_<2;_++){const S=_===0?20:14,x=_===0?.22:.14;for(let L=0;L<S;L++){const A=new dt(new us(_===0?.03:.022,_===0?.14:.1,5),o),b=L/S*Math.PI*2+_*.15;A.position.set(Math.cos(b)*x,-_*.06,Math.sin(b)*x),A.lookAt(0,-_*.06-.05,0),A.rotateX(Math.PI/2),this.teethRing.add(A)}}this.mouth.add(this.teethRing),this.mouth.visible=!1,this.head.add(this.mouth),this.limbs=[];const f=[{hip:new T(-.28,.08,-.6),rest:new T(-.85,0,-1.15),l1:1.15,l2:1.1,phase:0,arm:!0},{hip:new T(.28,.08,-.6),rest:new T(.85,0,-1.15),l1:1.15,l2:1.1,phase:Math.PI,arm:!0},{hip:new T(-.26,0,.7),rest:new T(-.62,0,.95),l1:.72,l2:.74,phase:Math.PI,arm:!1},{hip:new T(.26,0,.7),rest:new T(.62,0,.95),l1:.72,l2:.74,phase:0,arm:!1}];for(const _ of f){const S=Ol(t,_.arm?.075:.095,_.l1),x=Ol(e,_.arm?.045:.06,_.l2),L=new ee,A=_.arm?4:3;for(let b=0;b<A;b++){const R=new dt(new us(.028,_.arm?.34:.22,5),r);R.rotation.x=Math.PI/2+.35,R.rotation.z=(b-(A-1)/2)*.28,R.position.set((b-(A-1)/2)*.07,.03,-.14),L.add(R)}this.limbGroup.add(S,x,L),this.limbs.push({..._,upper:S,lower:x,hand:L,foot:new T,lift:0})}c.traverse(_=>{_.isMesh&&(_.castShadow=!0,_.layers.set(0))}),this.limbGroup.traverse(_=>{_.isMesh&&(_.castShadow=!0,_.layers.set(0))})}setRoom(t,e=0){this.roomBounds=t,this.roomIdx=e,this.waypoint=null,this.path=null}teleport(t,e){this.pos.set(t,bt.waterY,e),this.state="wander",this.waypoint=null,this.victim=null,this.headOpen=0,this.stun=0,this.lungeY=0,this.lastNoiseTime=this.game.noise.time,this._resolveObstacles()}groundY(t,e){let n=bt.waterY;for(const i of this.game.world.platforms){if(!i.walkable)continue;const r=i.top();r>3||r<bt.waterY||i.containsXZ(t,e,.05)&&r>n&&(n=r)}return n}pickWaypoint(){const t=this.roomBounds,e=this.game.rng,n=this.game.nav,i=n?n.randomFree(this.roomIdx,e,t):null;this.waypoint=i?new T(i.x,bt.waterY,i.z):new T(e.range(t.x0,t.x1),bt.waterY,e.range(t.z0,t.z1)),this.path=null}navigateTo(t,e,n){const i=this.game.nav,r=Math.hypot(t.x-this.pos.x,t.z-this.pos.z);if(!i||r<2.5)return this.moveToward(t,e,n);this.pathAge+=n;const a=this.pathGoal.distanceTo(t)>2;if(!this.path||a||this.pathAge>3||this.stuckT>.8){const h=this.game.world.roomAt(this.pos.z);if(this.path=i.findPath(h?h.idx:this.roomIdx,this.pos,t),this.pathGoal.copy(t),this.pathAge=0,this.pathIdx=0,this.stuckT=0,!this.path)return this.pathFail++,this.moveToward(t,e,n)}for(;this.pathIdx<this.path.length-1&&Math.hypot(this.path[this.pathIdx].x-this.pos.x,this.path[this.pathIdx].z-this.pos.z)<1.3;)this.pathIdx++;const o=this.path[this.pathIdx],l=this.pos.clone();this.moveToward(o,e,n);const c=this.pos.distanceTo(l);return this.stuckT=c<e*n*.25?(this.stuckT||0)+n:0,Math.hypot(t.x-this.pos.x,t.z-this.pos.z)}_isObstacle(t){return t.kind==="solid"?t.bottom()<1.5:t.top()>bt.waterY-.3}_resolveObstacles(){for(const e of this.game.world.platforms){if(!this._isObstacle(e))continue;const n=this.pos.x-e.pos.x,i=this.pos.z-e.pos.z,r=Math.max(e.w,e.d)*.72+.5+.5;if(n*n+i*i>r*r)continue;e.toLocal(this.pos.x,this.pos.z,Se);const a=e.w/2+.5,o=e.d/2+.5;if(Math.abs(Se.x)<a&&Math.abs(Se.z)<o){const l=a-Math.abs(Se.x),c=o-Math.abs(Se.z);l<c?Se.x=(Se.x>=0?1:-1)*a:Se.z=(Se.z>=0?1:-1)*o,e.toWorld(Se.x,Se.z,Jr),this.pos.x=Jr.x,this.pos.z=Jr.z}}for(const e of this.game.world.pillars){const n=this.pos.x-e.x,i=this.pos.z-e.z,r=Math.hypot(n,i);if(r<e.r+.5){const a=(e.r+.5-r)/(r||1);this.pos.x+=n*a,this.pos.z+=i*a}}this.pos.x=We(this.pos.x,-37,37),this.pos.z=We(this.pos.z,1,this.game.world.endZ-2)}moveToward(t,e,n){const i=t.x-this.pos.x,r=t.z-this.pos.z,a=Math.hypot(i,r);if(a<.05)return a;let o=i/a,l=r/a;const c=Math.min(3.5,a);for(const v of this.game.world.pillars){const m=v.x-this.pos.x,f=v.z-this.pos.z,_=Math.hypot(m,f);if(_>v.r+6||m*o+f*l<0)continue;const x=m*-l+f*o,L=v.r+1;if(Math.abs(x)<L){const A=x>=0?-1:1,b=(L-Math.abs(x))/L*(1-Math.min(1,(_-v.r)/6)),R=-l*A,M=o*A;o+=R*b*1.6,l+=M*b*1.6;const y=Math.hypot(o,l)||1;o/=y,l/=y}}const h=this.pos.x+o*c,u=this.pos.z+l*c;for(const v of this.game.world.platforms){if(!this._isObstacle(v))continue;const m=h-v.pos.x,f=u-v.pos.z,_=Math.max(v.w,v.d)*.72+1.5;if(m*m+f*f>_*_)continue;v.toLocal(h,u,Se);const S=v.w/2+.7,x=v.d/2+.7;if(Math.abs(Se.x)<S&&Math.abs(Se.z)<x){const L=S-Math.abs(Se.x),A=x-Math.abs(Se.z);let b,R;L<A?(b=Se.x>=0?1:-1,R=0):(b=0,R=Se.z>=0?1:-1);const M=v.dirToWorld(b,R),y=M.x,P=M.z;let F=-P,I=y;F*o+I*l<0&&(F=-F,I=-I);const k=1-Math.min(L,A)/2;o=o*(1-k)+F*k+y*.25,l=l*(1-k)+I*k+P*.25;const V=Math.hypot(o,l)||1;o/=V,l/=V}}const d=Math.min(a,e*n);this.pos.x+=o*d,this.pos.z+=l*d,this._resolveObstacles();let g=Math.atan2(-o,-l)-this.yaw;return g=Math.atan2(Math.sin(g),Math.cos(g)),this.yaw+=g*Math.min(1,n*7),Math.hypot(t.x-this.pos.x,t.z-this.pos.z)}swimmer(){let t=null,e=1/0;for(const n of this.game.players){if(!n.inWater||n.down||n.frozen||n.dead)continue;const i=Math.hypot(n.pos.x-this.pos.x,n.pos.z-this.pos.z);i<e&&(e=i,t=n)}return t}nearestPlayer(t){let e=null,n=t;for(const i of this.game.players){if(i.down||i.frozen||i.dead)continue;const r=Math.hypot(i.pos.x-this.pos.x,i.pos.z-this.pos.z);r<n&&(n=r,e=i)}return e}update(t){const e=this.game,n=e.noise,i=this.diff,r=this.pos.clone();if(this.stun=Math.max(0,this.stun-t),this.state!=="attack"){const c=n.best(this.pos,i.hearMult,this.lastNoiseTime);c&&this.stun<=0&&this.state!=="retreat"&&(this.lastNoiseTime=c.time,this.target.copy(c.pos),this.target.y=bt.waterY,(this.state==="wander"||this.state==="search")&&(this.state="alert",this.alertT=.3,e.audio.growl(this.pos)),this.stallT=0,this.bestLeft=void 0,this.path=null,this.chaseT=0,e.onMonsterHeard(this,c));const h=this.stun<=0&&this.state!=="retreat"?this.swimmer():null;h&&(this.target.set(h.pos.x,bt.waterY,h.pos.z),this.state==="wander"||this.state==="search"?(this.state="alert",this.alertT=.12,this.path=null,this.chaseT=0,this.stallT=0,this.bestLeft=void 0,e.audio.growl(this.pos)):this.state==="alert"&&(this.alertT=Math.min(this.alertT,.12))),this.hunting=!!h;const u=this.nearestPlayer(i.catchRadius+.5);u&&this.stun<=0&&this.state!=="retreat"&&e.catchPlayer(u,this)}let a=0;switch(this.state){case"wander":{if(this.waypoint||this.pickWaypoint(),this.waitT>0){this.waitT-=t;break}a=i.wanderSpeed*this.speedMul;const c=this.navigateTo(this.waypoint,a,t);this.stallT=c<1.5||this.pos.distanceTo(this.stallPos)>.4?0:this.stallT+t,this.pos.distanceTo(this.stallPos)>.4&&this.stallPos.copy(this.pos),(c<1.5||this.stallT>2.5||this.pathFail>2)&&(this.waypoint=null,this.pathFail=0,this.waitT=.8+Math.random()*2.5,this.stallT=0);break}case"alert":{this.alertT-=t;let h=Math.atan2(-(this.target.x-this.pos.x),-(this.target.z-this.pos.z))-this.yaw;h=Math.atan2(Math.sin(h),Math.cos(h)),this.headYaw=ge(this.headYaw,We(h,-1.3,1.3),18,t),this.alertT<=0&&(this.state="chase",this.headYaw=0,this.stallT=0,this.bestLeft=void 0,this.chaseT=0,this.path=null);break}case"chase":{this.chaseT+=t;const c=this.hunting?i.huntMul:this.chaseT<3?1.4:1;a=i.chaseSpeed*c*this.speedMul*(this.stun>0?.3:1);const h=this.navigateTo(this.target,a,t);this.bestLeft===void 0||h<this.bestLeft-.4?(this.bestLeft=h,this.stallT=0):this.stallT+=t,(!this.hunting&&h<1.8||this.stallT>(this.hunting?4:2.5))&&(this.state="search",this.searchT=i.searchTime,this.searchAng=this.yaw,this.stallT=0,this.bestLeft=void 0,this.path=null);break}case"search":{this.searchT-=t,a=i.wanderSpeed*1.4,this.searchAng+=t*1.2;const c=new T(this.target.x+Math.cos(this.searchAng)*2.4,bt.waterY,this.target.z+Math.sin(this.searchAng)*2.4);this.moveToward(c,a,t),this.headYaw=Math.sin(this.searchT*6)*.7,this.headPitch=.25+Math.sin(this.searchT*9)*.15;const h=this.nearestPlayer(3);h&&this.stun<=0&&e.catchPlayer(h,this),this.searchT<=0&&(this.state="wander",this.waypoint=null,this.headYaw=0,this.headPitch=0);break}case"attack":{this.headOpen=Math.min(1,this.headOpen+t*5);break}case"retreat":{if(a=i.chaseSpeed*.9,!this.retreatTarget){const h=this.roomBounds;this.retreatTarget=new T(We(this.pos.x+(Math.random()-.5)*60,h.x0,h.x1),bt.waterY,We(this.pos.z+(Math.random()<.5?-1:1)*30,h.z0,h.z1)),this.stallT=0,this.stallPos.copy(this.pos)}const c=this.navigateTo(this.retreatTarget,a,t);this.headOpen=Math.max(0,this.headOpen-t*2),this.pos.distanceTo(this.stallPos)>.5?(this.stallPos.copy(this.pos),this.stallT=0):this.stallT+=t,(c<2||this.stallT>2)&&(this.state="wander",this.retreatTarget=null,this.waypoint=null,this.lastNoiseTime=n.time);break}}this.state!=="attack"&&(this.lungeY=Math.max(0,this.lungeY-t*3),this.pos.y=bt.waterY+this.lungeY),this.vel.subVectors(this.pos,r).divideScalar(Math.max(t,1e-4));const o=Math.hypot(this.vel.x,this.vel.z);o>.3&&this.state!=="attack"&&(this.gait+=t*(2.6+o*1.6),this.stepT-=t,this.stepT<=0&&(this.stepT=.5/Math.max(1,o*.55),e.audio.monsterStep(this.pos,Math.min(1.2,.45+o/7),!0),e.vfx.wake(this.pos)));const l=this.nearestPlayer(16);this.growlT-=t,this.growlT<=0&&(this.growlT=6+Math.random()*8,this.state!=="attack"&&e.audio.monsterHiss(this.pos)),this.chitterT-=t,this.chitterT<=0&&l&&this.state!=="attack"&&(this.chitterT=1.5+Math.random()*3,e.audio.chitter(this.pos)),this.breathT-=t,this.breathT<=0&&l&&this.state!=="attack"&&(Math.hypot(l.pos.x-this.pos.x,l.pos.z-this.pos.z)<7?(this.breathT=1.2+Math.random()*1.6,e.audio.breath(this.pos)):this.breathT=.5),this.twitchT-=t,this.twitchT<=0&&(this.twitchT=.6+Math.random()*2.5,this.twitch=(Math.random()-.5)*1.4),this.twitch=ge(this.twitch,0,9,t),this.animate(t,o)}animate(t,e){const n=this.root;n.position.copy(this.pos),n.rotation.y=this.yaw;const i=this.state==="attack",r=this.state==="chase",a=i?1.35:r?.62:.74,o=Math.sin(this.gait*2)*.05*Math.min(1,e/3)+(r?(Math.random()-.5)*.02:0);this.torso.position.set(0,a+o,0),this.torso.rotation.x=i?-.45:r?.28:.2,this.torso.rotation.z=Math.sin(this.gait)*.05*Math.min(1,e/3),this.neck.rotation.y=this.headYaw+this.twitch,this.neck.rotation.x=i?-.55+(Math.random()-.5)*.1:this.headPitch+(r?-.1:.12),this.neck.rotation.z=i?(Math.random()-.5)*.12:Math.sin(this.gait*.5)*.08,this.head.rotation.z=i?Math.sin(performance.now()*.04)*.08:0;const l=this.headOpen;this.petals.forEach((d,p)=>{d.rotation.set(0,p*Math.PI/2,0),d.rotateX(-l*1.55)}),this.mouth.visible=l>.05,this.mouth.scale.setScalar(.55+l*.7+(i?Math.sin(performance.now()*.03)*.06:0)),this.teethRing.rotation.y+=t*(i?6:.5),this.stem.visible=l<.7;for(const d of this.eyes)d.visible=l<.4;const c=i?3.5:r?2.2:1.4;this.mats.emberMat.emissiveIntensity=ge(this.mats.emberMat.emissiveIntensity,c,6,t);const h=new Zt().makeRotationY(this.yaw).setPosition(this.pos),u=new Zt().multiplyMatrices(h,new Zt().makeTranslation(0,a+o,0));for(const d of this.limbs){const p=d.hip.clone().applyMatrix4(u);let g;if(i)g=(d.arm?new T(d.rest.x*1.5,2+Math.sin(performance.now()*.02+d.rest.x)*.1,-1.5):d.rest.clone()).applyMatrix4(h);else{const M=this.gait+d.phase,y=Math.sin(M),P=Math.max(0,Math.cos(M))*(d.arm?.45:.3)*Math.min(1,e/2.5),F=Math.min(1.3,e*.24);g=new T(d.rest.x,0,d.rest.z-y*F).applyMatrix4(h),g.y=this.groundY(g.x,g.z)+P+.02}const v=new T().subVectors(g,p);let m=v.length();const f=d.l1,_=d.l2;m>f+_-.01&&(m=f+_-.01,v.setLength(m),g.copy(p).add(v));const S=Math.acos(We((f*f+m*m-_*_)/(2*f*m),-1,1)),x=new T(d.hip.x>0?1:-1,0,0).applyMatrix4(new Zt().makeRotationY(this.yaw)),L=new T(0,1,0).add(x.multiplyScalar(.45)).normalize(),A=v.clone().normalize(),b=L.sub(A.clone().multiplyScalar(L.dot(A))).normalize(),R=p.clone().addScaledVector(A,Math.cos(S)*f).addScaledVector(b,Math.sin(S)*f);Fl(d.upper,p,R),Fl(d.lower,R,g),d.hand.position.copy(g),d.hand.rotation.y=this.yaw}}dispose(){this.game.scene.remove(this.root),this.game.scene.remove(this.limbGroup)}}class k0{constructor(t){this.game=t,this.list=[]}throw(t,e,n,i){const r=t==="pebble"?Nc():uo();r.position.copy(e),this.game.scene.add(r);const a=t==="pebble"?15:16,o=n.clone().multiplyScalar(a).add(new T(0,2.5,0)).add(i);this.list.push({kind:t,mesh:r,pos:r.position,vel:o,life:8,spin:new T(Math.random()*6,Math.random()*6,Math.random()*6),resting:!1,restT:0}),this.game.audio.whoosh()}update(t){const e=this.game,n=e.world;for(let i=this.list.length-1;i>=0;i--){const r=this.list[i];if(r.life-=t,r.resting){r.restT+=t,r.restT>6&&this._remove(i);continue}if(r.vel.y-=bt.gravity*.75*t,r.pos.addScaledVector(r.vel,t),r.mesh.rotation.x+=r.spin.x*t,r.mesh.rotation.y+=r.spin.y*t,r.pos.y<=bt.waterY){const o=new T(r.pos.x,bt.waterY,r.pos.z);e.vfx.splash(o,r.kind==="bottle"),e.audio.splash(r.kind==="bottle",o),e.noise.emit(o,r.kind==="pebble"?qn.pebble:qn.bottle,r.kind),e.onDistraction(o,r.kind),this._remove(i);continue}let a=!1;for(const o of n.platforms){if(!o.containsXZ(r.pos.x,r.pos.z,.1))continue;const l=o.top(),c=o.bottom();if(r.pos.y<=l&&r.pos.y>=c-.3&&o.walkable&&r.vel.y<0){r.kind==="bottle"?(e.audio.glass(r.pos),e.noise.emit(r.pos.clone(),qn.bottle,"bottle"),e.onDistraction(r.pos.clone(),"bottle"),this._remove(i)):(r.pos.y=l+.08,r.resting=!0,e.audio.clack(r.pos)),a=!0;break}if(!o.walkable&&r.pos.y<l&&r.pos.y>c){r.vel.x*=-.4,r.vel.z*=-.4,r.pos.addScaledVector(r.vel,t*2),a=!0;break}}if(!a){for(const o of n.pillars){const l=r.pos.x-o.x,c=r.pos.z-o.z,h=Math.hypot(l,c);if(h<o.r+.1){const u=l/h,d=c/h,p=r.vel.x*u+r.vel.z*d;r.vel.x-=1.5*p*u,r.vel.z-=1.5*p*d,r.vel.multiplyScalar(.6),r.pos.x=o.x+u*(o.r+.12),r.pos.z=o.z+d*(o.r+.12),e.audio.clack(r.pos),r.kind==="bottle"&&(e.audio.glass(r.pos),e.noise.emit(r.pos.clone(),qn.bottle,"bottle"),e.onDistraction(r.pos.clone(),"bottle"),this._remove(i));break}}r.life<=0&&this._remove(i)}}}_remove(t){const e=this.list[t];this.game.scene.remove(e.mesh),this.list.splice(t,1)}clear(){for(;this.list.length;)this._remove(this.list.length-1)}}class z0{constructor(){this.noises=[],this.listeners=[],this.time=0}onNoise(t){this.listeners.push(t)}emit(t,e,n="splash",i=null){const r={pos:t.clone?t.clone():new T(t.x,t.y,t.z),radius:e,kind:n,source:i,time:this.time};this.noises.push(r);for(const a of this.listeners)a(r);return r}update(t){this.time+=t;const e=this.time;this.noises=this.noises.filter(n=>e-n.time<4)}best(t,e=1,n=-1/0){let i=null,r=-1/0;for(const a of this.noises){if(a.time<=n)continue;const o=Math.hypot(a.pos.x-t.x,a.pos.z-t.z),l=a.kind==="swim"?a.radius*e:400;if(o>l)continue;const c=this.time-a.time,h=a.radius*(1-c/4)+(4-c)*10;h>r&&(r=h,i=a)}return i}}const Wn=1200;class B0{constructor(t,e){this.scene=t,this.pos=new Float32Array(Wn*3),this.vel=new Float32Array(Wn*3),this.life=new Float32Array(Wn),this.maxLife=new Float32Array(Wn),this.sizes=new Float32Array(Wn),this.alpha=new Float32Array(Wn),this.head=0;const n=new be;n.setAttribute("position",new ze(this.pos,3)),n.setAttribute("aSize",new ze(this.sizes,1)),n.setAttribute("aAlpha",new ze(this.alpha,1));const i=new Je({uniforms:{map:{value:e.particle},fogColor:{value:new zt(11315338)},fogDensity:{value:.045}},vertexShader:`
        attribute float aSize; attribute float aAlpha; varying float vA; varying float vFog;
        uniform float fogDensity;
        void main(){ vA = aAlpha; vec4 mv = modelViewMatrix * vec4(position,1.0);
          float d = -mv.z; vFog = 1.0 - exp(-fogDensity*fogDensity*d*d);
          gl_PointSize = aSize * (300.0 / max(d, 0.5)); gl_Position = projectionMatrix * mv; }`,fragmentShader:`
        uniform sampler2D map; uniform vec3 fogColor; varying float vA; varying float vFog;
        void main(){ vec4 c = texture2D(map, gl_PointCoord); vec3 col = mix(vec3(1.0), fogColor, vFog);
          gl_FragColor = vec4(col, c.a * vA); }`,transparent:!0,depthWrite:!1});this.points=new Xm(n,i),this.points.frustumCulled=!1,t.add(this.points),this.rings=[];const r=new co(.8,1,40);r.rotateX(-Math.PI/2),this.ringGeo=r,this.ringMat=new an({color:16777215,transparent:!0,opacity:.8,depthWrite:!1,fog:!0}),this.foams=[];const a=new oo(1,24);a.rotateX(-Math.PI/2),this.foamGeo=a,this.foamMat=new an({color:15922668,transparent:!0,opacity:.55,depthWrite:!1,fog:!0}),this.time=0}setFog(t,e){this.points.material.uniforms.fogColor.value.copy(t),this.points.material.uniforms.fogDensity.value=e}spawn(t,e,n,i,r,a,o,l){const c=this.head;this.head=(this.head+1)%Wn,this.pos[c*3]=t,this.pos[c*3+1]=e,this.pos[c*3+2]=n,this.vel[c*3]=i,this.vel[c*3+1]=r,this.vel[c*3+2]=a,this.life[c]=o,this.maxLife[c]=o,this.sizes[c]=l,this.alpha[c]=1}splash(t,e=!0){const n=e?90:28;for(let i=0;i<n;i++){const r=Math.random()*Math.PI*2,a=Math.random()*(e?.6:.3),o=e?2.5+Math.random()*3.5:1+Math.random()*1.5;this.spawn(t.x+Math.cos(r)*a,t.y+.05,t.z+Math.sin(r)*a,Math.cos(r)*o*(.3+Math.random()*.5),(e?3:1.5)+Math.random()*(e?4:2),Math.sin(r)*o*(.3+Math.random()*.5),.6+Math.random()*.6,e?.25+Math.random()*.35:.15+Math.random()*.15)}this.ring(t,e?5:2.2,e?1.1:.7),e&&setTimeout(()=>this.ring(t,3.5,1),120),this.foam(t,e?1.6:.8,e?2:1.2)}ring(t,e,n){const i=new dt(this.ringGeo,this.ringMat.clone());i.position.set(t.x,.02,t.z),i.scale.setScalar(.3),this.scene.add(i),this.rings.push({m:i,t:0,life:n,maxR:e})}foam(t,e,n){const i=new dt(this.foamGeo,this.foamMat.clone());i.position.set(t.x,.015,t.z),i.scale.setScalar(e*.6),i.rotation.y=Math.random()*6.28,this.scene.add(i),this.foams.push({m:i,t:0,life:n,r:e})}wake(t){for(let e=0;e<4;e++)this.spawn(t.x+(Math.random()-.5)*.6,.03,t.z+(Math.random()-.5)*.6,(Math.random()-.5)*.8,.6+Math.random()*.8,(Math.random()-.5)*.8,.5,.12);Math.random()<.35&&this.foam(t,.5,.9)}update(t){this.time+=t;const e=9.8;for(let i=0;i<Wn;i++){if(this.life[i]<=0){this.alpha[i]=0;continue}this.life[i]-=t,this.vel[i*3+1]-=e*t,this.pos[i*3]+=this.vel[i*3]*t,this.pos[i*3+1]+=this.vel[i*3+1]*t,this.pos[i*3+2]+=this.vel[i*3+2]*t,this.pos[i*3+1]<0&&(this.life[i]=0),this.alpha[i]=Math.min(1,this.life[i]/this.maxLife[i]*2)}const n=this.points.geometry;n.attributes.position.needsUpdate=!0,n.attributes.aAlpha.needsUpdate=!0,n.attributes.aSize.needsUpdate=!0;for(let i=this.rings.length-1;i>=0;i--){const r=this.rings[i];r.t+=t;const a=r.t/r.life;if(a>=1){this.scene.remove(r.m),r.m.material.dispose(),this.rings.splice(i,1);continue}const o=.3+a*r.maxR;r.m.scale.setScalar(o),r.m.material.opacity=.8*(1-a)}for(let i=this.foams.length-1;i>=0;i--){const r=this.foams[i];r.t+=t;const a=r.t/r.life;if(a>=1){this.scene.remove(r.m),r.m.material.dispose(),this.foams.splice(i,1);continue}r.m.scale.setScalar(r.r*(.6+a*.6)),r.m.material.opacity=.55*(1-a*a)}}dispose(){this.scene.remove(this.points);for(const t of this.rings)this.scene.remove(t.m);for(const t of this.foams)this.scene.remove(t.m);this.rings.length=0,this.foams.length=0}}const H0=new to(-1,1,1,-1,0,1);class V0 extends be{constructor(){super(),this.setAttribute("position",new Qt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Qt([0,2,0,0,2,0],2))}}const G0=new V0;class W0{constructor(t){this._mesh=new dt(G0,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,H0)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class zl{constructor(t,e=!1){this.renderer=t,this.lowQ=e,this.quad=new W0,this.targets=new Map,this.brightMat=new Je({uniforms:{tDiffuse:{value:null},threshold:{value:1}},vertexShader:$r,fragmentShader:`uniform sampler2D tDiffuse; uniform float threshold; varying vec2 vUv;
        void main(){ vec3 c = texture2D(tDiffuse, vUv).rgb; float l = dot(c, vec3(0.2126,0.7152,0.0722));
          float k = smoothstep(threshold, threshold + 0.6, l); gl_FragColor = vec4(c * k, 1.0); }`}),this.blurMat=new Je({uniforms:{tDiffuse:{value:null},dir:{value:new et(1,0)},texel:{value:new et(1/256,1/256)}},vertexShader:$r,fragmentShader:`uniform sampler2D tDiffuse; uniform vec2 dir; uniform vec2 texel; varying vec2 vUv;
        void main(){ vec2 o = dir * texel; vec3 c = texture2D(tDiffuse, vUv).rgb * 0.227;
          c += (texture2D(tDiffuse, vUv + o*1.385).rgb + texture2D(tDiffuse, vUv - o*1.385).rgb) * 0.316;
          c += (texture2D(tDiffuse, vUv + o*3.23).rgb + texture2D(tDiffuse, vUv - o*3.23).rgb) * 0.070;
          gl_FragColor = vec4(c, 1.0); }`}),this.compMat=new Je({uniforms:{tDiffuse:{value:null},tBloom:{value:null},bloom:{value:.55},vignette:{value:0},red:{value:0},flash:{value:0},dark:{value:0},exposure:{value:1.05},wet:{value:0},wash:{value:0},wetT:{value:0},wetSeed:{value:0},aspect:{value:1}},defines:e?{LOWQ:1}:{},vertexShader:$r,fragmentShader:`uniform sampler2D tDiffuse; uniform sampler2D tBloom; uniform float bloom, vignette, red, flash, dark, exposure;
        uniform float wet, wash, wetT, wetSeed, aspect; varying vec2 vUv;
        vec3 aces(vec3 x){ return clamp((x*(2.51*x+0.03))/(x*(2.43*x+0.59)+0.14), 0.0, 1.0); }
        float h21(vec2 p){ p = fract(p * vec2(123.34, 456.21) + wetSeed); p += dot(p, p + 45.32); return fract(p.x * p.y); }
        // one layer of lens droplets. acc: xy = refraction offset, z = coverage, w = dark rim; spec = glint.
        // Big drops run down and leave a wet trail; everything fades as it dries.
        void dropLayer(vec2 p, float t, float salt, inout vec4 acc, inout float spec){
          vec2 ip = floor(p);
          for (int j = -1; j <= 3; j++) {
            for (int i = -1; i <= 1; i++) {
              vec2 id = ip + vec2(float(i), float(j));
              if (h21(id + salt) < 0.5) continue;
              float n1 = h21(id + salt + 3.7), n2 = h21(id + salt + 9.1), n3 = h21(id + salt + 1.3);
              float r = mix(0.1, 0.3, n1 * n1);
              float big = smoothstep(0.2, 0.27, r);
              float slide = min(3.0, t * mix(0.04, 1.15, big) * (0.55 + n3) * smoothstep(0.0, 0.3, t));
              vec2 c = id + vec2(0.25 + 0.5 * n2, 0.25 + 0.5 * n3) - vec2(0.0, slide);
              vec2 d = p - c;
              d.y *= mix(1.0, 0.8, big * smoothstep(0.0, 0.3, slide)); // running drops stretch a little
              vec2 q = d / r;
              float l = length(q);
              float fade = 1.0 - smoothstep(2.3, 3.0, slide);
              if (l < 1.0) {
                float m = smoothstep(1.0, 0.9, l) * fade;
                // a drop acts like a tiny lens: it shows the scene flipped from the opposite side
                acc.xy -= q * m * (1.2 - 0.4 * l * l);
                acc.z = max(acc.z, m);
                acc.w = max(acc.w, smoothstep(0.62, 0.95, l) * m);
                spec = max(spec, smoothstep(0.2, 0.02, length(q - vec2(-0.34, 0.4))) * m);
              }
              // wet trail above a running drop
              float ty = p.y - c.y;
              if (big > 0.0 && ty > 0.0 && ty < slide) {
                float tx = abs(p.x - c.x) / (r * 0.3);
                if (tx < 1.0) {
                  float m = (1.0 - tx * tx) * (1.0 - ty / slide) * 0.6 * big * fade;
                  acc.x -= sign(p.x - c.x) * tx * m * 0.7;
                  acc.z = max(acc.z, m * 0.8);
                }
              }
            }
          }
        }
        void main(){
          vec2 uv = vUv;
          vec4 dr = vec4(0.0); float spec = 0.0;
          if (wet > 0.002 || wash > 0.002) {
            vec2 a = vec2(vUv.x * aspect, vUv.y);
            dropLayer(a * 7.5, wetT, 0.0, dr, spec);
            #ifndef LOWQ
            vec4 d2 = vec4(0.0); float s2 = 0.0;
            dropLayer(a * 14.0 + 7.3, wetT * 0.5, 31.0, d2, s2);
            dr.xy += d2.xy * 0.6; dr.z = max(dr.z, d2.z * 0.85); dr.w = max(dr.w, d2.w * 0.7); spec = max(spec, s2 * 0.8);
            #endif
            vec2 off = dr.xy * 0.022 * wet;
            // the sheet of water right after the splash: wobbling refraction
            off += vec2(sin(vUv.y * 21.0 + wetT * 11.0 + wetSeed), cos(vUv.x * 17.0 * aspect - wetT * 8.0)) * 0.016 * wash;
            uv = clamp(vUv + off, 0.001, 0.999);
          }
          vec3 s0 = texture2D(tDiffuse, uv).rgb;
          #ifndef LOWQ
          if (wash > 0.02) { // smeared by the sheet of water
            float rr = 0.012 * wash;
            vec3 b = s0 + texture2D(tDiffuse, uv + vec2(rr, rr * 0.6)).rgb + texture2D(tDiffuse, uv - vec2(rr, rr * 0.6)).rgb
                   + texture2D(tDiffuse, uv + vec2(-rr * 0.6, rr)).rgb + texture2D(tDiffuse, uv + vec2(rr * 0.6, -rr)).rgb;
            s0 = mix(s0, b / 5.0, min(1.0, wash * 1.3));
          }
          #endif
          vec3 c = s0 * exposure;
          c += texture2D(tBloom, uv).rgb * bloom;
          c = aces(c);
          // water on the lens: murky tint under the sheet, droplets catch a little light and a highlight
          c = mix(c, c * vec3(0.8, 0.95, 0.9) + vec3(0.03, 0.06, 0.05), wash * 0.4);
          c = mix(c, c * 1.05 + vec3(0.02, 0.03, 0.035), dr.z * wet * 0.3);
          c *= 1.0 - dr.w * wet * 0.16;
          c += vec3(0.95, 0.97, 1.0) * spec * wet * 0.32;
          // low contrast, warm grade
          c = mix(vec3(0.5), c, 0.88);
          c *= vec3(1.04, 1.0, 0.92);
          c += vec3(0.03, 0.025, 0.0);
          // red alarm tint (crushing walls / jumpscare)
          c = mix(c, c * vec3(1.15, 0.45, 0.35) + vec3(0.18, 0.02, 0.0), red);
          // vignette: base + monster proximity
          vec2 q = vUv - 0.5; float r = dot(q, q);
          float v = 1.0 - smoothstep(0.18, 0.6, r) * (0.35 + vignette * 0.75);
          c *= v;
          c = mix(c, vec3(0.0), dark);
          c = mix(c, vec3(1.0), flash);
          // linear -> sRGB
          c = pow(max(c, 0.0), vec3(1.0 / 2.2));
          gl_FragColor = vec4(c, 1.0);
        }`})}_targets(t,e,n){let i=this.targets.get(t);if(i&&i.w===e&&i.h===n)return i;i&&(i.scene.dispose(),i.a.dispose(),i.b.dispose());const r=new fn(e,n,{type:Kn,depthBuffer:!0,samples:this.lowQ?0:2}),a=Math.max(8,Math.floor(e/4)),o=Math.max(8,Math.floor(n/4)),l=new fn(a,o,{type:Kn,depthBuffer:!1}),c=new fn(a,o,{type:Kn,depthBuffer:!1});return i={scene:r,a:l,b:c,w:e,h:n,bw:a,bh:o},this.targets.set(t,i),i}render(t,e,n,i,r=0){const a=this.renderer,o=a.getPixelRatio(),l=Math.max(2,Math.floor(n.w*o)),c=Math.max(2,Math.floor(n.h*o)),h=this._targets(r,l,c);a.setScissorTest(!1),a.setRenderTarget(h.scene),a.clear(),a.render(t,e),this.brightMat.uniforms.tDiffuse.value=h.scene.texture,a.setRenderTarget(h.a),this.quad.material=this.brightMat,this.quad.render(a),this.blurMat.uniforms.texel.value.set(1/h.bw,1/h.bh);const u=this.lowQ?1:2;for(let p=0;p<u;p++)this.blurMat.uniforms.tDiffuse.value=h.a.texture,this.blurMat.uniforms.dir.value.set(1,0),a.setRenderTarget(h.b),this.quad.material=this.blurMat,this.quad.render(a),this.blurMat.uniforms.tDiffuse.value=h.b.texture,this.blurMat.uniforms.dir.value.set(0,1),a.setRenderTarget(h.a),this.quad.render(a);const d=this.compMat.uniforms;d.tDiffuse.value=h.scene.texture,d.tBloom.value=h.a.texture,d.bloom.value=i.bloom??.55,d.vignette.value=i.vignette??0,d.red.value=i.red??0,d.flash.value=i.flash??0,d.dark.value=i.dark??0,d.wet.value=i.wet??0,d.wash.value=i.wash??0,d.wetT.value=i.wetT??0,d.wetSeed.value=i.wetSeed??0,d.aspect.value=n.w/Math.max(1,n.h),a.setRenderTarget(null),a.setViewport(n.x,n.y,n.w,n.h),a.setScissor(n.x,n.y,n.w,n.h),a.setScissorTest(!0),this.quad.material=this.compMat,this.quad.render(a),a.setScissorTest(!1),a.setViewport(0,0,n.w,n.h)}dispose(){for(const t of this.targets.values())t.scene.dispose(),t.a.dispose(),t.b.dispose();this.targets.clear()}}const $r="varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }";class X0{constructor(){this.ctx=null,this.volume=.8,this.muted=!1,this.dripTimer=2,this.rumble=null,this.rumbleTarget=0,this.alarmTimer=0,this.heartTimer=0,this._listenerPos={x:0,y:0,z:0}}init(){if(this.ctx)return;const t=window.AudioContext||window.webkitAudioContext;if(!t)return;const e=this.ctx=new t;this.master=e.createGain(),this.master.gain.value=this.muted?0:this.volume,this.master.connect(e.destination),this.dry=e.createGain(),this.dry.connect(this.master),this.convolver=e.createConvolver(),this.convolver.buffer=this._impulse(3.8,2.6),this.wet=e.createGain(),this.wet.gain.value=.55,this.convolver.connect(this.wet),this.wet.connect(this.master),this.noiseBuf=this._noise(2,"white"),this.brownBuf=this._noise(3,"brown"),this._ambient()}resume(){this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume()}setVolume(t){this.volume=t,this._applyMaster()}setMuted(t){this.muted=!!t,this._applyMaster()}_applyMaster(){if(!this.master)return;const t=this.master.gain,e=this.ctx.currentTime,n=this.muted?0:this.volume;t.cancelScheduledValues(e),t.setValueAtTime(t.value,e),t.linearRampToValueAtTime(n,e+.05)}_impulse(t,e){const n=this.ctx,i=n.sampleRate,r=Math.floor(i*t),a=n.createBuffer(2,r,i);for(let o=0;o<2;o++){const l=a.getChannelData(o);for(let c=0;c<r;c++){const h=c/r;l[c]=(Math.random()*2-1)*Math.pow(1-h,e)*(1+.4*Math.sin(c*7e-4))}}return a}_noise(t,e){const n=this.ctx,i=n.sampleRate,r=Math.floor(i*t),a=n.createBuffer(1,r,i),o=a.getChannelData(0);let l=0;for(let c=0;c<r;c++){const h=Math.random()*2-1;e==="brown"?(l=(l+.02*h)/1.02,o[c]=l*3.5):o[c]=h}return a}_out(t,e=.3,n=null){let i=t;if(n){const r=this.ctx.createPanner();r.panningModel="equalpower",r.distanceModel="inverse",r.refDistance=3,r.maxDistance=120,r.rolloffFactor=1.1,this._setPos(r,n),t.connect(r),i=r}if(i.connect(this.dry),e>0){const r=this.ctx.createGain();r.gain.value=e,i.connect(r),r.connect(this.convolver)}}_setPos(t,e){const n=this.ctx.currentTime;t.positionX?(t.positionX.setValueAtTime(e.x,n),t.positionY.setValueAtTime(e.y,n),t.positionZ.setValueAtTime(e.z,n)):t.setPosition(e.x,e.y,e.z)}setListener(t,e,n){if(!this.ctx)return;this._listenerPos=t;const i=this.ctx.listener,r=this.ctx.currentTime;i.positionX?(i.positionX.setValueAtTime(t.x,r),i.positionY.setValueAtTime(t.y,r),i.positionZ.setValueAtTime(t.z,r),i.forwardX.setValueAtTime(e.x,r),i.forwardY.setValueAtTime(e.y,r),i.forwardZ.setValueAtTime(e.z,r),i.upX.setValueAtTime(n.x,r),i.upY.setValueAtTime(n.y,r),i.upZ.setValueAtTime(n.z,r)):(i.setPosition(t.x,t.y,t.z),i.setOrientation(e.x,e.y,e.z,n.x,n.y,n.z))}_env(t,e,n,i,r,a=0){const o=t.gain;o.setValueAtTime(1e-4,e),o.exponentialRampToValueAtTime(Math.max(n,2e-4),e+i),a>0&&o.setValueAtTime(Math.max(n,2e-4),e+i+a),o.exponentialRampToValueAtTime(1e-4,e+i+a+r)}_burst(t,{dur:e=.2,gain:n=.3,filter:i="lowpass",f0:r=2e3,f1:a=null,q:o=.8,wet:l=.3,pos:c=null,attack:h=.005,rate:u=1}){if(!this.ctx)return;const d=this.ctx,p=d.currentTime,g=d.createBufferSource();g.buffer=t,g.loop=!0,g.playbackRate.value=u;const v=d.createBiquadFilter();v.type=i,v.Q.value=o,v.frequency.setValueAtTime(r,p),a!=null&&v.frequency.exponentialRampToValueAtTime(a,p+e);const m=d.createGain();this._env(m,p,n,h,e),g.connect(v).connect(m),this._out(m,l,c),g.start(p),g.stop(p+e+h+.05)}_tone({type:t="sine",f0:e=440,f1:n=null,dur:i=.3,gain:r=.2,attack:a=.005,wet:o=.3,pos:l=null,detune:c=0}){if(!this.ctx)return;const h=this.ctx,u=h.currentTime,d=h.createOscillator();d.type=t,d.detune.value=c,d.frequency.setValueAtTime(e,u),n!=null&&d.frequency.exponentialRampToValueAtTime(Math.max(n,1),u+i);const p=h.createGain();return this._env(p,u,r,a,i),d.connect(p),this._out(p,o,l),d.start(u),d.stop(u+a+i+.05),d}_ambient(){const t=this.ctx,e=t.createBufferSource();e.buffer=this.brownBuf,e.loop=!0;const n=t.createBiquadFilter();n.type="lowpass",n.frequency.value=160;const i=t.createGain();i.gain.value=.09,e.connect(n).connect(i),this._out(i,.5),e.start();const r=t.createOscillator();r.type="sine",r.frequency.value=55;const a=t.createOscillator();a.type="sine",a.frequency.value=55.7;const o=t.createGain();o.gain.value=.025,r.connect(o),a.connect(o),this._out(o,.3),r.start(),a.start();const l=t.createBufferSource();l.buffer=this.brownBuf,l.loop=!0,l.playbackRate.value=.7;const c=t.createBiquadFilter();c.type="lowpass",c.frequency.value=90,this.rumble=t.createGain(),this.rumble.gain.value=0,l.connect(c).connect(this.rumble),this._out(this.rumble,.2),l.start()}update(t,e={}){if(!this.ctx)return;if(this.dripTimer-=t,this.dripTimer<=0){this.dripTimer=1.5+Math.random()*5;const i={x:this._listenerPos.x+(Math.random()-.5)*30,y:2,z:this._listenerPos.z+(Math.random()-.5)*30};this._tone({f0:1400+Math.random()*900,f1:600,dur:.12,gain:.08,wet:.95,pos:i})}const n=e.rumble||0;this.rumble.gain.value+=(n*.35-this.rumble.gain.value)*Math.min(1,t*4),e.inRed&&(this.alarmTimer-=t,this.alarmTimer<=0&&(this.alarmTimer=.5,this._tone({type:"square",f0:620,dur:.12,gain:.05,wet:.2}))),e.down&&(this.heartTimer-=t,this.heartTimer<=0&&(this.heartTimer=1,this._tone({f0:70,f1:40,dur:.18,gain:.3,wet:.1}),setTimeout(()=>this._tone({f0:60,f1:35,dur:.16,gain:.22,wet:.1}),180)))}footstep(t=!0){this._burst(this.noiseBuf,{dur:.07,gain:.07,filter:"bandpass",f0:900+Math.random()*500,q:1.2,wet:.25}),t&&this._burst(this.noiseBuf,{dur:.04,gain:.03,filter:"highpass",f0:4e3,wet:.2})}slosh(){this._burst(this.noiseBuf,{dur:.28,gain:.12,filter:"lowpass",f0:1100,f1:300,wet:.45,attack:.03})}splash(t=!0,e=null){const n=t?.75:.28;this._burst(this.noiseBuf,{dur:t?.7:.35,gain:n,filter:"lowpass",f0:5e3,f1:300,wet:.7,pos:e,attack:.004}),this._burst(this.noiseBuf,{dur:.15,gain:n*.5,filter:"highpass",f0:2500,wet:.5,pos:e}),t&&this._tone({f0:95,f1:38,dur:.35,gain:.35,wet:.3,pos:e})}growl(t){if(!this.ctx)return;const e=this.ctx,n=e.currentTime,i=e.createOscillator();i.type="sawtooth",i.frequency.setValueAtTime(62,n),i.frequency.linearRampToValueAtTime(48,n+1.3);const r=e.createOscillator();r.frequency.value=7;const a=e.createGain();a.gain.value=.5;const o=e.createGain();o.gain.value=.5,r.connect(a).connect(o.gain);const l=e.createBiquadFilter();l.type="lowpass",l.frequency.value=320;const c=e.createGain();this._env(c,n,.35,.15,1.3),i.connect(o).connect(l).connect(c),this._out(c,.5,t),i.start(n),r.start(n),i.stop(n+1.6),r.stop(n+1.6)}heardStinger(){this._tone({f0:46,dur:1.4,gain:.4,attack:.5,wet:.4}),this._tone({f0:49,dur:1.4,gain:.25,attack:.5,wet:.4}),this._burst(this.brownBuf,{dur:1.2,gain:.2,filter:"lowpass",f0:200,wet:.5,attack:.4})}monsterStep(t,e=1,n=!0){this._tone({f0:120,f1:60,dur:.09,gain:.35*e,wet:.35,pos:t}),n&&this._burst(this.noiseBuf,{dur:.08,gain:.2*e,filter:"bandpass",f0:1800,q:.7,wet:.4,pos:t})}chitter(t){if(!this.ctx)return;const e=5+Math.floor(Math.random()*6);for(let n=0;n<e;n++)setTimeout(()=>this._burst(this.noiseBuf,{dur:.025,gain:.22,filter:"bandpass",f0:1400+Math.random()*1200,q:4,wet:.45,pos:t}),n*(38+Math.random()*30))}breath(t){this._burst(this.noiseBuf,{dur:.9,gain:.16,filter:"lowpass",f0:900,f1:250,wet:.35,pos:t,attack:.25}),this._tone({type:"sawtooth",f0:44,f1:38,dur:.9,gain:.07,wet:.3,pos:t,attack:.3})}screech(){if(!this.ctx)return;const t=this.ctx,e=t.currentTime,n=t.createOscillator();n.type="square",n.frequency.setValueAtTime(900,e),n.frequency.exponentialRampToValueAtTime(2600,e+.12),n.frequency.exponentialRampToValueAtTime(1200,e+.5);const i=t.createGain();this._env(i,e,.28,.005,.5),n.connect(i),this._out(i,.5),n.start(e),n.stop(e+.6),this._burst(this.noiseBuf,{dur:.4,gain:.3,filter:"highpass",f0:3e3,wet:.5})}riser(){this._tone({type:"sawtooth",f0:70,f1:520,dur:.45,gain:.22,attack:.05,wet:.5}),this._burst(this.noiseBuf,{dur:.5,gain:.3,filter:"bandpass",f0:400,f1:3500,q:1.2,wet:.5,attack:.1})}impact(){this._tone({f0:70,f1:18,dur:.9,gain:1,wet:.2}),this._burst(this.brownBuf,{dur:.35,gain:.8,filter:"lowpass",f0:600,f1:80,wet:.4,attack:.002}),this._burst(this.noiseBuf,{dur:.12,gain:.4,filter:"highpass",f0:2500,wet:.3})}monsterHiss(t){this._burst(this.noiseBuf,{dur:.6,gain:.25,filter:"bandpass",f0:2600,f1:1200,q:2,wet:.5,pos:t,attack:.1})}scream(){if(!this.ctx)return;const t=this.ctx,e=t.currentTime,n=t.createOscillator();n.type="sawtooth",n.frequency.setValueAtTime(380,e),n.frequency.exponentialRampToValueAtTime(1500,e+.25),n.frequency.exponentialRampToValueAtTime(700,e+1.2);const i=t.createOscillator();i.type="square",i.frequency.setValueAtTime(190,e),i.frequency.exponentialRampToValueAtTime(760,e+.3),i.frequency.exponentialRampToValueAtTime(330,e+1.2);const r=t.createWaveShaper(),a=new Float32Array(256);for(let l=0;l<256;l++){const c=l/128-1;a[l]=Math.tanh(c*6)}r.curve=a;const o=t.createGain();this._env(o,e,.55,.01,1.3),n.connect(r),i.connect(r),r.connect(o),this._out(o,.6),n.start(e),i.start(e),n.stop(e+1.4),i.stop(e+1.4),this._burst(this.noiseBuf,{dur:1.1,gain:.45,filter:"bandpass",f0:2500,f1:900,q:.6,wet:.5}),this._tone({f0:65,f1:24,dur:1.6,gain:.9,wet:.3})}ding(t=0){this._tone({f0:1046*Math.pow(2,t%4/12),dur:.7,gain:.18,wet:.7}),this._tone({f0:1568,dur:.4,gain:.07,wet:.7})}tick(t){this._tone({type:"square",f0:t?1300:950,dur:.035,gain:.07,wet:.2})}shutter(){this._burst(this.noiseBuf,{dur:.03,gain:.25,filter:"highpass",f0:3e3,wet:.1}),setTimeout(()=>this._tone({type:"square",f0:2400,dur:.03,gain:.08}),60)}whoosh(){this._burst(this.noiseBuf,{dur:.25,gain:.12,filter:"bandpass",f0:300,f1:1400,q:1.5,wet:.2,attack:.03})}clack(t){this._burst(this.noiseBuf,{dur:.04,gain:.25,filter:"highpass",f0:2500,wet:.4,pos:t}),this._tone({f0:2200,f1:1500,dur:.05,gain:.1,wet:.4,pos:t})}glass(t){this._burst(this.noiseBuf,{dur:.45,gain:.4,filter:"highpass",f0:2800,wet:.6,pos:t});for(let e=0;e<5;e++)setTimeout(()=>this._tone({f0:2e3+Math.random()*3500,dur:.12,gain:.08,wet:.6,pos:t}),e*40)}pickup(){this._tone({f0:880,dur:.1,gain:.12}),setTimeout(()=>this._tone({f0:1320,dur:.15,gain:.12}),80)}coin(){this._tone({type:"triangle",f0:1760,dur:.12,gain:.1}),setTimeout(()=>this._tone({type:"triangle",f0:2349,dur:.18,gain:.1}),70)}ui(){this._tone({f0:1e3,dur:.04,gain:.08})}escapeChord(){[261.6,329.6,392,523.3,659.3].forEach((t,e)=>this._tone({f0:t,dur:4.5,gain:.16-e*.02,attack:1.2,wet:.85}))}memoryStart(){this._tone({f0:523,dur:.3,gain:.12,wet:.5})}collapse(t){this._burst(this.brownBuf,{dur:.5,gain:.3,filter:"lowpass",f0:500,f1:120,wet:.5,pos:t})}doorOpen(){this._tone({f0:180,f1:90,dur:1.2,gain:.3,wet:.7}),this._burst(this.brownBuf,{dur:1,gain:.25,filter:"lowpass",f0:400,wet:.6})}denied(){this._tone({type:"square",f0:220,dur:.18,gain:.08}),setTimeout(()=>this._tone({type:"square",f0:180,dur:.25,gain:.08}),160)}push(){this._burst(this.noiseBuf,{dur:.15,gain:.3,filter:"lowpass",f0:900,f1:200,wet:.3}),this._tone({f0:140,f1:60,dur:.2,gain:.3})}revive(){this._tone({f0:440,dur:.3,gain:.15,wet:.5}),setTimeout(()=>this._tone({f0:660,dur:.5,gain:.15,wet:.5}),150)}}const Oc=[{code:"en",name:"English"},{code:"tr",name:"Türkçe"},{code:"ru",name:"Русский"},{code:"ar",name:"العربية",rtl:!0},{code:"es",name:"Español"},{code:"pt",name:"Português (Brasil)"},{code:"ja",name:"日本語"},{code:"ko",name:"한국어"}],Oe={};Oe.en={tagline:"Don't fall in. Don't make a sound. It hears you.",mode:"MODE",solo:"SOLO",duo:"2P SPLIT SCREEN",duoShort:"2P",player1:"1 PLAYER",player2:"2 PLAYERS",roomsCleared:"Rooms cleared: {n}/9",difficulty:"DIFFICULTY",easy:"EASY",normal:"NORMAL",hard:"HARD",play:"PLAY",upgrades:"UPGRADES",settings:"SETTINGS",how:"HOW TO PLAY",coins:"coins",board:"BEST TIMES",boardFoot:"Top 10 · saved on this device",boardEmpty:"No escapes yet",bestLine:"BEST TIME = {t}",menuFoot:"WASD move · Mouse look · Space jump · Shift sprint · 1-7 items · LMB throw · RMB SNAP · Q push · E interact · B bleed out · V 3rd person",hintEasy:"Short sections, lots of platforms, a slow hunter.",hintNormal:"Fewer platforms, shorter timers, a faster hunter.",hintHard:"3 hunters, a wide hearing radius, mixed room rules. Unlocks after finishing Normal twice.",hardLocked:"HARD is locked: finish Normal twice ({n}/2).",setTitle:"SETTINGS",setSens:"Mouse sensitivity",setFov:"Field of view (FOV)",setVol:"Volume",setPush:"Friendly PUSH (you can shove your partner in 2P)",setShake:"Camera shake",setLowQ:"Low quality (fewer shadows / less bloom)",setLang:"Language",langAuto:"Auto (browser language)",resetSave:"RESET SAVE",back:"BACK",confirmReset:"Delete all progress (coins, times, unlocks)?",upTitle:"UPGRADES",upMax:"MAX",upPebble:"Extra pebble",upPebbleD:"Start each run with +1 pebble (max 3 levels)",upBleed:"Thick skin",upBleedD:"Bleed-out time +5 s (max 2 levels)",upQuiet:"Quiet swimmer",upQuietD:"Swimming noise 15 m → 11 m",upPush:"Fast push",upPushD:"PUSH cooldown 8 s → 5 s",howTitle:"HOW TO PLAY",how1:"One rule: don't fall in the water. A splash calls the hunter to that spot (40 m). Moving in water leaves a 15 m trail every 1.5 s.",how2:"The hunter is blind and only moves on the water. It cannot notice someone standing still in the middle of a tile, but it grabs anyone within ~2 m of an edge straight out of the water.",how3:"Throw pebbles (25 m) and the bottle (35 m) to lure it away. Gear is picked up out in the rooms.",how4:"Camera: in Locked Exit, SNAP the 4 numbers painted on the pillars; once the CODE is complete, walk to the door and press E.",how5:"9 rooms in a fixed order: Pillar Hall → Broken Walkway → Sinking → Rotating Bridge → Moving → Drifting → Memory Bridge → Crushing Walls → Locked Exit. Tunnels are checkpoints.",how6:"2P: P1 uses WASD, P2 the arrow keys. Up/down walk where you look, left/right turn the camera; no mouse needed. Hold E (P1) / O (P2) next to a downed partner for 3 s to revive them. If both go down, back to the checkpoint.",pause:"PAUSED",resume:"RESUME",mainMenu:"MAIN MENU",escaped:"YOU ESCAPED",rewards:"REWARDS",total:"TOTAL",dblTitle:"DOUBLE THIS RUN'S COINS",runCoins:"Run coins",dbl:"DOUBLE",noThanks:"No thanks",playAgain:"PLAY AGAIN",lobby:"RETURN TO LOBBY",autoNext:"Next run starts automatically in {n}s",rRooms:"Rooms cleared",rEscape:"Escape",rFirst:"First escape bonus",rDaily:"Daily bonus",rPicked:"Coins picked up",easyHalf:"EASY pays half coins.",youHave:"You now have {n} coins.",recFirst:"★ First escape on this difficulty!",recNew:"★ NEW RECORD! {d} faster than your best",recBest:"Best: {t} (+{d}) · Rank #{r}",watchingAd:"Watching ad… {n}",loadingAd:"Loading ad…",watchingAdDots:"Watching ad…",added:"+{n} added ✓",noReward:"No reward — ad not completed",adNotCompleted:"Ad not completed — no bonus. You can try again.",push:"PUSH",code:"CODE",snap:"SNAP",hintP1:"WASD move · Space jump · Shift sprint · 1-3 items · LMB use · RMB SNAP · Q push · E interact",hintDuo1:"W/S walk · A/D turn · Space jump · L-Shift run · F use · R SNAP · Q push · E revive · 1-3 items",hintDuo2:"↑/↓ walk · ←/→ turn · Enter jump · R-Shift run · L use · K SNAP · M push · O revive · 8-9-0 items",hintTouch:"Left stick to move · drag the right side to look",goThisWay:"GO THIS WAY",tJump:"JUMP",tUse:"USE",tPush:"PUSH",tRun:"RUN",enterCode:"E: Enter the code",enterCodeTouch:"USE: Enter the code",keypadLocked:"Keypad locked — find the numbers ({n}/4)",keypadWants:"The keypad wants all 4 numbers",holdRevive:"Hold E to revive {name}",backUp:"{name} is back up",splash:"SPLASH!",bottleShatter:"Bottle shattered",pebbleSplash:"Pebble splash",plusPebble:"+1 pebble",gotBottle:"Bottle: strong distraction (35 m)",gotCamera:"Camera: SNAP the numbers on the pillars",roomCleared:"Room cleared +{n} 🪙",photo:"Photo: {d} → CODE slot {s}",pushedYou:"{name} pushed you!",pushedBack:"Pushed it back!",partner:"Partner",introSub:"Your gear is out there. Head for the tunnel. Stay dry.",checkpoint:"CHECKPOINT",checkpointSub:"Back on dry tiles. It is still listening.",codeComplete:"CODE COMPLETE",codeCompleteSub:"Get to the exit door and press E",memory:"MEMORY BRIDGE",watch:"WATCH THE TILES",remember:"REMEMBER THEM",rememberSub:"Only the tiles that glowed are safe",getOut:"GET OUT OF THE RED",wallComing:"THE WALL IS COMING",bledOut:"BLED OUT",bledOutSub:"You respawn at the next checkpoint",down:"YOU'RE DOWN",downSolo:"Bleeding out… you restart from the checkpoint when the bar empties.",downDuo:"Your partner can revive you — they hold E (P1) / O (P2) next to you for 3 s.",rescue:"REVIVE",bleedOut:"RESTART",rooms:{pillar:["PILLAR HALL","Jump between the platforms. Reach the exit."],broken:["BROKEN WALKWAY","Narrow ledges with short jumps, or wide platforms with long jumps."],sinking:["SINKING PLATFORMS","Platforms sink while you stand on them. Keep moving. Dark-bordered platforms are safe."],rotating:["ROTATING BRIDGE","Ride the rotating bridges. Time your jumps onto the platforms."],moving:["MOVING PLATFORMS","Every platform moves. Time your jumps."],drifting:["DRIFTING PLATFORMS","The arrows push you. Don't get carried into the water."],memory:["MEMORY BRIDGE","Watch for the safe tiles to light up. Remember them."],crushing:["CRUSHING WALLS","The walls slide in and shove you into the water. One lane always stays open."],locked:["LOCKED EXIT","Find the 4 numbers on the pillars. Take a photo of each with your camera."]}};Oe.tr={tagline:"Suya düşme. Ses çıkarma. Seni duyar.",mode:"MOD",solo:"SOLO",duo:"2P BÖLÜNMÜŞ EKRAN",duoShort:"2P",player1:"1 OYUNCU",player2:"2 OYUNCU",roomsCleared:"Geçilen oda: {n}/9",difficulty:"ZORLUK",easy:"KOLAY",normal:"NORMAL",hard:"ZOR",play:"OYNA",upgrades:"GELİŞTİRMELER",settings:"AYARLAR",how:"NASIL OYNANIR",coins:"coin",board:"EN İYİ SÜRE",boardFoot:"İlk 10 · bu cihazda saklanır",boardEmpty:"Henüz kaçış yok",bestLine:"EN İYİ SÜRE = {t}",menuFoot:"WASD hareket · Fare bakış · Space zıpla · Shift koş · 1-7 eşya · Sol tık fırlat · Sağ tık SNAP · Q push · E etkileşim · B bleed out · V 3. şahıs",hintEasy:"Kısa bölümler, bol platform, yavaş canavar.",hintNormal:"Daha az platform, daha kısa süreler, daha hızlı canavar.",hintHard:"3 canavar, geniş duyma yarıçapı, karışık oda kuralları. Normal'i 2 kez bitirince açılır.",hardLocked:"ZOR kilitli: Normal'i 2 kez bitir ({n}/2).",setTitle:"AYARLAR",setSens:"Fare hassasiyeti",setFov:"Görüş açısı (FOV)",setVol:"Ses",setPush:"Dostça PUSH (2P'de ortağını itebilirsin)",setShake:"Kamera titremesi",setLowQ:"Düşük kalite (daha az gölge / bloom)",setLang:"Dil",langAuto:"Otomatik (tarayıcı dili)",resetSave:"KAYDI SIFIRLA",back:"GERİ",confirmReset:"Tüm ilerleme silinsin mi (coin, süreler, kilitler)?",upTitle:"GELİŞTİRMELER",upMax:"MAKS",upPebble:"Ekstra çakıl",upPebbleD:"Her tura +1 çakıl taşıyla başla (maks 3 kademe)",upBleed:"Kalın deri",upBleedD:"Kanama süresi +5 sn (maks 2 kademe)",upQuiet:"Sessiz yüzücü",upQuietD:"Yüzme sesi 15 m → 11 m",upPush:"Hızlı push",upPushD:"PUSH bekleme süresi 8 sn → 5 sn",howTitle:"NASIL OYNANIR",how1:"Tek kural: suya düşme. Splash sesi canavarı o noktaya çeker (40 m). Suda hareket her 1,5 sn'de 15 m'lik iz bırakır.",how2:"Canavar kördür ve yalnızca suda gezer. Platformun ortasında sessiz duranı fark etmez; kenara ~2 m yaklaşanı sudan uzanıp yakalar.",how3:"Çakıl taşı (25 m) ve şişe (35 m) fırlatıp canavarı başka yere çek. Eşyalar odalarda toplanır.",how4:"Kamera: Locked Exit'te sütunlardaki 4 rakamı SNAP ile fotoğrafla; CODE kutusu dolunca kapıya git ve E'ye bas.",how5:"9 oda sırayla: Pillar Hall → Broken Walkway → Sinking → Rotating Bridge → Moving → Drifting → Memory Bridge → Crushing Walls → Locked Exit. Tüneller checkpoint'tir.",how6:"2P: P1 WASD, P2 ok tuşlarını kullanır. Yukarı/aşağı baktığın yöne yürür, sağ/sol kamerayı döndürür; fare gerekmez. Düşen ortağın yanında E (P1) / O (P2) tuşuna 3 sn basılı tutarak kaldır. İkisi de düşerse checkpoint.",pause:"DURAKLATILDI",resume:"DEVAM",mainMenu:"ANA MENÜ",escaped:"KAÇTIN",rewards:"ÖDÜLLER",total:"TOPLAM",dblTitle:"BU TURUN COİNLERİNİ İKİYE KATLA",runCoins:"Tur coini",dbl:"İKİYE KATLA",noThanks:"Hayır, teşekkürler",playAgain:"TEKRAR OYNA",lobby:"LOBİYE DÖN",autoNext:"Yeni tur {n} sn sonra otomatik başlar",rRooms:"Geçilen odalar",rEscape:"Kaçış",rFirst:"İlk kaçış bonusu",rDaily:"Günlük bonus",rPicked:"Toplanan coin",easyHalf:"KOLAY yarım coin öder.",youHave:"Artık {n} coinin var.",recFirst:"★ Bu zorlukta ilk kaçış!",recNew:"★ YENİ REKOR! En iyinden {d} daha hızlı",recBest:"En iyi: {t} (+{d}) · Sıra #{r}",watchingAd:"Reklam izleniyor… {n}",loadingAd:"Reklam yükleniyor…",watchingAdDots:"Reklam izleniyor…",added:"+{n} eklendi ✓",noReward:"Ödül yok — reklam tamamlanmadı",adNotCompleted:"Reklam tamamlanmadı — bonus yok. Tekrar deneyebilirsin.",push:"PUSH",code:"CODE",snap:"SNAP",hintP1:"WASD hareket · Space zıpla · Shift koş · 1-3 eşya · Sol tık kullan · Sağ tık SNAP · Q push · E etkileşim",hintDuo1:"W/S yürü · A/D dön · Space zıpla · Sol Shift koş · F kullan · R SNAP · Q push · E kaldır · 1-3 eşya",hintDuo2:"↑/↓ yürü · ←/→ dön · Enter zıpla · Sağ Shift koş · L kullan · K SNAP · M push · O kaldır · 8-9-0 eşya",hintTouch:"Sol çubuk hareket · sağ tarafı sürükleyerek bak",goThisWay:"BU YÖNE GİT",tJump:"ZIPLA",tUse:"KULLAN",tPush:"PUSH",tRun:"KOŞ",enterCode:"E: Kodu gir",enterCodeTouch:"KULLAN: Kodu gir",keypadLocked:"Tuş takımı kilitli — rakamları bul ({n}/4)",keypadWants:"Tuş takımı 4 rakamın hepsini istiyor",holdRevive:"{name} için E'ye basılı tut",backUp:"{name} yeniden ayakta",splash:"SPLASH!",bottleShatter:"Şişe kırıldı",pebbleSplash:"Çakıl suya düştü",plusPebble:"+1 çakıl",gotBottle:"Şişe: güçlü dikkat dağıtma (35 m)",gotCamera:"Kamera: sütunlardaki rakamları SNAP'le",roomCleared:"Oda geçildi +{n} 🪙",photo:"Fotoğraf: {d} → CODE hanesi {s}",pushedYou:"{name} seni itti!",pushedBack:"Geri ittin!",partner:"Ortak",introSub:"Eşyaların dışarıda. Tünele yönel. Kuru kal.",checkpoint:"CHECKPOINT",checkpointSub:"Yine kuru karolardasın. Hâlâ dinliyor.",codeComplete:"KOD TAMAM",codeCompleteSub:"Çıkış kapısına git ve E'ye bas",memory:"HAFIZA KÖPRÜSÜ",watch:"KAROLARI İZLE",remember:"ONLARI HATIRLA",rememberSub:"Yalnızca parlayan karolar güvenli",getOut:"KIRMIZIDAN ÇIK",wallComing:"DUVAR GELİYOR",bledOut:"KAN KAYBINDAN DÜŞTÜN",bledOutSub:"Bir sonraki checkpoint'te yeniden doğarsın",down:"DÜŞTÜN",downSolo:"Kan kaybediyorsun… çubuk boşalınca checkpoint'ten yeniden başlarsın.",downDuo:"Ortağın seni kaldırabilir — yanında E (P1) / O (P2) tuşuna 3 sn basılı tutsun.",rescue:"YENİDEN DOĞ",bleedOut:"YENİDEN BAŞLA",rooms:{pillar:["SÜTUN SALONU","Platformlar arasında zıpla. Çıkışa ulaş."],broken:["KIRIK YÜRÜYÜŞ YOLU","Kısa atlayışlı dar çıkıntılar ya da uzun atlayışlı geniş platformlar."],sinking:["BATAN PLATFORMLAR","Üstünde durdukça platform batar. Durma. Koyu çerçeveli platformlar güvenli."],rotating:["DÖNEN KÖPRÜ","Dönen köprülere bin. Platformlara atlayışını zamanla."],moving:["HAREKETLİ PLATFORMLAR","Her platform hareket eder. Atlayışını zamanla."],drifting:["SÜRÜKLEYEN PLATFORMLAR","Oklar seni iter. Suya sürüklenme."],memory:["HAFIZA KÖPRÜSÜ","Güvenli karoların yanmasını izle. Onları hatırla."],crushing:["EZİCİ DUVARLAR","Duvarlar kayarak gelir ve seni suya iter. Bir şerit her zaman açık kalır."],locked:["KİLİTLİ ÇIKIŞ","Sütunlardaki 4 rakamı bul. Her birini kameranla fotoğrafla."]}};Oe.ru={tagline:"Не падай в воду. Не шуми. Оно слышит тебя.",mode:"РЕЖИМ",solo:"СОЛО",duo:"2 ИГРОКА (РАЗДЕЛЁННЫЙ ЭКРАН)",duoShort:"2P",player1:"1 ИГРОК",player2:"2 ИГРОКА",roomsCleared:"Пройдено комнат: {n}/9",difficulty:"СЛОЖНОСТЬ",easy:"ЛЕГКО",normal:"НОРМАЛЬНО",hard:"СЛОЖНО",play:"ИГРАТЬ",upgrades:"УЛУЧШЕНИЯ",settings:"НАСТРОЙКИ",how:"КАК ИГРАТЬ",coins:"монет",board:"ЛУЧШЕЕ ВРЕМЯ",boardFoot:"Топ-10 · хранится на этом устройстве",boardEmpty:"Побегов пока нет",bestLine:"ЛУЧШЕЕ ВРЕМЯ = {t}",menuFoot:"WASD движение · Мышь обзор · Пробел прыжок · Shift бег · 1-7 предметы · ЛКМ бросок · ПКМ SNAP · Q толчок · E действие · B истечь кровью · V вид от 3-го лица",hintEasy:"Короткие секции, много платформ, медленный охотник.",hintNormal:"Меньше платформ, короче таймеры, быстрее охотник.",hintHard:"3 охотника, большой радиус слуха, смешанные правила комнат. Открывается после двух побед на «Нормально».",hardLocked:"СЛОЖНО закрыто: пройдите «Нормально» дважды ({n}/2).",setTitle:"НАСТРОЙКИ",setSens:"Чувствительность мыши",setFov:"Поле зрения (FOV)",setVol:"Громкость",setPush:"Дружеский PUSH (можно толкнуть напарника в 2P)",setShake:"Тряска камеры",setLowQ:"Низкое качество (меньше теней / свечения)",setLang:"Язык",langAuto:"Авто (язык браузера)",resetSave:"СБРОСИТЬ СОХРАНЕНИЕ",back:"НАЗАД",confirmReset:"Удалить весь прогресс (монеты, время, открытия)?",upTitle:"УЛУЧШЕНИЯ",upMax:"МАКС",upPebble:"Лишний камешек",upPebbleD:"Начинать забег с +1 камешком (макс. 3 уровня)",upBleed:"Толстая кожа",upBleedD:"Время кровотечения +5 с (макс. 2 уровня)",upQuiet:"Тихий пловец",upQuietD:"Шум плавания 15 м → 11 м",upPush:"Быстрый толчок",upPushD:"Перезарядка PUSH 8 с → 5 с",howTitle:"КАК ИГРАТЬ",how1:"Одно правило: не падай в воду. Всплеск зовёт охотника в эту точку (40 м). Движение в воде оставляет след на 15 м каждые 1,5 с.",how2:"Охотник слеп и плавает только по воде. Он не заметит того, кто тихо стоит в центре плиты, но схватит из воды любого ближе ~2 м к краю.",how3:"Бросай камешки (25 м) и бутылку (35 м), чтобы увести его. Предметы лежат в комнатах.",how4:"Камера: в Locked Exit сфотографируй (SNAP) 4 цифры на колоннах; когда CODE заполнен, подойди к двери и нажми E.",how5:"9 комнат по порядку: Pillar Hall → Broken Walkway → Sinking → Rotating Bridge → Moving → Drifting → Memory Bridge → Crushing Walls → Locked Exit. Туннели — контрольные точки.",how6:"2P: P1 играет на WASD, P2 — на стрелках. Вверх/вниз — идти туда, куда смотришь, влево/вправо — поворот камеры; мышь не нужна. Чтобы поднять упавшего напарника, держите E (P1) / O (P2) рядом с ним 3 с. Если упали оба — контрольная точка.",pause:"ПАУЗА",resume:"ПРОДОЛЖИТЬ",mainMenu:"ГЛАВНОЕ МЕНЮ",escaped:"ТЫ СБЕЖАЛ",rewards:"НАГРАДЫ",total:"ИТОГО",dblTitle:"УДВОИТЬ МОНЕТЫ ЗА ЗАБЕГ",runCoins:"Монеты забега",dbl:"УДВОИТЬ",noThanks:"Нет, спасибо",playAgain:"ИГРАТЬ СНОВА",lobby:"В ЛОББИ",autoNext:"Новый забег начнётся через {n} с",rRooms:"Пройдено комнат",rEscape:"Побег",rFirst:"Бонус за первый побег",rDaily:"Ежедневный бонус",rPicked:"Собрано монет",easyHalf:"На «Легко» вдвое меньше монет.",youHave:"Теперь у тебя {n} монет.",recFirst:"★ Первый побег на этой сложности!",recNew:"★ НОВЫЙ РЕКОРД! На {d} быстрее лучшего",recBest:"Лучшее: {t} (+{d}) · Место #{r}",watchingAd:"Смотрим рекламу… {n}",loadingAd:"Загрузка рекламы…",watchingAdDots:"Смотрим рекламу…",added:"+{n} добавлено ✓",noReward:"Без награды — реклама не досмотрена",adNotCompleted:"Реклама не досмотрена — бонуса нет. Можно попробовать снова.",push:"PUSH",code:"CODE",snap:"SNAP",hintP1:"WASD движение · Пробел прыжок · Shift бег · 1-3 предметы · ЛКМ использовать · ПКМ SNAP · Q толчок · E действие",hintDuo1:"W/S ходьба · A/D поворот · Пробел прыжок · Л. Shift бег · F использовать · R SNAP · Q толчок · E поднять · 1-3 предметы",hintDuo2:"↑/↓ ходьба · ←/→ поворот · Enter прыжок · П. Shift бег · L использовать · K SNAP · M толчок · O поднять · 8-9-0 предметы",hintTouch:"Левый стик — движение · тяни справа — обзор",goThisWay:"ТЕБЕ СЮДА",tJump:"ПРЫЖОК",tUse:"ДЕЙСТВИЕ",tPush:"PUSH",tRun:"БЕГ",enterCode:"E: ввести код",enterCodeTouch:"ДЕЙСТВИЕ: ввести код",keypadLocked:"Замок закрыт — найди цифры ({n}/4)",keypadWants:"Замку нужны все 4 цифры",holdRevive:"Держи E, чтобы поднять {name}",backUp:"{name} снова на ногах",splash:"ВСПЛЕСК!",bottleShatter:"Бутылка разбилась",pebbleSplash:"Камешек упал в воду",plusPebble:"+1 камешек",gotBottle:"Бутылка: сильная приманка (35 м)",gotCamera:"Камера: сфотографируй цифры на колоннах",roomCleared:"Комната пройдена +{n} 🪙",photo:"Фото: {d} → ячейка CODE {s}",pushedYou:"{name} толкнул тебя!",pushedBack:"Оттолкнул его!",partner:"Напарник",introSub:"Снаряжение ждёт впереди. Иди к туннелю. Оставайся сухим.",checkpoint:"КОНТРОЛЬНАЯ ТОЧКА",checkpointSub:"Снова на сухих плитах. Оно всё ещё слушает.",codeComplete:"КОД СОБРАН",codeCompleteSub:"Иди к выходу и нажми E",memory:"МОСТ ПАМЯТИ",watch:"СМОТРИ НА ПЛИТЫ",remember:"ЗАПОМНИ ИХ",rememberSub:"Безопасны только те плиты, что светились",getOut:"ВЫЙДИ ИЗ КРАСНОГО",wallComing:"СТЕНА ИДЁТ",bledOut:"ИСТЁК КРОВЬЮ",bledOutSub:"Ты возродишься на следующей контрольной точке",down:"ТЫ УПАЛ",downSolo:"Истекаешь кровью… когда полоса опустеет, начнёшь с контрольной точки.",downDuo:"Напарник может поднять тебя — пусть держит E (P1) / O (P2) рядом 3 с.",rescue:"ВОЗРОДИТЬСЯ",bleedOut:"ЗАНОВО",rooms:{pillar:["ЗАЛ КОЛОНН","Прыгай между платформами. Доберись до выхода."],broken:["РАЗБИТЫЙ ПРОХОД","Узкие уступы с короткими прыжками или широкие платформы с длинными."],sinking:["ТОНУЩИЕ ПЛАТФОРМЫ","Платформы тонут, пока ты на них стоишь. Не останавливайся. Платформы с тёмной рамкой безопасны."],rotating:["ВРАЩАЮЩИЙСЯ МОСТ","Катайся на вращающихся мостах. Рассчитай прыжок на платформу."],moving:["ДВИЖУЩИЕСЯ ПЛАТФОРМЫ","Каждая платформа движется. Рассчитай прыжки."],drifting:["ДРЕЙФУЮЩИЕ ПЛАТФОРМЫ","Стрелки толкают тебя. Не дай унести себя в воду."],memory:["МОСТ ПАМЯТИ","Смотри, какие плиты загорятся. Запомни их."],crushing:["ДАВЯЩИЕ СТЕНЫ","Стены надвигаются и сталкивают в воду. Одна полоса всегда открыта."],locked:["ЗАПЕРТЫЙ ВЫХОД","Найди 4 цифры на колоннах. Сфотографируй каждую камерой."]}};Oe.ar={tagline:"لا تسقط في الماء. لا تُصدر صوتًا. إنه يسمعك.",mode:"الوضع",solo:"فردي",duo:"لاعبان (شاشة مقسومة)",duoShort:"لاعبان",player1:"لاعب واحد",player2:"لاعبان",roomsCleared:"الغرف المجتازة: {n}/9",difficulty:"الصعوبة",easy:"سهل",normal:"عادي",hard:"صعب",play:"العب",upgrades:"الترقيات",settings:"الإعدادات",how:"طريقة اللعب",coins:"عملة",board:"أفضل الأوقات",boardFoot:"أفضل 10 · محفوظة على هذا الجهاز",boardEmpty:"لا هروب بعد",bestLine:"أفضل وقت = {t}",menuFoot:"WASD حركة · الفأرة نظر · مسافة قفز · Shift ركض · 1-7 أدوات · زر أيسر رمي · زر أيمن SNAP · Q دفع · E تفاعل · B نزيف · V منظور ثالث",hintEasy:"أقسام قصيرة، منصات كثيرة، صياد بطيء.",hintNormal:"منصات أقل، مؤقتات أقصر، صياد أسرع.",hintHard:"3 صيادين، مدى سمع واسع، قواعد غرف مختلطة. يُفتح بعد إنهاء «عادي» مرتين.",hardLocked:"«صعب» مقفل: أنهِ «عادي» مرتين ({n}/2).",setTitle:"الإعدادات",setSens:"حساسية الفأرة",setFov:"مجال الرؤية (FOV)",setVol:"الصوت",setPush:"دفع ودّي (يمكنك دفع شريكك في وضع اللاعبين)",setShake:"اهتزاز الكاميرا",setLowQ:"جودة منخفضة (ظلال وتوهج أقل)",setLang:"اللغة",langAuto:"تلقائي (لغة المتصفح)",resetSave:"إعادة ضبط الحفظ",back:"رجوع",confirmReset:"حذف كل التقدم (العملات، الأوقات، ما تم فتحه)؟",upTitle:"الترقيات",upMax:"الحد الأقصى",upPebble:"حصاة إضافية",upPebbleD:"ابدأ كل جولة بحصاة إضافية (3 مستويات كحد أقصى)",upBleed:"جلد سميك",upBleedD:"وقت النزيف +5 ث (مستويان كحد أقصى)",upQuiet:"سبّاح هادئ",upQuietD:"ضجيج السباحة 15 م ← 11 م",upPush:"دفع سريع",upPushD:"تهدئة الدفع 8 ث ← 5 ث",howTitle:"طريقة اللعب",how1:"قاعدة واحدة: لا تسقط في الماء. صوت الارتطام يجذب الصياد إلى تلك النقطة (40 م). الحركة في الماء تترك أثرًا لمسافة 15 م كل 1.5 ث.",how2:"الصياد أعمى ولا يتحرك إلا على سطح الماء. لا يلاحظ من يقف ساكنًا في وسط المنصة، لكنه يختطف من الماء أي شخص على بعد ~2 م من الحافة.",how3:"ارمِ الحصى (25 م) والزجاجة (35 م) لتضليله. الأدوات موجودة في الغرف.",how4:"الكاميرا: في Locked Exit صوّر (SNAP) الأرقام الأربعة على الأعمدة؛ عندما يكتمل CODE اذهب إلى الباب واضغط E.",how5:"9 غرف بالترتيب: Pillar Hall ← Broken Walkway ← Sinking ← Rotating Bridge ← Moving ← Drifting ← Memory Bridge ← Crushing Walls ← Locked Exit. الأنفاق نقاط حفظ.",how6:"لاعبان: اللاعب 1 يستخدم WASD واللاعب 2 الأسهم. للأعلى/للأسفل للمشي نحو ما تنظر إليه، ولليمين/لليسار لتدوير الكاميرا؛ لا حاجة للفأرة. لإنعاش شريكك اضغط E (اللاعب 1) / O (اللاعب 2) باستمرار بجانبه 3 ث. إذا سقط الاثنان تعودان لنقطة الحفظ.",pause:"إيقاف مؤقت",resume:"متابعة",mainMenu:"القائمة الرئيسية",escaped:"لقد هربت",rewards:"المكافآت",total:"المجموع",dblTitle:"ضاعف عملات هذه الجولة",runCoins:"عملات الجولة",dbl:"ضاعف",noThanks:"لا، شكرًا",playAgain:"العب مجددًا",lobby:"العودة إلى الردهة",autoNext:"تبدأ الجولة التالية تلقائيًا خلال {n} ث",rRooms:"الغرف المجتازة",rEscape:"الهروب",rFirst:"مكافأة أول هروب",rDaily:"المكافأة اليومية",rPicked:"عملات ملتقطة",easyHalf:"الوضع السهل يمنح نصف العملات.",youHave:"لديك الآن {n} عملة.",recFirst:"★ أول هروب في هذه الصعوبة!",recNew:"★ رقم قياسي جديد! أسرع بـ {d} من أفضل وقتك",recBest:"الأفضل: {t} (+{d}) · المرتبة #{r}",watchingAd:"مشاهدة الإعلان… {n}",loadingAd:"تحميل الإعلان…",watchingAdDots:"مشاهدة الإعلان…",added:"تمت إضافة +{n} ✓",noReward:"لا مكافأة — لم يكتمل الإعلان",adNotCompleted:"لم يكتمل الإعلان — لا مكافأة. يمكنك المحاولة مجددًا.",push:"دفع",code:"CODE",snap:"SNAP",hintP1:"WASD حركة · مسافة قفز · Shift ركض · 1-3 أدوات · زر أيسر استخدام · زر أيمن SNAP · Q دفع · E تفاعل",hintDuo1:"W/S مشي · A/D استدارة · مسافة قفز · Shift الأيسر ركض · F استخدام · R SNAP · Q دفع · E إنعاش · 1-3 أدوات",hintDuo2:"↑/↓ مشي · ←/→ استدارة · Enter قفز · Shift الأيمن ركض · L استخدام · K SNAP · M دفع · O إنعاش · 8-9-0 أدوات",hintTouch:"العصا اليسرى للحركة · اسحب الجهة اليمنى للنظر",goThisWay:"اذهب من هنا",tJump:"قفز",tUse:"استخدم",tPush:"دفع",tRun:"اركض",enterCode:"E: أدخل الرمز",enterCodeTouch:"استخدم: أدخل الرمز",keypadLocked:"لوحة الأرقام مقفلة — اعثر على الأرقام ({n}/4)",keypadWants:"لوحة الأرقام تحتاج الأرقام الأربعة كلها",holdRevive:"اضغط E باستمرار لإنعاش {name}",backUp:"{name} وقف على قدميه من جديد",splash:"ارتطام!",bottleShatter:"تحطمت الزجاجة",pebbleSplash:"سقطت الحصاة في الماء",plusPebble:"+1 حصاة",gotBottle:"زجاجة: إلهاء قوي (35 م)",gotCamera:"كاميرا: صوّر الأرقام على الأعمدة",roomCleared:"اجتزت الغرفة +{n} 🪙",photo:"صورة: {d} ← خانة CODE {s}",pushedYou:"{name} دفعك!",pushedBack:"دفعته بعيدًا!",partner:"الشريك",introSub:"عدّتك في الخارج. اتجه إلى النفق. ابقَ جافًا.",checkpoint:"نقطة حفظ",checkpointSub:"عدت إلى البلاط الجاف. ما زال يُنصت.",codeComplete:"اكتمل الرمز",codeCompleteSub:"اذهب إلى باب الخروج واضغط E",memory:"جسر الذاكرة",watch:"راقب البلاط",remember:"تذكّرها",rememberSub:"البلاط الذي توهّج هو الآمن فقط",getOut:"اخرج من المنطقة الحمراء",wallComing:"الجدار قادم",bledOut:"نزفت حتى السقوط",bledOutSub:"ستعود عند نقطة الحفظ التالية",down:"لقد سقطت",downSolo:"أنت تنزف… عندما يفرغ الشريط تبدأ من نقطة الحفظ.",downDuo:"يمكن لشريكك إنعاشك — ليضغط E (اللاعب 1) / O (اللاعب 2) بجانبك 3 ث.",rescue:"إحياء",bleedOut:"إعادة البدء",rooms:{pillar:["قاعة الأعمدة","اقفز بين المنصات. صِل إلى المخرج."],broken:["الممر المكسور","حواف ضيقة بقفزات قصيرة، أو منصات عريضة بقفزات طويلة."],sinking:["المنصات الغارقة","تغرق المنصات وأنت واقف عليها. استمر في الحركة. المنصات ذات الإطار الداكن آمنة."],rotating:["الجسر الدوّار","اركب الجسور الدوّارة. اختر توقيت قفزك إلى المنصات."],moving:["المنصات المتحركة","كل منصة تتحرك. اختر توقيت قفزاتك."],drifting:["المنصات المنجرفة","الأسهم تدفعك. لا تدع التيار يجرفك إلى الماء."],memory:["جسر الذاكرة","راقب البلاط الآمن وهو يضيء. تذكّره."],crushing:["الجدران الساحقة","تنزلق الجدران وتدفعك إلى الماء. يبقى مسار واحد مفتوحًا دائمًا."],locked:["المخرج المقفل","اعثر على الأرقام الأربعة على الأعمدة. التقط صورة لكل منها بكاميرتك."]}};Oe.es={tagline:"No caigas al agua. No hagas ruido. Te oye.",mode:"MODO",solo:"SOLO",duo:"2J PANTALLA DIVIDIDA",duoShort:"2J",player1:"1 JUGADOR",player2:"2 JUGADORES",roomsCleared:"Salas superadas: {n}/9",difficulty:"DIFICULTAD",easy:"FÁCIL",normal:"NORMAL",hard:"DIFÍCIL",play:"JUGAR",upgrades:"MEJORAS",settings:"AJUSTES",how:"CÓMO JUGAR",coins:"monedas",board:"MEJORES TIEMPOS",boardFoot:"Top 10 · guardado en este dispositivo",boardEmpty:"Aún no hay escapes",bestLine:"MEJOR TIEMPO = {t}",menuFoot:"WASD mover · Ratón mirar · Espacio saltar · Shift correr · 1-7 objetos · Clic izq. lanzar · Clic der. SNAP · Q empujar · E interactuar · B desangrarse · V 3ª persona",hintEasy:"Secciones cortas, muchas plataformas, cazador lento.",hintNormal:"Menos plataformas, tiempos más cortos, cazador más rápido.",hintHard:"3 cazadores, gran radio de oído, reglas de sala mezcladas. Se desbloquea al terminar Normal dos veces.",hardLocked:"DIFÍCIL está bloqueado: termina Normal dos veces ({n}/2).",setTitle:"AJUSTES",setSens:"Sensibilidad del ratón",setFov:"Campo de visión (FOV)",setVol:"Volumen",setPush:"PUSH amistoso (puedes empujar a tu compañero en 2J)",setShake:"Vibración de cámara",setLowQ:"Calidad baja (menos sombras / bloom)",setLang:"Idioma",langAuto:"Automático (idioma del navegador)",resetSave:"BORRAR PARTIDA",back:"VOLVER",confirmReset:"¿Borrar todo el progreso (monedas, tiempos, desbloqueos)?",upTitle:"MEJORAS",upMax:"MÁX",upPebble:"Guijarro extra",upPebbleD:"Empieza cada partida con +1 guijarro (máx. 3 niveles)",upBleed:"Piel dura",upBleedD:"Tiempo de desangrado +5 s (máx. 2 niveles)",upQuiet:"Nadador silencioso",upQuietD:"Ruido al nadar 15 m → 11 m",upPush:"Empujón rápido",upPushD:"Recarga de PUSH 8 s → 5 s",howTitle:"CÓMO JUGAR",how1:"Una sola regla: no caigas al agua. El chapoteo atrae al cazador a ese punto (40 m). Moverse en el agua deja un rastro de 15 m cada 1,5 s.",how2:"El cazador es ciego y solo se mueve por el agua. No ve a quien se queda quieto en el centro de una plataforma, pero atrapa desde el agua a quien esté a ~2 m del borde.",how3:"Lanza guijarros (25 m) y la botella (35 m) para alejarlo. Los objetos se recogen en las salas.",how4:"Cámara: en Locked Exit fotografía (SNAP) los 4 números de las columnas; con el CODE completo, ve a la puerta y pulsa E.",how5:"9 salas en orden: Pillar Hall → Broken Walkway → Sinking → Rotating Bridge → Moving → Drifting → Memory Bridge → Crushing Walls → Locked Exit. Los túneles son puntos de control.",how6:"2J: J1 usa WASD y J2 las flechas. Arriba/abajo para andar hacia donde miras, izquierda/derecha para girar la cámara; sin ratón. Para levantar a tu compañero caído mantén E (J1) / O (J2) a su lado 3 s. Si caen los dos, punto de control.",pause:"PAUSA",resume:"CONTINUAR",mainMenu:"MENÚ PRINCIPAL",escaped:"HAS ESCAPADO",rewards:"RECOMPENSAS",total:"TOTAL",dblTitle:"DUPLICA LAS MONEDAS DE ESTA PARTIDA",runCoins:"Monedas de la partida",dbl:"DUPLICAR",noThanks:"No, gracias",playAgain:"JUGAR OTRA VEZ",lobby:"VOLVER AL LOBBY",autoNext:"La siguiente partida empieza en {n} s",rRooms:"Salas superadas",rEscape:"Escape",rFirst:"Bono por primer escape",rDaily:"Bono diario",rPicked:"Monedas recogidas",easyHalf:"FÁCIL paga la mitad de monedas.",youHave:"Ahora tienes {n} monedas.",recFirst:"★ ¡Primer escape en esta dificultad!",recNew:"★ ¡NUEVO RÉCORD! {d} más rápido que tu mejor marca",recBest:"Mejor: {t} (+{d}) · Puesto #{r}",watchingAd:"Viendo anuncio… {n}",loadingAd:"Cargando anuncio…",watchingAdDots:"Viendo anuncio…",added:"+{n} añadidas ✓",noReward:"Sin recompensa — anuncio no completado",adNotCompleted:"Anuncio no completado — sin bono. Puedes intentarlo de nuevo.",push:"PUSH",code:"CODE",snap:"SNAP",hintP1:"WASD mover · Espacio saltar · Shift correr · 1-3 objetos · Clic izq. usar · Clic der. SNAP · Q empujar · E interactuar",hintDuo1:"W/S andar · A/D girar · Espacio saltar · Shift izq. correr · F usar · R SNAP · Q empujar · E reanimar · 1-3 objetos",hintDuo2:"↑/↓ andar · ←/→ girar · Intro saltar · Shift der. correr · L usar · K SNAP · M empujar · O reanimar · 8-9-0 objetos",hintTouch:"Stick izquierdo para moverte · arrastra a la derecha para mirar",goThisWay:"VE POR AQUÍ",tJump:"SALTAR",tUse:"USAR",tPush:"PUSH",tRun:"CORRER",enterCode:"E: introducir el código",enterCodeTouch:"USAR: introducir el código",keypadLocked:"Teclado bloqueado — encuentra los números ({n}/4)",keypadWants:"El teclado quiere los 4 números",holdRevive:"Mantén E para reanimar a {name}",backUp:"{name} está de pie otra vez",splash:"¡CHAPOTEO!",bottleShatter:"La botella se rompió",pebbleSplash:"Guijarro al agua",plusPebble:"+1 guijarro",gotBottle:"Botella: distracción fuerte (35 m)",gotCamera:"Cámara: fotografía los números de las columnas",roomCleared:"Sala superada +{n} 🪙",photo:"Foto: {d} → casilla {s} del CODE",pushedYou:"¡{name} te empujó!",pushedBack:"¡Lo empujaste!",partner:"Compañero",introSub:"Tu equipo está ahí fuera. Ve al túnel. Mantente seco.",checkpoint:"PUNTO DE CONTROL",checkpointSub:"De vuelta en baldosas secas. Sigue escuchando.",codeComplete:"CÓDIGO COMPLETO",codeCompleteSub:"Ve a la puerta de salida y pulsa E",memory:"PUENTE DE MEMORIA",watch:"MIRA LAS BALDOSAS",remember:"RECUÉRDALAS",rememberSub:"Solo las baldosas que brillaron son seguras",getOut:"SAL DEL ROJO",wallComing:"LA PARED SE ACERCA",bledOut:"DESANGRADO",bledOutSub:"Reapareces en el siguiente punto de control",down:"HAS CAÍDO",downSolo:"Te desangras… cuando la barra se vacíe, vuelves al punto de control.",downDuo:"Tu compañero puede reanimarte — que mantenga E (J1) / O (J2) a tu lado 3 s.",rescue:"REVIVIR",bleedOut:"REINICIAR",rooms:{pillar:["SALA DE COLUMNAS","Salta entre las plataformas. Llega a la salida."],broken:["PASARELA ROTA","Cornisas estrechas con saltos cortos, o plataformas anchas con saltos largos."],sinking:["PLATAFORMAS QUE SE HUNDEN","Las plataformas se hunden mientras estás encima. Sigue moviéndote. Las de borde oscuro son seguras."],rotating:["PUENTE GIRATORIO","Súbete a los puentes giratorios. Calcula tus saltos a las plataformas."],moving:["PLATAFORMAS MÓVILES","Todas las plataformas se mueven. Calcula tus saltos."],drifting:["PLATAFORMAS A LA DERIVA","Las flechas te empujan. Que no te arrastren al agua."],memory:["PUENTE DE MEMORIA","Observa qué baldosas se iluminan. Recuérdalas."],crushing:["PAREDES APLASTANTES","Las paredes avanzan y te empujan al agua. Siempre queda un carril abierto."],locked:["SALIDA CERRADA","Encuentra los 4 números en las columnas. Fotografía cada uno con tu cámara."]}};Oe.pt={tagline:"Não caia na água. Não faça barulho. Ele ouve você.",mode:"MODO",solo:"SOLO",duo:"2J TELA DIVIDIDA",duoShort:"2J",player1:"1 JOGADOR",player2:"2 JOGADORES",roomsCleared:"Salas concluídas: {n}/9",difficulty:"DIFICULDADE",easy:"FÁCIL",normal:"NORMAL",hard:"DIFÍCIL",play:"JOGAR",upgrades:"MELHORIAS",settings:"CONFIGURAÇÕES",how:"COMO JOGAR",coins:"moedas",board:"MELHORES TEMPOS",boardFoot:"Top 10 · salvo neste aparelho",boardEmpty:"Nenhuma fuga ainda",bestLine:"MELHOR TEMPO = {t}",menuFoot:"WASD mover · Mouse olhar · Espaço pular · Shift correr · 1-7 itens · Clique esq. arremessar · Clique dir. SNAP · Q empurrar · E interagir · B sangrar · V 3ª pessoa",hintEasy:"Seções curtas, muitas plataformas, caçador lento.",hintNormal:"Menos plataformas, tempos mais curtos, caçador mais rápido.",hintHard:"3 caçadores, grande raio de audição, regras de sala misturadas. Desbloqueia ao terminar o Normal duas vezes.",hardLocked:"DIFÍCIL está bloqueado: termine o Normal duas vezes ({n}/2).",setTitle:"CONFIGURAÇÕES",setSens:"Sensibilidade do mouse",setFov:"Campo de visão (FOV)",setVol:"Volume",setPush:"PUSH amigável (você pode empurrar o parceiro no 2J)",setShake:"Tremor de câmera",setLowQ:"Qualidade baixa (menos sombras / bloom)",setLang:"Idioma",langAuto:"Automático (idioma do navegador)",resetSave:"APAGAR PROGRESSO",back:"VOLTAR",confirmReset:"Apagar todo o progresso (moedas, tempos, desbloqueios)?",upTitle:"MELHORIAS",upMax:"MÁX",upPebble:"Pedrinha extra",upPebbleD:"Comece cada partida com +1 pedrinha (máx. 3 níveis)",upBleed:"Pele grossa",upBleedD:"Tempo de sangramento +5 s (máx. 2 níveis)",upQuiet:"Nadador silencioso",upQuietD:"Ruído ao nadar 15 m → 11 m",upPush:"Empurrão rápido",upPushD:"Recarga do PUSH 8 s → 5 s",howTitle:"COMO JOGAR",how1:"Uma regra só: não caia na água. O splash atrai o caçador até aquele ponto (40 m). Mover-se na água deixa um rastro de 15 m a cada 1,5 s.",how2:"O caçador é cego e só anda pela água. Ele não percebe quem fica parado no meio de uma plataforma, mas agarra da água quem estiver a ~2 m da borda.",how3:"Jogue pedrinhas (25 m) e a garrafa (35 m) para afastá-lo. Os itens são coletados nas salas.",how4:"Câmera: na Locked Exit fotografe (SNAP) os 4 números das colunas; com o CODE completo, vá até a porta e aperte E.",how5:"9 salas em ordem: Pillar Hall → Broken Walkway → Sinking → Rotating Bridge → Moving → Drifting → Memory Bridge → Crushing Walls → Locked Exit. Os túneis são checkpoints.",how6:"2J: J1 usa WASD e J2 as setas. Cima/baixo para andar para onde você olha, esquerda/direita para virar a câmera; sem mouse. Para levantar o parceiro caído, segure E (J1) / O (J2) ao lado dele por 3 s. Se os dois caírem, checkpoint.",pause:"PAUSADO",resume:"CONTINUAR",mainMenu:"MENU PRINCIPAL",escaped:"VOCÊ ESCAPOU",rewards:"RECOMPENSAS",total:"TOTAL",dblTitle:"DOBRE AS MOEDAS DESTA PARTIDA",runCoins:"Moedas da partida",dbl:"DOBRAR",noThanks:"Não, obrigado",playAgain:"JOGAR DE NOVO",lobby:"VOLTAR AO LOBBY",autoNext:"A próxima partida começa em {n} s",rRooms:"Salas concluídas",rEscape:"Fuga",rFirst:"Bônus de primeira fuga",rDaily:"Bônus diário",rPicked:"Moedas coletadas",easyHalf:"FÁCIL paga metade das moedas.",youHave:"Agora você tem {n} moedas.",recFirst:"★ Primeira fuga nesta dificuldade!",recNew:"★ NOVO RECORDE! {d} mais rápido que o seu melhor",recBest:"Melhor: {t} (+{d}) · Posição #{r}",watchingAd:"Assistindo anúncio… {n}",loadingAd:"Carregando anúncio…",watchingAdDots:"Assistindo anúncio…",added:"+{n} adicionadas ✓",noReward:"Sem recompensa — anúncio não concluído",adNotCompleted:"Anúncio não concluído — sem bônus. Você pode tentar de novo.",push:"PUSH",code:"CODE",snap:"SNAP",hintP1:"WASD mover · Espaço pular · Shift correr · 1-3 itens · Clique esq. usar · Clique dir. SNAP · Q empurrar · E interagir",hintDuo1:"W/S andar · A/D virar · Espaço pular · Shift esq. correr · F usar · R SNAP · Q empurrar · E reanimar · 1-3 itens",hintDuo2:"↑/↓ andar · ←/→ virar · Enter pular · Shift dir. correr · L usar · K SNAP · M empurrar · O reanimar · 8-9-0 itens",hintTouch:"Analógico esquerdo para mover · arraste à direita para olhar",goThisWay:"VÁ POR AQUI",tJump:"PULAR",tUse:"USAR",tPush:"PUSH",tRun:"CORRER",enterCode:"E: digitar o código",enterCodeTouch:"USAR: digitar o código",keypadLocked:"Teclado trancado — encontre os números ({n}/4)",keypadWants:"O teclado quer os 4 números",holdRevive:"Segure E para reanimar {name}",backUp:"{name} está de pé de novo",splash:"SPLASH!",bottleShatter:"A garrafa quebrou",pebbleSplash:"Pedrinha na água",plusPebble:"+1 pedrinha",gotBottle:"Garrafa: distração forte (35 m)",gotCamera:"Câmera: fotografe os números nas colunas",roomCleared:"Sala concluída +{n} 🪙",photo:"Foto: {d} → casa {s} do CODE",pushedYou:"{name} empurrou você!",pushedBack:"Você o empurrou!",partner:"Parceiro",introSub:"Seu equipamento está lá fora. Vá para o túnel. Fique seco.",checkpoint:"CHECKPOINT",checkpointSub:"De volta aos azulejos secos. Ele ainda está ouvindo.",codeComplete:"CÓDIGO COMPLETO",codeCompleteSub:"Vá até a porta de saída e aperte E",memory:"PONTE DA MEMÓRIA",watch:"OLHE OS AZULEJOS",remember:"LEMBRE-SE DELES",rememberSub:"Só os azulejos que brilharam são seguros",getOut:"SAIA DO VERMELHO",wallComing:"A PAREDE ESTÁ VINDO",bledOut:"SANGROU ATÉ CAIR",bledOutSub:"Você renasce no próximo checkpoint",down:"VOCÊ CAIU",downSolo:"Sangrando… quando a barra esvaziar, você recomeça do checkpoint.",downDuo:"Seu parceiro pode reanimar você — basta segurar E (J1) / O (J2) ao seu lado por 3 s.",rescue:"REVIVER",bleedOut:"REINICIAR",rooms:{pillar:["SALÃO DAS COLUNAS","Pule entre as plataformas. Chegue à saída."],broken:["PASSARELA QUEBRADA","Beiradas estreitas com pulos curtos, ou plataformas largas com pulos longos."],sinking:["PLATAFORMAS QUE AFUNDAM","As plataformas afundam enquanto você está em cima. Continue se movendo. As de borda escura são seguras."],rotating:["PONTE GIRATÓRIA","Suba nas pontes giratórias. Calcule seus pulos para as plataformas."],moving:["PLATAFORMAS MÓVEIS","Toda plataforma se move. Calcule seus pulos."],drifting:["PLATAFORMAS À DERIVA","As setas empurram você. Não deixe que te levem para a água."],memory:["PONTE DA MEMÓRIA","Veja quais azulejos acendem. Lembre-se deles."],crushing:["PAREDES ESMAGADORAS","As paredes avançam e empurram você para a água. Uma faixa sempre fica aberta."],locked:["SAÍDA TRANCADA","Encontre os 4 números nas colunas. Fotografe cada um com a sua câmera."]}};Oe.ja={tagline:"水に落ちるな。音を立てるな。あいつは聞いている。",mode:"モード",solo:"ソロ",duo:"2人 画面分割",duoShort:"2人",player1:"1人プレイ",player2:"2人プレイ",roomsCleared:"クリアした部屋：{n}/9",difficulty:"難易度",easy:"イージー",normal:"ノーマル",hard:"ハード",play:"プレイ",upgrades:"アップグレード",settings:"設定",how:"遊び方",coins:"コイン",board:"ベストタイム",boardFoot:"トップ10 · この端末に保存",boardEmpty:"まだ脱出なし",bestLine:"ベストタイム = {t}",menuFoot:"WASD 移動 · マウス 視点 · Space ジャンプ · Shift ダッシュ · 1-7 アイテム · 左クリック 投げる · 右クリック SNAP · Q プッシュ · E 操作 · B 出血 · V 三人称",hintEasy:"短い区間、多めの足場、遅い怪物。",hintNormal:"足場が少なく、制限時間が短く、怪物が速い。",hintHard:"怪物3体、広い聴覚範囲、ルール混在。ノーマルを2回クリアで解放。",hardLocked:"ハードはロック中：ノーマルを2回クリア（{n}/2）。",setTitle:"設定",setSens:"マウス感度",setFov:"視野角（FOV）",setVol:"音量",setPush:"フレンドリープッシュ（2人プレイで相棒を押せる）",setShake:"カメラの揺れ",setLowQ:"低画質（影 / ブルームを減らす）",setLang:"言語",langAuto:"自動（ブラウザの言語）",resetSave:"セーブを削除",back:"戻る",confirmReset:"すべての進行状況（コイン、タイム、解放）を削除しますか？",upTitle:"アップグレード",upMax:"最大",upPebble:"小石を追加",upPebbleD:"毎回小石+1で開始（最大3段階）",upBleed:"厚い皮膚",upBleedD:"出血時間+5秒（最大2段階）",upQuiet:"静かな泳ぎ",upQuietD:"水中の音 15 m → 11 m",upPush:"素早いプッシュ",upPushD:"PUSHのクールダウン 8秒 → 5秒",howTitle:"遊び方",how1:"ルールはひとつ：水に落ちるな。水しぶきの音は怪物をその地点に呼ぶ（40 m）。水中を移動すると1.5秒ごとに15 mの痕跡を残す。",how2:"怪物は盲目で、水面だけを移動する。足場の中央で静かに立つ者には気づかないが、縁から約2 m以内にいると水中から掴まれる。",how3:"小石（25 m）や瓶（35 m）を投げて誘導しよう。アイテムは各部屋で拾える。",how4:"カメラ：Locked Exitで柱の4つの数字をSNAPで撮影。CODEが揃ったら扉へ行きEを押す。",how5:"9部屋を順番に：Pillar Hall → Broken Walkway → Sinking → Rotating Bridge → Moving → Drifting → Memory Bridge → Crushing Walls → Locked Exit。トンネルはチェックポイント。",how6:"2人プレイ：P1はWASD、P2は矢印キー。上下で向いている方へ進み、左右でカメラを回す。マウスは不要。倒れた相棒のそばでE（P1）/ O（P2）を3秒長押しで復活。2人とも倒れたらチェックポイントへ。",pause:"ポーズ",resume:"再開",mainMenu:"メインメニュー",escaped:"脱出成功",rewards:"報酬",total:"合計",dblTitle:"今回のコインを2倍に",runCoins:"今回のコイン",dbl:"2倍にする",noThanks:"いいえ",playAgain:"もう一度",lobby:"ロビーへ戻る",autoNext:"{n}秒後に次のランが自動で始まります",rRooms:"クリアした部屋",rEscape:"脱出",rFirst:"初脱出ボーナス",rDaily:"デイリーボーナス",rPicked:"拾ったコイン",easyHalf:"イージーはコイン半分。",youHave:"所持コイン：{n}。",recFirst:"★ この難易度で初めての脱出！",recNew:"★ 新記録！ベストより{d}速い",recBest:"ベスト：{t}（+{d}）· {r}位",watchingAd:"広告を視聴中… {n}",loadingAd:"広告を読み込み中…",watchingAdDots:"広告を視聴中…",added:"+{n} 追加 ✓",noReward:"報酬なし — 広告が完了しませんでした",adNotCompleted:"広告が完了しませんでした — ボーナスなし。もう一度試せます。",push:"PUSH",code:"CODE",snap:"SNAP",hintP1:"WASD 移動 · Space ジャンプ · Shift ダッシュ · 1-3 アイテム · 左クリック 使用 · 右クリック SNAP · Q プッシュ · E 操作",hintDuo1:"W/S 前後 · A/D 旋回 · Space ジャンプ · 左Shift ダッシュ · F 使用 · R SNAP · Q プッシュ · E 復活 · 1-3 アイテム",hintDuo2:"↑/↓ 前後 · ←/→ 旋回 · Enter ジャンプ · 右Shift ダッシュ · L 使用 · K SNAP · M プッシュ · O 復活 · 8-9-0 アイテム",hintTouch:"左スティックで移動 · 右側をドラッグで視点",goThisWay:"こっちへ進め",tJump:"ジャンプ",tUse:"使用",tPush:"PUSH",tRun:"ダッシュ",enterCode:"E: コードを入力",enterCodeTouch:"使用: コードを入力",keypadLocked:"キーパッドはロック中 — 数字を探せ（{n}/4）",keypadWants:"キーパッドには4つの数字が必要",holdRevive:"Eを長押しで{name}を蘇生",backUp:"{name}が復帰した",splash:"スプラッシュ！",bottleShatter:"瓶が割れた",pebbleSplash:"小石が水に落ちた",plusPebble:"小石 +1",gotBottle:"瓶：強い陽動（35 m）",gotCamera:"カメラ：柱の数字をSNAPで撮影",roomCleared:"部屋クリア +{n} 🪙",photo:"撮影：{d} → CODE の {s} 番目",pushedYou:"{name}に押された！",pushedBack:"押し返した！",partner:"相棒",introSub:"装備は先にある。トンネルへ向かえ。濡れるな。",checkpoint:"チェックポイント",checkpointSub:"乾いたタイルに戻った。あいつはまだ聞いている。",codeComplete:"コード完成",codeCompleteSub:"出口の扉へ行きEを押せ",memory:"メモリーブリッジ",watch:"タイルを見ろ",remember:"覚えておけ",rememberSub:"光ったタイルだけが安全",getOut:"赤から出ろ",wallComing:"壁が来る",bledOut:"出血で倒れた",bledOutSub:"次のチェックポイントで復活",down:"ダウン",downSolo:"出血中… ゲージが空になるとチェックポイントからやり直し。",downDuo:"相棒が復活させられる — そばでE（P1）/ O（P2）を3秒長押し。",rescue:"リバイブ",bleedOut:"リスタート",rooms:{pillar:["柱の広間","足場を跳び渡れ。出口へたどり着け。"],broken:["崩れた通路","短いジャンプの狭い縁か、長いジャンプの広い足場か。"],sinking:["沈む足場","乗っている間、足場は沈む。止まるな。暗い縁取りの足場は安全。"],rotating:["回転する橋","回転する橋に乗れ。足場へのジャンプのタイミングを計れ。"],moving:["動く足場","すべての足場が動く。ジャンプのタイミングを計れ。"],drifting:["流される足場","矢印に押される。水へ流されるな。"],memory:["メモリーブリッジ","光る安全なタイルを見て、覚えろ。"],crushing:["迫る壁","壁が迫り、水へ押し出す。1本のレーンは常に開いている。"],locked:["施錠された出口","柱の4つの数字を探せ。カメラでそれぞれ撮影しろ。"]}};Oe.ko={tagline:"물에 빠지지 마라. 소리 내지 마라. 그것이 듣고 있다.",mode:"모드",solo:"솔로",duo:"2인 분할 화면",duoShort:"2인",player1:"1인 플레이",player2:"2인 플레이",roomsCleared:"클리어한 방: {n}/9",difficulty:"난이도",easy:"쉬움",normal:"보통",hard:"어려움",play:"플레이",upgrades:"업그레이드",settings:"설정",how:"게임 방법",coins:"코인",board:"최고 기록",boardFoot:"상위 10 · 이 기기에 저장",boardEmpty:"아직 탈출 기록 없음",bestLine:"최고 기록 = {t}",menuFoot:"WASD 이동 · 마우스 시점 · Space 점프 · Shift 달리기 · 1-7 아이템 · 좌클릭 던지기 · 우클릭 SNAP · Q 밀기 · E 상호작용 · B 출혈 · V 3인칭",hintEasy:"짧은 구간, 많은 발판, 느린 괴물.",hintNormal:"발판이 적고, 제한 시간이 짧고, 괴물이 빠릅니다.",hintHard:"괴물 3마리, 넓은 청각 범위, 혼합 규칙. 보통을 2번 클리어하면 해금.",hardLocked:"어려움 잠김: 보통을 2번 클리어하세요 ({n}/2).",setTitle:"설정",setSens:"마우스 감도",setFov:"시야각 (FOV)",setVol:"음량",setPush:"친선 PUSH (2인 플레이에서 파트너를 밀 수 있음)",setShake:"카메라 흔들림",setLowQ:"낮은 품질 (그림자 / 블룸 감소)",setLang:"언어",langAuto:"자동 (브라우저 언어)",resetSave:"저장 초기화",back:"뒤로",confirmReset:"모든 진행 상황(코인, 기록, 해금)을 삭제할까요?",upTitle:"업그레이드",upMax:"최대",upPebble:"추가 조약돌",upPebbleD:"매 판 조약돌 +1개로 시작 (최대 3단계)",upBleed:"두꺼운 피부",upBleedD:"출혈 시간 +5초 (최대 2단계)",upQuiet:"조용한 수영",upQuietD:"수영 소음 15 m → 11 m",upPush:"빠른 밀기",upPushD:"PUSH 재사용 대기 8초 → 5초",howTitle:"게임 방법",how1:"규칙은 하나: 물에 빠지지 마세요. 물 튀는 소리는 괴물을 그 지점으로 부릅니다 (40 m). 물속 이동은 1.5초마다 15 m 흔적을 남깁니다.",how2:"괴물은 눈이 멀었고 수면 위로만 다닙니다. 발판 한가운데 조용히 서 있으면 알아채지 못하지만, 가장자리에서 약 2 m 안에 있으면 물에서 낚아챕니다.",how3:"조약돌(25 m)과 병(35 m)을 던져 괴물을 유인하세요. 아이템은 방 안에서 줍습니다.",how4:"카메라: Locked Exit에서 기둥의 숫자 4개를 SNAP으로 촬영하세요. CODE가 완성되면 문으로 가서 E를 누르세요.",how5:"9개의 방을 순서대로: Pillar Hall → Broken Walkway → Sinking → Rotating Bridge → Moving → Drifting → Memory Bridge → Crushing Walls → Locked Exit. 터널은 체크포인트입니다.",how6:"2인: P1은 WASD, P2는 방향키 사용. 위/아래로 바라보는 방향으로 걷고, 좌/우로 카메라를 돌림. 마우스가 필요 없음. 쓰러진 파트너 옆에서 E(P1) / O(P2)를 3초간 길게 눌러 살리기. 둘 다 쓰러지면 체크포인트로.",pause:"일시 정지",resume:"계속",mainMenu:"메인 메뉴",escaped:"탈출 성공",rewards:"보상",total:"합계",dblTitle:"이번 판 코인 2배",runCoins:"이번 판 코인",dbl:"2배 받기",noThanks:"괜찮아요",playAgain:"다시 플레이",lobby:"로비로 돌아가기",autoNext:"{n}초 후 다음 판이 자동 시작됩니다",rRooms:"클리어한 방",rEscape:"탈출",rFirst:"첫 탈출 보너스",rDaily:"일일 보너스",rPicked:"주운 코인",easyHalf:"쉬움은 코인 절반.",youHave:"현재 코인: {n}.",recFirst:"★ 이 난이도 첫 탈출!",recNew:"★ 신기록! 최고 기록보다 {d} 빠름",recBest:"최고: {t} (+{d}) · {r}위",watchingAd:"광고 시청 중… {n}",loadingAd:"광고 불러오는 중…",watchingAdDots:"광고 시청 중…",added:"+{n} 추가됨 ✓",noReward:"보상 없음 — 광고가 완료되지 않음",adNotCompleted:"광고가 완료되지 않아 보너스가 없습니다. 다시 시도할 수 있습니다.",push:"PUSH",code:"CODE",snap:"SNAP",hintP1:"WASD 이동 · Space 점프 · Shift 달리기 · 1-3 아이템 · 좌클릭 사용 · 우클릭 SNAP · Q 밀기 · E 상호작용",hintDuo1:"W/S 이동 · A/D 회전 · Space 점프 · 왼쪽 Shift 달리기 · F 사용 · R SNAP · Q 밀기 · E 살리기 · 1-3 아이템",hintDuo2:"↑/↓ 이동 · ←/→ 회전 · Enter 점프 · 오른쪽 Shift 달리기 · L 사용 · K SNAP · M 밀기 · O 살리기 · 8-9-0 아이템",hintTouch:"왼쪽 스틱으로 이동 · 오른쪽을 드래그해 시점 조작",goThisWay:"이쪽으로 가세요",tJump:"점프",tUse:"사용",tPush:"PUSH",tRun:"달리기",enterCode:"E: 코드 입력",enterCodeTouch:"사용: 코드 입력",keypadLocked:"키패드 잠김 — 숫자를 찾으세요 ({n}/4)",keypadWants:"키패드는 숫자 4개가 모두 필요합니다",holdRevive:"E를 길게 눌러 {name} 살리기",backUp:"{name} 복귀",splash:"풍덩!",bottleShatter:"병이 깨졌다",pebbleSplash:"조약돌이 물에 빠졌다",plusPebble:"조약돌 +1",gotBottle:"병: 강력한 유인 (35 m)",gotCamera:"카메라: 기둥의 숫자를 SNAP으로 촬영",roomCleared:"방 클리어 +{n} 🪙",photo:"사진: {d} → CODE {s}번째 칸",pushedYou:"{name}이(가) 당신을 밀었다!",pushedBack:"밀어냈다!",partner:"파트너",introSub:"장비는 밖에 있다. 터널로 향해라. 젖지 마라.",checkpoint:"체크포인트",checkpointSub:"다시 마른 타일 위. 그것은 아직 듣고 있다.",codeComplete:"코드 완성",codeCompleteSub:"출구 문으로 가서 E를 누르세요",memory:"메모리 브리지",watch:"타일을 보라",remember:"기억하라",rememberSub:"빛난 타일만 안전하다",getOut:"빨간 구역에서 나가라",wallComing:"벽이 온다",bledOut:"출혈로 쓰러짐",bledOutSub:"다음 체크포인트에서 부활합니다",down:"쓰러졌다",downSolo:"출혈 중… 게이지가 비면 체크포인트에서 다시 시작합니다.",downDuo:"파트너가 살릴 수 있음 — 옆에서 E(P1) / O(P2)를 3초간 길게 누르기.",rescue:"부활",bleedOut:"다시 시작",rooms:{pillar:["기둥의 홀","발판 사이를 뛰어넘어라. 출구에 도달하라."],broken:["부서진 통로","짧은 점프의 좁은 난간, 또는 긴 점프의 넓은 발판."],sinking:["가라앉는 발판","서 있는 동안 발판이 가라앉는다. 계속 움직여라. 어두운 테두리 발판은 안전하다."],rotating:["회전하는 다리","회전하는 다리에 올라타라. 발판으로 뛰는 타이밍을 맞춰라."],moving:["움직이는 발판","모든 발판이 움직인다. 점프 타이밍을 맞춰라."],drifting:["떠밀리는 발판","화살표가 당신을 민다. 물로 떠밀리지 마라."],memory:["메모리 브리지","안전한 타일이 빛나는 것을 보고 기억하라."],crushing:["압박하는 벽","벽이 밀려와 물로 밀어낸다. 한 차선은 항상 열려 있다."],locked:["잠긴 출구","기둥의 숫자 4개를 찾아라. 카메라로 각각 촬영하라."]}};let An="en";const q0=[];function Y0(){const s=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||"en"];for(const t of s){const e=String(t).toLowerCase().split("-")[0];if(Oe[e])return e}return"en"}function Bl(s){An=s==="auto"||!Oe[s]?Y0():s;const t=Oc.find(e=>e.code===An);document.documentElement.lang=An==="pt"?"pt-BR":An,document.documentElement.dir=t&&t.rtl?"rtl":"ltr",j0();for(const e of q0)e(An);return An}function it(s,t){let e=Oe[An][s]??Oe.en[s]??s;return t&&(e=e.replace(/\{(\w+)\}/g,(n,i)=>t[i]!==void 0?t[i]:"")),e}function K0(s){const t=Oe[An].rooms&&Oe[An].rooms[s]||Oe.en.rooms[s]||[s,""];return{title:t[0],rule:t[1]}}function j0(s=document){for(const t of s.querySelectorAll("[data-i18n]"))t.textContent=it(t.dataset.i18n);for(const t of s.querySelectorAll("[data-i18n-html]"))t.innerHTML=it(t.dataset.i18nHtml)}class J0{constructor(t,e,{showCode:n=!0,name:i="",pushKey:r="Q"}={}){this.pushKey=r,this.el=document.createElement("div"),this.el.className="view",this.el.innerHTML=`
      <div class="pname p${e+1}">${i}</div>
      <div class="crosshair"></div>
      <div class="timer"><span class="ico">⏱</span><span class="tv">0:00.0</span></div>
      ${n?Fc():""}
      <div class="push"><span class="ico">👊</span><span class="lbl">${it("push")}</span><span class="k">${r}</span></div>
      <div class="hotbar"></div>
      <div class="hint"></div>
      <button class="snap hidden">${it("snap")}</button>
      <div class="center">
        <div class="room-title"></div>
        <div class="room-sub"></div>
        <div class="count"></div>
        <div class="count-lbl"></div>
        <div class="warn"></div>
        <div class="warn-sub"></div>
      </div>
      <div class="interact hidden"><span class="it"></span><div class="bar"><i></i></div></div>
      <div class="toasts"></div>
      <div class="polaroid"><div class="ph">?</div></div>
      <div class="guide hidden">
        <div class="gbob"><svg class="garrow" viewBox="0 0 100 100" aria-hidden="true"><polygon points="50,7 93,50 67,50 67,93 33,93 33,50 7,50" /></svg></div>
        <div class="glbl"><span class="gt"></span><span class="gd"></span></div>
      </div>
    `,t.appendChild(this.el),this.q=a=>this.el.querySelector(a),this.timerEl=this.q(".timer .tv"),this.codeEl=this.q(".codebox"),this.codeEl&&this.codeEl.classList.add("hidden"),this.pushEl=this.q(".push"),this.hotbarEl=this.q(".hotbar"),this.hintEl=this.q(".hint"),this.snapEl=this.q(".snap"),this.titleEl=this.q(".room-title"),this.subEl=this.q(".room-sub"),this.countEl=this.q(".count"),this.countLblEl=this.q(".count-lbl"),this.warnEl=this.q(".warn"),this.warnSubEl=this.q(".warn-sub"),this.interactEl=this.q(".interact"),this.toastsEl=this.q(".toasts"),this.polaroidEl=this.q(".polaroid"),this.downEl=null,this._titleTimer=null,this._countTimer=null,this.onSnap=null,this.onSlot=null,this.snapEl.addEventListener("click",()=>this.onSnap&&this.onSnap()),this.snapEl.addEventListener("touchstart",a=>{a.preventDefault(),this.onSnap&&this.onSnap()},{passive:!1})}setRect(t,e,n,i){Object.assign(this.el.style,{left:t+"px",top:e+"px",width:n+"px",height:i+"px"}),this.el.classList.toggle("short",i<520),this.el.classList.toggle("narrow",n<720),this.w=n,this.fitHint()}setTimer(t){this.timerEl.textContent=Ni(t)}setPush(t,e){const n=this.pushEl.querySelector(".k"),i=t>0?t.toFixed(1)+"s":this.pushKey;if(i!==this._pushTxt){this._pushTxt=i,this.pushEl.classList.toggle("cd",t>0),n.textContent=i;const r=this.el.querySelector(".tbtn.pushb");r&&(r.classList.toggle("cd",t>0),r.textContent=t>0?i:it("tPush"))}}setHotbar(t,e){const n=[{icon:"🪨",count:t.pebbles,have:t.pebbles>0,label:"Pebble"},{icon:"🍾",count:null,have:t.bottle,label:"Bottle"},{icon:"📷",count:null,have:t.camera,label:"Camera"}];let i="";for(let r=0;r<7;r++){const a=n[r],o=["hb",e===r?"sel":"",!a||!a.have?"empty":""].join(" ");i+=`<div class="${o}" data-slot="${r}"><span class="n">${r+1}</span><span class="ic">${a&&a.have?a.icon:""}</span>${a&&a.count!=null&&a.have?`<span class="c">${a.count}</span>`:""}</div>`}this.hotbarEl.innerHTML=i;for(const r of this.hotbarEl.querySelectorAll(".hb"))r.addEventListener("touchstart",a=>{a.preventDefault(),this.onSlot&&this.onSlot(Number(r.dataset.slot))},{passive:!1});this.snapEl.classList.toggle("hidden",e!==2||!t.camera)}setHint(t){this.hintEl.textContent=t,this.fitHint(),document.fonts?.ready.then(()=>this.fitHint())}fitHint(){const t=this.hintEl;if(!t||!this.w)return;t.classList.remove("fit-hide"),t.style.fontSize="12px";const e=t.scrollWidth,n=this.w-32;if(!e||e<=n)return;const i=12*n/e;i<9?t.classList.add("fit-hide"):t.style.fontSize=i.toFixed(2)+"px"}setCodeVisible(t){this.codeEl&&this.codeEl.classList.toggle("hidden",!t)}setCode(t,e){if(!this.codeEl)return;this.codeEl.querySelectorAll(".slot").forEach((i,r)=>{i.textContent=e[r]?t[r]:"?",i.classList.toggle("found",!!e[r])})}showTitle(t,e,n=4500){this.titleEl.textContent=t,this.subEl.textContent=e,this.titleEl.style.opacity=1,this.subEl.style.opacity=1,clearTimeout(this._titleTimer),this._titleTimer=setTimeout(()=>{this.titleEl.style.opacity=0,this.subEl.style.opacity=0},n)}showCount(t,e){this.countEl.textContent=t>0?t:"",this.countLblEl.textContent=e||"",this.countEl.style.opacity=1,this.countLblEl.style.opacity=1,clearTimeout(this._countTimer)}hideCount(t=0){clearTimeout(this._countTimer),this._countTimer=setTimeout(()=>{this.countEl.style.opacity=0,this.countLblEl.style.opacity=0},t)}setWarn(t,e=it("getOut"),n=it("wallComing")){this.warnEl.textContent=e,this.warnSubEl.textContent=n,this.warnEl.style.opacity=t?1:0,this.warnSubEl.style.opacity=t?1:0}setInteract(t,e=null){if(!t){this.interactEl.classList.add("hidden");return}this.interactEl.classList.remove("hidden"),this.interactEl.querySelector(".it").textContent=t;const n=this.interactEl.querySelector(".bar");n.style.display=e==null?"none":"block",e!=null&&(n.querySelector("i").style.width=Math.round(e*100)+"%")}toast(t){const e=document.createElement("div");e.className="toast",e.textContent=t,this.toastsEl.appendChild(e),setTimeout(()=>e.remove(),2300)}polaroid(t){this.polaroidEl.querySelector(".ph").textContent=t,this.polaroidEl.style.opacity=1,clearTimeout(this._polTimer),this._polTimer=setTimeout(()=>{this.polaroidEl.style.opacity=0},2200)}showGuide(t){const e=this.el.querySelector(".guide");e.querySelector(".gt").textContent=t,e.classList.remove("hidden"),e.style.opacity=1}setGuide(t,e,n){const i=this.el.querySelector(".guide");i.querySelector(".garrow").style.transform=`rotate(${t}rad)`,i.querySelector(".gd").textContent=`${Math.round(e)} m`,i.style.opacity=n}hideGuide(){this.el.querySelector(".guide").classList.add("hidden")}showDown({solo:t,revive:e=!0,keys:n=null,onRescue:i,onBleedOut:r}){this.hideDown();const a=document.createElement("div");a.className="down",a.innerHTML=`<div class="box rbx-card">
      <div class="skull">💀</div>
      <h3>${it("down")}</h3>
      <div class="small">${it(t?"downSolo":"downDuo")}</div>
      <div class="bleed"><i></i></div>
      <button class="b rescue${e?"":" off"}"${e?"":" disabled"}><span class="bl">▶ ${it("rescue")}</span>${n&&e?`<span class="keys">${n.rescue}</span>`:""}</button>
      <button class="b bleedout"><span class="bl">↻ ${it("bleedOut")}</span>${n?`<span class="keys">${n.restart}</span>`:""}</button>
    </div>`,this.el.appendChild(a),e?a.querySelector(".rescue").addEventListener("click",i):a.classList.add("norevive"),a.querySelector(".bleedout").addEventListener("click",r),this.downEl=a}setBleed(t,e){if(this.downEl&&(this.downEl.querySelector(".bleed i").style.width=Math.max(0,t*100)+"%",e)){const n=this.downEl.querySelector(".rescue");n.querySelector(".bl").textContent=e;const i=n.querySelector(".keys");i&&(i.textContent="")}}hideDown(){this.downEl&&(this.downEl.remove(),this.downEl=null)}dispose(){this.el.remove()}}function Fc(){return`<div class="codebox"><span class="lbl">🔒 ${it("code")}</span><div class="slot">?</div><div class="slot">?</div><div class="slot">?</div><div class="slot">?</div></div>`}class $0{constructor(t){this.el=document.createElement("div"),this.el.id="sharedCode",this.el.innerHTML=Fc(),this.el.classList.add("hidden"),t.appendChild(this.el)}set(t,e){this.el.querySelectorAll(".slot").forEach((n,i)=>{n.textContent=e[i]?t[i]:"?",n.classList.toggle("found",!!e[i])})}setVisible(t){this.el.classList.toggle("hidden",!t)}dispose(){this.el.remove()}}function Hl(s=1,t=600,e="#fff"){const n=document.getElementById("flash");n.style.transition="none",n.style.background=e,n.style.opacity=s,requestAnimationFrame(()=>{n.style.transition=`opacity ${t}ms ease-out`,n.style.opacity=0})}class Z0{constructor(){this.move={x:0,y:0},this.lookX=0,this.lookY=0,this.sprint=!1,this.jumpHeld=!1,this.interactHeld=!1,this.jump=!1,this.use=!1,this.snap=!1,this.push=!1,this.bleed=!1,this.pause=!1,this.thirdPerson=!1,this.slot=-1,this.interact=!1}endFrame(){this.lookX=0,this.lookY=0,this.jump=this.use=this.snap=this.push=this.bleed=this.pause=this.thirdPerson=this.interact=!1,this.slot=-1}}const Q0={wasd:{fwd:["KeyW"],back:["KeyS"],left:["KeyA"],right:["KeyD"],jump:["Space"],sprint:["ShiftLeft"],use:["KeyF"],snap:["KeyR"],push:["KeyQ"],bleed:["KeyR"],interact:["KeyE"],third:["KeyV"],pause:[],slots:["Digit1","Digit2","Digit3","Digit4","Digit5","Digit6","Digit7"]},arrows:{fwd:["ArrowUp"],back:["ArrowDown"],left:["ArrowLeft"],right:["ArrowRight"],jump:["Enter","NumpadEnter"],sprint:["ShiftRight"],use:["KeyL"],snap:["KeyK"],push:["KeyM"],bleed:["KeyK"],interact:["KeyO"],third:[],pause:[],slots:["Digit8","Digit9","Digit0"]}};class Zr{constructor(t,{layout:e="wasd",mouse:n=!0,keyLook:i=!0,sens:r=1,canvas:a}={}){this.state=t,this.map=Q0[e],this.mouse=n,this.keyLook=i,this.sens=r,this.keys=new Set,this.canvas=a,this.enabled=!0,this._onKeyDown=o=>this.keyDown(o),this._onKeyUp=o=>this.keys.delete(o.code),this._onMouseMove=o=>{if(!this.mouse||!this.enabled||document.pointerLockElement!==this.canvas)return;const l=.0022*this.sens;this.state.lookX-=o.movementX*l,this.state.lookY-=o.movementY*l},this._onMouseDown=o=>{!this.mouse||!this.enabled||document.pointerLockElement!==this.canvas&&o.target!==this.canvas||(o.button===0&&(this.state.use=!0),o.button===2&&(this.state.snap=!0))},window.addEventListener("keydown",this._onKeyDown),window.addEventListener("keyup",this._onKeyUp),window.addEventListener("mousemove",this._onMouseMove),window.addEventListener("mousedown",this._onMouseDown),window.addEventListener("blur",()=>this.keys.clear())}keyDown(t){if(t.repeat)return;const e=this.map,n=this.state;if(this.keys.add(t.code),!this.enabled)return;(t.code.startsWith("Arrow")||t.code==="Space")&&t.preventDefault(),e.jump.includes(t.code)&&(n.jump=!0),e.use.includes(t.code)&&(n.use=!0),e.snap.includes(t.code)&&(n.snap=!0),e.push.includes(t.code)&&(n.push=!0),e.bleed.includes(t.code)&&(n.bleed=!0),e.interact.includes(t.code)&&(n.interact=!0),e.third.includes(t.code)&&(n.thirdPerson=!0),e.pause.includes(t.code)&&(n.pause=!0);const i=e.slots.indexOf(t.code);i>=0&&(n.slot=i)}poll(t){const e=this.map,n=this.state,i=this.keys,r=a=>a.some(o=>i.has(o));if(n.move.y=(r(e.fwd)?1:0)-(r(e.back)?1:0),n.move.x=(r(e.right)?1:0)-(r(e.left)?1:0),n.sprint=r(e.sprint),n.jumpHeld=r(e.jump),n.interactHeld=r(e.interact),this.keyLook&&document.pointerLockElement!==this.canvas){const a=2.2*t;i.has("ArrowLeft")&&(n.lookX+=a),i.has("ArrowRight")&&(n.lookX-=a),i.has("ArrowUp")&&(n.lookY+=a*.7),i.has("ArrowDown")&&(n.lookY-=a*.7)}}dispose(){window.removeEventListener("keydown",this._onKeyDown),window.removeEventListener("keyup",this._onKeyUp),window.removeEventListener("mousemove",this._onMouseMove),window.removeEventListener("mousedown",this._onMouseDown)}}class Qr{constructor(t,e){this.state=t,this.enabled=!0;const n=document.createElement("div");n.className="touch",n.innerHTML=`
      <div class="lookzone"></div>
      <div class="stick"><div class="knob"></div></div>
      <button class="tbtn jump">${it("tJump")}</button>
      <button class="tbtn use">${it("tUse")}</button>
      <button class="tbtn pushb">${it("tPush")}</button>
      <button class="tbtn sprint">${it("tRun")}</button>`,e.appendChild(n),this.root=n;const i=n.querySelector(".stick"),r=n.querySelector(".knob"),a=n.querySelector(".lookzone");let o=null,l=0,c=0;const h=44;i.addEventListener("touchstart",_=>{o=_.changedTouches[0].identifier;const x=i.getBoundingClientRect();l=x.left+x.width/2,c=x.top+x.height/2,_.preventDefault()},{passive:!1});const u=_=>{for(const S of _.changedTouches){if(S.identifier!==o)continue;let x=S.clientX-l,L=S.clientY-c;const A=Math.hypot(x,L)||1,b=Math.min(A,h);x=x/A*b,L=L/A*b,r.style.transform=`translate(${x}px, ${L}px)`,this.state.move.x=x/h,this.state.move.y=-L/h,this.state.sprint=this.sprintOn||b>h*.95}_.preventDefault()},d=_=>{for(const S of _.changedTouches)S.identifier===o&&(o=null,r.style.transform="",this.state.move.x=this.state.move.y=0)};i.addEventListener("touchmove",u,{passive:!1}),i.addEventListener("touchend",d),i.addEventListener("touchcancel",d);let p=null,g=0,v=0;a.addEventListener("touchstart",_=>{const S=_.changedTouches[0];p=S.identifier,g=S.clientX,v=S.clientY,_.preventDefault()},{passive:!1}),a.addEventListener("touchmove",_=>{for(const S of _.changedTouches)S.identifier===p&&(this.state.lookX-=(S.clientX-g)*.005,this.state.lookY-=(S.clientY-v)*.005,g=S.clientX,v=S.clientY);_.preventDefault()},{passive:!1});const m=_=>{for(const S of _.changedTouches)S.identifier===p&&(p=null)};a.addEventListener("touchend",m),a.addEventListener("touchcancel",m);const f=(_,S,x)=>{const L=n.querySelector(_);L.addEventListener("touchstart",A=>{S(),A.preventDefault()},{passive:!1}),x&&(L.addEventListener("touchend",x),L.addEventListener("touchcancel",x))};f(".jump",()=>{this.state.jump=!0,this.state.jumpHeld=!0},()=>{this.state.jumpHeld=!1}),f(".use",()=>{this.state.use=!0,this.state.interact=!0,this.state.interactHeld=!0},()=>{this.state.interactHeld=!1}),f(".pushb",()=>{this.state.push=!0}),this.sprintOn=!1,f(".sprint",()=>{this.sprintOn=!this.sprintOn,n.querySelector(".sprint").classList.toggle("on",this.sprintOn)})}poll(){this.sprintOn&&(this.state.sprint=!0)}relabel(){this.root.querySelector(".jump").textContent=it("tJump"),this.root.querySelector(".use").textContent=it("tUse"),this.root.querySelector(".pushb").textContent=it("tPush"),this.root.querySelector(".sprint").textContent=it("tRun")}dispose(){this.root.remove()}}const tg=()=>{if(!((navigator.maxTouchPoints||0)>0||"ontouchstart"in window))return!1;const t=window.matchMedia?window.matchMedia("(pointer: coarse)").matches:!1,e=/Mobi|Android|iPhone|iPad|iPod|Tablet|Silk|Kindle|Windows Phone/i.test(navigator.userAgent),n=navigator.platform==="MacIntel"&&(navigator.maxTouchPoints||0)>1;return t||e||n},eg=3,ng=8e3,Vl=15e3,ig=18e4,sg=4e3,rg=12e3,Gl=250,ag=4e3;class og{constructor(t={}){this.hooks={pause(){},resume(){},setMuted(){},...t},this.provider="mock",this.providerReason="not initialised",this.platformId=null,this.bridge=null,this.active=!1,this.gmPaused=!1,this._gmFlow=null,this._gmWatch=0,this._gmBare=0,this.holds=new Set,this.mutes=new Set,this.muted=!1,document.addEventListener("visibilitychange",()=>this._setHold("hidden",document.hidden)),document.hidden&&this._setHold("hidden",!0),this.ready=this._init()}get reviveAvailable(){return this.provider==="gamemonetize"||this.provider==="playgama"&&this.rewardedSupported||this.forcedMock===!0}get busy(){return this.active||this.holds.has("ad")}get rewardedSupported(){if(this.provider!=="playgama")return!0;try{return this.bridge.advertisement.isRewardedSupported!==!1}catch{return!1}}async showRewarded(t,{onStatus:e}={}){if(this.provider==="gamemonetize")return await this.showInterstitial(t,{onStatus:e}),!0;if(this.active)return!1;this.active=!0,this._setHold("ad",!0);let n=!1;try{await this.ready,n=this.provider==="playgama"?await this._showPlaygama(t,e):await this._showMock(t,e)}catch(i){console.warn("[ads] rewarded failed",i),n=!1}finally{this.active=!1,this._setHold("ad",!1)}return n}async showInterstitial(t,{onStatus:e}={}){if(await this.ready,this.provider!=="gamemonetize"||this.active)return!1;this.active=!0;try{return await this._showGameMonetize(t,e)}catch(n){return console.warn("[ads] interstitial failed",n),!1}finally{this.active=!1}}async _init(){const t=window.bridge,e=new URLSearchParams(location.search).get("ads");if(e==="mock")return this.forcedMock=!0,this._useMock("forced by ?ads=mock");if(window.SDK_OPTIONS?.gameId)return this._useGameMonetize();if(!t||typeof t.initialize!="function")return this._useMock("Playgama Bridge script not loaded");try{await Promise.race([t.initialize(),new Promise((i,r)=>setTimeout(()=>r(new Error("initialize() timeout")),ng))])}catch(i){return this._useMock(`bridge.initialize() failed: ${i?.message||i}`)}this.bridge=t,this.platformId=t.platform?.id??null,this._wirePlatform(t);try{t.platform.sendMessage(t.PLATFORM_MESSAGE?.GAME_READY??"game_ready")}catch{}const n=t.PLATFORM_ID?.MOCK??"mock";if(this.platformId===n&&e!=="playgama")return this._useMock("Bridge mock platform (local dev)");this.provider="playgama",this.providerReason=`platform ${this.platformId}`,console.info(`[ads] provider: playgama (${this.providerReason})`)}_useGameMonetize(){this.provider="gamemonetize",this.providerReason=`game ${window.SDK_OPTIONS.gameId}`,window.addEventListener("gamemonetize",t=>this._onGameMonetize(t.detail)),window.__gmPaused&&this._onGameMonetize({name:"SDK_GAME_PAUSE"}),console.info(`[ads] provider: gamemonetize (${this.providerReason})`)}_onGameMonetize(t){switch(t?.name){case"SDK_GAME_PAUSE":this.gmPaused=!0,this._gmBare=0,this._setHold("ad",!0),this._gmFlow?.("opened"),this._gmWatch||(this._gmWatch=setInterval(()=>this._gmCheck(),Gl));break;case"SDK_GAME_START":clearInterval(this._gmWatch),this._gmWatch=0,this.gmPaused=!1,this._setHold("ad",!1),this._gmFlow?.("closed");break;case"AD_ERROR":case"AD_SDK_ERROR":case"AD_CANCELED":case"AD_SAFETY_TIMER":case"SDK_ERROR":case"SDK_BLOCKED":this.gmPaused||this._gmFlow?.("failed");break;default:this._gmFlow?.("loading")}}_gmCheck(){this._sdkOverlayOnScreen()?(this._gmBare=0,this.holds.has("ad")||this._setHold("ad",!0)):(this._gmBare+=Gl)>=ag&&this.holds.has("ad")&&(console.info("[ads] GameMonetize paused the game but shows nothing, playing on"),this._setHold("ad",!1),this._gmFlow?.("closed"))}_sdkOverlayOnScreen(){return[[.5,.5],[.25,.3],[.75,.7]].some(([t,e])=>{const n=document.elementFromPoint(innerWidth*t,innerHeight*e);return!!n&&n!==document.body&&n!==document.documentElement&&!n.closest("#gl, #hud, #overlay, #flash")})}_showGameMonetize(t,e){const n=window.sdk;return!n||typeof n.showBanner!="function"?Promise.resolve(!1):new Promise(i=>{let r=!1,a=!1,o=0;const l=()=>{r||(r=!0,clearTimeout(o),this._gmFlow=null,i(a))},c=h=>{clearTimeout(o),o=setTimeout(l,h)};this._gmFlow=h=>{switch(h){case"loading":a||(e?.(it("loadingAd")),c(rg));break;case"opened":a=!0,clearTimeout(o),e?.(it("watchingAdDots"));break;case"closed":case"failed":l();break}},e?.(it("loadingAd")),c(sg),console.info(`[ads] interstitial: ${t}`);try{n.showBanner()}catch(h){console.warn("[ads] showBanner threw",h),l()}})}_useMock(t){this.provider="mock",this.providerReason=t,console.info(`[ads] provider: mock (${t})`)}_wirePlatform(t){const e=t.EVENT_NAME||{};try{t.platform.isAudioEnabled===!1&&this._setMute("platform-audio",!0),t.platform.on(e.AUDIO_STATE_CHANGED||"audio_state_changed",n=>this._setMute("platform-audio",!n)),t.platform.on(e.PAUSE_STATE_CHANGED||"pause_state_changed",n=>this._setHold("platform",!!n)),t.platform.isPaused===!0&&this._setHold("platform",!0)}catch(n){console.warn("[ads] platform events unavailable",n)}}_showPlaygama(t,e){const n=this.bridge,i=n.EVENT_NAME?.REWARDED_STATE_CHANGED||"rewarded_state_changed";return n.advertisement.isRewardedSupported===!1?(e?.("Ads unavailable"),Promise.resolve(!1)):new Promise(r=>{let a=!1,o=!1,l=0;const c=d=>{if(!o){o=!0,clearTimeout(l);try{n.advertisement.off?.(i,u)}catch{}r(d)}},h=d=>{clearTimeout(l),l=setTimeout(()=>c(a),d)},u=d=>{if(!o)switch(d){case"loading":e?.(it("loadingAd")),h(Vl);break;case"opened":e?.(it("watchingAdDots")),h(ig);break;case"rewarded":a=!0;break;case"closed":case"failed":c(a);break}};n.advertisement.on(i,u),e?.(it("loadingAd")),h(Vl);try{n.advertisement.showRewarded(t)}catch(d){console.warn("[ads] showRewarded threw",d),c(!1)}})}_showMock(t,e){return new Promise(n=>{let i=eg;const r=()=>{e?.(it("watchingAd",{n:i})),i--<=0?n(!0):setTimeout(r,1e3)};r()})}_setHold(t,e){const n=this.holds.size>0;e?this.holds.add(t):this.holds.delete(t);const i=this.holds.size>0;!n&&i?this.hooks.pause(t):n&&!i&&this.hooks.resume(),this._syncMute()}_setMute(t,e){e?this.mutes.add(t):this.mutes.delete(t),this._syncMute()}_syncMute(){const t=this.holds.size>0||this.mutes.size>0;t!==this.muted&&(this.muted=t,this.hooks.setMuted(t))}}const we=1,Xs=.45,En=-38,lg=38;class Wl{constructor(t){this.world=t,this.grids=new Map,this.W=Math.ceil((lg-En)/we)}_grid(t){let e=this.grids.get(t);if(e)return e;const n=this.world.rooms[t],i=n.z0-8,r=n.z1+8,a=Math.ceil((r-i)/we),o=new Uint8Array(this.W*a),l={x:0,z:0};for(const c of this.world.platforms){if(c.kind==="moving"||c.kind==="rotating"||(c.kind==="solid"?c.bottom()>=1.5:c.top()<bt.waterY-.3))continue;const h=Math.hypot(c.w,c.d)/2+Xs;if(c.pos.z+h<i||c.pos.z-h>r)continue;const u=Math.max(0,Math.floor((c.pos.x-h-En)/we)),d=Math.min(this.W-1,Math.ceil((c.pos.x+h-En)/we)),p=Math.max(0,Math.floor((c.pos.z-h-i)/we)),g=Math.min(a-1,Math.ceil((c.pos.z+h-i)/we)),v=c.w/2+Xs,m=c.d/2+Xs;for(let f=p;f<=g;f++)for(let _=u;_<=d;_++)c.toLocal(En+(_+.5)*we,i+(f+.5)*we,l),Math.abs(l.x)<=v&&Math.abs(l.z)<=m&&(o[f*this.W+_]=1)}for(const c of this.world.pillars){const h=c.r+Xs;if(c.z+h<i||c.z-h>r)continue;const u=Math.max(0,Math.floor((c.x-h-En)/we)),d=Math.min(this.W-1,Math.ceil((c.x+h-En)/we)),p=Math.max(0,Math.floor((c.z-h-i)/we)),g=Math.min(a-1,Math.ceil((c.z+h-i)/we));for(let v=p;v<=g;v++)for(let m=u;m<=d;m++){const f=En+(m+.5)*we,_=i+(v+.5)*we;Math.hypot(f-c.x,_-c.z)<=h&&(o[v*this.W+m]=1)}}return e={z0:i,H:a,blocked:o,free:null},this.grids.set(t,e),e}_cell(t,e,n){return{gx:Math.min(this.W-1,Math.max(0,Math.floor((e-En)/we))),gz:Math.min(t.H-1,Math.max(0,Math.floor((n-t.z0)/we)))}}_world(t,e,n){return{x:En+(e+.5)*we,z:t.z0+(n+.5)*we}}_free(t,e,n){return e>=0&&n>=0&&e<this.W&&n<t.H&&!t.blocked[n*this.W+e]}_nearestFree(t,e,n,i=10){if(this._free(t,e,n))return{gx:e,gz:n};for(let r=1;r<=i;r++){let a=null,o=1/0;for(let l=-r;l<=r;l++)for(let c=-r;c<=r;c++){if(Math.max(Math.abs(c),Math.abs(l))!==r||!this._free(t,e+c,n+l))continue;const h=c*c+l*l;h<o&&(o=h,a={gx:e+c,gz:n+l})}if(a)return a}return null}_los(t,e,n){let i=e.gx,r=e.gz;const a=n.gx,o=n.gz,l=Math.abs(a-i),c=Math.abs(o-r),h=i<a?1:-1,u=r<o?1:-1;let d=l-c;for(;;){if(!this._free(t,i,r))return!1;if(i===a&&r===o)return!0;const p=2*d;p>-c&&(d-=c,i+=h,this._free(t,i,r-0)),p<l&&(d+=l,r+=u)}}randomFree(t,e,n){const i=this._grid(t);for(let r=0;r<40;r++){const a=e.range(n.x0,n.x1),o=e.range(n.z0,n.z1),l=this._cell(i,a,o);if(this._free(i,l.gx,l.gz))return this._world(i,l.gx,l.gz)}return null}findPath(t,e,n){const i=this._grid(t),r=this._cell(i,e.x,e.z),a=this._cell(i,n.x,n.z),o=this._nearestFree(i,r.gx,r.gz,6),l=this._nearestFree(i,a.gx,a.gz,12);if(!o||!l)return null;const c=this.W,h=c*i.H,u=new Float32Array(h).fill(1/0),d=new Int32Array(h).fill(-1),p=new Uint8Array(h),g=new cg,v=o.gz*c+o.gx,m=l.gz*c+l.gx,f=b=>{const R=Math.abs(b%c-l.gx),M=Math.abs(Math.floor(b/c)-l.gz);return Math.max(R,M)+.414*Math.min(R,M)};u[v]=0,g.push(v,f(v));let _=!1,S=0;for(;g.size;){const b=g.pop();if(b===m){_=!0;break}if(p[b])continue;if(p[b]=1,++S>2e4)break;const R=b%c,M=(b-R)/c;for(let y=-1;y<=1;y++)for(let P=-1;P<=1;P++){if(!P&&!y)continue;const F=R+P,I=M+y;if(!this._free(i,F,I)||P&&y&&(!this._free(i,R+P,M)||!this._free(i,R,M+y)))continue;const k=I*c+F;if(p[k])continue;const V=u[b]+(P&&y?1.414:1);V<u[k]&&(u[k]=V,d[k]=b,g.push(k,V+f(k)))}}if(!_)return null;const x=[];for(let b=m;b!==-1;b=d[b])x.push({gx:b%c,gz:Math.floor(b/c)});x.reverse();const L=[];let A=0;for(;A<x.length-1;){let b=x.length-1;for(;b>A+1&&!this._los(i,x[A],x[b]);)b--;L.push(this._world(i,x[b].gx,x[b].gz)),A=b}return L.length||L.push(this._world(i,x[x.length-1].gx,x[x.length-1].gz)),L}}class cg{constructor(){this.a=[]}get size(){return this.a.length}push(t,e){const n=this.a;n.push({v:t,p:e});let i=n.length-1;for(;i>0;){const r=i-1>>1;if(n[r].p<=n[i].p)break;[n[r],n[i]]=[n[i],n[r]],i=r}}pop(){const t=this.a,e=t[0],n=t.pop();if(t.length){t[0]=n;let i=0;for(;;){const r=2*i+1,a=r+1;let o=i;if(r<t.length&&t[r].p<t[o].p&&(o=r),a<t.length&&t[a].p<t[o].p&&(o=a),o===i)break;[t[o],t[i]]=[t[i],t[o]],i=o}}return e.v}}const Dt=s=>document.querySelector(s);class hg{constructor(){this.canvas=Dt("#gl"),this.renderer=new Hm({canvas:this.canvas,antialias:!1,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.75)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=ql,this.renderer.toneMapping=Ln,this.renderer.outputColorSpace=pi,this.renderer.autoClear=!0,this.settings=Ge.settings,this.touch=tg(),this.scene=new Vm,this.fogColor=new zt(Ie.fog),this.scene.background=this.fogColor,this.scene.fog=new no(Ie.fog,.045),this.hemi=new a0(15261629,7178851,.85),this.scene.add(this.hemi),this.sun=new c0(16773586,1.7),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(2048,2048),this.sun.shadow.camera.near=1,this.sun.shadow.camera.far=140,this.sun.shadow.camera.left=-48,this.sun.shadow.camera.right=48,this.sun.shadow.camera.top=48,this.sun.shadow.camera.bottom=-48,this.sun.shadow.bias=-6e-4,this.sun.shadow.normalBias=.03,this.sun.shadow.radius=4,this.scene.add(this.sun,this.sun.target),this.textures=M0(),this.mats=R0(this.textures),this.audio=new X0,this.audio.setVolume(this.settings.volume),this.noise=new z0,this.vfx=new B0(this.scene,this.textures),this.postfx=new zl(this.renderer,this.settings.lowQ),this.projectiles=new k0(this),this.hudRoot=Dt("#hud"),this.rng=Ga(Date.now()&65535),this.state="menu",this.mode="solo",this.diffKey="easy",this.world=null,this.players=[],this.monsters=[],this.huds=[],this.sharedCode=null,this.sources=[],this.jumpscares=[],this.timer=0,this.runCoins=0,this.checkpoint=new T,this.currentRoom=-1,this.lastStinger=-10,this.menuCam=new ke(70,1,.1,260),this.menuT=0,this.escapeT=0,this.autoNext=0,this.clock=new h0,Bl(this.settings.lang||"auto"),this._bindUI(),this._applyQuality(),window.addEventListener("resize",()=>this.resize()),this.resize();const t=()=>{this.audio.init(),this.audio.resume()};window.addEventListener("pointerdown",t,{once:!0}),window.addEventListener("keydown",t,{once:!0}),document.addEventListener("pointerlockchange",()=>{const e=document.pointerLockElement===this.canvas,n=this._hadLock&&!e;this._hadLock=e,n&&this.state==="playing"&&!this.touch&&!this.allowUnlock&&!this.ads?.busy&&this.pause()}),this.canvas.addEventListener("click",()=>{this.state==="playing"&&!this.touch&&document.pointerLockElement!==this.canvas&&this.relockIfFree()}),this.canvas.addEventListener("contextmenu",e=>e.preventDefault()),window.addEventListener("keydown",e=>{e.code!=="KeyP"||e.repeat||(this.state==="playing"?this.pauseFromPlayer():this.state==="paused"&&Dt("#pause")&&!Dt("#pause").classList.contains("hidden")&&this.resume())}),Dt("#pauseBtn").addEventListener("click",e=>{e.stopPropagation(),this.pauseFromPlayer()}),window.addEventListener("touchstart",()=>this.enableTouch(),{passive:!0,once:!0}),this.applyPlatformUI(),this.showMenu(),this.renderer.setAnimationLoop(()=>this.frame()),this.ads=new og({pause:e=>this.hold(e),resume:()=>this.release(),setMuted:e=>this.audio.setMuted(e)})}_bindUI(){const t=async o=>{this.starting||(this.starting=!0,this.mode=o,this.audio.init(),this.audio.resume(),this.audio.ui(),Dt("#menu").classList.add("busy"),await this.ads.showInterstitial("start",{onStatus:l=>{Dt("#diffHint").textContent=l}}),Dt("#menu").classList.remove("busy"),this.starting=!1,this.showDiffHint(),this.state==="menu"&&this.startRun())},e=()=>{this.audio.ui(),this.showMenu(),this.ads.showInterstitial("menu")};Dt("#p1Btn").addEventListener("click",()=>t("solo")),Dt("#p2Btn").addEventListener("click",()=>t("duo")),Dt("#diffSeg").addEventListener("click",o=>{const l=o.target.closest("button");if(l){if(l.dataset.diff==="hard"&&!qr()){this.audio.denied(),Dt("#diffHint").textContent=it("hardLocked",{n:Ge.normalWins});return}this.diffKey=l.dataset.diff;for(const c of Dt("#diffSeg").children)c.classList.toggle("on",c===l);this.showDiffHint(),this.audio.ui(),this.refreshBoard()}}),Dt("#settingsBtn").addEventListener("click",()=>{this.audio.ui(),this.openSettings()}),Dt("#howBtn").addEventListener("click",()=>{this.audio.ui(),Dt("#howto").classList.remove("hidden")});for(const o of document.querySelectorAll(".back"))o.addEventListener("click",()=>{this.audio.ui(),o.closest(".panel-screen").classList.add("hidden"),this.refreshMenu()});Dt("#resumeBtn").addEventListener("click",()=>this.resume()),Dt("#quitBtn").addEventListener("click",e),Dt("#playAgainBtn").addEventListener("click",()=>{this.audio.ui(),this.startRun()}),Dt("#lobbyBtn").addEventListener("click",e),Dt("#resetSaveBtn").addEventListener("click",()=>{confirm(it("confirmReset"))&&(f0(),this.settings=Ge.settings,this.refreshMenu(),this.openSettings())});const n=this.settings,i=(o,l,c=h=>h)=>{const h=Dt(o),u=Dt(o+"V");h.value=n[l],u.textContent=c(n[l]),h.addEventListener("input",()=>{n[l]=parseFloat(h.value),u.textContent=c(n[l]),Fi(),this.applySettings()})};i("#setSens","sens",o=>o.toFixed(1)),i("#setFov","fov",o=>o+"°"),i("#setVol","volume",o=>Math.round(o*100)+"%");const r=(o,l)=>{const c=Dt(o);c.checked=!!n[l],c.addEventListener("change",()=>{n[l]=c.checked,Fi(),this.applySettings()})};r("#setPush","friendlyPush"),r("#setShake","shake"),r("#setLowQ","lowQ");const a=Dt("#setLang");a.innerHTML=`<option value="auto" data-i18n="langAuto">${it("langAuto")}</option>`+Oc.map(o=>`<option value="${o.code}">${o.name}</option>`).join(""),a.value=n.lang||"auto",a.addEventListener("change",()=>{n.lang=a.value,Fi(),Bl(n.lang),this.onLangChanged()})}applySettings(){this.audio.setVolume(this.settings.volume);for(const t of this.sources)t instanceof Zr&&(t.sens=this.settings.sens);for(const t of this.players)t.camera.fov=this.settings.fov,t.camera.updateProjectionMatrix();this._applyQuality()}_applyQuality(){const t=this.settings.lowQ||this.touch,e=t?1024:this.mode==="duo"?1536:2048;this.sun.shadow.mapSize.x!==e&&(this.sun.shadow.mapSize.set(e,e),this.sun.shadow.map&&(this.sun.shadow.map.dispose(),this.sun.shadow.map=null)),this.postfx.lowQ!==t&&(this.postfx.dispose(),this.postfx=new zl(this.renderer,t)),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,t?1.25:1.75))}showDiffHint(){const t=this.diffKey.charAt(0).toUpperCase()+this.diffKey.slice(1);Dt("#diffHint").textContent=it("hint"+t)}hintFor(t){return this.touch?it("hintTouch"):this.mode==="duo"?it(t===0?"hintDuo1":"hintDuo2"):it("hintP1")}onLangChanged(){this.refreshMenu(),this.showDiffHint(),this.players.forEach((t,e)=>{t.hud.setHint(this.hintFor(e)),t.hud.setPush(t.pushCd)});for(const t of this.sources)t.relabel?.()}openSettings(){Dt("#settings").classList.remove("hidden")}refreshMenu(){const t=Dt("#hardBtn");t.classList.toggle("locked",!qr()),t.textContent=qr()?it("hard"):`${it("hard")} 🔒`,this.refreshBoard()}refreshBoard(){const t=Ge.bestTimes.solo[this.diffKey],e=t.length?t[0].t:null;Dt("#bestLine").textContent=it("bestLine",{t:Ni(e)})}showMenu(){this.state="menu",document.exitPointerLock?.();for(const n of document.querySelectorAll("#overlay .panel-screen"))n.classList.add("hidden");Dt("#menu").classList.remove("hidden"),this.teardownRun(),(!this.world||this.world.diff.key!=="easy"||this.world.duo)&&(this.world&&this.world.dispose(),this.world=new he(this.scene,this.textures,this.mats,Xr.easy,1337,!1),this.nav=new Wl(this.world)),this.scene.fog.density=.045,this.vfx.setFog(this.fogColor,.045);const t=new kl(this,0,Xr.easy),e=this.world.rooms[0];t.setRoom({x0:-26,x1:26,z0:e.z0+10,z1:e.z1-10},0),t.teleport(10,e.z0+40),t.speedMul=1.4,this.monsters=[t],this.refreshMenu(),this.showDiffHint()}teardownRun(){for(const t of this.players)t.dispose();for(const t of this.monsters)t.dispose();for(const t of this.huds)t.dispose();for(const t of this.sources)t.dispose?.();this.sharedCode&&(this.sharedCode.dispose(),this.sharedCode=null),this.players=[],this.monsters=[],this.huds=[],this.sources=[],this.projectiles.clear(),this.jumpscares=[],this.noise.noises.length=0}startRun(){for(const r of document.querySelectorAll("#overlay .panel-screen"))r.classList.add("hidden");this.teardownRun(),this.world&&this.world.dispose(),this.touch&&(this.mode="solo");const t=Xr[this.diffKey],e=this.mode==="duo";this.seed=(Date.now()^Math.random()*1e9)>>>0,this.rng=Ga(this.seed),this.world=new he(this.scene,this.textures,this.mats,t,this.seed,e),this.nav=new Wl(this.world);const n=e?.045/.8:.045;this.scene.fog.density=n,this.vfx.setFog(this.fogColor,n),this._applyQuality();const i=e?2:1;for(let r=0;r<i;r++){const a=new Z0,o=new O0(r,this,a,{fov:this.settings.fov,name:e?`P${r+1}`:""});o.autoLook=e&&!this.touch,this.players.push(o);const l=new J0(this.hudRoot,r,{showCode:!e,name:e?`P${r+1}`:"",pushKey:r===0?"Q":"M"});l.onSnap=()=>{a.snap=!0},l.onSlot=c=>{a.slot=c},o.hud=l,this.huds.push(l),this.touch?(l.el.classList.add("touchui"),this.sources.push(new Qr(a,l.el))):r===0?this.sources.push(new Zr(a,{layout:"wasd",mouse:!e,keyLook:!e,sens:this.settings.sens,canvas:this.canvas})):this.sources.push(new Zr(a,{layout:"arrows",mouse:!1,keyLook:!1,canvas:this.canvas})),l.setHotbar(o.items,o.slot),l.setHint(this.hintFor(r))}e&&(this.sharedCode=new $0(this.hudRoot));for(let r=0;r<t.monsters;r++)this.monsters.push(new kl(this,r,t));this.setMonstersRoom(0,!0),this.checkpoint.copy(this.world.startPos),this.currentRoom=-1;for(const r of this.world.tunnels)r.triggered=!1;this.players.forEach((r,a)=>r.spawn(this.world.startPos.clone().add(new T((a-(i-1)/2)*1.6,0,0)),Math.PI));for(const r of this.players)r.items.pebbles=0,r.bleedMax=t.bleedTime;this.timer=0,this.timeScale=1,this.state="playing",this.resize();for(const r of this.huds)r.showTitle("DON'T SPLASH",it("introSub"),5e3);this.usesPointer&&this.lockPointer()}get usesPointer(){return!this.touch&&this.mode!=="duo"}lockPointer(){if(this.usesPointer){this.allowUnlock=!1;try{const t=this.canvas.requestPointerLock?.();t&&t.catch&&t.catch(()=>{})}catch{}}}unlockPointer(){this.allowUnlock=!0,document.pointerLockElement===this.canvas&&document.exitPointerLock?.()}relockIfFree(){if(!this.usesPointer||this.state!=="playing")return;const t=this.players[0];t&&!t.down&&!t.dead&&this.lockPointer()}applyPlatformUI(){const t=this.touch;Dt("#p2Btn").classList.toggle("hidden",t),Dt("#pauseWrap").classList.toggle("touch",t);const e=Dt("#setPush").closest("label");e&&e.classList.toggle("hidden",t)}enableTouch(){this.touch||(this.touch=!0,this.applyPlatformUI(),this.players.forEach((t,e)=>{this.sources.some(n=>n instanceof Qr&&n.state===t.input)||(t.hud.el.classList.add("touchui"),this.sources.push(new Qr(t.input,t.hud.el)),t.hud.setHint(this.hintFor(e)))}),this._applyQuality(),this.layoutViews())}pauseFromPlayer(){this.state==="playing"&&(this.audio.ui(),this.pause(),document.pointerLockElement===this.canvas&&document.exitPointerLock())}pause(){this.state==="playing"&&(this.state="paused",Dt("#pause").classList.remove("hidden"))}resume(){if(this.state==="paused"){Dt("#pause").classList.add("hidden"),this.state="playing";for(const t of this.players)t.input.endFrame();this.audio.ui(),this.touch||this.lockPointer()}}hold(t){this.held||(this.held=!0,this.renderer.setAnimationLoop(null),this.state==="playing"&&(t==="ad"?document.exitPointerLock?.():this.pause()))}release(){this.held&&(this.held=!1,this.clock.getDelta(),this.renderer.setAnimationLoop(()=>this.frame()),this.state==="playing"&&!this.touch&&this.lockPointer())}setMonstersRoom(t,e=!1){const n=this.world.rooms[t];if(!n)return;const i={x0:-30,x1:30,z0:n.z0+6,z1:n.z1-6};this.monsters.forEach((r,a)=>{r.setRoom(i,t);const o=Math.min(n.z1-10,n.z0+40+a*12);r.teleport(this.rng.range(-24,24),o)})}restartFromCheckpoint(){const t=this.players.length;this.players.forEach((e,n)=>{e.hud.hideDown(),e.spawn(this.checkpoint.clone().add(new T((n-(t-1)/2)*1.6,0,0)),Math.PI),e.dead=!1}),this.jumpscares=[],this.timeScale=1;for(const e of this.players)e.fovKick=0;if(this.projectiles.clear(),this.noise.noises.length=0,this.setMonstersRoom(Math.max(0,this.currentRoom)),this.world.crushing&&(this.world.crushing.active=!1,this.world.crushing.group.clear(),this.world.crushing.walls.length=0,this.world.crushing.timer=this.world.crushing.interval*.6),this.world.memory){const e=this.world.memory;e.state="idle",e.cooldown=0;for(const n of e.tiles)for(const i of n)i.collapsed=!1,i.collapseT=0,i.pos.y=i.base.y,i.glow=!1,i.mesh.material=this.mats.platformMemory}for(const e of this.huds)e.setWarn(!1),e.hideCount(),e.showTitle(it("checkpoint"),it("checkpointSub"),3e3);Hl(.8,500,"#2a1510"),this.relockIfFree();for(const e of this.players)this.showGuide(e,!0)}onPlayerSplash(t){const e=new T(t.pos.x,bt.waterY,t.pos.z);this.vfx.splash(e,!0),this.audio.splash(!0,null),this.noise.emit(e,qn.playerSplash,"splash",t),navigator.vibrate?.(160),t.hud?.toast(it("splash"))}onSwimNoise(t){const e=new T(t.pos.x,bt.waterY,t.pos.z);this.vfx.wake(e),this.vfx.ring(e,1.6,.8),this.audio.slosh(),this.noise.emit(e,qn.swimMove,"swim",t)}onDistraction(t,e){for(const n of this.huds)n.toast(it(e==="bottle"?"bottleShatter":"pebbleSplash"))}onMonsterHeard(t,e){const n=this.noise.time;this.players.some(r=>Math.hypot(r.pos.x-t.pos.x,r.pos.z-t.pos.z)<30)&&n-this.lastStinger>3&&(this.lastStinger=n,this.audio.heardStinger())}throwItem(t,e){const n=t.forward;t.autoLook&&(n.y=Math.max(n.y,.22),n.normalize());const i=t.camera.getWorldPosition(new T).addScaledVector(n,.5).add(new T(0,-.1,0));this.projectiles.throw(e,i,n,new T(t.vel.x,0,t.vel.z)),t.hud.setHotbar(t.items,t.slot)}snap(t){this.audio.shutter(),t.whiteFlash=.7;const e=t.camera.getWorldPosition(new T),n=t.forward,i=t.flatForward;let r=null;for(const a of this.world.digits){if(a.found)continue;const o=new T().subVectors(a.pos,e);if(o.length()>42)continue;if(o.normalize(),t.autoLook){const h=Math.hypot(o.x,o.z);if(h<1e-4||(o.x*i.x+o.z*i.z)/h<Math.cos(.3))continue}else if(o.dot(n)<Math.cos(.21))continue;if(a.normal.dot(o)>-.15)continue;let c=!1;for(const h of this.world.pillars){if(h===a.pillar)continue;const u=e.x,d=e.z,p=a.pos.x,g=a.pos.z,v=p-u,m=g-d,f=We(((h.x-u)*v+(h.z-d)*m)/(v*v+m*m),0,1),_=u+v*f,S=d+m*f;if(Math.hypot(h.x-_,h.z-S)<h.r){c=!0;break}}if(!c){r=a;break}}if(r){if(this.world.markFound(r.slot),t.hud.polaroid(r.digit),t.hud.toast(it("photo",{d:r.digit,s:r.slot+1})),this.audio.ding(r.slot),this.audio.coin(),this.world.codeComplete())for(const a of this.huds)a.showTitle(it("codeComplete"),it("codeCompleteSub"),4e3)}else t.hud.polaroid("?");this.updateCodeHUD()}push(t){t.pushCd=8,t.throwAnim=1,this.audio.push();const e=t.flatForward,n=t.pos;if(this.settings.friendlyPush)for(const i of this.players){if(i===t||i.down)continue;const r=new T(i.pos.x-n.x,0,i.pos.z-n.z);r.length()<2.6&&r.normalize().dot(e)>.5&&(i.vel.addScaledVector(e,7.5),i.vel.y=2.5,i.grounded=!1,i.carry=null,i.hud.toast(it("pushedYou",{name:t.name||it("partner")})))}for(const i of this.monsters){const r=new T(i.pos.x-n.x,0,i.pos.z-n.z);r.length()<3.2&&r.normalize().dot(e)>.3&&i.state!=="attack"&&(i.pos.addScaledVector(r,4),i.stun=2,i.state="search",i.searchT=2.5,i.target.copy(i.pos),this.audio.monsterHiss(i.pos),t.hud.toast(it("pushedBack")))}}catchPlayer(t,e){if(t.frozen||t.down||t.dead||this.state!=="playing"||e.state==="attack")return;t.frozen=!0,t.lookAt=new T,t.shake=.7,t.redFlash=.25,t.slot=-1,t.vel.set(0,0,0),e.state="attack",e.victim=t,e.headOpen=0;const n=new T(e.pos.x,bt.waterY,e.pos.z);this.vfx.splash(n,!0),this.vfx.ring(n,7,1.2),this.audio.riser(),this.timeScale=.3,navigator.vibrate?.([80,40,80]),this.jumpscares.push({player:t,monster:e,t:0,from:e.pos.clone(),screamed:!1,bit:!1})}bleedOut(t){t.down&&(this.players.length===1?this.restartFromCheckpoint():(t.dead=!0,t.hud.hideDown(),t.hud.showTitle(it("bledOut"),it("bledOutSub"),4e3),this.checkAllDown()))}async selfRescue(t){if(t.rescuing||!t.down||t.dead||!this.ads.reviveAvailable)return;t.rescuing=!0;const e=()=>1-t.bleed/t.bleedMax,n=await this.ads.showRewarded("revive",{onStatus:i=>{t.down&&t.hud.setBleed(e(),i)}});if(t.rescuing=!1,!(!t.down||t.dead))if(n){this.revive(t);for(const i of this.monsters)i.state="retreat",i.retreatTarget=null}else t.hud.setBleed(e(),`▶ ${it("rescue")}`),t.hud.toast(it("noReward"))}revive(t){t.down=!1,t.dead=!1,t.bleed=0,t.reviveProgress=0,t.frozen=!1,t.lookAt=null,t.hud.hideDown(),this.audio.revive(),this.relockIfFree(),this.showGuide(t,!0)}routeTarget(t){const e=this.world,n=e.roomAt(t.z)||e.rooms.find(i=>i.z0>=t.z-.5)||e.rooms[e.rooms.length-1];return n.id==="locked"&&e.door?new T(e.door.pos.x,bt.platformTop,e.door.pos.z):new T(0,bt.platformTop,n.z1-2.5)}showGuide(t,e=!0){const n=this.routeTarget(t.pos);if(!t.guideBeam){const i=new dt(new Pe(1.4,1.4,34,20,1,!0),new an({color:16765802,transparent:!0,opacity:.4,blending:ta,depthWrite:!1,fog:!1,side:sn}));i.layers.set(1+t.index),this.scene.add(i),t.guideBeam=i}t.guideBeam.position.set(n.x,17,n.z),t.guideBeam.visible=!0,t.guide={target:n,t:3},e&&(t.turnTo=Math.atan2(-(n.x-t.pos.x),-(n.z-t.pos.z))),t.hud.showGuide(it("goThisWay"))}updateGuides(t){for(const e of this.players){const n=e.guide;if(!n)continue;if(n.t-=t,n.t<=0||e.down||e.dead){e.guide=null,e.guideBeam.visible=!1,e.hud.hideGuide();continue}const i=n.target.x-e.pos.x,r=n.target.z-e.pos.z,a=-Math.sin(e.yaw),o=-Math.cos(e.yaw),l=Math.cos(e.yaw),c=-Math.sin(e.yaw),h=Math.atan2(i*l+r*c,i*a+r*o),u=Math.min(1,n.t/.4);e.hud.setGuide(h,Math.hypot(i,r),u),e.guideBeam.material.opacity=.4*u*(.8+.2*Math.sin(n.t*9))}}checkAllDown(){this.players.length>1&&this.players.every(t=>t.down||t.dead)&&this.restartFromCheckpoint()}updateCodeHUD(){for(const t of this.huds)t.setCode(this.world.code,this.world.found);this.sharedCode&&this.sharedCode.set(this.world.code,this.world.found)}frame(){try{this._frame()}catch(t){const e=String(t&&t.message);(!this._reported||!this._reported.has(e))&&((this._reported||(this._reported=new Set)).add(e),console.error("[game] frame error",t))}}_frame(){const t=Math.min(.05,this.clock.getDelta());this.timeScale=this.timeScale??1;const e=t*this.timeScale;this.dtRaw=t,Ic.time.value+=e,this.state==="menu"?this.updateMenu(e):this.state==="playing"?this.updatePlaying(e):this.state==="escaping"?this.updatePlaying(e,!0):this.state==="escaped"?this.updateEscaped(e):this.state,this.audio.update(t,this._audioState());const n=this.state==="playing";n!==this._pauseShown&&(this._pauseShown=n,Dt("#pauseWrap").classList.toggle("hidden",!n)),this.render()}_audioState(){return this.players[0],{rumble:Math.max(0,...this.players.map(t=>t.wallProximity||(t.inRed?1:0))),inRed:this.players.some(t=>t.inRed),down:this.players.some(t=>t.down&&!t.dead)}}updateMenu(t){this.menuT+=t;const e=this.world.rooms[0],n=this.menuT,i=e.z0+12+n*1.1%(e.z1-e.z0-30);this.menuCam.position.set(Math.sin(n*.15)*10,3.2+Math.sin(n*.3)*.3,i),this.menuCam.lookAt(Math.sin(n*.15+1)*6,1,i+25);for(const r of this.monsters)r.update(t);this.vfx.update(t),this.noise.update(t),this.world.prePlayers(t),this.sun.position.set(this.menuCam.position.x+14,42,this.menuCam.position.z-6),this.sun.target.position.set(this.menuCam.position.x,0,this.menuCam.position.z+10),this.audio.setListener(this.menuCam.position,new T(0,0,1),new T(0,1,0))}updatePlaying(t,e=!1){const n=this.world;for(const r of this.sources)r.poll(t);this.timer+=t,n.prePlayers(t);for(const r of this.players)r.update(t);if(n.postPlayers(t,this.players,this.audio),this.handleWorldEvents(),!e)for(const r of this.monsters)r.update(t);this.updateJumpscares(this.dtRaw),this.projectiles.update(t),this.updatePickups(),this.updateTunnels(),this.updateDoor(t,e),this.updateDownAndRevive(t),this.updateGuides(this.dtRaw),this.updateHUD(t),this.vfx.update(t),this.noise.update(t);const i=this.players[0];this.sun.position.set(i.pos.x+14,42,i.pos.z-6),this.sun.target.position.set(i.pos.x,0,i.pos.z+8),this.audio.setListener(i.camera.position,i.forward,new T(0,1,0)),e&&(this.escapeT+=t,this.escapeT>1.4&&this.finishEscape());for(const r of this.players)r.input.endFrame()}handleWorldEvents(){const t=this.world.events;for(;t.length;){const e=t.shift();switch(e.type){case"memoryStart":for(const n of this.huds)n.showTitle(it("memory"),it("watch"),e.total*1e3),n.showCount(Math.ceil(e.total),it("watch"));break;case"memoryTick":for(const n of this.huds)n.showCount(e.sec,it("watch"));break;case"memoryEnd":for(const n of this.huds)n.showCount("",it("remember")),n.countEl.textContent="",n.showTitle(it("remember"),it("rememberSub"),2500),n.hideCount(2e3);break;case"collapse":for(const n of this.players)n.pos.distanceTo(e.pos)<4&&(n.shake=Math.max(n.shake,.5));break}}}updateJumpscares(t){for(let e=this.jumpscares.length-1;e>=0;e--){const n=this.jumpscares[e];n.t+=t;const i=n.player,r=n.monster,a=i.flatForward,o=n.t;let l,c=0,h=0;if(o<.45){const u=o/.45,d=Math.min(6,Math.max(3.4,Math.hypot(n.from.x-i.pos.x,n.from.z-i.pos.z)));l=d+(3.4-d)*u,c=-.9+.9*Math.sin(u*Math.PI*.5),h=6*u,this.timeScale=.3,Math.random()<.8&&this.vfx.spawn(r.pos.x+(Math.random()-.5)*1.2,bt.waterY+.1,r.pos.z+(Math.random()-.5)*1.2,(Math.random()-.5)*2,3+Math.random()*5,(Math.random()-.5)*2,.9,.3+Math.random()*.3)}else if(o<.6){const u=(o-.45)/.15;l=3.4-.75*u,h=6-30*u,this.timeScale=1,n.screamed||(n.screamed=!0,this.audio.scream(),this.audio.screech(),i.shake=2.2,i.whiteFlash=.8,navigator.vibrate?.([300,60,200]),this.vfx.splash(new T(r.pos.x,bt.waterY,r.pos.z),!1),i.splashLens(1,.5))}else if(o<1.45){const u=(o-.6)/.85;l=2.65-.2*u+Math.sin(o*28)*.03,h=-24+8*u,i.shake=Math.max(i.shake,1.1-.3*u),i.redFlash=Math.max(i.redFlash,.45+.45*Math.sin(o*40))}else{const u=Math.min(1,(o-1.45)/.2);l=2.45-1.35*u,h=-16-10*u,i.darkT=.35*Math.max(1e-4,u),n.bit||(n.bit=!0,this.audio.impact(),i.shake=2,navigator.vibrate?.(400))}r.pos.set(i.pos.x+a.x*l,i.pos.y+c,i.pos.z+a.z*l),r.yaw=Math.atan2(-(i.pos.x-r.pos.x),-(i.pos.z-r.pos.z)),r.animate(t,0),r.head.getWorldPosition(i.lookAt),i.fovKick=h,n.t>=1.7&&(i.frozen=!1,i.lookAt=null,i.down=!0,i.bleed=0,i.vel.set(0,0,0),i.fovKick=0,this.timeScale=1,r.state="retreat",r.victim=null,r.retreatTarget=null,r.headOpen=0,r.lungeY=0,r.pos.y=bt.waterY,i.hud.showDown({solo:this.players.length===1,revive:this.ads.reviveAvailable,keys:this.touch?null:i.index===0?{rescue:"SPACE",restart:"R"}:{rescue:"ENTER",restart:"K"},onRescue:()=>this.selfRescue(i),onBleedOut:()=>this.bleedOut(i)}),i.index===0&&this.unlockPointer(),i.darkT=.5,this.jumpscares.splice(e,1),this.checkAllDown())}}updatePickups(){for(const t of this.world.pickups)if(!t.taken)for(const e of this.players){if(e.down)continue;const n=e.pos.x-t.pos.x,i=e.pos.z-t.pos.z,r=e.pos.y+.9-t.pos.y;if(n*n+i*i<1.3*1.3&&Math.abs(r)<2.2){t.taken=!0,t.mesh.visible=!1,t.kind==="pebble"?(e.items.pebbles=Math.min(9,e.items.pebbles+1),e.hud.toast(it("plusPebble")),this.audio.pickup()):t.kind==="bottle"?(e.items.bottle=!0,e.hud.toast(it("gotBottle")),this.audio.pickup()):t.kind==="camera"&&(e.items.camera=!0,e.hud.toast(it("gotCamera")),this.audio.pickup()),e.hud.setHotbar(e.items,e.slot);break}}}updateTunnels(){for(const t of this.world.tunnels)if(!t.triggered){for(const e of this.players)if(Math.abs(e.pos.x)<3.6&&e.pos.z>t.z0+2&&e.pos.z<t.z1&&e.pos.y>0){t.triggered=!0,this.checkpoint.copy(t.checkpoint);const n=this.world.rooms[t.roomIdx];this.currentRoom=t.roomIdx;const i=K0(n.id);for(const a of this.huds)a.showTitle(i.title,i.rule,5e3),a.hideCount(),a.setWarn(!1);t.roomIdx>0&&this.audio.coin();const r=n.id==="locked";for(const a of this.huds)a.setCodeVisible(r);this.sharedCode&&this.sharedCode.setVisible(r),this.setMonstersRoom(t.roomIdx);for(const a of this.players)a.dead&&(a.spawn(t.checkpoint.clone(),Math.PI),a.dead=!1,a.hud.hideDown(),this.showGuide(a,!0));break}}}updateDoor(t,e){const n=this.world.door;if(n)for(const i of this.players)if(Math.hypot(i.pos.x-n.pos.x,i.pos.z-n.pos.z)<3.2&&!i.down&&!e){const a=this.world.codeComplete(),o=this.world.found.filter(Boolean).length;i.hud.setInteract(a?it(this.touch?"enterCodeTouch":"enterCode"):it("keypadLocked",{n:o})),i.input.interact&&(a?this.beginEscape():(this.audio.denied(),i.hud.toast(it("keypadWants")))),i.doorPrompt=!0}else i.doorPrompt&&(i.hud.setInteract(null),i.doorPrompt=!1)}updateDownAndRevive(t){const e=this.players.length===1;for(const n of this.players)if(!(!n.down||n.dead)){if(n.hud.setBleed(1-n.bleed/n.bleedMax),n.input.jump&&!n.rescuing&&n.bleed>.5&&this.ads.reviveAvailable&&this.selfRescue(n),n.bleed>=n.bleedMax){e?this.restartFromCheckpoint():(n.dead=!0,n.hud.hideDown(),n.hud.showTitle(it("bledOut"),it("bledOutSub"),4e3),this.checkAllDown());continue}if(!e){const i=this.players.find(r=>r!==n&&!r.down&&!r.dead);i&&(Math.hypot(i.pos.x-n.pos.x,i.pos.z-n.pos.z)<2.6?(i.input.interactHeld?n.reviveProgress=Math.min(1,n.reviveProgress+t/3):n.reviveProgress=Math.max(0,n.reviveProgress-t),i.hud.setInteract(it("holdRevive",{name:n.name}),n.reviveProgress),i.reviving=!0,n.reviveProgress>=1&&(this.revive(n),i.hud.setInteract(null),i.reviving=!1,i.hud.toast(it("backUp",{name:n.name})))):i.reviving&&(i.hud.setInteract(null),i.reviving=!1,n.reviveProgress=0))}}}updateHUD(t){const e=this.world;for(const n of this.players){const i=n.hud;i.setTimer(this.timer),i.setPush(n.pushCd),n._hbKey!==`${n.items.pebbles}|${n.items.bottle}|${n.items.camera}|${n.slot}`&&(n._hbKey=`${n.items.pebbles}|${n.items.bottle}|${n.items.camera}|${n.slot}`,i.setHotbar(n.items,n.slot)),n.inRed!==n._wasRed&&(i.setWarn(n.inRed),n._wasRed=n.inRed);let r=1/0;for(const l of this.monsters)r=Math.min(r,Math.hypot(l.pos.x-n.pos.x,l.pos.z-n.pos.z));const a=We(1-(r-4)/26,0,1),o=r<12?(.5+.5*Math.sin(this.timer*(r<6?9:5)))*.25*(1-r/12):0;n.vignette=Math.min(1,a+o),n.darkT=Math.max(0,(n.darkT||0)-t)}this._codeKey!==e.found.join("")&&(this._codeKey=e.found.join(""),this.updateCodeHUD())}beginEscape(){if(this.state==="playing"){this.state="escaping",this.escapeT=0,this.world.door.open=!0,this.audio.doorOpen();for(const t of this.players)t.frozen=!0,t.hud.setInteract(null)}}finishEscape(){this.state="escaped",document.exitPointerLock?.(),Hl(1,1800,"#ffffff"),this.audio.escapeChord();const t=this.world.diff,e=this.timer;Ge.firstEscape[t.key]||(Ge.firstEscape[t.key]=!0),t.key==="normal"&&Ge.normalWins++;const n=this.mode==="solo"?p0("solo",t.key,e):null;Fi(),Dt("#escDiff").textContent=it(t.key),Dt("#escMode").textContent=it(this.mode==="solo"?"solo":"duoShort"),Dt("#escTime").textContent=Ni(e),Dt("#escRecord").textContent=n?n.isRecord?n.prevBest==null?it("recFirst"):it("recNew",{d:Ni(n.prevBest-e)}):it("recBest",{t:Ni(n.prevBest),d:Ni(e-n.prevBest),r:n.rank+1}):"",this.autoNext=45,Dt("#escaped").classList.remove("hidden"),this.refreshMenu(),this.refreshBoard()}updateEscaped(t){this.autoNext-=t,Dt("#autoNext").textContent=it("autoNext",{n:Math.max(0,Math.ceil(this.autoNext))}),this.autoNext<=0&&this.startRun();for(const e of this.players)e.updateCamera(t);this.vfx.update(t)}resize(){const t=window.innerWidth,e=window.innerHeight;this.renderer.setSize(t,e,!1),this.layoutViews()}layoutViews(){const t=window.innerWidth,e=window.innerHeight,n=this.players.length;this.views=[],n<=1?this.views.push({x:0,y:0,w:t,h:e}):this.touch||e>t?this.views.push({x:0,y:0,w:t,h:e/2},{x:0,y:e/2,w:t,h:e/2}):this.views.push({x:0,y:0,w:t/2,h:e},{x:t/2,y:0,w:t/2,h:e}),this.huds.forEach((r,a)=>{const o=this.views[a];o&&r.setRect(o.x,o.y,o.w,o.h)});const i=Dt("#splitBar");if(i.classList.toggle("hidden",n<=1),n>1){const r=this.touch||e>t;i.classList.toggle("h",r),i.classList.toggle("v",!r)}}render(){const t=window.innerWidth,e=window.innerHeight;if(this.state==="menu"){this.menuCam.aspect=t/e,this.menuCam.updateProjectionMatrix(),this.postfx.render(this.scene,this.menuCam,{x:0,y:0,w:t,h:e},{vignette:.2,bloom:.5},"menu");return}if(this.players.length){if(this.debugCam){this.menuCam.aspect=t/e,this.menuCam.updateProjectionMatrix(),this.menuCam.position.copy(this.debugCam.pos),this.menuCam.lookAt(this.debugCam.lookAt),this.postfx.render(this.scene,this.menuCam,{x:0,y:0,w:t,h:e},{vignette:0,bloom:.4},"menu");return}(!this.views||this.views.length!==this.players.length)&&this.layoutViews(),this.players.forEach((n,i)=>{const r=this.views[i],a={x:r.x,y:e-r.y-r.h,w:r.w,h:r.h};n.camera.aspect=r.w/r.h,n.camera.fov=this.settings.fov+(n.fovKick||0),n.camera.updateProjectionMatrix();const o=Math.min(1,(n.inRed?.55:0)+n.redFlash+n.wallProximity*.25+(n.down?.35:0)),l=n.darkT>0?Math.min(1,n.darkT/.35):0;this.postfx.render(this.scene,n.camera,a,{vignette:n.vignette+(n.down?.4:0),red:o,flash:n.whiteFlash,bloom:.55,dark:l,wet:n.wet,wash:n.wash,wetT:n.wetT,wetSeed:n.wetSeed},i)})}}}window.game=new hg;
