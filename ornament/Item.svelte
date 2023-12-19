<script>
	import data from '/data/ornaments.min.json';
	import { resize_img } from '/_share/u.js';
	import Job from './Job.svelte';

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
		<div class="img-box">
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
		<Job job={item.job} />

		<div class="desc">
			{item.desc}
		</div>
	</td>
</tr>



<style>
	.desc {
		white-space: pre-wrap;
		padding-top: 0.5em;
	}

	.img-box {
		padding: 0.5em;
		border-radius: 0.25em;
		background-color: #9993;
		box-shadow: inset 2px 2px 8px #0003;

		& img {
			filter: drop-shadow(2px 2px 3px #333c);
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

		&::before {
			content: attr(data-position);
			top: 5%;
			left: -12%;
			position: absolute;
			border-radius: 0 50% 50% 0;
			border-radius: 50% 0 0 50%;
			background-color: #9996;
			opacity: 0.5;
			font-size: smaller;
			padding: 0.25em;
		}
	}

	.avatar img {
		width: var(--img-size);
		height: var(--img-size);
	}

	.name {
		padding-top: .25em;
		text-align: center;
		font-size: var(--name-fz, 1em);
	}
</style>