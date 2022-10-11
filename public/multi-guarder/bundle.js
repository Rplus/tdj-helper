var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function l(t){t.forEach(e)}function o(t){return"function"==typeof t}function r(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function i(t,e){t.appendChild(e)}function a(t,e,n){t.insertBefore(e,n||null)}function c(t){t.parentNode.removeChild(t)}function s(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function u(t){return document.createElement(t)}function d(t){return document.createTextNode(t)}function f(){return d(" ")}function p(t,e,n,l){return t.addEventListener(e,n,l),()=>t.removeEventListener(e,n,l)}function h(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function g(t){return""===t?null:+t}function v(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function m(t,e){t.value=null==e?"":e}function x(t,e,n,l){t.style.setProperty(e,n,l?"important":"")}let y,b;function $(){if(void 0===y){y=!1;try{"undefined"!=typeof window&&window.parent&&window.parent.document}catch(t){y=!0}}return y}function w(t){b=t}const _=[],k=[],T=[],E=[],M=Promise.resolve();let A=!1;function C(t){T.push(t)}let z=!1;const L=new Set;function X(){if(!z){z=!0;do{for(let t=0;t<_.length;t+=1){const e=_[t];w(e),W(e.$$)}for(w(null),_.length=0;k.length;)k.pop()();for(let t=0;t<T.length;t+=1){const e=T[t];L.has(e)||(L.add(e),e())}T.length=0}while(_.length);for(;E.length;)E.pop()();A=!1,z=!1,L.clear()}}function W(t){if(null!==t.fragment){t.update(),l(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(C)}}const j=new Set;function B(t,e){-1===t.$$.dirty[0]&&(_.push(t),A||(A=!0,M.then(X)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function H(r,i,a,s,u,d,f,p=[-1]){const h=b;w(r);const g=r.$$={fragment:null,ctx:null,props:d,update:t,not_equal:u,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(i.context||(h?h.$$.context:[])),callbacks:n(),dirty:p,skip_bound:!1,root:i.target||h.$$.root};f&&f(g.root);let v=!1;if(g.ctx=a?a(r,i.props||{},((t,e,...n)=>{const l=n.length?n[0]:e;return g.ctx&&u(g.ctx[t],g.ctx[t]=l)&&(!g.skip_bound&&g.bound[t]&&g.bound[t](l),v&&B(r,t)),e})):[],g.update(),v=!0,l(g.before_update),g.fragment=!!s&&s(g.ctx),i.target){if(i.hydrate){const t=function(t){return Array.from(t.childNodes)}(i.target);g.fragment&&g.fragment.l(t),t.forEach(c)}else g.fragment&&g.fragment.c();i.intro&&((m=r.$$.fragment)&&m.i&&(j.delete(m),m.i(x))),function(t,n,r,i){const{fragment:a,on_mount:c,on_destroy:s,after_update:u}=t.$$;a&&a.m(n,r),i||C((()=>{const n=c.map(e).filter(o);s?s.push(...n):l(n),t.$$.on_mount=[]})),u.forEach(C)}(r,i.target,i.anchor,i.customElement),X()}var m,x;w(h)}function N(t,e,n){const l=t.slice();return l[18]=e[n],l[19]=e,l[20]=n,l}function O(t,e,n){const l=t.slice();return l[21]=e[n],l}function S(t,e,n){const l=t.slice();return l[24]=e[n],l}function P(t){let e,n;return{c(){e=u("div"),h(e,"class","dot--attacker svelte-19v1at2"),h(e,"data-title",n=t[24].title),h(e,"tabindex","0"),x(e,"--x",t[24].x),x(e,"--y",t[24].y),x(e,"--bgc",t[24].color)},m(t,n){a(t,e,n)},p(t,l){16&l&&n!==(n=t[24].title)&&h(e,"data-title",n),16&l&&x(e,"--x",t[24].x),16&l&&x(e,"--y",t[24].y),16&l&&x(e,"--bgc",t[24].color)},d(t){t&&c(e)}}}function V(t){let e,n,l;return{c(){e=u("div"),h(e,"class","dot svelte-19v1at2"),h(e,"data-range",n=t[21].range),h(e,"data-title",l=t[21].title),x(e,"--x",t[21].x),x(e,"--y",t[21].y),x(e,"--bgc",t[21].color)},m(t,n){a(t,e,n)},p(t,o){4&o&&n!==(n=t[21].range)&&h(e,"data-range",n),4&o&&l!==(l=t[21].title)&&h(e,"data-title",l),4&o&&x(e,"--x",t[21].x),4&o&&x(e,"--y",t[21].y),4&o&&x(e,"--bgc",t[21].color)},d(t){t&&c(e)}}}function q(t){let e,n,o,r,s,x,y,b,$,w,_,k,T,E,M,A,C,z,L,X,W,j,B,H,N,O,S,P,V=t[18].title+"";function q(){t[6].call(b,t[19],t[20])}function I(){t[7].call(E,t[19],t[20])}function D(){t[8].call(X,t[19],t[20])}function F(){t[9].call(N,t[19],t[20])}return{c(){e=u("dt"),n=d(V),o=d(" - "),r=u("small"),r.textContent="護衛",s=u("dd"),x=u("label"),y=d("x:\n\t\t\t\t\t\t"),b=u("input"),w=f(),_=u("dd"),k=u("label"),T=d("y:\n\t\t\t\t\t\t"),E=u("input"),A=f(),C=u("dd"),z=u("label"),L=d("護衛範圍:\n\t\t\t\t\t\t"),X=u("input"),W=f(),j=u("dd"),B=u("label"),H=d("顏色:\n\t\t\t\t\t\t"),N=u("input"),O=f(),h(e,"class","svelte-19v1at2"),h(b,"type","number"),h(b,"max",$=t[0]-1),h(b,"min","0"),h(s,"class","svelte-19v1at2"),h(E,"type","number"),h(E,"max",M=t[0]-1),h(E,"min","0"),h(_,"class","svelte-19v1at2"),h(X,"type","number"),h(X,"max","3"),h(X,"min","0"),h(C,"class","svelte-19v1at2"),h(N,"type","color"),h(j,"class","svelte-19v1at2")},m(l,c){a(l,e,c),i(e,n),i(e,o),i(e,r),a(l,s,c),i(s,x),i(x,y),i(x,b),m(b,t[18].x),i(s,w),a(l,_,c),i(_,k),i(k,T),i(k,E),m(E,t[18].y),i(_,A),a(l,C,c),i(C,z),i(z,L),i(z,X),m(X,t[18].range),i(C,W),a(l,j,c),i(j,B),i(B,H),i(B,N),m(N,t[18].color),i(j,O),S||(P=[p(b,"input",q),p(E,"input",I),p(X,"input",D),p(N,"input",F)],S=!0)},p(e,l){t=e,4&l&&V!==(V=t[18].title+"")&&v(n,V),1&l&&$!==($=t[0]-1)&&h(b,"max",$),4&l&&g(b.value)!==t[18].x&&m(b,t[18].x),1&l&&M!==(M=t[0]-1)&&h(E,"max",M),4&l&&g(E.value)!==t[18].y&&m(E,t[18].y),4&l&&g(X.value)!==t[18].range&&m(X,t[18].range),4&l&&m(N,t[18].color)},d(t){t&&c(e),t&&c(s),t&&c(_),t&&c(C),t&&c(j),S=!1,l(P)}}}function I(e){let n,o,r,y,b,w,_,k,T,E,M,A,z,L,X,W,j,B,H,I,D,F,G,J,K,Q,R,U,Y,Z,tt,et,nt,lt,ot,rt,it,at,ct,st,ut,dt,ft,pt=e[1].title+"",ht=e[4],gt=[];for(let t=0;t<ht.length;t+=1)gt[t]=P(S(e,ht,t));let vt=e[2],mt=[];for(let t=0;t<vt.length;t+=1)mt[t]=V(O(e,vt,t));let xt=e[2],yt=[];for(let t=0;t<xt.length;t+=1)yt[t]=q(N(e,xt,t));return{c(){n=u("div"),o=u("h1"),o.innerHTML='<a href="../">../</a>\n\t天地劫M 多重護衛優先級判定模擬',r=f(),y=u("div"),b=u("div"),w=u("div"),k=f();for(let t=0;t<gt.length;t+=1)gt[t].c();T=f();for(let t=0;t<mt.length;t+=1)mt[t].c();M=f(),A=u("div"),A.innerHTML='圖中方格為攻擊者可站的位置<br/>\n底色對應護衛單位\n<br/> \n<br/> \n<details open=""><summary>== 護衛優先級 說明 ==</summary> \n<pre><u>規則一：判定各護衛與「被攻擊者」距離</u>\n離「被攻擊者」最近者，最優先護衛\n\n<u>規則二：判定各護衛與「攻擊者」距離</u>\n若有複數最近的護衛群，改判定各護衛與「攻擊者」距離\n※ 坦X：上場順序最先者\n\n<u>狀況-1</u>：坦X 距離攻擊者最近\n  則依正序護衛\n  (=&gt; 坦X護衛)\n\n<u>狀況-2</u>：坦X 距離攻擊者不是最近\n  比坦X更近的那堆中，依倒序護衛\n  (愈後上場者、護衛優先級愈高)</pre></details>',z=f(),L=u("hr"),X=f(),W=u("form"),j=u("fieldset"),B=u("legend"),B.textContent="自訂區塊",H=f(),I=u("dl");for(let t=0;t<yt.length;t+=1)yt[t].c();D=u("dt"),F=d(pt),G=d(" - "),J=u("small"),J.textContent="被攻擊目標",K=u("dd"),Q=u("label"),R=d("x:\n\t\t\t\t\t"),U=u("input"),Z=f(),tt=u("dd"),et=u("label"),nt=d("y:\n\t\t\t\t\t"),lt=u("input"),rt=f(),it=u("dt"),it.textContent="格子數:\n\t\t\t",at=u("dd"),ct=u("input"),st=f(),ut=u("footer"),ut.innerHTML='<hr class="svelte-19v1at2"/>\n\t\t資料參考：\n\t\t<a href="https://www.bilibili.com/video/BV1VB4y1y7fh/" target="_blank" rel="noreferrer noopener">「天地劫」多T护卫机制 详解 @ bilibili by u/墨_源</a>',h(o,"class","svelte-19v1at2"),h(w,"class","dot attackee svelte-19v1at2"),h(w,"data-title",_=e[1].title),x(w,"--x",e[1].x),x(w,"--y",e[1].y),h(b,"class","map svelte-19v1at2"),x(b,"font-size",e[3]/e[0]+"px"),x(b,"height",e[3]+"px"),C((()=>e[5].call(b))),h(A,"class","intro"),h(L,"class","svelte-19v1at2"),h(y,"class","map-box svelte-19v1at2"),h(B,"class","svelte-19v1at2"),h(D,"class","svelte-19v1at2"),h(U,"type","number"),h(U,"max",Y=e[0]-1),h(U,"min","0"),h(K,"class","svelte-19v1at2"),h(lt,"type","number"),h(lt,"max",ot=e[0]-1),h(lt,"min","0"),h(tt,"class","svelte-19v1at2"),h(it,"class","svelte-19v1at2"),h(ct,"type","number"),h(ct,"min","4"),h(at,"class","svelte-19v1at2"),h(j,"class","svelte-19v1at2"),h(W,"class","svelte-19v1at2"),h(ut,"class","info svelte-19v1at2"),h(n,"class","workspace svelte-19v1at2")},m(t,l){a(t,n,l),i(n,o),i(n,r),i(n,y),i(y,b),i(b,w),i(b,k);for(let t=0;t<gt.length;t+=1)gt[t].m(b,null);i(b,T);for(let t=0;t<mt.length;t+=1)mt[t].m(b,null);E=function(t,e){"static"===getComputedStyle(t).position&&(t.style.position="relative");const n=u("iframe");n.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),n.setAttribute("aria-hidden","true"),n.tabIndex=-1;const l=$();let o;return l?(n.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",o=p(window,"message",(t=>{t.source===n.contentWindow&&e()}))):(n.src="about:blank",n.onload=()=>{o=p(n.contentWindow,"resize",e)}),i(t,n),()=>{(l||o&&n.contentWindow)&&o(),c(n)}}(b,e[5].bind(b)),i(y,M),i(y,A),i(y,z),i(y,L),i(n,X),i(n,W),i(W,j),i(j,B),i(j,H),i(j,I);for(let t=0;t<yt.length;t+=1)yt[t].m(I,null);i(I,D),i(D,F),i(D,G),i(D,J),i(I,K),i(K,Q),i(Q,R),i(Q,U),m(U,e[1].x),i(K,Z),i(I,tt),i(tt,et),i(et,nt),i(et,lt),m(lt,e[1].y),i(tt,rt),i(I,it),i(I,at),i(at,ct),m(ct,e[0]),i(n,st),i(n,ut),dt||(ft=[p(U,"input",e[10]),p(lt,"input",e[11]),p(ct,"input",e[12])],dt=!0)},p(t,[e]){if(2&e&&_!==(_=t[1].title)&&h(w,"data-title",_),2&e&&x(w,"--x",t[1].x),2&e&&x(w,"--y",t[1].y),16&e){let n;for(ht=t[4],n=0;n<ht.length;n+=1){const l=S(t,ht,n);gt[n]?gt[n].p(l,e):(gt[n]=P(l),gt[n].c(),gt[n].m(b,T))}for(;n<gt.length;n+=1)gt[n].d(1);gt.length=ht.length}if(4&e){let n;for(vt=t[2],n=0;n<vt.length;n+=1){const l=O(t,vt,n);mt[n]?mt[n].p(l,e):(mt[n]=V(l),mt[n].c(),mt[n].m(b,null))}for(;n<mt.length;n+=1)mt[n].d(1);mt.length=vt.length}if(9&e&&x(b,"font-size",t[3]/t[0]+"px"),8&e&&x(b,"height",t[3]+"px"),5&e){let n;for(xt=t[2],n=0;n<xt.length;n+=1){const l=N(t,xt,n);yt[n]?yt[n].p(l,e):(yt[n]=q(l),yt[n].c(),yt[n].m(I,D))}for(;n<yt.length;n+=1)yt[n].d(1);yt.length=xt.length}2&e&&pt!==(pt=t[1].title+"")&&v(F,pt),1&e&&Y!==(Y=t[0]-1)&&h(U,"max",Y),2&e&&g(U.value)!==t[1].x&&m(U,t[1].x),1&e&&ot!==(ot=t[0]-1)&&h(lt,"max",ot),2&e&&g(lt.value)!==t[1].y&&m(lt,t[1].y),1&e&&g(ct.value)!==t[0]&&m(ct,t[0])},i:t,o:t,d(t){t&&c(n),s(gt,t),s(mt,t),E(),s(yt,t),dt=!1,l(ft)}}}function D(t,e){return t.index-e.index}function F(t,e,n){let l,o=6,r={index:10,order:10,title:"受",x:2,y:2},i=[{index:1,order:1,title:"坦1",x:2,y:0,range:2,color:"#ff9999"},{index:2,order:2,title:"坦2",x:4,y:2,range:3,color:"#99ff99"},{index:3,order:3,title:"坦3",x:2,y:4,range:2,color:"#9999ff"},{index:4,order:4,title:"坦4",x:0,y:2,range:2,color:"#99ff33"}],a=[],c={title:""};function s(t){let e=[],l=function(){let t=[],e=2*o;return i.forEach((n=>{if(n.range<n.distance2T)return null;e>=n.distance2T&&(e=n.distance2T,t[n.distance2T]||(t[n.distance2T]=[]),t[n.distance2T].push(n))})),t[e].sort(D)}();for(let t=o-1;t>=0;t--)for(let n=o-1;n>=0;n--){let r=u(t,n,l);e[t+n*o]={title:`${r.title}`,x:t,y:n,color:r.color}}n(4,a=e)}function u(t,e,n){if(!n||0===n.length)return c;let l,o=n[0];if(1===n.length)return o;let r=n.filter(((n,o)=>(n.distance2A=Math.abs(n.y-e)+Math.abs(n.x-t),o||(l=n.distance2A),l>n.distance2A)));return r.length?r[r.length-1]:o}return t.$$.update=()=>{7&t.$$.dirty&&(i.forEach((t=>{t.distance2T=Math.abs(t.y-r.y)+Math.abs(t.x-r.x)})),s())},[o,r,i,l,a,function(){l=this.clientWidth,n(3,l)},function(t,e){t[e].x=g(this.value),n(2,i)},function(t,e){t[e].y=g(this.value),n(2,i)},function(t,e){t[e].range=g(this.value),n(2,i)},function(t,e){t[e].color=this.value,n(2,i)},function(){r.x=g(this.value),n(1,r)},function(){r.y=g(this.value),n(1,r)},function(){o=g(this.value),n(0,o)}]}return new class extends class{$destroy(){!function(t,e){const n=t.$$;null!==n.fragment&&(l(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}{constructor(t){super(),H(this,t,F,I,r,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
