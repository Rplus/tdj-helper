<script>
	export let row;

	$: bgi = [
		row.career,
		row.prop,
	].map(i => `url('/icon/${i}.png')`).join();
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