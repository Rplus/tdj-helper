<script>
import { get_refs } from '$lib/fetch-data.js';
import { link, clear_html } from '$lib/u.js';
import { status_props } from '../summon.js';

import Header from '$lib/Header.svelte';
import NavItem from '$lib/NavItem.svelte';
import Footer from '$lib/Footer.svelte';
// import MediaObj from '$lib/MediaObj.svelte';
// import MultiLv from '$lib/MultiLv.svelte';
import Icon from '../Icon.svelte';

export let data;

function gen_skill_string(skill = {}, with_name = false) {
	return [
		with_name && '\n🔁 ' + skill.name,
		clear_html(skill.desc),
		skill.cd && skill.cd !== '-' ? `　- ⏳ ${skill.cd}` : '',
		skill.shoot && skill.shoot !== '-' ? `　- 🏹 ${skill.shoot}` : '',
		skill.range && skill.range !== '-' ? `　- 🎯 ${skill.range}` : '',
	]
		.filter(Boolean)
		.join('\n');
}
</script>

<Header parent_path="/summon" title="召喚物：{data.summon?.name}" />

<div class="flex jc-sb">
	<ul style="margin: 0;">
		<li>
			<a href="https://wiki.biligame.com/tdj/{data.summon.key}" rel="noopener" target="_biliwiki">
				{data.summon.name} (bwiki)
			</a>

			<div class="flex text-center ai-c">
				<Icon role={data.summon} />
				<div>
					[ {data.summon.prop} ]
					<br />
					[{data.summon.career}]
				</div>
			</div>
		</li>

		<li>
			移動：
			{data.summon.speed}
		</li>

		<li>
			射程：
			{data.summon.range}
		</li>

		<li>
			從屬：
			<a href={link(`/role/${data.summon.owner[0]}`)}>
				{data.summon.owner[0]}
			</a>
		</li>
	</ul>

	<div style="font-size: smaller">
		繼承屬性：
		<table>
			{#each data.summon.stats as stat, index}
				<tr>
					<td class="text-right">
						{stat}%
					</td>
					<td>
						{status_props[index].prop}
					</td>
				</tr>
			{/each}
		</table>
	</div>
</div>

<NavItem prev={data.summon.siblings.prev} next={data.summon.siblings.next} cate="summon" />

<!-- <div class="hr" style="--ratio: 0.125;">天賦</div> -->

<ul>
	<li class="hr" style="--ratio: 0.125;">天賦</li>
	<li class="mb-2">
		<strong>{data.summon.inherent_name}</strong>

		<div class="pre-line">
			{data.summon.inherent}
		</div>
	</li>

	<li class="hr" style="--ratio: 0.125;">技能</li>

	{#each data.summon.skills as skill}
		<li class="mb-2">
			<strong>{skill.name}</strong>

			<div class="pre-line">
				{gen_skill_string(skill)}

				{#if skill.sub_skills}
					{#each skill.sub_skills as sub_skill}
						<br />
						🔁 <strong>{sub_skill.name}</strong>
						<br />
						{gen_skill_string(sub_skill)}
					{/each}
				{/if}
			</div>
		</li>
	{/each}
</ul>

<Footer time={true} refs={get_refs([1, 1, 1])} />
