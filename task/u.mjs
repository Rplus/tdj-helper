import fs from 'fs';
import path from 'path';
import { Converter } from 'opencc-js';
import * as OpenCC from 'opencc-js';
import pLimit from 'p-limit';

const customDict = [
	['於小雪', '于小雪'],
	['寧採臣', '寧采臣'],
	['鮮於超', '鮮于超'],
	['星佔賢者', '星占賢者'],
	['激活', '啟動'],
	['概率', '機率'],
	['酒困', '酒睏'],
	['减', '減'],
	['絃歌', '弦歌'],
	['地御之陣', '地禦之陣'],
	['兇', '凶'],
	['血魂之系', '血魂之繫'],
	['蘇生', '甦生'],
	['捲土歸', '卷土歸'],
	['指鑑', '指鑒'],
	['希光迴音', '希光回音'],
	['公子同游', '公子同遊'],
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
		cached_path: './task/rawres/roles.res.json',
		rawdata: null,
		// https://tdj-activity.zlongame.com/tdj/data/mQuery.do?id=0&action=info&module=hero&type=basic
	},
	role_deatil: {
		url: (name, lang) => get_url({ module: 'hero', type: 'detail', query: name }, lang),
		fn: './task/rawdata/roles_detail',
		cached_path: './task/rawres/roles_detail.res.json',
		rawdata: null,
		// https://tdj-activity.zlongame.com/tdj/data/mQuery.do?id=0&action=info&module=hero&type=detail&query=%s
	},
	ornaments: {
		url: (name) => get_url({ module: 'ornaments', type: 'ornaments' }),
		fn: './task/rawdata/ornaments',
		cached_path: './task/rawres/ornaments.res.json',
		rawdata: null,
		// https://tdj-activity.zlongame.com/tdj/data/mQuery.do?id=0&action=info&module=ornaments&type=ornaments
	},
	ornaments_tw: {
		url: (name) => get_url({ module: 'ornaments', type: 'ornaments' }, 'tw'),
		fn: './task/rawdata/ornaments.tw',
		cached_path: './task/rawres/ornaments.tw.res.json',
		rawdata: null,
		// https://tdj-activity.zlongame.com/tdj/data/mQuery.do?id=0&action=info&module=ornaments&type=ornaments
	},
};

function get_url(qs_obj = {}, lang = 'cn') {
	const defaults = {
		id: lang === 'cn' ? 0 : 1,
		action: 'info',
		module: 'hero',
		type: 'basic',
	};

	const params = new URLSearchParams({ ...defaults, ...qs_obj });
	const _url = `https://${domains[lang]}/tdj/data/mQuery.do?${params}`;

	// 如果需要代理，可在這裡開啟
	// if (lang === 'cn') {
	// 	console.log('cn use proxy');
	// 	return `https://corsproxy.io/?url=${_url}`;
	// }
	return _url;
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
	ensureDirectoryExistence(fileName);
	fs.writeFileSync(fileName, fileContent);
	console.log(
		'\x1b[46m%s\x1b[0m',
		`Data saved as ${fileName}! ( ${fileContent.length / 1000} kb )`,
	);
}

// ref: https://stackoverflow.com/a/34509653
function ensureDirectoryExistence(filePath = '') {
	var dirname = path.dirname(filePath);
	if (fs.existsSync(dirname)) {
		return true;
	}
	ensureDirectoryExistence(dirname);
	fs.mkdirSync(dirname);
}

export function getArgs() {
	return process.argv.slice(2).reduce((all, i) => {
		let pair = i.split('=');
		all[pair[0]] = pair[1];
		return all;
	}, {});
}

