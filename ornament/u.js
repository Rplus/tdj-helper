export const icons = {
	'冰': 'Ice',
	'炎': 'Fire',
	'雷': 'Electricity',
	'光': 'Light',
	'暗': 'Shadow',
	'幽': 'Dusk',
	'俠客': 'Swordsman',
	'鐵衛': 'Guard',
	'祝由': 'Physician',
	'咒師': 'Warlock',
	'羽士': 'Rogue',
	'御風': 'Assassin',
	'鬥將': 'Melee',
};

export function get_icon_image(icon) {
	if (!icons[icon]) {
		return '';
	}
	return `https://media.zlongame.com/media/pictures/cn/userinfo/tdj/img/data/career/${icons[icon]}.png`;
}