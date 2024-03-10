import roles_data from '$lib/data/roles.min.json';

export function find_role(prop, value) {
	return roles_data.find((item) => item[prop] === value);
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
