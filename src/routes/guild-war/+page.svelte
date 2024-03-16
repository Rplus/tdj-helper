<script>
import Header from '$lib/Header.svelte';
import Footer from '$lib/Footer.svelte';
import { onMount } from 'svelte';
import { link } from '$lib/u.js';
import {
	raw_data,
	transStr,
	genLink,
} from './data.js';

raw_data.forEach((i) => {
	i.member = transStr(i.member);
});

let o_types = [...new Set(raw_data.map((i) => i.name))];

let answers_index = [null, null, null];
let answers_type = [null, null, null];
let output = [null, null, null];
$: output = gen_op(answers_index, answers_type);

let textarea_content = '';

$: textarea_content = gen_text(output);

let full_qs = '';
$: full_qs = gen_qs(output);

function gen_text(arr) {
	return arr.map((i, index) => i && `#${index + 1} ${i.name}:\n${i.member}\n\n`).join('');
}

function gen_op(answers_index) {
	return answers_index.map((i, index) => {
		let [type, idx] = i?.split('.') || [];
		let ans = raw_data[idx];

		if (!type) {
			return null;
		}
		return ans.name === answers_type[index] ? ans : { name: answers_type[index], member: '?' };
	});
}

function gen_qs(obj) {
	return obj.map((i, index) => {
		if (!i) { return ''; }
		let members = i.member
			.replace(/(\s)?[—＿]+(\s)?/g, ' ')
			.replace(/\s+/g, '+');
		return `${index + 1}=${i.name}:${members}`;
	}).filter(Boolean).join('&');
}

let textarea;
let textarea_style = '';
let textarea_rows = 5;
function resize() {
	textarea.style = '';
	textarea_rows = textarea_rows > 20 ? 5 : 25;
	textarea.scrollIntoView();
}
function copy() {
	navigator.clipboard.writeText(textarea_content);
}

onMount(() => {
	// init qs
	let qs = new URLSearchParams(location.search.replace(/＿+\+/g, ''));
	let _types = [null, null, null, ];
	let qs_arr = [qs.get('1'), qs.get('2'), qs.get('3')].map((str, index) => {
		if (!str) {
			return -1;
		}
		let [_type, _names] = str.split(':');

		return raw_data.findIndex(item => {
			if (!item.name.includes(_type)) {
				return false;
			}
			_types[index] = item.name;
			return _names?.split(' ').every(_name => item.member.includes(_name));
		});
	});

	answers_index = qs_arr.map(idx => {
		if (idx === -1) {
			return null;
		}
		return `${raw_data[idx]?.name}.${idx}`;
	});
	answers_type = _types;
});

</script>

<div class="workspace">
	<Header title="閣戰打野陣容" />

	<div class="working-box flex">
		<details open>
			<summary>輸出陣容文字</summary>

			<textarea bind:this={textarea} rows={textarea_rows} cols="30" readonly
				>{textarea_content}</textarea
			>
		</details>

	</div>

	<div class="text-center action-bar">
		<a href={link(`/guild-war?${full_qs}`)}>🔗 分享連結</a>
		<button on:click={resize}>↕ 縮放</button>
		<button on:click={copy}>⎙ 複製</button>
	</div>

	<hr />

	<div id="form-box">
		{#each answers_type as i, ans_index}
			<details open class="mb-1">
				<summary class="mb-1">#{ans_index + 1} {answers_type[ans_index] || ''}</summary>

				<div class="flex mb-1 details-content">
					<div>
						{#each o_types as type}
							<label class="flex mb-1">
								<input
									type="radio"
									value={type}
									bind:group={answers_type[ans_index]}
									name="type-{ans_index}"
								/>
								<pre>{type}</pre>
							</label>
						{/each}
					</div>

					<div class="mb-1">
						{#each raw_data as item, item_index}
							<label class="flex mb-1" hidden={answers_type[ans_index] !== item.name}>
								<input
									type="radio"
									name="input-{ans_index}"
									bind:group={answers_index[ans_index]}
									value="{item.name}.{item_index}"
								/>
								<pre class="option">{item.member}</pre>
							</label>
						{/each}
					</div>
				</div>
			</details>
		{/each}
	</div>

	<Footer time={false}>
		<p>
			可採用快速連結，示例：

			<br />
			<a href={link('/guild-war?1=羊:紫楓+寒月&2=連:冰璃&3=惡魔:依依')}
				>https://rplus.github.io/tdj-helper/guild-war/?1=羊:紫楓+寒月&2=連:冰璃&3=惡魔:依依</a
			>
		</p>

		<p>
			使用說明與建議可至巴哈姆特文章:
			<br />
			<a href="https://m.gamer.com.tw/forum/C.php?bsn=38462&snA=9134">
				https://m.gamer.com.tw/forum/C.php?bsn=38462&snA=9134
			</a>
		</p>
	</Footer>
</div>

<style>
.working-box {
	margin: 0 auto;
	width: fit-content;
	font-size: smaller;
}
.action-bar {
	position: sticky;
	top: 0;
	background-color: var(--main-bgc);
	padding-bottom: .25em;
}
details {
	max-width: 25em;
	margin: 0 auto;
}
textarea {
	font-size: smaller;
}
pre {
	margin: 0 0 .25em;
	padding: .15em .5em .25em;
	font-size: min(1rem, 2.75vw);

	&.option {
		background: linear-gradient(to right, #9994, #0000);
	}
}

label.flex {
	align-items: start;
	cursor: pointer;
	gap: .15em;

	& input {
		margin-block-start: .65em;
	}

	&:hover pre {
		background-color: #ffc3;
	}

	& input:checked + pre {
		background-color: #ffc7;
		box-shadow: inset 3px 0 #3336;
	}
}
.mb-1 {
	margin-bottom: 0.5em;
}
</style>
