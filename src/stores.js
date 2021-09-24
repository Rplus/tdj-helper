import { writable, derived } from 'svelte/store';
import { saveItem, getItem } from './u.js';

function createUrls() {
  let _urls = getItem('historeUrls') || [];

  const { subscribe, set, update } = writable(_urls);

  return {
    subscribe,

    add: (a) => update(n =>
      [...new Set( [...n, a] )]
    ),

    remove: (a) => update(n =>
      n.filter(i => i !== a)
    ),

    reset: () => set([]),
  };
}

export const historeUrls = createUrls();

export const savedUrl = derived(
  historeUrls,
  $historeUrls => {
    saveItem({
      key: 'historeUrls',
      value: $historeUrls,
    });
    return $historeUrls;
  }
);
