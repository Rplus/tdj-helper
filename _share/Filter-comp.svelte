<script>
	export let filter_cates = []; // filters array
	export let item_class = '.item'; // string
	export let placeholder = '過濾名稱';
	export let gen_selector = (prop, value) => `[data-${prop}="${value}"]`;
	export let search_cb = null;

	// filter_cates sample
	// [
	// 	{
	// 		prop: 'rarity',
	// 		title: '稀有度',
	// 		values: ['N', 'R', 'SR', 'SSR'],
	// 	}, {
	// 		prop: 'career',
	// 		title: '職業',
	// 		values: ['俠客', '鐵衛', '祝由', '御風', '羽士', '咒師', '鬥將'],
	// 	}, {
	// 		prop: 'prop',
	// 		title: '屬相',
	// 		values: ['炎', '雷', '冰', '光', '暗', '幽'],
	// 	},
	// ];


	let filters = init_filters();
	let search_kwd = '';
	let input_value = '';
	let is_composing = false;

	$: filter_style  = `<style>${gen_filter_style(filters)}</style>`;
	$: search_style  = search_kwd ? `<style>${gen_search_style(search_kwd)}</style>`: '';

	$: {
		if (!is_composing) {
			search_kwd = input_value;
			if (search_cb) {
				search_cb(input_value);
			}
		}
	}

	function init_filters() {
		return filter_cates.map(cate => ({
			prop: cate.prop,
			title: cate.title,
			options: cate.values.map(key => {
				return {
					key,
					checked: false,
				};
			}),
		}));
	}

	function gen_filter_style(_filters) {
		let selectors = _filters
			.map(cate => cate.options
				.filter(i => i.checked)
				.map(i => gen_selector(cate.prop, i.key))
				.join(',')
			)
			.flat()
			.filter(Boolean)
			.map(i => `${item_class}:not(${i})`)
			.join(',')

		return selectors ? `${selectors} { display: none; }` : '';
	}

	function gen_search_style(_kwd) {
		if (!_kwd) {
			return '';
		}
		return `${item_class}:not([data-search*="${_kwd}"]) { display:none; }`;
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
</script>


<form class="filters" on:reset|preventDefault={reset_filter} on:submit|preventDefault>
	<div class="filter input-box">
		<input type="search" placeholder={placeholder}
			bind:value={input_value}
			on:compositionstart={compositionstart}
			on:compositionend={compositionend}
		/>

		<input type="reset" />
	</div>

	{#each filters as filter}
		<div class="filter">
			<div>{filter.title}:</div>

			{#each filter.options as option}
				<label>
					<input type="checkbox"
						bind:checked={option.checked}
					/>
					{option.key}
				</label>
			{/each}

		</div>
	{/each}

	<div class="style">
		{@html filter_style}
		{@html search_style}
	</div>
</form>




<style>
	.filter {
		margin-bottom: 1em;

		@media (max-width: 700px) {
			font-size: smaller;
		}
	}

	label {
		display: inline-flex;
		cursor: pointer;
		margin: 0 .25em .5em .5em;
		padding: 0;
		text-transform: uppercase;
	}


	@media (min-width: 700px) {
		.input-box {
			float: right;
		}
	}
</style>