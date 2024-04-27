<script>
export let stars = ['', '', '', '', '', ''];
import { remove_html_tag } from '$lib/u.js';

$: rendered_stars = stars.map(clear_html);

function clear_html(html = '') {
	return remove_html_tag(html).replace(/。/g, '。\n');
}

</script>


<input type="checkbox" class="swticher visually-hidden" id="swticher">
<div class="stars">

	<label for="swticher" />

	{#each rendered_stars as star, index}
			<input class="visually-hidden" type="radio" name="star"
				id="star{index + 1}"
				checked={index === 5}
				disabled={!star}
			>

			<label class="star"
				for="star{index + 1}"
				data-index={index + 1}
				style="--index: {index + 1}"
			/>

			<div class="desc">
				{star}
			</div>
	{/each}
</div>


<style>
	.stars {
		display: grid;
		grid-template: 'star swticher' auto
									 'desc desc' auto / auto 1fr;
		gap: 0 .5em;
	}

	label[for="swticher"] {
		cursor: pointer;
		display: block;
		width: fit-content;

		&::before {
			content: var(--switcher, '🙈');
		}
	}

	.swticher:checked + .stars {
		--switcher: '🙊';
		display: block;

		& .star::after {
			content: attr(data-index);
			opacity: 0.5;
			font-size: smaller;
		}
		& .desc {
			visibility: visible;
		}
	}

	.star {
		grid-area: star;
		margin-left: calc(1em * (var(--index) - 1));

		&::before {
			content: '★';
		}
	}

	.desc {
		grid-area: desc;
		margin-block-end: 0.5em;
		visibility: hidden;
		white-space: pre-line;
	}

	input:checked + .star ~ .star::before {
		content: '☆';
	}

	input:checked + .star + .desc {
		visibility: visible;
	}

</style>