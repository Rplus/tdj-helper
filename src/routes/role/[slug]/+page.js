import { error } from '@sveltejs/kit';
import { find_role } from '../role.js';

export const load = async ({ params }) => {
	try {
		let target = find_role('name', params.slug);
		return {
			role: target,
			slug: params.slug,
		};
	} catch (err) {
		error(404, err);
	}
};
