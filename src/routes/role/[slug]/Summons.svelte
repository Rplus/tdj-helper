<script>
export let summons = [];
import { link } from '$lib/u.js';

</script>

<div class="hr">召喚物</div>

<ul>
	{#each summons as summon}
		<li>
			<a href={link(`/summon/${summon}`)}>
				{summon}
			</a>
		</li>
	{/each}
</ul>

<hr>
