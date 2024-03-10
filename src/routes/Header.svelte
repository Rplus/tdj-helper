<script>
import { page } from '$app/stores';
import { base } from '$app/paths';

let pages = [
	{
		path: '/',
		title: '../',
	},
	{
		path: '/about',
		title: 'About',
	},
	{
		path: '/role',
		title: '角色',
	},
	{
		path: '/strategy',
		title: '戰陣',
	},
];
</script>

<header>
	<nav>
		<ul>
			{#each pages as _page}
				<li aria-current={$page.url.pathname === _page.path ? 'page' : undefined}>
					<a href="{base}{_page.path}">{_page.title}</a>
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
