var st=Object.defineProperty;var it=(t,e,n)=>e in t?st(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var g=(t,e,n)=>(it(t,typeof e!="symbol"?e+"":e,n),n);function C(){}function rt(t,e){for(const n in e)t[n]=e[n];return t}function Q(t){return t()}function U(){return Object.create(null)}function v(t){t.forEach(Q)}function X(t){return typeof t=="function"}function Et(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let M;function V(t,e){return t===e?!0:(M||(M=document.createElement("a")),M.href=e,t===M.href)}function G(t){return t.split(",").map(e=>e.trim().split(" ").filter(Boolean))}function kt(t,e){const n=G(t.srcset),s=G(e||"");return s.length===n.length&&s.every(([i,r],o)=>r===n[o][1]&&(V(n[o][0],i)||V(i,n[o][0])))}function ot(t){return Object.keys(t).length===0}function ct(t,...e){if(t==null){for(const s of e)s(void 0);return C}const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function Nt(t,e,n){t.$$.on_destroy.push(ct(e,n))}function At(t,e,n,s){if(t){const i=Y(t,e,n,s);return t[0](i)}}function Y(t,e,n,s){return t[1]&&s?rt(n.ctx.slice(),t[1](s(e))):n.ctx}function Mt(t,e,n,s){if(t[2]&&s){const i=t[2](s(n));if(e.dirty===void 0)return i;if(typeof i=="object"){const r=[],o=Math.max(e.dirty.length,i.length);for(let p=0;p<o;p+=1)r[p]=e.dirty[p]|i[p];return r}return e.dirty|i}return e.dirty}function St(t,e,n,s,i,r){if(i){const o=Y(e,n,s,r);t.p(o,i)}}function Tt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let s=0;s<n;s++)e[s]=-1;return e}return-1}function ut(t,e){t.appendChild(e)}function ft(t,e,n){t.insertBefore(e,n||null)}function W(t){t.parentNode&&t.parentNode.removeChild(t)}function Ct(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function Z(t){return document.createElement(t)}function at(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function tt(t){return document.createTextNode(t)}function Lt(){return tt(" ")}function Pt(){return tt("")}function J(t,e,n,s){return t.addEventListener(e,n,s),()=>t.removeEventListener(e,n,s)}function Ot(t){return function(e){return e.preventDefault(),t.call(this,e)}}function jt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function zt(t){let e;return{p(...n){e=n,e.forEach(s=>t.push(s))},r(){e.forEach(n=>t.splice(t.indexOf(n),1))}}}function qt(t){return t===""?null:+t}function lt(t){return Array.from(t.childNodes)}function It(t,e){e=""+e,t.data!==e&&(t.data=e)}function Bt(t,e){t.value=e??""}function Wt(t,e,n,s){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,s?"important":"")}function Dt(t,e,n){for(let s=0;s<t.options.length;s+=1){const i=t.options[s];if(i.__value===e){i.selected=!0;return}}(!n||e!==void 0)&&(t.selectedIndex=-1)}function Ht(t){const e=t.querySelector(":checked");return e&&e.__value}let S;function dt(){if(S===void 0){S=!1;try{typeof window<"u"&&window.parent&&window.parent.document}catch{S=!0}}return S}function Ft(t,e){getComputedStyle(t).position==="static"&&(t.style.position="relative");const s=Z("iframe");s.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),s.setAttribute("aria-hidden","true"),s.tabIndex=-1;const i=dt();let r;return i?(s.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",r=J(window,"message",o=>{o.source===s.contentWindow&&e()})):(s.src="about:blank",s.onload=()=>{r=J(s.contentWindow,"resize",e),e()}),ut(t,s),()=>{(i||r&&s.contentWindow)&&r(),W(s)}}function Rt(t,e,n){t.classList.toggle(e,!!n)}function ht(t,e,{bubbles:n=!1,cancelable:s=!1}={}){return new CustomEvent(t,{detail:e,bubbles:n,cancelable:s})}class Ut{constructor(e=!1){g(this,"is_svg",!1);g(this,"e");g(this,"n");g(this,"t");g(this,"a");this.is_svg=e,this.e=this.n=null}c(e){this.h(e)}m(e,n,s=null){this.e||(this.is_svg?this.e=at(n.nodeName):this.e=Z(n.nodeType===11?"TEMPLATE":n.nodeName),this.t=n.tagName!=="TEMPLATE"?n:n.content,this.c(e)),this.i(s)}h(e){this.e.innerHTML=e,this.n=Array.from(this.e.nodeName==="TEMPLATE"?this.e.content.childNodes:this.e.childNodes)}i(e){for(let n=0;n<this.n.length;n+=1)ft(this.t,this.n[n],e)}p(e){this.d(),this.h(e),this.i(this.a)}d(){this.n.forEach(W)}}let k;function E(t){k=t}function D(){if(!k)throw new Error("Function called outside component initialization");return k}function Vt(){const t=D();return(e,n,{cancelable:s=!1}={})=>{const i=t.$$.callbacks[e];if(i){const r=ht(e,n,{cancelable:s});return i.slice().forEach(o=>{o.call(t,r)}),!r.defaultPrevented}return!0}}function Gt(t,e){return D().$$.context.set(t,e),e}function Jt(t){return D().$$.context.get(t)}function Kt(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(s=>s.call(this,e))}const $=[],K=[];let x=[];const q=[],_t=Promise.resolve();let I=!1;function pt(){I||(I=!0,_t.then(et))}function B(t){x.push(t)}function Qt(t){q.push(t)}const z=new Set;let b=0;function et(){if(b!==0)return;const t=k;do{try{for(;b<$.length;){const e=$[b];b++,E(e),gt(e.$$)}}catch(e){throw $.length=0,b=0,e}for(E(null),$.length=0,b=0;K.length;)K.pop()();for(let e=0;e<x.length;e+=1){const n=x[e];z.has(n)||(z.add(n),n())}x.length=0}while($.length);for(;q.length;)q.pop()();I=!1,z.clear(),E(t)}function gt(t){if(t.fragment!==null){t.update(),v(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(B)}}function mt(t){const e=[],n=[];x.forEach(s=>t.indexOf(s)===-1?e.push(s):n.push(s)),n.forEach(s=>s()),x=e}const T=new Set;let y;function Xt(){y={r:0,c:[],p:y}}function Yt(){y.r||v(y.c),y=y.p}function nt(t,e){t&&t.i&&(T.delete(t),t.i(e))}function yt(t,e,n,s){if(t&&t.o){if(T.has(t))return;T.add(t),y.c.push(()=>{T.delete(t),s&&(n&&t.d(1),s())}),t.o(e)}else s&&s()}function Zt(t){return(t==null?void 0:t.length)!==void 0?t:Array.from(t)}function te(t,e){t.d(1),e.delete(t.key)}function ee(t,e){yt(t,1,1,()=>{e.delete(t.key)})}function ne(t,e,n,s,i,r,o,p,m,c,w,l){let f=t.length,d=r.length,a=f;const L={};for(;a--;)L[t[a].key]=a;const N=[],P=new Map,O=new Map,H=[];for(a=d;a--;){const u=l(i,r,a),h=n(u);let _=o.get(h);_?s&&H.push(()=>_.p(u,e)):(_=c(h,u),_.c()),P.set(h,N[a]=_),h in L&&O.set(h,Math.abs(a-L[h]))}const F=new Set,R=new Set;function j(u){nt(u,1),u.m(p,w),o.set(u.key,u),w=u.first,d--}for(;f&&d;){const u=N[d-1],h=t[f-1],_=u.key,A=h.key;u===h?(w=u.first,f--,d--):P.has(A)?!o.has(_)||F.has(_)?j(u):R.has(A)?f--:O.get(_)>O.get(A)?(R.add(_),j(u)):(F.add(A),f--):(m(h,o),f--)}for(;f--;){const u=t[f];P.has(u.key)||m(u,o)}for(;d;)j(N[d-1]);return v(H),N}function se(t,e,n){const s=t.$$.props[e];s!==void 0&&(t.$$.bound[s]=n,n(t.$$.ctx[s]))}function ie(t){t&&t.c()}function wt(t,e,n){const{fragment:s,after_update:i}=t.$$;s&&s.m(e,n),B(()=>{const r=t.$$.on_mount.map(Q).filter(X);t.$$.on_destroy?t.$$.on_destroy.push(...r):v(r),t.$$.on_mount=[]}),i.forEach(B)}function bt(t,e){const n=t.$$;n.fragment!==null&&(mt(n.after_update),v(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function $t(t,e){t.$$.dirty[0]===-1&&($.push(t),pt(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function re(t,e,n,s,i,r,o=null,p=[-1]){const m=k;E(t);const c=t.$$={fragment:null,ctx:[],props:r,update:C,not_equal:i,bound:U(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(m?m.$$.context:[])),callbacks:U(),dirty:p,skip_bound:!1,root:e.target||m.$$.root};o&&o(c.root);let w=!1;if(c.ctx=n?n(t,e.props||{},(l,f,...d)=>{const a=d.length?d[0]:f;return c.ctx&&i(c.ctx[l],c.ctx[l]=a)&&(!c.skip_bound&&c.bound[l]&&c.bound[l](a),w&&$t(t,l)),f}):[],c.update(),w=!0,v(c.before_update),c.fragment=s?s(c.ctx):!1,e.target){if(e.hydrate){const l=lt(e.target);c.fragment&&c.fragment.l(l),l.forEach(W)}else c.fragment&&c.fragment.c();e.intro&&nt(t.$$.fragment),wt(t,e.target,e.anchor),et()}E(m)}class oe{constructor(){g(this,"$$");g(this,"$$set")}$destroy(){bt(this,1),this.$destroy=C}$on(e,n){if(!X(n))return C;const s=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return s.push(n),()=>{const i=s.indexOf(n);i!==-1&&s.splice(i,1)}}$set(e){this.$$set&&!ot(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const xt="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(xt);export{Mt as $,Rt as A,Pt as B,ee as C,B as D,Ft as E,Bt as F,qt as G,Ut as H,v as I,ct as J,X as K,Dt as L,Nt as M,Ht as N,te as O,Vt as P,Ot as Q,zt as R,oe as S,K as T,se as U,Qt as V,kt as W,Kt as X,At as Y,St as Z,Tt as _,yt as a,jt as b,ie as c,bt as d,Z as e,Wt as f,ft as g,W as h,re as i,Jt as j,Lt as k,tt as l,wt as m,C as n,V as o,ut as p,It as q,Zt as r,Et as s,nt as t,Xt as u,Yt as v,Ct as w,J as x,ne as y,Gt as z};
