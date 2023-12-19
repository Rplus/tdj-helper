<script>
	import data from '/data/ornaments.min.json';
	import Item from './Item.svelte';
	import Filter from './Filter.svelte';
</script>



<div class="workspace">
	<h1>
		<a href="../" title="back">../</a>
		天地劫M 飾品圖鑑
	</h1>

	<Filter />

	<table>
		{#each data.items as item (item.name)}
			<Item item={item} />
		{/each}
	</table>

	<hr>

	<section class="footer">
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
	</section>
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

	.footer {
		width: fit-content;
		float: right;
		text-align: left;
		margin: 2em 0;
		padding-bottom: 1em;
		font-family: monospace;

		& ul {
			padding: 0;
			margin: 0;
		}
		& li {
			margin-top: 0.5em;
		}
	}

	h1 {
		text-align: center;
		padding-bottom: 0.5em;
		border-bottom: 1px dotted #0003;
	}
</style>