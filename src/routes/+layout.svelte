<script>
import Nav from './Nav.svelte';
import './styles.css';
</script>

<div class="app">
	<Nav />

	<main>
		<slot />
	</main>
</div>

<style>
</style>
