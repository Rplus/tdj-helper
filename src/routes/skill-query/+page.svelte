<script>
	import { onMount, } from 'svelte';
 	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';

	let loading = !true;
	let roles = [];
	let kwd = '無視護衛';

	let render_list = [];

	onMount(() => {
		Promise.all([
			'https://raw.githubusercontent.com/Rplus/tdj-data/refs/heads/data/_pre/roles_skills_for_query.min.json',
			'https://raw.githubusercontent.com/Rplus/tdj-data/refs/heads/data/_pre/role_other_skills.src.json',
		].map(i => fetch(i).then(r => r.json())))
			.then(([role_basic, other_skills]) => {

				for (let role of role_basic) {
					role.skills.push({
						name: '天賦',
						desc: role.star6,
						type: '天賦',
					})
				}

				for (let role in other_skills) {
					const role_index = role_basic.findIndex(i => i.pinyin === role);
					let role_data = other_skills[role];

					for (let skill_type in role_data) {
						let skill_set = role_data[skill_type];

						if (skill_set.name) { // support skill
							role_basic[role_index].skills.push({
								name: skill_set.name,
								desc: skill_set.descs[1].desc,
								type: 'support_skill',
							});
						} else if (skill_set.length) {
							skill_set.forEach(ss => {
								if (ss.desc) {
									role_basic[role_index].skills.push({
										name: ss.name,
										desc: ss.desc,
										type: skill_type,
									});
								} else if (ss.length) {
									ss.forEach(sss => {
										if (sss.desc) {
											role_basic[role_index].skills.push({
												name: sss.name,
												desc: sss.desc,
												type: skill_type,
											});
										}
									})
								}
							})
						}
					}
				}

				roles = role_basic;
			})
			.finally(() => {
				loading = false;
			});
	});

	function query(e) {
		console.log(e, 'query');
		const form_data = new FormData(e.currentTarget);
		const kwd = form_data.get('kwd');
		if (!kwd) {
			return;
		}

		render_list = roles.map(role => {
			let skills = role.skills.filter(skill => skill.desc.includes(kwd));
			if (!skills.length) {
				return;
			}
			return {
				name: role.name,
				skills,
			}
		}).filter(Boolean);

		// console.log(1213, roles.length, render_list);
	}

	function format_desc(str = '') {
		return str.replace(new RegExp(`(${kwd})`, 'g'), '<mark>$1</mark>');
	}

</script>



<Header title="技能檢索" />

<form id="form" on:submit={query}>
	<fieldset>
		<legend>
			Q:
			<input type="search" id="kwd" name="kwd" placeholder="skill key word" autofocus bind:value={kwd}>
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