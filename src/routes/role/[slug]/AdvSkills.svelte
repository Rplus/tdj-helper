<script>
export let skills = [];

import { get_img, clear_html } from '$lib/u.js';
import MediaObj from '$lib/MediaObj.svelte';
import MultiLv from '$lib/MultiLv.svelte';
import Img from '$lib/Img.svelte';

let skills_set = [];

skills.forEach((s, index) => {
	if (index % 3 === 0) {
		skills_set.push([]);
	}

	s.lvs = gen_skill_string(s);

	if (s.sub_skills && s.sub_skills.length) {
		s.sub_skills.forEach((ss) => s.lvs.push('\n🔁 ' + gen_skill_string(ss).join('\n')));
	}

	s.lvs = s.lvs.join('\n');

	skills_set[skills_set.length - 1].push(s);
});

function gen_skill_string(skill = {}) {
	return [
		skill.name,
		clear_html(skill.desc),
		// `- 🔥 ${skill.cost.replace(/\D/g, '')}`, // always 3
		skill.cd && `　- ⏳ ${skill.cd}`,
		skill.shoot !== '-' && `　- 🏹 ${skill.shoot}`,
		skill.range !== '-' && `　- 🎯 ${skill.range}`,
	].filter(Boolean);
}
</script>

<div class="hr">絕學化神</div>

{#each skills_set as set}
	<MediaObj mobile_align="center">
		<div
			slot="img"
			class="flex"
			style="background-color: #ff02;"
		>
			<Img
				src={get_img('skill', set[0].img, 96)}
				alt={set[0].name}
				width="96"
				height="96"
			/>
		</div>

		<svelte:fragment slot="name">
			{set[0].name}
		</svelte:fragment>

		<svelte:fragment slot="info">
			<MultiLv name={set[0].name} lvs={set.map((s) => s.lvs)} />
		</svelte:fragment>
	</MediaObj>
{/each}
