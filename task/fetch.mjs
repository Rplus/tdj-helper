import fs from 'fs';
import pLimit from 'p-limit';
import { raw_data, writeFile, outputJSON, read_json_file } from './u.mjs';

const FORCE_FETCH = false;
const fetch_limit = pLimit(5);

//
//  #######  ########  ##    ##    ###    ##     ## ######## ##    ## ########  ######
// ##     ## ##     ## ###   ##   ## ##   ###   ### ##       ###   ##    ##    ##    ##
// ##     ## ##     ## ####  ##  ##   ##  #### #### ##       ####  ##    ##    ##
// ##     ## ########  ## ## ## ##     ## ## ### ## ######   ## ## ##    ##     ######
// ##     ## ##   ##   ##  #### ######### ##     ## ##       ##  ####    ##          ##
// ##     ## ##    ##  ##   ### ##     ## ##     ## ##       ##   ###    ##    ##    ##
//  #######  ##     ## ##    ## ##     ## ##     ## ######## ##    ##    ##     ######
//
raw_data.ornaments.rawdata = await fetch(raw_data.ornaments.url()).then((r) => r.json());
outputJSON({
	json: raw_data.ornaments.rawdata,
	fn: `${raw_data.ornaments.fn}.op.json`,
	cn2tw: false,
});
raw_data.ornaments_tw.rawdata = await fetch(raw_data.ornaments_tw.url()).then((r) => r.json());
outputJSON({
	json: raw_data.ornaments_tw.rawdata,
	fn: `${raw_data.ornaments_tw.fn}.op.json`,
	cn2tw: false,
});

//
// ########     ###     ######  ####  ######
// ##     ##   ## ##   ##    ##  ##  ##    ##
// ##     ##  ##   ##  ##        ##  ##
// ########  ##     ##  ######   ##  ##
// ##     ## #########       ##  ##  ##
// ##     ## ##     ## ##    ##  ##  ##    ##
// ########  ##     ##  ######  ####  ######
//
// role basic info
let roles_tw = await fetch(raw_data.roles.url('tw')).then((r) => r.json());
let roles_cn = await fetch(raw_data.roles.url('cn')).then((r) => r.json());

raw_data.roles.rawdata = roles_cn?.data?.data.map((role) => {
	let role_tw = roles_tw?.data?.data.find((_role) => _role.hero_icon === role.hero_icon);
	role.path = encodeURIComponent(role.name);
	return role_tw
		? {
				...role_tw,
				pinyin_tw: role_tw.pinyin, // tw_only
				pinyin: role.pinyin,
				path: role.path,
			}
		: role;
});

outputJSON({
	json: roles_tw,
	fn: `${raw_data.roles.fn}.tw.raw.json`,
	cn2tw: false,
});
outputJSON({
	json: roles_cn,
	fn: `${raw_data.roles.fn}.cn.raw.json`,
	cn2tw: false,
});
outputJSON({
	json: raw_data.roles.rawdata,
	fn: `${raw_data.roles.fn}.op.json`,
	cn2tw: false,
});

//
// ########  ######## ########    ###    #### ##        ######
// ##     ## ##          ##      ## ##    ##  ##       ##    ##
// ##     ## ##          ##     ##   ##   ##  ##       ##
// ##     ## ######      ##    ##     ##  ##  ##        ######
// ##     ## ##          ##    #########  ##  ##             ##
// ##     ## ##          ##    ##     ##  ##  ##       ##    ##
// ########  ########    ##    ##     ## #### ########  ######
//
// role's details

let roles_data = raw_data.roles.rawdata || [];

console.log('total roles length', roles_data.length);

raw_data.role_deatil.rawdata = await Promise.all(
	roles_data.slice(0).map((i) => fetch_role_detail(i)),
);
outputJSON({
	json: raw_data.role_deatil.rawdata,
	fn: `${raw_data.role_deatil.fn}.raw.json`,
	cn2tw: false,
});
outputJSON({
	json: raw_data.role_deatil.rawdata,
	fn: `${raw_data.role_deatil.fn}.op.json`,
	cn2tw: true,
});

//
// ##     ## ##       ########  ######
// ##     ## ##          ##    ##    ##
// ##     ## ##          ##    ##
// ##     ## ##          ##     ######
// ##     ## ##          ##          ##
// ##     ## ##          ##    ##    ##
//  #######  ########    ##     ######
//

async function fetch_role_detail(role) {
	let _lang = role.pinyin_tw ? 'tw' : 'cn';
	let _pinyin = _lang === 'tw' ? role.pinyin_tw : role.pinyin;
	let _url = raw_data.role_deatil.url(_pinyin, _lang);

	let fn = `./task/rawdata/tdj/${role.name}.${_lang}.json`;
	let op;

	if (fs.existsSync(fn) && !FORCE_FETCH) {
		// console.log('load-ing: ', fn);
		op = await read_json_file(fn);
	} else {
		op = await fetch_limit(() => {
			console.log('parsing: ', role.name);

			return fetch(_url)
				.then((r) => r.json())
				.then((raw) => {
					let _op = raw.data?.data;
					writeFile(fn, JSON.stringify(_op, null, 2));
					return _op;
				});
		});
	}

	return op;
}
