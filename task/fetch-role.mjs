import fs from 'fs';
import pLimit from 'p-limit';
import {
	raw_data,
	outputJSON,
	fetch_with_cached,
	pick_obj,
	remove_html_tag,
	converter,
	uniq_array,
	random_time,
} from './u.mjs';

// const FORCE_FETCH = true;
const FORCE_FETCH = process.argv.includes('--force-fetch');
const fetch_limit = pLimit(5);

let all_summons = null;

try {
	const raw = fs.readFileSync('./task/rawres/summons.json', 'utf8');
	all_summons = JSON.parse(raw);
} catch (err) {
	console.error('讀取 summons.json 失敗:', err.message);
	// 這裡可以選擇給預設值
	all_summons = { summons: [], skills: [], };
}


const roles_tw = await fetch_with_cached({
	url: raw_data.roles.url('tw'),
	cached_path: './task/rawres/roles.tw.res.json',
	is_json: true,
	ignore_cached: FORCE_FETCH,
});
const roles_cn = await fetch_with_cached({
	url: raw_data.roles.url('cn'),
	cached_path: './task/rawres/roles.cn.res.json',
	is_json: true,
	ignore_cached: FORCE_FETCH,
});

const tw_map = new Map(
	roles_tw.data.data.map(r => [r.hero_icon, r])
);

const merged_roles = roles_cn.data.data.map(role_cn => {
	role_cn.path = encodeURIComponent(role_cn.name);
	const role_tw = tw_map.get(role_cn.hero_icon);

	let op = role_tw
		? {
				...role_tw,
				pinyin_tw: role_tw.pinyin,
				pinyin: role_cn.pinyin,
				path: role_cn.path,
			}
		: role_cn;

	// // tw 宇文拓資料錯誤
	// if (role_cn.pinyin === 'yuwentuo') {
	// 	op.pinyin_tw = null;
	// }

	return op;
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
	json: merged_roles,
	fn: `${raw_data.roles.fn}.op.json`,
	cn2tw: false,
});


// fetch all roles' detail json
let fetched_details = [];
for (const role of merged_roles) {
	const _lang = role.pinyin_tw ? 'tw' : 'cn';
	const _pinyin = _lang === 'tw' ? role.pinyin_tw : role.pinyin;

	const detail = await fetch_with_cached({
		url: raw_data.role_deatil.url(_pinyin, _lang),
		cached_path: `./task/rawres/tdj-roles/${role.name}.${_lang}.json`,
		is_json: true,
		ignore_cached: FORCE_FETCH,
		sleep_time: random_time(1000, 3000), // 加隨機延遲
	});

	fetched_details.push(detail);
}

outputJSON({
	json: fetched_details,
	fn: './task/rawres/_all_role_details.raw.json',
	// space: 0,
	cn2tw: true,
});

const all_icons = {};
const all_strategy = [];

let all_skill = [];

// handle details
const op_roles = fetched_details
	.map(i => {
		const role = i.data.data[0];
		const basic_role = merged_roles.find(r => r.hero_icon === role.hero_icon);

		all_icons[role.prop_icon.toLowerCase()] = role.prop;
		all_icons[role.career_icon.toLowerCase()] = role.career;

		// get strategy
		let strategy;
		const _strategy = role.strategy?.[0];
		if (_strategy?.name) {
			const { unlock_condition, ...rest } = _strategy; // 解構排除不需要的欄位
			strategy = _strategy.name;
			all_strategy.push(rest);
		}

		// get summons
		let summons;
		let _summons = all_summons.summons?.filter((summon) => summon.owner[1] === role.pinyin);
		if (_summons.length) {
			summons = _summons.map((s) => s.name);
		}

		// get skills
		if (role.skill) {
			all_skill = all_skill.concat(
				role.skill.map(i => {
					let o = pick_obj(i, ['img', 'name', 'type', 'cd', 'cost', 'shoot', 'range', 'way', 'desc',])
					o.desc = remove_html_tag(o.desc);
					return o;
				})
			);
		}

		let ooop = {
			...pick_obj(role, [
				'name',
				'rarity',
				'prop',
				'hero_icon',
				'career',
				'pinyin',
				'pic',
				'rarity',
				'position',
				'range',
				'speed'
			]),
			...pick_obj(basic_role, [
				'pinyin_tw',
				'path',
			]),

			status: {
				hp: +role.qixue,
				atk_mag: +role.magic_attack,
				atk_phy: +role.physical_attack,
				def_mag: +role.magic_defense,
				def_phy: +role.physical_defense,
				crit: +role.huixin,
			},

			...(strategy && {strategy}),
			...(summons && {summons}),

		};

		// attackive_tank
		if ((role.career === '铁卫' || role.career === '鐵衛') && role.equipment?.[3]?.physical_attack) {
			ooop.career2 = '猛士';
		}

		return ooop;
	});

outputJSON({
	json: op_roles,
	fn: './task/rawdata/roles.src.json',
	// space: 0,
	cn2tw: true,
});
outputJSON({
	json: op_roles,
	fn: './src/lib/data/roles.min.json',
	space: 0,
	cn2tw: true,
});



const all_skill_hant = JSON.parse(converter(JSON.stringify(
	all_skill.toSorted((a, b) => {
		// localeCompare 可以正確處理字串與數字混合的情況
		return a.img.localeCompare(b.img, undefined, { numeric: true, sensitivity: 'base' });
	})
)));

const unique_all_skill = uniq_array(all_skill_hant, 'name', 'img');

outputJSON({
	json: all_skill_hant,
	fn: './task/rawres/__skills.json',
	// space: 0,
	cn2tw: true,
});

outputJSON({
	json: unique_all_skill,
	fn: './task/rawres/__uni_skills.json',
	// space: 0,
	cn2tw: true,
});


// ================
// === strategy ===
// ================


const ICONS_MAPPING = {
	...all_icons,
	female: '女',
	male: '男',
	strategy_core: '陣眼',
	'fire/ice/electricity': '炎冰雷',
	'light/shadow/dusk': '光暗幽',
};

const strategy_overrides = {
	'三身通智陣': [ 'strategy_core', 'strategy_core' ],
	// '驅雷魔魄陣': [ 'dusk' ],
	// '狐靈神氛陣': [ 'dusk' ],
	// '暗月鬥靈陣': [ 'melee' ],
};


const op_strategy = all_strategy.map((item) => {
	let obj = {
		name: item.name,
		img: item.img,
		desc: item.desc,
		members: [
			gen_mem_by_img(item.icon_center),
			...Object.keys(item)
				.filter((prop) => /^icon\d$/.test(prop) && item[prop])
				.map((prop) => gen_mem_by_img(item[prop])),
		],
	};

	if (strategy_overrides[item.name]) {
		obj.members.push(...strategy_overrides[item.name].map(gen_mem_by_img));
	}

	return obj;
});

outputJSON({
	json: op_strategy,
	fn: './task/rawres/_all_strategy.json',
	space: 0,
	cn2tw: true,
});

function gen_mem_by_img(img = '') {
	let role = op_roles.find((r) => r.hero_icon === img);
	if (role) {
		return {
			name: role.name,
			img: img,
		};
	}

	if (ICONS_MAPPING[img]) {
		return {
			name: ICONS_MAPPING[img],
		};
	}

	console.error('gg:', img);
	return img;
}
