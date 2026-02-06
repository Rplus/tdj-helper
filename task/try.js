import fs from 'fs';
import { raw_data, writeFile, outputJSON, pick_obj, getArgs, uniq, read_json_file, } from './u.mjs';

let items = JSON.parse(fs.readFileSync(`./task/rawdata/roles.op.json`, 'utf8'));
// let items2 = JSON.parse(fs.readFileSync(`./task/rawdata/_adv_skills_all.json`, 'utf8'));
let force = false;

let roles_data = items || [];
raw_data.role_deatil.rawdata = await Promise.all(
	roles_data.slice(0, 22).map((i) => fetch_role_detail(i)),
);

async function fetch_role_detail(role) {
	let lang = role.pinyin_tw ? 'tw' : 'cn';
	let _url = role.pinyin_tw
		? raw_data.role_deatil.url(role.pinyin_tw, lang)
		: raw_data.role_deatil.url(role.pinyin, lang);

	let fn = `./task/rawdata/tdj/${role.name}.${lang}.txt`;

	let op;
	if (fs.existsSync(fn) && !force) {
		console.log('load-ing: ', fn);
		op = await read_json_file(fn);
	} else {
		console.log('parsing: ', role.name);

		let raw = await fetch(_url).then(r => r.json());
		op = await raw.data?.data;
		writeFile(fn, JSON.stringify(op, null, 2));
	}
	return op;
}


outputJSON({
	json: raw_data.role_deatil.rawdata,
	fn: './task/try.json',
	space: 2,
	// cn2tw: true,
});

// https://wiki.biligame.com/tdj/rest.php/v1/page/%E5%8F%AC%E5%94%A4%E7%89%A9%2F%E5%95%B8%E9%9C%9C
// let data = {
// 	names: [],
// 	summons: [],
// 	skills: [],
// };

// data.names = JSON.parse(fs.readFileSync(`./task/rawdata/summons.json`, 'utf8')).names;
// {
// 	// let _res = await fetch('https://wiki.biligame.com/tdj/api.php?action=opensearch&search=召唤物&limit=50');
// 	// data.names = (await _res.json())?.[1];
// 	// data.names.sort();
// }


// // data.summons = JSON.parse(fs.readFileSync(`./task/_summons.json`, 'utf8')).summons;
// {
// 	data.summons = await Promise.all(
// 		data.names.map(async (summon) => {
// 			let _sss = await fetch_name(summon);
// 			let props = bilidata_to_obj(_sss?.query.data);

// 			let inherent_name = props['天赋'];
// 			let inherent = await fetch_name('天赋/' + inherent_name);
// 			let inherent_props = bilidata_to_obj(inherent?.query.data);

// 			let skill_names = [].concat(props['绝学']);

// 			let op = {
// 				key: summon,
// 				name: summon.replace('召唤物/', ''),
// 				inherent_name,
// 				inherent: remove_html_tag(inherent_props['天赋6星']),
// 				range: props['射程'],
// 				stats: props['属性'],
// 				prop: props['属相'],
// 				speed: props['移动'],
// 				career: props['职业'],
// 				skill_names,
// 			};

// 			return op;
// 		})
// 	);
// }


// // data.skills = JSON.parse(fs.readFileSync(`./task/_summons.json`, 'utf8')).skills;
// {
// 	data.skills = await Promise.all(
// 		data.summons.map(sm => sm.skill_names).flat().uniq()
// 			.map(async (skill_name) => {
// 				let _skill = await fetch_name('绝学/' + skill_name);
// 				let props = bilidata_to_obj(_skill?.query.data);
// 				return {
// 					name: skill_name,
// 					cd: props['绝学冷却'],
// 					cost: props['绝学消耗'],
// 					shoot: props['绝学射程'],
// 					range: props['绝学范围'],
// 					type: props['绝学类别'],
// 					desc: remove_html_tag(props['绝学描述']),
// 				};
// 			})
// 	);
// }


// let as = summons.map(s => s.skill_names).flat();
// console.log(as.length, as.uniq().length);


function handle_source(source = '') {
	return source.replace(/[\{\}]/g, '')
		.split('|')
		.filter(i => i.includes('='))
		.reduce((all, i) => {
			let ctx = remove_html_tag(i).replace(/\s+$/g, '').split('=');
			all[ctx[0]] = ctx[1];
			return all;
		}, {})
}

function get_summons() {
	let summons = items.map(item => {
		let ss = item.desc.match(/\[\[([^\]]+)\]\]/gm)?.uniq();
		if (!ss) { return; }
		return ss;
	}).filter(Boolean).flat().uniq();
	// let summons = collect_summons();
	return summons;
}

async function fetch_name(name = '') {
	let obj = {
		subject: decodeURIComponent(name),
		ns: 0,
		type: 'xml',
	};
	let res = await fetch('https://wiki.biligame.com/tdj/api.php', {
		headers: {
			'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
		},
		body: `action=smwbrowse&format=json&browse=subject&params=${encodeURIComponent(JSON.stringify(obj))}`,
		method: 'POST',
	});

	let raw = await res.json();

	return raw;
}

function bilidata_to_obj(data = []) {
	return data.reduce((all, i) => {
		let items = i.dataitem?.map(i => i?.item);
		all[i.property] = (items[0] && items.length > 1) ? items : items?.[0];
		return all;
	}, {});
}

function remove_html_tag(html = '') {
	return html.replace(/<br\s?\/?>/g, '\n').replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');
}
