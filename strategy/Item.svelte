<script>
	export let member = {};

	let is_strategy = !!member.desc;

	let is_role = !is_strategy && !!member.img;

	let img_type = is_strategy ? 'strategy' : 'heroicon';
	let img = resize_img(`https://media.zlongame.com/media/news/cn/tdj/info/data/${img_type}/${member.img}.png`);

	function resize_img(url) {
		return `https://wsrv.nl/?&w=128&h=128&we&il&output=webp&url=` + url;
	}
</script>



<div class="member">
	<div class="avatar">
		{#if member.img}
			<img decoding="async" loading="lazy"
				src={img}
				alt={member.name}
				width="64"
				height="64"
			/>
		{/if}
	</div>



	{#if is_role}
		<a href="../roles/#{member.name}">
			<div class="title">
				{member.name}
			</div>
		</a>
	{:else}
		<div class="title">
			{member.name}
		</div>
	{/if}

</div>



<style>
.member {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	@media (max-width: 360px) {
		max-width: 50px;
	}
}

.avatar {
	width: 90px;
	height: 90px;
	margin-bottom: .25em;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #9993;

	@media (max-width: 900px) {
		width: 50px;
		height: 50px;
	}
}

.avatar img {
	max-width: 90%;
	max-height: 90%;
}

.title {
	font-size: smaller;
}
</style>