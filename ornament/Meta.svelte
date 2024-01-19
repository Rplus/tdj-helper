<script>
	import data from '/data/ornaments.min.json';
	import { resize_img } from '/_share/u.js';
	import { get_icon_image } from './u.js';

	export let job = '';
	export let position = '';
	export let type = '';

	let types = [...type].map((i, index) => +i && data.keys.type[index]).filter(Boolean);

	const max_len = data.keys.job.length;

	let jobs = get_job();

	function get_job() {
		return [...job].map((i, index) => {
			if (i === '0') {
				return null;
			}
			let name = data.keys.job[index];
			return {
				name,
				img: resize_img(get_icon_image(name), 32),
			};
		})
		.filter(Boolean);
	}

</script>


<div class="job flex">
	{position}

	∙

	{#if jobs.length === max_len}
		<strong>通用</strong>

	{:else}
		{#each jobs as job}
			<img src={job.img} alt={job.name} title={job.name} width="20" height="20">
		{/each}
	{/if}

	∙

	<div class="flex btns">
		{#each types as type}
			<button disabled>{type}</button>
		{/each}
	</div>
</div>



<style>
	.job {
		width: fit-content;
		align-items: center;
		padding-right: 1em;
		padding-bottom: 0.25em;
		border-bottom: 1px dashed #6663;
		gap: .25em;
		color: #666a;
	}

	.btns {
		gap: .25em;
	}

	.btns button {
		font-size: small;
		line-height: 1;
	}
</style>