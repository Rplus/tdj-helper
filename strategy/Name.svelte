<script>
	export let name = '';
	export let is_role = false;

	$: name_split = name.match(/(·)?.{1,2}/g);
</script>



<span class="name">
	{#if is_role}
		<a href="../roles/#{name}">
			{#each name_split as n}
				<span class="inline-block">{n}</span>
			{/each}
		</a>
	{:else}
		{#each name_split as n}
			<span class="inline-block">{n}</span>
		{/each}
	{/if}
</span>



<style>
	.name {
		font-size: .85rem;
		line-height: 1.1;
	}
</style>
