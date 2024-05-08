<script>
export let stars = ['', '', '', '', '', ''];
export let name = '';
export let img = '';

import { clear_html, get_img } from '$lib/u.js';
import MultiLv from '$lib/MultiLv.svelte';
import MediaObj from '$lib/MediaObj.svelte';
import Img from '$lib/Img.svelte';
</script>

<MediaObj mobile_align="center">
	<Img
		slot="img"
		src={get_img('inherent', img, 64)}
		alt={name}
		width="64"
		height="64"
	/>

	<svelte:fragment slot="name">
		{name}
	</svelte:fragment>

	<svelte:fragment slot="info">
		<MultiLv name="lv" lvs={stars.map(clear_html)} />
	</svelte:fragment>
</MediaObj>
