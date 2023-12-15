<script>
	export let row;
	// export let col;
	import data from './data.json';

	$: bgi = [
		data.icons.klass[row.klass],
		data.icons.type[row.type],
	].map(i => `url('${i}')`).join();
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