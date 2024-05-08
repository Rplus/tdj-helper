import{s as B,e as y,b as w,t as I,f as _,d,i as j,n as z,O as M,N as F,z as U,A as W,v as $,B as X,a as S,c as D,J as te,K as re}from"../chunks/scheduler.B4TYcRyM.js";import{S as O,i as q,c as N,a as V,m as A,t as v,g as Y,b as k,e as Z,d as H}from"../chunks/index.CL0oQwju.js";import{g as le}from"../chunks/globals.D0QH3NT1.js";import{e as P,u as ne,o as ae}from"../chunks/each.DNR_FpiS.js";import{d as x}from"../chunks/strategy.min.HrqsHgWl.js";import{g as se}from"../chunks/fetch-data.DANy4EYm.js";import{F as ie}from"../chunks/Filter.C2zp6XCT.js";import{H as oe}from"../chunks/Header.tdl03wFM.js";import{F as ce}from"../chunks/Footer.CQHqTJR9.js";import{l as fe,r as me}from"../chunks/u.B0uFYurI.js";import{I as he}from"../chunks/Img.gdy9T3Mt.js";const Oe=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));x.forEach(s=>{s.desc_html=s.desc.replace(/.+所有我方上陣角色物攻，物防，法攻，法防提高(\d+%)[。，](.+)?$/gm,`攻防+$1
$2`)});const R=x;function T(s,e,n){const t=s.slice();return t[3]=e[n],t}function C(s,e,n){const t=s.slice();return t[3]=e[n],t}function ue(s){let e,n=P(s[1]),t=[];for(let r=0;r<n.length;r+=1)t[r]=J(T(s,n,r));return{c(){for(let r=0;r<t.length;r+=1)t[r].c();e=M()},l(r){for(let a=0;a<t.length;a+=1)t[a].l(r);e=M()},m(r,a){for(let l=0;l<t.length;l+=1)t[l]&&t[l].m(r,a);j(r,e,a)},p(r,a){if(a&2){n=P(r[1]);let l;for(l=0;l<n.length;l+=1){const i=T(r,n,l);t[l]?t[l].p(i,a):(t[l]=J(i),t[l].c(),t[l].m(e.parentNode,e))}for(;l<t.length;l+=1)t[l].d(1);t.length=n.length}},d(r){r&&_(e),F(t,r)}}}function _e(s){let e,n=P(s[1]),t=[];for(let r=0;r<n.length;r+=1)t[r]=K(C(s,n,r));return{c(){e=y("a");for(let r=0;r<t.length;r+=1)t[r].c();this.h()},l(r){e=w(r,"A",{href:!0});var a=I(e);for(let l=0;l<t.length;l+=1)t[l].l(a);a.forEach(_),this.h()},h(){d(e,"href",s[0])},m(r,a){j(r,e,a);for(let l=0;l<t.length;l+=1)t[l]&&t[l].m(e,null)},p(r,a){if(a&2){n=P(r[1]);let l;for(l=0;l<n.length;l+=1){const i=C(r,n,l);t[l]?t[l].p(i,a):(t[l]=K(i),t[l].c(),t[l].m(e,null))}for(;l<t.length;l+=1)t[l].d(1);t.length=n.length}a&1&&d(e,"href",r[0])},d(r){r&&_(e),F(t,r)}}}function J(s){let e,n=s[3]+"",t;return{c(){e=y("span"),t=U(n),this.h()},l(r){e=w(r,"SPAN",{class:!0});var a=I(e);t=W(a,n),a.forEach(_),this.h()},h(){d(e,"class","inline-block")},m(r,a){j(r,e,a),$(e,t)},p(r,a){a&2&&n!==(n=r[3]+"")&&X(t,n)},d(r){r&&_(e)}}}function K(s){let e,n=s[3]+"",t;return{c(){e=y("span"),t=U(n),this.h()},l(r){e=w(r,"SPAN",{class:!0});var a=I(e);t=W(a,n),a.forEach(_),this.h()},h(){d(e,"class","inline-block")},m(r,a){j(r,e,a),$(e,t)},p(r,a){a&2&&n!==(n=r[3]+"")&&X(t,n)},d(r){r&&_(e)}}}function ge(s){let e;function n(a,l){return a[0]?_e:ue}let t=n(s),r=t(s);return{c(){e=y("span"),r.c(),this.h()},l(a){e=w(a,"SPAN",{class:!0});var l=I(e);r.l(l),l.forEach(_),this.h()},h(){d(e,"class","name svelte-1enqryi")},m(a,l){j(a,e,l),r.m(e,null)},p(a,[l]){t===(t=n(a))&&r?r.p(a,l):(r.d(1),r=t(a),r&&(r.c(),r.m(e,null)))},i:z,o:z,d(a){a&&_(e),r.d()}}}function pe(s,e,n){let t,{name:r=""}=e,{href:a=""}=e;return s.$$set=l=>{"name"in l&&n(2,r=l.name),"href"in l&&n(0,a=l.href)},s.$$.update=()=>{s.$$.dirty&4&&n(1,t=r.match(/(·)?.{1,2}/g))},[a,t,r]}class de extends O{constructor(e){super(),q(this,e,pe,ge,B,{name:2,href:0})}}function G(s){let e,n;return e=new he({props:{src:s[2],alt:s[0].name,width:"64",height:"64"}}),{c(){N(e.$$.fragment)},l(t){V(e.$$.fragment,t)},m(t,r){A(e,t,r),n=!0},p(t,r){const a={};r&1&&(a.alt=t[0].name),e.$set(a)},i(t){n||(v(e.$$.fragment,t),n=!0)},o(t){k(e.$$.fragment,t),n=!1},d(t){H(e,t)}}}function $e(s){let e,n,t,r,a,l=s[0].img&&G(s);return r=new de({props:{name:s[0].name,href:s[1]}}),{c(){e=y("div"),n=y("div"),l&&l.c(),t=S(),N(r.$$.fragment),this.h()},l(i){e=w(i,"DIV",{class:!0});var o=I(e);n=w(o,"DIV",{class:!0});var g=I(n);l&&l.l(g),g.forEach(_),t=D(o),V(r.$$.fragment,o),o.forEach(_),this.h()},h(){d(n,"class","avatar svelte-70btyu"),d(e,"class","member svelte-70btyu")},m(i,o){j(i,e,o),$(e,n),l&&l.m(n,null),$(e,t),A(r,e,null),a=!0},p(i,[o]){i[0].img?l?(l.p(i,o),o&1&&v(l,1)):(l=G(i),l.c(),v(l,1),l.m(n,null)):l&&(Y(),k(l,1,1,()=>{l=null}),Z());const g={};o&1&&(g.name=i[0].name),o&2&&(g.href=i[1]),r.$set(g)},i(i){a||(v(l),v(r.$$.fragment,i),a=!0)},o(i){k(l),k(r.$$.fragment,i),a=!1},d(i){i&&_(e),l&&l.d(),H(r)}}}function ve(s,e,n){let{member:t={}}=e,r=!!t.desc,a=!r&&!!t.img,l;a&&(l=fe(`/role/${t.name}`));let o=me(`https://media.zlongame.com/media/news/cn/tdj/info/data/${r?"strategy":"heroicon"}/${t.img}.png`);return s.$$set=g=>{"member"in g&&n(0,t=g.member)},[t,l,o]}class ee extends O{constructor(e){super(),q(this,e,ve,$e,B,{member:0})}}const{Boolean:be}=le;function L(s,e,n){const t=s.slice();return t[4]=e[n],t}function ke(s,e,n){const t=s.slice();return t[7]=e[n],t}function ye(s){let e,n;return e=new ee({props:{member:s[7]}}),{c(){N(e.$$.fragment)},l(t){V(e.$$.fragment,t)},m(t,r){A(e,t,r),n=!0},p:z,i(t){n||(v(e.$$.fragment,t),n=!0)},o(t){k(e.$$.fragment,t),n=!1},d(t){H(e,t)}}}function Q(s,e){let n,t,r,a,l,i,o,g=e[3](e[4].desc_html,e[0])+"",E;r=new ee({props:{member:e[4]}});let b=P(e[4].members),h=[];for(let m=0;m<b.length;m+=1)h[m]=ye(ke(e,b,m));return{key:s,first:null,c(){n=y("div"),t=y("div"),N(r.$$.fragment),a=S();for(let m=0;m<h.length;m+=1)h[m].c();l=S(),i=y("div"),o=new te(!1),this.h()},l(m){n=w(m,"DIV",{class:!0,"data-prop":!0,"data-search":!0,id:!0});var u=I(n);t=w(u,"DIV",{class:!0});var c=I(t);V(r.$$.fragment,c),a=D(c);for(let p=0;p<h.length;p+=1)h[p].l(c);c.forEach(_),l=D(u),i=w(u,"DIV",{class:!0});var f=I(i);o=re(f,!1),f.forEach(_),u.forEach(_),this.h()},h(){d(t,"class","members flex svelte-1vj042l"),o.a=null,d(i,"class","info svelte-1vj042l"),d(n,"class","row flex svelte-1vj042l"),d(n,"data-prop",e[4].members.map(Ee).filter(Boolean)),d(n,"data-search",e[4].desc_html),d(n,"id",e[4].name),this.first=n},m(m,u){j(m,n,u),$(n,t),A(r,t,null),$(t,a);for(let c=0;c<h.length;c+=1)h[c]&&h[c].m(t,null);$(n,l),$(n,i),o.m(g,i),E=!0},p(m,u){e=m,(!E||u&1)&&g!==(g=e[3](e[4].desc_html,e[0])+"")&&o.p(g)},i(m){if(!E){v(r.$$.fragment,m);for(let u=0;u<b.length;u+=1)v(h[u]);E=!0}},o(m){k(r.$$.fragment,m),h=h.filter(be);for(let u=0;u<h.length;u+=1)k(h[u]);E=!1},d(m){m&&_(n),H(r),F(h,m)}}}function we(s){let e,n,t,r,a,l,i,o=[],g=new Map,E,b,h;n=new oe({props:{title:"戰陣圖鑑"}}),r=new ie({props:{filter_cates:s[1],item_class:".row",placeholder:"過濾說明",search_cb:s[2]}});let m=P(R);const u=c=>c[4].name;for(let c=0;c<m.length;c+=1){let f=L(s,m,c),p=u(f);g.set(p,o[c]=Q(p,f))}return b=new ce({props:{time:!0,refs:se([1,1,0])}}),{c(){e=y("div"),N(n.$$.fragment),t=S(),N(r.$$.fragment),a=S(),l=y("hr"),i=S();for(let c=0;c<o.length;c+=1)o[c].c();E=S(),N(b.$$.fragment),this.h()},l(c){e=w(c,"DIV",{class:!0});var f=I(e);V(n.$$.fragment,f),t=D(f),V(r.$$.fragment,f),a=D(f),l=w(f,"HR",{class:!0}),i=D(f);for(let p=0;p<o.length;p+=1)o[p].l(f);E=D(f),V(b.$$.fragment,f),f.forEach(_),this.h()},h(){d(l,"class","svelte-1vj042l"),d(e,"class","workspace")},m(c,f){j(c,e,f),A(n,e,null),$(e,t),A(r,e,null),$(e,a),$(e,l),$(e,i);for(let p=0;p<o.length;p+=1)o[p]&&o[p].m(e,null);$(e,E),A(b,e,null),h=!0},p(c,[f]){f&9&&(m=P(R),Y(),o=ne(o,f,u,1,c,m,g,e,ae,Q,E,L),Z())},i(c){if(!h){v(n.$$.fragment,c),v(r.$$.fragment,c);for(let f=0;f<m.length;f+=1)v(o[f]);v(b.$$.fragment,c),h=!0}},o(c){k(n.$$.fragment,c),k(r.$$.fragment,c);for(let f=0;f<o.length;f+=1)k(o[f]);k(b.$$.fragment,c),h=!1},d(c){c&&_(e),H(n),H(r);for(let f=0;f<o.length;f+=1)o[f].d();H(b)}}}const Ee=s=>!s.img&&s.name;function Ie(s,e,n){let t,r=[{prop:"prop",title:"職業",multi:!0,values:["俠客","鐵衛","祝由","御風","羽士","咒師","鬥將"]},{prop:"prop",title:"屬相",multi:!0,values:["炎","雷","冰","光","暗","幽"]}];function a(i){n(0,t=i)}function l(i=""){if(t.length){let o=new RegExp(`(${t})`,"g");return i.replace(o,"<mark>$1</mark>")}return i}return n(0,t=""),[t,r,a,l]}class qe extends O{constructor(e){super(),q(this,e,Ie,we,B,{})}}export{qe as component,Oe as universal};