import fs from 'fs';
import {
	writeFile,
	outputJSON,
	getArgs,
	uniq,
	remove_html_tag,
	fetch_bwiki_props_by_name,
	read_json_file,
} from './u.mjs';
import { get_addition_skills_cn_names, } from './addition_skills.js';

Array.prototype.uniq = uniq;

let adv_skills_of_role = {
	fn: './task/rawdata/_adv_skills_of_role.json',
	data: [],
};

let parse_new = getArgs()?.new;

let roles = read_json_file(`./task/rawdata/roles.op.json`);

let FORCE_FETCH = false;

if (!parse_new && fs.existsSync(adv_skills_of_role.fn)) {
	adv_skills_of_role.data = read_json_file(adv_skills_of_role.fn);
} else {
	adv_skills_of_role.data = await Promise.all(
		roles
			// .slice(0, 20) // for dev test
			.map(async (role, index) => {
				let props = await fetch_bwiki_props_by_name(role.path, FORCE_FETCH);

				let op = {
					name: role.name,
					pinyin: role.pinyin,
					adv_skills: props['绝学化神'],
				};

				if (!role.pinyin_tw) {
					op.new = true;
				}

				return op;
			}),
	);

	outputJSON({
		json: adv_skills_of_role.data,
		fn: adv_skills_of_role.fn,
		space: 2,
		// cn2tw: true,
	});
	outputJSON({
		json: adv_skills_of_role.data,
		fn: adv_skills_of_role.fn.replace('.json', '.tw.json'),
		space: 2,
		cn2tw: true,
	});
}

let adv_skills = {
	fn: './task/rawdata/_adv_skills_all.json',
	data: [],
	names: [],
	fn_raw: './task/rawdata/_adv_skills_raw.json',
	data_raw: [],
};

adv_skills.names = adv_skills_of_role.data
	// .slice(20, 30)
	.map((item) => item.adv_skills)
	.filter(Boolean)
	.flat()
	.filter((i) => i && i.includes('·'))
	.uniq();


let unconfirmed_new_skills = get_addition_skills_cn_names();
// let unconfirmed_new_skills = [
// 	'扶摇霄汉',

// 	'一世愿·戒忌',
// 	'二世愿·守护',
// 	'三世愿·共念',

// 	'洞若观火·杀伐',
// 	'洞若观火·谋算',
// 	'洞若观火·蛰伏',

// 	'妖携影',
// 	'灵返光',
// 	'诸灵退散',
// 	'妖氛镇魄',
// 	'玄晔破封',
// ];

let log_未納進階技能 = [];
let log_已納進階技能 = [];
unconfirmed_new_skills.forEach(s => {
	if (adv_skills.names.includes(s)) {
		log_已納進階技能.push(s);
	} else {
		log_未納進階技能.push(s);
	}
});

console.log('log_已納進階技能', log_已納進階技能);
console.log('log_未納進階技能', log_未納進階技能);

adv_skills.names = adv_skills.names.concat(unconfirmed_new_skills);

if (!parse_new && fs.existsSync(adv_skills.fn)) {
	adv_skills.data_raw = read_json_file(adv_skills.fn);
} else {
	adv_skills.data_raw = await get_adv_skills();
	adv_skills.data_raw = await get_sub_skills();
}
// // test
// adv_skills_details = read_json_file(adv_skills_file_name.replace('_processed', '_raw'));
// adv_skills_details = await get_sub_skills();

async function get_adv_skills() {
	console.log('Get_Adv_Skills');
	let skills = await Promise.all(
		adv_skills.names.map(async (sname, index) => {
			let props = await fetch_bwiki_props_by_name(`绝学/${sname}`, FORCE_FETCH);
			let desc = remove_html_tag(props['绝学描述']);

			{
				// // workaround:
				// if (sname === '天剑圣裁·贰式') {
				// 	desc = desc.replace('召唤天剑', '召喚[[召喚物/天劍|天劍]]');
				// }
			}

			return {
				name: sname,
				// path: encodeURIComponent(sname),
				cd: props['绝学冷却'],
				cost: props['绝学消耗'],
				shoot: props['绝学射程'],
				range: props['绝学范围'],
				type: props['绝学类别'],
				desc: desc,
			};
		}),
	);

	outputJSON({
		json: skills,
		fn: adv_skills.fn_raw,
		space: 2,
		// cn2tw: true,
	});

	return skills;
}

function collect_sub_skills() {
	let sub_skills_set = [];
	adv_skills.data_raw.forEach((skill) => {
		if (skill.desc.match(/「[^」]+式」/)) {
			let sub_skills = skill.desc.match(/「[^」]+式」/g).map((i) => i.replace(/[「」]/g, ''));
			sub_skills_set.push(sub_skills);
		}
	});
	return sub_skills_set.flat();
}

