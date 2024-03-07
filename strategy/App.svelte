<script>
	import data from '/data/strategy.min.json';
	import Item from './Item.svelte';
	import '../_share/Theme.js';

	let filters = init_filters();
	let search_kwd = '';
	let input_value = '';
	let is_composing = false;

	data.forEach(i => {
		// i.desc_info = i.desc.match(/物攻，物防，法攻，法防提高(\d+%)[。，](.+)?$/);
		i.desc_html = i.desc.replace(
			/.+所有我方上陣角色物攻，物防，法攻，法防提高(\d+%)[。，](.+)?$/gm,
			// '攻防+$1<br><div class="ctx">$2</div>'
			`攻防+$1\n$2`
		);
	});

	$: filter_style  = `<style>${gen_filter_style(filters)}</style>`;
	$: search_style  = `<style>${gen_search_style(search_kwd)}</style>`;

	$: {
		if (!is_composing) {
			search_kwd = input_value;
		}
	}

	function gen_filter_style(_filters) {
		let checked = _filters
			.filter(f => f.checked)
			.map(item => item.key);

		if (!checked.length) {
			return '';
		}
		let selectors = checked.map(i => `:not(.mem-${i})`).join('');
		return `.row${selectors} { display: none; }`;
	}

	function gen_search_style(kwd = '') {
		if (!kwd) {
			return '';
		}

		console.log({kwd});
		return `.row.row:not([data-info*="${kwd.trim()}"]) { display: none; }`;
	}

	function gen_members_class(members) {
		return members.map(m => `mem-${m.name}`).join(' ');
	}

	function init_filters() {
		return [
			'炎', '雷', '冰', '光', '暗', '幽',
			'俠客', '鐵衛', '祝由', '御風', '羽士', '咒師', '鬥將',
		].map(key => ({
			key,
			checked: false,
		}));
	}

	function reset_filter() {
		filters = init_filters();
		input_value = '';
	}

	function compositionstart() {
		is_composing = true;
	}

	function compositionend() {
		is_composing = false;
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

	<div class="style">
		{@html filter_style}
		{@html search_style}
	</div>

	<form class="filters" on:reset|preventDefault={reset_filter} on:submit|preventDefault>
		<div class="hr">
			🔍 + 聯集(⋃)
			<input type="reset" />
		</div>

		{#each filters as filter, index}
			{#if index === 6 }
				<br>
			{/if}
			<label>
				<input type="checkbox" bind:checked={filter.checked}>
				{filter.key}
			</label>
		{/each}
		<div class="search-box">
			<input type="search" bind:value={input_value}
				on:compositionstart={compositionstart}
				on:compositionend={compositionend}
				placeholder="過濾說明" />
		</div>
	</form>
	<hr>

	{#each data as strategy (strategy.name)}
		<div class="row flex {gen_members_class(strategy.members)}"
			data-info={strategy.desc_html}
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
				Official (zh-cn)<br>
				<a href="https://www.zlongame.com/userinfo/tdj/index.html" target="_biliwiki">https://www.zlongame.com/userinfo/tdj/index.html</a>
			</li>
		</ul>


	</footer>
</div>



<style global>
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

	/*
	& .ctx {
		margin-top: 0.5em;
	}
	*/

	@media (max-width: 700px) {
		max-width: unset;
		padding-left: .5em;
		margin-left: 1.5em;
		border-left: .25em solid #9993;
	}
}

.hr {
	margin-bottom: 1em;
}

.filters {
	position: relative;
	text-align: center;
}
.filters label {
	display: inline-flex;
	align-items: center;
	gap: .25em;
	margin: .25em;
	user-select: none;
}

.search-box {
	position: absolute;
	right: 0;

	& input {
		padding: 0.25em;
	}
}

input[type="checkbox"] {
	margin: 0;
	width: 1em;
	height: 1em;
}

hr {
	margin: 2em 0;
}

h1 {
	text-align: center;
}
input:active {
	background-color: #ffc9;
}
</style>
