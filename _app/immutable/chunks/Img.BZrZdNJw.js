import{s as I,C as u,e as w,b as S,D as _,i as q,E as z,F as C,n as m,f as G,G as d,H as b,I as P}from"./scheduler.B4IQQT9J.js";import{S as D,i as E}from"./index.B_Q0Z5DJ.js";function F(i,e){const n={},h={},o={$$scope:1};let c=i.length;for(;c--;){const r=i[c],l=e[c];if(l){for(const t in r)t in l||(h[t]=1);for(const t in l)o[t]||(n[t]=l[t],o[t]=1);i[c]=l}else for(const t in r)o[t]=1}for(const r in h)r in n||(n[r]=void 0);return n}function H(i){let e,n,h,o,c,r=[{loading:"lazy"},{decording:"async"},{src:n=i[0]},{width:i[2]},{height:i[3]},{alt:i[1]},{title:h=i[6].title||i[1]},i[7]],l={};for(let t=0;t<r.length;t+=1)l=u(l,r[t]);return{c(){e=w("img"),this.h()},l(t){e=S(t,"IMG",{loading:!0,decording:!0,src:!0,width:!0,height:!0,alt:!0,title:!0}),this.h()},h(){_(e,l)},m(t,a){q(t,e,a),i[8](e),o||(c=z(e,"error",i[5]),o=!0)},p(t,[a]){_(e,l=F(r,[{loading:"lazy"},{decording:"async"},a&1&&!C(e.src,n=t[0])&&{src:n},a&4&&{width:t[2]},a&8&&{height:t[3]},a&2&&{alt:t[1]},a&66&&h!==(h=t[6].title||t[1])&&{title:h},a&128&&t[7]]))},i:m,o:m,d(t){t&&G(e),i[8](null),o=!1,c()}}}function L(i,e,n){const h=["src","alt","width","height"];let o=d(e,h),{src:c=""}=e,{alt:r=""}=e,{width:l="64"}=e,{height:t="64"}=e,a,g=0;function k(){var f;let s=(f=new URLSearchParams(this.src))==null?void 0:f.get("url");this.src&&s&&!g&&(g+=1,this.src=s)}function y(s){P[s?"unshift":"push"](()=>{a=s,n(4,a)})}return i.$$set=s=>{n(6,e=u(u({},e),b(s))),n(7,o=d(e,h)),"src"in s&&n(0,c=s.src),"alt"in s&&n(1,r=s.alt),"width"in s&&n(2,l=s.width),"height"in s&&n(3,t=s.height)},e=b(e),[c,r,l,t,a,k,e,o,y]}class U extends D{constructor(e){super(),E(this,e,L,H,I,{src:0,alt:1,width:2,height:3})}}export{U as I};