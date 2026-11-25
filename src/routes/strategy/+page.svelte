<script>
import { strategy_data } from './strategy.js';
import { get_refs } from '$lib/fetch-data.js';

import Filter from '$lib//Filter.svelte';
import Header from '$lib/Header.svelte';
import Footer from '$lib/Footer.svelte';

// import Item from './Item.svelte';
import Lineup from './Lineup.svelte';

import { get_icon_image } from '$lib/u.js';

const careers = ['俠客', '鐵衛', '祝由', '御風', '羽士', '咒師', '鬥將', '破軍'];

let filter_cates = [
	{
		// prop: 'career',
		prop: 'prop',
		title: '職業',
		multi: true,
		values: careers,
		icons: careers.map((i) => get_icon_image(i)),
	},
	{
		prop: 'prop',
		title: '屬相',
		multi: true,
		values: ['炎', '雷', '冰', '光', '暗', '幽', '神', '魔'],
	},
];

$: search_kwd = '';
function search_cb(kwd) {
	search_kwd = kwd;
}

// function gen_desc(str = '') {
// 	let [, basic, detail] = str.split(/^(攻防.+)\n/gm);
// 	let op = {
// 		basic,
// 		detail,
// 	};

// 	if (search_kwd.length) {
// 		let reg = new RegExp(`(${search_kwd})`, 'g');
// 		op.detail = op.detail.replace(reg, `<mark>$1</mark>`);
// 	}

// 	return op;
// }
</script>

<div class="workspace">
	<Header title="戰陣圖鑑" />

	<Filter {filter_cates} item_class=".row" placeholder="過濾說明" {search_cb} />

	<hr class="mb-2" style="opacity: .3" />

	{#each strategy_data as strategy (strategy.name)}
		<Lineup {strategy} {search_kwd} />
	{/each}

	<Footer time={true} refs={get_refs([1, 1, 0])} />
</div>
