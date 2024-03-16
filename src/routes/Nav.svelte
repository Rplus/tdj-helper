<script>
import { page } from '$app/stores';
import { base } from '$app/paths';
import { beforeNavigate } from '$app/navigation';
import { link } from '$lib/u.js';

let pages = [
	{
		path: link('/'),
		title: '⮌',
	},
	// {
	// 	path: link('/info'),
	// 	title: 'Info',
	// },
	{
		path: link('/role'),
		title: '英靈',
	},
	{
		path: link('/strategy'),
		title: '戰陣',
	},
	{
		path: link('/ornament'),
		title: '飾品',
	},
];

let details;
beforeNavigate((e) => {
	details.open = false;
});
</script>

<nav>
	<details bind:this={details}>
		<summary>☰</summary>
		<ul>
			{#each pages as _page}
				<li aria-current={$page.url.pathname === _page.path ? 'page' : undefined}>
					<a href={_page.path}>{_page.title}</a>
				</li>
			{/each}
		</ul>
	</details>
</nav>

<style>
details {
	border: 1px solid;
	border-radius: 0.25em;
	background-color: var(--main-bgc);
	position: sticky;
	line-height: 1.3;
	z-index: 10;
	color: color-mix(in srgb, var(--main-color) 40%, #0000);
}

summary {
	/* opacity: .5; */
	cursor: pointer;
	padding: 0.25em 0.5em;
	/* background-color: #f00; */
}

summary::marker {
	content: '';
}

ul {
	margin: 0.25em 1em 1em;
	padding-inline-start: 1.5em;
}

li {
	list-style: circle;

	&[aria-current='page'] {
		list-style: square;
	}
}

nav {
	position: absolute;
}
</style>
