<script>
export let data = {};
export let type = 'list';
import Avatar from './Avatar.svelte';
import NumberBar from './NumberBar.svelte';
import { max_status } from './role.js';

let order_style = Object.keys(data.status)
	.map((prop) => `--${prop}: ${data.status[prop]}`)
	.join(';');
</script>

<div
	class="role type-{type}"
	id={data.name}
	data-rarity={data.rarity}
	data-career={data.career}
	data-prop={data.prop}
	data-search={data.name}
	style={order_style}
>
	<Avatar role={data} />

	{#each max_status as status}
		<NumberBar
			number={data.status[status.prop]}
			max={status.max}
			label={status.label}
			type={type}
		/>
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

	&.type-card {
		max-width: 400px;
		/* grid-template-columns: 180px auto; */
		grid-template-rows: repeat(7, auto);
		margin: 0 auto;

		& .box {
			grid-row: 1 / -1;
		}
	}
}

/* trick for anchor target with sticky header */
.role:target {
	padding-top: 2em;
	margin-top: -2em;
}

</style>
