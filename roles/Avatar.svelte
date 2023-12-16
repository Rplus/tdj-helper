<script>
	export let row;
	export let col;
	import Icon from './Icon.svelte';
</script>



<div class="flex">
	<Icon row={row} />

	<img width="50" height="50" loading="lazy" decording="async"
	 src={row.avatar.src} alt={row.name}
	/>

	<a href={row.link} target="_biliwiki">
		{row.name}
	</a>
</div>

<style>
	.flex {
		display: flex;
		align-items: center;
		gap: .5em;
	}


	a {
		color: #339;

		&:not(:hover) {
			text-decoration: none;
		}
	}
</style>