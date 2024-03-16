<script>
export let index = 0;
export let cell = {};
// console.log(22334, cell);
</script>

<div class="cell flex ai-c jc-c pos-r"
	class:picked={!cell.out}
	class:center={cell.center}
>
	{#if cell.order !== undefined}
		{cell.order}
		<!--
		<br>
		x === {cell.x}
		<br>
		y === {cell.y}
		-->
	<!--
	<details>
		<summary>
		</summary>
		<pre class="pos-a">{JSON.stringify(cell, null, 2)}</pre>
	</details>
	-->
	<!-- {index} -->
	<!-- \\\ -->
	<!-- {cell.ri},
	<br>
	{cell.ci}, -->
	<!--
	{cell.order},
	-->
	{/if}
</div>


<style>
.cell {
	width: 100%;
	height: 100%;
	aspect-ratio: 1;
	box-shadow: inset 0 0 2px;
	/*  */
	font-size: small;
}
.cell.center {
	border: 3px solid #f339;
}
.cell.picked {
	background-color: #f603;
}
.pos-r {
	/* width: 100%; */
	/* height: 100%; */
}
details {
	left: 0;
	top: 0;
}
pre {
	background-color: #fff;
}
</style>