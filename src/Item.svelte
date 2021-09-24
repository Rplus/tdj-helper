<script>
  export let position = '天';
  export let order = 0;

  import { clamp, PROPS, TYPES, } from './u.js';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let targetProp;
  let max;
  let min;
  let value = 5;

  $: {
    if (targetProp) {
      max = TYPES[targetProp.type][position][0];
      min = TYPES[targetProp.type][position][1];
      value = clamp(value, min, max);
    }
  }
  $: {
    dispatch('update', { targetProp, value, order, max, min, });
  }
</script>



<div class="flex list-item">
  <select bind:value={targetProp}>
    {#each PROPS as prop, index}
      <option value={PROPS[index]}>
        {prop.label + ' ' + PROPS[index].score}
      </option>
    {/each}
  </select>

  <input type="number" max={max} min={min} bind:value={value} />
  <div class="flex">
    <input type="range" max={max} min={min}
      bind:value={value}
      style={`--max: ${max};`}
    />
  </div>
</div>



<style>
  .list-item > * {
    flex-grow: 1;
  }

  input[type="number"] {
    width: 4em;
    margin-left: .25em;
    margin-right: .25em;
    text-align: center;
  }

  input[type="range"] {
    width: calc(100% * var(--max) / 10);
  }
</style>
