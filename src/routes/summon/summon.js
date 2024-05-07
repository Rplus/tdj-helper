import summons_data from '$lib/data/summons.min.json';

export function find_summon(prop, value) {
	let max_index = summons_data.summons.length - 1;

	let summon_index = summons_data.summons.findIndex((item) => item?.[prop] === value);
	let summon = summons_data.summons[summon_index];

	let next_index = summon_index + 1;
	let prev_index = summon_index - 1;

	if (summon) {
		summon.skills = summon.skill_names.map((skill_name) => {
			return summons_data.skills.find((skill) => skill.name === skill_name);
		});

		summon.siblings = {
			next: next_index <= max_index ? summons_data.summons[next_index].name : null,
			prev: prev_index >= 0 ? summons_data.summons[prev_index].name : null,
		};
	}
	return summon;
}

export const status_props = [
	{ max: 0, label: '氣血', prop: 'hp' },
	{ max: 0, label: '物攻', prop: 'atk_phy' },
	{ max: 0, label: '物防', prop: 'def_phy' },
	{ max: 0, label: '法攻', prop: 'atk_mag' },
	{ max: 0, label: '法防', prop: 'def_mag' },
	{ max: 0, label: '會心', prop: 'crit' },
];

// export const max_status = summons_data.reduce((props, role) => {
// 	for (let item of props) {
// 		if (role.status[item.prop] > item.max) {
// 			item.max = role.status[item.prop];
// 		}
// 	}
// 	return props;
// }, status_props);
