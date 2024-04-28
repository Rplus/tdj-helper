<script>
export let item = {};

import { keys } from './ornament.js';
import { get_img, get_imgs, resize_img } from '$lib/u.js';
import Type from './Type.svelte';
import Job from './Job.svelte';
import MediaObj from '$lib/MediaObj.svelte';

function io2prop(io_str = '01', prop) {
	return io_str
		.split('')
		.map((i, index) => (!!+i ? keys[prop][index] : ''))
		.filter(Boolean);
}

$: types = io2prop(item.type, 'type');
$: jobs = io2prop(item.job, 'job');
$: position = keys.position[item.position];

let imgs = get_imgs('accessories', item.icon, [64, 128]);
</script>

<li class="item">
	<MediaObj>
		<img
			src={imgs[0]}
			srcset="{imgs[0]} 1x, {imgs[1]} 2x"
			alt={item.name}
			width="64"
			height="64"
			loading="lazy"
			decording="async"
			slot="img"
		/>

		<svelte:fragment slot="name">
			{item.name}
		</svelte:fragment>

		<svelte:fragment slot="info">
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
		</svelte:fragment>
	</MediaObj>
</li>

<style>
.item {
	list-style: none;
	margin-block-end: 1.5em;

	@media (max-width: 480px) {
		--img-size: 48px;
		--name-fz: 0.8em;
	}
}

.desc {
	white-space: pre-wrap;
}

.meta {
	gap: 0.25em;
	align-items: center;
	margin-block-end: 0.5em;
	padding-right: 1em;
	padding-bottom: 0.25em;
	border-bottom: 1px dashed #6663;
	font-size: smaller;
	color: #666a;
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
