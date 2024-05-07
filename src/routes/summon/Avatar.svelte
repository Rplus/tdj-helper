<script>
export let role;

import { link } from '$lib/u.js';

import Icon from './Icon.svelte';
</script>

<div class="box">
	<Icon {role} />

	<div class="name pos-r">
		<a href={link(`/summon/${role.name}`)}>
			{role.name}
		</a>
	</div>
</div>

<style>
.box {
	text-align: center;
	display: flex;
	gap: 0.5em;
	flex-direction: column;
	align-items: center;

	@media (min-width: 700px) {
		flex-direction: row;
	}
}

a:not(:hover) {
	text-decoration: none;
}
</style>
