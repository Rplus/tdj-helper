import fs from 'fs';
import path from 'path';
import { Converter } from 'opencc-js';
import * as OpenCC from 'opencc-js';
import pLimit from 'p-limit';

/*
 * bili url demo
 *
 *
 * 拿到所有狀態的 name array
 * https://wiki.biligame.com/tdj/api.php?action=ask&query=[[分类:状态]]|limit=9999&format=json
 *
 * 拿到所有狀態的 name array
 * https://wiki.biligame.com/tdj/api.php?action=ask&query=[[分类:状态]]|limit=9999|?类别=cate|?驱散=dispellable|?扩散=extendable|?偷取=stealable|?描述=desc&format=json
 *
 * 拿到狀態頁 HTML，需搭配 html structure parser
 * https://wiki.biligame.com/tdj/api.php?action=parse&pageid=4467&prop=text&format=json
 *
 *
 *
 *
 * 拿到 召唤物 name array，比較準
 * https://wiki.biligame.com/tdj/api.php?action=ask&query=[[分类:召唤物]]|limit=1000&format=json
 *
 * 拿到 召唤物 name array，search字串可能誤判
 * https://wiki.biligame.com/tdj/api.php?action=opensearch&search=召唤物&limit=50
 *
 * 更精準拿到所有 category 條目
 * https://wiki.biligame.com/tdj/api.php?action=query&list=categorymembers&cmtitle=Category:召唤物&cmlimit=max&format=json
 *
 *
 * 特定角色的援袭绝学
 * https://wiki.biligame.com/tdj/api.php?action=ask&query=[[分类:援袭绝学]][[所属::尉迟良]]&format=json
 *
 * 所有的 援袭绝学
 * https://wiki.biligame.com/tdj/api.php?action=ask&query=[[分类:援袭绝学]]&format=json
 * https://wiki.biligame.com/tdj/api.php?action=query&list=categorymembers&cmtitle=Category:援袭绝学&cmlimit=max&format=json
 *
 *
 *
 * 通用型取頁面 property，資料較髒
 * let params = encodeURIComponent(JSON.stringify({
			subject: name,
			ns: 0,
			type: 'xml',
		}))};
 * https://wiki.biligame.com/tdj/api.php?action=smwbrowse&format=json&browse=subject&params=${params}
 *
 *
 * 通用型取頁面
 * https://wiki.biligame.com/tdj/api.php?action=parse&page=天赋/五采仁兽&prop=wikitext&format=json&formatversion=2&utf8=1
 * https://wiki.biligame.com/tdj/api.php?action=parse&page=天赋/五采仁兽&prop=parsetree&format=json&formatversion=2&utf8=1
 * formatversion 2: 現代style，更少奇怪的 source
 * prop=wikitext: wiki source text，wikitext，要手動用 regexp parse
 * prop=parsetree: wikitext 轉成 xml tree，不用自己 parse
 */



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

export const converter = OpenCC
	// .Converter({ from: 'cn', to: 'tw' })
	.ConverterFactory(OpenCC.Locale.from.cn, OpenCC.Locale.to.tw, [customDict]);

export const converter_tw2cn = OpenCC
	// .Converter({ from: 'cn', to: 'tw' })
	.ConverterFactory(OpenCC.Locale.from.tw, OpenCC.Locale.to.cn);

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
		`\x1b[7mv\x1b[0m Data saved as ${fileName} ! ( ${fileContent.length / 1000} kb )`,
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

export function get_bili_data_url(name = '') {
	let obj = {
		subject: decodeURIComponent(name),
		ns: 0,
		type: 'xml',
	};
	return `https://wiki.biligame.com/tdj/api.php?action=smwbrowse&format=json&browse=subject&params=${encodeURIComponent(JSON.stringify(obj))}`;
}

export function get_bili_datatree_url(pagename = '') {
	return `https://wiki.biligame.com/tdj/api.php?action=parse&page=${encodeURIComponent(pagename)}&prop=parsetree&format=json&formatversion=2&utf8=1`;
}

import { XMLParser } from 'fast-xml-parser';
export const xml_parser = new XMLParser({
	isArray: (name) => (name === 'part'),
	parseTagValue: false,
	ignoreComments: true,
	trimValues: true,
	stopNodes: ["root.template.part.value"],
  ignoreAttributes: false, // 是否保留屬性 (例如 category="cooking")
  // attributeNamePrefix: "@_" // 屬性的前綴字
});

export function bili_xml_to_obj(xml = '<xml></xml>') {
	return xml_parser.parse(xml)?.root?.template;
}

