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


let active_fullscreen_node;
async function toggle_fullscreen(event) {
	event.preventDefault();

	const target_node = event.currentTarget.closest('.horizontal-scroll-container');

	try {
		if (!document.fullscreenElement) {
			await target_node.requestFullscreen();
			active_fullscreen_node = target_node;
		} else {
			await document.exitFullscreen();
			active_fullscreen_node = null;
		}
	} catch (err) {
		console.error("全螢幕失敗:", err);
	}

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
				<picture class="skin_img-box"
					style:--bgi="url({skin.img_x1})"
					style:--bgi-fullscreen="url({skin.img_x2}), url({skin.img_x1})"
				>
					<img class="skin_img" alt={skin.title} src={skin.img_x1}
						>
				</picture>
				{/if}
			{/key}

			<div class="fullscreen-btn" on:click={(e) => toggle_fullscreen(e)}>
				<!-- ⛶ -->
				<svg class="enter-fullscreen-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
					<path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
				</svg>
				<svg class="leave-fullscreen-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
					<path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
				</svg>
			</div>
		</a>
	{/each}
</div>



<style>
.horizontal-scroll-container {
	position: relative;
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

.fullscreen-btn {
	position: absolute;
	top: .25em;
	right: .5em;
	color: #fff;
	font-size: 1.5rem;
	transition: opacity .3s;
	cursor: pointer;

	&:not(:hover) {
		opacity: 0.3;
	}

	& .leave-fullscreen-icon {
		display: none;
	}
}
.card:not(:hover) .fullscreen-btn {
	opacity: 0;
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
	background-position: 50% 0;
	background-size: 85vw auto;
	scroll-snap-align: center;

	&:focus-visible {
		outline: unset;
	}

	&:only-of-type {
		flex: 0 0 100%;
		margin: 0;
	}

	&:first-of-type:not(:only-of-type) {
		margin-inline-start: 12.5%;
	}

	&:last-of-type:not(:only-of-type) {
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
	opacity: 0;
}
.skin_img-box {
	background-image: var(--bgi);
	background-repeat: no-repeat;
	background-position: center;
	background-size: contain;
}

.horizontal-scroll-container:fullscreen {
	background-color: #200;

	& .card {
		max-height: unset;
		height: calc(100vh - 1em);
	}

	& .skin_img {
		height: 1100px;
		max-height: 90vh;
		opacity: 0.5;
	}

	& .skin_img-box {
		background-image: var(--bgi-fullscreen);
	}
	& .leave-fullscreen-icon { display: block; }
	& .enter-fullscreen-icon { display: none; }
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