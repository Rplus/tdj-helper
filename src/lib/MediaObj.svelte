<div class="flex">
	<div class="avatar">
		<div class="img-box">
			<slot name="img" />
		</div>

		<div class="name">
			<slot name="name" />
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

	@media (max-width: 480px) {
		--img-size: 48px;
		--name-fz: 0.8em;
	}
}

.avatar {
	text-align: center;
}
.img-box {
	aspect-ratio: 1;
	padding: 0.5em;
	border-radius: 0.25em;
	background-color: #9993;
	box-shadow: inset 2px 2px 8px #0003;
	overflow: hidden;

	& img {
		display: block;
		width: var(--img-size);
		height: var(--img-size);
		filter: drop-shadow(2px 2px 3px #333c);
	}
}
.name {
	padding-top: 0.25em;
	white-space: nowrap;
	font-size: var(--name-fz, 1em);
}
.info {
	flex-grow: 1;
}
</style>
