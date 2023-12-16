<script>
	import data from './data.json';
	import SvelteTable from 'svelte-table';
	import Avatar from './Avatar.svelte';
	import Icon from './Icon.svelte';
	import Numbers from './Number.svelte';

	const filters = [{
		prop: 'rarity',
		title: '稀有度',
		values: ['n', 'r', 'sr', 'ssr'],
	}, {
		prop: 'klass',
		title: '職業',
		values: ['俠客', '鐵衛', '祝由', '御風', '羽士', '咒師', '鬥將'],
	}, {
		prop: 'type',
		title: '屬相',
		values: ['炎', '雷', '冰', '光', '暗', '幽'],
	}
	].map(i => ({
		prop: i.prop,
		title: i.title,
		options: i.values.map(key => {
			return {
				key,
				checked: false,
			};
		}),
	}));


	let max_status = data.roles.reduce((all, item) => {
		for (let prop in item.status) {
			if (!all[prop] || item.status[prop] > all[prop]) {
				all[prop] = item.status[prop];
			}
		}
		return all;
	}, {});

	let columns = [
	{
		key: 'name',
		title: '[ 名 ]',
		value: v => v.name,
		sortable: true,
		renderComponent: Avatar,
		searchValue: (v, s) =>
		v.name.toString().toLowerCase().includes(s.toLowerCase()),
	},
	{
		key: 'hp',
		title: '氣血',
		value: v => v.status.hp,
		sortable: true,
		renderComponent: {
			component: Numbers,
			props: {
				prop: 'hp',
				max: max_status.hp,
			},
		},
	},
	{
		key: 'atk_phy',
		title: '物攻',
		value: v => v.status.atk_phy,
		sortable: true,
		renderComponent: {
			component: Numbers,
			props: {
				prop: 'atk_phy',
				max: max_status.atk_phy,
			},
		},
	},
	{
		key: 'def_phy',
		title: '物防',
		value: v => v.status.def_phy,
		sortable: true,
		renderComponent: {
			component: Numbers,
			props: {
				prop: 'def_phy',
				max: max_status.def_phy,
			},
		},
	},
	{
		key: 'atk_mag',
		title: '法攻',
		value: v => v.status.atk_mag,
		sortable: true,
		renderComponent: {
			component: Numbers,
			props: {
				prop: 'atk_mag',
				max: max_status.atk_mag,
			},
		},
	},
	{
		key: 'def_mag',
		title: '法防',
		value: v => v.status.def_mag,
		sortable: true,
		renderComponent: {
			component: Numbers,
			props: {
				prop: 'def_mag',
				max: max_status.def_mag,
			},
		},
	},
	{
		key: 'crit',
		title: '會心',
		value: v => v.status.crit,
		sortable: true,
		renderComponent: {
			component: Numbers,
			props: {
				prop: 'crit',
				max: max_status.crit,
			},
		},
	},
		// {
		// 	key: 'class',
		// 	title: '職業',
		// 	value: v => v.klass,
		// 	sortable: true,
		// 	renderComponent: Icon,
		// },
		// {
		// 	key: 'rarity',
		// 	title: 'Rarity',
		// 	value: v => v.rarity,
		// 	sortable: true,
		// 	filterOptions: rows => {
		// 		let letrs = {};
		// 		rows.forEach(row => {
		// 			let letr = row.rarity;
		// 			if (letrs[letr] === undefined)
		// 				letrs[letr] = {
		// 					name: `${letr}`,
		// 					value: letr,
		// 				};
		// 		});
		// 		// fix order
		// 		letrs = Object.entries(letrs)
		// 			.sort()
		// 			.reduce((o, [k, v]) => ((o[k] = v), o), {});
		// 		return Object.values(letrs);
		// 	},
		// 	filterValue: v => v.rarity,
		// },
		];

		$: render_roles = filter_roles(filters);

		function filter_roles(filters) {
			let checked_filters = get_checked_filters(filters);
			if (!checked_filters.length) {
				return data.roles;
			}
			console.log(checked_filters);
			return data.roles.filter(role => {
				return checked_filters.every(_f => {
					return _f.keys.includes(role[_f.prop]);
				});
			});
		}

		function get_checked_filters(filters) {
			let checked_filters = filters.map(cate => {
				return {
					prop: cate.prop,
					keys: cate.options.map(option => {
						return option.checked ? option.key : null;
					}).filter(Boolean),
				}
			})
			.filter(i => i.keys.length);
			return checked_filters;
		}
</script>



<div class="workspace">
	<h1>
		<a href="../" title="back">../</a>
		天地劫M 英靈圖鑑
	</h1>

	<div class="filters">
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
	</div>

	<SvelteTable
	columns={columns}
	rows={render_roles}
	rowKey="name"
	classNameInput="search-input"
	/>

	<hr>

	<footer class="info">
		資料來源：<a href="https://wiki.biligame.com/tdj/" target="_biliwiki">https://wiki.biligame.com/tdj/</a>
	</footer>
</div>



<style global>
	.workspace {
		justify-content: center;
		min-height: 100vh;
		margin: 0 auto;
		max-width: 50em;
		align-content: stretch;

		@media (max-width: 700px) {
			& tr > *:nth-child(4),
			& tr > *:nth-child(6),
			& tr > *:nth-child(7),
			.asda {
				display: none;
			}
		}
	}

	.filter {
		margin-bottom: 1em;
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
			border-color: #666c;
			background-color: #ffc9;
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

	:global(th:has(.search-input)) {
		position: sticky;
		top: 0;
		z-index: 2;
	}

	:global(thead th.isSortable) {
		position: sticky;
		top: 0;
		padding-top: 0.25em;
		padding-bottom: 0.25em;
		background-color: var(--main-bgc);
		border-bottom: 1px dotted #0003;

		&:hover {
			background-color: #ff99;
		}
	}

	:global(.search-input) {
		position: absolute;
		left: 0;
		z-index: 1;
		max-width: 8em;
		background: var(--main-bgc);
	}

	:global(table) {
		text-align: right;
		border-collapse: collapse;
		border-spacing: 0;

		& th,
		& td {
			width: 12%;

			&:first-child {
				min-width: 10em;
			}
		}

		& td:first-child {
			padding: .5em .5em .5em 0;
		}

		& tr:nth-of-type(5n + 1) td {
			border-top: 1px dotted #0003;
		}
	}

	.info {
		text-align: right;
		margin: 2em 0;
		font-family: monospace;
	}

	h1 {
		text-align: center;
		padding-bottom: 0.5em;
		border-bottom: 1px dotted #0003;
	}

</style>
