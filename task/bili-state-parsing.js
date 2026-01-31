import fs from 'fs';
import { writeFile, outputJSON, getArgs, } from './u.mjs';
import { parse } from 'node-html-parser';

let parse_new = getArgs()?.new;

const FORCE_FETCH = false;

let html_fn = `./task/rawdata/_state.raw.html`;
let wikitable_html = '';
let status = [];

if (!parse_new && fs.existsSync(html_fn) && !FORCE_FETCH) {
	wikitable_html = fs.readFileSync(html_fn, 'utf8');
} else {
	let res = await fetch('https://wiki.biligame.com/tdj/api.php?action=parse&pageid=4467&prop=text&format=json');
	let _wikitable_html = (await res.json()).parse?.text?.['*'] || '';
	if (_wikitable_html) {
		wikitable_html = _wikitable_html;
		writeFile(
			`./task/rawdata/_state.raw.html`,
			_wikitable_html,
		);
	}
}

let doc = parse(wikitable_html);
let tbody = doc.querySelector('table.datatable tbody');
let rows = tbody.querySelectorAll('tr');

status = rows.map((row, row_index) => {
	return row_index && row.querySelectorAll('td')
		.map((td, td_index) => td_index && td.textContent)
		.filter(Boolean);
})
.filter(Boolean)
.map(item => {
	return {
		name: item[0].replace('状态/', ''),
		cate: item[1],
		desc: item[5],
		dispellable: !item[2].includes('不可'),
		extendable: !item[3].includes('不可'),
		stealable: !item[4].includes('不可'),
	};
})

outputJSON({
	json: status,
	fn: './task/rawdata/_state.ori.json',
	space: 2,
	// cn2tw: true,
});


{ // hotfix

	status.push({
		name: '䔄毒',
		desc: '攻擊前每移動1格，暴擊率降低15%（最多降低30%），行動結束時，損失10%最大氣血，若攻擊前每多移動1格，則額外損失10%最大氣血（最多額外20%）',
		dispellable: true,
		extendable: false,
		stealable: false,
	})

	status.forEach(i => {
		switch (i.name) {
			case '断寸I':
				i.dispellable = false;
				i.stealable = false;
				break;
			case '压制':
				i.dispellable = false;
				break;
			case '蛇毒':
				i.cate = '有害';
				break;
			default:
				break;
		}
	})
}

outputJSON({
	json: status,
	fn: './task/rawdata/_state.raw.json',
	space: 2,
	// cn2tw: true,
});
outputJSON({
	json: status,
	fn: './task/rawdata/state.json',
	space: 2,
	cn2tw: true,
});

outputJSON({
	json: status,
	fn: './src/lib/data/state.min.json',
	space: 0,
	cn2tw: true,
});

// array_to_csv(data);

function array_to_csv(arr = []) {
	let labels = [...new Set(arr.map(i => Object.keys(i)).flat())] + '\n';
	let op = arr.map(i => Object.values(i).join()).join('\n');

	writeFile('./task/rawdata/_state.csv', labels + op);
}