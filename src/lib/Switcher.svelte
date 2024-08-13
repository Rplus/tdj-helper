<script>
export let left_label = '';
export let right_label = '';
export let checked = false;
import { link } from '$lib/u.js';
</script>

<input class="visually-hidden" type="checkbox" bind:checked id="switcher" />

<label
	class="switcher"
	class:active={checked}
	data-left-label={left_label}
	data-right-label={right_label}
	for="switcher"
/>

<style>
.switcher {
	font-size: 2em;
	font-family: monospace;
	cursor: pointer;
	gap: 0.5em;

	&.active {
		--left: 0;
		--right: 0.5;
	}

	&::before {
		content: attr(data-left-label);
		padding: 0.125em 0.25em;
		background-color: rgba(255, 255, 150, var(--right, 0));
	}
	&::after {
		content: attr(data-right-label);
		padding: 0.125em 0.25em;
		background-color: rgba(255, 255, 150, var(--left, 0.5));
	}
}
</style>
