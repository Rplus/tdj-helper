<script>
export let filter_cates = [];
export let item_class = '.item';
export let placeholder = '過濾名稱';
export let gen_selector = (prop, value, multi) => `[data-${prop}${multi ? '*' : ''}="${value}"]`;
export let search_cb = null;

import { page } from '$app/stores';
import { goto } from '$app/navigation';
import { writable } from 'svelte/store';
import { saveItem, getItem } from '$lib/u.js';

// ### filter_cates sample
// # TODO: values contain (value, title)?
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

const STORAGE_KEY = 'filter-toggle-status';
const QUERY_PARAM = 'q';

const details_store = writable(getItem(STORAGE_KEY) || {});

details_store.subscribe((obj) => {
	saveItem({
		key: STORAGE_KEY,
		value: obj,
	});
});

function handle_toggle(io_key, is_open) {
	details_store.update((obj) => ({
		...obj,
		[io_key]: is_open,
	}));
}

let is_composing = false;

$: search_params = $page.url.searchParams;

$: checked_set = get_checked_set(search_params);

$: search_kwd = search_params.get(QUERY_PARAM) || '';

$: filters = create_filters(checked_set, search_params);

$: filter_style = gen_filter_style(filters, search_params);

$: search_style = search_kwd
	? gen_search_style(search_kwd)
	: '';

let prev_search_kwd;

$: if (
	!is_composing
	&& search_cb
	&& search_kwd !== prev_search_kwd
) {
	prev_search_kwd = search_kwd;
	search_cb(search_kwd);
}

function create_filters(checked_set, search_params) {
	return filter_cates.map((cate) => ({
		prop: cate.prop,
		title: cate.title,
		multi: cate.multi,
		toggleable: cate.toggleable,

		// is_cap: search_params.get(gen_op_key(cate.prop)) === 'and',

		options: cate.values.map((key, index) => ({
			key,
			icon: cate.icons?.[index],
			checked: checked_set.has(`${cate.prop}.${key}`),
		})),
	}));
}

function get_checked_set(search_params) {
	return new Set(
		[...search_params]
			.filter(([key]) => !key.endsWith('_op'))
			.filter(([key]) => key !== QUERY_PARAM)
			.flatMap(([prop, values]) =>
				values
					.split('|')
					.filter(Boolean)
					.map((value) => `${prop}.${value}`),
			),
	);
}

function gen_op_key(prop) {
	return `${prop}_op`;
}

function update_params(callback, replace = false) {
	const params = new URLSearchParams(search_params);

	callback(params);

	goto(`?${params.toString()}`, {
		replaceState: replace,
		noScroll: true,
		keepFocus: true,
	});
}

function toggle_filter(prop, value) {
	update_params((params) => {
		const values = new Set(
			(params.get(prop) || '')
				.split('|')
				.filter(Boolean),
		);

		if (values.has(value)) {
			values.delete(value);
		}
		else {
			values.add(value);
		}

		if (values.size) {
			params.set(prop, [...values].join('|'));
		}
		else {
			params.delete(prop);
		}
	}, false);
}

function set_filter_op(prop) {
	update_params((params) => {
		const key = `${prop}_op`;

		if (params.get(key) === 'and') {
			params.delete(key);
		}
		else {
			params.set(key, 'and');
		}
	});
}

function update_search(value) {
	update_params((params) => {
		if (value) {
			params.set(QUERY_PARAM, value);
		}
		else {
			params.delete(QUERY_PARAM);
		}
	}, true);
}

function reset_filter() {
	goto($page.url.pathname, {
		replaceState: true,
		noScroll: true,
	});
}

function compositionstart() {
	is_composing = true;
}

function compositionend(e) {
	is_composing = false;
	update_search(e.currentTarget.value);
}

function gen_not_selector(selector_str) {
	return `${item_class}:not(${selector_str})`;
}

function gen_filter_style(_filters, search_params) {
	let selectors = _filters
		.map((cate) => {
			let checked_props = cate.options
				.filter((option) => option.checked)
				.map((option) => ({
					prop: cate.prop,
					value: option.key,
				}));

			if (!checked_props.length) {
				return '';
			}

			if (cate.multi && is_and(cate.prop)) {
				return checked_props.map((i) =>
					gen_not_selector(
						gen_selector(i.prop, i.value, cate.multi),
					),
				);
			}

			return gen_not_selector(
				checked_props
					.map((i) =>
						gen_selector(i.prop, i.value, cate.multi),
					)
					.join(),
			);
		})
		.flat()
		.filter(Boolean)
		.join();

	return selectors
		? `${selectors} { display:none; }`
		: '';
}

function gen_search_style(_kwd) {
	return `${item_class}:not([data-search*="${_kwd}"]) { display:none; }`;
}

function is_and(prop) {
	return search_params.get(`${prop}_op`) === 'and';
}
</script>


<form class="filters" on:reset|preventDefault={reset_filter}>
	<div class="filter input-box">
		<input
			type="search"
			name={QUERY_PARAM}
			placeholder={placeholder}
			value={search_kwd}
			on:input={(e) => !is_composing && update_search(e.currentTarget.value)}
			on:compositionstart={compositionstart}
			on:compositionend={compositionend}
		/>

		<input type="reset" />
	</div>

	{#each filters as filter}
		<svelte:element
			this={filter.toggleable ? 'details' : 'div'}
			class="filter" class:is-toggleable={filter.toggleable} data-prop={filter.prop}
			open={filter.toggleable ? $details_store[filter.prop] : true}
			on:toggle={(e) => filter.toggleable && handle_toggle(filter.prop, e.currentTarget.open)}
		>
			<svelte:element
				this={filter.toggleable ? 'summary' : 'div'}
				class="filter-title"
			>
				{filter.title}:

				{#if filter.multi}
					<input
						class="filter-switcher"
						type="checkbox"
						switch
						checked={is_and(filter.prop)}
						on:change={() => set_filter_op(filter.prop)}
						data-active="∩"
						data-inactive="∪"
						title={is_and(filter.prop) ? '聯集 [交集]' : '[聯集] 交集'}
					/>
				{/if}
			</svelte:element>

			{#each filter.options as option (option.key)}
				<label class="filer-option-label" hidden={!option.key}>
					<input
						type="checkbox"
						checked={option.checked}
						on:change={() => toggle_filter(filter.prop, option.key)}
						title={option.key}
					/>

					{option.key}

					{#if option.icon}
						<img src={option.icon} alt={option.key} width="16" height="16" />
					{/if}
				</label>
			{/each}
		</svelte:element>
	{/each}

	<div>
		<svelte:element this="style">{filter_style}{search_style}</svelte:element>
	</div>
</form>





<style>
.filter {
	margin-bottom: 1em;

	&.is-toggleable .filter-title {
		display: list-item;
		cursor: pointer;

		&::marker {
			color: #9999;
			font-size: smaller;
		}
	}

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
	margin: 0 0.25em 0.5em 0.5em;
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
	pointer-events: auto;

	&::after,
	&::before {
		content: attr(data-inactive);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 1px 2px;
		opacity: 0.5;
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
