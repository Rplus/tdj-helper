<script>
export let src = '';
export let alt = '';
export let width = '64';
export let height = '64';

let img;

let err_count = 0;
function handle_error() {
	let new_src = new URLSearchParams(this.src)?.get('url');
	if (this.src && new_src && !err_count) {
		err_count += 1;
		this.src = new_src;
	}
}
</script>

<img
	bind:this={img}
	loading="lazy"
	decording="async"
	{src}
	{width}
	{height}
	{alt}
	title={$$props.title || alt}
	on:error={handle_error}
	{...$$restProps}
/>
