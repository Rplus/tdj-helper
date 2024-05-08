<script>
export let role;

import { link, get_img } from '$lib/u.js';
import strategy_data from '$lib/data/strategy.min.json';

import Icon from './Icon.svelte';
import Img from '$lib/Img.svelte';

$: img = get_img('heroicon', role.hero_icon);

$: strategy = get_strategy(role.strategy);

$: links = [
	role.pinyin_tw
		? `https://www.game-beans.com/userinfo/tdj/index.html?customparams={%22hero%22:%22${role.pinyin_tw}%22}`
		: null, // official tw
	`https://www.zlongame.com/userinfo/tdj/index.html?customparams={%22hero%22:%22${role.pinyin}%22}`, // official cn
	`https://wiki.biligame.com/tdj/${role.path}`, // bwiki
];

function get_strategy(strategy) {
	if (!strategy) {
		return null;
	}
	let _strategy = strategy_data.find((i) => i.name === role.strategy);
	if (_strategy) {
		return {
			name: _strategy.name,
			img: get_img('strategy', _strategy.img),
		};
	}
}
</script>

<div class="box">
	<div class="pic">
		<Icon {role} />

		<a href={link(`/role/${role.name}`)}>
			<Img class="avatar" width="50" height="50" src={img} alt={role.name} />
		</a>

		{#if strategy}
			<a
				href={link(`/strategy/#${strategy.name}`)}
				class="strategy"
				title={strategy.name}
				style="background-image: url('{strategy.img}')"
			>
			</a>
		{/if}
	</div>

	<div class="name pos-r">
		<a href={links[0]} rel="noopener" target="_officail_tw">
			{role.name}
		</a>

		<div class="links pos-a">
			<a href={links[1]} rel="noopener" target="_officail_cn">
				{role.name} (cn)
			</a>
			<a href={links[2]} rel="noopener" target="_biliwiki">
				{role.name} (bwiki)
			</a>
		</div>
	</div>
</div>

<style>
.box {
	text-align: center;
	display: flex;
	gap: 0.5em;
	flex-direction: column;
	align-items: center;

	@media (min-width: 700px) {
		flex-direction: row;
	}
}

.pic {
	position: relative;
	width: fit-content;

	& .icon {
		position: absolute;
		left: -45%;
		top: -35%;
		opacity: 0.8;
		transform: scale(0.6);
	}
}

.pic :global(.avatar) {
	display: block;
	border-radius: 50%;
	box-shadow: 1px 1px 3px 1px #3339;
}

a:not(:hover) {
	text-decoration: none;
}

.strategy {
	position: absolute;
	right: -15%;
	bottom: -15%;
	z-index: 2;
	width: 24px;
	height: 24px;
	background-size: contain;
	box-shadow: 1px 1px 2px #3339;
	border-radius: 50%;
	overflow: hidden;

	&:hover {
		bottom: calc(-15% + 1px);
	}
}

.links {
	position: absolute;
	background-color: var(--main-bgc);
	white-space: nowrap;
	text-align: start;
	visibility: hidden;
	z-index: 1;
	opacity: 0.75;
}
.pic:hover + .name .links, /* TODO: click pic to show more role details */
.name:hover .links,
.name:focus-within .links {
	visibility: visible;
}

.links a {
	display: block;
}
</style>
