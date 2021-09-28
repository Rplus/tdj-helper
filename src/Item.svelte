<script>
  import {
    clamp,
    getProp,
    cloneObj,
    PROPS,
    DefailtItem,
  } from './u.js';

  export let position = '天';
  export let item = cloneObj(DefailtItem);


  $: [max, min] = getProp(item.prop).range[position] || [];
</script>



<div class="flex list-item">
  <select bind:value={item.prop}>
    {#each PROPS as _prop, index}
      <option value={_prop.label}>
        {_prop.label + ' ' + _prop.score}
      </option>
    {/each}
  </select>

  <input
    type="number"
    max={max}
    min={min}
    bind:value={item.value}
  />

  <div class="flex">
    <input type="range" max={max} min={min}
      bind:value={item.value}
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
