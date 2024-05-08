import{s as Ae,e as d,a as P,b as m,t as U,f as b,c as N,d as o,Y as $t,i as J,v as i,a7 as it,L as F,E as w,U as ve,n as fe,N as Ve,r as Se,a4 as Pe,z as le,A as ne,B as lt,a8 as Ut,g as ge,a9 as Dt,J as Ot,K as Ct,M as me,O as ot,a6 as Lt,I as wt,aa as Vt}from"../chunks/scheduler.B4TYcRyM.js";import{S as Be,i as Me,c as ye,a as Ee,m as Ie,t as se,e as jt,b as ue,d as Te,f as At,g as Bt}from"../chunks/index.CL0oQwju.js";import{e as X,u as Mt,d as Rt}from"../chunks/each.DNR_FpiS.js";import{H as Ft}from"../chunks/Header.tdl03wFM.js";import{F as Jt}from"../chunks/Footer.CQHqTJR9.js";import{d as yt,w as Et}from"../chunks/index.BwPNfU2a.js";import{a as It,s as Tt}from"../chunks/u.B0uFYurI.js";const kl=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));function Ht(t,e,l){return t<=e?e:t>=l?l:t}const Gt={atk:{天:[10,4],地:[5,2],荒:[7,3]},def:{天:[5,2],地:[10,4],荒:[7,3]}},tt=[{label:"--",score:0,type:"atk"},{label:"攻擊",score:11,type:"atk"},{label:"傷害",score:10,type:"atk"},{label:"穿透",score:6,type:"atk"},{label:"暴擊",score:3,type:"atk"},{label:"反擊",score:0,type:"atk"},{label:"氣血",score:7,type:"def"},{label:"免傷",score:5,type:"def"},{label:"防禦",score:1,type:"def"},{label:"抗暴",score:0,type:"def"}];function Pt(t=tt){return t.map(e=>(e.range=Gt[e.type],e))}const qt=Pt();function we(t,e=qt){return e.find(l=>l.label===t)}const ut={天:164,地:143,荒:145},zt=["荒蟄","頭狼","幽魎","羅鬼","妖術師","朱焰魔火","九環朱蝮","赤練鬼","剛破鬼","凶骸兵","冥葵","屍魔術士","咒石兵","冰魔蠍","死魘鬼卒","鬼面花蛛","百眼翼魔"];function Ne(t){return JSON.parse(JSON.stringify(t))}const Nt={prop:"--",value:5};function Yt(){let t=It("historeUrls")||[];const{subscribe:e,set:l,update:n}=Et(t);return{subscribe:e,add:r=>n(u=>[...new Set([...u,r])]),remove:r=>n(u=>u.filter(s=>s!==r)),reset:()=>l([])}}const je=Yt(),Kt=yt(je,t=>(Tt({key:"historeUrls",value:t}),t));function Qt(){let t=It("oriProps")||Ne(tt);const{subscribe:e,set:l,update:n}=Et(t);return{subscribe:e,update:n,set:l,reset:()=>l(Ne(tt))}}const ce=Qt(),Wt=yt(ce,t=>(Tt({key:"oriProps",value:t}),t));function ct(t,e,l){const n=t.slice();return n[8]=e[l],n}function ft(t){let e,l=t[8].label+" "+t[8].score,n,r,u;return{c(){e=d("option"),n=le(l),r=P(),this.h()},l(s){e=m(s,"OPTION",{});var a=U(e);n=ne(a,l),r=N(a),a.forEach(b),this.h()},h(){e.__value=u=t[8].label,F(e,e.__value)},m(s,a){J(s,e,a),i(e,n),i(e,r)},p(s,a){a&8&&l!==(l=s[8].label+" "+s[8].score)&&lt(n,l),a&8&&u!==(u=s[8].label)&&(e.__value=u,F(e,e.__value))},d(s){s&&b(e)}}}function Xt(t){let e,l,n,r,u,s,a,f,y,v,g=X(t[3]),h=[];for(let _=0;_<g.length;_+=1)h[_]=ft(ct(t,g,_));return{c(){e=d("div"),l=d("select");for(let _=0;_<h.length;_+=1)h[_].c();n=P(),r=d("input"),u=P(),s=d("div"),a=d("input"),this.h()},l(_){e=m(_,"DIV",{class:!0});var c=U(e);l=m(c,"SELECT",{class:!0});var k=U(l);for(let R=0;R<h.length;R+=1)h[R].l(k);k.forEach(b),n=N(c),r=m(c,"INPUT",{type:!0,max:!0,min:!0,class:!0}),u=N(c),s=m(c,"DIV",{class:!0});var V=U(s);a=m(V,"INPUT",{type:!0,max:!0,min:!0,style:!0,class:!0}),V.forEach(b),c.forEach(b),this.h()},h(){o(l,"class","svelte-2197xy"),t[0].prop===void 0&&$t(()=>t[5].call(l)),o(r,"type","number"),o(r,"max",t[2]),o(r,"min",t[1]),o(r,"class","svelte-2197xy"),o(a,"type","range"),o(a,"max",t[2]),o(a,"min",t[1]),o(a,"style",f=`--max: ${t[2]};`),o(a,"class","svelte-2197xy"),o(s,"class","flex svelte-2197xy"),o(e,"class","flex list-item svelte-2197xy")},m(_,c){J(_,e,c),i(e,l);for(let k=0;k<h.length;k+=1)h[k]&&h[k].m(l,null);it(l,t[0].prop,!0),i(e,n),i(e,r),F(r,t[0].value),i(e,u),i(e,s),i(s,a),F(a,t[0].value),y||(v=[w(l,"change",t[5]),w(r,"input",t[6]),w(a,"change",t[7]),w(a,"input",t[7])],y=!0)},p(_,[c]){if(c&8){g=X(_[3]);let k;for(k=0;k<g.length;k+=1){const V=ct(_,g,k);h[k]?h[k].p(V,c):(h[k]=ft(V),h[k].c(),h[k].m(l,null))}for(;k<h.length;k+=1)h[k].d(1);h.length=g.length}c&9&&it(l,_[0].prop),c&4&&o(r,"max",_[2]),c&2&&o(r,"min",_[1]),c&9&&ve(r.value)!==_[0].value&&F(r,_[0].value),c&4&&o(a,"max",_[2]),c&2&&o(a,"min",_[1]),c&4&&f!==(f=`--max: ${_[2]};`)&&o(a,"style",f),c&9&&F(a,_[0].value)},i:fe,o:fe,d(_){_&&b(e),Ve(h,_),y=!1,Se(v)}}}function Zt(t,e,l){let n,r,u;Pe(t,ce,g=>l(3,u=g));let{position:s="天"}=e,{item:a=Ne(Nt)}=e;function f(){a.prop=Ut(this),l(0,a)}function y(){a.value=ve(this.value),l(0,a)}function v(){a.value=ve(this.value),l(0,a)}return t.$$set=g=>{"position"in g&&l(4,s=g.position),"item"in g&&l(0,a=g.item)},t.$$.update=()=>{t.$$.dirty&17&&l(2,[n,r]=we(a.prop).range[s]||[],n,(l(1,r),l(0,a),l(4,s)))},[a,r,n,u,s,f,y,v]}class xt extends Be{constructor(e){super(),Me(this,e,Zt,Xt,Ae,{position:4,item:0})}}function pt(t,e,l){const n=t.slice();return n[5]=e[l],n}function _t(t,e){let l,n,r="⨯",u,s,a,f=ht(e[5])+"",y,v,g;function h(){return e[2](e[5])}function _(){return e[3](e[5])}return{key:t,first:null,c(){l=d("div"),n=d("button"),n.textContent=r,u=P(),s=d("span"),a=new Ot(!1),y=P(),this.h()},l(c){l=m(c,"DIV",{class:!0});var k=U(l);n=m(k,"BUTTON",{class:!0,"data-svelte-h":!0}),ge(n)!=="svelte-gltzqj"&&(n.textContent=r),u=N(k),s=m(k,"SPAN",{tabindex:!0,role:!0,"aria-hidden":!0});var V=U(s);a=Ct(V,!1),V.forEach(b),y=N(k),k.forEach(b),this.h()},h(){o(n,"class","btn svelte-uviaf1"),a.a=null,o(s,"tabindex","0"),o(s,"role","button"),o(s,"aria-hidden","true"),o(l,"class","li svelte-uviaf1"),this.first=l},m(c,k){J(c,l,k),i(l,n),i(l,u),i(l,s),a.m(f,s),i(l,y),v||(g=[w(n,"click",me(h)),w(s,"click",me(_))],v=!0)},p(c,k){e=c,k&1&&f!==(f=ht(e[5])+"")&&a.p(f)},d(c){c&&b(l),v=!1,Se(g)}}}function el(t){let e,l,n="魂石紀錄:",r,u,s=[],a=new Map,f=X(t[0]);const y=v=>v[5];for(let v=0;v<f.length;v+=1){let g=pt(t,f,v),h=y(g);a.set(h,s[v]=_t(h,g))}return{c(){e=d("details"),l=d("summary"),l.textContent=n,r=P(),u=d("div");for(let v=0;v<s.length;v+=1)s[v].c();this.h()},l(v){e=m(v,"DETAILS",{class:!0});var g=U(e);l=m(g,"SUMMARY",{"data-svelte-h":!0}),ge(l)!=="svelte-b8rc29"&&(l.textContent=n),r=N(g),u=m(g,"DIV",{class:!0});var h=U(u);for(let _=0;_<s.length;_+=1)s[_].l(h);h.forEach(b),g.forEach(b),this.h()},h(){o(u,"class","ul svelte-uviaf1"),e.open=!0,o(e,"class","aside svelte-uviaf1")},m(v,g){J(v,e,g),i(e,l),i(e,r),i(e,u);for(let h=0;h<s.length;h+=1)s[h]&&s[h].m(u,null)},p(v,[g]){g&3&&(f=X(v[0]),s=Mt(s,g,y,1,v,f,a,u,Rt,_t,null,pt))},i:fe,o:fe,d(v){v&&b(e);for(let g=0;g<s.length;g+=1)s[g].d()}}}function ht(t){let e=JSON.parse(t);return[et("",e.title+"‧"+e.position),et("計分",e.score),...e.items.filter(l=>l.prop!=="--").map(l=>et(l.prop,l.value))].join("")}function et(t="",e=""){return`<span class="i ib">
      <sup>${t}</sup>
      ${e}
    </span>`}function tl(t,e,l){let n;Pe(t,Kt,f=>l(0,n=f));const r=Dt();function u(f){r("apply",{url:f})}return[n,u,f=>je.remove(f),f=>u(f)]}class ll extends Be{constructor(e){super(),Me(this,e,tl,el,Ae,{})}}function dt(t,e,l){const n=t.slice();return n[7]=e[l],n[8]=e,n[9]=l,n}function mt(t){let e,l=t[7].label+"",n,r,u,s,a,f,y,v;function g(){t[4].call(u,t[8],t[9])}function h(){t[5].call(a,t[8],t[9])}return{c(){e=d("div"),n=le(l),r=P(),u=d("input"),s=P(),a=d("input"),f=P(),this.h()},l(_){e=m(_,"DIV",{});var c=U(e);n=ne(c,l),r=N(c),u=m(c,"INPUT",{type:!0,max:!0,step:!0,min:!0}),s=N(c),a=m(c,"INPUT",{type:!0,max:!0,step:!0,min:!0}),f=N(c),c.forEach(b),this.h()},h(){o(u,"type","number"),o(u,"max","20"),o(u,"step","1"),o(u,"min","0"),o(a,"type","range"),o(a,"max","20"),o(a,"step","1"),o(a,"min","0")},m(_,c){J(_,e,c),i(e,n),i(e,r),i(e,u),F(u,t[7].score),i(e,s),i(e,a),F(a,t[7].score),i(e,f),y||(v=[w(u,"input",g),w(a,"change",h),w(a,"input",h)],y=!0)},p(_,c){t=_,c&2&&l!==(l=t[7].label+"")&&lt(n,l),c&2&&ve(u.value)!==t[7].score&&F(u,t[7].score),c&2&&F(a,t[7].score)},d(_){_&&b(e),y=!1,Se(v)}}}function vt(t){let e,l=t[7].label!=="--"&&mt(t);return{c(){l&&l.c(),e=ot()},l(n){l&&l.l(n),e=ot()},m(n,r){l&&l.m(n,r),J(n,e,r)},p(n,r){n[7].label!=="--"?l?l.p(n,r):(l=mt(n),l.c(),l.m(e.parentNode,e)):l&&(l.d(1),l=null)},d(n){n&&b(e),l&&l.d(n)}}}function nl(t){let e,l="⚙️",n,r,u,s,a,f,y,v="調整計分權重",g,h,_,c,k,V,R,j,H=X(t[1]),C=[];for(let E=0;E<H.length;E+=1)C[E]=vt(dt(t,H,E));return{c(){e=d("button"),e.textContent=l,n=P(),r=d("div"),u=d("div"),s=P(),a=d("div"),f=d("fieldset"),y=d("legend"),y.textContent=v,g=P();for(let E=0;E<C.length;E+=1)C[E].c();h=P(),_=d("div"),c=d("input"),k=P(),V=d("input"),this.h()},l(E){e=m(E,"BUTTON",{"data-svelte-h":!0}),ge(e)!=="svelte-1yvesfs"&&(e.textContent=l),n=N(E),r=m(E,"DIV",{class:!0});var T=U(r);u=m(T,"DIV",{class:!0,"aria-hidden":!0}),U(u).forEach(b),s=N(T),a=m(T,"DIV",{class:!0});var S=U(a);f=m(S,"FIELDSET",{});var D=U(f);y=m(D,"LEGEND",{"data-svelte-h":!0}),ge(y)!=="svelte-pna5q8"&&(y.textContent=v),g=N(D);for(let A=0;A<C.length;A+=1)C[A].l(D);D.forEach(b),h=N(S),_=m(S,"DIV",{class:!0});var $=U(_);c=m($,"INPUT",{type:!0}),k=N($),V=m($,"INPUT",{type:!0}),$.forEach(b),S.forEach(b),T.forEach(b),this.h()},h(){o(u,"class","dialog-overlay svelte-1jg1n1i"),o(u,"aria-hidden","true"),o(c,"type","submit"),c.value="✓",o(V,"type","reset"),o(_,"class","flex jc-sb"),o(a,"class","dialog-content svelte-1jg1n1i"),o(r,"class","dialog svelte-1jg1n1i"),r.hidden=t[0]},m(E,T){J(E,e,T),J(E,n,T),J(E,r,T),i(r,u),i(r,s),i(r,a),i(a,f),i(f,y),i(f,g);for(let S=0;S<C.length;S+=1)C[S]&&C[S].m(f,null);i(a,h),i(a,_),i(_,c),i(_,k),i(_,V),R||(j=[w(e,"click",t[2]),w(u,"click",t[2]),w(c,"click",t[2]),w(V,"click",t[3])],R=!0)},p(E,[T]){if(T&2){H=X(E[1]);let S;for(S=0;S<H.length;S+=1){const D=dt(E,H,S);C[S]?C[S].p(D,T):(C[S]=vt(D),C[S].c(),C[S].m(f,null))}for(;S<C.length;S+=1)C[S].d(1);C.length=H.length}T&1&&(r.hidden=E[0])},i:fe,o:fe,d(E){E&&(b(e),b(n),b(r)),Ve(C,E),R=!1,Se(j)}}}function sl(t,e,l){let n;Pe(t,Wt,y=>l(6,y)),Pe(t,ce,y=>l(1,n=y));let r=!0;function u(){l(0,r=!r)}function s(){ce.reset()}function a(y,v){y[v].score=ve(this.value),ce.set(n)}function f(y,v){y[v].score=ve(this.value),ce.set(n)}return[r,n,u,s,a,f]}class al extends Be{constructor(e){super(),Me(this,e,sl,nl,Ae,{})}}function gt(t,e,l){const n=t.slice();return n[21]=e[l],n[22]=e,n[23]=l,n}function rl(t,e,l){const n=t.slice();return n[24]=e[l],n}function il(t){let e;return{c(){e=d("option"),this.h()},l(l){e=m(l,"OPTION",{}),U(e).forEach(b),this.h()},h(){e.__value=t[24],F(e,e.__value)},m(l,n){J(l,e,n)},p:fe,d(l){l&&b(e)}}}function bt(t){let e,l,n;function r(s){t[15](s,t[21],t[22],t[23])}let u={position:t[0]};return t[21]!==void 0&&(u.item=t[21]),e=new xt({props:u}),wt.push(()=>At(e,"item",r)),{c(){ye(e.$$.fragment)},l(s){Ee(e.$$.fragment,s)},m(s,a){Ie(e,s,a),n=!0},p(s,a){t=s;const f={};a&1&&(f.position=t[0]),!l&&a&2&&(l=!0,f.item=t[21],Vt(()=>l=!1)),e.$set(f)},i(s){n||(se(e.$$.fragment,s),n=!0)},o(s){ue(e.$$.fragment,s),n=!1},d(s){Te(e,s)}}}function ol(t){let e,l;return e=new al({}),{c(){ye(e.$$.fragment)},l(n){Ee(e.$$.fragment,n)},m(n,r){Ie(e,n,r),l=!0},i(n){l||(se(e.$$.fragment,n),l=!0)},o(n){ue(e.$$.fragment,n),l=!1},d(n){Te(e,n)}}}function ul(t){let e,l,n,r,u,s,a,f,y,v,g,h,_,c,k,V,R,j,H,C,E,T,S,D,$,A,L="副屬",G,Re,q,pe,nt="計分",Fe,z,be,$e,Je,ae,He,ke=t[3].max+"",Ue,Ge,Y,K,De,qe,re,ze,_e,Oe,Ye,Z,Ce,x,Q,Ke,Qe,st;e=new Ft({props:{title:"絕品魂石 評估"}});let at=X(zt),W=[];for(let p=0;p<at.length;p+=1)W[p]=il(rl(t,at,p));let ie=X(t[1]),O=[];for(let p=0;p<ie.length;p+=1)O[p]=bt(gt(t,ie,p));const St=p=>ue(O[p],1,1,()=>{O[p]=null});return Z=new ll({}),Z.$on("apply",t[6]),x=new Jt({props:{refs:t[8],$$slots:{default:[ol]},$$scope:{ctx:t}}}),Ke=Lt(t[12][0]),{c(){ye(e.$$.fragment),l=P(),n=d("div"),r=d("form"),u=d("fieldset"),s=d("legend"),a=le(`絕‧魂石孔位
				`),f=d("input"),y=P(),v=d("datalist");for(let p=0;p<W.length;p+=1)W[p].c();g=P(),h=d("div"),_=d("label"),c=d("input"),k=le(`
					天`),V=P(),R=d("label"),j=d("input"),H=le(`
					地`),C=P(),E=d("label"),T=d("input"),S=le(`
					荒`),D=P(),$=d("fieldset"),A=d("legend"),A.textContent=L,G=P();for(let p=0;p<O.length;p+=1)O[p].c();Re=P(),q=d("fieldset"),pe=d("legend"),pe.textContent=nt,Fe=P(),z=d("input"),Je=P(),ae=d("sub"),He=le("/ "),Ue=le(ke),Ge=P(),Y=d("div"),K=d("input"),qe=P(),re=d("input"),ze=P(),_e=d("input"),Ye=P(),ye(Z.$$.fragment),Ce=P(),ye(x.$$.fragment),this.h()},l(p){Ee(e.$$.fragment,p),l=N(p),n=m(p,"DIV",{class:!0});var I=U(n);r=m(I,"FORM",{class:!0,style:!0});var M=U(r);u=m(M,"FIELDSET",{});var B=U(u);s=m(B,"LEGEND",{});var ee=U(s);a=ne(ee,`絕‧魂石孔位
				`),f=m(ee,"INPUT",{class:!0,type:!0,list:!0}),y=N(ee),v=m(ee,"DATALIST",{id:!0});var rt=U(v);for(let oe=0;oe<W.length;oe+=1)W[oe].l(rt);rt.forEach(b),ee.forEach(b),g=N(B),h=m(B,"DIV",{class:!0});var he=U(h);_=m(he,"LABEL",{});var We=U(_);c=m(We,"INPUT",{type:!0,name:!0,class:!0}),k=ne(We,`
					天`),We.forEach(b),V=N(he),R=m(he,"LABEL",{});var Xe=U(R);j=m(Xe,"INPUT",{type:!0,name:!0,class:!0}),H=ne(Xe,`
					地`),Xe.forEach(b),C=N(he),E=m(he,"LABEL",{});var Ze=U(E);T=m(Ze,"INPUT",{type:!0,name:!0,class:!0}),S=ne(Ze,`
					荒`),Ze.forEach(b),he.forEach(b),B.forEach(b),D=N(M),$=m(M,"FIELDSET",{});var Le=U($);A=m(Le,"LEGEND",{"data-svelte-h":!0}),ge(A)!=="svelte-150jb6r"&&(A.textContent=L),G=N(Le);for(let oe=0;oe<O.length;oe+=1)O[oe].l(Le);Le.forEach(b),Re=N(M),q=m(M,"FIELDSET",{class:!0});var te=U(q);pe=m(te,"LEGEND",{"data-svelte-h":!0}),ge(pe)!=="svelte-1h1ah46"&&(pe.textContent=nt),Fe=N(te),z=m(te,"INPUT",{type:!0,class:!0,style:!0}),Je=N(te),ae=m(te,"SUB",{class:!0});var xe=U(ae);He=ne(xe,"/ "),Ue=ne(xe,ke),xe.forEach(b),Ge=N(te),Y=m(te,"DIV",{class:!0});var de=U(Y);K=m(de,"INPUT",{class:!0,type:!0}),qe=N(de),re=m(de,"INPUT",{type:!0,class:!0}),ze=N(de),_e=m(de,"INPUT",{type:!0,class:!0}),de.forEach(b),te.forEach(b),M.forEach(b),Ye=N(I),Ee(Z.$$.fragment,I),I.forEach(b),Ce=N(p),Ee(x.$$.fragment,p),this.h()},h(){o(f,"class","title svelte-3an58b"),o(f,"type","search"),o(f,"list","rock-types"),o(v,"id","rock-types"),o(c,"type","radio"),o(c,"name","position"),c.__value="天",F(c,c.__value),c.checked=!0,o(c,"class","svelte-3an58b"),o(j,"type","radio"),o(j,"name","position"),j.__value="地",F(j,j.__value),o(j,"class","svelte-3an58b"),o(T,"type","radio"),o(T,"name","position"),T.__value="荒",F(T,T.__value),o(T,"class","svelte-3an58b"),o(h,"class","flex jc-se"),o(z,"type","text"),z.readOnly=!0,o(z,"class","output svelte-3an58b"),z.value=be=t[3].score,o(z,"style",$e=`--score: ${t[3].score}; --max: ${t[3].max}`),o(ae,"class","max svelte-3an58b"),o(K,"class","save svelte-3an58b"),o(K,"type","submit"),K.value="記錄",K.disabled=De=!t[3].score,o(re,"type","submit"),re.value="生成上下限",o(re,"class","svelte-3an58b"),o(_e,"type","reset"),o(_e,"class","svelte-3an58b"),o(Y,"class","flex jc-sb form-btns svelte-3an58b"),o(q,"class",""),o(r,"class","main svelte-3an58b"),o(r,"style",Oe=`--break-point: ${ut[t[0]]}`),o(n,"class","workspace svelte-3an58b"),Ke.p(c,j,T)},m(p,I){Ie(e,p,I),J(p,l,I),J(p,n,I),i(n,r),i(r,u),i(u,s),i(s,a),i(s,f),F(f,t[2]),i(s,y),i(s,v);for(let M=0;M<W.length;M+=1)W[M]&&W[M].m(v,null);i(u,g),i(u,h),i(h,_),i(_,c),c.checked=c.__value===t[0],i(_,k),i(h,V),i(h,R),i(R,j),j.checked=j.__value===t[0],i(R,H),i(h,C),i(h,E),i(E,T),T.checked=T.__value===t[0],i(E,S),i(r,D),i(r,$),i($,A),i($,G);for(let M=0;M<O.length;M+=1)O[M]&&O[M].m($,null);i(r,Re),i(r,q),i(q,pe),i(q,Fe),i(q,z),i(q,Je),i(q,ae),i(ae,He),i(ae,Ue),i(q,Ge),i(q,Y),i(Y,K),i(Y,qe),i(Y,re),i(Y,ze),i(Y,_e),i(n,Ye),Ie(Z,n,null),J(p,Ce,I),Ie(x,p,I),Q=!0,Qe||(st=[w(f,"input",t[10]),w(c,"change",t[11]),w(j,"change",t[13]),w(T,"change",t[14]),w(K,"click",me(t[4])),w(re,"click",me(t[5])),w(_e,"click",me(t[7])),w(r,"submit",me(fl))],Qe=!0)},p(p,[I]){if(I&4&&f.value!==p[2]&&F(f,p[2]),I&1&&(c.checked=c.__value===p[0]),I&1&&(j.checked=j.__value===p[0]),I&1&&(T.checked=T.__value===p[0]),I&3){ie=X(p[1]);let B;for(B=0;B<ie.length;B+=1){const ee=gt(p,ie,B);O[B]?(O[B].p(ee,I),se(O[B],1)):(O[B]=bt(ee),O[B].c(),se(O[B],1),O[B].m($,null))}for(Bt(),B=ie.length;B<O.length;B+=1)St(B);jt()}(!Q||I&8&&be!==(be=p[3].score)&&z.value!==be)&&(z.value=be),(!Q||I&8&&$e!==($e=`--score: ${p[3].score}; --max: ${p[3].max}`))&&o(z,"style",$e),(!Q||I&8)&&ke!==(ke=p[3].max+"")&&lt(Ue,ke),(!Q||I&8&&De!==(De=!p[3].score))&&(K.disabled=De),(!Q||I&1&&Oe!==(Oe=`--break-point: ${ut[p[0]]}`))&&o(r,"style",Oe);const M={};I&134217728&&(M.$$scope={dirty:I,ctx:p}),x.$set(M)},i(p){if(!Q){se(e.$$.fragment,p);for(let I=0;I<ie.length;I+=1)se(O[I]);se(Z.$$.fragment,p),se(x.$$.fragment,p),Q=!0}},o(p){ue(e.$$.fragment,p),O=O.filter(Boolean);for(let I=0;I<O.length;I+=1)ue(O[I]);ue(Z.$$.fragment,p),ue(x.$$.fragment,p),Q=!1},d(p){p&&(b(l),b(n),b(Ce)),Te(e,p),Ve(W,p),Ve(O,p),Te(Z),Te(x,p),Ke.r(),Qe=!1,Se(st)}}}function kt(t){return t.prop!=="--"}function cl(){let t=document.querySelector(".aside .ul");t&&(t.scrollTop=t.scrollHeight)}function fl(){}function pl(t,e,l){let n,r,u;Pe(t,ce,D=>l(9,u=D));let s="天",a=new Array(4),f="";function y(D){return D.reduce(($,A)=>{let L=we(A.prop,n),G=L.range[s][0];return $.score+=L.score*A.value,$.max+=L.score*G,$},{score:0,max:0})}function v(){r.score&&je.add(JSON.stringify({title:f,position:s,items:a,score:r.score}))}function g(D,$="max"){return Ne(D).map(L=>{if(!kt(L))return L;let G=we(L.prop,n).range[s];switch($){case"max":L.value=G[0];break;case"min":L.value=G[1];break;case"mid":L.value=Math.round((G[0]+G[1])/2);break}return L})}function h(D,$="max",A=""){let L=g(D,$),G=y(L).score;je.add(JSON.stringify({title:f+A,position:s,items:L,score:G}))}function _(){a.some(kt)&&(h(a,"max","[上]"),h(a,"mid","[中]"),h(a,"min","[下]"),setTimeout(cl,0))}function c(D){let $=JSON.parse(D.detail.url);l(0,s=$.position),l(2,f=$.title),l(1,a=$.items)}function k(){a.forEach(D=>{let $=we(D.prop,n),[A,L]=$.range[s];D.value=Ht(D.value,L,A)})}function V(){l(2,f=""),l(1,a=Ne(new Array(4).fill(Nt)))}let R=[{title:"計分標準refs: 魂石选择终极攻略 | NGA玩家社区",link:"https://bbs.nga.cn/read.php?tid=26383169&rand=456",target:"_blank"}];const j=[[]];function H(){f=this.value,l(2,f)}function C(){s=this.__value,l(0,s)}function E(){s=this.__value,l(0,s)}function T(){s=this.__value,l(0,s)}function S(D,$,A,L){A[L]=D,l(1,a)}return t.$$.update=()=>{t.$$.dirty&512&&(n=Pt(u)),t.$$.dirty&514&&l(3,r=y(a)),t.$$.dirty&3&&k()},[s,a,f,r,v,_,c,V,R,u,H,C,j,E,T,S]}class yl extends Be{constructor(e){super(),Me(this,e,pl,ul,Ae,{})}}export{yl as component,kl as universal};