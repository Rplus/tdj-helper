<script>
	import { onMount, } from 'svelte';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import QueryFilter from './QueryFilter.svelte';

	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import role_other_skills from '$lib/data/role_other_skills.min.json';
	import roles_data from '$lib/data/roles.min.json';

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
			.then(([roles_with_basic_skill]) => {
				for (let role of roles_with_basic_skill) {

					let _skills = role_other_skills[role.pinyin];
					if (!_skills) {
						continue;
					}

					for (let _type in _skills) {
						if (_type === 'adv_skills' || _type === 'extra_skills') {

							const new_skills = (_skills[_type] ?? []).flat(Infinity).reduce((acc, i) => {
								if (i?.desc) {
									acc.push({ ...i, type: _type });
								}
								return acc;
							}, []);

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

					let role_info = roles_data.find(r => r.name === role.name)
					role.prop = role_info.prop;
					role.career = role_info.career;
				}

				roles = roles_with_basic_skill;
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
			let skills = role.skills.filter(skill => skill.desc.includes(_kwd) || skill.name.includes(_kwd));
			if (!skills.length) {
				return;
			}
			return {
				name: role.name,
				prop: role.prop,
				career: role.career,
				skills,
			}
		}).filter(Boolean);
	}

	function handle_submit(e) {
		e.preventDefault();

		const form_data = new FormData(e.currentTarget);
		const next_kwd = form_data.get('kwd') || '';

		const params = new URLSearchParams();
		params.set('kwd', next_kwd);
		goto(`?${params.toString()}`, { keepFocus: true });
	}

	function format_desc(str = '') {
		return str.replace(new RegExp(`(${kwd})`, 'g'), '<mark>$1</mark>');
	}

</script>



<Header title="技能檢索" />

<QueryFilter />

<form id="form" on:submit={handle_submit}>
	<fieldset>
		<legend>
			Q:
			<input type="search" id="kwd" name="kwd" placeholder="無視護衛" value={kwd} autofocus>
			<input type="submit" disabled={loading}>
		</legend>
		<ul id="list">
			{#each render_list as role}
				<li class="role-item" data-prop={role.prop} data-career={role.career}>
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
	font-weight: bolder;
	margin-top: 0.5em;
}
dd {
	margin-left: 1em;
	opacity: 0.7;
	font-size: smaller;
}
</style>