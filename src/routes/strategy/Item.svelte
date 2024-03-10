<script>
import { resize_img } from '$lib/u.js';
import { link } from '$lib/u.js';

import Name from './Name.svelte';

export let member = {};

let is_strategy = !!member.desc;
let is_role = !is_strategy && !!member.img;

let href;
if (is_role) {
	href = link(`/role/${member.name}`);
}

let img_type = is_strategy ? 'strategy' : 'heroicon';
let img = resize_img(
	`https://media.zlongame.com/media/news/cn/tdj/info/data/${img_type}/${member.img}.png`,
);
</script>

<div class="member">
	<div class="avatar">
		{#if member.img}
			<img decoding="async" loading="lazy" src={img} alt={member.name} width="64" height="64" />
		{/if}
	</div>

	<Name name={member.name} {href} />
	<!-- link(`/role/${name}`) -->
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
	width: 80px;
	height: 80px;
	margin-bottom: 0.25em;
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
</style>
