import fs from 'fs';
import { raw_data, writeFile, outputJSON, pick_obj, getArgs } from './u.mjs';

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
	fn: `${raw_data.ornaments_tw.fn}.tw.op.json`,
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
	let _url = role.pinyin_tw
		? raw_data.role_deatil.url(role.pinyin_tw, 'tw')
		: raw_data.role_deatil.url(role.pinyin, 'cn');

	return fetch(_url)
		.then((r) => r.json())
		.then((data) => {
			return data?.data?.data;
		});
}
