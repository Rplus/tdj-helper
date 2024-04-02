<script>
import { keys } from './ornament.js';
import { resize_img } from '$lib/u.js';
import Type from './Type.svelte';
import Job from './Job.svelte';

export let item = {};

function io2prop(io_str = '01', prop) {
	return io_str
		.split('')
		.map((i, index) => (!!+i ? keys[prop][index] : ''))
		.filter(Boolean);
}

$: types = io2prop(item.type, 'type');
$: jobs = io2prop(item.job, 'job');
$: position = keys.position[item.position];

let img = `https://media.zlongame.com/media/news/cn/tdj/info/data/accessories/${item.icon}.png`;
let imgs = [resize_img(img, 64), resize_img(img, 128)];
</script>

<li
	class="item"
	data-rarity={item.rarity}
	data-position={position}
	data-type={types}
	data-job={jobs}
	data-search="{item.name} {item.desc}"
>
	<div class="avatar">
		<div class="img-box">
			<img
				src={imgs[0]}
				srcset="{imgs[0]}, {imgs[1]} 2x"
				alt={item.name}
				width="64"
				height="64"
				loading="lazy"
				decording="async"
			/>
		</div>
		<div class="name">
			{item.name}
		</div>
	</div>

	<div class="meta flex">
		<div class="postion">
			{position}
		</div>
		∙
		<Job {jobs} />
		∙
		<Type {types} />
	</div>

	<div class="desc">
		{item.desc}
		{#if item.set}
			<details>
				<div class="set">
					{item.set}
				</div>
			</details>
		{/if}
	</div>
</li>

<style>
:global(.item) {
	display: grid;
	grid-column: 1 / -1;
	align-items: start;
	grid-template-columns: subgrid;
	grid-template-rows: auto 1fr;
	grid-template-areas:
		'avatar meta'
		'avatar desc';
	gap: 0.5em min(0.75em, 3vw);
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
	gap: 0.25em;
	align-items: center;
	flex-wrap: wrap;
	padding-right: 1em;
	padding-bottom: 0.25em;
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
	grid-row: 1 / -1;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	position: relative;
	--img-size: 64px;
	--name-fz: 1em;

	@media (max-width: 480px) {
		--img-size: 48px;
		--name-fz: 0.8em;
	}
}

.avatar img {
	width: var(--img-size);
	height: var(--img-size);
}

.name {
	padding-top: 0.25em;
	white-space: nowrap;
	text-align: center;
	font-size: var(--name-fz, 1em);
}

details {
	font-size: smaller;
	margin-top: 0.5em;
	line-height: 1.3;
	color: #666;
}

.set {
	padding-left: 0.5em;
}
</style>
