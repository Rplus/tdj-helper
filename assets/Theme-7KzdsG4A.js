function u(e,t=128){return e?`https://wsrv.nl/?&w=${t}&h=${t}&we&il&output=webp&url=${e}`:""}const c="TDJ-HELPER";function i(e){if(!e||!e.key)return!1;let t=l()||{};t[e.key]=e.value,localStorage.setItem(c,JSON.stringify(t))}function l(e){let t=localStorage.getItem(c);return t?(t=JSON.parse(t),e?t[e]:t):null}const d=window.matchMedia("(prefers-color-scheme: dark)");d.addEventListener("change",m);let a=l("dark-theme"),n=a!==void 0?a:d.matches;r(n);let o=document.createElement("button");o.textContent="🌙";o.style=`
	position: absolute;
	top: .5em;
	right: .5em;
	background-color: #0000;
	border: none;`;o.onclick=s;document.body.append(o);function r(e=!1){document.body.classList.toggle("dark-theme",e),i({key:"dark-theme",value:+e})}function m(e){n=e.matches,r(e.matches)}function s(){n=!n,r(n)}export{u as r};
