<script>
	export let filter_cates = []; // filters array
	export let item_class = '.item'; // string
	export let placeholder = '過濾名稱';
	export let gen_selector = (prop, value, multi) => `[data-${prop}${multi ? '*' : ''}="${value}"]`;
	export let search_cb = null;

	// ### filter_cates sample
	// [
	// 	{
	// 		prop: 'rarity',
	// 		title: '稀有度',
	// 		values: ['N', 'R', 'SR', 'SSR'],
	// 	}, {
	// 		prop: 'career',
	// 		title: '職業',
	// 		values: ['俠客', '鐵衛', '祝由', '御風', '羽士', '咒師', '鬥將'],
	// 		icons; ['', '', '', '', '', '', '', ],
	// 	}, {
	// 		prop: 'type',
	// 		title: '類型',
	// 		multi: true,
	// 		values: ['物攻', '物防', '法攻', '法防', '治療', '氣血'],
	// 	},
	// ];

	let filters = init_filters();
	let search_kwd = '';
	let input_value = new URLSearchParams(location.search).get('query') || '';
	let is_composing = false;

	$: filter_style  = `<style>${gen_filter_style(filters)}</style>`;
	$: search_style  = search_kwd ? `<style>${gen_search_style(search_kwd)}</style>`: '';

	// $: console.log({filters});

	$: {
		if (!is_composing) {
			search_kwd = input_value;
			if (search_cb) {
				search_cb(input_value);
			}
		}
	}

	// ∪ &cup; ∩ &cap;
	function init_filters() {
		return filter_cates.map(cate => ({
			prop: cate.prop,
			title: cate.title,
			multi: cate.multi,
			options: cate.values.map((key, index) => {
				return {
					key,
					checked: false,
					icon: cate.icons?.[index],
				};
			}),
		}));
	}

	function gen_not_selector(selector_str) {
		return `${item_class}:not(${selector_str})`;
	}

	function gen_filter_style(_filters) {
		let selectors = _filters
			.map(cate => {
				let checked_props = cate.options
					.map(option => {
						if (!option.checked) { return null; }

						return {
							prop: cate.prop,
							value: option.key,
						};
					})
					.filter(Boolean);

				// skip logic, when all un-checked prop's checkbox
				if (!checked_props.length) {
					return '';
				}

				// ? intersection set rule, group later
				if (cate.multi && cate.is_cap) {
					return checked_props.map(i =>
						gen_not_selector( gen_selector(i.prop, i.value, cate.multi) )
					);
				}

				// : union set rule, group same-prop selectors first
				return gen_not_selector(
					checked_props.map(i => gen_selector(i.prop, i.value, cate.multi)).join()
				);
			})
			.flat()
			.filter(Boolean)
			.join();

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
			<div class="filter-title">
				{filter.title}:

				{#if filter.multi}
					<input
						class="filter-switcher"
						type="checkbox"
						switch
						bind:checked={filter.is_cap}
						data-active="∩"
						data-inactive="∪"
					/>
				{/if}
			</div>

			{#each filter.options as option}
				<label class="filer-option-label" hidden={!option.key}>
					<input type="checkbox"
						bind:checked={option.checked}
					/>

					{option.key}

					{#if option.icon}
						<img src={option.icon} alt={option.key} width="16" height="16">
					{/if}

				</label>
			{/each}

		</div>
	{/each}

	<div>
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

	.filter-title {
		display: flex;
		align-items: center;
	}

	.filer-option-label:not([hidden]) {
		display: inline-flex;
		align-items: center;
		margin: 0 .25em .5em .5em;
		padding: 0;
		text-transform: uppercase;
		user-select: none;
		cursor: pointer;
	}

	.filer-option-label img {
		margin-inline-start: 2px;
	}

	.filter-switcher {
		appearance: none;
		font-family: inherit;
		font-size: smaller;
		cursor: pointer;

		&::after,
		&::before {
			content: attr(data-inactive);
			display: inline-flex;
			align-items: center;
			justify-content: center;
			padding: 1px 2px;
			opacity: .5;
		}

		&::after {
			content: attr(data-active);
		}

		&:not(:checked)::before,
		&:checked::after {
			box-shadow: inset 0 0 0 1px #6669;
			background-color: #9999;
		}
	}

	@media (min-width: 700px) {
		.input-box {
			float: right;
		}
	}
</style>