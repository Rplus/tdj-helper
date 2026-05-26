// import adv_skills_data from '$lib/data/adv_skills.min.json';
// import adv_skills_of_role from '$lib/data/adv_skills_of_role.min.json';
// import special_skills from '$lib/data/addition_skills.min.json';
import role_other_skills from '$lib/data/role_other_skills.min.json';
import subskills from '$lib/data/subskills.min.json';
import { get_img, clear_html, resize_img } from '$lib/u.js';

export function find_other_skills(role_pinyin = '') {
	return role_other_skills[role_pinyin];
}

export function find_subskills(name = '') {
	const ss = subskills.map[name];
	return ss?.map(_sname => subskills.data.find(i => i.name === _sname));
}

export function get_skill_img({
	skill_img = '',
	extra_img = '',
	lang = 'cn',
	fallback_img = '',
}) {
	if (extra_img) {
		return resize_img(extra_img);
	}
	if (skill_img) {
		return get_img('skill', skill_img, 96, lang);
	}
	return get_img('inherent', fallback_img, 64);
}

export function gen_skill_desc(skill, show_name_title = true, is_sub = false,) {
	let subskills = find_subskills(skill.name);
	let subskills_obj = subskills?.map(ss => gen_skill_desc(ss, false, true)).flat() || [];

	let op = [
		{
			content: [
				is_sub ? `\n 🔁 ${skill.name}` : show_name_title ? skill.name : '🔥'.repeat(parseFloat(skill.cost) || 1),
				clear_html(skill.desc),
			].join('\n'),
			sub: [
				skill.cd && skill.cd !== '無' && skill.cd !== '-' && `　- ⏳ ${skill.cd}`,
				skill.shoot && skill.shoot !== '無' && `　- 🏹 ${skill.shoot}`,
				skill.range && skill.range !== '無' && `　- 🎯 ${skill.range}`,
				skill.type && `　- 🏷 ${skill.type}`,
				skill.way && `　- 💤 ${skill.way}`,
			].filter(Boolean).join('\n'),
		},
		...subskills_obj,
	];

	return op;
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
