<script>
import Header from '$lib/Header.svelte';
import Footer from '$lib/Footer.svelte';
import Cell from './Cell.svelte';
import { options, gen_cells } from './data.js';

let option = {
	type: 'pick',
	shape: 'diamond',
};
let cells = [];
let grid = 2;

$: {
	if (option.type === 'put' && option.shape !== 'square') {
		console.log('gg');
		option.shape = 'square';
	}
	cells = gen_cells(option, grid);
}

const refs = [
	{
		title: '[攻略心得] 燕赤霞技能機制 | NGA',
		link: 'https://nga.178.com/read.php?tid=31378635',
		target: '_blank',
	},
];
</script>

<div class="workspace">
	<Header title="範圍取放順序" />

	<form class="form grid">
		<div class="output grid ji-c ai-c" style="--grid: {grid * 2 + 1};">
			{#each cells as cell}
				<Cell {cell} />
			{/each}
		</div>

		<aside class="aside">
			<fieldset>
				<legend>行為:</legend>

				{#each options.types as item}
					<label>
						<input type="radio" name="type" value={item.type} bind:group={option.type} />
						{item.title}
					</label>
				{/each}
			</fieldset>

			<!--  -->

			<fieldset disabled={option.type === 'put'}>
				<legend>選取形狀:</legend>

				{#each options.shapes as item}
					<label>
						<input type="radio" name="shape" value={item.shape} bind:group={option.shape} />
						{item.title}
					</label>
				{/each}
			</fieldset>

			<!--  -->

			<fieldset>
				<legend><label for="range">延伸格數:</label></legend>
				<input type="range" name="range" min="1" max="5" bind:value={grid} />
				<div class="numbers flex jc-sb">
					<span>1</span>
					<span>2</span>
					<span>3</span>
					<span>4</span>
					<span>5</span>
				</div>
			</fieldset>
		</aside>
	</form>

	<Footer {refs} time={false}>
		PS：[放置模式] 第三圈以外的落位<sup>(#29+)</sup>，未經驗證
	</Footer>
</div>

<style>
.form {
	gap: 1em;
	margin: 0 auto;
	grid-template: 'main aside' auto / auto 200px;

	@media (max-width: 700px) {
		grid-template:
			'aside' auto
			'main' auto / 1fr;
	}
}

.output {
	grid-area: main;
	aspect-ratio: 1;
	width: 100%;
	max-width: 85vw;
	margin: 0 auto;
	box-shadow: inset 0 0 0 1px #6666;
	transform: var(--transform-outer);
	grid-template: repeat(var(--grid), 1fr) / repeat(var(--grid), 1fr);
	font-size: larger;
}

input[type='range'] {
	width: 100%;
}

.numbers {
	padding: 0 0.25em;
}

.aside {
	grid-area: aside;
	margin: 0 auto;
}

.aside label {
	padding: 0 0.25em 0 0;
}
</style>
