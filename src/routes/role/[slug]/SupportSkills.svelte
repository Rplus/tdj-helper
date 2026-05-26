<script>
export let skill = [];

import { resize_img } from '$lib/u.js';
import MediaObj from '$lib/MediaObj.svelte';
import MultiLv from '$lib/MultiLv.svelte';
import Img from '$lib/Img.svelte';

import { gen_skill_desc } from './skill.js';

let lvs = [
		...['', '', ''].map(content => ({ content, })),
		...skill.descs.map(i => {
			return gen_skill_desc({
				...skill,
				name: skill.name + i.star,
				desc: i.desc,
			});
		}),
	];

</script>



<div class="hr">援襲絕學</div>


<MediaObj mobile_align="center">
	<div slot="img" class="flex" style="background-color: #0903;">
		<Img src={resize_img(skill.img, 96)} alt={skill.name} width="96" height="96" />
	</div>

	<svelte:fragment slot="name">
		{skill.name}
	</svelte:fragment>

	<svelte:fragment slot="info">
		<MultiLv name={skill.name} lvs={lvs} />
	</svelte:fragment>
</MediaObj>
