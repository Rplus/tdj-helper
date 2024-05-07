import roles_data from '$lib/data/roles.min.json';

export function find_role(prop, value) {
	let max_index = roles_data.length - 1;

	let role_index = roles_data.findIndex((item) => item[prop] === value);
	let role = roles_data[role_index];

	let next_index = role_index + 1;
	let prev_index = role_index - 1;

	if (role) {
		role.siblings = {
			next: next_index <= max_index ? roles_data[next_index].name : null,
			prev: prev_index >= 0 ? roles_data[prev_index].name : null,
		};
	}

	return role;
}

export const status_props = [
	{ max: 0, label: '氣血', prop: 'hp' },
	{ max: 0, label: '物攻', prop: 'atk_phy' },
	{ max: 0, label: '物防', prop: 'def_phy' },
	{ max: 0, label: '法攻', prop: 'atk_mag' },
	{ max: 0, label: '法防', prop: 'def_mag' },
	{ max: 0, label: '會心', prop: 'crit' },
];

export const max_status = roles_data.reduce((props, role) => {
	for (let item of props) {
		if (role.status[item.prop] > item.max) {
			item.max = role.status[item.prop];
		}
	}
	return props;
}, status_props);
