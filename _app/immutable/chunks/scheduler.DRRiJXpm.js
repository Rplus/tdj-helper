var B=Object.defineProperty;var O=(t,n,e)=>n in t?B(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e;var f=(t,n,e)=>(O(t,typeof n!="symbol"?n+"":n,e),e);function G(){}function I(t,n){for(const e in n)t[e]=n[e];return t}function lt(t){return!!t&&(typeof t=="object"||typeof t=="function")&&typeof t.then=="function"}function R(t){return t()}function rt(){return Object.create(null)}function z(t){t.forEach(R)}function st(t){return typeof t=="function"}function ot(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}let m;function k(t,n){return t===n?!0:(m||(m=document.createElement("a")),m.href=n,t===m.href)}function H(t){return t.split(",").map(n=>n.trim().split(" ").filter(Boolean))}function ut(t,n){const e=H(t.srcset),i=H(n||"");return i.length===e.length&&i.every(([c,o],l)=>o===e[l][1]&&(k(e[l][0],c)||k(c,e[l][0])))}function at(t){return Object.keys(t).length===0}function F(t,...n){if(t==null){for(const i of n)i(void 0);return G}const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function ft(t,n,e){t.$$.on_destroy.push(F(n,e))}function _t(t,n,e,i){if(t){const c=S(t,n,e,i);return t[0](c)}}function S(t,n,e,i){return t[1]&&i?I(e.ctx.slice(),t[1](i(n))):e.ctx}function ht(t,n,e,i){if(t[2]&&i){const c=t[2](i(e));if(n.dirty===void 0)return c;if(typeof c=="object"){const o=[],l=Math.max(n.dirty.length,c.length);for(let r=0;r<l;r+=1)o[r]=n.dirty[r]|c[r];return o}return n.dirty|c}return n.dirty}function dt(t,n,e,i,c,o){if(c){const l=S(n,e,i,o);t.p(l,c)}}function mt(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let i=0;i<e;i++)n[i]=-1;return n}return-1}let b=!1;function pt(){b=!0}function bt(){b=!1}function U(t,n,e,i){for(;t<n;){const c=t+(n-t>>1);e(c)<=i?t=c+1:n=c}return t}function W(t){if(t.hydrate_init)return;t.hydrate_init=!0;let n=t.childNodes;if(t.nodeName==="HEAD"){const s=[];for(let u=0;u<n.length;u++){const a=n[u];a.claim_order!==void 0&&s.push(a)}n=s}const e=new Int32Array(n.length+1),i=new Int32Array(n.length);e[0]=-1;let c=0;for(let s=0;s<n.length;s++){const u=n[s].claim_order,a=(c>0&&n[e[c]].claim_order<=u?c+1:U(1,c,C=>n[e[C]].claim_order,u))-1;i[s]=e[a]+1;const A=a+1;e[A]=s,c=Math.max(A,c)}const o=[],l=[];let r=n.length-1;for(let s=e[c]+1;s!=0;s=i[s-1]){for(o.push(n[s-1]);r>=s;r--)l.push(n[r]);r--}for(;r>=0;r--)l.push(n[r]);o.reverse(),l.sort((s,u)=>s.claim_order-u.claim_order);for(let s=0,u=0;s<l.length;s++){for(;u<o.length&&l[s].claim_order>=o[u].claim_order;)u++;const a=u<o.length?o[u]:null;t.insertBefore(l[s],a)}}function J(t,n){if(b){for(W(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;n!==t.actual_end_child?(n.claim_order!==void 0||n.parentNode!==t)&&t.insertBefore(n,t.actual_end_child):t.actual_end_child=n.nextSibling}else(n.parentNode!==t||n.nextSibling!==null)&&t.appendChild(n)}function K(t,n,e){t.insertBefore(n,e||null)}function Q(t,n,e){b&&!e?J(t,n):(n.parentNode!==t||n.nextSibling!=e)&&t.insertBefore(n,e||null)}function E(t){t.parentNode&&t.parentNode.removeChild(t)}function yt(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function j(t){return document.createElement(t)}function V(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function N(t){return document.createTextNode(t)}function gt(){return N(" ")}function xt(){return N("")}function Et(t,n,e,i){return t.addEventListener(n,e,i),()=>t.removeEventListener(n,e,i)}function Tt(t){return function(n){return n.preventDefault(),t.call(this,n)}}function vt(t,n,e){e==null?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function Nt(t){return t.dataset.svelteH}function wt(t){let n;return{p(...e){n=e,n.forEach(i=>t.push(i))},r(){n.forEach(e=>t.splice(t.indexOf(e),1))}}}function At(t,n){let e=c(t),i;function c(r){for(let s=0;s<n.length;s++)r=r[n[s]]=r[n[s]]||[];return r}function o(){i.forEach(r=>e.push(r))}function l(){i.forEach(r=>e.splice(e.indexOf(r),1))}return{u(r){n=r;const s=c(t);s!==e&&(l(),e=s,o())},p(...r){i=r,o()},r:l}}function kt(t){return t===""?null:+t}function Ht(t){return Array.from(t.childNodes)}function D(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function P(t,n,e,i,c=!1){D(t);const o=(()=>{for(let l=t.claim_info.last_index;l<t.length;l++){const r=t[l];if(n(r)){const s=e(r);return s===void 0?t.splice(l,1):t[l]=s,c||(t.claim_info.last_index=l),r}}for(let l=t.claim_info.last_index-1;l>=0;l--){const r=t[l];if(n(r)){const s=e(r);return s===void 0?t.splice(l,1):t[l]=s,c?s===void 0&&t.claim_info.last_index--:t.claim_info.last_index=l,r}}return i()})();return o.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,o}function X(t,n,e,i){return P(t,c=>c.nodeName===n,c=>{const o=[];for(let l=0;l<c.attributes.length;l++){const r=c.attributes[l];e[r.name]||o.push(r.name)}o.forEach(l=>c.removeAttribute(l))},()=>i(n))}function Lt(t,n,e){return X(t,n,e,j)}function Y(t,n){return P(t,e=>e.nodeType===3,e=>{const i=""+n;if(e.data.startsWith(i)){if(e.data.length!==i.length)return e.splitText(i.length)}else e.data=i},()=>N(n),!0)}function Mt(t){return Y(t," ")}function L(t,n,e){for(let i=e;i<t.length;i+=1){const c=t[i];if(c.nodeType===8&&c.textContent.trim()===n)return i}return-1}function St(t,n){const e=L(t,"HTML_TAG_START",0),i=L(t,"HTML_TAG_END",e+1);if(e===-1||i===-1)return new y(n);D(t);const c=t.splice(e,i-e+1);E(c[0]),E(c[c.length-1]);const o=c.slice(1,c.length-1);if(o.length===0)return new y(n);for(const l of o)l.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new y(n,o)}function jt(t,n){n=""+n,t.data!==n&&(t.data=n)}function Dt(t,n){t.value=n??""}function Pt(t,n,e,i){e==null?t.style.removeProperty(n):t.style.setProperty(n,e,i?"important":"")}function qt(t,n,e){for(let i=0;i<t.options.length;i+=1){const c=t.options[i];if(c.__value===n){c.selected=!0;return}}(!e||n!==void 0)&&(t.selectedIndex=-1)}function Ct(t){const n=t.querySelector(":checked");return n&&n.__value}function Bt(t,n,e){t.classList.toggle(n,!!e)}function Z(t,n,{bubbles:e=!1,cancelable:i=!1}={}){return new CustomEvent(t,{detail:n,bubbles:e,cancelable:i})}function Ot(t,n){const e=[];let i=0;for(const c of n.childNodes)if(c.nodeType===8){const o=c.textContent.trim();o===`HEAD_${t}_END`?(i-=1,e.push(c)):o===`HEAD_${t}_START`&&(i+=1,e.push(c))}else i>0&&e.push(c);return e}class ${constructor(n=!1){f(this,"is_svg",!1);f(this,"e");f(this,"n");f(this,"t");f(this,"a");this.is_svg=n,this.e=this.n=null}c(n){this.h(n)}m(n,e,i=null){this.e||(this.is_svg?this.e=V(e.nodeName):this.e=j(e.nodeType===11?"TEMPLATE":e.nodeName),this.t=e.tagName!=="TEMPLATE"?e:e.content,this.c(n)),this.i(i)}h(n){this.e.innerHTML=n,this.n=Array.from(this.e.nodeName==="TEMPLATE"?this.e.content.childNodes:this.e.childNodes)}i(n){for(let e=0;e<this.n.length;e+=1)K(this.t,this.n[e],n)}p(n){this.d(),this.h(n),this.i(this.a)}d(){this.n.forEach(E)}}class y extends ${constructor(e=!1,i){super(e);f(this,"l");this.e=this.n=null,this.l=i}c(e){this.l?this.n=this.l:super.c(e)}i(e){for(let i=0;i<this.n.length;i+=1)Q(this.t,this.n[i],e)}}function Gt(t,n){return new t(n)}let p;function g(t){p=t}function w(){if(!p)throw new Error("Function called outside component initialization");return p}function It(t){w().$$.on_mount.push(t)}function Rt(t){w().$$.after_update.push(t)}function zt(){const t=w();return(n,e,{cancelable:i=!1}={})=>{const c=t.$$.callbacks[n];if(c){const o=Z(n,e,{cancelable:i});return c.slice().forEach(l=>{l.call(t,o)}),!o.defaultPrevented}return!0}}function Ft(t,n){const e=t.$$.callbacks[n.type];e&&e.slice().forEach(i=>i.call(this,n))}const d=[],M=[];let h=[];const T=[],q=Promise.resolve();let v=!1;function tt(){v||(v=!0,q.then(et))}function Ut(){return tt(),q}function nt(t){h.push(t)}function Wt(t){T.push(t)}const x=new Set;let _=0;function et(){if(_!==0)return;const t=p;do{try{for(;_<d.length;){const n=d[_];_++,g(n),it(n.$$)}}catch(n){throw d.length=0,_=0,n}for(g(null),d.length=0,_=0;M.length;)M.pop()();for(let n=0;n<h.length;n+=1){const e=h[n];x.has(e)||(x.add(e),e())}h.length=0}while(d.length);for(;T.length;)T.pop()();v=!1,x.clear(),g(t)}function it(t){if(t.fragment!==null){t.update(),z(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(nt)}}function Jt(t){const n=[],e=[];h.forEach(i=>t.indexOf(i)===-1?n.push(i):e.push(i)),e.forEach(i=>i()),h=n}export{bt as $,Y as A,jt as B,St as C,Dt as D,Et as E,Tt as F,yt as G,y as H,k as I,xt as J,Rt as K,It as L,M,Gt as N,Ut as O,At as P,kt as Q,Bt as R,rt as S,at as T,nt as U,Jt as V,p as W,R as X,d as Y,tt as Z,pt as _,gt as a,ft as a0,Ft as a1,wt as a2,qt as a3,Ct as a4,zt as a5,Wt as a6,ut as a7,Lt as b,Mt as c,vt as d,j as e,E as f,Nt as g,lt as h,Q as i,w as j,g as k,et as l,F as m,G as n,st as o,_t as p,Ot as q,z as r,ot as s,Ht as t,Pt as u,J as v,dt as w,mt as x,ht as y,N as z};