<script>
import date from '$lib/data/latest-fetch-time.txt?raw';
export let refs = [];
export let time = false;
</script>

<!-- -->
<!-- -->
<!-- -->

<hr />

<footer class="footer">
	{#if time}
		<time class="update-time">{time === true ? date : time}</time>
	{/if}

	<slot />

	{#if refs?.length}
		<ul>
			資料來源：
			{#each refs as item}
				<li>
					{item.title}
					<br />
					<a href={item.link} rel="noopener" target={item.target || '_blank'}>
						{item.link}
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</footer>

<!-- -->
<!-- -->
<!-- -->

<style>
.footer {
	position: relative;
	align-items: center;
	font-family: monospace;
	word-break: break-all;
	padding-bottom: 1em;

	& ul {
		float: right;
		padding: 1em 0 1em 1em;
		opacity: 0.75;
		font-size: smaller;
	}

	& li {
		margin-top: 0.25em;
		margin-bottom: 0.5em;
	}
}

.update-time {
	position: absolute;
	opacity: 0.5;
	font-family: monospace;
	font-size: small;
	padding-bottom: 2em;

	&::before {
		content: 'Latest update: ';
	}
}
</style>
