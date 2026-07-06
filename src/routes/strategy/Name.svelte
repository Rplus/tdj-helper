<script>
export let name = '';
export let href = '';

$: name_split = name.match(/(·)?.{1,2}/g);
</script>

<span class="name">
	{#if href}
		<a {href}>
			{#each name_split as n}
				{n}<wbr>
			{/each}
		</a>
	{:else}
		{#each name_split as n}
			{n}<wbr>
		{/each}
	{/if}
</span>

<style>
.name {
	font-size: 0.85rem;
	line-height: 1.1;
	word-break: keep-all;
}
</style>
