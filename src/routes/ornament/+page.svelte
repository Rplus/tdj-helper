<script>
import data from '$lib/data/ornaments.min.json';
import Header from '$lib/Header.svelte';
import Filter from './Filter.svelte';
import Footer from '$lib/Footer.svelte';
import Item from './Item.svelte';

let refs = [
	{
		title: 'Official (zh-tw)',
		link: 'https://www.game-beans.com/userinfo/tdj/index.html',
		target: '_officail_tw',
	},
	{
		title: 'Official (zh-cn)',
		link: 'https://www.zlongame.com/userinfo/tdj/index.html',
		target: '_officail_cn',
	},
];
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

	<Footer time={true} {refs} />
</div>

<style>
.list {
	padding: 0;
	/* display: grid;
	grid-template-columns: 1fr auto;
	grid-template-columns: fit-content(80px) auto; */
}
</style>
