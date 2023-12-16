<script>
	export let row;
	export let col;
	export let prop = 'hp';
	export let max = 0;
</script>


<div style="--percent: {row.status[prop] / max}">
	{row.status[prop]}
</div>


<style>
	div {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		background-image: linear-gradient(#0001, #0001), linear-gradient(#6661, #6661);
		background-repeat: no-repeat;
		background-position: 100% 50%;
		background-size: calc(var(--percent) * 100%) 100%, 100% 100%;
	}
</style>
