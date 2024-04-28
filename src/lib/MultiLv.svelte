<script>
export let lvs = [];
export let name = 'lv';
</script>

<input type="checkbox" class="swticher visually-hidden" id="swticher--{name}" />
<div class="levels pos-r">
	<label class="swticher-label pos-a" for="swticher--{name}" />

	{#each lvs as lv, index}
		<input
			class="visually-hidden"
			type="radio"
			{name}
			id="{name}-{index + 1}"
			checked={index === lvs.length - 1}
			disabled={!lv}
		/>

		<label
			class="lv"
			for="{name}-{index + 1}"
			data-index={index + 1}
			style="--index: {index + 1}"
		/>

		<div class="desc pre-line">
			{lv}
		</div>
	{/each}
</div>

<style>
.levels {
	display: grid;
	grid-template:
		'lvs swticher' auto
		'desc desc' auto / auto 1fr;
	gap: 0 0.5em;
}

.swticher-label {
	cursor: pointer;
	display: block;
	width: fit-content;
	top: 0;
	right: 0;

	&::before {
		content: var(--switcher, '🙈');
	}
}

.swticher:checked + .levels {
	--switcher: '🙊';
	display: block;

	& .lv::after {
		content: attr(data-index);
		opacity: 0.5;
		font-size: smaller;
	}
	& .desc {
		visibility: visible;
	}
}

.lv {
	grid-area: lvs;
	margin-left: calc(1em * (var(--index) - 1));

	&::before {
		content: '★';
	}
}

.desc {
	grid-area: desc;
	margin-block-end: 0.5em;
	visibility: hidden;
	line-height: 1.35;
}

input:checked + .lv ~ .lv::before {
	content: '☆';
}

input:checked + .lv + .desc {
	visibility: visible;
}
</style>
