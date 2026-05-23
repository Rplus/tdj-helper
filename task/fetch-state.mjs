import fs from 'fs';
import pLimit from 'p-limit';
import {
	outputJSON,
	fetch_with_cached,
	random_time,
	compress_objects,
} from './u.mjs';
import { parse } from 'node-html-parser';


// const FORCE_FETCH = true;
const FORCE_FETCH = process.argv.includes('--force-fetch');

const res = await fetch_with_cached({
	url: 'https://wiki.biligame.com/tdj/api.php?action=parse&pageid=4467&prop=text&format=json',
	cached_path: `./task/rawres/_state.res.json`,
	is_json: true,
	ignore_cached: FORCE_FETCH,
	sleep_time: random_time(1000, 3000),
});

const doc = parse(res?.parse?.text?.['*'] ?? '');
const tbody = doc.querySelector('table.datatable tbody');
const rows = tbody.querySelectorAll('tr');

const status = rows.map((row, row_index) => {
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
	fn: './task/rawres/_state.raw.json',
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

status.sort((a, b) => {
	return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
});


outputJSON({
	// json: compress_objects(status, [
 //    "dispellable",
 //    "extendable",
 //    "stealable"]),
	json: status,
	fn: './task/rawres/state.src.json',
	space: 2,
	cn2tw: true,
});

outputJSON({
	json: status,
	fn: './src/lib/data/state.min.json',
	space: 0,
	cn2tw: true,
});