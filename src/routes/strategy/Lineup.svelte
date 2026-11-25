<script>
	import Item from './Item.svelte';

	export let strategy = {};
	export let search_kwd = '';

	$: info = gen_desc(strategy.desc_html, search_kwd);

	function gen_desc(str = '') {
		let [, basic, detail] = str.split(/^(攻防.+)\n/gm);
		let op = {
			basic,
			detail,
		};

		if (search_kwd.length) {
			let reg = new RegExp(`(${search_kwd})`, 'g');
			op.detail = op.detail.replace(reg, `<mark>$1</mark>`);
		}

		return op;
	}
</script>



<div
	class="row flex"
	data-prop={strategy.members.map((i) => !i.img && i.name).filter(Boolean)}
	data-search={info.detail}
	id={strategy.name}
>
	<div class="members flex">
		<Item member={strategy} />

		{#each strategy.members as member}
			<Item {member} />
		{/each}
	</div>

	<div class="info" data-basic={info.basic}>{@html info.detail}</div>
</div>


<style>

.row {
	margin-bottom: 1.5em;

	@media (max-width: 700px) {
		flex-wrap: wrap;
	}

	& > div:first-child {
		margin-right: 1em;
	}
}

.members {
	gap: 0.5em;
	align-items: flex-start;
	margin-bottom: 0.5em;
	text-align: center;
}

.info {
	max-width: 22em;
	margin-bottom: 1em;
	align-self: flex-start;
	white-space: pre-wrap;

	&::before {
		content: attr(data-basic);
		display: block;
		color: #999c;
	}

	@media (max-width: 700px) {
		max-width: unset;
		padding-left: 0.5em;
		margin-left: 1.5em;
		border-left: 0.25em solid #9993;
	}
}

</style>