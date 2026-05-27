<script>
import { get_refs } from '$lib/fetch-data.js';

import Filter from './Filter.svelte';
import Role from './Role.svelte';
import Tags from './Tags.svelte';
import Header from '$lib/Header.svelte';
import Footer from '$lib/Footer.svelte';
import Switcher from '$lib/Switcher.svelte';

import { filter_cates } from './filter.js';
import { status_props } from './role.js';

export let data;

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
	sort_style = `.role {
		order: calc(var(--${prop}) * ${sort_dir});
	}`;
}

$: grid_view = !false;
</script>

<div class="workspace">
	<Header title="英靈圖鑑" />

	<Filter />

	<Tags tags={data.tags} />

	<div class="hr">
		<Switcher left_label="▦" right_label="▤" bind:checked={grid_view} />
	</div>

	<svelte:element this="style">{sort_style}</svelte:element>

	<div class="grid-ctrl mb-1" hidden={!grid_view}>
		<div class="flex jc-c mb-1" style="gap: 1em">
			<label>
				<input type="radio" name="grid_view_mode" value="">
				-無-
			</label>

			<label>
				<input type="radio" name="grid_view_mode" value="prop">
				屬相
			</label>

			<label>
				<input type="radio" name="grid_view_mode" value="career">
				職業
			</label>
		</div>

		<!-- prop -->
		<label class="flex jc-sa header header-props">
			{#each filter_cates[2].values as prop}
				<div>
					{prop}
				</div>
			{/each}
		</label>

		<!-- career -->
		<div class="flex jc-sa header header-careers">
			{#each filter_cates[1].values as career, index}
				<div class="inline-flex ai-c" style="gap: 2px;">
					{career}
					<img src={filter_cates[1].icons[index]} alt={career} width="16" height="16">
				</div>
			{/each}
		</div>

		<div class="hr"></div>
	</div>

	<div class="list" class:grid_view
		style="
			--career-count: {filter_cates[1].values.length};
			--prop-count: {filter_cates[2].values.length};
		"
	>
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

		{#each data.roles as role (role.pinyin)}
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

.grid-ctrl .header {
	display: none;
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

.workspace:has(input[name="grid_view_mode"][value="career"]:checked) {
	& .header-careers {
		display: flex;
	}

	& .list.grid_view {
		grid-template-columns: repeat(var(--career-count), 1fr);
		grid-auto-flow: row dense;

		& .role {
			grid-column: var(--ci);
			order: var(--pi);
		}
	}

}
.workspace:has(input[name="grid_view_mode"][value="prop"]:checked) {
	& .header-props {
		display: flex;
	}

	& .list.grid_view {
		grid-template-columns: repeat(var(--prop-count), 1fr);
		grid-auto-flow: row dense;

		& .role {
			grid-column: var(--pi);
			order: var(--ci);
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
