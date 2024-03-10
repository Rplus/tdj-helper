<script>
export let name = '';
export let href = '';

import { link } from '$lib/u.js';

$: name_split = name.match(/(·)?.{1,2}/g);
</script>

<span class="name">
	{#if href}
		<a {href}>
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
	font-size: 0.85rem;
	line-height: 1.1;
}
</style>
