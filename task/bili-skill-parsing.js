import fs from 'fs';
import { raw_data, writeFile, outputJSON, pick_obj, getArgs } from './u.mjs';

Array.prototype.uniq = function () {
	return [...new Set(this)];
}

let adv_skills_of_role = {
	fn: './task/rawdata/_adv_skills_of_role.json',
	data: [],
}

let parse_new = getArgs()?.new;

let roles = JSON.parse(fs.readFileSync(`./task/rawdata/roles.op.json`, 'utf8'));

if (!parse_new && fs.existsSync(adv_skills_of_role.fn)) {
	adv_skills_of_role.data = JSON.parse(fs.readFileSync(adv_skills_of_role.fn, 'utf8'));
} else {
	adv_skills_of_role.data = await Promise.all(
		roles
			// .slice(0, 5)
			.map(async (role, index) => {
				let _sss = await fetch_name(role.path);
				let props = bilidata_to_obj(_sss?.query.data);

				return {
					name: role.name,
					pinyin: role.pinyin,
					adv_skills: props['绝学化神'],
				};
			}),
	);

	outputJSON({
		json: adv_skills_of_role.data,
		fn: adv_skills_of_role.fn,
		space: 2,
		// cn2tw: true,
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

if (!parse_new && fs.existsSync(adv_skills.fn)) {
	adv_skills.data_raw = JSON.parse(fs.readFileSync(adv_skills.fn, 'utf8'))
} else {
	adv_skills.data_raw = await get_adv_skills();
	adv_skills.data_raw = await get_sub_skills();
}
	// // test
	// adv_skills_details = JSON.parse(fs.readFileSync(adv_skills_file_name.replace('_processed', '_raw'), 'utf8'));
	// adv_skills_details = await get_sub_skills();

function remove_html_tag(html = '') {
	return html.replace(/<br\s?\/?>/g, '\n').replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');
}

function bilidata_to_obj(data = []) {
	return data.reduce((all, i) => {
		let items = i.dataitem?.map(i => i?.item);
		all[i.property] = (items[0] && items.length > 1) ? items : items?.[0];
		return all;
	}, {});
}


async function get_adv_skills() {
	console.log('Get_Adv_Skills');
	let skills = await Promise.all(
		adv_skills.names.map(async (sname) => {
			let info = await fetch_name(`绝学/${sname}`);
			let props = bilidata_to_obj(info?.query.data);
			let desc = remove_html_tag(props['绝学描述']);

			{
				// workaround:
				if (sname === '天剑圣裁·贰式') {
					desc = desc.replace('召唤天剑', '召喚[[召喚物/天劍|天劍]]');
				}
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
			let sub_skills = skill.desc.match(/「[^」]+式」/g).map(i => i.replace(/[「」]/g, ''));
			sub_skills_set.push(sub_skills);
		}
	});
	return sub_skills_set.flat();
}

async function get_sub_skills() {
	console.log('Get_Sub_Skills');

	let sub_skills_set = collect_sub_skills();
	let sub_skills_data = await Promise.all(
		sub_skills_set.map(async (skill) => {
			let raw = await fetch_name(`绝学/${skill}`);
			let props = bilidata_to_obj(raw?.query.data);
			let op = {
				name: skill,
				cost: props['绝学消耗'],
				shoot: props['绝学射程'],
				range: props['绝学范围'],
				type: props['绝学类别'],
				desc: remove_html_tag(props['绝学描述']),
			}

			if (parseInt(props['绝学冷却'])) {
				op.cd = props['绝学冷却'];
			}

			return op;
		})
	);

	adv_skills.data = adv_skills.data_raw.concat(sub_skills_data);

	outputJSON({
		json: adv_skills.data,
		fn: adv_skills.fn,
		space: 2,
		// cn2tw: true,
	});

	return adv_skills.data;
}




// SUMMONS
// SUMMONS
// SUMMONS
{
	let data = {
		names: [],
		summons: [],
		skills: [],
	};

	let _res = await fetch('https://wiki.biligame.com/tdj/api.php?action=opensearch&search=召唤物&limit=50');
	data.names = (await _res.json())?.[1];
	data.names.sort();

	{ // summons
		data.summons = await Promise.all(
			data.names.map(async (summon) => {
				let _sss = await fetch_name(summon);
				let props = bilidata_to_obj(_sss?.query.data);

				let inherent_name = props['天赋'];
				let inherent = await fetch_name('天赋/' + inherent_name);
				let inherent_props = bilidata_to_obj(inherent?.query.data);

				let skill_names = [].concat(props['绝学']);

				let op = {
					key: summon,
					name: summon.replace('召唤物/', ''),
					inherent_name,
					inherent: remove_html_tag(inherent_props['天赋6星']),
					range: props['射程'],
					stats: props['属性'],
					prop: props['属相'],
					speed: props['移动'],
					career: props['职业'],
					skill_names,
				};

				return op;
			})
		);
	}

	{ // summon skills
		data.skills = await Promise.all(
			data.summons.map(sm => sm.skill_names).flat().uniq()
				.map(async (skill_name) => {
					let _skill = await fetch_name('绝学/' + skill_name);
					let props = bilidata_to_obj(_skill?.query.data);
					return {
						name: skill_name,
						cd: props['绝学冷却'],
						cost: props['绝学消耗'],
						shoot: props['绝学射程'],
						range: props['绝学范围'],
						type: props['绝学类别'],
						desc: remove_html_tag(props['绝学描述']),
					};
				})
		);
	}

	{ // +劍聖的天劍資料
		data.names.push('召喚物/天劍');
		data.summons.push({
		  'key': '召喚物/天劍',
		  'name': '天劍',
		  'inherent_name': '凶劍煬魂',
		  'inherent': '行動時無視敵方角色阻擋。死亡時對周圍2格敵人施加「魂創」狀態，持續2回合，重置「天劍聖裁」冷卻時間。',
		  'range': '1',
		  'stats': '80%,80%,80%,80%,80%,80%',
		  'prop': '光',
		  'speed': '5',
		  'career': '御風',
		  'skill_names': [
		    '鎮罪之儀',
		    '逆轉乾坤‧天劍',
		    '魂刻‧天劍'
		  ]
		});
		data.skills = data.skills.concat([
			{
			  'name': '鎮罪之儀',
			  'cd': '3回合',
			  'cost': '-',
			  'shoot': '自身',
			  'range': '菱形3格',
			  'type': '物攻傷害',
			  'desc': '對範圍內所有敵人造成0.5倍傷害，施加2層「魂創」狀態，持續2回合。'
			},
			{
			  'name': '逆轉乾坤‧天劍',
			  'cd': '4回合',
			  'cost': '-',
			  'shoot': '3格',
			  'range': '單體',
			  'type': '支援',
			  'desc': '和召喚者交換氣血，並轉移所有「減益狀態」到自身。'
			},
			{
			  'name': '魂刻‧天劍',
			  'cd': '-',
			  'cost': '-',
			  'shoot': '-',
			  'range': '-',
			  'type': '被動',
			  'desc': '行動結束時恢復2格內的友方氣血（最大氣血的20%）。'
			},
		]);
	}

	outputJSON({
		json: data,
		fn: './task/rawdata/summons.json',
		space: 2,
		// cn2tw: true,
	});

	outputJSON({
		json: data,
		fn: './src/lib/data/summons.min.json',
		space: 0,
		cn2tw: true,
	});
}

// https://wiki.biligame.com/tdj/api.php
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
