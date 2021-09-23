<script>
  import Item from './Item.svelte';
  import { sum } from './u.js';

  let position = '天';
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

<form>
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
    <input type="text" readonly value={'= ' + outputScore} />
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