async function get_sub_skills() {
	console.log('Get_Sub_Skills');

	let sub_skills_set = collect_sub_skills();
	let sub_skills_data = await Promise.all(
		sub_skills_set.map(async (skill, index) => {
			let props = await fetch_bwiki_props_by_name(`绝学/${skill}`, FORCE_FETCH);

			let op = {
				name: skill,
				cost: props['绝学消耗'],
				shoot: props['绝学射程'],
				range: props['绝学范围'],
				type: props['绝学类别'],
				desc: remove_html_tag(props['绝学描述']),
			};

			if (parseInt(props['绝学冷却'])) {
				op.cd = props['绝学冷却'];
			}

			return op;
		}),
	);

	adv_skills.data = adv_skills.data_raw
		.concat(sub_skills_data)
		.concat(custom_skills());

	outputJSON({
		json: adv_skills.data,
		fn: adv_skills.fn,
		space: 2,
		// cn2tw: true,
	});

	return adv_skills.data;
}

function custom_skills() {
	let skills_1 = [
		['天樞', '消耗2點「星屑」，使「搖光破軍界」開啟時，友方光屬相英靈所有絕學冷卻-1回合'],
		['天權', '消耗2點「星屑」，使「搖光破軍界」持續時，友方光屬相英靈使用絕學後為全場氣血百分比最低的1個其他友方驅散2個「有害狀態」並恢復氣血（最大氣血的40%）'],
		['玉衡', '消耗2點「星屑」，使「搖光破軍界」開啟時，結界持續回合數額外+1回合'],
		['開陽', '消耗2點「星屑」，使「搖光破軍界」持續時，敵方使用絕學後，對其施加「封咒」狀態，持續1回合'],
		['瑤光', '消耗4點「星屑」，在全場展開結界「搖光破軍界」，持續3回合。'],

		['鳳起九遐', '主動使用,反轉自身1個「減益狀態」並恢復氣血（恢復量為施術者物攻的1倍），自身獲得「凌雲」狀態和再移動（2格）。\n「凌雲」：無法普攻、反擊和使用傷害絕學，「戍援」替換為「戍援‧絕」。自身視為「飛行單位」，且自身處於僅飛行角色可停留的地塊上時法術免傷提升60%。受到致命傷害免除死亡，恢復30%氣血，強制取消「凌雲」狀態並使天賦進入冷卻。行動結束前可選擇使用絕學「鳳鳴於野」\n「戍援‧絕」：若其他友方對自身十字7格內的敵方發起對戰，則在「對戰後」對目標所在方向垂直3格範圍造成1次0.5倍物攻傷害，每成功造成1次傷害反轉該友方1個「減益狀態」並恢復20%最大氣血自身氣血大於70%時,「戌援‧絕」觸發範圍+2'],
		['鳳鳴於野', '主動使用，取消「凌雲」狀態並獲得再行動（2格）且本次行動「增益狀態」持續時間不減少。使用後切換為「鳳起九遐」'],

		['凝雷聚形', '召喚1個攜帶「離魂」狀態的「雷晶分身 」(「雷晶分身」繼承自身140%物攻屬性，其他屬性繼承100%，攜帶「雷晶護體」「輕身」「流霆」)', '召喚'],

		['無雙戰魂', '主動使用，自身獲得「無雙」狀態，持續 3回合。\n「無雙」:免疫「移動力限制」狀態，受到致命傷害時免除死亡，氣血恢復 30%，持續時間降低1回合。主動攻擊後獲得1層「龍膽」狀態，若擊殺目標或目標觸發「抵擋致命傷害」的效果，額外獲得1層「龍膽」狀態，並使「無雙」狀態持續時間延長1回合。\n「龍膽」:全屬性提升5%，獲得「龍膽」狀態時所有傷害絕學冷卻時間-1(上限4層)。'],
	];

	return [
		...skills_1.map(i => ({
			'name': i[0],
			'cd': '-',
			'cost': '-',
			'shoot': '自身',
			'range': '單體',
			'type': i[2] || '主動',
			'desc': i[1],
		})),
		// {
		// 	'name': '',
		// 	'cd': '-',
		// 	'cost': '-',
		// 	'shoot': '自身',
		// 	'range': '單體',
		// 	'type': '主動',
		// 	'desc': '',
		// },
	];
}

{
	// https://wiki.biligame.com/tdj/rest.php/v1/page/绝学%2F寒剑封喉·贰式
	// let res = await fetch(`https://wiki.biligame.com/tdj/rest.php/v1/page/${key}`)
	// let data = handle_source(res.json()?.source);
	// data.filter(i => i.startsWith('绝学化神'))
	// 	.map(i => i.split('=')?.[1]?.split(','))
	// function handle_source(source = '') {
	// 	return source.replace(/[{}]/g, '')
	// 		.split('|')
	// 		.map(i => remove_html_tag(i).replace(/\s+$/g, ''))
	// 		// .map(i => remove_html_tag(i).replace(/\s+$/g, '').split('='))
	// 		// .reduce((all, i) => {
	// 		// 	if (i[1]) {
	// 		// 		all[i[0]] = i[1].includes(',') ? i[1].replace(/\n+$/gm, '').split(',') : i[1];
	// 		// 	}
	// 		// 	return all;
	// 		// }, {});
	// }
}
