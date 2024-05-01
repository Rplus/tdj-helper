<script>
export let skills = [];
export let lang = 'tw';
export let pinyin = '';

import { get_img, clear_html } from '$lib/u.js';
import { find_adv_skills } from './skill.js';

import AdvSkills from './AdvSkills.svelte';

let adv_skills = find_adv_skills(pinyin)?.adv_skills || [];

if (adv_skills.length && skills.length) {
	adv_skills.forEach((adv_skill, index) => {
		let skill = skills.find((s) => s.name === adv_skill.name);
		if (skill) {
			adv_skills[index] = { ...skill };
		}
	});
}
</script>

<div class="hr">五內技能</div>

<div class="skills">
	{#each skills as skill}
		<div
			class="skill ai-c jc-c flex text-center"
			style="--row: {skill.grid_row}; --col: {skill.grid_col};"
		>
			<details name="skill" class="pos-r">
				<summary>
					{skill.name}
					<br />
					<img
						src={get_img('skill', skill.img, 96, lang)}
						alt={skill.name}
						title={skill.name}
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
					<details>
						<pre>{JSON.stringify(skill, null, 2)}</pre>
					</details>
				</div>
			</details>
		</div>
	{/each}
</div>

<div class="mb-2" />

{#if adv_skills.length}
	<AdvSkills skills={adv_skills} />
{/if}

<style>
.skills {
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	grid-template-rows: repeat(6, 5em);
	--gap: min(0.5em, 0.8vw);
	gap: var(--gap);
	background-image: linear-gradient(to right, #9991, #9991 calc(100% - var(--gap)), #0000 0%);
	background-size: calc((100% + var(--gap)) / 5) 100%;
}

.skill {
	grid-row: var(--row) / span 1;
	grid-column: var(--col) / span 1;
	padding: 0.25em;
	background-color: #9993;
	/* box-shadow: inset 0 0 0 1px, 0 0 0 1px; */
	font-size: smaller;

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

.list {
	padding: 0;
	padding-left: 1em;
}

img {
	background-color: #3333;
	border-radius: 50%;
}

summary {
	cursor: pointer;
	text-indent: -1em;

	@media (max-width: 700px) {
		font-size: smaller;
	}
}
</style>
