import fs from 'fs';
import { raw_data, writeFile, outputJSON, pick_obj, getArgs } from './u.mjs';


let skills_file_name = './task/rawdata/_adv_skills.json';
let skills = JSON.parse(fs.readFileSync(skills_file_name, 'utf8'));

let adv_skills_file_name = './task/rawdata/_adv_skills_details_processed.json';
let adv_skills_details = JSON.parse(fs.readFileSync(adv_skills_file_name, 'utf8'));

let role_with_adv_skills = skills
	.filter((role) => role.adv_skills)
	.map((role) => {
		return {
			pinyin: role.pinyin,
			adv_skills: role.adv_skills.map((s) => {
				let target = adv_skills_details.find((i) => i.name === s);
				if (target) {
					delete target.type;
					target.sub_skills?.forEach(ss => {
						delete ss.type;
					})
				}
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

