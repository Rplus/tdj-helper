<script>
import { onMount } from 'svelte';
import { fetch_role_detail } from '$lib/fetch-data.js';
import { link } from '$lib/u.js';

import Role from '../Role.svelte';
import Header from '$lib/Header.svelte';
export let data;

let promise;
onMount(() => {
	promise = fetch_role_detail(data.role);
});
</script>

<Header parent_path="/role" title="英靈：{data.role?.name}" />

<Role data={data.role} type="card" />

{#await promise}
	<p>...waiting</p>
{:then detail_data}
	<pre>{JSON.stringify(detail_data, null, 2)}</pre>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

<style>
pre {
	/* white-space: pre-wrap; */
}
</style>
