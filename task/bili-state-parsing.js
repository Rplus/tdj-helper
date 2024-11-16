import fs from 'fs';
import { writeFile, outputJSON, uniq, remove_html_tag, fetch_bwiki_props_by_name } from './u.mjs';

Array.prototype.uniq = uniq;

let names = [];

let data = [];

let _res = await fetch(
	'https://wiki.biligame.com/tdj/api.php?action=opensearch&search=状态/&limit=800',
);
names = (await _res.json())?.[1];
names.sort();
{
	data = await Promise.all(
		names.map(async (name) => {
			let props = await fetch_bwiki_props_by_name(name);
			delete props._ASK;

			let contain = {
				skills: props['绝学状态'],
				inherents: props['天赋状态'],
				weapons: props['技能状态'],
				ornamate: props['饰品状态'],
			}
			for (let p in contain) {
				if (Array.isArray(contain[p])) {
					contain[p] = contain[p].map(encodeURIComponent);
				} else if (!contain[p]) {
					delete contain[p];
				} else {
					contain[p] = encodeURIComponent(contain[p]);
				}
			}

			return {
				// key: encodeURIComponent(name),
				name: props['名称'],
				cate: props['类别'],
				desc: remove_html_tag(props['描述']),
				// able: {
					dispellable: !props['驱散'].includes('不可'),
					extendable: !props['扩散'].includes('不可'),
					stealable: !props['偷取'].includes('不可'),
				// },
				// contain,
			};

			return props;
		})
	);
}

outputJSON({
	json: data,
	fn: './task/rawdata/_state.raw.json',
	space: 2,
	// cn2tw: true,
});
outputJSON({
	json: data,
	fn: './task/rawdata/state.json',
	space: 2,
	cn2tw: true,
});

outputJSON({
	json: data,
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