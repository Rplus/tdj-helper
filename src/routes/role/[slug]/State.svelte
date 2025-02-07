<script>
import { onMount } from 'svelte';
import states from '$lib/data/state.min.json';
import { link, } from '$lib/u.js';

// console.log(11, states);

let dom;

let o_pos = {};
let pos = {
	top: 0,
	left: 0,
};

$: state_string = '';

$: state_name = '';
$: state_desc = '';

function show_state(str = '', rect) {
}

function hide_state() {
	state_string = '';
	state_name = '';
	state_desc = '';
}

function onselectionchange() {
	// console.log('onselectionchange');
	let selectObj = document.getSelection();
	if (selectObj?.isCollapsed || selectObj.type !== 'Range') {
		hide_state();
		return;
	}

	// console.log(selectObj);
	let str = selectObj.toString() || '';
	str = str.match(/^.*「?(.+)」?$/m)?.[0]?.replace(/^.*「/m, '').replace(/」.*$/m, '') || '';
	let state = find_state(str);
	if (!state) {
		hide_state();
		return;
	}
	state_string = str;
	state_name = state.name;
	state_desc = state.desc;


	// position
	let clientRects = selectObj.getRangeAt(0).getClientRects()[0];
	// console.log(22, clientRects);
	pos.left = clientRects.x - o_pos.x;
	pos.top = clientRects.y - o_pos.y + clientRects.height + window.scrollY;
}

function find_state(name = '') {
	let target = states.find(s => s.name === name);
	if (!target) {
		return;
	}
	// console.log(11, target);
	return target;
}


onMount(() => {
	o_pos = dom.getBoundingClientRect();
});
</script>

<svelte:document on:selectionchange={onselectionchange} />


<div class="hint" style="left:{pos.left}px; top:{pos.top}px;"
	data-hidden={state_name}
	bind:this={dom}>
	<a class="name" href={link(`/state/#${state_name}`)}>
		{state_name}
	</a>
	<div class="desc">
		{state_desc}
	</div>
</div>


<style>
.hint {
	position: absolute;
	top: 0;
	left: 0;
	max-width: 15rem;
	z-index: 100;
	padding: .5em;
	background-color: #fff;
	border: 1px solid #000;
	opacity: 0.8;
	user-select: none;
	pointer-events: none;

	&[data-hidden=""] {
		visibility: hidden;
	}

}

:global(.dark-theme) .hint {
	background-color: #444;
}

.name {
	border-bottom: 1px dashed #0003;
	margin-bottom: 0.25em;
	pointer-events: initial;
}

.desc {
	padding-left: 0.5em;
}
</style>