<script>
export let skins = {};
export let name = '';
import { resize_img } from '$lib/u.js';

$: skins_arr = Object.keys(skins).map((skin_name, index) => {
	return {
		title: skin_name,
		order: skin_name === name ? -1 : index,
		img: resize_img(skins[skin_name], 600),
		img_s: resize_img(skins[skin_name]),
		img_l: resize_img(skins[skin_name], 3000),
	}
}).sort((a, b) => a.order - b.order);

let is_show = false;

function handle_click() {
	is_show = !is_show;
}

</script>

<div class="hr" style="--ratio: 0.125; cursor: pointer;" on:click={handle_click}>
	<span class="marker" data-show={is_show}></span>Skins
</div>

<div class="horizontal-scroll-container" hidden={!is_show}>
	{#each skins_arr as skin, index}
		<a class="card" href="#skin_{index}" id="skin_{index}">
			<div class="title">
				<a href={skin.img_l} target="_blank">
					{skin.title}
				</a>
			</div>
			{#key `${name}-${skin.title}`}
				{#if is_show}
				<img class="skin_img" alt={skin.title} src={skin.img} loading="lazy"
					srcset="{skin.img} 2000w, {skin.img_l} 5000w">
				{/if}
			{/key}
		</a>
	{/each}
</div>



<style>
.horizontal-scroll-container {
	display: flex;
	width: 100%;
	overflow-x: auto;
	white-space: nowrap;
	scroll-snap-type: x mandatory;
}

.card {
	position: relative;
	flex: 0 0 70%;
	height: calc(70vw + 50px);
	max-height: 700px;
	padding-top: 1.25em;
	margin-right: 1rem;
	color: white;
	font-size: 2rem;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: .5em;
	scroll-snap-align: center; /* 關鍵屬性：卡片的中心點與容器中心貼齊 */
	background-color: #000;
	font-size: calc(.5vw + 1rem);

	&:only-child {
		flex: 0 0 100%;
		margin: 0;
	}

	&:nth-child(even) {
		/* background-color: #000c; */
	}
}

.title {
	position: absolute;
	top: .5em;

	& a {
		color: #fff;
	}
}

.skin_img {
	width: 600px;
	height: 600px;
	max-width: 70vw;
	max-height: 70vw;
	object-fit: contain;
	display: block;
}

.marker {
	&::before {
		content: '▶';
	}
	&[data-show="true"]::before {
		content: '▼';
	}
}

</style>