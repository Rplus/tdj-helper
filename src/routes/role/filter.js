import { get_icon_image } from '$lib/u.js';

const careers = ['俠客', '鐵衛', '祝由', '御風', '羽士', '咒師', '鬥將'];

export const filter_cates = [
	{
		prop: 'rarity',
		title: '稀有度',
		values: ['N', 'R', 'SR', 'SSR'],
	},
	{
		prop: 'career',
		title: '職業',
		values: careers,
		icons: careers.map((i) => get_icon_image(i)),
	},
	{
		prop: 'prop',
		title: '屬相',
		values: ['炎', '雷', '冰', '光', '暗', '幽'],
	},
];