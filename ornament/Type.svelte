<script>
	import data from '/data/ornaments.min.json';
	export let type = '';

	let types = [...type].map((i, index) => +i && data.keys.type[index]).filter(Boolean);

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