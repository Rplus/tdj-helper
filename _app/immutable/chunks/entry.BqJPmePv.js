import{O as ot,L as it}from"./scheduler.DRRiJXpm.js";import{w as pe}from"./index.BEAJhnzG.js";import{a as st,b as I}from"./paths.D4HjjtRD.js";import{H as ee,S as ge,R as De}from"./control.CYgJF_JY.js";new URL("sveltekit-internal://");function ct(e,t){return e==="/"||t==="ignore"?e:t==="never"?e.endsWith("/")?e.slice(0,-1):e:t==="always"&&!e.endsWith("/")?e+"/":e}function lt(e){return e.split("%25").map(decodeURI).join("%25")}function ft(e){for(const t in e)e[t]=decodeURIComponent(e[t]);return e}function ce({href:e}){return e.split("#")[0]}const ut=["href","pathname","search","toString","toJSON"];function dt(e,t,n){const r=new URL(e);Object.defineProperty(r,"searchParams",{value:new Proxy(r.searchParams,{get(a,o){if(o==="get"||o==="getAll"||o==="has")return i=>(n(i),a[o](i));t();const s=Reflect.get(a,o);return typeof s=="function"?s.bind(a):s}}),enumerable:!0,configurable:!0});for(const a of ut)Object.defineProperty(r,a,{get(){return t(),e[a]},enumerable:!0,configurable:!0});return r}const ht="/__data.json",pt=".html__data.json";function gt(e){return e.endsWith(".html")?e.replace(/\.html$/,pt):e.replace(/\/$/,"")+ht}function mt(...e){let t=5381;for(const n of e)if(typeof n=="string"){let r=n.length;for(;r;)t=t*33^n.charCodeAt(--r)}else if(ArrayBuffer.isView(n)){const r=new Uint8Array(n.buffer,n.byteOffset,n.byteLength);let a=r.length;for(;a;)t=t*33^r[--a]}else throw new TypeError("value must be a string or TypedArray");return(t>>>0).toString(36)}function _t(e){const t=atob(e),n=new Uint8Array(t.length);for(let r=0;r<t.length;r++)n[r]=t.charCodeAt(r);return n.buffer}const $e=window.fetch;window.fetch=(e,t)=>((e instanceof Request?e.method:(t==null?void 0:t.method)||"GET")!=="GET"&&F.delete(me(e)),$e(e,t));const F=new Map;function yt(e,t){const n=me(e,t),r=document.querySelector(n);if(r!=null&&r.textContent){let{body:a,...o}=JSON.parse(r.textContent);const s=r.getAttribute("data-ttl");return s&&F.set(n,{body:a,init:o,ttl:1e3*Number(s)}),r.getAttribute("data-b64")!==null&&(a=_t(a)),Promise.resolve(new Response(a,o))}return window.fetch(e,t)}function wt(e,t,n){if(F.size>0){const r=me(e,n),a=F.get(r);if(a){if(performance.now()<a.ttl&&["default","force-cache","only-if-cached",void 0].includes(n==null?void 0:n.cache))return new Response(a.body,a.init);F.delete(r)}}return window.fetch(t,n)}function me(e,t){let r=`script[data-sveltekit-fetched][data-url=${JSON.stringify(e instanceof Request?e.url:e)}]`;if(t!=null&&t.headers||t!=null&&t.body){const a=[];t.headers&&a.push([...new Headers(t.headers)].join(",")),t.body&&(typeof t.body=="string"||ArrayBuffer.isView(t.body))&&a.push(t.body),r+=`[data-hash="${mt(...a)}"]`}return r}const vt=/^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;function bt(e){const t=[];return{pattern:e==="/"?/^\/$/:new RegExp(`^${kt(e).map(r=>{const a=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(r);if(a)return t.push({name:a[1],matcher:a[2],optional:!1,rest:!0,chained:!0}),"(?:/(.*))?";const o=/^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(r);if(o)return t.push({name:o[1],matcher:o[2],optional:!0,rest:!1,chained:!0}),"(?:/([^/]+))?";if(!r)return;const s=r.split(/\[(.+?)\](?!\])/);return"/"+s.map((c,f)=>{if(f%2){if(c.startsWith("x+"))return le(String.fromCharCode(parseInt(c.slice(2),16)));if(c.startsWith("u+"))return le(String.fromCharCode(...c.slice(2).split("-").map(l=>parseInt(l,16))));const u=vt.exec(c),[,h,g,d,m]=u;return t.push({name:d,matcher:m,optional:!!h,rest:!!g,chained:g?f===1&&s[0]==="":!1}),g?"(.*?)":h?"([^/]*)?":"([^/]+?)"}return le(c)}).join("")}).join("")}/?$`),params:t}}function Et(e){return!/^\([^)]+\)$/.test(e)}function kt(e){return e.slice(1).split("/").filter(Et)}function St(e,t,n){const r={},a=e.slice(1),o=a.filter(i=>i!==void 0);let s=0;for(let i=0;i<t.length;i+=1){const c=t[i];let f=a[i-s];if(c.chained&&c.rest&&s&&(f=a.slice(i-s,i+1).filter(u=>u).join("/"),s=0),f===void 0){c.rest&&(r[c.name]="");continue}if(!c.matcher||n[c.matcher](f)){r[c.name]=f;const u=t[i+1],h=a[i+1];u&&!u.rest&&u.optional&&h&&c.chained&&(s=0),!u&&!h&&Object.keys(r).length===o.length&&(s=0);continue}if(c.optional&&c.chained){s++;continue}return}if(!s)return r}function le(e){return e.normalize().replace(/[[\]]/g,"\\$&").replace(/%/g,"%25").replace(/\//g,"%2[Ff]").replace(/\?/g,"%3[Ff]").replace(/#/g,"%23").replace(/[.*+?^${}()|\\]/g,"\\$&")}function At({nodes:e,server_loads:t,dictionary:n,matchers:r}){const a=new Set(t);return Object.entries(n).map(([i,[c,f,u]])=>{const{pattern:h,params:g}=bt(i),d={id:i,exec:m=>{const l=h.exec(m);if(l)return St(l,g,r)},errors:[1,...u||[]].map(m=>e[m]),layouts:[0,...f||[]].map(s),leaf:o(c)};return d.errors.length=d.layouts.length=Math.max(d.errors.length,d.layouts.length),d});function o(i){const c=i<0;return c&&(i=~i),[c,e[i]]}function s(i){return i===void 0?i:[a.has(i),e[i]]}}function Ce(e,t=JSON.parse){try{return t(sessionStorage[e])}catch{}}function Pe(e,t,n=JSON.stringify){const r=n(t);try{sessionStorage[e]=r}catch{}}const Rt="1711333520402",Ve="sveltekit:snapshot",Fe="sveltekit:scroll",_e="sveltekit:states",Me="sveltekit:pageurl",T="sveltekit:history",D="sveltekit:navigation",K={tap:1,hover:2,viewport:3,eager:4,off:-1,false:-1},q=location.origin;function ye(e){if(e instanceof URL)return e;let t=document.baseURI;if(!t){const n=document.getElementsByTagName("base");t=n.length?n[0].href:document.URL}return new URL(e,t)}function we(){return{x:pageXOffset,y:pageYOffset}}function j(e,t){return e.getAttribute(`data-sveltekit-${t}`)}const Ue={...K,"":K.hover};function Ge(e){let t=e.assignedSlot??e.parentNode;return(t==null?void 0:t.nodeType)===11&&(t=t.host),t}function He(e,t){for(;e&&e!==t;){if(e.nodeName.toUpperCase()==="A"&&e.hasAttribute("href"))return e;e=Ge(e)}}function ue(e,t){let n;try{n=new URL(e instanceof SVGAElement?e.href.baseVal:e.href,document.baseURI)}catch{}const r=e instanceof SVGAElement?e.target.baseVal:e.target,a=!n||!!r||te(n,t)||(e.getAttribute("rel")||"").split(/\s+/).includes("external"),o=(n==null?void 0:n.origin)===q&&e.hasAttribute("download");return{url:n,external:a,target:r,download:o}}function Y(e){let t=null,n=null,r=null,a=null,o=null,s=null,i=e;for(;i&&i!==document.documentElement;)r===null&&(r=j(i,"preload-code")),a===null&&(a=j(i,"preload-data")),t===null&&(t=j(i,"keepfocus")),n===null&&(n=j(i,"noscroll")),o===null&&(o=j(i,"reload")),s===null&&(s=j(i,"replacestate")),i=Ge(i);function c(f){switch(f){case"":case"true":return!0;case"off":case"false":return!1;default:return}}return{preload_code:Ue[r??"off"],preload_data:Ue[a??"off"],keepfocus:c(t),noscroll:c(n),reload:c(o),replace_state:c(s)}}function xe(e){const t=pe(e);let n=!0;function r(){n=!0,t.update(s=>s)}function a(s){n=!1,t.set(s)}function o(s){let i;return t.subscribe(c=>{(i===void 0||n&&c!==i)&&s(i=c)})}return{notify:r,set:a,subscribe:o}}function It(){const{set:e,subscribe:t}=pe(!1);let n;async function r(){clearTimeout(n);try{const a=await fetch(`${st}/_app/version.json`,{headers:{pragma:"no-cache","cache-control":"no-cache"}});if(!a.ok)return!1;const s=(await a.json()).version!==Rt;return s&&(e(!0),clearTimeout(n)),s}catch{return!1}}return{subscribe:t,check:r}}function te(e,t){return e.origin!==q||!e.pathname.startsWith(t)}const Lt=-1,Pt=-2,Ut=-3,xt=-4,Nt=-5,Tt=-6;function Ot(e,t){if(typeof e=="number")return a(e,!0);if(!Array.isArray(e)||e.length===0)throw new Error("Invalid input");const n=e,r=Array(n.length);function a(o,s=!1){if(o===Lt)return;if(o===Ut)return NaN;if(o===xt)return 1/0;if(o===Nt)return-1/0;if(o===Tt)return-0;if(s)throw new Error("Invalid input");if(o in r)return r[o];const i=n[o];if(!i||typeof i!="object")r[o]=i;else if(Array.isArray(i))if(typeof i[0]=="string"){const c=i[0],f=t==null?void 0:t[c];if(f)return r[o]=f(a(i[1]));switch(c){case"Date":r[o]=new Date(i[1]);break;case"Set":const u=new Set;r[o]=u;for(let d=1;d<i.length;d+=1)u.add(a(i[d]));break;case"Map":const h=new Map;r[o]=h;for(let d=1;d<i.length;d+=2)h.set(a(i[d]),a(i[d+1]));break;case"RegExp":r[o]=new RegExp(i[1],i[2]);break;case"Object":r[o]=Object(i[1]);break;case"BigInt":r[o]=BigInt(i[1]);break;case"null":const g=Object.create(null);r[o]=g;for(let d=1;d<i.length;d+=2)g[i[d]]=a(i[d+1]);break;default:throw new Error(`Unknown type ${c}`)}}else{const c=new Array(i.length);r[o]=c;for(let f=0;f<i.length;f+=1){const u=i[f];u!==Pt&&(c[f]=a(u))}}else{const c={};r[o]=c;for(const f in i){const u=i[f];c[f]=a(u)}}return r[o]}return a(0)}const qe=new Set(["load","prerender","csr","ssr","trailingSlash","config"]);[...qe];const jt=new Set([...qe]);[...jt];function Dt(e){return e.filter(t=>t!=null)}const $t="x-sveltekit-invalidated",Ct="x-sveltekit-trailing-slash";function W(e){return e instanceof ee||e instanceof ge?e.status:500}function Vt(e){return e instanceof ge?e.text:"Internal Error"}const O=Ce(Fe)??{},M=Ce(Ve)??{},U={url:xe({}),page:xe({}),navigating:pe(null),updated:It()};function ne(e){O[e]=we()}function Be(e,t){let n=e+1;for(;O[n];)delete O[n],n+=1;for(n=t+1;M[n];)delete M[n],n+=1}function $(e){return location.href=e.href,new Promise(()=>{})}function Ne(){}let ae,de,z,L,he,C;const Ke=[],J=[];let P=null;const ve=[],Ft=[];let N=[],w={branch:[],error:null,url:null},be=!1,X=!1,Te=!0,G=!1,V=!1,Ee=!1,ke=!1,re,E,R,A,Z;async function en(e,t,n){var a,o;document.URL!==location.href&&(location.href=location.href),C=e,ae=At(e),L=document.documentElement,he=t,de=e.nodes[0],z=e.nodes[1],de(),z(),E=(a=history.state)==null?void 0:a[T],R=(o=history.state)==null?void 0:o[D],E||(E=R=Date.now(),history.replaceState({...history.state,[T]:E,[D]:R},""));const r=O[E];r&&(history.scrollRestoration="manual",scrollTo(r.x,r.y)),n?await Wt(he,n):Kt(location.href,{replaceState:!0}),Yt()}function Mt(){Ke.length=0,ke=!1}function Ye(e){J.some(t=>t==null?void 0:t.snapshot)&&(M[e]=J.map(t=>{var n;return(n=t==null?void 0:t.snapshot)==null?void 0:n.capture()}))}function We(e){var t;(t=M[e])==null||t.forEach((n,r)=>{var a,o;(o=(a=J[r])==null?void 0:a.snapshot)==null||o.restore(n)})}function Oe(){ne(E),Pe(Fe,O),Ye(R),Pe(Ve,M)}async function ze(e,t,n,r){return B({type:"goto",url:ye(e),keepfocus:t.keepFocus,noscroll:t.noScroll,replace_state:t.replaceState,state:t.state,redirect_count:n,nav_token:r,accept:()=>{t.invalidateAll&&(ke=!0)}})}async function Gt(e){return P={id:e.id,promise:Xe(e).then(t=>(t.type==="loaded"&&t.state.error&&(P=null),t))},P.promise}async function fe(e){const t=ae.find(n=>n.exec(Ze(e)));t&&await Promise.all([...t.layouts,t.leaf].map(n=>n==null?void 0:n[1]()))}function Je(e,t){var a;w=e.state;const n=document.querySelector("style[data-sveltekit]");n&&n.remove(),A=e.props.page,re=new C.root({target:t,props:{...e.props,stores:U,components:J},hydrate:!0}),We(R);const r={from:null,to:{params:w.params,route:{id:((a=w.route)==null?void 0:a.id)??null},url:new URL(location.href)},willUnload:!1,type:"enter",complete:Promise.resolve()};N.forEach(o=>o(r)),X=!0}async function Q({url:e,params:t,branch:n,status:r,error:a,route:o,form:s}){let i="never";if(I&&(e.pathname===I||e.pathname===I+"/"))i="always";else for(const d of n)(d==null?void 0:d.slash)!==void 0&&(i=d.slash);e.pathname=ct(e.pathname,i),e.search=e.search;const c={type:"loaded",state:{url:e,params:t,branch:n,error:a,route:o},props:{constructors:Dt(n).map(d=>d.node.component),page:A}};s!==void 0&&(c.props.form=s);let f={},u=!A,h=0;for(let d=0;d<Math.max(n.length,w.branch.length);d+=1){const m=n[d],l=w.branch[d];(m==null?void 0:m.data)!==(l==null?void 0:l.data)&&(u=!0),m&&(f={...f,...m.data},u&&(c.props[`data_${h}`]=f),h+=1)}return(!w.url||e.href!==w.url.href||w.error!==a||s!==void 0&&s!==A.form||u)&&(c.props.page={error:a,params:t,route:{id:(o==null?void 0:o.id)??null},state:{},status:r,url:new URL(e),form:s??null,data:u?f:A.data}),c}async function Se({loader:e,parent:t,url:n,params:r,route:a,server_data_node:o}){var u,h,g;let s=null,i=!0;const c={dependencies:new Set,params:new Set,parent:!1,route:!1,url:!1,search_params:new Set},f=await e();if((u=f.universal)!=null&&u.load){let d=function(...l){for(const _ of l){const{href:v}=new URL(_,n);c.dependencies.add(v)}};const m={route:new Proxy(a,{get:(l,_)=>(i&&(c.route=!0),l[_])}),params:new Proxy(r,{get:(l,_)=>(i&&c.params.add(_),l[_])}),data:(o==null?void 0:o.data)??null,url:dt(n,()=>{i&&(c.url=!0)},l=>{i&&c.search_params.add(l)}),async fetch(l,_){let v;l instanceof Request?(v=l.url,_={body:l.method==="GET"||l.method==="HEAD"?void 0:await l.blob(),cache:l.cache,credentials:l.credentials,headers:l.headers,integrity:l.integrity,keepalive:l.keepalive,method:l.method,mode:l.mode,redirect:l.redirect,referrer:l.referrer,referrerPolicy:l.referrerPolicy,signal:l.signal,..._}):v=l;const S=new URL(v,n);return i&&d(S.href),S.origin===n.origin&&(v=S.href.slice(n.origin.length)),X?wt(v,S.href,_):yt(v,_)},setHeaders:()=>{},depends:d,parent(){return i&&(c.parent=!0),t()},untrack(l){i=!1;try{return l()}finally{i=!0}}};s=await f.universal.load.call(null,m)??null}return{node:f,loader:e,server:o,universal:(h=f.universal)!=null&&h.load?{type:"data",data:s,uses:c}:null,data:s??(o==null?void 0:o.data)??null,slash:((g=f.universal)==null?void 0:g.trailingSlash)??(o==null?void 0:o.slash)}}function je(e,t,n,r,a,o){if(ke)return!0;if(!a)return!1;if(a.parent&&e||a.route&&t||a.url&&n)return!0;for(const s of a.search_params)if(r.has(s))return!0;for(const s of a.params)if(o[s]!==w.params[s])return!0;for(const s of a.dependencies)if(Ke.some(i=>i(new URL(s))))return!0;return!1}function Ae(e,t){return(e==null?void 0:e.type)==="data"?e:(e==null?void 0:e.type)==="skip"?t??null:null}function Ht(e,t){if(!e)return new Set(t.searchParams.keys());const n=new Set([...e.searchParams.keys(),...t.searchParams.keys()]);for(const r of n){const a=e.searchParams.getAll(r),o=t.searchParams.getAll(r);a.every(s=>o.includes(s))&&o.every(s=>a.includes(s))&&n.delete(r)}return n}async function Xe({id:e,invalidating:t,url:n,params:r,route:a}){if((P==null?void 0:P.id)===e)return P.promise;const{errors:o,layouts:s,leaf:i}=a,c=[...s,i];o.forEach(p=>p==null?void 0:p().catch(()=>{})),c.forEach(p=>p==null?void 0:p[1]().catch(()=>{}));let f=null;const u=w.url?e!==w.url.pathname+w.url.search:!1,h=w.route?a.id!==w.route.id:!1,g=Ht(w.url,n);let d=!1;const m=c.map((p,y)=>{var x;const b=w.branch[y],k=!!(p!=null&&p[0])&&((b==null?void 0:b.loader)!==p[1]||je(d,h,u,g,(x=b.server)==null?void 0:x.uses,r));return k&&(d=!0),k});if(m.some(Boolean)){try{f=await nt(n,m)}catch(p){return oe({status:W(p),error:await H(p,{url:n,params:r,route:{id:a.id}}),url:n,route:a})}if(f.type==="redirect")return f}const l=f==null?void 0:f.nodes;let _=!1;const v=c.map(async(p,y)=>{var ie;if(!p)return;const b=w.branch[y],k=l==null?void 0:l[y];if((!k||k.type==="skip")&&p[1]===(b==null?void 0:b.loader)&&!je(_,h,u,g,(ie=b.universal)==null?void 0:ie.uses,r))return b;if(_=!0,(k==null?void 0:k.type)==="error")throw k;return Se({loader:p[1],url:n,params:r,route:a,parent:async()=>{var Le;const Ie={};for(let se=0;se<y;se+=1)Object.assign(Ie,(Le=await v[se])==null?void 0:Le.data);return Ie},server_data_node:Ae(k===void 0&&p[0]?{type:"skip"}:k??null,p[0]?b==null?void 0:b.server:void 0)})});for(const p of v)p.catch(()=>{});const S=[];for(let p=0;p<c.length;p+=1)if(c[p])try{S.push(await v[p])}catch(y){if(y instanceof De)return{type:"redirect",location:y.location};let b=W(y),k;if(l!=null&&l.includes(y))b=y.status??b,k=y.error;else if(y instanceof ee)k=y.body;else{if(await U.updated.check())return await $(n);k=await H(y,{params:r,url:n,route:{id:a.id}})}const x=await qt(p,S,o);return x?await Q({url:n,params:r,branch:S.slice(0,x.idx).concat(x.node),status:b,error:k,route:a}):await et(n,{id:a.id},k,b)}else S.push(void 0);return await Q({url:n,params:r,branch:S,status:200,error:null,route:a,form:t?void 0:null})}async function qt(e,t,n){for(;e--;)if(n[e]){let r=e;for(;!t[r];)r-=1;try{return{idx:r+1,node:{node:await n[e](),loader:n[e],data:{},server:null,universal:null}}}catch{continue}}}async function oe({status:e,error:t,url:n,route:r}){const a={};let o=null;if(C.server_loads[0]===0)try{const f=await nt(n,[!0]);if(f.type!=="data"||f.nodes[0]&&f.nodes[0].type!=="data")throw 0;o=f.nodes[0]??null}catch{(n.origin!==q||n.pathname!==location.pathname||be)&&await $(n)}const i=await Se({loader:de,url:n,params:a,route:r,parent:()=>Promise.resolve({}),server_data_node:Ae(o)}),c={node:await z(),loader:z,universal:null,server:null,data:null};return await Q({url:n,params:a,branch:[i,c],status:e,error:t,route:null})}function Re(e,t){if(!e||te(e,I))return;let n;try{n=C.hooks.reroute({url:new URL(e)})??e.pathname}catch{return}const r=Ze(n);for(const a of ae){const o=a.exec(r);if(o)return{id:e.pathname+e.search,invalidating:t,route:a,params:ft(o),url:e}}}function Ze(e){return lt(e.slice(I.length)||"/")}function Qe({url:e,type:t,intent:n,delta:r}){let a=!1;const o=rt(w,n,e,t);r!==void 0&&(o.navigation.delta=r);const s={...o.navigation,cancel:()=>{a=!0,o.reject(new Error("navigation cancelled"))}};return G||ve.forEach(i=>i(s)),a?null:o}async function B({type:e,url:t,popped:n,keepfocus:r,noscroll:a,replace_state:o,state:s={},redirect_count:i=0,nav_token:c={},accept:f=Ne,block:u=Ne}){const h=Re(t,!1),g=Qe({url:t,type:e,delta:n==null?void 0:n.delta,intent:h});if(!g){u();return}const d=E,m=R;f(),G=!0,X&&U.navigating.set(g.navigation),Z=c;let l=h&&await Xe(h);if(!l){if(te(t,I))return await $(t);l=await et(t,{id:null},await H(new ge(404,"Not Found",`Not found: ${t.pathname}`),{url:t,params:{},route:{id:null}}),404)}if(t=(h==null?void 0:h.url)||t,Z!==c)return g.reject(new Error("navigation aborted")),!1;if(l.type==="redirect")if(i>=20)l=await oe({status:500,error:await H(new Error("Redirect loop"),{url:t,params:{},route:{id:null}}),url:t,route:{id:null}});else return ze(new URL(l.location,t).href,{},i+1,c),!1;else l.props.page.status>=400&&await U.updated.check()&&await $(t);if(Mt(),ne(d),Ye(m),l.props.page.url.pathname!==t.pathname&&(t.pathname=l.props.page.url.pathname),s=n?n.state:s,!n){const p=o?0:1,y={[T]:E+=p,[D]:R+=p,[_e]:s};(o?history.replaceState:history.pushState).call(history,y,"",t),o||Be(E,R)}if(P=null,l.props.page.state=s,X){w=l.state,l.props.page&&(l.props.page.url=t);const p=(await Promise.all(Ft.map(y=>y(g.navigation)))).filter(y=>typeof y=="function");if(p.length>0){let y=function(){N=N.filter(b=>!p.includes(b))};p.push(y),N.push(...p)}re.$set(l.props),Ee=!0}else Je(l,he);const{activeElement:_}=document;await ot();const v=n?n.scroll:a?we():null;if(Te){const p=t.hash&&document.getElementById(decodeURIComponent(t.hash.slice(1)));v?scrollTo(v.x,v.y):p?p.scrollIntoView():scrollTo(0,0)}const S=document.activeElement!==_&&document.activeElement!==document.body;!r&&!S&&zt(),Te=!0,l.props.page&&(A=l.props.page),G=!1,e==="popstate"&&We(R),g.fulfil(void 0),N.forEach(p=>p(g.navigation)),U.navigating.set(null)}async function et(e,t,n,r){return e.origin===q&&e.pathname===location.pathname&&!be?await oe({status:r,error:n,url:e,route:t}):await $(e)}function Bt(){let e;L.addEventListener("mousemove",o=>{const s=o.target;clearTimeout(e),e=setTimeout(()=>{r(s,2)},20)});function t(o){r(o.composedPath()[0],1)}L.addEventListener("mousedown",t),L.addEventListener("touchstart",t,{passive:!0});const n=new IntersectionObserver(o=>{for(const s of o)s.isIntersecting&&(fe(s.target.href),n.unobserve(s.target))},{threshold:0});function r(o,s){const i=He(o,L);if(!i)return;const{url:c,external:f,download:u}=ue(i,I);if(f||u)return;const h=Y(i);if(!h.reload)if(s<=h.preload_data){const g=Re(c,!1);g&&Gt(g)}else s<=h.preload_code&&fe(c.pathname)}function a(){n.disconnect();for(const o of L.querySelectorAll("a")){const{url:s,external:i,download:c}=ue(o,I);if(i||c)continue;const f=Y(o);f.reload||(f.preload_code===K.viewport&&n.observe(o),f.preload_code===K.eager&&fe(s.pathname))}}N.push(a),a()}function H(e,t){if(e instanceof ee)return e.body;const n=W(e),r=Vt(e);return C.hooks.handleError({error:e,event:t,status:n,message:r})??{message:r}}function tt(e,t){it(()=>(e.push(t),()=>{const n=e.indexOf(t);e.splice(n,1)}))}function tn(e){tt(N,e)}function nn(e){tt(ve,e)}function Kt(e,t={}){return e=ye(e),e.origin!==q?Promise.reject(new Error("goto: invalid URL")):ze(e,t,0)}function an(e,t){ne(E);const n={[T]:E+=1,[D]:R,[Me]:A.url.href,[_e]:t};history.pushState(n,"",ye(e)),Ee=!0,A={...A,state:t},re.$set({page:A}),Be(E,R)}function Yt(){var t;history.scrollRestoration="manual",addEventListener("beforeunload",n=>{let r=!1;if(Oe(),!G){const a=rt(w,void 0,null,"leave"),o={...a.navigation,cancel:()=>{r=!0,a.reject(new Error("navigation cancelled"))}};ve.forEach(s=>s(o))}r?(n.preventDefault(),n.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&Oe()}),(t=navigator.connection)!=null&&t.saveData||Bt(),L.addEventListener("click",n=>{var g;if(n.button||n.which!==1||n.metaKey||n.ctrlKey||n.shiftKey||n.altKey||n.defaultPrevented)return;const r=He(n.composedPath()[0],L);if(!r)return;const{url:a,external:o,target:s,download:i}=ue(r,I);if(!a)return;if(s==="_parent"||s==="_top"){if(window.parent!==window)return}else if(s&&s!=="_self")return;const c=Y(r);if(!(r instanceof SVGAElement)&&a.protocol!==location.protocol&&!(a.protocol==="https:"||a.protocol==="http:")||i)return;if(o||c.reload){Qe({url:a,type:"link"})?G=!0:n.preventDefault();return}const[u,h]=a.href.split("#");if(h!==void 0&&u===ce(location)){const[,d]=w.url.href.split("#");if(d===h){n.preventDefault(),h===""||h==="top"&&r.ownerDocument.getElementById("top")===null?window.scrollTo({top:0}):(g=r.ownerDocument.getElementById(h))==null||g.scrollIntoView();return}if(V=!0,ne(E),e(a),!c.replace_state)return;V=!1}n.preventDefault(),B({type:"link",url:a,keepfocus:c.keepfocus,noscroll:c.noscroll,replace_state:c.replace_state??a.href===location.href})}),L.addEventListener("submit",n=>{if(n.defaultPrevented)return;const r=HTMLFormElement.prototype.cloneNode.call(n.target),a=n.submitter;if(((a==null?void 0:a.formMethod)||r.method)!=="get")return;const s=new URL((a==null?void 0:a.hasAttribute("formaction"))&&(a==null?void 0:a.formAction)||r.action);if(te(s,I))return;const i=n.target,c=Y(i);if(c.reload)return;n.preventDefault(),n.stopPropagation();const f=new FormData(i),u=a==null?void 0:a.getAttribute("name");u&&f.append(u,(a==null?void 0:a.getAttribute("value"))??""),s.search=new URLSearchParams(f).toString(),B({type:"form",url:s,keepfocus:c.keepfocus,noscroll:c.noscroll,replace_state:c.replace_state??s.href===location.href})}),addEventListener("popstate",async n=>{var r;if((r=n.state)!=null&&r[T]){const a=n.state[T];if(Z={},a===E)return;const o=O[a],s=n.state[_e]??{},i=new URL(n.state[Me]??location.href),c=n.state[D],f=ce(location)===ce(w.url);if(c===R&&(Ee||f)){e(i),O[E]=we(),o&&scrollTo(o.x,o.y),s!==A.state&&(A={...A,state:s},re.$set({page:A})),E=a;return}const h=a-E;await B({type:"popstate",url:i,popped:{state:s,scroll:o,delta:h},accept:()=>{E=a,R=c},block:()=>{history.go(-h)},nav_token:Z})}else if(!V){const a=new URL(location.href);e(a)}}),addEventListener("hashchange",()=>{V&&(V=!1,history.replaceState({...history.state,[T]:++E,[D]:R},"",location.href))});for(const n of document.querySelectorAll("link"))n.rel==="icon"&&(n.href=n.href);addEventListener("pageshow",n=>{n.persisted&&U.navigating.set(null)});function e(n){w.url=n,U.page.set({...A,url:n}),U.page.notify()}}async function Wt(e,{status:t=200,error:n,node_ids:r,params:a,route:o,data:s,form:i}){be=!0;const c=new URL(location.href);({params:a={},route:o={id:null}}=Re(c,!1)||{});let f;try{const u=r.map(async(d,m)=>{const l=s[m];return l!=null&&l.uses&&(l.uses=at(l.uses)),Se({loader:C.nodes[d],url:c,params:a,route:o,parent:async()=>{const _={};for(let v=0;v<m;v+=1)Object.assign(_,(await u[v]).data);return _},server_data_node:Ae(l)})}),h=await Promise.all(u),g=ae.find(({id:d})=>d===o.id);if(g){const d=g.layouts;for(let m=0;m<d.length;m++)d[m]||h.splice(m,0,void 0)}f=await Q({url:c,params:a,branch:h,status:t,error:n,form:i,route:g??null})}catch(u){if(u instanceof De){await $(new URL(u.location,location.href));return}f=await oe({status:W(u),error:await H(u,{url:c,params:a,route:o}),url:c,route:o})}f.props.page&&(f.props.page.state={}),Je(f,e)}async function nt(e,t){var a;const n=new URL(e);n.pathname=gt(e.pathname),e.pathname.endsWith("/")&&n.searchParams.append(Ct,"1"),n.searchParams.append($t,t.map(o=>o?"1":"0").join(""));const r=await $e(n.href);if(!r.ok){let o;throw(a=r.headers.get("content-type"))!=null&&a.includes("application/json")?o=await r.json():r.status===404?o="Not Found":r.status===500&&(o="Internal Error"),new ee(r.status,o)}return new Promise(async o=>{var h;const s=new Map,i=r.body.getReader(),c=new TextDecoder;function f(g){return Ot(g,{Promise:d=>new Promise((m,l)=>{s.set(d,{fulfil:m,reject:l})})})}let u="";for(;;){const{done:g,value:d}=await i.read();if(g&&!u)break;for(u+=!d&&u?`
`:c.decode(d,{stream:!0});;){const m=u.indexOf(`
`);if(m===-1)break;const l=JSON.parse(u.slice(0,m));if(u=u.slice(m+1),l.type==="redirect")return o(l);if(l.type==="data")(h=l.nodes)==null||h.forEach(_=>{(_==null?void 0:_.type)==="data"&&(_.uses=at(_.uses),_.data=f(_.data))}),o(l);else if(l.type==="chunk"){const{id:_,data:v,error:S}=l,p=s.get(_);s.delete(_),S?p.reject(f(S)):p.fulfil(f(v))}}}})}function at(e){return{dependencies:new Set((e==null?void 0:e.dependencies)??[]),params:new Set((e==null?void 0:e.params)??[]),parent:!!(e!=null&&e.parent),route:!!(e!=null&&e.route),url:!!(e!=null&&e.url),search_params:new Set((e==null?void 0:e.search_params)??[])}}function zt(){const e=document.querySelector("[autofocus]");if(e)e.focus();else{const t=document.body,n=t.getAttribute("tabindex");t.tabIndex=-1,t.focus({preventScroll:!0,focusVisible:!1}),n!==null?t.setAttribute("tabindex",n):t.removeAttribute("tabindex");const r=getSelection();if(r&&r.type!=="None"){const a=[];for(let o=0;o<r.rangeCount;o+=1)a.push(r.getRangeAt(o));setTimeout(()=>{if(r.rangeCount===a.length){for(let o=0;o<r.rangeCount;o+=1){const s=a[o],i=r.getRangeAt(o);if(s.commonAncestorContainer!==i.commonAncestorContainer||s.startContainer!==i.startContainer||s.endContainer!==i.endContainer||s.startOffset!==i.startOffset||s.endOffset!==i.endOffset)return}r.removeAllRanges()}})}}}function rt(e,t,n,r){var c,f;let a,o;const s=new Promise((u,h)=>{a=u,o=h});return s.catch(()=>{}),{navigation:{from:{params:e.params,route:{id:((c=e.route)==null?void 0:c.id)??null},url:e.url},to:n&&{params:(t==null?void 0:t.params)??null,route:{id:((f=t==null?void 0:t.route)==null?void 0:f.id)??null},url:n},willUnload:!t,type:r,complete:s},fulfil:a,reject:o}}export{tn as a,nn as b,en as c,an as p,U as s};
