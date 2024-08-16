import{e as Lt,g as Vt}from"../chunks/fetch-data.DANy4EYm.js";import{f as St,I as Ct,s as Tt}from"../chunks/summon.B8YkIWCa.js";import{s as kt,e as v,z as p,a as L,M as Re,b as d,t as k,A as g,f as u,c as V,d as $,i as j,v as o,B as O,L as Ye,g as rt,u as ye}from"../chunks/scheduler.BwZByWNM.js";import{S as Et,i as wt,t as q,g as Ze,b as U,e as xe,c as he,a as ce,m as ve,d as de}from"../chunks/index.CzTF124p.js";import{e as pe}from"../chunks/each.BIW2j3Zg.js";import{c as ot,l as ft}from"../chunks/u.BLGzHjof.js";import{H as Bt}from"../chunks/Header.kxnrCaSD.js";import{N as Nt}from"../chunks/NavItem.BztIzmrX.js";import{F as jt}from"../chunks/Footer.CysTgwK2.js";const yt=async({params:r})=>{try{return{summon:St("name",r.slug),slug:r.slug}}catch(e){Lt(404,e)}},Qt=Object.freeze(Object.defineProperty({__proto__:null,load:yt},Symbol.toStringTag,{value:"Module"}));function ut(r,e,f){const s=r.slice();return s[1]=e[f],s}function mt(r){let e,f,s=(r[0].cd==="-"?0:r[0].cd)+"",l,i;return{c(){e=v("div"),f=p("⏳ "),l=p(s),this.h()},l(t){e=d(t,"DIV",{"data-cd":!0});var n=k(e);f=g(n,"⏳ "),l=g(n,s),n.forEach(u),this.h()},h(){$(e,"data-cd",i=r[0].cd)},m(t,n){j(t,e,n),o(e,f),o(e,l)},p(t,n){n&1&&s!==(s=(t[0].cd==="-"?0:t[0].cd)+"")&&O(l,s),n&1&&i!==(i=t[0].cd)&&$(e,"data-cd",i)},d(t){t&&u(e)}}}function _t(r){let e,f,s=r[0].shoot+"",l,i;return{c(){e=v("div"),f=p("🏹 "),l=p(s),this.h()},l(t){e=d(t,"DIV",{"data-shoot":!0});var n=k(e);f=g(n,"🏹 "),l=g(n,s),n.forEach(u),this.h()},h(){$(e,"data-shoot",i=r[0].shoot)},m(t,n){j(t,e,n),o(e,f),o(e,l)},p(t,n){n&1&&s!==(s=t[0].shoot+"")&&O(l,s),n&1&&i!==(i=t[0].shoot)&&$(e,"data-shoot",i)},d(t){t&&u(e)}}}function ht(r){let e,f,s=r[0].range+"",l,i;return{c(){e=v("div"),f=p("🎯 "),l=p(s),this.h()},l(t){e=d(t,"DIV",{"data-range":!0});var n=k(e);f=g(n,"🎯 "),l=g(n,s),n.forEach(u),this.h()},h(){$(e,"data-range",i=r[0].range)},m(t,n){j(t,e,n),o(e,f),o(e,l)},p(t,n){n&1&&s!==(s=t[0].range+"")&&O(l,s),n&1&&i!==(i=t[0].range)&&$(e,"data-range",i)},d(t){t&&u(e)}}}function ct(r){let e,f,s=r[0].type+"",l,i,t;return{c(){e=v("div"),f=p("🏷️ "),l=p(s),this.h()},l(n){e=d(n,"DIV",{"data-type":!0,"data-way":!0});var m=k(e);f=g(m,"🏷️ "),l=g(m,s),m.forEach(u),this.h()},h(){$(e,"data-type",i=r[0].type),$(e,"data-way",t=r[0].way)},m(n,m){j(n,e,m),o(e,f),o(e,l)},p(n,m){m&1&&s!==(s=n[0].type+"")&&O(l,s),m&1&&i!==(i=n[0].type)&&$(e,"data-type",i),m&1&&t!==(t=n[0].way)&&$(e,"data-way",t)},d(n){n&&u(e)}}}function vt(r){let e,f,s=pe(r[0].sub_skills),l=[];for(let t=0;t<s.length;t+=1)l[t]=dt(ut(r,s,t));const i=t=>U(l[t],1,1,()=>{l[t]=null});return{c(){for(let t=0;t<l.length;t+=1)l[t].c();e=Re()},l(t){for(let n=0;n<l.length;n+=1)l[n].l(t);e=Re()},m(t,n){for(let m=0;m<l.length;m+=1)l[m]&&l[m].m(t,n);j(t,e,n),f=!0},p(t,n){if(n&1){s=pe(t[0].sub_skills);let m;for(m=0;m<s.length;m+=1){const b=ut(t,s,m);l[m]?(l[m].p(b,n),q(l[m],1)):(l[m]=dt(b),l[m].c(),q(l[m],1),l[m].m(e.parentNode,e))}for(Ze(),m=s.length;m<l.length;m+=1)i(m);xe()}},i(t){if(!f){for(let n=0;n<s.length;n+=1)q(l[n]);f=!0}},o(t){l=l.filter(Boolean);for(let n=0;n<l.length;n+=1)U(l[n]);f=!1},d(t){t&&u(e),Ye(l,t)}}}function dt(r){let e,f,s,l;return s=new It({props:{skill:r[1]}}),{c(){e=v("br"),f=p(`
		🔁
		`),he(s.$$.fragment)},l(i){e=d(i,"BR",{}),f=g(i,`
		🔁
		`),ce(s.$$.fragment,i)},m(i,t){j(i,e,t),j(i,f,t),ve(s,i,t),l=!0},p(i,t){const n={};t&1&&(n.skill=i[1]),s.$set(n)},i(i){l||(q(s.$$.fragment,i),l=!0)},o(i){U(s.$$.fragment,i),l=!1},d(i){i&&(u(e),u(f)),de(s,i)}}}function Rt(r){let e,f=r[0].name+"",s,l,i,t=ot(r[0].desc)+"",n,m,b,H,A,D,R,M,y,B=r[0].cd&&mt(r),S=r[0].shoot&&_t(r),C=r[0].range&&ht(r),N=r[0].type&&ct(r),E=r[0].sub_skills&&vt(r);return{c(){e=v("strong"),s=p(f),l=L(),i=v("div"),n=p(t),m=L(),b=v("div"),B&&B.c(),H=L(),S&&S.c(),A=L(),C&&C.c(),D=L(),N&&N.c(),R=L(),E&&E.c(),M=Re(),this.h()},l(h){e=d(h,"STRONG",{});var w=k(e);s=g(w,f),w.forEach(u),l=V(h),i=d(h,"DIV",{class:!0});var J=k(i);n=g(J,t),m=V(J),b=d(J,"DIV",{class:!0});var P=k(b);B&&B.l(P),H=V(P),S&&S.l(P),A=V(P),C&&C.l(P),D=V(P),N&&N.l(P),P.forEach(u),J.forEach(u),R=V(h),E&&E.l(h),M=Re(),this.h()},h(){$(b,"class","skill-meta svelte-wbn6q1"),$(i,"class","pre-line skill-info")},m(h,w){j(h,e,w),o(e,s),j(h,l,w),j(h,i,w),o(i,n),o(i,m),o(i,b),B&&B.m(b,null),o(b,H),S&&S.m(b,null),o(b,A),C&&C.m(b,null),o(b,D),N&&N.m(b,null),j(h,R,w),E&&E.m(h,w),j(h,M,w),y=!0},p(h,[w]){(!y||w&1)&&f!==(f=h[0].name+"")&&O(s,f),(!y||w&1)&&t!==(t=ot(h[0].desc)+"")&&O(n,t),h[0].cd?B?B.p(h,w):(B=mt(h),B.c(),B.m(b,H)):B&&(B.d(1),B=null),h[0].shoot?S?S.p(h,w):(S=_t(h),S.c(),S.m(b,A)):S&&(S.d(1),S=null),h[0].range?C?C.p(h,w):(C=ht(h),C.c(),C.m(b,D)):C&&(C.d(1),C=null),h[0].type?N?N.p(h,w):(N=ct(h),N.c(),N.m(b,null)):N&&(N.d(1),N=null),h[0].sub_skills?E?(E.p(h,w),w&1&&q(E,1)):(E=vt(h),E.c(),q(E,1),E.m(M.parentNode,M)):E&&(Ze(),U(E,1,1,()=>{E=null}),xe())},i(h){y||(q(E),y=!0)},o(h){U(E),y=!1},d(h){h&&(u(e),u(l),u(i),u(R),u(M)),B&&B.d(),S&&S.d(),C&&C.d(),N&&N.d(),E&&E.d(h)}}}function zt(r,e,f){let{skill:s={}}=e;return r.$$set=l=>{"skill"in l&&f(0,s=l.skill)},[s]}class It extends Et{constructor(e){super(),wt(this,e,zt,Rt,kt,{skill:0})}}function pt(r,e,f){const s=r.slice();return s[1]=e[f],s}function gt(r,e,f){const s=r.slice();return s[4]=e[f],s[6]=f,s}function $t(r){let e,f,s=r[4]+"",l,i,t,n,m=Tt[r[6]].prop+"",b,H;return{c(){e=v("tr"),f=v("td"),l=p(s),i=p("%"),t=L(),n=v("td"),b=p(m),H=L(),this.h()},l(A){e=d(A,"TR",{});var D=k(e);f=d(D,"TD",{class:!0});var R=k(f);l=g(R,s),i=g(R,"%"),R.forEach(u),t=V(D),n=d(D,"TD",{});var M=k(n);b=g(M,m),M.forEach(u),H=V(D),D.forEach(u),this.h()},h(){$(f,"class","text-right")},m(A,D){j(A,e,D),o(e,f),o(f,l),o(f,i),o(e,t),o(e,n),o(n,b),o(e,H)},p(A,D){D&1&&s!==(s=A[4]+"")&&O(l,s)},d(A){A&&u(e)}}}function bt(r){let e,f,s,l;return f=new It({props:{skill:r[1]}}),{c(){e=v("li"),he(f.$$.fragment),s=L(),this.h()},l(i){e=d(i,"LI",{class:!0});var t=k(e);ce(f.$$.fragment,t),s=V(t),t.forEach(u),this.h()},h(){$(e,"class","mb-2")},m(i,t){j(i,e,t),ve(f,e,null),o(e,s),l=!0},p(i,t){const n={};t&1&&(n.skill=i[1]),f.$set(n)},i(i){l||(q(f.$$.fragment,i),l=!0)},o(i){U(f.$$.fragment,i),l=!1},d(i){i&&u(e),de(f)}}}function At(r){var lt;let e,f,s,l,i,t,n=r[0].summon.name+"",m,b,H,A,D,R,M,y,B,S=r[0].summon.prop+"",C,N,E,h,w=r[0].summon.career+"",J,P,ze,re,Ae,ge=r[0].summon.speed+"",Ie,Oe,oe,qe,$e=r[0].summon.range+"",De,Fe,fe,Ge,x,be=r[0].summon.owner[0]+"",Le,Ve,He,ee,Me,ue,Se,Q,Ce,F,W,et="天賦",Pe,X,ke,Ee=r[0].summon.inherent_name+"",Te,Ue,me,we=r[0].summon.inherent+"",Be,Je,Y,tt="技能",Ke,Ne,te,G;e=new Bt({props:{parent_path:"/summon",title:"召喚物："+((lt=r[0].summon)==null?void 0:lt.name)}}),R=new Ct({props:{role:r[0].summon}});let _e=pe(r[0].summon.stats),z=[];for(let a=0;a<_e.length;a+=1)z[a]=$t(gt(r,_e,a));Q=new Nt({props:{prev:r[0].summon.siblings.prev,next:r[0].summon.siblings.next,cate:"summon"}});let le=pe(r[0].summon.skills),I=[];for(let a=0;a<le.length;a+=1)I[a]=bt(pt(r,le,a));const Dt=a=>U(I[a],1,1,()=>{I[a]=null});return te=new jt({props:{time:!0,refs:Vt([1,1,1])}}),{c(){he(e.$$.fragment),f=L(),s=v("div"),l=v("ul"),i=v("li"),t=v("a"),m=p(n),b=p(" (bwiki)"),A=L(),D=v("div"),he(R.$$.fragment),M=L(),y=v("div"),B=p("[ "),C=p(S),N=p(` ]
					`),E=v("br"),h=p(`
					[`),J=p(w),P=p("]"),ze=L(),re=v("li"),Ae=p(`移動：
			`),Ie=p(ge),Oe=L(),oe=v("li"),qe=p(`射程：
			`),De=p($e),Fe=L(),fe=v("li"),Ge=p(`從屬：
			`),x=v("a"),Le=p(be),He=L(),ee=v("div"),Me=p(`繼承屬性：
		`),ue=v("table");for(let a=0;a<z.length;a+=1)z[a].c();Se=L(),he(Q.$$.fragment),Ce=L(),F=v("ul"),W=v("li"),W.textContent=et,Pe=L(),X=v("li"),ke=v("strong"),Te=p(Ee),Ue=L(),me=v("div"),Be=p(we),Je=L(),Y=v("li"),Y.textContent=tt,Ke=L();for(let a=0;a<I.length;a+=1)I[a].c();Ne=L(),he(te.$$.fragment),this.h()},l(a){ce(e.$$.fragment,a),f=V(a),s=d(a,"DIV",{class:!0});var _=k(s);l=d(_,"UL",{style:!0,class:!0});var T=k(l);i=d(T,"LI",{});var se=k(i);t=d(se,"A",{href:!0,rel:!0,target:!0});var ne=k(t);m=g(ne,n),b=g(ne," (bwiki)"),ne.forEach(u),A=V(se),D=d(se,"DIV",{class:!0});var ae=k(D);ce(R.$$.fragment,ae),M=V(ae),y=d(ae,"DIV",{});var c=k(y);B=g(c,"[ "),C=g(c,S),N=g(c,` ]
					`),E=d(c,"BR",{}),h=g(c,`
					[`),J=g(c,w),P=g(c,"]"),c.forEach(u),ae.forEach(u),se.forEach(u),ze=V(T),re=d(T,"LI",{});var K=k(re);Ae=g(K,`移動：
			`),Ie=g(K,ge),K.forEach(u),Oe=V(T),oe=d(T,"LI",{});var Qe=k(oe);qe=g(Qe,`射程：
			`),De=g(Qe,$e),Qe.forEach(u),Fe=V(T),fe=d(T,"LI",{});var We=k(fe);Ge=g(We,`從屬：
			`),x=d(We,"A",{href:!0});var st=k(x);Le=g(st,be),st.forEach(u),We.forEach(u),T.forEach(u),He=V(_),ee=d(_,"DIV",{style:!0});var Xe=k(ee);Me=g(Xe,`繼承屬性：
		`),ue=d(Xe,"TABLE",{});var nt=k(ue);for(let ie=0;ie<z.length;ie+=1)z[ie].l(nt);nt.forEach(u),Xe.forEach(u),_.forEach(u),Se=V(a),ce(Q.$$.fragment,a),Ce=V(a),F=d(a,"UL",{class:!0});var Z=k(F);W=d(Z,"LI",{class:!0,style:!0,"data-svelte-h":!0}),rt(W)!=="svelte-w37zu8"&&(W.textContent=et),Pe=V(Z),X=d(Z,"LI",{class:!0});var je=k(X);ke=d(je,"STRONG",{});var at=k(ke);Te=g(at,Ee),at.forEach(u),Ue=V(je),me=d(je,"DIV",{class:!0});var it=k(me);Be=g(it,we),it.forEach(u),je.forEach(u),Je=V(Z),Y=d(Z,"LI",{class:!0,style:!0,"data-svelte-h":!0}),rt(Y)!=="svelte-21fr84"&&(Y.textContent=tt),Ke=V(Z);for(let ie=0;ie<I.length;ie+=1)I[ie].l(Z);Z.forEach(u),Ne=V(a),ce(te.$$.fragment,a),this.h()},h(){$(t,"href",H="https://wiki.biligame.com/tdj/"+r[0].summon.key),$(t,"rel","noopener"),$(t,"target","_biliwiki"),$(D,"class","flex text-center ai-c"),$(x,"href",Ve=ft(`/role/${r[0].summon.owner[0]}`)),ye(l,"margin","0"),$(l,"class","svelte-fv0sby"),ye(ee,"font-size","smaller"),$(s,"class","flex jc-sb"),$(W,"class","hr"),ye(W,"--ratio","0.125"),$(me,"class","pre-line"),$(X,"class","mb-2"),$(Y,"class","hr"),ye(Y,"--ratio","0.125"),$(F,"class","svelte-fv0sby")},m(a,_){ve(e,a,_),j(a,f,_),j(a,s,_),o(s,l),o(l,i),o(i,t),o(t,m),o(t,b),o(i,A),o(i,D),ve(R,D,null),o(D,M),o(D,y),o(y,B),o(y,C),o(y,N),o(y,E),o(y,h),o(y,J),o(y,P),o(l,ze),o(l,re),o(re,Ae),o(re,Ie),o(l,Oe),o(l,oe),o(oe,qe),o(oe,De),o(l,Fe),o(l,fe),o(fe,Ge),o(fe,x),o(x,Le),o(s,He),o(s,ee),o(ee,Me),o(ee,ue);for(let T=0;T<z.length;T+=1)z[T]&&z[T].m(ue,null);j(a,Se,_),ve(Q,a,_),j(a,Ce,_),j(a,F,_),o(F,W),o(F,Pe),o(F,X),o(X,ke),o(ke,Te),o(X,Ue),o(X,me),o(me,Be),o(F,Je),o(F,Y),o(F,Ke);for(let T=0;T<I.length;T+=1)I[T]&&I[T].m(F,null);j(a,Ne,_),ve(te,a,_),G=!0},p(a,[_]){var ae;const T={};_&1&&(T.title="召喚物："+((ae=a[0].summon)==null?void 0:ae.name)),e.$set(T),(!G||_&1)&&n!==(n=a[0].summon.name+"")&&O(m,n),(!G||_&1&&H!==(H="https://wiki.biligame.com/tdj/"+a[0].summon.key))&&$(t,"href",H);const se={};if(_&1&&(se.role=a[0].summon),R.$set(se),(!G||_&1)&&S!==(S=a[0].summon.prop+"")&&O(C,S),(!G||_&1)&&w!==(w=a[0].summon.career+"")&&O(J,w),(!G||_&1)&&ge!==(ge=a[0].summon.speed+"")&&O(Ie,ge),(!G||_&1)&&$e!==($e=a[0].summon.range+"")&&O(De,$e),(!G||_&1)&&be!==(be=a[0].summon.owner[0]+"")&&O(Le,be),(!G||_&1&&Ve!==(Ve=ft(`/role/${a[0].summon.owner[0]}`)))&&$(x,"href",Ve),_&1){_e=pe(a[0].summon.stats);let c;for(c=0;c<_e.length;c+=1){const K=gt(a,_e,c);z[c]?z[c].p(K,_):(z[c]=$t(K),z[c].c(),z[c].m(ue,null))}for(;c<z.length;c+=1)z[c].d(1);z.length=_e.length}const ne={};if(_&1&&(ne.prev=a[0].summon.siblings.prev),_&1&&(ne.next=a[0].summon.siblings.next),Q.$set(ne),(!G||_&1)&&Ee!==(Ee=a[0].summon.inherent_name+"")&&O(Te,Ee),(!G||_&1)&&we!==(we=a[0].summon.inherent+"")&&O(Be,we),_&1){le=pe(a[0].summon.skills);let c;for(c=0;c<le.length;c+=1){const K=pt(a,le,c);I[c]?(I[c].p(K,_),q(I[c],1)):(I[c]=bt(K),I[c].c(),q(I[c],1),I[c].m(F,null))}for(Ze(),c=le.length;c<I.length;c+=1)Dt(c);xe()}},i(a){if(!G){q(e.$$.fragment,a),q(R.$$.fragment,a),q(Q.$$.fragment,a);for(let _=0;_<le.length;_+=1)q(I[_]);q(te.$$.fragment,a),G=!0}},o(a){U(e.$$.fragment,a),U(R.$$.fragment,a),U(Q.$$.fragment,a),I=I.filter(Boolean);for(let _=0;_<I.length;_+=1)U(I[_]);U(te.$$.fragment,a),G=!1},d(a){a&&(u(f),u(s),u(Se),u(Ce),u(F),u(Ne)),de(e,a),de(R),Ye(z,a),de(Q,a),Ye(I,a),de(te,a)}}}function Ot(r,e,f){let{data:s}=e;return r.$$set=l=>{"data"in l&&f(0,s=l.data)},[s]}class Wt extends Et{constructor(e){super(),wt(this,e,Ot,At,kt,{data:0})}}export{Wt as component,Qt as universal};
