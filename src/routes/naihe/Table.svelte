<script>
export let tabs = [''];
export let init_tab = '';
import { replaceState } from '$app/navigation';
import { link } from '$lib/u.js';

let o_title = document.title;
let active_tab;

$: switch_tab(init_tab || tabs[0]);

function switch_tab(title) {
	active_tab = title;
	document.title = o_title + title;
	replaceState(link(`/naihe?date=${title.replace('t-', '')}`));
}

let _style = '';
$: injected_style = _style ? `<style>${_style}</style>` : '';

function mark_dup() {
	console.log('mark_dup');
	let checkboxs = [...document.querySelectorAll('input[data-value]:checked')];
	if (!checkboxs.length) {
		_style = '';
		return;
	}

	let values = checkboxs.map((i) => i.nextElementSibling?.textContent || '').filter(Boolean);

	values = [...new Set(values)].map((i) => {
		let n = document.querySelector(`input[data-value="${i}"]:checked`)?.name;
		return {
			value: i,
			name: n,
		};
	});

	_style =
		values.map((i) => `input[data-value="${i.value}"]:not([name="${i.name}"]) + span`).join(',') +
		'{ text-decoration: line-through; opacity: .5; }';
}

async function fetching(tab_name) {
	let res = await fetch(
		`https://opensheet.elk.sh/1F3nsxZ5ndIhxajYIulzv3vEy2-PzO-6By74QPPWn170/${tab_name}!c2:e22`,
	);
	let data = await res.json();
	if (res.ok) {
		return handle_data(data);
	} else {
		throw new Error(data.error);
	}
}

function handle_data(data = []) {
	data.forEach((row, index) => {
		let N = ~~(index / 4) + 1;
		let n = (index % 4) + 1;
		let o = {
			content: [],
			title: `${N}-${n}`,
			boss: n === 4,
		};

		for (let prop in row) {
			let type = prop.slice(0, 2);
			let value = row[prop];
			let checkbox = n !== 4 && type === '靈門';
			if (value !== '-' && value !== '草偶') {
				value = checkbox ? value.split('\n').map((t) => t.trim()) : [value.trim()];
			}

			o.content.push({
				type,
				checkbox,
				value,
			});
		}
		data[index] = o;
	});

	return data;
}
</script>

<div>{@html injected_style}</div>

<form
	id="tableForm"
	class="form"
	on:reset={() => (_style = '')}
	on:input={mark_dup}
	on:submit|preventDefault
>
	<table>
		<caption>
			{#each tabs as tab}
				<a
					href="./?date={tab}"
					data-target={tab === active_tab}
					on:click|preventDefault={() => switch_tab(tab)}
				>
					{tab}🔗
				</a>
			{/each}
		</caption>

		<colgroup>
			<col width="2em" />
			<col width="30%" />
			<col width="30%" />
			<col width="30%" />
		</colgroup>

		<thead>
			<tr>
				<th>#</th>
				<th>
					靈門<br />
					隊伍強化<br />
					(不疊加)
				</th>
				<th>
					神樹<br />
					英靈強化
				</th>
				<th>
					神龕<br />
					秘寶
				</th>
			</tr>
		</thead>

		<tbody>
			{#await fetching(active_tab)}
				<td colspan="4">Loading~</td>
			{:then items}
				{#each items as item}
					<tr>
						<td>{item.title}</td>
						{#if item.boss}
							<td colspan="3">
								{item.content[0]?.value || ''}
							</td>
						{:else}
							{#each item.content as cell}
								<td>
									{#if Array.isArray(cell.value)}
										{#each cell.value as option}
											<label>
												<input
													type="radio"
													name={item.title}
													data-value={cell.value.length > 1 ? option : null}
												/>
												<span>{option}</span>
											</label>
										{/each}
									{:else}
										{cell.value}
									{/if}
								</td>
							{/each}
						{/if}
					</tr>
				{/each}
			{:catch error}
				<td colspan="4" style="color: red">
					<p>
						{error}
					</p>
				</td>
			{/await}
		</tbody>
	</table>

	<footer>
		<input type="reset" />
		<input type="button" value="Print" id="print" on:click={() => window.print()} />
	</footer>
</form>

<style>
.form {
	text-align: center;
}
table {
	text-align: center;
	border-collapse: collapse;
	margin: auto;
	width: 30em;
	max-width: 100%;
	background-color: #fff3;
}
caption {
	margin-bottom: 0.5em;
}
caption a {
	padding: 3px 0.75em;
	border: 1px dotted transparent;
	border-bottom-color: currentcolor;
}
caption a[data-target='true'] {
	border: 1px dotted;
	border-width: 1px 1px 0 1px !important;
}
th {
	background-color: #9996;
}
td {
	border-bottom: 1px dotted #0003;
	white-space: nowrap;
}
td + td {
	height: 3em;
	padding: 0.5em 0;
	white-space: pre-line;
}
th,
tbody tr:nth-of-type(4n) {
	border-bottom: 4px dotted #0003;
}
label {
	display: block;
	padding: 0;
}
tbody tr:nth-of-type(4n) {
	font-weight: 900;
}

tbody tr:nth-of-type(8n + 1),
tbody tr:nth-of-type(8n + 2),
tbody tr:nth-of-type(8n + 3),
tbody tr:nth-of-type(8n + 4) {
	background-color: #3331;
}
tr:hover td {
	background-color: #99f1;
}

input:checked + span {
	background-color: #ff06;
}
</style>
