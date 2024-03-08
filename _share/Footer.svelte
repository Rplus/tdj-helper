<script>
	import date from '/data/latest-fetch-time.txt?raw';
	export let refs = [];
</script>



<footer class="footer">
	<time class="update">{date}</time>

	<slot />

	{#if refs}
		<ul>
			資料來源：
			{#each refs as item}
				<li>
					{item.title}
					<br>
					<a href={item.link} rel="noopener" target={item.target || '_blank'}>
						{item.link}
					</a>
				</li>
			{/each}
		</ul>
	{/if}

</footer>



<style>
	time {
		position: absolute;
		opacity: .5;
		font-family: monospace;
		font-size: small;

		&::before {
			content: 'Latest update: ';
		}
	}
</style>