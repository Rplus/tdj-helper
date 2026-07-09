<script>
import Filter from '$lib//Filter.svelte';
import { get_icon_image, careers } from '$lib/u.js';
import roles_data from '$lib/data/roles.min.json';

export const filter_cates = [
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
	// {
	// 	prop: 'cate',
	// 	title: '絕學類別',
	// 	// values: ['godclass_weapon', 'inherent', 'adv_skills', 'extra_skills', 'support_skill'],
	// 	values: ['一般', '神兵', '天賦', '化神', '援襲', '其它',]
	// },
];

let is_show = false;
function handle_click() {
	is_show = !is_show;
}

</script>


<fieldset style="margin-bottom: 2em">
	<legend class="marker" data-show={is_show} on:click={handle_click}>Filter</legend>

	<div class="filter-box" hidden={!is_show}>
		<Filter {filter_cates} item_class=".role-item" />
	</div>
</fieldset>



<style>
.filter-box :global(.filter.input-box) {
	display: none;
}

.marker {
	cursor: pointer;

	&::before {
		content: '▶';
	}
	&[data-show="true"]::before {
		content: '▼';
	}
}
</style>