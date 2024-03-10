<script>
export let parent_path = '/';
export let title = '';
import { link } from '$lib/u.js';
</script>

<svelte:head>
	<title>{title} :: 天地劫M ::</title>
	<meta name="description" content={title} />
</svelte:head>

<h1>
	<slot>
		<a href={link(parent_path)} title="back">../</a>
		<ruby>
			{title}
			<rt>天地劫M</rt>
		</ruby>
	</slot>
</h1>

<style>
h1 {
	text-align: center;
	padding-bottom: 0.5em;
	border-bottom: 1px dotted #6663;
}
</style>
