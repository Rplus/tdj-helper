<script>
export let role;

import { link  } from '$lib/u.js';

import Icon from './Icon.svelte';

</script>

<div class="box">
	<Icon {role} />

	<div class="name pos-r">
		<a href={link(`/summon/${role.name}`)}>
			{role.name}
		</a>

		<!--
		<div class="links pos-a">
			<a href="https://wiki.biligame.com/tdj/{role.key}" rel="noopener" target="_biliwiki">
				{role.name} (bwiki)
			</a>
		</div>
		-->
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

.avatar {
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
