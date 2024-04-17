<script>
import { onMount } from 'svelte';
import { fetch_role_detail } from '$lib/fetch-data.js';
import { resize_img } from '$lib/u.js';
import { browser } from '$app/environment';

import Role from '../Role.svelte';
import Skills from './Skills.svelte';
import Header from '$lib/Header.svelte';

export let data;

let promise;
onMount(() => {
	promise = fetch_role_detail(data.role);
});
</script>

<Header parent_path="/role" title="英靈：{data.role?.name}" />

<Role data={data.role} type="card" />

<hr />

<a
	href={resize_img(
		`https://media.zlongame.com/media/news/cn/tdj/info/data/hero/${data.role.pic}.png`,
		960,
	)}
	rel="noopener"
	target="_img"
>
	large avater img
</a>

{#if browser}
	{#await promise}
		<p>...waiting</p>
	{:then detail_data}
		{#if detail_data}
			<Skills skills={detail_data.skill} lang={data.role.pinyin_tw ? 'tw' : 'cn'} />
		{/if}
		<details>
			<pre>{JSON.stringify(detail_data, null, 2)}</pre>
		</details>
		<hr />
		<hr />
		<hr />
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
{/if}

<style>
pre {
	white-space: pre-wrap;
}
</style>