export async function fetch_bili_name_from_xml_to_json({
	name = '',
	cached_path = './rawres/123.json',
	ignore_cached = false,
}) {
	const res = await fetch_with_cached({
		url: get_bili_datatree_url(name),
		cached_path: `./task/rawres/bili/${name}.parsetree.res.json`,
		is_json: true,
		ignore_cached,
		sleep_time: random_time(1000, 3000),
	});

	const raw_data = xml_parser.parse(res?.parse?.parsetree);
	const parts = raw_data?.root?.template?.part;
	if (!Array.isArray(parts)) {
		return {};
	}
	// return parts;
	return parts.reduce((all, i) => {
		if (i?.name) {
			// 確保 value 有值才處理，避免傳入 undefined
			all[i.name] = remove_html_tag(i.value || '').trimEnd();
		}
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

export const sleep = (time = 0) => {
	return new Promise(resolve => setTimeout(resolve, time));
};

export function bilidata_to_obj(data = []) {
	return data.reduce((all, i) => {
		if (i.property.startsWith('_')) {
			return all;
		}
		let items = i.dataitem?.map((i) => i?.item);
		all[i.property] = items[0] && items.length > 1 ? items : items?.[0];
		return all;
	}, {});
}
export function wikitext_to_obj(text = '') {
	const lines = text.trim().replace(/^\{\{/, '').replace(/\}\}$/, '').split(/\n/).filter(i => i.includes('='));
	return lines.reduce((obj, line) => {
		const cleantext = line.replace(/^\|/, '').trim();
		const index = cleantext.indexOf('=');
		if (index == -1) {
			return null;
		}

		const key = cleantext.substring(0, index).trim();
		const value = cleantext.substring(index + 1).trim();
		obj[key] = value;

		return obj;
	}, {});
}
export function parse_wikitext_res(res = {}) {
	if (!res?.parse) { return {}; }
	return {
		title: res.parse.title,
		...wikitext_to_obj(res.parse.wikitext['*']),
	};
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

export function uniq_array(array = [], key1 = 'key', key2 = 'name') {
	return Array.from(
		array.reduce((map, item) => {
			// 建立唯一識別碼，中間加個分隔符號避免欄位內容剛好接起來導致誤判
			const key = `${item[key1]}____${item[key2]}`;
			if (!map.has(key)) {
				map.set(key, item);
			}
			return map;
		}, new Map()).values()
	)
}

function remove_summon_syntax(str = '') {
	return str.replace(/\[\[召[唤喚]物\/(.+)\|\1\]\]/gm, '$1');
}

export function remove_html_tag(html = '') {
	return remove_summon_syntax(
		html.replace(/<br\s?\/?>/g, '\n').replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '').replaceAll('&lt;br&gt;', '\n'),
	);
}

/**
 * 通用型 fetch_with_cached
 * @param {Object} options
 * @param {string} options.url - 要抓取的 URL
 * @param {string} [options.cached_path='./123.json'] - 快取檔案存放路徑
 * @param {boolean} [options.is_json=true] - 是否以 JSON 處理
 * @param {boolean} [options.ignore_cached=false] - 是否忽略快取強制重新抓取
 * @param {boolean} [options.sleep_time=0] - 延遲多久再發出請求，以避免被ban
 */
export async function fetch_with_cached({
	url = '',
	cached_path = './rawres/123.json',
	is_json = true,
	ignore_cached = false,
	sleep_time = 0,
}) {
	if (!url) throw new Error('URL is required');

	const cached_dir_path = path.dirname(cached_path);

	try {
		// 1. 檢查快取檔案是否存在
		if (!ignore_cached && fs.existsSync(cached_path)) {
			const data = fs.readFileSync(cached_path, 'utf8');
			return is_json ? JSON.parse(data) : data;
		}

		if (sleep_time > 0) {
			console.log(`🛑 準備連網，冷卻 ${sleep_time}ms...`);
			await sleep(sleep_time);
		}

		console.log(111, url, 222, decodeURIComponent(url));

		// 2. 若無快取或忽略快取 → fetch
		const res = await fetch(url, {
			headers: random_header(),
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

function random_header() {
	const USER_AGENTS = [
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
			'(KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 ' +
			'(KHTML, like Gecko) Version/17.0 Safari/605.1.15',
		'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 ' +
			'(KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
	];
	const ACCEPT_LANGS = [
		'zh-TW,zh;q=0.9,en;q=0.8',
		'zh-CN,zh;q=0.9,en;q=0.8',
		'zh-CN,zh;q=0.9,ja;q=0.8',
		'en-US,en;q=0.9,zh;q=0.8',
		'ja,en;q=0.9,zh;q=0.8'
	];
	const REFERERS = [
		'https://wiki.biligame.com/',
		'http://tdj.zlongame.com/',
		'https://wiki.biligame.com/tdj/',
		'https://wiki.biligame.com/tdj/%E7%BB%9D%E5%AD%A6%E5%88%97%E8%A1%A8',
		'https://wiki.biligame.com/tdj/%E5%8F%8A%E8%BA%AB%E5%9B%BE%E9%89%B4',
		'https://wiki.biligame.com/tdj/%E8%8B%B1%E7%81%B5%E5%9B%BE%E9%89%B4',
		'https://wiki.biligame.com/tdj/%E5%8F%AC%E5%94%A4%E7%89%A9/%E5%95%B8%E9%9C%9C',
	];

	const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
	return {
		'User-Agent': pick(USER_AGENTS),
		'Accept-Language': pick(ACCEPT_LANGS),
		'Referer': pick(REFERERS),
		'Connection': 'keep-alive',
	};
}

export function random_time(min = 0, max = 1000) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function compress_objects(objs, order = []) {
	if (!objs.length) return { fields: [], data: [] };
  // 收集所有欄位
  const fields = [...new Set(objs.flatMap(Object.keys))];

  // 先依照 order 排序，再把剩下的補上
  const ordered_fields = [
    ...order.filter(f => fields.includes(f)),
    ...fields.filter(f => !order.includes(f))
  ];

  // 壓縮資料，布林值轉成 0/1
  const data = objs.map(obj =>
    ordered_fields.map(f => {
      const val = obj[f];
      return typeof val === 'boolean' ? (val ? 1 : 0) : val ?? null;
    })
  );

  return { fields: ordered_fields, data };
}

export function decompress_objects(compressed) {
	const { fields, data } = compressed;
	return data.map(row => {
		const obj = {};
		fields.forEach((field, i) => {
			const val = row[i];
			// 還原 0/1 成布林
			obj[field] = val === 0 || val === 1 ? Boolean(val) : val;
		});
		return obj;
	});
}
