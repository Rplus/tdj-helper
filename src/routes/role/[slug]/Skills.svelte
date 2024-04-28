<script>
export let skills = [];
export let lang = 'tw';
import { resize_img, get_img, clear_html } from '$lib/u.js';
// import { get_skill_img_url } from '$lib/fetch-data.js';

// https://tw-media.game-beans.com/media/pictures/tdj/info/data/skill/EXSkill_1030.png
// https://media.zlongame.com/media/news/cn/tdj/info/data/skill/EXSkill_1599.png
//
// https://tw-media.game-beans.com/media/pictures/
// https://media.zlongame.com/media/news/cn/
// /tdj/info/data/skill/
skills = handle_skills(skills);

function handle_skills(skills) {
	let powers = [undefined];
	skills = skills.map((s) => {
		let unlock_condition = +s.unlock_condition.match(/\d+/)?.[0] || 0;

		switch (unlock_condition) {
			case 0:
				s.grid_row = 1;
				s.grid_col = 3;
				break;

			case 3:
				s.grid_row = 2;
				s.grid_col = 3;
				powers[0] = s.inner_power1;
				break;

			case 15:
				if (!powers.includes(s.inner_power1)) {
					powers.push(s.inner_power1);
				}
				s.grid_row = 3;
				s.grid_col = powers.indexOf(s.inner_power1) === 1 ? 5 : 1;
				break;

			case 25:
				s.grid_row = 4;
				s.grid_col = 3;
				break;

			case 40:
				if (!powers.includes(s.inner_power2)) {
					powers.push(s.inner_power2);
				}
				s.grid_row = 5;
				s.grid_col = powers.indexOf(s.inner_power2) === 1 ? 4 : 2;
				break;

			case 55:
				s.grid_row = 6;
				s.grid_col = 3;
				break;

			default:
				break;
		}
		return s;
	});

	return skills;
}

const paths = {};
</script>

<div class="skills">
	{#each skills as skill}
		<div
			class="skill ai-c jc-c flex text-center"
			style="--row: {skill.grid_row}; --col: {skill.grid_col};"
		>
			<details name="skill">
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
				<div class="desc">
					<div class="pre-line">
						{clear_html(skill.desc)}
						<ul>
							<li>cost: {skill.cost}</li>
							<li>shoot: {skill.shoot}</li>
							<li>cd: {skill.cd}</li>
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

<style>
.skills {
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	grid-template-rows: repeat(6, 5em);
	gap: 0.5em;
	background-image: linear-gradient(to right, #0001, #0001 calc(100% - 0.5em), #0000 0%);
	background-size: calc((100% + 0.5em) / 5) 100%;
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
		width: 25em;
		margin: 0;
		padding: 1em;
		overflow: auto;
		z-index: 10;
		text-align: left;
		background-color: color-mix(in srgb, var(--main-bgc) 90%, #fff0);
		box-shadow: 0 0 3px;

		&:hover {
			z-index: 11;
		}
	}
}

img {
	background-color: #3333;
	border-radius: 50%;
}
</style>
