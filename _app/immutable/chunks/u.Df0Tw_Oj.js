import{b as i}from"./paths.5I3I9t50.js";function g(t=""){return`${i}${t}`}function o(t="",e=128){return t?`https://wsrv.nl/?&w=${e}&h=${e}&we&il&output=webp&url=${t}`:""}const c={cn:"https://media.zlongame.com/media/news/cn/tdj/info/data",tw:"https://tw-media.game-beans.com/media/pictures/tdj/info/data"};function f(t=""){return t.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,"").replace(/。+(.)/g,`。
$1`)}function l(t,e,n,r="cn"){let a=`${c[r]}/${t}/${e}.png`;return o(a,n)}function p(t="",e="",n=[128],r="cn"){return n.map(a=>l(t,e,a,r))}const s="TDJ-HELPER";function $(t){if(!t||!t.key)return!1;let e=u()||{};e[t.key]=t.value,localStorage.setItem(s,JSON.stringify(e))}function u(t){let e=localStorage.getItem(s);return e?(e=JSON.parse(e),t?e[t]:e):null}export{u as a,p as b,f as c,l as g,g as l,o as r,$ as s};
