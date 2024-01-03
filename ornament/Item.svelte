<script>
	import data from '/data/ornaments.min.json';
	import { resize_img } from '/_share/u.js';
	import Meta from './Meta.svelte';

	export let item = {};

	let keys = data.keys;

	const rarity_map = keys.rarity.reduce((all, i, index) => {
		all[i] = index;
		return all;
	}, {});

	let img = `https://media.zlongame.com/media/news/cn/tdj/info/data/accessories/${item.icon}.png`;
	let imgs = [
		resize_img(img, 64),
		resize_img(img, 128),
	];

	function gen_class(obj) {
		return [
			` position-${obj.position}`,
			` rarity-${rarity_map[obj.rarity]}`,
			io2class(obj.job, 'job'),
			io2class(obj.type, 'type'),
		].join('');
	}

	function io2class(io_str = '', prop = 'class') {
		return io_str
			.split('')
			.map((i, index) => !!(+i) ? ` ${prop}-${index}` : '')
			.join('');
	}

</script>



<tr class="item {gen_class(item)}" data-info="{item.name} {item.desc}">
	<td class="avatar" data-position={keys.position[item.position]}>
		<div class="img-box" data-position={keys.position[item.position]}>
			<img
				src={imgs[0]}
				srcset="{imgs[0]}, {imgs[1]} 2x"
				alt={item.name}
				width="64"
				height="64"
				loading="lazy" decording="async"
			/>
		</div>
		<div class="name">
			{item.name}
		</div>
	</td>

	<td>
		<Meta
			job={item.job}
			type={item.type}
			position={keys.position[item.position]}
		/>

		<div class="desc">
			{item.desc}
		</div>
	</td>
</tr>



<style>
	.item:hover {
		--hit-op: .5;
	}

	.desc {
		white-space: pre-wrap;
		padding-top: 0.5em;
	}

	.img-box {
		position: relative;
		padding: 0.5em;
		border-radius: 0.25em;
		background-color: #9993;
		box-shadow: inset 2px 2px 8px #0003;
		overflow: hidden;

		& img {
			filter: drop-shadow(2px 2px 3px #333c);
		}

		&::before {
			content: attr(data-position);
			position: absolute;
			right: 0;
			bottom: 0;
			z-index: -1;
			padding: 0.25em;
			font-size: 12px;
			opacity: var(--hit-op, 0);
		}
	}

	td {
		padding: .25em .5em 1.5em;
		padding-bottom: 1em;
		vertical-align: top;
	}

	.avatar {
		position: relative;
		width: fit-content;
		--img-size: 64px;
		--name-fz: 1em;

		@media (max-width: 480px) {
			--img-size: 48px;
			--name-fz: .8em;
		}
	}

	.avatar img {
		width: var(--img-size);
		height: var(--img-size);
	}

	.name {
		padding-top: .25em;
		white-space: nowrap;
		text-align: center;
		font-size: var(--name-fz, 1em);
	}
</style>