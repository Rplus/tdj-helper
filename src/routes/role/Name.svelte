<script>
export let name = '';

let count = 1;

function click() {
	count += 1;
}
</script>

<div on:click={click}>
	=={name}=x={count}
</div>
<hr />
