<script>
	import { onMount, onDestroy } from 'svelte';
	import states from '$lib/data/state.min.json';
	import { link } from '$lib/u.js';

	let dom;
	let pos_top = 0;
	let pos_left = 0;

	let activeState = null;
	let p_pos = { left: 0, top: 0 };
	let isSelecting = false;

	function find_state(rawStr) {
		if (!rawStr) return null;

		// 1. 先把雜亂的字串清理乾淨（移除換行、拔掉所有引號）
		// 這樣不管是 「宿幽、宿幽」、還是 宿幽」狀態，在記憶體裡都變成最純粹的「宿幽狀態」
		const cleanLine = rawStr.replace(/[\r\n\t]+/g, ' ').replace(/[「」]/g, '').trim();

		// 2. 直接拿這串純文字，去跟資料庫裡所有的狀態進行比對
		// 找出所有「被包含在選取範圍內」的有效狀態
		const matchedStates = states.filter(s => cleanLine.includes(s.name));
		if (matchedStates.length === 0) return null;

		// 3. 既然使用者只要「最後面」的，那我們就看誰在字串裡最後一次出現的位置（lastIndexOf）最大！
		return matchedStates.reduce((best, current) => {
			const currentIdx = cleanLine.lastIndexOf(current.name);
			const bestIdx = cleanLine.lastIndexOf(best.name);

			// 位置越靠右邊（最後面），權重越高
			if (currentIdx > bestIdx) return current;

			// 如果位置一樣（例如長短字重疊），選字數長的
			if (currentIdx === bestIdx && current.name.length > best.name.length) return current;

			return best;
		});
	}


	function updateParentOffset() {
		if (!dom?.parentElement) return;
		const rect = dom.parentElement.getBoundingClientRect();
		p_pos = {
			left: rect.left + window.scrollX,
			top: rect.top + window.scrollY,
		};
	}

	// 核心修正：加入邊界防護的精簡定位版本
	function updatePosition() {
		const selectObj = document.getSelection();

		if (!selectObj || selectObj.isCollapsed || selectObj.type !== 'Range' || selectObj.rangeCount === 0) {
			activeState = null;
			return;
		}

		// 1. 取得使用者選取的原始文字與狀態
		const rawSelectionStr = selectObj.toString();
		const state = find_state(rawSelectionStr);
		if (!state) {
			activeState = null;
			return;
		}

		activeState = state;
		updateParentOffset();

		try {
			const keyword = activeState.name;

			// 2. 鎖定終點文字節點
			let targetNode = selectObj.focusNode;
			if (targetNode.nodeType !== Node.TEXT_NODE) {
				targetNode = selectObj.getRangeAt(0).commonAncestorContainer;
			}

			const nodeText = targetNode.textContent || '';

			// 3. 核心邊界防護：限制搜尋範圍只在使用者選取的區域內
			// 取得當前節點內選取的字元位置（考慮正選與反選）
			const range = selectObj.getRangeAt(0);
			const startOffset = range.startOffset;
			const endOffset = range.endOffset;

			// lastIndexOf 第二個參數傳入 endOffset，代表「只搜尋到選取終點為止」，後面的字直接無視
			const targetOffsetInNode = nodeText.lastIndexOf(keyword, endOffset);

			// 確保找到的位置沒有超出選取的起點界線，防止抓到前面的重複字
			if (targetOffsetInNode !== -1 && targetOffsetInNode >= startOffset) {
				// 建立臨時的 Range，只包覆住該關鍵字，強行逼出物理座標
				const matchRange = document.createRange();
				matchRange.setStart(targetNode, targetOffsetInNode);
				matchRange.setEnd(targetNode, targetOffsetInNode + keyword.length);

				const rects = matchRange.getClientRects();
				if (rects.length > 0) {
					const targetRect = rects[rects.length - 1]; // 依然拿最後一行支援跨行
					pos_left = targetRect.x - p_pos.left + window.scrollX;
					pos_top = targetRect.y - p_pos.top + window.scrollY + targetRect.height;
					return;
				}
			}

			// Fallback: 如果以上的精準定位因跨節點而失敗，退回原選取範圍最後一行的起點
			const originalRects = range.getClientRects();
			const firstRect = originalRects[originalRects.length - 1];
			if (firstRect) {
				pos_left = firstRect.x - p_pos.left + window.scrollX;
				pos_top = firstRect.y - p_pos.top + window.scrollY + firstRect.height;
			}

		} catch (e) {
			console.error('定位錯誤:', e);
		}
	}


	function handleSelectionChange() {
		updatePosition();
	}

	function handlePointerDown() {
		isSelecting = true;
	}

	function handlePointerUp() {
		isSelecting = false;
		updatePosition();
	}

	function handlePointerMove() {
		if (!isSelecting) return;
		requestAnimationFrame(updatePosition);
	}

	onMount(() => {
		updateParentOffset();
		window.addEventListener('resize', updateParentOffset);
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('resize', updateParentOffset);
		}
	});
</script>

<svelte:document
	on:selectionchange={handleSelectionChange}
	on:pointerdown={handlePointerDown}
	on:pointerup={handlePointerUp}
	on:pointermove={handlePointerMove}
/>

{#if activeState}
	<div class="hint_anchor" style="left:{pos_left}px; top:{pos_top}px;"></div>
{/if}

<div class="hint" hidden={!activeState} bind:this={dom}>
{#if activeState}
	<div class="flex jc-sb" style="gap:1em;">
		<a class="name" href={link(`/state/#${activeState.name}`)}>
			{activeState.name}
		</a>
		<sup class="meta">
			<span class="boolean" class:active={activeState.stealable}>偷取</span>
			<span class="boolean" class:active={activeState.extendable}>擴散</span>
			<span class="boolean" class:active={activeState.dispellable}>驅散</span>
		</sup>
	</div>
	<div class="desc">
		{activeState.desc}
	</div>
{/if}
</div>


<style>
.hint_anchor {
	position: absolute;
	anchor-name: --hint-anchor;
}

.hint {
	position: absolute;
  position-anchor: --hint-anchor;
  position-area: right bottom;
  position-try-fallbacks: left bottom, right top, left top;
	position-try-order: most-width;
	max-width: 15rem;
	z-index: 100;
	padding: .5em;
	background-color: #fffd;
	border: 1px solid #000;
	user-select: none;
	pointer-events: none;

	&[hidden] {
		visibility: hidden;
	}

}

:global(.dark-theme) .hint {
	background-color: #333d;
	border-color: #fff3;
}

.name {
	border-bottom: 1px dashed #0003;
	margin-bottom: 0.25em;
	pointer-events: initial;
}

.desc {
	padding-left: 0.5em;
}

.meta {
	font-size: x-small;

	& span {
		border: 1px solid #9999;
		padding: 2px;
	}
}
/*
.hint:not(:hover) .meta {
	visibility: hidden;
}
*/
.boolean:not(.active) {
	opacity: 0.5;
	text-decoration: line-through;
}
</style>
