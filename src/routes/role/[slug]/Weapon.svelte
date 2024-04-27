<script>
export let weapon = [];

import { clear_html, get_img } from '$lib/u.js';
import MultiLv from '$lib/MultiLv.svelte';

let descs = weapon.map((w) => clear_html(w.desc));
</script>

{#if weapon && weapon[0]}
	<div class="flex" style="gap: 1em;">
		<div class="text-center">
			<img src={get_img('weapon', weapon[0].img, 64)} alt={weapon[0].name} />
			<br />
			{weapon[0].name}
		</div>

		<MultiLv lvs={descs} name="weapon" />
	</div>
{/if}

<style>
.flex {
	gap: 1em;

	@media (max-width: 500px) {
		flex-direction: column;
	}
}
</style>
