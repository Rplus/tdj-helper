import { error } from '@sveltejs/kit';
import { find_summon } from '../summon.js';

export const load = async ({ params }) => {
	try {
		let target = find_summon('name', params.slug);

		return {
			summon: target,
			slug: params.slug,
		};
	} catch (err) {
		error(404, err);
	}
};
