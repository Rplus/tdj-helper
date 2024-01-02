<script>
	import data from '/data/ornaments.min.json';
	import { resize_img } from '/_share/u.js';
	import { get_icon_image } from './u.js';

	export let job = '';
	export let position = '';

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
	{position} /
	{#if jobs.length === max_len}
		<strong>通用</strong>

	{:else}
		{#each jobs as job}
			<img src={job.img} alt={job.name} title={job.name} width="20" height="20">
		{/each}
	{/if}
</div>



<style>
	.job {
		width: fit-content;
		padding-right: 1em;
		padding-bottom: 0.25em;
		border-bottom: 1px dashed #6663;
		gap: .25em;
		color: #666a;
	}
</style>