<script>
	import { onMount, } from 'svelte';
 	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import role_other_skills from '$lib/data/role_other_skills.min.json';

	let loading = !true;
	let roles = [];
	let render_list = [];
	$: kwd =  $page.url.searchParams.get('kwd') || '';

	$: {
		query(kwd, roles);
	}

	onMount(() => {
		Promise.all([
			'https://cdn.jsdelivr.net/gh/Rplus/tdj-data@data/_pre/roles_skills_for_query.min.json',
			// 'https://raw.githubusercontent.com/Rplus/tdj-data/refs/heads/data/_pre/roles_skills_for_query.min.json',
			// 'https://raw.githubusercontent.com/Rplus/tdj-data/refs/heads/data/_pre/role_other_skills.src.json',
		].map(i => fetch(i).then(r => r.json())))
			.then(([role_basic]) => {

				for (let role of role_basic) {

					let _skills = role_other_skills[role.pinyin];
					if (!_skills) {
						continue;
					}

					for (let _type in _skills) {
						if (_type === 'adv_skills' || _type === 'extra_skills') {
							let new_skills = _skills[_type].flatMap(i =>
								i.desc ? [{ ...i, type: _type }] : []
							);
							role.skills.push(...new_skills);
						}
						else if (_type === 'support_skill') {
							let new_skill = {
								..._skills[_type],
								desc: '【援襲】' + _skills[_type].descs[1].desc,
								type: _type,
							};
							role.skills.push(new_skill);
						}
					}
				}

				roles = role_basic;
			})
			.finally(() => {
				loading = false;
			});
	});

	function query(_kwd = '', _roles) {
		if (!_kwd) {
			render_list = [];
			return;
		}

		render_list = _roles.map(role => {
			let skills = role.skills.filter(skill => skill.desc.includes(_kwd));
			if (!skills.length) {
				return;
			}
			return {
				name: role.name,
				skills,
			}
		}).filter(Boolean);
	}

	function handle_submit(e) {
		e.preventDefault();

		const form_data = new FormData(e.currentTarget);
		const next_kwd = form_data.get('kwd') || '';

		goto(`?kwd=${next_kwd}`, { keepFocus: true });
	}

	function format_desc(str = '') {
		return str.replace(new RegExp(`(${kwd})`, 'g'), '<mark>$1</mark>');
	}

</script>



<Header title="技能檢索" />

<form id="form" on:submit={handle_submit}>
	<fieldset>
		<legend>
			Q:
			<input type="search" id="kwd" name="kwd" placeholder="無視護衛" value={kwd} autofocus>
			<input type="submit" disabled={loading}>
		</legend>
		<ul id="list">
			{#each render_list as role}
				<li>
					<a href="/tdj-helper/role/{role.name}#:~:text={kwd}">
						{role.name}
					</a>
					<dl>
						{#each role.skills as skill}
							<dt>{skill.name}
								<sup>/{skill.type || 'skill'}</sup>
							</dt>
							<dd>{@html format_desc(skill.desc)}</dd>
						{/each}
					</dl>
				</li>
			{/each}
		</ul>
	</fieldset>
</form>

<Footer time={true} />



<style>
a {
	text-decoration: underline;
}
li {
	margin-bottom: 1em;
}
dt {
	font-size: smaller;
	margin-top: 0.5em;
}
dd {
	margin-left: 1em;
	opacity: 0.5;
	font-size: smaller;
}
</style>