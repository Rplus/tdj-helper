<script>
	import data from '/data/strategy.min.json';
	import Item from './Item.svelte';

	let filters = init_filters();
	let search_kwd = '';

	$: filetr_style  = `<style>${gen_filter_style(filters)}</style>`;
	$: search_style  = `<style>${gen_search_style(search_kwd)}</style>`;

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
	}
</script>



<div class="workspace">

	<h1>
    <a href="../" title="back">../</a>
		天地劫M 戰陣圖鑑
	</h1>

	<hr>

	<div class="style">
		{@html filetr_style}
		{@html search_style}
	</div>

	<form class="filters" on:reset|preventDefault={reset_filter}>
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
			<input type="search" bind:value={search_kwd}
				placeholder="過濾說明" />
		</div>
	</form>
	<hr>

	{#each data as strategy (strategy.name)}
		<div class="row flex {gen_members_class(strategy.members)}"
			data-info={strategy.desc}
			id={strategy.name}
		>
			<div class="members flex">
				<Item member={strategy} />

				{#each strategy.members as member}
					<Item member={member} />
				{/each}
			</div>

			<div class="info">{strategy.desc}</div>
		</div>

	{/each}

	<hr>

	<footer class="footer">
		資料來源：<a href="https://wiki.biligame.com/tdj/" target="_biliwiki">https://wiki.biligame.com/tdj/</a>
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
	padding-bottom: 1em;

	@media (max-width: 700px) {
		max-width: unset;
		padding-left: .75em;
		padding-right: 1.5em;
		margin-left: .65em;
		border-left: .4em solid #0001;
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
