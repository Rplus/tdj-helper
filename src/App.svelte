<script>
  import Item from './Item.svelte';
  import { sum } from './u.js';

  let position = '天';
  const breakPoints = {
    '天': 164,
    '地': 143,
    '荒': 145,
  };
  let items = []

  $: output = sumItems(items);

  function updateScores(e) {
    items[e.detail.order] = e.detail;
  }

  function sumItems(items) {
    return items.reduce((all, i) => {
      all.score += i.targetProp.score * i.value;
      all.max += i.targetProp.score * i.max;
      return all;
    }, { score: 0, max: 0, });
  }
</script>



<h1>天地劫M 絕品魂石 評估</h1>

<form style={`--break-point: ${breakPoints[position]}`}>
  <fieldset>
    <legend>絕‧魂石孔位</legend>
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
    <Item position={position} order={0} on:update={updateScores} />
    <Item position={position} order={1} on:update={updateScores} />
    <Item position={position} order={2} on:update={updateScores} />
    <Item position={position} order={3} on:update={updateScores} />
  </fieldset>

  <fieldset class="flex jc-sb">
    <legend>計分</legend>
    <input type="text" readonly
      class="output"
      value={output.score}
      style={`--score: ${output.score}; --max: ${output.max}`}
    />
    <sub class="max">/ {output.max}</sub>
    <input type="reset" />
  </fieldset>
</form>

<footer>
  <ul>
    <li>
      Made by Rplus
    </li>
    <li>
      計分標準參考來源：
      <br>
      <a href="https://bbs.nga.cn/read.php?tid=26383169&rand=456" target="_blank">魂石选择终极攻略 | NGA玩家社区</a>
    </li>
  </ul>
</footer>



<style>
  .output {
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
