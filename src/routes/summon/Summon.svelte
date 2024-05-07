<script>
export let data = {};
export let type = 'list';
import Avatar from './Avatar.svelte';
import { status_props } from './summon.js';

let order_style = status_props
	.map((prop, index) => {
		return `--${prop.prop}: ${data.stats[index]}`;
	})
	.join(';');
</script>

<div
	class="role type-{type}"
	id={data.name}
	data-rarity={data.rarity}
	data-career={data.career}
	data-prop={data.prop}
	data-search={data.name}
	style={order_style || ''}
>
	<Avatar role={data} />

	{#each data.stats as stat}
		<div class="text-right">
			{#if stat > 100}
				<strong>{stat}%</strong>
			{:else}
				{stat}%
			{/if}
		</div>
	{/each}
</div>

<style>
:global(.role) {
	display: grid;

	&.type-list {
		grid-column: 1 / -1;
		grid-template-columns: subgrid;
		margin-bottom: 1em;
		align-items: center;
		gap: 0.25em;
	}
}

/* trick for anchor target with sticky header */
.role:target {
	padding-top: 2em;
	margin-top: -2em;
}
</style>
