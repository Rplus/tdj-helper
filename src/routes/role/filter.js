import { get_icon_image } from '$lib/u.js';
import roles_data from '$lib/data/roles.min.json';

const careers = ['俠客', '鐵衛', '祝由', '御風', '羽士', '咒師', '鬥將', '破軍'];
// const careers = ['俠客', '鐵衛', '猛士', '祝由', '御風', '羽士', '咒師', '鬥將'];


const tags = [...new Set(roles_data.flatMap(i => i.tags).filter(Boolean))]
	.sort((a, b) => {
		// 1. 移除「剋制」，取得核心詞（例如："剋制免死" -> "免死"）
		const coreA = a.replace(/^剋制/, '');
		const coreB = b.replace(/^剋制/, '');

		// 2. 先比較核心詞（讓「OO」與「剋制OO」群組在一起）
		if (coreA !== coreB) {
			return coreA.localeCompare(coreB, 'zh-Hant');
		}

		// 3. 核心詞相同時，讓「OO」排在「剋制OO」前面（文字短的在前面）
		return a.length - b.length;
	}).map(i => `＃` + i);

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
		// values: ['＃召喚物', '＃剋制召喚物', '＃再行動', '＃再啟動', '＃免死', '＃剋制免死', '＃協攻', '＃陣眼', '＃援襲技能',],
		values: tags,
	},
];