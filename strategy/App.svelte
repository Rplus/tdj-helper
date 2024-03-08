<script>
	import data from '/data/strategy.min.json';
	import Item from './Item.svelte';
	import Filter from '/_share/Filter-comp.svelte';
	import '../_share/Theme.js';

	data.forEach(i => {
		i.desc_html = i.desc.replace(
			/.+所有我方上陣角色物攻，物防，法攻，法防提高(\d+%)[。，](.+)?$/gm,
			`攻防+$1\n$2`
		);
	});

	let filter_cates = [
		{
			prop: 'career',
			title: '職業',
			values: ['俠客', '鐵衛', '祝由', '御風', '羽士', '咒師', '鬥將', ],
		}, {
			prop: 'prop',
			title: '屬相',
			values: ['炎', '雷', '冰', '光', '暗', '幽'],
		},
	];
	let gen_filter_selector = (prop, value) => `[data-${prop}*="${value}"]`;


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

	<h1>
    <a href="../" title="back">../</a>
		<ruby>
			戰陣圖鑑
			<rt>天地劫M</rt>
		</ruby>
	</h1>

	<hr>

	<Filter
		filter_cates={filter_cates}
		item_class=".row"
		gen_selector={gen_filter_selector}
		placeholder="過濾說明"
		search_cb={search_cb}
	/>

	<hr>

	{#each data as strategy (strategy.name)}
		<div class="row flex"
			data-career={strategy.members.map(i => i.name)}
			data-search={strategy.desc_html}
			id={strategy.name}
		>
			<div class="members flex">
				<Item member={strategy} />

				{#each strategy.members as member}
					<Item member={member} />
				{/each}
			</div>

			<div class="info">{@html gen_desc(strategy.desc_html, search_kwd)}</div>
		</div>

	{/each}

	<hr>

	<footer class="footer">
		<ul>
			資料來源：
			<li>
				Official (zh-tw)<br>
				<a href="https://www.game-beans.com/userinfo/tdj/index.html" target="_officail_tw">
					https://www.game-beans.com/userinfo/tdj/index.html
				</a>
			</li>
			<li>
				Official (zh-cn)<br>
				<a href="https://www.zlongame.com/userinfo/tdj/index.html" target="_biliwiki">https://www.zlongame.com/userinfo/tdj/index.html</a>
			</li>
		</ul>
	</footer>

</div>



<style>
.workspace {
	padding: .5em;
	justify-content: center;
	min-height: 100vh;
	margin: 0 auto;
	max-width: 50em;
	align-content: stretch;
}

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
	gap: .5em;
	align-items: flex-start;
	margin-bottom: .5em;
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
		padding-left: .5em;
		margin-left: 1.5em;
		border-left: .25em solid #9993;
	}
}

hr {
	margin: 2em 0;
}

h1 {
	text-align: center;
}
</style>
