<script>
	export let row;
	export let col;
	import Icon from './Icon.svelte';
</script>



<a class="anchor" id={row.name}></a>

<div class="box">

	<div class="pic">
		<Icon row={row} />

		<img class="avatar" width="50" height="50" loading="lazy" decording="async"
		 src={row.avatar.src}
		 srcset={row.avatar.srcset}
		 alt={row.name}
		/>
	</div>

	<a href={row.link} target="_biliwiki">
		{row.name}
	</a>
</div>

<style>
	.anchor:target::before {
		content: '';
		display: block;
		padding-top: 30px;
		margin-top: -30px;
		visibility: hidden;
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
			left: -35%;
			top: 35%;
			opacity: 0.8;
			/* box-shadow: 0 0 0 1px; */
			/* transform-origin: -30% 130%; */
			transform: scale(.6);
		}
	}

	.avatar {
		display: block;
		border-radius: 50%;
		box-shadow: 1px 1px 3px #000;
	}

	a {
		color: #339;

		&:not(:hover) {
			text-decoration: none;
		}
	}
</style>