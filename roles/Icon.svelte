<script>
	export let row;
	import { getContext } from 'svelte';

	let folder = getContext('icon_folder');

	$: bgi = [
		row.career,
		row.prop,
	].map(i => `url('${folder}/${i}.png')`).join();
</script>



<div class="icon"
	style="background-image: {bgi}"
	title="{row.klass}, {row.type}"
/>



<style>
	.icon {
		font-size: 3rem;
		width: 1em;
		height: 1em;
		background-position: 50%, 50%;
		background-repeat: no-repeat;
		background-size: auto;
	}
</style>