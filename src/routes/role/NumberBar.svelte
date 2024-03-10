<script>
export let number = 0;
export let max = 1;
export let label = '';
export let type = 'list';
</script>

<div
	class="number-bar"
	class:show-label={type === 'card'}
	title={label}
	style="--percent: {number / max}"
>
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
	background-size:
		calc(var(--percent) * 100%) 100%,
		100% 80%;
}

.number-bar.show-label {
	background-position: 0% 50%;
	justify-content: flex-start;
	font-size: smaller;
	position: relative;
	padding: .25em;
	margin-inline-start: 2.5em;

	&::before {
		content: attr(title) ':';
		position: absolute;
		right: 100%;
		padding-inline-end: .25em;
		opacity: .5;
		white-space: nowrap;
	}
}

</style>
