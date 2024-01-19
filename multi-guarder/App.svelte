<script>
	let width;
	let gridSize = 6;

	let attacker = {
		index: 20,
		order: 20,
		title: '攻',
		position: [1, 0],
	};

	let attackee = {
		index: 10,
		order: 10,
		title: '受',
		x: 2,
		y: 2,
	};

	let guarders = [
		{
			index: 1,
			order: 1,
			title: '坦1',
			x: 2,
			y: 0,
			range: 2,
			color: '#ff9999',
		},
		{
			index: 2,
			order: 2,
			title: '坦2',
			x: 4,
			y: 2,
			range: 3,
			color: '#99ff99',
		},
		{
			index: 3,
			order: 3,
			title: '坦3',
			x: 2,
			y: 4,
			range: 2,
			color: '#9999ff',
		},
		{
			index: 4,
			order: 4,
			title: '坦4',
			x: 0,
			y: 2,
			range: 2,
			color: '#99ff33',
		},
	];

	$: {
		guarders;
		attackee;
		gridSize;
		guarders.forEach(guarder => {
			guarder.distance2T = Math.abs(guarder.y - attackee.y) + Math.abs(guarder.x - attackee.x);
		});
		updateGuarders();
	}

	let attackers = [];
	let empty = { title: '' };
	function updateGuarders(attacker) {
		let _attackers = [];
		let _nearest_guarders = findNearestGuardersToAttackee();

		for (let i = gridSize - 1; i >= 0; i--) {
			for (let j = gridSize - 1; j >= 0; j--) {
				let guarder = findGuarder(i, j, _nearest_guarders);
				_attackers[i + j * gridSize] = {
					title: `${guarder.title}`,
					x: i,
					y: j,
					color: guarder.color,
					// role: 'attacker',
				};
			}
		}
		attackers = _attackers;
	}

	function findNearestGuardersToAttackee() {
		let guarderGroupByDistanceToTarget = [];
		let minest = gridSize * 2;

		guarders.forEach(g => {
			if (g.range < g.distance2T) { return null; }

			if (minest >= g.distance2T) {
				minest = g.distance2T;
				if (!guarderGroupByDistanceToTarget[g.distance2T]) {
					guarderGroupByDistanceToTarget[g.distance2T] = [];
				}
				guarderGroupByDistanceToTarget[g.distance2T].push(g);
			}
		});
		return guarderGroupByDistanceToTarget[minest].sort(sortByIndex);
	}

	function sortByIndex(a, b) {
		return a.index - b.index;
	}

	function findGuarder(atk_x, atk_y, passed1_guarders) {
		if (!passed1_guarders || passed1_guarders.length === 0) {
			return empty;
		}

		let firstGuarder = passed1_guarders[0];
		if (passed1_guarders.length === 1) {
			return firstGuarder;
		}

		let firstGuarderDistance2A;

		// we just find those guarders have smaller distance to attacker than the first guarder.
		// if there is no guarder, we could know: first guarder has the smallest distance to attacker.
		// if there are guarders have smaller distance, we will choise the latest one guarder.
		let _guarders = passed1_guarders
			.filter((g, index) => {
				g.distance2A = Math.abs(g.y - atk_y) + Math.abs(g.x - atk_x);
				if (!index) {
					firstGuarderDistance2A = g.distance2A;
				}
				return firstGuarderDistance2A > g.distance2A;
			});

		if (!_guarders.length) {
			return firstGuarder;
		}

		return _guarders[_guarders.length - 1];
	}
</script>



<div class="workspace">
<h1>
	<a href="../">../</a>
	<ruby>
		多重護衛優先級判定模擬
		<rt style="opacity: 0.3;">天地劫M</rt>
	</ruby>
