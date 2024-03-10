<script>
export let role;
import { getContext } from 'svelte';
import { link } from '$lib/u.js';

function get_icon_url(fn = '') {
	return fn && `${link('/icon')}/${fn}.png`;
}

$: bgi = [role.career, role.prop].map((i) => `url('${get_icon_url(i)}')`).join();
</script>

<div class="icon" style="background-image: {bgi}" title="{role.career}, {role.prop}" />

<style>
.icon {
	font-size: 3rem;
	width: 1em;
	height: 1em;
	background-position: 50%, 50%;
	background-repeat: no-repeat;
	background-size: auto;
}
</style>
