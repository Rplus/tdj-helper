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
		const cleanStr = rawStr.replace(/[\r\n\t]+/g, ' ').trim().replace(/^「|」$/g, '');
		if (!cleanStr) return null;
		let target = states.find(s => s.name === cleanStr);
		if (target) return target;
		const sortedStates = [...states].sort((a, b) => b.name.length - a.name.length);
		return sortedStates.find(s => cleanStr.includes(s.name)) || null;
	}

	function updateParentOffset() {
		if (!dom?.parentElement) return;
		const rect = dom.parentElement.getBoundingClientRect();
		p_pos = {
			left: rect.left + window.scrollX,
			top: rect.top + window.scrollY,
		};
	}

	// 核心修正：精準計算選取終點的座標
	function updatePosition() {
		const selectObj = document.getSelection();

		if (!selectObj || selectObj.isCollapsed || selectObj.type !== 'Range' || selectObj.rangeCount === 0) {
			activeState = null;
			return;
		}

		// 1. 取得使用者選取的原始文字
		const rawSelectionStr = selectObj.toString();
		const state = find_state(rawSelectionStr);
		if (!state) {
			activeState = null;
			return;
		}

		activeState = state;
		updateParentOffset();

		// 2. 備份使用者當前的原始選取範圍，避免干擾使用者操作
		const originalRange = selectObj.getRangeAt(0).cloneRange();

		try {
			// 3. 建立一個臨時 Range，用來尋找關鍵字在 DOM 中的精確文字節點位置
			const searchRange = originalRange.cloneRange();
			const container = originalRange.commonAncestorContainer;

			// 如果選取範圍剛好是文字節點，直接用它；否則用父節點
			const textContent = container.nodeType === Node.TEXT_NODE ? container.textContent : container.textContent;
			const keyword = activeState.name;

			// 在選取的文字中，找出關鍵字出現在第幾個字元
			const localIndex = rawSelectionStr.indexOf(keyword);

			if (localIndex !== -1) {
				// 我們利用原生的 Range 尋找與定位
				// 尋找選取區塊內真正的文字節點，並把 Range 縮小到只包覆「關鍵字」
				let startNode = originalRange.startContainer;
				let startOffset = originalRange.startOffset;

				// 透過一個臨時的 Range 重新定位到關鍵字真正的起點
				// 這是最穩健的做法：直接計算關鍵字的第一個字元的物理位置
				const walker = document.createTreeWalker(
					container.nodeType === Node.TEXT_NODE ? container.parentNode : container,
					NodeFilter.SHOW_TEXT
				);

				let currentOffset = 0;
				let foundStart = false;
				let targetNode = null;
				let targetOffsetInNode = 0;

				// 找出關鍵字在 DOM 中的絕對字元偏移量
				while (walker.nextNode()) {
					const node = walker.currentNode;
					// 確保這個節點在選取範圍內
					if (selectObj.containsNode(node, true)) {
						const nodeText = node.textContent;
						// 比對字串片段
						const matchIdx = nodeText.indexOf(keyword);
						if (matchIdx !== -1) {
							targetNode = node;
							targetOffsetInNode = matchIdx;
							foundStart = true;
							break;
						}
					}
				}

				if (foundStart && targetNode) {
					const matchRange = document.createRange();
					matchRange.setStart(targetNode, targetOffsetInNode);
					matchRange.setEnd(targetNode, targetOffsetInNode + keyword.length);

					const rects = matchRange.getClientRects();
					if (rects.length > 0) {
						const targetRect = rects[0]; // 精準拿到關鍵字第一個字的左下角
						pos_left = targetRect.x - p_pos.left + window.scrollX;
						pos_top = targetRect.y - p_pos.top + window.scrollY + targetRect.height;
						return;
					}
				}
			}

			// Fallback: 如果上述 DOM 搜尋失敗，則退回到「使用者選取起點」的第一行起點
			const firstRect = originalRange.getClientRects()[0];
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
	transition: left 0.02s linear, top 0.02s linear;
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
		display: none;
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

.boolean:not(.active) {
	opacity: 0.5;
	text-decoration: line-through;
}
</style>
