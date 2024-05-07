import fs from 'fs';
import { Converter } from 'opencc-js';
import * as OpenCC from 'opencc-js';

const customDict = [
	['於小雪', '于小雪'],
	['寧採臣', '寧采臣'],
	['鮮於超', '鮮于超'],
	['星佔賢者', '星占賢者'],
	['激活', '啟動'],
	['概率', '機率'],
	['酒困', '酒睏'],
];

const domains = {
	cn: 'tdj-activity.zlongame.com',
	// cn: 'tdj-activitytest.zlongame.com', // test
	tw: 'tdj-activity.game-beans.com',
	// tw: 'tdj-activitytest.game-beans.com', // test
};

export let raw_data = {
	roles: {
		url: (lang) => get_url({ module: 'hero', type: 'basic' }, lang),
		fn: './task/rawdata/roles',
		rawdata: null,
		// https://tdj-activity.zlongame.com/tdj/data/mQuery.do?id=0&action=info&module=hero&type=basic
	},
	role_deatil: {
		url: (name, lang) => get_url({ module: 'hero', type: 'detail', query: name }, lang),
		fn: './task/rawdata/roles_detail',
		rawdata: null,
		// https://tdj-activity.zlongame.com/tdj/data/mQuery.do?id=0&action=info&module=hero&type=detail&query=%s
	},
	ornaments: {
		url: (name) => get_url({ module: 'ornaments', type: 'ornaments' }),
		fn: './task/rawdata/ornaments',
		rawdata: null,
		// https://tdj-activity.zlongame.com/tdj/data/mQuery.do?id=0&action=info&module=ornaments&type=ornaments
	},
	ornaments_tw: {
		url: (name) => get_url({ module: 'ornaments', type: 'ornaments' }, 'tw'),
		fn: './task/rawdata/ornaments.tw',
		rawdata: null,
		// https://tdj-activity.zlongame.com/tdj/data/mQuery.do?id=0&action=info&module=ornaments&type=ornaments
	},
};

function get_url(qs_obj = {}, lang = 'cn') {
	qs_obj = {
		...{
			id: lang === 'cn' ? 0 : 1,
			action: 'info',
			module: 'hero',
			type: 'basic',
		},
		...qs_obj,
	};
	let qs = new URLSearchParams();

	for (let key in qs_obj) {
		qs.set(key, qs_obj[key]);
	}

	return `https://${domains[lang]}/tdj/data/mQuery.do?${qs.toString()}`;
}

const converter = OpenCC
	// .Converter({ from: 'cn', to: 'tw' })
	.ConverterFactory(OpenCC.Locale.from.cn, OpenCC.Locale.to.tw, [customDict]);

export function outputJSON(obj = {}) {
	let space = obj.space;
	if (space === undefined) {
		space = 2;
	}
	let fileContent = JSON.stringify(obj.json, null, space);
	writeFile(obj.fn, fileContent, obj.cn2tw);
}

export function writeFile(fileName = '', fileContent = '', cn2tw = false) {
	if (cn2tw) {
		fileContent = converter(fileContent);
	}
	fs.writeFileSync(fileName, fileContent);
	console.log(
		'\x1b[46m%s\x1b[0m',
		`Data saved as ${fileName}! ( ${fileContent.length / 1000} kb )`,
	);
}

export function getArgs() {
	return process.argv.slice(2).reduce((all, i) => {
		let pair = i.split('=');
		all[pair[0]] = pair[1];
		return all;
	}, {});
}

export function readJsonFile(filePath) {
	let content;
	try {
		// fs.unlinkSync(filename);
		content = fs.readFileSync(filePath, 'utf8');
		content = JSON.parse(content);
		return content;
	} catch (err) {
		// console.error(err.message);
		console.error(err);
		return null;
	}
}

export function parse_number(str = '') {
	return parseInt(str.replace(/\D/g, ''));
}

export function pick_obj(obj, props = []) {
	return props.reduce((all, prop) => {
		all[prop] = obj[prop];
		return all;
	}, {});
}

// https://wiki.biligame.com/tdj/api.php
export async function fetch_name(name = '') {
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

export function bilidata_to_obj(data = []) {
	return data.reduce((all, i) => {
		let items = i.dataitem?.map((i) => i?.item);
		all[i.property] = items[0] && items.length > 1 ? items : items?.[0];
		return all;
	}, {});
}

export async function fetch_bwiki_props_by_name(name = '') {
	let raw = await fetch_name(name);
	let props = bilidata_to_obj(raw?.query.data);
	return props;
}

export function uniq() {
	return [...new Set(this)];
}

function remove_summon_syntax(str = '') {
	return str.replace(/\[\[召[唤喚]物\/(.+)\|\1\]\]/gm, '$1');
}

export function remove_html_tag(html = '') {
	return remove_summon_syntax(
		html
			.replace(/<br\s?\/?>/g, '\n')
			.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '')
	);
}
