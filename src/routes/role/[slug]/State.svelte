<script>
import { onMount } from 'svelte';
import states from '$lib/data/state.min.json';
import { link, } from '$lib/u.js';

// console.log(11, states);

let dom;

let pos_top = 0;
let pos_left = 0;


$: state_name = '';
$: state_desc = '';
$: state_stealable = false;
$: state_extendable = false;
$: state_dispellable = false;

let p_pos;

function show_state(str = '', rect) {
}

function hide_state() {
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
	state_name = state.name;
	state_desc = state.desc;
	state_stealable = state.stealable;
	state_extendable = state.extendable;
	state_dispellable = state.dispellable;

	// position
	let clientRects = selectObj.getRangeAt(0).getClientRects()[0];

	pos_left = clientRects.x - p_pos.left + window.pageXOffset;
	pos_top = clientRects.y - p_pos.top + window.pageYOffset + clientRects.height;
}

function getOffset(el) {
	const rect = el.getBoundingClientRect();
	return {
		left: rect.left + window.scrollX,
		top: rect.top + window.scrollY,
	};
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
	p_pos = getOffset(dom.parentElement);
});

</script>

<svelte:document on:selectionchange={onselectionchange} />

<div class="hint" style="left:{pos_left}px; top:{pos_top}px;"
	data-hidden={state_name}
	bind:this={dom}>
	<div class="flex jc-sb" style="gap:1em;">
		<a class="name" href={link(`/state/#${state_name}`)}>
			{state_name}
		</a>
		<sup class="meta">
			<span class="boolean" class:active={state_stealable}>偷取</span>
			<span class="boolean" class:active={state_extendable}>擴散</span>
			<span class="boolean" class:active={state_dispellable}>驅散</span>
		</sup>
	</div>
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
	background-color: #fffd;
	border: 1px solid #000;
	user-select: none;
	pointer-events: none;

	&[data-hidden=""] {
		visibility: hidden;
	}

}

:global(.dark-theme) .hint {
	background-color: #333d;
	border-color: #fff3;
}

.name {
	border-bottom: 1px dashed #0003;
	margin-bottom: 0.25em;
	pointer-events: initial;
}

.desc {
	padding-left: 0.5em;
}

.meta {
	font-size: x-small;

	& span {
		border: 1px solid #9999;
		padding: 2px;
	}
}
/*
.hint:not(:hover) .meta {
	visibility: hidden;
}
*/
.boolean:not(.active) {
	opacity: 0.5;
	text-decoration: line-through;
}
</style>
