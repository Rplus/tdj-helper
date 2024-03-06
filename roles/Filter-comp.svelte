<script>
	export let filter_cates = []; // filters array
	export let item_class = ''; // string

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
				.map(i => `[data-${cate.prop}="${i.key}"]`)
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


<form class="filters" on:reset|preventDefault={reset_filter}>
	<div class="filter input-box">
		<input type="search" placeholder="過濾名稱"
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
					<div class="txt">{option.key}</div>
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

	input[type="checkbox"] {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0,0,0,0);
		white-space: nowrap;
		border: 0;

		& + .txt {
			border: 1px solid #0003;
			padding: 3px .5em;
			border-radius: 3px;
			font-size: larger;
			user-select: none;
		}

		&:checked + .txt {
			background-color: #ffc9;
		}

		&:focus + .txt {
			border-color: #666c;
			box-shadow: inset 0 0 0 1px var(--main-color);
		}

	}

	label {
		display: inline-block;
		cursor: pointer;
		margin-left: .5em;
		margin-bottom: .5em;
		padding: 0;
		text-transform: uppercase;
	}


	@media (min-width: 700px) {
		.input-box {
			float: right;
		}
	}
</style>