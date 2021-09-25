<script>
  import Item from './Item.svelte';
  import History from './History.svelte';
  import { clamp, sum, getProp, BreakPoints, RockTypes, } from './u.js';
  import { historeUrls } from './stores.js';

  let position = '天';
  let items = new Array(4);

  let title = '';

  $: output = sumItems(items);

  $: {
    position;
    items;
    refitValueRange();
  }

  function updateScores(e) {
    items[e.detail.order] = e.detail;
  }

  function sumItems(items) {
    return items.reduce((all, i) => {
      let _p = getProp(i.prop);
      let _max = _p.range[position][0];
      all.score += _p.score * i.value;
      all.max += _p.score * _max;
      return all;
    }, { score: 0, max: 0, });
  }

  function save() {
    if (!output.score) { return; }
    historeUrls.add(JSON.stringify({
      title,
      position,
      items,
      score: output.score,
    }));
  }

  function applyUrl(apply) {
    let data = JSON.parse(apply.detail.url);
    position = data.position;
    title = data.title;
    items = data.items;
  }

  function refitValueRange() {
    items.forEach(i => {
      let _p = getProp(i.prop);
      let [max, min] = _p.range[position];
      i.value = clamp(i.value, min, max);
    })
  }
</script>



<h1>天地劫M 絕品魂石 評估</h1>

<form class="main" style={`--break-point: ${BreakPoints[position]}`}>
  <fieldset>
    <legend>
      絕‧魂石孔位
      <input
        class="title"
        type="search"
        list="rock-types"
        bind:value={title}
      />
      <datalist id="rock-types">
        {#each RockTypes as rock}
          <option value={rock}></option>
        {/each}
      </datalist>
    </legend>
    <div class="flex jc-se">
      <label>
        <input type="radio" bind:group={position} name="position" value="天" checked />
        天
      </label>
      <label>
        <input type="radio" bind:group={position} name="position" value="地" />
        地
      </label>
      <label>
        <input type="radio" bind:group={position} name="position" value="荒" />
        荒
      </label>
    </div>
  </fieldset>

  <fieldset>
    <legend>副屬</legend>
    {#each items as item, index}
      <Item position={position} bind:item={item} />
    {/each}
  </fieldset>

  <fieldset class="">
    <legend>計分</legend>
    <input type="text" readonly
      class="output"
      value={output.score}
      style={`--score: ${output.score}; --max: ${output.max}`}
    />
    <sub class="max">/ {output.max}</sub>

    <div class="flex jc-sb">
      <input
        type="submit"
        value="記錄"
        on:click|preventDefault={ save }
        disabled={!output.score}
      />
      <input type="reset" />
    </div>
  </fieldset>
</form>

<History on:apply={ applyUrl } />

<footer class="footer">
  <ul>
    <li>
      Made by Rplus
    </li>
    <li>
      計分標準參考來源：
      <br>
      <a href="https://bbs.nga.cn/read.php?tid=26383169&rand=456" target="_blank" rel="noopener">魂石选择终极攻略 | NGA玩家社区</a>
    </li>
  </ul>
</footer>



<style>
  .title {
    max-width: 10em;
  }

  .output {
    max-width: calc(80vw - 2em);
    background-repeat: no-repeat;
    background-image:
      linear-gradient(to right, #0001, #666a),
      linear-gradient(
        to right,
        #3331 calc(100% * var(--break-point) / var(--max)),
        #aaa1 0
      );
    background-size: calc(100% * var(--score) / var(--max)) 5px, 100% 100%;
    background-position: 0% 100%;
    background-color: #eee;
  }

  .max {
    align-self: center;
    color: #0006;
  }
</style>
