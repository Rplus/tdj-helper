<script>
  import { adjustProps, oriProps } from './stores.js';
  $adjustProps;
  let hidden = true;

  function toggle() {
    hidden = !hidden;
  }

  function reset() {
    oriProps.reset();
  }
</script>



<span on:click={toggle}>⚙️</span>

<div class="dialog" hidden={hidden}>
  <div class="dialog-overlay" on:click={toggle}></div>
  <div class="dialog-content">
    <fieldset>
      <legend>調整計分權重</legend>

      {#each $oriProps as prop}
        {#if prop.label !== '--'}
          <div>
            {prop.label}
            <input type="number" bind:value={prop.score} max="20" step="1" min="0" />
            <input type="range" bind:value={prop.score} max="20" step="1" min="0" />
          </div>
        {/if}
      {/each}
    </fieldset>

    <div class="flex jc-sb">
      <input type="submit" value="✓" on:click={toggle}>
      <input type="reset" on:click={reset}>
    </div>
  </div>
</div>



<style>
.dialog {
  position: fixed;
  inset: 0;
  width: fit-content;
  height: fit-content;
  z-index: 10;
  margin: auto;
}

.dialog-overlay {
  position: fixed;
  inset: 0;
  z-index: -1;
  background-color: var(--dialog-overlay, #ccc9);
  backdrop-filter: blur(3px);
  cursor: move;
}

.dialog-content {
  padding: 1em;
  background-color: #fffc;
  box-shadow: 0 .25em 3px #0003;
}
</style>