</h1>
<div class="map-box">

	<div class="map"
		style="font-size: {width / gridSize}px; height: {width}px;"
	  bind:clientWidth={width}
	>
		<div
			class="dot attackee"
			data-title={attackee.title}
			style="--x: {attackee.x}; --y: {attackee.y};"
		/>

		{#each attackers as a}
			<div
				class="dot--attacker"
				data-title={a.title}
				tabindex="0"
				style="--x: {a.x}; --y: {a.y}; --bgc: {a.color}"
			/>
		{/each}

		{#each guarders as d}
			<div
				class="dot"
				data-range={d.range}
				data-title={d.title}
				style="--x: {d.x}; --y: {d.y}; --bgc: {d.color}"
			/>
		{/each}
	</div>

	<div class="intro">
圖中方格為攻擊者可站的位置<br>
底色對應護衛單位
<br>
<br>
<details open>
	<summary>== 護衛優先級 說明 ==	</summary>
<pre>
<u>規則一：判定各護衛與「被攻擊者」距離</u>
離「被攻擊者」最近者，最優先護衛

<u>規則二：判定各護衛與「攻擊者」距離</u>
若有複數最近的護衛群，改判定各護衛與「攻擊者」距離
※ 坦X：上場順序最先者

<u>狀況-1</u>：坦X 距離攻擊者最近
  則依正序護衛
  (=> 坦X護衛)

<u>狀況-2</u>：坦X 距離攻擊者不是最近
  比坦X更近的那堆中，依倒序護衛
  (愈後上場者、護衛優先級愈高)
</pre>
</details>



	</div>
	<hr>
</div>

<form>
	<fieldset>
		<legend>自訂區塊</legend>

		<dl>
			{#each guarders as guarder}
				<dt>{guarder.title} - <small>護衛</small></dt>
				<dd>
					<label>
						x:
						<input type="number"
							bind:value={guarder.x}
							max={gridSize - 1}
							min="0"
						/>
					</label>
				</dd>
				<dd>
					<label>
						y:
						<input type="number"
							bind:value={guarder.y}
							max={gridSize - 1}
							min="0"
						/>
					</label>
				</dd>
				<dd>
					<label>
						護衛範圍:
						<input type="number"
							bind:value={guarder.range}
							max="3"
							min="0"
						/>
					</label>
				</dd>
				<dd>
					<label>
						顏色:
						<input type="color"
							bind:value={guarder.color}
						/>
					</label>
				</dd>
			{/each}

			<dt>{attackee.title} - <small>被攻擊目標</small></dt>
			<dd>
				<label>
					x:
					<input type="number"
						bind:value={attackee.x}
						max={gridSize - 1}
						min="0"
					/>
				</label>
			</dd>
			<dd>
				<label>
					y:
					<input type="number"
						bind:value={attackee.y}
						max={gridSize - 1}
						min="0"
					/>
				</label>
			</dd>

			<dt>
				格子數:
			</dt>
			<dd>
				<input type="number" bind:value={gridSize} min="4">
			</dd>
		</dl>
	</fieldset>
</form>

	<footer class="info">
		<hr>
		資料參考：
		<a href="https://www.bilibili.com/video/BV1VB4y1y7fh/" target="_blank" rel="noreferrer noopener">
		「天地劫」多T护卫机制 详解 @ bilibili by u/墨_源
		</a>
	</footer>
</div>




<style>
.workspace {
	display: flex;
	flex-wrap: wrap;
	gap: 1em;
	padding: 1em;
	justify-content: center;
	min-height: 100vh;
  align-content: stretch;
}

.map-box {
  width: clamp(320px, 50%, 600px);
}

.map {
  position: relative;
  width: 100%;
  box-shadow: inset 0 0 0 1px;
  background: #eee;
  background-image:
    linear-gradient(to right, #0006, #0000 1px),
    linear-gradient(to bottom, #0006, #0000 1px);
  background-size: 1em 1em;

  --sd-0: inset 0 0 0 1em;
  --sd-1:
    -1em 0, 1em 0,
    0 -1em, 0 1em,
    var(--sd-0);

  --sd-2:
    0 -2em, 0 2em,
    -1em -1em, -1em 1em,
    1em -1em, 1em 1em,
    -2em 0, 2em 0,
    var(--sd-1);

  --sd-3:
    0 -3em, 0 3em,
    3em 0, -3em 0,
    1em -2em, -1em -2em,
    2em -1em, -2em -1em,
    2em 1em, -2em 1em,
    1em 2em, -1em 2em,
    var(--sd-2);
}

.dot {
	position: absolute;
	width: 1em;
	height: 1em;
	z-index: 1;
	left: calc(var(--x) * 1em);
	top: calc(var(--y) * 1em);
	color: #0001;
}

.dot::after {
  content: attr(data-title);
  position: absolute;
  inset: 0;
  display: flex;
  font-size: .35em;
  color: #000;
  border-radius: 50%;
  align-items: center;
  background-color: var(--bgc);
  border: .1em solid #000;
  justify-content: center;
}

.dot.attackee::after {
  background-color: #fff;
}

.dot:hover::after {
	border: .3em solid #a00;
}

.dot[data-range="1"]:hover { box-shadow: var(--sd-1);}
.dot[data-range="2"]:hover { box-shadow: var(--sd-2);}
.dot[data-range="3"]:hover { box-shadow: var(--sd-3);}



.dot--attacker {
	position: absolute;
	width: 1em;
	height: 1em;
	left: calc(var(--x) * 1em);
	top: calc(var(--y) * 1em);
	background-color: var(--bgc, #0001);
	display: flex;
	z-index: 0;
	opacity: 0.5;
	justify-content: flex-end;
	align-items: flex-start;
  border: 2px solid var(--bdc, #0000);
  outline: none;
}
.dot--attacker::after {
  content: attr(data-title);
  font-size: 1rem;
  color: var(--font-color, #0003);
}
.dot--attacker::before {
	content: '攻';
	position: absolute;
	inset: 0;
	display: flex;
	justify-content: center;
	align-items: center;
  font-size: .35em;
  opacity: var(--watermark, 0);
}

.dot--attacker:focus,
.dot--attacker:hover {
	--bdc: #000;
	--font-color: #0009;
}
.dot--attacker:focus {
	--watermark: 1;
}

form {
  line-height: 1.35;
  width: 320px;
  word-break: break-all;
}

hr {
	margin: 1em .5em;
	border: 1px dotted #0003;
}

fieldset {
	margin-top: -0.5em;
	padding: .5em;
}

legend {
	height: 1em;
}

dt {
	margin-top: 1em;
	background-color: #0001;
}

dd {
	padding-left: 1em;
}

h1 {
  text-align: center;
  margin: .5em auto;
  min-width: 80vw;
  border-bottom: 1px dotted #0003;
  margin-bottom: 1em;
  padding-bottom: 0.5em;
}

.info {
	margin-top: auto;
	min-width: 80vw;
	text-align: center;
}

:global(body) {
	display: block;
  background-color: #eee;
}
:global(*) {
	box-sizing: border-box;
	margin: 0;
}
</style>