export function read_json_file(file_path = './gg.txt') {
	let content;
	try {
		// fs.unlinkSync(filename);
		content = fs.readFileSync(file_path, 'utf8');
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
	// let res = await fetch('https://wiki.biligame.com/tdj/api.php', {
	// 	headers: {
	// 		'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
	// 	},
	// 	body: `action=smwbrowse&format=json&browse=subject&params=${encodeURIComponent(JSON.stringify(obj))}`,
	// 	// body: new URLSearchParams({
	// 	// 	action: 'smwbrowse',
	// 	// 	format: 'json',
	// 	// 	browse: 'subject',
	// 	// 	params: JSON.stringify({
	// 	// 		subject: name, // 頁面標題
	// 	// 		ns: 0,           // namespace 0 = 主條目
	// 	// 		// type: 'xml'
	// 	// 	}),
	// 	// }),
	// 	method: 'POST',
	// 	// verbose: true,
	// });
	// console.log(res, `action=smwbrowse&format=json&browse=subject&params=${encodeURIComponent(JSON.stringify(obj))}`);

	let res = await fetch(`https://wiki.biligame.com/tdj/api.php?action=smwbrowse&format=json&browse=subject&params=${encodeURIComponent(JSON.stringify(obj))}`);

	let raw = await res.json();

	return raw;
}

export function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function bilidata_to_obj(data = []) {
	return data.reduce((all, i) => {
		let items = i.dataitem?.map((i) => i?.item);
		all[i.property] = items[0] && items.length > 1 ? items : items?.[0];
		return all;
	}, {});
}

const fetch_limit = pLimit(5);
export async function fetch_bwiki_props_by_name(name = '', force = false) {
	let props;
	let fn = `./task/rawdata/bili-wiki/${decodeURIComponent(name)}.txt`;

	if (fs.existsSync(fn) && !force) {
		props = await read_json_file(fn);
	} else {
		console.log('parsing: ', decodeURIComponent(name));

		let raw = await fetch_limit(() => fetch_name(name));
		props = bilidata_to_obj(raw?.query?.data);
		writeFile(fn, JSON.stringify(props));
	}

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
		html.replace(/<br\s?\/?>/g, '\n').replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, ''),
	);
}

/**
 * 通用型 fetch_with_cached
 * @param {Object} options
 * @param {string} options.url - 要抓取的 URL
 * @param {string} [options.cached_path='./123.json'] - 快取檔案存放路徑
 * @param {boolean} [options.is_json=true] - 是否以 JSON 處理
 * @param {boolean} [options.ignore_cached=false] - 是否忽略快取強制重新抓取
 */
export async function fetch_with_cached({
	url = '',
	cached_path = './rawres/123.json',
	is_json = true,
	ignore_cached = false
}) {
	if (!url) throw new Error('URL is required');

	const cached_dir_path = path.dirname(cached_path);

	try {
		// 1. 檢查快取檔案是否存在
		if (!ignore_cached && fs.existsSync(cached_path)) {
			const data = fs.readFileSync(cached_path, 'utf8');
			return is_json ? JSON.parse(data) : data;
		}

		console.log(111, url);
		// 2. 若無快取或忽略快取 → fetch
		const res = await fetch(url, {
			headers: {
				'User-Agent':
					'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
					'AppleWebKit/537.36 (KHTML, like Gecko) ' +
					'Chrome/122.0.0.0 Safari/537.36',
				'Accept-Language': 'zh-TW,zh;q=0.9,en;q=0.8',
				'Connection': 'keep-alive'
			}
		});

		if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);

		const text = await res.text();
		const parsed = is_json ? JSON.parse(text) : text;

		// 確保快取目錄存在
		fs.mkdirSync(cached_dir_path, { recursive: true });
		fs.writeFileSync(cached_path, text, 'utf8');

		return parsed;
	} catch (err) {
		// 3. 錯誤處理 → log
		// const log_path = path.join(cached_path, 'fetch_errors.log');
		const log_msg = `[${new Date().toISOString()}] URL: ${url}, Cache: ${cached_path}, Error: ${err.message}\n`;
		fs.appendFileSync('./task/fetch_errors.log', log_msg, 'utf8');
		throw err;
	}
}

