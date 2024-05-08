<script>
export let weapon = [];

import { clear_html, get_img } from '$lib/u.js';
import MultiLv from '$lib/MultiLv.svelte';
import MediaObj from '$lib/MediaObj.svelte';
import Img from '$lib/Img.svelte';

let descs = weapon.map((w) => clear_html(w.desc));
</script>

{#if weapon && weapon[0]}
	<MediaObj mobile_align="center">
		<Img
			slot="img"
			src={get_img('weapon', weapon[0].img, 64)}
			alt={weapon[0].name}
			width="64"
			height="64"
		/>

		<svelte:fragment slot="name">
			{weapon[0].name}
		</svelte:fragment>

		<svelte:fragment slot="info">
			<MultiLv lvs={descs} name="weapon" />
		</svelte:fragment>
	</MediaObj>
{/if}
