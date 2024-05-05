import fs from 'fs';
import { raw_data, writeFile, outputJSON, pick_obj, getArgs } from './u.mjs';

let adv_skills_of_role = JSON.parse(fs.readFileSync('./task/rawdata/_adv_skills_of_role.json', 'utf8'));
let adv_skills = JSON.parse(fs.readFileSync('./task/rawdata/_adv_skills_all.json', 'utf8'))

adv_skills_of_role = adv_skills_of_role
	.filter((role) => role.adv_skills)
	.reduce((all, role) => {
		all[role.pinyin] = role.adv_skills;
		return all;
	}, {});

outputJSON({
	json: adv_skills_of_role,
	fn: './task/rawdata/adv_skills_of_role.json',
	space: 2,
	cn2tw: true,
});
outputJSON({
	json: adv_skills_of_role,
	fn: './src/lib/data/adv_skills_of_role.min.json',
	space: 0,
	cn2tw: true,
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

