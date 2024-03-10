<script>
import Header from '$lib/Header.svelte';
import Footer from '$lib/Footer.svelte';
import { onMount } from 'svelte';
import { link } from '$lib/u.js';

let gsheet_url =
	'https://docs.google.com/spreadsheets/d/e/2PACX-1vThfydM3yjBOBsKXVmXDZo6Mr6iHiQO0di-C_J5Ct6bQ1weTorkbV8TOZ7wz0KmAPEk2qMj6zCqHz_J/pubhtml#';

let iframe;
function openIframe() {
	if (iframe) {
		iframe.src = gsheet_url;
	}
}

let _style = '';
$: injected_style = _style ? `<style>${_style}</style>` : '';

onMount(() => {
	let urlProps = new URLSearchParams(location.search);
	let getFormatedD1 = () => {
		let today = new Date();
		let day7 = 1000 * 60 * 60 * 24 * 7;
		let d0 = new Date(2022, 0, 24);
		let _d1 = new Date(today - ((today - d0) % day7));
		return `${_d1.getMonth() + 1}`.padStart(2, '0') + `${_d1.getDate()}`.padStart(2, '0');
	};
	let ori_title = document.title;
	let d1 = getFormatedD1();
	let date = urlProps.get('date') || '0328-65' || d1;
	document.title = ori_title + ' - ' + date;
	caption.innerHTML = [...new Set([d1, date])]
		.map(
			(d) =>
				`<a href="${link('/naihe')}?date=${d}" data-target="${date === d}" data-sveltekit-reload>${d}🔗</a>`,
		)
		.join('');

	openIframe = () => {
		iframe.src = gsheetlink.href;
	};

	function markDupOptions(argument) {
		let checkboxs = [...document.querySelectorAll('input[data-value]:checked')];
		if (!checkboxs.length) {
			updateStyle('');
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

		updateStyle(
			values.map((i) => `input[data-value="${i.value}"]:not([name="${i.name}"]) + span`).join(',') +
				'{ text-decoration: line-through; opacity: .5; }',
		);
	}

	function genLabel(title, value, match) {
		return `<label><input type="radio" name="${title}" ${
			match && 'data-value="' + match + '"'
		}> <span>${value}</span></label>`;
	}

	tableForm.addEventListener('input', markDupOptions);
	tableForm.addEventListener('reset', () => {
		updateStyle('');
	});

	function updateStyle(style = '') {
		_style = style;
	}

	let print = document.querySelector('#print');
	print.addEventListener('click', () => {
		window.print();
	});

	// FIXME
	// api changed, passed date will be identified as number
	// try to use another parsing way to get sheet data
	// e.q. (gviz) https://docs.google.com/spreadsheets/d/1F3nsxZ5ndIhxajYIulzv3vEy2-PzO-6By74QPPWn170/gviz/tq?tqx=out:csv&sheet=0404&tq=SELECT+C%2CD%2CE
	// and then parse csv file
	fetch(`https://opensheet.elk.sh/1F3nsxZ5ndIhxajYIulzv3vEy2-PzO-6By74QPPWn170/${date}!c2:e22`)
		.then((r) => r.json())
		.then((raw) => {
			if (raw.error) {
				td.innerHTML = new Error('Fetching data fails. API 改了QQ 有空再修');
				return;
			}
			let data = [];
			raw.forEach((d, index) => {
				let N = ~~(index / 4) + 1;
				let n = (index % 4) + 1;
				let o = {
					content: [],
					title: `${N}-${n}`,
					boss: n === 4,
				};

				for (let p in d) {
					let type = p.slice(0, 2);
					let value = d[p];
					let checkbox = n !== 4 && type === '靈門';
					o.content.push({
						type,
						checkbox,
						value: checkbox ? value.split('\n').map((t) => t.trim()) : value.trim(),
					});
				}
				data[index] = o;
			});

			let tmpl = data.map((row) => {
				let content = '';
				if (row.boss) {
					content = `<td colspan="3">${row.content[0]?.value || ''}</td>`;
				} else {
					content = row.content
						.map((td) => {
							let innerContent = '';
							if (td.value?.length > 2) {
								innerContent = td.checkbox
									? td.value.map((item) => genLabel(row.title, item, item)).join('')
									: genLabel(row.title, td.value);
							} else {
								innerContent = td.value || '';
							}
							return `<td class="${td.checkbox ? 'checkbox' : ''}">${innerContent}</td>`;
						})
						.join('');
				}

				return `
	      <tr>
	        <td>${row.title}</td>
	        ${content}
	      </tr>
	    `;
			});
			tbody.innerHTML = tmpl.join('');
		})
		.catch((err) => (table.innerHTML = new Error(err)));
});
</script>

<Header title="三途川選擇" />

<div class="workspace">
	<div>{@html injected_style}</div>
	<form id="tableForm" class="form">
		<table id="table">
			<caption id="caption"></caption>
			<colgroup>
				<col width="2em" />
				<col width="30%" />
				<col width="30%" />
				<col width="30%" />
			</colgroup>
			<thead id="thead">
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
			<tbody id="tbody">
				<td id="td" colspan="4">Loading~</td>
			</tbody>
		</table>
		<input type="reset" />
		<input type="button" value="Print" id="print" />
	</form>

	<Footer time={false}>
		<div class="footer-content">
			<details on:toggle={openIframe}>
				<summary>
					原始資料：
					<a rel="noopener" target="_blank" href={gsheet_url}>天地劫M 三途川 @ Google SpreadSheet</a
					>
				</summary>
				<iframe id="iframe" width="580" bind:this={iframe} frameborder="0"></iframe>
			</details>

			----- ----- -----
			<br />

			試算表非常需要志士協作，歡迎
			<a href="https://mailbox.gamer.com.tw/send.php?to=Rplus">巴哈私訊</a>
			聯繫以開放協作權限 ：P
		</div>
	</Footer>
</div>

<style>
.workspace {
	& .form {
		text-align: center;
	}
	& table {
		text-align: center;
		border-collapse: collapse;
		margin: auto;
		width: 30em;
		max-width: 100%;
		background-color: #fff3;
	}
	& caption {
		margin-bottom: 0.5em;
	}
	& caption a {
		padding: 3px 0.75em;
		border: 1px dotted transparent;
		border-bottom-color: currentcolor;
	}
	& caption a[data-target='true'] {
		border: 1px dotted;
		border-width: 1px 1px 0 1px !important;
	}
	& caption a:nth-of-type(-n + 2)::before {
		content: '';
		border: 3px solid #f33;
		display: inline-block;
		vertical-align: 10px;
		border-radius: 1em;
		margin-right: 0.1em;
	}
	& th {
		/* position: sticky; */
		top: 0;
		background-color: #9996;
	}
	& td {
		border-bottom: 1px dotted #0003;
		white-space: nowrap;
	}
	& td + td {
		height: 3em;
		padding: 0.5em 0;
		white-space: pre-wrap;
	}
	& th,
	& tbody tr:nth-of-type(4n) {
		border-bottom: 4px dotted #0003;
	}
	& label {
		display: block;
		padding: 0;
	}
	& .checkbox {
		white-space: normal;
	}
	& tbody tr:nth-of-type(4n) {
		font-weight: 900;
	}

	& tbody tr:nth-of-type(8n + 1),
	& tbody tr:nth-of-type(8n + 2),
	& tbody tr:nth-of-type(8n + 3),
	& tbody tr:nth-of-type(8n + 4) {
		background-color: #3331;
	}
	& tr:hover td {
		background-color: #99f1;
	}

	& input:checked + span {
		background-color: #ff06;
	}
}
.footer-content {
	text-align: center;
	width: 560px;
	max-width: 90vw;
	margin: 0 auto;
}
#iframe {
	/* width: 40em; */
	max-width: 90vw;
	height: 30em;
}
@media print {
	body {
		columns: 2;
	}
}
@page {
	/* size: A4 landscape; */
	margin: 0;
	padding: 0;
}
</style>
