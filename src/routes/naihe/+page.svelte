<script>
import Header from '$lib/Header.svelte';
import Footer from '$lib/Footer.svelte';
import Table from './Table.svelte';
import { afterNavigate } from '$app/navigation';

let gsheet_url =
	'https://docs.google.com/spreadsheets/d/e/2PACX-1vThfydM3yjBOBsKXVmXDZo6Mr6iHiQO0di-C_J5Ct6bQ1weTorkbV8TOZ7wz0KmAPEk2qMj6zCqHz_J/pubhtml#';

let iframe;
function openIframe() {
	if (iframe) {
		iframe.src = gsheet_url;
	}
}

let tabs;
let init_tab;

function get_latest_monday() {
	const MS_OF_WEEK = 1000 * 60 * 60 * 24 * 7;

	let today = new Date();
	let d0 = new Date(2022, 0, 24);
	let d1 = new Date(today - ((today - d0) % MS_OF_WEEK));

	return d1.toLocaleString('sv').slice(5, 10).replace('-', '');
	// return `${d1.getMonth() + 1}`.padStart(2, '0') + `${d1.getDate()}`.padStart(2, '0');
}

function init() {
	let d1 = get_latest_monday();
	let date = new URLSearchParams(location.search)?.get('date') || d1;
	let days = [...new Set([d1, date])];

	tabs = days.map((d) => {
		let title = /^\d{4}$/.test(d) ? `t-${d}` : d;
		if (date === d) {
			init_tab = title;
		}
		return title;
	});
}

afterNavigate(init);
</script>

<Header title="三途川選擇" />

<div class="workspace">
	{#if tabs}
		<Table {tabs} {init_tab} />
	{/if}

	<Footer>
		<div class="footer-content">
			<details on:toggle={openIframe}>
				<summary>
					原始資料：
					<a rel="noopener" target="_blank" href={gsheet_url}>天地劫M 三途川 @ Google SpreadSheet</a
					>
				</summary>
				<iframe title="gsheet" id="iframe" width="580" bind:this={iframe} frameborder="0"></iframe>
			</details>

			----- ----- -----
			<br />

			試算表依賴志士協作，歡迎
			<a href="https://mailbox.gamer.com.tw/send.php?to=Rplus">巴哈私訊</a>
			聯繫以開放協作權限 ：P

			<p>
				可於網址指定顯示日期，例：
				<a href="?date=0711" data-sveltekit-replacestate>/tdj-helper/naihe?date=0711</a>
			</p>
		</div>
	</Footer>
</div>

<style>
.footer-content {
	width: 560px;
	max-width: 90vw;
	margin: 0 auto;
}
#iframe {
	/* width: 40em; */
	max-width: 90vw;
	height: 30em;
}
@media print {
	:global(body) {
		columns: 2;
	}
	:global(h1, footer) {
		display: none;
	}
}
@page {
	/* size: A4 landscape; */
	margin: 0;
	padding: 0;
}
</style>
