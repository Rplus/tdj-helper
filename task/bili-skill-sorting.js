import fs from 'fs';
import { outputJSON, read_json_file } from './u.mjs';

let raw_adv_skills_of_role = read_json_file('./task/rawdata/_adv_skills_of_role.json');
// outputJSON({
// 	json: raw_adv_skills_of_role,
// 	fn: './task/rawdata/_adv_skills_of_role.tw.json',
// 	space: 2,
// 	cn2tw: true,
// });
let raw_adv_skills_of_role_tw = read_json_file('./task/rawdata/_adv_skills_of_role.tw.json');

let adv_skills = read_json_file('./task/rawdata/_adv_skills_all.json');

let adv_skills_of_role = raw_adv_skills_of_role.reduce((all, role, index) => {
	if (!role.adv_skills) {
		return all;
	}
	let _adv_skills = raw_adv_skills_of_role_tw[index].adv_skills;

	if (role.new) {
		_adv_skills = role.adv_skills.map((skill, sindex) => {
			if (skill.includes('·')) {
				return raw_adv_skills_of_role_tw[index].adv_skills[sindex];
			}
			return skill;
		});
	}
	all[role.pinyin] = _adv_skills;
	return all;
}, {});

outputJSON({
	json: adv_skills_of_role,
	fn: './task/rawdata/adv_skills_of_role.json',
	space: 2,
	// cn2tw: true,
});
outputJSON({
	json: adv_skills_of_role,
	fn: './src/lib/data/adv_skills_of_role.min.json',
	space: 0,
	// cn2tw: true,
});

outputJSON({
	json: adv_skills,
	fn: './task/rawdata/adv_skills.json',
	space: 2,
	cn2tw: true,
});
outputJSON({
	json: adv_skills,
	fn: './src/lib/data/adv_skills.min.json',
	space: 0,
	cn2tw: true,
});
