import{H as z}from"../chunks/control.CYgJF_JY.js";import{f as L,R as M}from"../chunks/Role.C064bbhf.js";import{s as T,a as $,J as v,c as b,i as u,f as c,L as U,e as f,z as H,b as _,t as J,A as N,u as q,v as j,B as x,d as A,g as B,n as I}from"../chunks/scheduler.DRRiJXpm.js";import{h as w,u as Q}from"../chunks/await_block.CCM49jVG.js";import{S as D,i as F,c as k,a as S,m as C,t as P,b as E,d as O}from"../chunks/index.D1isTMd_.js";import{H as G}from"../chunks/Header.v1gTpONS.js";function K(t,e){throw new z(t,e)}new TextEncoder;const V=async({params:t})=>{try{return{role:L("name",t.slug),slug:t.slug}}catch(e){K(404,e)}},ue=Object.freeze(Object.defineProperty({__proto__:null,load:V},Symbol.toStringTag,{value:"Module"})),W={cn:"tdj-activity.zlongame.com",tw:"tdj-activity.game-beans.com"};async function X(t){let e=t.pinyin_tw?R(t.pinyin_tw,"tw"):R(t.pinyin,"cn");return fetch(e).then(n=>n.json()).then(n=>{var r;return n=JSON.parse(n==null?void 0:n.contents),(r=n.data)==null?void 0:r.data[0]})}function R(t,e){return Y({module:"hero",type:"detail",query:t},e)}function Y(t={},e="cn"){t={id:e==="cn"?0:1,action:"info",module:"hero",type:"basic",...t};let n=new URLSearchParams;for(let o in t)n.set(o,t[o]);let r=`https://${W[e]}/tdj/data/mQuery.do?${n.toString()}`;return`https://api.allorigins.win/get?url=${encodeURIComponent(r)}`}function Z(t){let e,n=t[3].message+"",r;return{c(){e=f("p"),r=H(n),this.h()},l(a){e=_(a,"P",{style:!0});var o=J(e);r=N(o,n),o.forEach(c),this.h()},h(){q(e,"color","red")},m(a,o){u(a,e,o),j(e,r)},p(a,o){o&2&&n!==(n=a[3].message+"")&&x(r,n)},d(a){a&&c(e)}}}function ee(t){let e,n=JSON.stringify(t[2],null,2)+"",r;return{c(){e=f("pre"),r=H(n),this.h()},l(a){e=_(a,"PRE",{class:!0});var o=J(e);r=N(o,n),o.forEach(c),this.h()},h(){A(e,"class","svelte-10gg4dq")},m(a,o){u(a,e,o),j(e,r)},p(a,o){o&2&&n!==(n=JSON.stringify(a[2],null,2)+"")&&x(r,n)},d(a){a&&c(e)}}}function te(t){let e,n="...waiting";return{c(){e=f("p"),e.textContent=n},l(r){e=_(r,"P",{"data-svelte-h":!0}),B(e)!=="svelte-mv6tav"&&(e.textContent=n)},m(r,a){u(r,e,a)},p:I,d(r){r&&c(e)}}}function ne(t){var d;let e,n,r,a,o,m,p;e=new G({props:{parent_path:"/role",title:"英靈："+((d=t[0].role)==null?void 0:d.name)}}),r=new M({props:{data:t[0].role,type:"card"}});let s={ctx:t,current:null,token:null,hasCatch:!0,pending:te,then:ee,catch:Z,value:2,error:3};return w(m=t[1],s),{c(){k(e.$$.fragment),n=$(),k(r.$$.fragment),a=$(),o=v(),s.block.c()},l(l){S(e.$$.fragment,l),n=b(l),S(r.$$.fragment,l),a=b(l),o=v(),s.block.l(l)},m(l,i){C(e,l,i),u(l,n,i),C(r,l,i),u(l,a,i),u(l,o,i),s.block.m(l,s.anchor=i),s.mount=()=>o.parentNode,s.anchor=o,p=!0},p(l,[i]){var y;t=l;const h={};i&1&&(h.title="英靈："+((y=t[0].role)==null?void 0:y.name)),e.$set(h);const g={};i&1&&(g.data=t[0].role),r.$set(g),s.ctx=t,i&2&&m!==(m=t[1])&&w(m,s)||Q(s,t,i)},i(l){p||(P(e.$$.fragment,l),P(r.$$.fragment,l),p=!0)},o(l){E(e.$$.fragment,l),E(r.$$.fragment,l),p=!1},d(l){l&&(c(n),c(a),c(o)),O(e,l),O(r,l),s.block.d(l),s.token=null,s=null}}}function re(t,e,n){let{data:r}=e,a;return U(()=>{n(1,a=X(r.role))}),t.$$set=o=>{"data"in o&&n(0,r=o.data)},[r,a]}class me extends D{constructor(e){super(),F(this,e,re,ne,T,{data:0})}}export{me as component,ue as universal};
