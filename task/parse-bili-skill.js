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

let adv_skills_file_name = './task/rawdata/_adv_skills_details.json';
let adv_skills_details;
if (!parse_new && fs.existsSync(adv_skills_file_name)) {
	adv_skills_details = JSON.parse(fs.readFileSync(adv_skills_file_name, 'utf8'));
} else {
	adv_skills_details = await Promise.all(
		adv_skills.map(async (sname) => {
			let info = await fetch_name(`绝学/${sname}`);
			let props = info?.query.data.reduce((all, i) => {
				all[i.property] = i.dataitem[0]?.item;
				return all;
			}, {});

			return {
				name: sname,
				// path: encodeURIComponent(sname),
				cd: props['绝学冷却'],
				cost: props['绝学消耗'],
				shoot: props['绝学射程'],
				range: props['绝学范围'],
				type: props['绝学类别'],
				desc: remove_html_tag(props['绝学描述']),
			};
		}),
	);

	outputJSON({
		json: adv_skills_details,
		fn: adv_skills_file_name,
		space: 2,
		// cn2tw: true,
	});
}

let role_with_adv_skills = skills
	.filter((role) => role.adv_skills)
	.map((role) => {
		return {
			pinyin: role.pinyin,
			adv_skills: role.adv_skills.map((s) => {
				let target = adv_skills_details.find((i) => i.name === s);
				return target || { name: s };
			}),
		};
	});

outputJSON({
	json: role_with_adv_skills,
	fn: './task/rawdata/role_with_adv_skills.json',
	space: 2,
	cn2tw: true,
});
outputJSON({
	json: role_with_adv_skills,
	fn: './src/lib/data/role_with_adv_skills.min.json',
	space: 0,
	cn2tw: true,
});

function remove_html_tag(html = '') {
	return html.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');
}

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
