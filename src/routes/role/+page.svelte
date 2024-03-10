<script>
import data from '$lib/data/roles.json';
import Name from './Name.svelte';
import Footer from '$lib/Footer.svelte';

function ccc() {
	console.log(document.title);
}

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
		// }, {
		// 	title: 'Bili-Wiki',
		// 	link: 'https://wiki.biligame.com/tdj/',
		// 	target: '_biliwiki',
	},
];
</script>

<svelte:head>
	<title>Roles</title>
	<meta name="description" content="Roles" />
</svelte:head>

<div>
	<h2 on:click={ccc}>Roles</h2>

	{#each data as role}
		<Name name={role.name} />
	{/each}
</div>

<Footer {refs} />
