import fs from 'fs';
import { raw_data, writeFile, outputJSON, pick_obj, getArgs } from './u.mjs';

let skills_file_name = './task/rawdata/_adv_skills.json';

let parse_new = getArgs()?.new;

let roles = JSON.parse(fs.readFileSync(`./task/rawdata/roles.op.json`, 'utf8'));
let skills;

if (!parse_new && fs.existsSync(skills_file_name)) {
	skills = JSON.parse(fs.readFileSync(skills_file_name, 'utf8'));
} else {
	skills = await Promise.all(
		roles
			// .slice(0, 5)
			.map(async (role, index) => {
				let _sss = await fetch_name(role.path);

				return {
					name: role.name,
					pinyin: role.pinyin,
					adv_skills: _sss.query?.data
						.filter((i) => i.property === '绝学化神')[0]
						?.dataitem?.map((i) => i.item),
				};
			}),
	);

	outputJSON({
		json: skills,
		fn: skills_file_name,
		space: 2,
		// cn2tw: true,
	});
}

let adv_skills = skills
	// .slice(20, 30)
	.map((item) => item.adv_skills)
	.filter(Boolean)
	.flat()
	.filter((i) => i && i.includes('·'));

let adv_skills_file_name = './task/rawdata/_adv_skills_details_processed.json';
let adv_skills_details;
if (!parse_new && fs.existsSync(adv_skills_file_name)) {
	adv_skills_details = JSON.parse(fs.readFileSync(adv_skills_file_name, 'utf8'));
} else {
	adv_skills_details = await get_adv_skills();
	adv_skills_details = await get_sub_skills();
}
	// // test
	// adv_skills_details = JSON.parse(fs.readFileSync(adv_skills_file_name.replace('_processed', '_raw'), 'utf8'));
	// adv_skills_details = await get_sub_skills();

function remove_html_tag(html = '') {
	return html.replace(/<br\s?\/?>/g, '\n').replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');
}

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

async function get_adv_skills(fn = '') {
	console.log('Get_Adv_Skills');
	let _adv_skills_details = await Promise.all(
		adv_skills.map(async (sname) => {
			let info = await fetch_name(`绝学/${sname}`);
			let props = info?.query.data.reduce((all, i) => {
				all[i.property] = i.dataitem[0]?.item;
				return all;
			}, {});
			let desc = remove_html_tag(props['绝学描述']);

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
		json: _adv_skills_details,
		fn: adv_skills_file_name.replace('_processed', '_raw'),
		space: 2,
		// cn2tw: true,
	});

	return _adv_skills_details;
}

async function get_sub_skills() {
	console.log('Get_Sub_Skills');
	let _adv_skills_details = await Promise.all(
		adv_skills_details.map(async (skill) => {
			if (skill.desc.includes('使用后切换为')) {
				let sub_skills = skill.desc.match(/「[^」]+式」/g).map(i => i.replace(/[「」]/g, ''));
				let sub_skills_data = await Promise.all(
					sub_skills.map(async (sub_skill) => {
						let ss_info = await fetch_name(`绝学/${sub_skill}`);
						let ss_data = ss_info?.query.data;
						let ss_desc = remove_html_tag(ss_data?.find(i => i.property === '绝学描述')?.dataitem[0]?.item);
						let ss_shoot = ss_data?.find(i => i.property === '绝学射程')?.dataitem[0]?.item;
						let ss_range = ss_data?.find(i => i.property === '绝学范围')?.dataitem[0]?.item;
						let ss_type = ss_data?.find(i => i.property === '绝学类别')?.dataitem[0]?.item;
						let ss_cd = ss_data?.find(i => i.property === '绝学冷却')?.dataitem[0]?.item;

						// return `※「${sub_skill}」：\n${ss_desc}\n【🏹${ss_shoot} / 🎯 ${ss_range}】`
						let op = {
							name: sub_skill,
							shoot: ss_shoot,
							range: ss_range,
							type: ss_type,
							desc: ss_desc,
						};

						if (parseInt(ss_cd)) {
							op.cd = ss_cd;
						}

						return op;
					})
				)

				// skill.desc += '\n\n' + sub_skills_desc.join('\n\n');
				skill.sub_skills = sub_skills_data;
			}
			return skill;
		})
	);

	outputJSON({
		json: _adv_skills_details,
		fn: adv_skills_file_name,
		space: 2,
		// cn2tw: true,
	});

	return _adv_skills_details;
}