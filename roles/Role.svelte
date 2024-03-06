<script>
	export let data = {};
	export let max_status;
	import Avatar from './Avatar.svelte';
	import NumberBar from './NumberBar.svelte';
</script>



<div class="role" id={data.name}
	data-rarity={data.rarity}
	data-career={data.career}
	data-prop={data.prop}
	data-search={data.name}
>
	<Avatar role={data} />

	{#each max_status as status}
		<NumberBar number={data.status[status.prop]} max={status.max} />
	{/each}

</div>



<style>
	:global(.role) {
		grid-column: 1 / -1;
		display: grid;
		grid-template-columns: subgrid;
		margin-bottom: 1em;
		align-items: center;
		gap: .25em;
	}
</style>