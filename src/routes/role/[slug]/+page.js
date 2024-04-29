import { error } from '@sveltejs/kit';
import { find_role } from '../role.js';
// import { find_adv_skills } from './skill.js';

export const load = async ({ params }) => {
	try {
		let target = find_role('name', params.slug);
		return {
			role: target,
			// adv_skills: find_adv_skills(target.pinyin)?.adv_skills || [],
			slug: params.slug,
		};
	} catch (err) {
		error(404, err);
	}
};
