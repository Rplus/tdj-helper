<script>
export let skill = {};

import { clear_html } from '$lib/u.js';
import SummonSkill from './SummonSkill.svelte';
</script>

<strong>{skill.name}</strong>

<div class="pre-line skill-info">
	{clear_html(skill.desc)}

	<div class="skill-meta">
		{#if skill.cd}
			<div data-cd={skill.cd}>⏳ {skill.cd === '-' ? 0 : skill.cd}</div>
		{/if}

		{#if skill.shoot}
			<div data-shoot={skill.shoot}>🏹 {skill.shoot}</div>
		{/if}

		{#if skill.range}
			<div data-range={skill.range}>🎯 {skill.range}</div>
		{/if}

		{#if skill.type}
			<div data-type={skill.type} data-way={skill.way}>🏷️ {skill.type}</div>
		{/if}
	</div>
</div>

{#if skill.sub_skills}
	{#each skill.sub_skills as sub_skill}
		<br />
		🔁
		<svelte:self skill={sub_skill} />
	{/each}
{/if}

<style>
.skill-meta {
	margin-block-start: 0.25em;
	margin-inline-start: 1.5em;
	opacity: 0.75;
	font-size: smaller;

	& > div {
		&[data-cd='-'],
		&[data-range='-'],
		&[data-shoot='-'] {
			display: none;
		}

		&::before {
			content: '- ';
		}
	}
}
</style>
