<script>
	import { get_icon_image } from './u.js';
	import { resize_img } from '/_share/u.js';
	import Filter from '/_share/Filter-comp.svelte';

	export let keys = {};

	const cate_map = {
		rarity: '品質',
		position: '部位',
		type: '類型',
		job: '職業',
	};

	let filters = Object.keys(keys).map(prop => {
		let values = keys[prop];
		return {
			prop: prop,
			title: cate_map[prop],
			multi: (prop === 'type' || prop === 'job'),
			values: values,
			icons: values.map(i => resize_img(get_icon_image(i), 32)),
		};
	});

</script>

<Filter
	filter_cates={filters}
	placeholder="過濾說明"
/>

