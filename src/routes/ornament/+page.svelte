<script>
import { get_refs } from '$lib/fetch-data.js';
import data from '$lib/data/ornaments.min.json';

import Header from '$lib/Header.svelte';
import Filter from './Filter.svelte';
import Footer from '$lib/Footer.svelte';
import Item from './Item.svelte';

</script>

<div class="workspace">
	<Header title="飾品圖鑑" />

	<Filter keys={data.keys} />

	<hr />

	<ul class="list">
		{#each data.items as item (item.name)}
			<Item {item} />
		{/each}
	</ul>

	<Footer time={true} refs={get_refs([1, 1, 0])} />
</div>

<style>
.list {
	padding: 0;
	/* display: grid;
	grid-template-columns: 1fr auto;
	grid-template-columns: fit-content(80px) auto; */
}
</style>
