import { get_icon_image } from '$lib/u.js';

const careers = ['俠客', '鐵衛', '祝由', '御風', '羽士', '咒師', '鬥將', '破軍'];
// const careers = ['俠客', '鐵衛', '猛士', '祝由', '御風', '羽士', '咒師', '鬥將'];

export const filter_cates = [
	{
		prop: 'rarity',
		title: '稀有度',
		values: ['N', 'R', 'SR', 'SSR', 'ULR'],
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
		values: ['炎', '雷', '冰', '光', '暗', '幽', '神', '魔'],
	},
	{
		prop: 'tags',
		title: '標籤',
		multi: true,
		toggleable: true,
		values: ['#召喚物', '#剋制召喚物', '#再行動', '#再啟動', '#免死', '#剋制免死', '#協攻', '#陣眼', '#援襲技能',],
	},
];