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

	adv_skills.data = adv_skills.data_raw.concat(sub_skills_data);

	outputJSON({
		json: adv_skills.data,
		fn: adv_skills.fn,
		space: 2,
		// cn2tw: true,
	});

	return adv_skills.data;
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
