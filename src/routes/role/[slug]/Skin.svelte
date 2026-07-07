<script>
export let skins = {};
export let name = '';
import { resize_img } from '$lib/u.js';
import { saveItem, getItem } from '$lib/u.js';

$: skins_arr = Object.keys(skins).map((skin_name, index) => {
	return {
		title: skin_name,
		order: skin_name === name ? -1 : index,
		...get_imgs(skins[skin_name]),
	}
}).sort((a, b) => a.order - b.order);

const PROJECT_PATH = 'https://patchwiki.biligame.com/images/tdj';
function get_imgs(url = '') {
	let [path, fn, x1, x2] = url.split('♥');

	let img_o = PROJECT_PATH + path.replace('.png/', '.png');
	let img_x1 = x1 ? PROJECT_PATH + '/thumb' + path + x1 + 'px-%E7%AB%8B%E7%BB%98_' + fn : img_o;
	let img_x2 = x2 ? PROJECT_PATH + '/thumb' + path + x2 + 'px-%E7%AB%8B%E7%BB%98_' + fn : img_o;

	return {
		img_x1: resize_img(img_x1, null, 550),
		img_x2: resize_img(img_x2, null, 1100),
		img_f: resize_img(img_o, 3000),
		img_o,
	};
}

let is_show = getItem('show_skin') || false;

function handle_click() {
	is_show = !is_show;
	saveItem({
		key: 'show_skin',
		value: is_show,
	});
}

</script>

<div class="hr" style="--ratio: 0.125; cursor: pointer;" on:click={handle_click}>
	<span class="marker" data-show={is_show}></span>Skins
</div>

<div class="horizontal-scroll-container" hidden={!is_show}>
	{#each skins_arr as skin, index}
		<a class="card" href="#skin_{index}" id="skin_{index}">
			<div class="title">
				{skin.title}
				<ul class="img_list">
					<li><a href={skin.img_x1} target="_blank">x1</a></li>
					<li><a href={skin.img_x2} target="_blank">x2</a></li>
					<li><a href={skin.img_f} target="_blank">large</a></li>
					<li><a href={skin.img_o} target="_blank">origin</a></li>
				</ul>
			</div>
			{#key `${name}-${skin.title}`}
				{#if is_show}
				<img class="skin_img" alt={skin.title} src={skin.img_x1}
					srcset="{skin.img_x1} 2000w, {skin.img_x2} 5000w">
				{/if}
			{/key}
		</a>
	{/each}
</div>



<style>
.horizontal-scroll-container {
	display: flex;
	gap: 1rem;
	width: 80vw;
	overflow-x: auto;
	white-space: nowrap;
	scroll-snap-type: x mandatory;
	margin-left: calc(50% - 40vw);
	margin-right: calc(50% - 40vw);
	scrollbar-color: transparent transparent;
	transition: scrollbar-color .3s;
	&:hover {
		scrollbar-color: #3336 #0000;
	}

	@media (max-width: 800px) {
		width: 100%;
		margin-left: 0;
		margin-right: 0;
	}
}

.card {
	position: relative;
	display: flex;
	flex: 0 0 75%;
	height: calc(70vw + 50px);
	max-height: 650px;
	padding-top: 1.25em;
	align-items: center;
	justify-content: center;
	border-radius: .5em;
	color: #fff;
	font-size: calc(.5vw + 1rem);
	background-image:
		linear-gradient(0deg, #000a, #0006),
		url('https://tw-media.game-beans.com/media/pictures/tdj/info/page/img/bg.jpg');
	background-color: #000;
	background-position: 50%;
	scroll-snap-align: center;

	&:focus-visible {
		outline: unset;
	}

	&:only-child {
		flex: 0 0 100%;
		margin: 0;
	}

	&:first-child:not(:only-child) {
		margin-inline-start: 12.5%;
	}
	&:last-child:not(:only-child) {
		margin-inline-end: 12.5%;
	}
}

.title {
	position: absolute;
	top: .5em;
	opacity: 0.5;
	padding: 0 .5rem;

	& a {
		color: inherit;
		display: block;
		padding: 2px .5em;

		&:hover {
			background-color: #fff3;
		}
	}

	& .img_list {
		position: absolute;
		left: 100%;
		top: 0;
		margin: 0;
		padding: 0;
		list-style: none;
		font-size: 1rem;
		background-color: #000c;
	}

	&:not(:hover) .img_list {
		display: none;
	}
}

.skin_img {
	/* width: 550px; */
	height: 550px;
	max-width: 70vw;
	max-height: 70vw;
	object-fit: contain;
	display: block;
	overflow: unset !important;
	user-select: none;
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