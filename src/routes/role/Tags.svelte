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



<form class="tag-form">
	<details>
		<summary>標籤:</summary>
		<div>
			{#each tags_status as tag}
				<label class="label inline-flex">
					<input type="checkbox" bind:checked={tag.selected} title={tag.label} />
					{tag.label}
				</label>
			{/each}
		</div>
	</details>
</form>


<svelte:head>
	{@html `<style id="tag-rules">${tag_styles}</style>`}
</svelte:head>

<style>
.tag-form {
	@media (max-width: 700px) {
		font-size: smaller;
	}
}

summary {
	&::marker {
		color: #9999;
	}
}

.label {
	cursor: pointer;
	margin: 0 .25em 0 0.5em;
	user-select: none;
}
</style>
