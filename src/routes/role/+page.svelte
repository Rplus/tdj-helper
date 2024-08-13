<script>
import roles_data from '$lib/data/roles.min.json';
import { get_refs } from '$lib/fetch-data.js';

import Filter from './Filter.svelte';
import Role from './Role.svelte';
import Header from '$lib/Header.svelte';
import Footer from '$lib/Footer.svelte';
import Switcher from '$lib/Switcher.svelte';

import { status_props } from './role.js';

let sort_prop = '';
let sort_dir = -1;
let sort_style = ``;
function sort_by_prop(prop = '') {
	if (!prop) {
		sort_style = '';
	}
	if (sort_prop === prop) {
		sort_dir = -sort_dir;
	} else {
		sort_prop = prop;
		sort_dir = -1;
	}
	sort_style = `<style> .role {
		order: calc(var(--${prop}) * ${sort_dir});
	} </style>`;
}

$: grid_view = false;
</script>

<div class="workspace">
	<Header title="英靈圖鑑" />

	<Filter />



	<div class="hr">
		<Switcher
			left_label="▦"
			right_label="▤"
			bind:checked={grid_view}
		/>
	</div>

	{@html sort_style}

	<div class="list" class:grid_view>
		<div class="role role-head type-list">
			<div
				class="name text-center"
				on:click={() => sort_by_prop()}
				role="button"
				tabindex="0"
				aria-hidden="true"
			>
				名
			</div>
			{#each status_props as prop}
				<div
					class="role-sort-btn text-right"
					data-dir={sort_dir}
					class:active={prop.prop === sort_prop}
					on:click={() => sort_by_prop(prop.prop)}
					role="button"
					tabindex="0"
					aria-hidden="true"
				>
					{prop.label}
				</div>
			{/each}
		</div>

		{#each roles_data as role (role.pinyin)}
			<Role data={role} type="list" />
		{/each}
	</div>
</div>

<Footer time={true} refs={get_refs([1, 1, 0])} />

<style>

.list {
	display: grid;
	grid-template-columns: 2fr repeat(6, 1fr);

	@media (max-width: 700px) {
		font-size: smaller;
	}
}

.list.grid_view {
	grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));

	& .role-head {
		display: none !important;
	}

	& .role {
		grid-column: auto;
		margin-bottom: 2em;

		& .box {
			flex-direction: column;

			& ~ * {
				display: none;
			}
		}
	}
}

.role-head {
	position: sticky;
	top: 0;
	z-index: 10;
	margin: 0;
	padding-top: 0.25em;
	padding-bottom: 0.5em;
	background-color: var(--main-bgc);
	mask-image: linear-gradient(#000 60%, #0000);
	font-weight: 900;
	display: grid !important;
	order: -10000 !important;
}

.role-sort-btn {
	cursor: pointer;
	display: inline-flex;
	align-items: center;
	justify-content: flex-end;
	gap: 0.25em;

	&::before {
		font-family: monospace;
		font-size: smaller;
		opacity: 0.5;
	}
}
.role-sort-btn.active,
.role-sort-btn:hover {
	background-color: #ff03;
}
.role-sort-btn.active {
	&[data-dir='-1']::before {
		content: '▼';
	}
	&[data-dir='1']::before {
		content: '▲';
	}
}
</style>
