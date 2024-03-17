import { writable, derived } from 'svelte/store';
import { cloneObj, ORI_PROPS } from './u.js';
import { saveItem, getItem } from '$lib/u.js';

function createUrls() {
	let _urls = getItem('historeUrls') || [];

	const { subscribe, set, update } = writable(_urls);

	return {
		subscribe,

		add: (a) => update((n) => [...new Set([...n, a])]),

		remove: (a) => update((n) => n.filter((i) => i !== a)),

		reset: () => set([]),
	};
}

export const historeUrls = createUrls();

export const savedUrl = derived(historeUrls, ($historeUrls) => {
	saveItem({
		key: 'historeUrls',
		value: $historeUrls,
	});
	return $historeUrls;
});

function createProps() {
	let _props = getItem('oriProps') || cloneObj(ORI_PROPS);

	const { subscribe, set, update } = writable(_props);

	return {
		subscribe,
		update,
		set,
		reset: () => set(cloneObj(ORI_PROPS)),
	};
}

export const oriProps = createProps();

export const adjustProps = derived(oriProps, ($oriProps) => {
	saveItem({
		key: 'oriProps',
		value: $oriProps,
	});
	return $oriProps;
});
