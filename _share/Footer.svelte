<script>
	export let refs = [];
</script>



<footer class="footer">
	<slot />

	{#if refs}
		<ul>
			資料來源：
			{#each refs as item}
				<li>
					{item.title}
					<br>
					<a href={item.link} target={item.target || '_blank'}>
						{item.link}
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</footer>
