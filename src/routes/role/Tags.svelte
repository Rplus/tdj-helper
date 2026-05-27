<script>
export let tags = [''];
// import { link } from '$lib/u.js';

// console.log(223, tags);

let tags_status = tags.map(tag => {
	return {
		label: tag,
		selected: false,
	};
});

$: tag_styles = gen_tag_style(tags_status);

function gen_tag_style(_status) {
	let selected_tags = _status.map(i => i.selected && i.label).filter(Boolean);
	if (!selected_tags?.length) {
		return '';
	}
	return '.role:not(' + selected_tags.map(tag => `[data-tags*="#${tag}"]`).join(',') + ') { display: none; }';
}

</script>


<div>
	標籤:
</div>

{#each tags_status as tag}
	<label class="label inline-flex">
		<input type="checkbox" bind:checked={tag.selected} title={tag.label} />
		{tag.label}
	</label>
{/each}


<svelte:head>
	{@html `<style id="tag-rules">${tag_styles}</style>`}
</svelte:head>

<style>
.label {
	cursor: pointer;
	margin: 0 .25em 0 0.5em;
}
</style>
