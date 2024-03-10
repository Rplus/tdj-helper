<script>
import { get_icon_image } from './ornament.js';

export let jobs = [];

// const max_len = data.keys.job.length;
const max_len = 7;

let jobs_with_img = jobs.map((job) => {
	return {
		name: job,
		img: get_icon_image(job),
	};
});
</script>

<div class="job flex">
	{#if jobs.length === max_len}
		<strong>通用</strong>
	{:else}
		{#each jobs_with_img as job}
			<img src={job.img} alt={job.name} title={job.name} width="20" height="20" />
		{/each}
	{/if}
</div>

<style>
.job {
	width: fit-content;
	align-items: center;
	flex-wrap: wrap;
	gap: 0.25em;
	color: #666a;
}
</style>
