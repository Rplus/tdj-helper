import{H as il}from"../chunks/control.CYgJF_JY.js";import{f as nl,R as al}from"../chunks/Role.Cv9q8YyX.js";import{s as ue,e as g,b as w,t as S,f,d,i as v,n as U,G as xe,z as N,a as E,A as O,c as y,I as be,u as B,v as m,B as A,J as ee,L as sl,g as ol}from"../chunks/scheduler.DRRiJXpm.js";import{h as Be,u as fl}from"../chunks/await_block.CCM49jVG.js";import{S as ce,i as _e,c as G,a as Y,m as Q,t as P,b as V,d as W,g as el,e as ll}from"../chunks/index.D1isTMd_.js";import{c as fe,g as Ee,r as Ge}from"../chunks/u.DXYkaN-u.js";import{e as ye}from"../chunks/each.n077PHkZ.js";import{H as ul}from"../chunks/Header.k6y270iH.js";function cl(i,e){throw new il(i,e)}new TextEncoder;const _l=async({params:i})=>{try{return{role:nl("name",i.slug),slug:i.slug}}catch(e){cl(404,e)}},jl=Object.freeze(Object.defineProperty({__proto__:null,load:_l},Symbol.toStringTag,{value:"Module"})),ml={cn:"tdj-activity.zlongame.com",tw:"tdj-activity.game-beans.com"},tl=[{get_proxy_url:i=>`https://api.allorigins.win/get?url=${encodeURIComponent(i)}`,fetch:async i=>fetch(i).then(e=>e.json()).then(e=>{var t;return e=JSON.parse(e==null?void 0:e.contents),console.log("fetch role.cn",e),(t=e.data)==null?void 0:t.data[0]})},{get_proxy_url:i=>`https://corsproxy.io/?${encodeURIComponent(i)}`,fetch:async i=>fetch(i).then(e=>e.text()).then(e=>{var t;return e=JSON.parse(e),console.log("fetch role.tw",e),(t=e.data)==null?void 0:t.data[0]})}][1];async function hl(i){let e=i.pinyin_tw?Ye(i.pinyin_tw,"tw"):Ye(i.pinyin,"cn");return tl.fetch(e)}function Ye(i,e){return pl({module:"hero",type:"detail",query:i},e)}function pl(i={},e="cn"){i={id:e==="cn"?0:1,action:"info",module:"hero",type:"basic",...i};let t=new URLSearchParams;for(let n in i)t.set(n,i[n]);let l=`https://${ml[e]}/tdj/data/mQuery.do?${t.toString()}`;return tl.get_proxy_url(l)}function Qe(i,e,t){const l=i.slice();return l[3]=e[t],l}function We(i){let e,t,l,r=i[3].name+"",n,u,$,I,c,h,k,p,o,s,a,b=fe(i[3].desc)+"",q,J,L,M,_,R=i[3].cost+"",j,z,T,Ie,le=i[3].shoot+"",me,Re,X,Se,te=i[3].cd+"",he,Le,F,He,re=i[3].range+"",pe,De,K,Ne,ie=i[3].type+"",ve,Oe,Z,Pe,ne=i[3].way+"",de,Ae,ae,se,oe=JSON.stringify(i[3],null,2)+"",ge,Ve;return{c(){e=g("div"),t=g("details"),l=g("summary"),n=N(r),u=E(),$=g("br"),I=E(),c=g("img"),o=E(),s=g("div"),a=g("div"),q=N(b),J=E(),L=g("ul"),M=g("li"),_=N("cost: "),j=N(R),z=E(),T=g("li"),Ie=N("shoot: "),me=N(le),Re=E(),X=g("li"),Se=N("cd: "),he=N(te),Le=E(),F=g("li"),He=N("range: "),pe=N(re),De=E(),K=g("li"),Ne=N("type: "),ve=N(ie),Oe=E(),Z=g("li"),Pe=N("way: "),de=N(ne),Ae=E(),ae=g("details"),se=g("pre"),ge=N(oe),Ve=E(),this.h()},l(H){e=w(H,"DIV",{class:!0,style:!0});var D=S(e);t=w(D,"DETAILS",{name:!0});var we=S(t);l=w(we,"SUMMARY",{});var x=S(l);n=O(x,r),u=y(x),$=w(x,"BR",{}),I=y(x),c=w(x,"IMG",{src:!0,alt:!0,title:!0,width:!0,height:!0,class:!0}),x.forEach(f),o=y(we),s=w(we,"DIV",{class:!0});var $e=S(s);a=w($e,"DIV",{class:!0});var ke=S(a);q=O(ke,b),J=y(ke),L=w(ke,"UL",{});var C=S(L);M=w(C,"LI",{});var qe=S(M);_=O(qe,"cost: "),j=O(qe,R),qe.forEach(f),z=y(C),T=w(C,"LI",{});var Ce=S(T);Ie=O(Ce,"shoot: "),me=O(Ce,le),Ce.forEach(f),Re=y(C),X=w(C,"LI",{});var Je=S(X);Se=O(Je,"cd: "),he=O(Je,te),Je.forEach(f),Le=y(C),F=w(C,"LI",{});var Me=S(F);He=O(Me,"range: "),pe=O(Me,re),Me.forEach(f),De=y(C),K=w(C,"LI",{});var Te=S(K);Ne=O(Te,"type: "),ve=O(Te,ie),Te.forEach(f),Oe=y(C),Z=w(C,"LI",{});var Ue=S(Z);Pe=O(Ue,"way: "),de=O(Ue,ne),Ue.forEach(f),C.forEach(f),ke.forEach(f),Ae=y($e),ae=w($e,"DETAILS",{});var je=S(ae);se=w(je,"PRE",{});var ze=S(se);ge=O(ze,oe),ze.forEach(f),je.forEach(f),$e.forEach(f),we.forEach(f),Ve=y(D),D.forEach(f),this.h()},h(){be(c.src,h=Ee("skill",i[3].img,96,i[1]))||d(c,"src",h),d(c,"alt",k=i[3].name),d(c,"title",p=i[3].name),d(c,"width","48"),d(c,"height","48"),d(c,"class","svelte-1um6dc"),d(a,"class","pre-line"),d(s,"class","desc"),d(t,"name","skill"),d(e,"class","skill ai-c jc-c flex text-center svelte-1um6dc"),B(e,"--row",i[3].grid_row),B(e,"--col",i[3].grid_col)},m(H,D){v(H,e,D),m(e,t),m(t,l),m(l,n),m(l,u),m(l,$),m(l,I),m(l,c),m(t,o),m(t,s),m(s,a),m(a,q),m(a,J),m(a,L),m(L,M),m(M,_),m(M,j),m(L,z),m(L,T),m(T,Ie),m(T,me),m(L,Re),m(L,X),m(X,Se),m(X,he),m(L,Le),m(L,F),m(F,He),m(F,pe),m(L,De),m(L,K),m(K,Ne),m(K,ve),m(L,Oe),m(L,Z),m(Z,Pe),m(Z,de),m(s,Ae),m(s,ae),m(ae,se),m(se,ge),m(e,Ve)},p(H,D){D&1&&r!==(r=H[3].name+"")&&A(n,r),D&3&&!be(c.src,h=Ee("skill",H[3].img,96,H[1]))&&d(c,"src",h),D&1&&k!==(k=H[3].name)&&d(c,"alt",k),D&1&&p!==(p=H[3].name)&&d(c,"title",p),D&1&&b!==(b=fe(H[3].desc)+"")&&A(q,b),D&1&&R!==(R=H[3].cost+"")&&A(j,R),D&1&&le!==(le=H[3].shoot+"")&&A(me,le),D&1&&te!==(te=H[3].cd+"")&&A(he,te),D&1&&re!==(re=H[3].range+"")&&A(pe,re),D&1&&ie!==(ie=H[3].type+"")&&A(ve,ie),D&1&&ne!==(ne=H[3].way+"")&&A(de,ne),D&1&&oe!==(oe=JSON.stringify(H[3],null,2)+"")&&A(ge,oe),D&1&&B(e,"--row",H[3].grid_row),D&1&&B(e,"--col",H[3].grid_col)},d(H){H&&f(e)}}}function vl(i){let e,t=ye(i[0]),l=[];for(let r=0;r<t.length;r+=1)l[r]=We(Qe(i,t,r));return{c(){e=g("div");for(let r=0;r<l.length;r+=1)l[r].c();this.h()},l(r){e=w(r,"DIV",{class:!0});var n=S(e);for(let u=0;u<l.length;u+=1)l[u].l(n);n.forEach(f),this.h()},h(){d(e,"class","skills svelte-1um6dc")},m(r,n){v(r,e,n);for(let u=0;u<l.length;u+=1)l[u]&&l[u].m(e,null)},p(r,[n]){if(n&3){t=ye(r[0]);let u;for(u=0;u<t.length;u+=1){const $=Qe(r,t,u);l[u]?l[u].p($,n):(l[u]=We($),l[u].c(),l[u].m(e,null))}for(;u<l.length;u+=1)l[u].d(1);l.length=t.length}},i:U,o:U,d(r){r&&f(e),xe(l,r)}}}function dl(i){let e=[void 0];return i=i.map(t=>{var r;switch(+((r=t.unlock_condition.match(/\d+/))==null?void 0:r[0])||0){case 0:t.grid_row=1,t.grid_col=3;break;case 3:t.grid_row=2,t.grid_col=3,e[0]=t.inner_power1;break;case 15:e.includes(t.inner_power1)||e.push(t.inner_power1),t.grid_row=3,t.grid_col=e.indexOf(t.inner_power1)===1?5:1;break;case 25:t.grid_row=4,t.grid_col=3;break;case 40:e.includes(t.inner_power2)||e.push(t.inner_power2),t.grid_row=5,t.grid_col=e.indexOf(t.inner_power2)===1?4:2;break;case 55:t.grid_row=6,t.grid_col=3;break}return t}),i}function gl(i,e,t){let{skills:l=[]}=e,{lang:r="tw"}=e;return l=dl(l),i.$$set=n=>{"skills"in n&&t(0,l=n.skills),"lang"in n&&t(1,r=n.lang)},[l,r]}class wl extends ce{constructor(e){super(),_e(this,e,gl,vl,ue,{skills:0,lang:1})}}function Xe(i,e,t){const l=i.slice();return l[2]=e[t],l[4]=t,l}function Fe(i){let e,t,l,r,n,u,$,I,c,h=i[2]+"",k,p;return{c(){e=g("input"),n=E(),u=g("label"),I=E(),c=g("div"),k=N(h),p=E(),this.h()},l(o){e=w(o,"INPUT",{class:!0,type:!0,name:!0,id:!0}),n=y(o),u=w(o,"LABEL",{class:!0,for:!0,"data-index":!0,style:!0}),S(u).forEach(f),I=y(o),c=w(o,"DIV",{class:!0});var s=S(c);k=O(s,h),p=y(s),s.forEach(f),this.h()},h(){d(e,"class","visually-hidden svelte-1pvmq8l"),d(e,"type","radio"),d(e,"name",i[1]),d(e,"id",t=i[1]+"-"+(i[4]+1)),e.checked=l=i[4]===i[0].length-1,e.disabled=r=!i[2],d(u,"class","lv svelte-1pvmq8l"),d(u,"for",$=i[1]+"-"+(i[4]+1)),d(u,"data-index",i[4]+1),B(u,"--index",i[4]+1),d(c,"class","desc pre-line svelte-1pvmq8l")},m(o,s){v(o,e,s),v(o,n,s),v(o,u,s),v(o,I,s),v(o,c,s),m(c,k),m(c,p)},p(o,s){s&2&&d(e,"name",o[1]),s&2&&t!==(t=o[1]+"-"+(o[4]+1))&&d(e,"id",t),s&1&&l!==(l=o[4]===o[0].length-1)&&(e.checked=l),s&1&&r!==(r=!o[2])&&(e.disabled=r),s&2&&$!==($=o[1]+"-"+(o[4]+1))&&d(u,"for",$),s&1&&h!==(h=o[2]+"")&&A(k,h)},d(o){o&&(f(e),f(n),f(u),f(I),f(c))}}}function $l(i){let e,t,l,r,n,u,$,I=ye(i[0]),c=[];for(let h=0;h<I.length;h+=1)c[h]=Fe(Xe(i,I,h));return{c(){e=g("input"),l=E(),r=g("div"),n=g("label"),$=E();for(let h=0;h<c.length;h+=1)c[h].c();this.h()},l(h){e=w(h,"INPUT",{type:!0,class:!0,id:!0}),l=y(h),r=w(h,"DIV",{class:!0});var k=S(r);n=w(k,"LABEL",{class:!0,for:!0}),S(n).forEach(f),$=y(k);for(let p=0;p<c.length;p+=1)c[p].l(k);k.forEach(f),this.h()},h(){d(e,"type","checkbox"),d(e,"class","swticher visually-hidden svelte-1pvmq8l"),d(e,"id",t="swticher--"+i[1]),d(n,"class","swticher-label svelte-1pvmq8l"),d(n,"for",u="swticher--"+i[1]),d(r,"class","levels svelte-1pvmq8l")},m(h,k){v(h,e,k),v(h,l,k),v(h,r,k),m(r,n),m(r,$);for(let p=0;p<c.length;p+=1)c[p]&&c[p].m(r,null)},p(h,[k]){if(k&2&&t!==(t="swticher--"+h[1])&&d(e,"id",t),k&2&&u!==(u="swticher--"+h[1])&&d(n,"for",u),k&3){I=ye(h[0]);let p;for(p=0;p<I.length;p+=1){const o=Xe(h,I,p);c[p]?c[p].p(o,k):(c[p]=Fe(o),c[p].c(),c[p].m(r,null))}for(;p<c.length;p+=1)c[p].d(1);c.length=I.length}},i:U,o:U,d(h){h&&(f(e),f(l),f(r)),xe(c,h)}}}function kl(i,e,t){let{lvs:l=[]}=e,{name:r="lv"}=e;return i.$$set=n=>{"lvs"in n&&t(0,l=n.lvs),"name"in n&&t(1,r=n.name)},[l,r]}class rl extends ce{constructor(e){super(),_e(this,e,kl,$l,ue,{lvs:0,name:1})}}function bl(i){let e,t;return e=new rl({props:{name:"lv",lvs:i[0].map(fe)}}),{c(){G(e.$$.fragment)},l(l){Y(e.$$.fragment,l)},m(l,r){Q(e,l,r),t=!0},p(l,[r]){const n={};r&1&&(n.lvs=l[0].map(fe)),e.$set(n)},i(l){t||(P(e.$$.fragment,l),t=!0)},o(l){V(e.$$.fragment,l),t=!1},d(l){W(e,l)}}}function El(i,e,t){let{stars:l=["","","","","",""]}=e;return i.$$set=r=>{"stars"in r&&t(0,l=r.stars)},[l]}class yl extends ce{constructor(e){super(),_e(this,e,El,bl,ue,{stars:0})}}function Ke(i){let e,t,l,r,n,u,$,I,c=i[0][0].name+"",h,k,p,o;return p=new rl({props:{lvs:i[1],name:"weapon"}}),{c(){e=g("div"),t=g("div"),l=g("img"),u=E(),$=g("br"),I=E(),h=N(c),k=E(),G(p.$$.fragment),this.h()},l(s){e=w(s,"DIV",{class:!0,style:!0});var a=S(e);t=w(a,"DIV",{class:!0});var b=S(t);l=w(b,"IMG",{src:!0,alt:!0}),u=y(b),$=w(b,"BR",{}),I=y(b),h=O(b,c),b.forEach(f),k=y(a),Y(p.$$.fragment,a),a.forEach(f),this.h()},h(){be(l.src,r=Ee("weapon",i[0][0].img,64))||d(l,"src",r),d(l,"alt",n=i[0][0].name),d(t,"class","text-center"),d(e,"class","flex svelte-v1ad16"),B(e,"gap","1em")},m(s,a){v(s,e,a),m(e,t),m(t,l),m(t,u),m(t,$),m(t,I),m(t,h),m(e,k),Q(p,e,null),o=!0},p(s,a){(!o||a&1&&!be(l.src,r=Ee("weapon",s[0][0].img,64)))&&d(l,"src",r),(!o||a&1&&n!==(n=s[0][0].name))&&d(l,"alt",n),(!o||a&1)&&c!==(c=s[0][0].name+"")&&A(h,c)},i(s){o||(P(p.$$.fragment,s),o=!0)},o(s){V(p.$$.fragment,s),o=!1},d(s){s&&f(e),W(p)}}}function Il(i){let e,t,l=i[0]&&i[0][0]&&Ke(i);return{c(){l&&l.c(),e=ee()},l(r){l&&l.l(r),e=ee()},m(r,n){l&&l.m(r,n),v(r,e,n),t=!0},p(r,[n]){r[0]&&r[0][0]?l?(l.p(r,n),n&1&&P(l,1)):(l=Ke(r),l.c(),P(l,1),l.m(e.parentNode,e)):l&&(el(),V(l,1,1,()=>{l=null}),ll())},i(r){t||(P(l),t=!0)},o(r){V(l),t=!1},d(r){r&&f(e),l&&l.d(r)}}}function Rl(i,e,t){let{weapon:l=[]}=e,r=l.map(n=>fe(n.desc));return i.$$set=n=>{"weapon"in n&&t(0,l=n.weapon)},[l,r]}class Sl extends ce{constructor(e){super(),_e(this,e,Rl,Il,ue,{weapon:0})}}function Ll(i){let e,t,l,r={ctx:i,current:null,token:null,hasCatch:!0,pending:Nl,then:Dl,catch:Hl,value:2,error:3,blocks:[,,,]};return Be(t=i[1],r),{c(){e=ee(),r.block.c()},l(n){e=ee(),r.block.l(n)},m(n,u){v(n,e,u),r.block.m(n,r.anchor=u),r.mount=()=>e.parentNode,r.anchor=e,l=!0},p(n,u){i=n,r.ctx=i,u&2&&t!==(t=i[1])&&Be(t,r)||fl(r,i,u)},i(n){l||(P(r.block),l=!0)},o(n){for(let u=0;u<3;u+=1){const $=r.blocks[u];V($)}l=!1},d(n){n&&f(e),r.block.d(n),r.token=null,r=null}}}function Hl(i){let e,t=i[3].message+"",l;return{c(){e=g("p"),l=N(t),this.h()},l(r){e=w(r,"P",{style:!0});var n=S(e);l=O(n,t),n.forEach(f),this.h()},h(){B(e,"color","red")},m(r,n){v(r,e,n),m(e,l)},p(r,n){n&2&&t!==(t=r[3].message+"")&&A(l,t)},i:U,o:U,d(r){r&&f(e)}}}function Dl(i){let e,t,l,r=JSON.stringify(i[2],null,2)+"",n,u,$,I,c,h,k,p,o=i[2]&&Ze(i);return{c(){o&&o.c(),e=E(),t=g("details"),l=g("pre"),n=N(r),u=E(),$=g("hr"),I=E(),c=g("hr"),h=E(),k=g("hr"),this.h()},l(s){o&&o.l(s),e=y(s),t=w(s,"DETAILS",{});var a=S(t);l=w(a,"PRE",{class:!0});var b=S(l);n=O(b,r),b.forEach(f),a.forEach(f),u=y(s),$=w(s,"HR",{}),I=y(s),c=w(s,"HR",{}),h=y(s),k=w(s,"HR",{}),this.h()},h(){d(l,"class","svelte-1p797cy")},m(s,a){o&&o.m(s,a),v(s,e,a),v(s,t,a),m(t,l),m(l,n),v(s,u,a),v(s,$,a),v(s,I,a),v(s,c,a),v(s,h,a),v(s,k,a),p=!0},p(s,a){s[2]?o?(o.p(s,a),a&2&&P(o,1)):(o=Ze(s),o.c(),P(o,1),o.m(e.parentNode,e)):o&&(el(),V(o,1,1,()=>{o=null}),ll()),(!p||a&2)&&r!==(r=JSON.stringify(s[2],null,2)+"")&&A(n,r)},i(s){p||(P(o),p=!0)},o(s){V(o),p=!1},d(s){s&&(f(e),f(t),f(u),f($),f(I),f(c),f(h),f(k)),o&&o.d(s)}}}function Ze(i){let e,t,l,r,n,u,$,I,c,h,k,p,o,s,a,b,q,J,L,M;return l=new yl({props:{stars:[i[2].star1,i[2].star2,i[2].star3,i[2].star4,i[2].star5,i[2].star6]}}),c=new wl({props:{skills:i[2].skill,lang:i[0].role.pinyin_tw?"tw":"cn"}}),a=new Sl({props:{weapon:i[2].godclass_weapon}}),{c(){e=g("hr"),t=E(),G(l.$$.fragment),r=E(),n=g("hr"),u=E(),$=g("hr"),I=E(),G(c.$$.fragment),h=E(),k=g("hr"),p=E(),o=g("hr"),s=E(),G(a.$$.fragment),b=E(),q=g("hr"),J=E(),L=g("hr")},l(_){e=w(_,"HR",{}),t=y(_),Y(l.$$.fragment,_),r=y(_),n=w(_,"HR",{}),u=y(_),$=w(_,"HR",{}),I=y(_),Y(c.$$.fragment,_),h=y(_),k=w(_,"HR",{}),p=y(_),o=w(_,"HR",{}),s=y(_),Y(a.$$.fragment,_),b=y(_),q=w(_,"HR",{}),J=y(_),L=w(_,"HR",{})},m(_,R){v(_,e,R),v(_,t,R),Q(l,_,R),v(_,r,R),v(_,n,R),v(_,u,R),v(_,$,R),v(_,I,R),Q(c,_,R),v(_,h,R),v(_,k,R),v(_,p,R),v(_,o,R),v(_,s,R),Q(a,_,R),v(_,b,R),v(_,q,R),v(_,J,R),v(_,L,R),M=!0},p(_,R){const j={};R&2&&(j.stars=[_[2].star1,_[2].star2,_[2].star3,_[2].star4,_[2].star5,_[2].star6]),l.$set(j);const z={};R&2&&(z.skills=_[2].skill),R&1&&(z.lang=_[0].role.pinyin_tw?"tw":"cn"),c.$set(z);const T={};R&2&&(T.weapon=_[2].godclass_weapon),a.$set(T)},i(_){M||(P(l.$$.fragment,_),P(c.$$.fragment,_),P(a.$$.fragment,_),M=!0)},o(_){V(l.$$.fragment,_),V(c.$$.fragment,_),V(a.$$.fragment,_),M=!1},d(_){_&&(f(e),f(t),f(r),f(n),f(u),f($),f(I),f(h),f(k),f(p),f(o),f(s),f(b),f(q),f(J),f(L)),W(l,_),W(c,_),W(a,_)}}}function Nl(i){let e,t="...waiting";return{c(){e=g("p"),e.textContent=t},l(l){e=w(l,"P",{"data-svelte-h":!0}),ol(e)!=="svelte-mv6tav"&&(e.textContent=t)},m(l,r){v(l,e,r)},p:U,i:U,o:U,d(l){l&&f(e)}}}function Ol(i){var s;let e,t,l,r,n,u,$,I,c,h,k,p;e=new ul({props:{parent_path:"/role",title:"英靈："+((s=i[0].role)==null?void 0:s.name)}}),l=new al({props:{data:i[0].role,type:"card"}});let o=Ll(i);return{c(){G(e.$$.fragment),t=E(),G(l.$$.fragment),r=E(),n=g("hr"),u=E(),$=g("a"),I=N("large avater img"),h=E(),o&&o.c(),k=ee(),this.h()},l(a){Y(e.$$.fragment,a),t=y(a),Y(l.$$.fragment,a),r=y(a),n=w(a,"HR",{}),u=y(a),$=w(a,"A",{href:!0,rel:!0,target:!0});var b=S($);I=O(b,"large avater img"),b.forEach(f),h=y(a),o&&o.l(a),k=ee(),this.h()},h(){d($,"href",c=Ge(`https://media.zlongame.com/media/news/cn/tdj/info/data/hero/${i[0].role.pic}.png`,960)),d($,"rel","noopener"),d($,"target","_img")},m(a,b){Q(e,a,b),v(a,t,b),Q(l,a,b),v(a,r,b),v(a,n,b),v(a,u,b),v(a,$,b),m($,I),v(a,h,b),o&&o.m(a,b),v(a,k,b),p=!0},p(a,[b]){var L;const q={};b&1&&(q.title="英靈："+((L=a[0].role)==null?void 0:L.name)),e.$set(q);const J={};b&1&&(J.data=a[0].role),l.$set(J),(!p||b&1&&c!==(c=Ge(`https://media.zlongame.com/media/news/cn/tdj/info/data/hero/${a[0].role.pic}.png`,960)))&&d($,"href",c),o.p(a,b)},i(a){p||(P(e.$$.fragment,a),P(l.$$.fragment,a),P(o),p=!0)},o(a){V(e.$$.fragment,a),V(l.$$.fragment,a),V(o),p=!1},d(a){a&&(f(t),f(r),f(n),f(u),f($),f(h),f(k)),W(e,a),W(l,a),o&&o.d(a)}}}function Pl(i,e,t){let{data:l}=e,r;return sl(()=>{t(1,r=hl(l.role))}),i.$$set=n=>{"data"in n&&t(0,l=n.data)},[l,r]}class zl extends ce{constructor(e){super(),_e(this,e,Pl,Ol,ue,{data:0})}}export{zl as component,jl as universal};
