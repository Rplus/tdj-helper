<script>
import { page } from '$app/stores';
import { base } from '$app/paths';
import { link } from '$lib/u.js';

let pages = [
	{
		path: link('/'),
		title: '../',
	},
	{
		path: link('/info'),
		title: 'Info',
	},
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
</script>

<header>
	<nav>
		<ul>
			{#each pages as _page}
				<li aria-current={$page.url.pathname === _page.path ? 'page' : undefined}>
					<a href={_page.path}>{_page.title}</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>

<style>
li[aria-current='page'] {
	list-style: circle;
}

nav {
	position: absolute;
}
</style>
