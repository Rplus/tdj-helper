<script>
	export let row;
	export let col;
	import Icon from './Icon.svelte';
	import strategy_data from '/data/strategy.min.json';

	$: img = get_img('heroicon', row.hero_icon);

	$: strategy = get_strategy(row.strategy);

	$: links = [
		`https://www.game-beans.com/userinfo/tdj/index.html?customparams={%22hero%22:%22${row.pinyin}%22}`, // official tw
		`https://www.zlongame.com/userinfo/tdj/index.html?customparams={%22hero%22:%22${row.pinyin}%22}`, // official cn
		`https://wiki.biligame.com/tdj/${row.path}`, // bwiki
	];

	function get_strategy(strategy) {
		if (!strategy) {
			return null;
		}
		let _strategy = strategy_data.find(i => i.name === row.strategy);
		if (_strategy) {
			return {
				name: _strategy.name,
				img: get_img('strategy', _strategy.img),
			};
		}
	}

	function get_img(type, name, size) {
		let src = `https://media.zlongame.com/media/news/cn/tdj/info/data/${type}/${name}.png`;
		return resize_img(src, size);
	}

	function resize_img(url, size = 128) {
		return `https://wsrv.nl/?&w=${size}&h=${size}&we&il&output=webp&url=${url}`;
	}

</script>



<span class="anchor" id={row.name} />

<div class="box">

	<div class="pic">
		<Icon row={row} />

		<img class="avatar"
			width="50" height="50"
			loading="lazy" decording="async"
			src={img}
			alt={row.name}
		/>

		{#if strategy}
			<a href="../strategy/#{strategy.name}" class="strategy" title={strategy.name} style="background-image: url('{strategy.img}')" />
		{/if}
	</div>

	<div class="name pos-r">
		<a href={links[0]} target="_officail_tw">
			{row.name}
		</a>

		<div class="links pos-a">
			<a href={links[1]} target="_officail_cn">
				{row.name} (cn)
			</a>
			<a href={links[2]} target="_biliwiki">
				{row.name} (bwiki)
			</a>
		</div>
	</div>

</div>

<style>
	.anchor:target::before {
		content: '';
		display: block;
		padding-top: 30px;
		margin-top: -30px;
		visibility: hidden;
	}

	.anchor:target ~ .box {
		animation: fadeout-anchor 5s;
	}

	@keyframes fadeout-anchor {
		from { background-color: #ff03; }
		to   { background-color: #ff00; }
	}

	.box {
		display: flex;
		gap: .5em;
		align-items: center;
		text-align: left;
	}

	.pic {
		position: relative;
		width: fit-content;

		& .icon {
			position: absolute;
			left: -45%;
			top: -35%;
			opacity: 0.8;
			transform: scale(.6);
		}
	}

	.avatar {
		display: block;
		border-radius: 50%;
		box-shadow: 1px 1px 3px 1px #3339;
	}

	a {
		color: #339;

		&:not(:hover) {
			text-decoration: none;
		}
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
		visibility: hidden;
	}
	.name:hover .links,
	.name:focus-within .links {
		visibility: visible;
	}

	.links a {
		display: block;
	}

</style>