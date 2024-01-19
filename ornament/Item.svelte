<script>
	import data from '/data/ornaments.min.json';
	import { resize_img } from '/_share/u.js';
	import Type from './Type.svelte';
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



<li class="item {gen_class(item)}" data-info="{item.name} {item.desc}">
	<div class="avatar">
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
	</div>

	<div class="meta flex">
		<div class="postion">
			{keys.position[item.position]}
		</div>
		∙
		<Job job={item.job} />
		∙
		<Type type={item.type} />

	</div>

	<div class="desc">
		{item.desc}
	</div>
	<!--
	-->
</li>



<style>
	.item {
		display: grid;
		grid-column: 1 / -1;
		align-items: start;
		grid-template-columns: subgrid;
		grid-template-rows: auto 1fr;
		grid-template-areas:
			"avatar meta"
			"avatar desc";
		gap: .5em min(.75em, 3vw);
		margin-bottom: 1.5em;

		/* @media (max-width: 480px) {
			grid-template-areas:
				"meta meta"
				"avatar desc";
		} */
	}

	.desc {
		grid-area: desc;
		white-space: pre-wrap;
	}

	.meta {
		grid-area: meta;
		gap: .25em;
		align-items: center;
		flex-wrap: wrap;
		padding-right: 1em;
		padding-bottom: .25em;
		border-bottom: 1px dashed #6663;
		font-size: smaller;
		color: #666a;
	}

	.img-box {
		aspect-ratio: 1;
		padding: 0.5em;
		border-radius: 0.25em;
		background-color: #9993;
		box-shadow: inset 2px 2px 8px #0003;
		overflow: hidden;

		& img {
			display: block;
			filter: drop-shadow(2px 2px 3px #333c);
		}
	}

	.avatar {
		grid-area: avatar;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		position: relative;
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