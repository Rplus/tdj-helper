<script>
  export let position = '天';
  export let order = 0;

  import { clamp } from './u.js';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  const types = {
    atk: {
      '天': [10, 4],
      '地': [5, 2],
      '荒': [7, 3],
    },
    def: {
      '天': [5, 2],
      '地': [10, 4],
      '荒': [7, 3],
    }
  };

  const props = [
    { label: '--',  score: 0, type: 'atk', },
    { label: '攻擊',  score: 11, type: 'atk', },
    { label: '傷害',  score: 10, type: 'atk', },
    { label: '穿透',  score: 6, type: 'atk', },
    { label: '暴擊',  score: 3, type: 'atk', },
    { label: '反擊',  score: 0, type: 'atk', },

    { label: '氣血',  score: 7, type: 'def', },
    { label: '免傷',  score: 5, type: 'def', },
    { label: '防禦',  score: 1, type: 'def', },
    { label: '抗暴',  score: 0, type: 'def', },
  ];

  let targetProp;
  let max;
  let min;
  let value = 5;

  $: {
    if (targetProp) {
      max = types[targetProp.type][position][0];
      min = types[targetProp.type][position][1];
      value = clamp(value, min, max);
    }
  }
  $: {
    dispatch('update', {targetProp, value, order});
  }
</script>



<div class="flex">
  <select bind:value={targetProp}>
    {#each props as prop, index}
      <option
        label={prop.label + ' ' + props[index].score}
        value={props[index]}
      />
    {/each}
  </select>

  <input type="number" max={max} min={min} bind:value={value} />
  <input type="range" max={max} min={min}
    bind:value={value}
    style={`--max: ${max}; --min: ${min}`}
  />
</div>



<style>
  input {
    text-align: center;
    margin-left: 0.25em;
  }

  input[type="number"] {
    width: 5em;
  }

  input[type="range"] {
    width: 10em;
    width: calc(.75em * (var(--max, 10) + var(--min, 2)));
  }
</style>
