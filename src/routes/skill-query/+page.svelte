<script>
	import { onMount, } from 'svelte';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import QueryFilter from './QueryFilter.svelte';
	import StateHint from '$lib/State.svelte';

	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import role_other_skills from '$lib/data/role_other_skills.min.json';
	import roles_with_basic_skill from '$lib/data/roles_skills_for_query.min.json';
	import roles_data from '$lib/data/roles.min.json';
	import { find_subskills } from '../role/[slug]/skill.js';

	let loading = !true;
	let roles = [];
	let render_list = [];
	$: kwd =  $page.url.searchParams.get('kwd') || '';

	$: title = `技能檢索<${kwd}>`;

	$: {
		query(kwd, roles);
	}

	onMount(() => {
		let roles_data = structuredClone(roles_with_basic_skill);
		for (let role of roles_data) {

			let _other_skills = role_other_skills[role.pinyin];
			if (!_other_skills) {
				continue;
			}

			for (let _type in _other_skills) {
				if (_type === 'adv_skills' || _type === 'extra_skills') {

					const new_skills = (_other_skills[_type] ?? []).flat(Infinity).reduce((acc, i) => {
						if (i?.desc) {
							acc.push({ ...i, type: _type });
						}
						return acc;
					}, []);

					role.skills.push(...new_skills);
				}
				else if (_type === 'support_skill') {
					let new_skill = {
						..._other_skills[_type],
						desc: '【援襲】' + _other_skills[_type].descs[1].desc,
						type: _type,
					};
					role.skills.push(new_skill);
				}
			}

			for (let _skill of role.skills) {
				let subskills = find_subskills(_skill.name);
				if (subskills) {
					let subskills_desc = subskills.map(s => '【' + s.name + '】\n' + s.desc).join('\n');
					_skill.desc += '\n' + subskills_desc;
				}
			}

			let role_info = roles_data.find(r => r.name === role.name)
			role.prop = role_info.prop;
			role.career = role_info.career;
		}

		roles = roles_data;
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



<Header title={title} />

<QueryFilter />

<StateHint />

<form id="form" on:submit={handle_submit}>
	<fieldset>
		<legend>
			Q:
			<input type="search" id="kwd" name="kwd" placeholder="無視護衛" value={kwd}>
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
							<dt>
								<strong>{skill.name}</strong>
								<sup>/{skill.type || 'skill'}</sup>
							</dt>
							<dd class="pre-line">{@html format_desc(skill.desc)}</dd>
						{/each}
					</dl>
				</li>
			{/each}
		</ul>
	</fieldset>
</form>

<Footer time={true} />



<style>
#form {
	min-height: 70vh;
}
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
	opacity: 0.7;
	font-size: smaller;
}
</style>