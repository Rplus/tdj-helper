<script>
export let stars = ['', '', '', '', '', ''];

import { clear_html } from '$lib/u.js';
import MultiLv from '$lib/MultiLv.svelte';
</script>

<MultiLv name="lv" lvs={stars.map(clear_html)} />
