<script>
	export let title;
	export let img = '';
	export let link = '';

	import data from '/roles/data.json';

	let role = data.roles.find(role => role.name === title);
	if (role && !img) {
		img = role.avatar.src;
		link = role.link;
	}

</script>



<div class="member">
	<div class="avatar">
		{#if img}
			<img decoding="async" loading="lazy"
				src={img}
				alt={title}
				width="60"
				height="60"
			/>
		{/if}
	</div>
	{#if link}
		<a href={link} target="_biliwiki">
			{title}
		</a>
	{:else}
		<span>
			{title}
		</span>
	{/if}
</div>



<style>
.member {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.avatar {
	width: 90px;
	height: 90px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #9993;

	@media (max-width: 900px) {
		width: 60px;
		height: 60px;
	}
}

.avatar img {
	max-width: 90%;
	max-height: 90%;
}
</style>