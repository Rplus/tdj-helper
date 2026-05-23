import fs from 'fs';
// import pLimit from 'p-limit';
import {
	// raw_data,
	outputJSON,
	fetch_with_cached,
	// pick_obj,
	// remove_html_tag,
	// converter,
	// converter_tw2cn,
	// uniq_array,
	random_time,
	get_bili_data_url,
	bilidata_to_obj,
	get_bili_datatree_url,
	xml_parser,
	fetch_bili_name_from_xml_to_json,
	// wikitext_to_obj,
	// parse_wikitext_res,
	// read_json_file,
} from './u.mjs';

// const FORCE_FETCH = true;
const FORCE_FETCH = process.argv.includes('--force-fetch');


let support_skills = [];


{
	// SUPPORT SKILLS, 援襲絕學
	let data = await fetch_with_cached({
		url: 'https://wiki.biligame.com/tdj/api.php?action=ask&query=[[分类:援袭绝学]]&format=json',
		// url: 'https://wiki.biligame.com/tdj/api.php?action=opensearch&search=援袭绝学&limit=50',
		cached_path: `./task/rawres/bili/分類:援襲絕學.res.json`,
		is_json: true,
		ignore_cached: FORCE_FETCH,
		sleep_time: random_time(1000, 3000),
	});

	await fetch_with_cached({
		url: 'https://wiki.biligame.com/tdj/api.php?action=query&list=categorymembers&cmtitle=Category:援袭绝学&cmlimit=max&format=json',
		// url: 'https://wiki.biligame.com/tdj/api.php?action=opensearch&search=援袭绝学&limit=50',
		cached_path: `./task/rawres/_cate.援袭绝学.res.json`,
		is_json: true,
		ignore_cached: FORCE_FETCH,
		sleep_time: random_time(1000, 3000),
	});

	await fetch_with_cached({
		url: 'https://wiki.biligame.com/tdj/api.php?action=query&list=categorymembers&cmtitle=Category:召唤物&cmlimit=max&format=json',
		// url: 'https://wiki.biligame.com/tdj/api.php?action=opensearch&search=援袭绝学&limit=50',
		cached_path: `./task/rawres/_cate.召唤物.res.json`,
		is_json: true,
		ignore_cached: FORCE_FETCH,
		sleep_time: random_time(1000, 3000),
	});

	data.query.results


}




// let page = '绝学/矩子之域·贰式';
// let page = '绝学/机巧制造·贰式';
let page = '援袭绝学/光轮斩·援/4';

let res2 = await fetch_bili_name_from_xml_to_json({
	name: page,
	ignore_cached: FORCE_FETCH,
});

outputJSON({
	json: res2,
	fn: `./task/rawres/_bili.${page.replace('/', '-')}.test.json`,
	// space: 0,
	// cn2tw: true,
});



/*
這可以拿到 尉迟良 的 援袭绝学 data
fetch("https://wiki.biligame.com/tdj/api.php?action=ask&query=[[分类:援袭绝学]][[所属::尉迟良]]&format=json")



fetch("https://wiki.biligame.com/tdj/api.php?action=ask&query=[[分类:援袭绝学]]&format=json")
fetch("https://wiki.biligame.com/tdj/api.php?action=ask&query=[[分类:状态]]&format=json")


有值會傳這個，with results
{
	"query": {
		"printrequests": [
			{
				"label": "",
				"key": "",
				"redi": "",
				"typeid": "_wpg",
				"mode": 2
			}
		],
		"results": {
			"援袭绝学/矩子之域·援/4": {
				"printouts": [],
				"fulltext": "援袭绝学/矩子之域·援/4",
				"fullurl": "https://wiki.biligame.com/tdj/%E6%8F%B4%E8%A2%AD%E7%BB%9D%E5%AD%A6/%E7%9F%A9%E5%AD%90%E4%B9%8B%E5%9F%9F%C2%B7%E6%8F%B4/4",
				"namespace": 0,
				"exists": "1",
				"displaytitle": ""
			},
			"援袭绝学/矩子之域·援/5": {
				"printouts": [],
				"fulltext": "援袭绝学/矩子之域·援/5",
				"fullurl": "https://wiki.biligame.com/tdj/%E6%8F%B4%E8%A2%AD%E7%BB%9D%E5%AD%A6/%E7%9F%A9%E5%AD%90%E4%B9%8B%E5%9F%9F%C2%B7%E6%8F%B4/5",
				"namespace": 0,
				"exists": "1",
				"displaytitle": ""
			}
		},
		"serializer": "SMW\\Serializers\\QueryResultSerializer",
		"version": 2,
		"meta": {
			"hash": "a752a57e6a88a86705c02dfc01c0abc9",
			"count": 2,
			"offset": 0,
			"source": "",
			"time": "0.000425"
		}
	}
}

空的會長這樣，without results
{
	"query": {
		"printrequests": [
			{
				"label": "",
				"key": "",
				"redi": "",
				"typeid": "_wpg",
				"mode": 2
			}
		],
		"results": [],
		"serializer": "SMW\\Serializers\\QueryResultSerializer",
		"version": 2,
		"meta": {
			"hash": "8abf92b9a496fa12811f646f040f3025",
			"count": 0,
			"offset": 0,
			"source": "",
			"time": "0.000035"
		}
	}
}
 */