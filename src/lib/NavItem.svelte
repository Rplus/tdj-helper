<script>
import { link } from '$lib/u.js';
export let next = '';
export let prev = '';
export let cate = 'role';
</script>

<nav class="nav">
	{#if prev}
		<a class="nav-link nav-link--prev" href={link(`/${cate}/${prev}`)}>
			🠋 {prev}
		</a>
	{/if}

	{#if next}
		<a class="nav-link nav-link--next" href={link(`/${cate}/${next}`)}>
			🠉{next}
		</a>
	{/if}
</nav>

<style>
.nav-link {
	position: fixed;
	top: 12%;
	writing-mode: vertical-lr;
	padding: 0.5em;
	background-image: linear-gradient(#9996, #9996);
	background-size: 100% 2em;
	background-repeat: no-repeat;
	line-height: 1;
	opacity: 0.3;
	transition: opacity 0.3s;

	&:hover {
		opacity: 0.75;
	}

	&.nav-link--prev {
		left: 0;
	}
	&.nav-link--next {
		right: 0;
	}

	@media (max-width: 500px) {
		display: none;
	}
}
</style>
