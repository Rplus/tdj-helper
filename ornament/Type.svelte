<script>
	export let types = [''];
</script>



<div class="flex btns">
	{#each types as type}
		<button disabled>{type}</button>
	{/each}
</div>



<style>
	.btns {
		gap: .25em;
		flex-wrap: wrap;
	}

	.btns button {
		font-size: small;
		line-height: 1;
		white-space: nowrap;
	}
</style>