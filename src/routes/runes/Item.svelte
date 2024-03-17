<script>
import { getProp, cloneObj, DefailtItem } from './u.js';

import { oriProps } from './stores.js';

export let position = '天';
export let item = cloneObj(DefailtItem);

$: [max, min] = getProp(item.prop).range[position] || [];
</script>

<div class="flex list-item">
	<select bind:value={item.prop}>
		{#each $oriProps as _prop}
			<option value={_prop.label}>
				{_prop.label + ' ' + _prop.score}
			</option>
		{/each}
	</select>

	<input type="number" {max} {min} bind:value={item.value} />

	<div class="flex">
		<input type="range" {max} {min} bind:value={item.value} style={`--max: ${max};`} />
	</div>
</div>

<style>
.list-item > * {
	flex-grow: 1;
}

input[type='number'] {
	width: 4em;
	margin-left: 0.25em;
	margin-right: 0.25em;
	text-align: center;
}

input[type='range'] {
	width: calc(100% * var(--max) / 10);
}
</style>
