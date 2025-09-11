<script>
import Header from '$lib/Header.svelte';
import Footer from '$lib/Footer.svelte';
import Img from '$lib/Img.svelte';
import { onMount } from 'svelte';

import { resize_img } from '$lib/u.js';

// import data from './data.json';
import data from '$lib/data/state.min.json';

const refs = [
	{
		title: '狀態分類 | biligame',
		link: 'https://wiki.biligame.com/tdj/状态',
		target: '_blank',
	},
];

let sort_prop = '';
let sort_dir = -1;
let sort_style = ``;
function sort_by_prop(prop = '') {
	console.log('sort_by_prop');
	if (!prop) {
		sort_style = '';
	}
	if (sort_prop === prop) {
		sort_dir = -sort_dir;
	} else {
		sort_prop = prop;
		sort_dir = -1;
	}
	sort_style = `.item {
		order: calc(var(--${prop}) * ${sort_dir});
	}`;
}

let order = {
	name: [],
	cate: [],
	// desc: [],
	dispellable: [],
	extendable: [],
	stealable: [],
};

data.forEach(item => {
	for (let prop in item) {
		order[prop]?.push(item[prop]);
	}
});

data.sort((a,b) => a.name.localeCompare(b.name))

for (let prop in order) {
	order[prop] = [...new Set(order[prop])].sort();
}

function get_index(prop, value) {
	return order[prop].indexOf(value);
}

let filter_name = '';
let filter_desc = '';
let filter_style = '';

$: {
	filter_row(filter_name, filter_desc);
}

function filter_row(filter_name, filter_desc) {
	if (!filter_name && !filter_desc) {
		filter_style = ''
		return;
	}

	let _style_name = '';
	let _style_desc = '';
	if (filter_name) {
		_style_name = `.item.data:not([name*="${filter_name}"]) { display: none; }`;
	}

	if (filter_desc) {
		_style_desc = `.item.data:not([data-desc*="${filter_desc}"]) { display: none; }`;
	}

	filter_style = _style_name + _style_desc;
}

onMount(() => {
	if (location.hash) {
		let target = document.querySelector(decodeURIComponent(location.hash));
		let title_height = document.querySelector('.title.item').offsetHeight;
		window.scrollTo(0, target.offsetTop - title_height);
		// console.log(123, target.offsetTop, title_height);
		// document.querySelector(decodeURIComponent(location.hash))?.scrollIntoView();
	}
})

</script>

<div class="workspace">
	<Header title="狀態列表" />
	<svelte:element this="style">{sort_style}</svelte:element>
	<svelte:element this="style">{filter_style}</svelte:element>

	<div class="filter flex jc-sb mb-1">
		<div>
			<input type="search" name="name" bind:value={filter_name} placeholder="🔍︎ 名稱">
		</div>
		<div>
			<input type="search" name="desc" bind:value={filter_desc} placeholder="🔍︎描述">
		</div>
	</div>

	<ul class="list" data-dir={sort_dir}
		style="--dir-char: '{sort_dir === 1 ? '▲' : '▼' }'">
		<li class="title item">
			<div class="name text-left"
				class:active={sort_prop === 'name'}
				on:click={() => sort_by_prop('name')}
			>
				名稱
			</div>
			<div
				class="cate"
				class:active={sort_prop === 'cate'}
				on:click={() => sort_by_prop('cate')}
			>
				類別
			</div>

			<div
				class:active={sort_prop === 'dispellable'}
				on:click={() => sort_by_prop('dispellable')}
			>
				驅散
			</div>

			<div
				class:active={sort_prop === 'extendable'}
				on:click={() => sort_by_prop('extendable')}
			>
				擴散
			</div>

			<div
				class:active={sort_prop === 'stealable'}
				on:click={() => sort_by_prop('stealable')}
			>
				偷取
			</div>

			<div class="desc"
				on:click={() => sort_by_prop()}
			>
				描述
			</div>
		</li>
	{#each data as item}
		<li
			id={item.name}
			name={item.name}
			data-desc={item.desc}
			class="item data"
			style="--dispellable:{Number(item.dispellable)};--extendable:{Number(item.extendable)};--stealable:{Number(item.stealable)};
				--name:{get_index('name', item.name)};
				--cate:{get_index('cate', item.cate)};
			"
		>
			<div class="name text-left">{item.name}</div>
			<div class="cate" data-cate={item.cate}></div>
			<div class="dispellable" data-boolean={item.dispellable}></div>
			<div class="extendable" data-boolean={item.extendable}></div>
			<div class="stealable" data-boolean={item.stealable}></div>
			<div class="desc text-left">{item.desc}</div>
		</li>
	{/each}
	</ul>


	<!-- <svelte:element this="style"></svelte:element> -->
</div>

<Footer time={true} {refs} />

<style>
	.list {
		padding: 0;
		margin: 0 auto;
		display: grid;
		text-align: center;
		grid-template-columns: 100px 6em repeat(3, 4em) 1fr;
	}

	.title {
		position: sticky;
		top: 0;
	}

	.title.item {
		white-space: nowrap;
		background-color: #ccc;
		order: -2000;
		cursor: pointer;
		padding: 0;

		& > div {
			padding: 0.5em;

			&:hover {
				background-color: #0001;
			}
		}
	}

	.item {
		display: grid;
		grid-column: 1 / -1;
		grid-template-columns: subgrid;
		padding: 0.25em 0 .5em;
		border-bottom: 1px dotted #0005;

		@media (max-width: 720px) {
			grid-template-columns: 100px repeat(3, 1fr);

			& .desc {
				grid-column: 2 / -1;
				grid-row: 1;
				padding-bottom: 1em;
			}

			& .cate {
				grid-row: 2;
				text-align: left;
				opacity: 0.5;
			}
		}

		&:not(.title):hover {
			background-color: #0001;
		}

		& > div {
			padding: 0em .5em;
		}

		&:target {
			background-color: #ff02;
		}
	}

	[data-cate] {
		white-space: nowrap;

		&[data-cate]::before {
			content: '-';
			text-transform: capitalize;
		}

		&[data-cate="有害"]::before {
			content: '☣️ debuff';
		}
		&[data-cate="有益"]::before {
			content: '❤️ buff';
		}
	}

	div[data-boolean] {
		&::before {
			content: '-';
		}
		&[data-boolean="true"]::before {
			content: '✅';
		}
	}


	.title .active::before {
		content: '';
		content: var(--dir-char);
		position: absolute;
		margin-left: -.75em;
	}
	[data-dir='-1'] .title .active::before {
		/* content: '▼'; */
	}
	[data-dir='1'] .title .active::before {
		/* content: '▲'; */
	}


</style>
