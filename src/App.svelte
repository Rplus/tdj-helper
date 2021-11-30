<script>
  import Item from './Item.svelte';
  import History from './History.svelte';
  import Settings from './Settings.svelte';
  import {
    clamp,
    sum,
    getProp,
    genProps,
    cloneObj,
    BreakPoints,
    RockTypes,
    DefailtItem,
  } from './u.js';
  import { historeUrls, oriProps } from './stores.js';

  let position = '天';
  let items = new Array(4);

  let title = '';

  $: customProps = genProps($oriProps);
  $: output = sumItems(items, $oriProps);

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
      let _p = getProp(i.prop, customProps);
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

  function isValidProp(item) {
    return item.prop !== '--';
  }

  function genRangedItems(items, valueType = 'max') {
    let _items = cloneObj(items);
    return _items.map(item => {
      if (!isValidProp(item)) { return item; }

      let valueRange = getProp(item.prop, customProps).range[position];
      switch (valueType) {
        case 'max':
          item.value = valueRange[0];
          break;
        case 'min':
          item.value = valueRange[1];
          break;
        case 'mid':
          item.value = Math.round((valueRange[0] + valueRange[1]) / 2);
          break;
        default:
          break;
      }
      return item;
    });
  }

  function saveRangedItems(items, rangeType = 'max', suffix = '') {
    let _items = genRangedItems(items, rangeType);
    let _score = sumItems(_items).score;

    historeUrls.add(JSON.stringify({
      title: title + suffix,
      position,
      items: _items,
      score: _score,
    }));
  }

  function saveMMM() {
    if (!items.some(isValidProp)) { return;  }

    saveRangedItems(items, 'max', '[上]');
    saveRangedItems(items, 'mid', '[中]');
    saveRangedItems(items, 'min', '[下]');

    setTimeout(asideScrollToBottom, 0);
  }

  function asideScrollToBottom() {
    // dirty dom
    let ul = document.querySelector('.aside .ul');
    if (!ul) { return; }
    ul.scrollTop = ul.scrollHeight;
  }

  function applyUrl(apply) {
    let data = JSON.parse(apply.detail.url);
    position = data.position;
    title = data.title;
    items = data.items;
  }

  function refitValueRange() {
    items.forEach(i => {
      let _p = getProp(i.prop, customProps);
      let [max, min] = _p.range[position];
      i.value = clamp(i.value, min, max);
    })
  }

  function reset() {
    title = '';
    items = cloneObj(new Array(4).fill(DefailtItem));
  }

  function submit() {
  }
</script>



<h1>
  <ruby>
    絕品魂石 評估
    <rt style="color: #0003">天地劫M</rt>
  </ruby>
  <a href="./weapon" title="go to next">⏵</a>
</h1>

<form class="main"
  on:submit|preventDefault={submit}
  style={`--break-point: ${BreakPoints[position]}`}
>
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

    <div class="flex jc-sb form-btns">
      <input
        class="save"
        type="submit"
        value="記錄"
        on:click|preventDefault={ save }
        disabled={!output.score}
      />
      <input
        type="submit"
        value="生成上下限"
        on:click|preventDefault={ saveMMM }
      />
      <input type="reset" on:click|preventDefault={reset} />
    </div>
  </fieldset>
</form>

<History on:apply={ applyUrl } />

<footer class="footer flex jc-sb">
  <Settings />
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

  .form-btns * + * {
    margin-inline-start: 0.5rem;
  }

  .save {
    margin-inline-end: auto;
  }
</style>
