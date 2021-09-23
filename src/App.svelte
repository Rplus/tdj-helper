<script>
  import Item from './Item.svelte';
  import { sum } from './u.js';

  let position = '天';
  const breakPoints = {
    '天': 164,
    '地': 143,
    '荒': 145,
  };
  let scores = [];
  let outputScore = 0;
  $: {
    outputScore = sum(scores);
  }

  function updateScores(e) {
    scores[e.detail.order] = e.detail.targetProp.score * e.detail.value;
  }
</script>



<h1>天地劫M 絕魂石 預估</h1>

<form style={`--break-point: ${breakPoints[position]}`}>
  <fieldset>
    <legend>絕‧魂石位置</legend>
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
      value={outputScore}
      style={`--p: ${outputScore}`}
    />
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
    --cp: 250;
    background-repeat: no-repeat;
    background-image:
      linear-gradient(to right, #0001, #666a),
      linear-gradient(
        to right,
        #3331 calc(100% * var(--break-point) / var(--cp)),
        #aaa1 0
      );
    background-size: calc(100% * var(--p) / var(--cp)) 5px, 100% 100%;
    background-position: 0% 100%;
    background-color: #eee;
  }

  label {
    cursor: pointer;
    padding: 0.1em .75em;
  }

  fieldset {
    margin-bottom: 1em;
    border-color: #ccc6;
  }

  footer ul {
    float: right;
    opacity: 0.6;
    font-style: italic;
    font-size: smaller;
  }
</style>
