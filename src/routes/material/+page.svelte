<script>
import Header from '$lib/Header.svelte';
import Footer from '$lib/Footer.svelte';
import { produce, cost } from './data.js';

const names = ['**之鐵', '**之銅', '**之銀', '**之精', '一階絕', '二階絕', '七階材', '💰'];

let lv1 = 1;
let lv2 = 70;
let output = '';

$: output = calc(lv1, lv2);

function calc(lv1, lv2) {
	let sum = cost(lv1, lv2).sum;
	return names.map((name, index) => `${name} x${sum[index] || 0}`).join('\n');
}

let refs = [
	{
		title: '淬火及身五內百科 | NGA',
		link: 'https://bbs.nga.cn/read.php?tid=26330724&rand=167',
		target: '_blank',
	},
];
</script>

<div class="workspace">
	<Header title="淬火需求" />

	<form class="text-center">
		<div style="margin-block-end: .5em;">
			Lv:
			<input type="number" bind:value={lv1} min={1} max={70} />
			~
			<input type="number" bind:value={lv2} min={1} max={70} />
		</div>
		<textarea rows="8">{output}</textarea>
	</form>

	<hr />

	<table class="text-right">
		<thead>
			<tr>
				<th>Lv</th>
				{#each names as name}
					<th>{name}</th>
				{/each}
			</tr>
		</thead>

		<tbody>
			{#each produce as prod}
				<tr>
					<th>{prod.lv}</th>
					{#each prod.output as item}
						<td>{item || ''}</td>
					{/each}
					<td></td>
				</tr>
			{/each}
		</tbody>
	</table>

	<Footer {refs} />
</div>

<style>
.workspace {
	margin: 0 auto;
	width: fit-content;
}

textarea {
	font-size: smaller;
	line-height: 1.3;
}

table {
	border-collapse: collapse;
}

td:not(:last-child):empty::before {
	content: '-';
	opacity: 0.35;
}

td,
th {
	padding: 5px 5px 1px;
}

tbody tr:nth-of-type(odd) td,
tbody tr:nth-of-type(odd) th {
	border-top: 1px dashed #6666;
}

tr:hover {
	background-color: #9992;
}
</style>
