<script>
import Filter from '$lib//Filter.svelte';
import { get_icon_image } from '$lib/u.js';

export let keys = {};

const cate_map = {
	rarity: '品質',
	position: '部位',
	type: '類型',
	job: '職業',
};

let filter_cates = Object.keys(keys).map((prop) => {
	let values = keys[prop];
	return {
		prop: prop,
		title: cate_map[prop],
		multi: prop === 'type' || prop === 'job',
		values: values,
		icons: values.map((i) => get_icon_image(i)),
	};
});
</script>

<Filter {filter_cates} placeholder="過濾說明" />
