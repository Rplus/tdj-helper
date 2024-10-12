<script>
import Header from '$lib/Header.svelte';
import Footer from '$lib/Footer.svelte';
import Img from '$lib/Img.svelte';

import { resize_img } from '$lib/u.js';

import data from './data.json';

const refs = [
	{
		title: '魂石圖鑑 | biligame',
		link: 'https://wiki.biligame.com/tdj/魂石图鉴',
		target: '_blank',
	},
];

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
	sort_style = `tbody tr {
		order: calc(var(--${prop}) * ${sort_dir});
	}`;
}
</script>

<div class="workspace">
	<Header title="魂石圖鑑" />

	<table class="table">
		<thead class="thead" data-dir={sort_dir}>
			<tr>
				<th class="sort" on:click={() => sort_by_prop()}>名稱</th>
				<th class="sort" class:active={sort_prop === 'hp'} on:click={() => sort_by_prop('hp')}
					>氣血</th
				>

				<th class="sort" class:active={sort_prop === 'atk'} on:click={() => sort_by_prop('atk')}
					>物攻</th
				>

				<th class="sort" class:active={sort_prop === 'matk'} on:click={() => sort_by_prop('matk')}
					>法攻</th
				>

				<th class="sort" class:active={sort_prop === 'def'} on:click={() => sort_by_prop('def')}
					>物防</th
				>

				<th class="sort" class:active={sort_prop === 'mdef'} on:click={() => sort_by_prop('mdef')}
					>法防</th
				>

				<th>同魂屬性(2)</th>
				<th>同魂屬性(3)</th>
			</tr>
		</thead>
		<tbody class="tbody">
			{#each data as item}
				<tr
					style="--hp:{item.hp};--atk:{item.atk};--matk:{item.matk};--def:{item.def};--mdef:{item.mdef}"
				>
					<td>
						<Img src={resize_img(item.img, 48)} width="48" height="48" alt={item.name} />
						{item.name}
					</td>
					<td data-value={item.hp}>{item.hp}</td>
					<td data-value={item.atk}>{item.atk}</td>
					<td data-value={item.matk}>{item.matk}</td>
					<td data-value={item.def}>{item.def}</td>
					<td data-value={item.mdef}>{item.mdef}</td>
					<td>{item.collab[0]}</td>
					<td>{item.collab[1]}</td>
				</tr>
			{/each}
		</tbody>
	</table>

	<svelte:element this="style">{sort_style}</svelte:element>
</div>

<Footer time={true} {refs} />

<style>
table {
	& img {
		pointer-events: none;
	}
}
table img {
	width: 48px;
	height: 48px;
	background: radial-gradient(closest-side, #0009, #0000);
}
thead {
	position: sticky;
	top: 0;
	background-color: var(--main-bgc);
	user-select: none;
}
thead,
tbody {
	display: grid;
	grid-template-columns: 120px repeat(5, 1fr) 150px 5fr;
}
tr {
	display: grid;
	grid-column: 1 / -1;
	grid-template-columns: subgrid;
}
tbody tr:hover {
	background-color: #9993;
}
.sort {
	cursor: pointer;
}
.sort.active {
	background-color: #ff03;

	&::before {
		font-family: monospace;
		font-size: smaller;
		opacity: 0.5;
	}
}

[data-dir='-1'] .sort.active::before {
	content: '▼';
}
[data-dir='1'] .sort.active::before {
	content: '▲';
}

th {
	line-height: 2;
}
th:nth-child(1) {
	padding-left: 48px;
}
td,
th {
	display: flex;
	text-align: inherit;
	border-bottom: 1px dotted rgba(var(--main-color-rgb), 0.3);
	place-items: center;
	padding-top: 0.25em;
	padding-bottom: 0.25em;
	font-size: smaller;

	&:nth-child(1) {
	}

	&:nth-child(2),
	&:nth-child(3),
	&:nth-child(4),
	&:nth-child(5),
	&:nth-child(6) {
		text-align: right;
		place-content: end;
	}
	&:nth-child(7) {
		place-content: center;
	}
	&:nth-child(8) {
		padding-right: 0.5em;
	}
	&[data-value='0'] {
		color: #0003;
	}
}
</style>
