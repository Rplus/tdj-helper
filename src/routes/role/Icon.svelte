<script>
	export let role;
	import { getContext } from 'svelte';

	let folder = getContext('icon_folder');

	function get_icon_url(fn = '') {
		return fn && `${folder}/${fn}.png`;
		// return fn && get_asset_url(`/src/lib/images/icon/${fn}.png`);
	}

	// function get_asset_url(path = '') {
	// 	return new URL(path, import.meta.url).href;
	// }

	$: bgi = [
		role.career,
		role.prop,
	].map(i => `url('${get_icon_url(i)}')`).join();
</script>


<div class="icon"
	style="background-image: {bgi}"
	title="{role.career}, {role.prop}"
/>



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