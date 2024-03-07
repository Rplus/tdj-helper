<script>
	import roles_data from '/data/roles.min.json';
	import Filter from './Filter.svelte';
	import Role from './Role.svelte';
	import '../_share/Theme.js';

	import { setContext } from 'svelte';
	setContext('icon_folder', import.meta.env.BASE_URL + 'icon');

	let status_props = [
		{ max: 0, label: '氣血', prop: 'hp', },
		{ max: 0, label: '物攻', prop: 'atk_phy', },
		{ max: 0, label: '物防', prop: 'def_phy', },
		{ max: 0, label: '法攻', prop: 'atk_mag', },
		{ max: 0, label: '法防', prop: 'def_mag', },
		{ max: 0, label: '會心', prop: 'crit', },
	];

	let max_status = roles_data.reduce((props, role) => {
		for (let item of props) {
			if (role.status[item.prop] > item.max) {
				item.max = role.status[item.prop];
			}
		}
		return props;
	}, status_props);

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
</script>



<div class="workspace">
	<h1>
		<a href="../" title="back">../</a>
		<ruby>
			英靈圖鑑
			<rt>天地劫M</rt>
		</ruby>
	</h1>

	<Filter />

	<hr>

	{@html sort_style}
	<div class="list">
		<div class="role role-head">
			<div class="name text-center" on:click={() => sort_by_prop()}>
				名
			</div>
			{#each status_props as prop}
				<div class="role-sort-btn text-right"
					data-dir={sort_dir}
					class:active={prop.prop === sort_prop}
					on:click={() => sort_by_prop(prop.prop)}
				>
					{prop.label}
				</div>
			{/each}
		</div>

		{#each roles_data as role (role.pinyin)}
			<Role
				data={role}
				max_status={max_status}
			/>
		{/each}
	</div>

	<hr>

	<footer class="footer">
		<ul>
			資料來源：
			<li>
				Official (zh-tw)<br>
				<a href="https://www.game-beans.com/userinfo/tdj/index.html" target="_officail_tw">
					https://www.game-beans.com/userinfo/tdj/index.html
				</a>
			</li>
			<li>
				Official (zh-cn)<br>
				<a href="https://www.zlongame.com/userinfo/tdj/index.html" target="_officail_cn">
					https://www.zlongame.com/userinfo/tdj/index.html
				</a>
			</li>
			<li>
				Bili-Wiki<br>
				<a href="https://wiki.biligame.com/tdj/" target="_biliwiki">
					https://wiki.biligame.com/tdj/
				</a>
			</li>
		</ul>
	</footer>
</div>



<style global>
	.workspace {
		min-height: 100vh;
		margin: 0 auto;
		max-width: 50em;
		/*
		@media (max-width: 700px) {
			& .role > div:nth-child(4),
			& .role > div:nth-child(6),
			& .role > div:nth-child(7) {
				display: none;
			}

			& .list {
				grid-template-columns: max(140px, 30vw) repeat(3, 1fr);
			}
		}
		*/
	}
	h1 {
		text-align: center;
		padding-bottom: 0.5em;
		border-bottom: 1px dotted #0003;
	}

	.list {
		display: grid;
		grid-template-columns: 2fr repeat(6, 1fr);

		@media (max-width: 700px) {
			font-size: smaller;
		}
	}

	.role-head {
		position: sticky;
		top: 0;
		z-index: 10;
		margin: 0;
		padding-top: .25em;
		padding-bottom: .5em;
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
		gap: .25em;

		&::before {
			font-family: monospace;
			font-size: smaller;
			opacity: .5;
		}
	}
	.role-sort-btn.active,
	.role-sort-btn:hover {
		background-color: #ff03;
	}
	.role-sort-btn.active {
		&[data-dir="-1"]::before { content: '▼'; }
		&[data-dir="1"]::before { content: '▲'; }
	}

</style>
