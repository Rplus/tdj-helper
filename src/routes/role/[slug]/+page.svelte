<script>
// import { onMount } from 'svelte';
import { fetch_role_detail, get_refs } from '$lib/fetch-data.js';
import { resize_img } from '$lib/u.js';
import { browser } from '$app/environment';
import { handle_skills } from './skill.js';
// import { link } from '$lib/u.js';

import Role from '../Role.svelte';
import Skills from './Skills.svelte';
import Inherent from './Inherent.svelte';
import Weapon from './Weapon.svelte';
import Summons from './Summons.svelte';
import Header from '$lib/Header.svelte';
import NavItem from '$lib/NavItem.svelte';
import Footer from '$lib/Footer.svelte';

export let data;

let promise;

$: {
	if (browser) {
		promise = fetch_role_detail(data.role);
	}
}
</script>

<Header parent_path="/role" title="英靈：{data.role?.name}" />

<Role data={data.role} type="card" />

<NavItem prev={data.role.siblings.prev} next={data.role.siblings.next} cate="role" />

{#if browser}
	{#await promise}
		<div style="min-height: 80vh;">
			<div class="mb-2"></div>
			<div class="hr">...waiting ⏳</div>
			<div class="mb-2"></div>
		</div>
	{:then detail_data}
		{#if detail_data}
			<div class="mb-2" />

			<div class="hr" style="--ratio: 0.125;">天賦</div>

			<Inherent
				img={detail_data.inherent}
				name={detail_data.inherent_name}
				stars={[
					detail_data.star1,
					detail_data.star2,
					detail_data.star3,
					detail_data.star4,
					detail_data.star5,
					detail_data.star6,
				]}
			/>

			<div class="hr" style="--ratio: 0.125;">神兵</div>

			<Weapon weapon={detail_data.godclass_weapon} />

			<div class="mb-2" />

			<Skills
				pinyin={data.role.pinyin}
				skills={handle_skills(detail_data.skill)}
				lang={data.role.pinyin_tw ? 'tw' : 'cn'}
			/>
		{/if}

		{#if data.role?.summons}
			<Summons summons={data.role.summons} />
		{/if}

		<hr />
		<details>
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
			<pre>{JSON.stringify(detail_data, null, 2)}</pre>
		</details>
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
{/if}

<Footer time={true} refs={get_refs([1, 1, 1])} />

<style>
pre {
	overflow: auto;
}
</style>
