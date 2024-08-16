<script>
export let mobile_align = '';
</script>

<div class="flex {mobile_align ? `mobile-align-${mobile_align}` : ''}">
	<div class="avatar">
		<div class="name">
			<slot name="name" />
		</div>

		<div class="img-box">
			<slot name="img" />
		</div>
	</div>

	<div class="info">
		<slot name="info" />
	</div>
</div>

<style>
.flex {
	--img-size: 64px;

	gap: 0.5em min(0.75em, 3vw);
	margin-block-end: 1.5em;

	@media (max-width: 480px) {
		--img-size: 48px;
		--name-fz: 0.8em;
	}

	@media (max-width: 420px) {
		&.mobile-align-center {
			flex-direction: column;
			align-items: center;
		}
	}
}

.avatar {
	text-align: center;
}
.img-box {
	aspect-ratio: 1;
	border-radius: 0.25em;
	background-color: #9993;
	box-shadow: inset 2px 2px 8px #0003;
	overflow: hidden;

	& img {
		display: block;
		margin: 0.5em;
		width: var(--img-size);
		height: var(--img-size);
		filter: drop-shadow(2px 2px 3px #333c);
	}
}
.name {
	padding-bottom: 0.25em;
	white-space: nowrap;
	font-size: var(--name-fz, 1em);
}
.info {
	flex-grow: 1;
	width: 100%;
}
</style>
