<script>
export let skills = [];
export let basic_skills;
export let lang = 'tw';

import { get_img, clear_html } from '$lib/u.js';
import MediaObj from '$lib/MediaObj.svelte';
import MultiLv from '$lib/MultiLv.svelte';
import Img from '$lib/Img.svelte';
import { gen_skill_desc } from './skill.js';

let skills_set = skills?.map(skill_set => {
	let _skill_info = basic_skills.find(i => {
		return i.img === skill_set[0].img;
	});

	if (!_skill_info) {
		console.log({_skill_info, skills, skill_set, basic_skills});
		// return;
	}
	// console.log(11122, gen_skill_desc(skill_set[2]));
	// console.log({_skill_info, skills, skill_set, basic_skills});

	return {
		name: skill_set[0].name,
		img: skill_set[0].img,
		lvs: [_skill_info || skill_set[0], skill_set[1], skill_set[2]]
			.map(i => gen_skill_desc(i, true, false)),
	};
});

// console.log(334, skills_set);

</script>



<div class="hr">絕學化神</div>

{#each skills_set as set}
	<MediaObj mobile_align="center">
		<div slot="img" class="flex" style="background-color: #ff02;">
			<Img src={get_img('skill', set.img, 96, lang)} alt={set.name} width="96" height="96" />
		</div>

		<svelte:fragment slot="name">
			{set.name}
		</svelte:fragment>

		<svelte:fragment slot="info">
			<MultiLv name={set.name} lvs={set.lvs} />
		</svelte:fragment>
	</MediaObj>
{/each}
