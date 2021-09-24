<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  import { historeUrls, savedUrl } from './stores.js';

  function applyUrl(url) {
    dispatch('apply', {
      url: url,
    });
  }

  function itemTitle(url) {
    let data = JSON.parse(url);
    return [
      genTick('', data.title + '‧' + data.position),
      genTick('計分', data.score),
      ...data.items.filter(i => i.prop !== '--').map(i => genTick(i.prop, i.value)),
    ].join('');
  }

  function genTick(t1 = '', t2 = '') {
    return `<span class="i ib">
      <sup>${t1}</sup>
      ${t2}
    </span>`;
  }
</script>



<details open class="aside">
  <summary>
    魂石紀錄:
  </summary>

  {#each $savedUrl as url (url)}
    <div class="li">
      <button class="btn"
        on:click|preventDefault="{() => historeUrls.remove(url) }"
      >⨯</button>

      <span
        on:click|preventDefault="{() => applyUrl(url) }"
      >{@html itemTitle(url) }</span>
    </div>
  {/each}
</details>



<style>
  details {
    margin-left: 5vmin;
  }

  .li {
    display: flex;
    align-items: start;
    margin-top: .5em;
    margin-bottom: .5em;
    opacity: 0.8;
  }

  .li:hover {
    opacity: 1;
    cursor: pointer;
  }

  .btn {
    margin: 0 1em 0 0;
    padding: .25em .5em;
  }

  :global(.i.ib) {
    margin: 0 .2em;
    font-size: smaller;
  }

  :global(sup) {
    color: #66c;
  }

  :global(.i.ib:first-child) {
    display: block;
    font-size: larger;
    text-indent: -.75em;
  }

  :global(sup:empty) {
    display: none;
  }

  :global(sup::after) {
    content: '/';
    margin-left: .1em;
    margin-right: -.2em;
  }
</style>
