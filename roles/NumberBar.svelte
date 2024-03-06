<script>
	export let number = 0;
	export let max = 1;
</script>



<div class="number-bar" style="--percent: {number / max}">
	{number}
</div>



<style>
	.number-bar {
		height: 1.5em;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		background-image: linear-gradient(#9994, #9994), linear-gradient(#aaa3, #aaa3);
		background-repeat: no-repeat;
		background-position: 100% 50%;
		background-size: calc(var(--percent) * 100%) 100%, 100% 80%;
	}
</style>
