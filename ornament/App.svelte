<script>
	import data from '/data/ornaments.min.json';
	import Item from './Item.svelte';
	import Filter from './Filter.svelte';
	import '../_share/Theme.js';
</script>



<div class="workspace">
	<h1>
		<a href="../" title="back">../</a>
		<ruby>
			飾品圖鑑
			<rt>天地劫M</rt>
		</ruby>
	</h1>

	<Filter />

	<hr>

	<ul class="list">
		{#each data.items as item (item.name)}
			<Item item={item} />
		{/each}
	</ul>

	<hr>

	<footer class="footer">
		<ul>
			資料來源：
			<li>
				Official (zh-cn)<br>
				<a href="https://www.zlongame.com/userinfo/tdj/index.html" target="_tdj">
					https://www.zlongame.com/userinfo/tdj/index.html
				</a>
			</li>
			<li>
				BWiki<br>
				<a href="https://wiki.biligame.com/tdj/%E9%A5%B0%E5%93%81%E5%9B%BE%E9%89%B4" target="_biliwiki">
					https://wiki.biligame.com/tdj/
				</a>
			</li>
		</ul>
	</footer>
</div>



<style>
	table {
		table-layout: fixed;
		border-collapse: collapse;
	}

	.workspace {
		max-width: 50rem;
		margin: 0 auto;
	}

	h1 {
		text-align: center;
		padding-bottom: 0.5em;
		border-bottom: 1px dotted #0003;
	}

	.list {
		padding: 0;
		display: grid;
		grid-template-columns: 1fr auto;
		grid-template-columns: fit-content(80px) auto;
	}
</style>