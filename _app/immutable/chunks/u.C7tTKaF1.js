import{b as o}from"./paths.0841Czdf.js";function f(e=""){return`${o}${e}`}const i={冰:"Ice",炎:"Fire",雷:"Electricity",光:"Light",暗:"Shadow",幽:"Dusk",俠客:"Swordsman",鐵衛:"Guard",祝由:"Physician",咒師:"Warlock",羽士:"Rogue",御風:"Assassin",鬥將:"Melee"},u={cn:"https://media.zlongame.com/media/news/cn/tdj/info/data",tw:"https://tw-media.game-beans.com/media/pictures/tdj/info/data"};function s(e="",t=128){return e?`https://wsrv.nl/?&w=${t}&h=${t}&we&il&output=webp&default=1&url=${e}`:""}function l(e,t,n,r="cn"){let a=`${u[r]}/${e}/${t}.png`;return s(a,n)}function d(e="",t="",n=[128],r="cn"){return n.map(a=>l(e,t,a,r))}function p(e="",t=32){return i[e]?s(`https://media.zlongame.com/media/pictures/cn/userinfo/tdj/img/data/career/${i[e]}.png`,t):""}function $(e=""){return e.replace(/<br\s?\/?>/g,`
`).replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,"").replace(/。(?!）)+(.)/g,`。
$1`)}const c="TDJ-HELPER";function h(e){if(!e||!e.key)return!1;let t=m()||{};t[e.key]=e.value,localStorage.setItem(c,JSON.stringify(t))}function m(e){let t=localStorage.getItem(c);return t?(t=JSON.parse(t),e?t[e]:t):null}export{m as a,d as b,$ as c,l as d,p as g,f as l,s as r,h as s};
