<script>
import Filter from '$lib//Filter.svelte';
import { get_icon_image } from '$lib/u.js';

const careers = ['俠客', '鐵衛', '祝由', '御風', '羽士', '咒師', '鬥將'];

let filter_cates = [
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
</script>

<Filter {filter_cates} item_class=".role" />
