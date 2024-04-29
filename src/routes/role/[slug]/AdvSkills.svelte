<script>
export let skills = [];

import { resize_img, get_img, clear_html } from '$lib/u.js';
import MediaObj from '$lib/MediaObj.svelte';
import MultiLv from '$lib/MultiLv.svelte';

let skills_set = [];

skills.forEach((s, index) => {
	if (index % 3 === 0) {
		skills_set.push([]);
	}
	s.lvs = [
		s.name,
		clear_html(s.desc),
		// `- 🔥 ${s.cost.replace(/\D/g, '')}`,
		`- ⏳ ${s.cd}`,
		`- 🏹 ${s.shoot}`,
		`- 🎯 ${s.range}`,
	].join('\n');
	skills_set[skills_set.length - 1].push(s);
})

</script>


<div class="hr">3C 技能</div>

{#each skills_set as set}
	<MediaObj>
		<img
			slot="img"
			src={get_img('skill', set[0].img, 96)}
			alt={set[0].name}
			title={set[0].name}
			width="96"
			height="96"
		/>

		<svelte:fragment slot="name">
			{set[0].name}
		</svelte:fragment>

		<svelte:fragment slot="info">
			<MultiLv
				name={set[0].name}
				lvs={set.map(s => s.lvs)}
			/>
		</svelte:fragment>
	</MediaObj>
{/each}
