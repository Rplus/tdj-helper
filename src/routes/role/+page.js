import roles_data from '$lib/data/roles.min.json';

export const load = ({ params }) => {
	// let props = filter_cates[2].values.map((prop, index) => ({
	// 	label: prop,
	// 	pi: index,
	// 	ci: 0,
	// 	len: 0,
	// }));

	// let careers = filter_cates[1].values.map((career, index) => ({
	// 	label: career,
	// 	pi: 0,
	// 	ci: index,
	// 	len: 0,
	// }));

	// let order_map = {};

	// roles_data.forEach(role => {
	// 	let pi = filter_cates[2].values.indexOf(role.prop);
	// 	let ci = filter_cates[1].values.indexOf(role.career);

	// 	let xy = `${role.prop}-${role.career}`;
	// 	let order = order_map[xy] || 0;
	// 	role.xyz = {
	// 		ci,
	// 		pi,
	// 		order,
	// 	};
	// 	order_map[xy] = order + 1;
	// 	props[pi].len += 1;
	// 	careers[ci].len += 1;
	// });

	// careers.forEach((career, ci) => {
	// 	career.row_span = '--row-span: sapn calc(' + props.map((prop, pi) => {
	// 		let xy = `${prop.label}-${career.label}`;
	// 		return `var(--checked-${prop.label}, 0) * var(--checked-${career.label}, 0) * ${order_map[xy]}`;
	// 	}).join(' + ') + ');';
	// });

	// // 鐵衛轉猛士
	// roles_data.forEach(role => {
	// 	if (role.career2) {
	// 		role.ori_career = role.career;
	// 		role.career = role.career2;
	// 	}
	// })

	return {
		roles: roles_data,
		tags: [...new Set(roles_data.flatMap(i => i.tags).filter(Boolean))].sort(),
		// props,
		// careers,
	};
};
