<script>
	import data from '/data/ornaments.min.json';
	import { get_icon_image } from './u.js';
	import { resize_img } from '/_share/u.js';

	let filters = init_filters();
	let filters_len = filters.flat().length;

	let search_kwd = new URLSearchParams(location.search).get('query') || '';
	$: filter_style  = `<style>${gen_filter_style(filters)}</style>`;
	$: search_style  = `<style>${gen_search_style(search_kwd)}</style>`;

	const filters_cates = {
		rarity: '品質',
		position: '部位',
		type: '類型',
		job: '職業',
	};

	function gen_filter_style(_filters) {
		let selectors = _filters
			.map(cate => cate
				.filter(i => i.checked)
				.map(i => ` .${i.cate}-${i.value}`)
				.join()
			)
			.flat()
			.filter(Boolean)
			.map(i => `.item:not(${i})`)
			.join();

		return selectors ? `${selectors} { display:none; }` : '';
	}

	function gen_search_style(_kwd) {
		if (!_kwd) {
			return '';
		}
		return `.item:not([data-info*="${_kwd}"]) { display:none; }`;
	}

	function init_filters() {
		return Object.keys(data.keys).map(prop => {
			return data.keys[prop].map((i, index) => i && ({
				cate: prop,
				title: i,
				icon: resize_img(get_icon_image(i), 32),
				value: index,
				checked: false,
			})).filter(Boolean);
		});
	}

	function reset() {
		filters = init_filters();
		search_kwd = '';
	}

</script>

<div class="filters pos-r">
	<div class="style">
		{@html filter_style}
		{@html search_style}
	</div>

	<dl>
		{#each filters as filter_cate}
			{#each filter_cate as filter, index (filter.title)}
				{#if !index}
					<dt>{filters_cates[filter.cate]}</dt>
				{/if}

				<dd>
				<label>
					<input type="checkbox" bind:checked={filter.checked}>
					{filter.title}
					{#if filter.icon}
						<img src={filter.icon} alt={filter.title} width="20" height="20">
					{/if}
				</label>
				</dd>
			{/each}
			<hr>
		{/each}
	</dl>

	<div class="search">
		<input type="search" bind:value={search_kwd} placeholder="Search">

		<input type="reset" on:click={reset} />
	</div>
</div>



<style>
	.filters {
		margin-bottom: 2em;
	}

	.search {
		position: absolute;
		right: 0;
		top: 0;

		@media (max-width: 500px) {
			position: static;
			margin-bottom: 1em;
			text-align: center;
		}
	}

	dd {
		display: inline-flex;
		margin: .15em .2em;
	}

	label	{
		display: inline-flex;
		padding: 0 .25em;
		gap: 1px;
		align-items: center;
	}

	hr {
		border-style: dotted;
		border-bottom-width: 0;
		border-color: #6666;
	}
</style>