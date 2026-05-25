<script>
export let basic_skills = [];
export let lang = 'tw';
export let pinyin = '';
export let fallback_img = '';

import { get_img, clear_html, resize_img } from '$lib/u.js';
import { find_other_skills, get_skill_img, gen_skill_desc } from './skill.js';

import AdvSkills from './AdvSkills.svelte';
import Img from '$lib/Img.svelte';
import MediaObj from '$lib/MediaObj.svelte';
import Switcher from '$lib/Switcher.svelte';

// let adv_skills = find_adv_skills(pinyin, skills);

let grid_mode = false;

// function gen_skill_string(skill = {}) {
// 	return [
// 		// skill.name,
// 		skill.cost ? '🔥'.repeat(parseFloat(skill.cost) || 1) : '🔥',
// 		clear_html(skill.desc),
// 		// `- 🔥 ${skill.cost.replace(/\D/g, '')}`, // always 3
// 		// skill.cost && `　- 🔥 ${skill.cost}`,
// 		skill.cd && `　- ⏳ ${skill.cd}`,
// 		skill.shoot !== '-' && `　- 🏹 ${skill.shoot}`,
// 		skill.range !== '-' && `　- 🎯 ${skill.range}`,
// 		skill.type && `　- 🏷️ ${skill.type}`,
// 		'　- ' + (skill.way === '被動' ? '💤' : '👊') + ` ${skill.way}`,
// 	].filter(Boolean);
// }

let other_skills = find_other_skills(pinyin);
let adv_skills = other_skills?.adv_skills;
let extra_skills = other_skills?.extra_skills || [];
let support_skill = other_skills?.support_skill;

let skills_list = [
	...basic_skills,
	...extra_skills.map(i => {
		i.extra = true;
		return i;
	}),
];

// console.log(111, skills_list);

// dirty hack for special skills
// let sp_skills = get_special_skills(pinyin);
// if (sp_skills) {
//		skills = skills.concat(sp_skills);
// }

// console.log(112 , pinyin, other_skills?.extra_skills, other_skills?.adv_skills);
// if (other_skills?.extra_skills) {
// 	skills = skills.concat(other_skills.extra_skills);
// }
</script>

<div class="hr">
	五內技能

	<Switcher left_label="▦" right_label="▤" bind:checked={grid_mode} />
</div>

<!--
	{#each skills_list as skill}
		{#if skill.extra}
			+ {skill.name}
		{:else}
			- {skill.name}
		{/if}
		<br>
	{/each}

	<br>
	{#if adv_skills}
		{#each adv_skills as adv_skill_set}
			{#each adv_skill_set as adv_skill}
				* {adv_skill.name || adv_skill}
				<br>
			{/each}
			<br>
		{/each}
	{/if}
-->

<div class="skills" class:grid={grid_mode}>
	{#each basic_skills as skill}
		<div
			hidden={!grid_mode || skill.extra}
			class="skill ai-c jc-c flex text-center"
			style="--row: {skill.grid_row}; --col: {skill.grid_col};"
		>
			<details name="skill" class="pos-r">
				<summary>
					{skill.name}
					<br />
					<Img
						src={get_skill_img({ skill_img: skill.img, lang })}
						alt={skill.name}
						width="48"
						height="48"
					/>
				</summary>

				<div class="desc" class:right={skill.grid_col > 3}>
					<div class="pre-line">
						{clear_html(skill.desc)}
						<ul class="list">
							<li>cd: {skill.cd}</li>
							<li>cost: {skill.cost}</li>
							<li>shoot: {skill.shoot}</li>
							<li>range: {skill.range}</li>
							<li>type: {skill.type}</li>
							<li>way: {skill.way}</li>
						</ul>
					</div>
				</div>
			</details>
		</div>
	{/each}

	{#each skills_list as skill}
		<div hidden={grid_mode}>
			<MediaObj mobile_align="center">
				<div slot="img" class="flex"
					style="background-color: {skill.extra ? `#f003` : `#0ff5`};"
				>
					<Img
						src={get_skill_img({
							skill_img: skill.img,
							extra_img: skill.imgsrc,
							lang,
							fallback_img,
						})}
						alt={skill.name}
						width="48"
						height="48"
					/>
				</div>

				<svelte:fragment slot="name">
					{skill.name}
				</svelte:fragment>

				<svelte:fragment slot="info">
					<div class="pre-line skill-info">
						<!-- <div>
							{'🔥'.repeat(parseFloat(skill.cost) || 1)}
						</div> -->

						{#each gen_skill_desc(skill, false) as sk_desc}
							<div>
								{sk_desc.content}
								<div class="skill-meta">{sk_desc.sub}</div>
							</div>
						{/each}

					</div>
				</svelte:fragment>
			</MediaObj>
		</div>
	{/each}
</div>

<div class="mb-2" />

{#if adv_skills?.length}
	<AdvSkills skills={adv_skills} {lang} {basic_skills} />
{/if}

<style>
.skills.grid {
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	grid-template-rows: repeat(6, 5em);
	--gap: min(0.5em, 0.8vw);
	gap: var(--gap);
	background-image: linear-gradient(to right, #9991, #9991 calc(100% - var(--gap)), #0000 0%);
	background-size: calc((100% + var(--gap)) / 5) 100%;

	& .skill {
		grid-row: var(--row) / span 1;
		grid-column: var(--col) / span 1;
		padding: 0.25em;
		background-color: #9993;
		/* box-shadow: inset 0 0 0 1px, 0 0 0 1px; */
		font-size: smaller;

		& img {
			background-color: #3333;
			border-radius: 50%;
		}

		& .desc {
			position: absolute;
			width: 15em;
			margin: 0;
			padding: 1em;
			overflow: auto;
			z-index: 10;
			text-align: left;
			background-color: color-mix(in srgb, var(--main-bgc) 90%, #fff0);
			box-shadow: 0 0 3px;

			&.right {
				right: 0;
			}

			&:hover {
				z-index: 11;
			}
		}
	}

	& .list {
		padding: 0;
		padding-left: 1em;
	}

	& summary {
		cursor: pointer;
		text-indent: -1em;

		@media (max-width: 700px) {
			font-size: smaller;
		}
	}
}

.skill-meta {
	margin-block-start: 0.25em;
	margin-inline-start: 1em;
	opacity: 0.75;
	font-size: smaller;

	& > div {
		&[data-cd][data-way^='被'],
		&[data-type^='主'][data-way^='主'],
		&[data-type^='被'][data-way^='被'],
		&[data-range='無'],
		&[data-range='无'],
		&[data-shoot='無'],
		&[data-shoot='无'] {
			display: none;
		}

		&::before {
			content: '- ';
		}
	}
}
</style>
