<script>
import { page } from '$app/stores';
import { base } from '$app/paths';
import { link } from '$lib/u.js';

let pages = [
	{
		path: '/',
		title: '../',
	},
	{
		path: '/info',
		title: 'Info',
	},
	{
		path: '/role',
		title: '英靈',
	},
	{
		path: '/strategy',
		title: '戰陣',
	},
	{
		path: '/ornament',
		title: '飾品',
	},
];
</script>

<header>
	<nav>
		<ul>
			{#each pages as _page}
				<li aria-current={$page.url.pathname === _page.path ? 'page' : undefined}>
					<a href={link(_page.path)}>{_page.title}</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>

<style>
li[aria-current='page'] {
	list-style: circle;
}
</style>
