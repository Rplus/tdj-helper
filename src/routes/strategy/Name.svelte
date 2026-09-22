<script>
export let name = '';
export let href = '';

import SplitTitle from '$lib/SplitTitle.svelte';

</script>

<span class="name">
	{#if href}
		<a {href}>
			<SplitTitle string={name} />
		</a>
	{:else}
		<SplitTitle string={name} />
	{/if}
</span>

<style>
.name {
	font-size: 0.85rem;
	line-height: 1.1;

	@media (max-width: 900px) {
		max-width: 4em;
	}
}
</style>
