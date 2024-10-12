<script>
import Header from '$lib/Header.svelte';
import Footer from '$lib/Footer.svelte';
import { link } from '$lib/u.js';
</script>

<Header title="天地劫M工具集 by Rplus">
	天地劫M 工具集
	<span class="subtitle">by Rplus</span>
</Header>

<section>
	<fieldset>
		<legend>檢索</legend>
		<ul>
			<li>
				<a href={link('/role')}>英靈圖鑑</a>
			</li>

			<li>
				<a href={link('/strategy')}>戰陣圖鑑</a>
			</li>

			<li>
				<a href={link('/ornament')}>飾品圖鑑</a>
			</li>

			<li>
				<a href={link('/summon')}>召喚物圖鑑</a>
			</li>

			<li>
				<a href={link('/rune')}>魂石圖鑑</a>
			</li>
		</ul>
	</fieldset>

	<fieldset>
		<legend>分享 / 集成</legend>
		<ul>
			<li>
				<a href={link('/guild-war')}>閣戰打野陣容撿選</a>
			</li>

			<li>
				<a href={link('/naihe')}>三途川選擇</a>
			</li>
		</ul>
	</fieldset>

	<fieldset>
		<legend>模擬 / 評估</legend>
		<ul>
			<li>
				<a href={link('/multi-guarder')}>多重護衛優先級判定模擬</a>
			</li>
			<li>
				<a href={link('/pick-and-put')}>範圍取放順序</a>
			</li>

			<li>
				<a href={link('/material')}>淬火需求</a>
			</li>
			<li>
				<a href={link('/runes')}>魂石評估工具</a>
			</li>
		</ul>
	</fieldset>
</section>

<Footer>
	<p>
		GitHub repo:
		<br />
		<a href="https://github.com/rplus/tdj-helper" target="_blank" rel="noopener"
			>https://github.com/rplus/tdj-helper</a
		>
	</p>
</Footer>

<style>
.subtitle {
	display: inline-block;
	font-weight: 500;
	font-size: 0.65em;
	opacity: 0.5;
}

section {
	max-width: 25em;
	margin: 0 auto;
}

fieldset {
	margin-bottom: 1em;
	border-color: #ccc6;
}

fieldset li {
	margin-bottom: 0.5em;
}
</style>
