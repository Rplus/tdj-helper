import{b as i}from"./paths.CkWn-LbD.js";function c(t=""){return`${i}${t}`}function o(t="",e=128){return t?`https://wsrv.nl/?&w=${e}&h=${e}&we&il&output=webp&url=${t}`:""}const l={cn:"https://media.zlongame.com/media/news/cn/tdj/info/data",tw:"https://tw-media.game-beans.com/media/pictures/tdj/info/data"};function f(t,e,r,a="cn"){let s=`${l[a]}/${t}/${e}.png`;return o(s,r)}const n="TDJ-HELPER";function g(t){if(!t||!t.key)return!1;let e=m()||{};e[t.key]=t.value,localStorage.setItem(n,JSON.stringify(e))}function m(t){let e=localStorage.getItem(n);return e?(e=JSON.parse(e),t?e[t]:e):null}export{m as a,f as g,c as l,o as r,g as s};
