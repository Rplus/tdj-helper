import adv_skills_data from '$lib/data/adv_skills.min.json';
import adv_skills_of_role from '$lib/data/adv_skills_of_role.min.json';

export function find_adv_skills(role_pinyin = '', basic_skills = []) {
	let names = adv_skills_of_role[role_pinyin];
	if (!names) {
		return [];
	}

	let all_skills = adv_skills_data.concat(basic_skills);
	return names.map((name) => {
		let skill = all_skills.find((s) => s.name === name);
		if (!skill) {
			return { name };
		}

		if (skill.desc.match(/「[^」]+式」/)) {
			let sub_skills = skill.desc
				.match(/「[^」]+式」/g)
				.map((i) => i.replace(/[「」]/g, ''))
				.map((ss) => !ss.includes('臥雲流星散') && all_skills.find((s) => s.name === ss))
				.filter(Boolean);

			if (sub_skills && sub_skills.length) {
				skill.sub_skills = sub_skills;
			}
		}
		return skill;
	});
}

const special_skills = {
	'shuanghunyuxi': [
		{
			name: '諸靈退散',
			img: 'https://patchwiki.biligame.com/images/tdj/thumb/f/f6/q6fvjmpblg6pa65hnmlbu67zipuftor.png/80px-绝学_诸灵退散.png',
			way: '主動',
		},
		{
			name: '妖氛鎮魄',
			img: 'https://patchwiki.biligame.com/images/tdj/thumb/a/af/hya680sc8x7w6wnsuprxv0urqfkbvd2.png/80px-绝学_妖氛镇魄.png',
			way: '主動',
		},
		{
			name: '玄曄破封',
			img: 'https://patchwiki.biligame.com/images/tdj/thumb/6/62/dhnq4ppq1t4zh6avy2qf4fcp813b285.png/80px-绝学_玄晔破封.png',
			way: '主動',
		},
	],
};

export function get_special_skills(pinyin) {
	let sp_skills = special_skills[pinyin];
	if (!sp_skills) {
		return;
	}

	return sp_skills.map(sk => {
		let data = adv_skills_data.find(i => i.name === sk.name);
		return {
			...data,
			way: sk.way,
			img: sk.img,
			special: true,
		};
	});
}

export function handle_skills(skills) {
	let powers = [undefined];
	skills = skills.map((s) => {
		let unlock_condition = +s.unlock_condition.match(/\d+/)?.[0] || 0;

		switch (unlock_condition) {
			case 0:
				s.grid_row = 1;
				s.grid_col = 3;
				break;

			case 3:
				s.grid_row = 2;
				s.grid_col = 3;
				powers[0] = s.inner_power1;
				break;

			case 15:
				if (!powers.includes(s.inner_power1)) {
					powers.push(s.inner_power1);
				}
				s.grid_row = 3;
				s.grid_col = powers.indexOf(s.inner_power1) === 1 ? 5 : 1;
				break;

			case 25:
				s.grid_row = 4;
				s.grid_col = 3;
				break;

			case 40:
				if (!powers.includes(s.inner_power2)) {
					powers.push(s.inner_power2);
				}
				s.grid_row = 5;
				s.grid_col = powers.indexOf(s.inner_power2) === 1 ? 4 : 2;
				break;

			case 55:
				s.grid_row = 6;
				s.grid_col = 3;
				break;

			default:
				break;
		}
		return s;
	});

	return skills;
}
