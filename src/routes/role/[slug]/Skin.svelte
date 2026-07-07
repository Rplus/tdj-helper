<script>
export let skins = {};
export let name = '';
import { resize_img } from '$lib/u.js';

$: skins_arr = Object.keys(skins).map((skin_name, index) => {
	return {
		title: skin_name,
		order: skin_name === name ? -1 : index,
		...get_imgs(skins[skin_name]),
	}
}).sort((a, b) => a.order - b.order);

const PROJECT_PATH = 'https://patchwiki.biligame.com/images/tdj';
function get_imgs(url = '') {
	let o_url = PROJECT_PATH + url.split(/\/\d+♥/)[0];
	let thumb_url = PROJECT_PATH + '/thumb' + url.replace('♥', 'px-%E7%AB%8B%E7%BB%98_');

	return {
		img: resize_img(thumb_url, null, 550),
		img_l: resize_img(o_url, 3000),
	}
}

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
				<img class="skin_img" alt={skin.title} src={skin.img}
					srcset="{skin.img} 2000w, {skin.img_l} 5000w">
				{/if}
			{/key}
		</a>
	{/each}
</div>



<style>
.horizontal-scroll-container {
	display: flex;
	width: 80vw;
	overflow-x: auto;
	white-space: nowrap;
	scroll-snap-type: x mandatory;
	margin-left: calc(50% - 40vw);
	margin-right: calc(50% - 40vw);

	@media (max-width: 800px) {
		width: 100%;
		margin-left: 0;
		margin-right: 0;
	}
}

.card {
	position: relative;
	flex: 0 0 75%;
	height: calc(70vw + 50px);
	max-height: 650px;
	padding-top: 1.25em;
	margin-right: 1rem;
	color: white;
	font-size: 2rem;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: .5em;
	scroll-snap-align: center;
	background-image:
		linear-gradient(0deg, #000a, #0006),
		url('https://tw-media.game-beans.com/media/pictures/tdj/info/page/img/bg.jpg');
	background-color: #000;
	background-position: 50%;
	font-size: calc(.5vw + 1rem);

	&:focus-visible {
		outline: unset;
	}

	&:only-child {
		flex: 0 0 100%;
		margin: 0;
	}
}

.title {
	position: absolute;
	top: .5em;
	opacity: 0.5;

	& a {
		color: inherit;
	}
}

.skin_img {
	/* width: 550px; */
	height: 550px;
	max-width: 70vw;
	max-height: 70vw;
	object-fit: contain;
	display: block;
	overflow: unset!important;
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