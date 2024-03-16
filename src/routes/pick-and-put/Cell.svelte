<script>
export let cell = {};
</script>

<div class="cell flex ai-c jc-c pos-r" class:picked={!cell.out} class:center={cell.center}>
	{#if cell.order !== undefined}
		{cell.order}
	{/if}
</div>

<style>
.cell {
	width: 100%;
	height: 100%;
	aspect-ratio: 1;
	box-shadow: inset 0 0 2px;
	font-size: small;
}

.cell.center {
	border: 3px solid #f339;
}

.cell.picked {
	background-color: #f603;
}
</style>
