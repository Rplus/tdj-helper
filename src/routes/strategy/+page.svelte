<script>
import { strategy_data } from './strategy.js';
import { get_refs } from '$lib/fetch-data.js';

import Filter from '$lib//Filter.svelte';
import Header from '$lib/Header.svelte';
import Footer from '$lib/Footer.svelte';

import Item from './Item.svelte';

let filter_cates = [
	{
		prop: 'prop',
		title: '職業',
		multi: true,
		values: ['俠客', '鐵衛', '祝由', '御風', '羽士', '咒師', '鬥將'],
	},
	{
		prop: 'prop',
		title: '屬相',
		multi: true,
		values: ['炎', '雷', '冰', '光', '暗', '幽'],
	},
];

$: search_kwd = '';
function search_cb(kwd) {
	search_kwd = kwd;
}

function gen_desc(str = '') {
	if (search_kwd.length) {
		let reg = new RegExp(`(${search_kwd})`, 'g');
		return str.replace(reg, `<mark>$1</mark>`);
	}
	return str;
}
</script>

<div class="workspace">
	<Header title="戰陣圖鑑" />

	<Filter {filter_cates} item_class=".row" placeholder="過濾說明" {search_cb} />

	<hr />

	{#each strategy_data as strategy (strategy.name)}
		<div
			class="row flex"
			data-prop={strategy.members.map((i) => !i.img && i.name).filter(Boolean)}
			data-search={strategy.desc_html}
			id={strategy.name}
		>
			<div class="members flex">
				<Item member={strategy} />

				{#each strategy.members as member}
					<Item {member} />
				{/each}
			</div>

			<div class="info">{@html gen_desc(strategy.desc_html, search_kwd)}</div>
		</div>
	{/each}

	<Footer time={true} refs={get_refs([1, 1, 0])} />
</div>

<style>
.row {
	margin-bottom: 1.5em;

	@media (max-width: 700px) {
		flex-wrap: wrap;
	}

	& > div:first-child {
		margin-right: 1em;
	}
}

.members {
	gap: 0.5em;
	align-items: flex-start;
	margin-bottom: 0.5em;
	text-align: center;
}

.info {
	max-width: 22em;
	margin-bottom: 1em;
	align-self: flex-start;
	white-space: pre-wrap;

	&::first-line {
		color: #999c;
	}

	@media (max-width: 700px) {
		max-width: unset;
		padding-left: 0.5em;
		margin-left: 1.5em;
		border-left: 0.25em solid #9993;
	}
}

hr {
	margin: 2em 0;
}
</style>
