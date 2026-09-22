<script>
export let string = '';
export let first_len = 2;
export let max_len = 3;

// 字串切成 [2,3,3,3,3,3,3]
$: splited_string = string.match(new RegExp(`^·?.{1,${first_len}}|·?.{1,${max_len}}`, 'g'));

</script>

<span style="word-break: keep-all;">
	{#each splited_string as n}
		{n}<wbr>
	{/each}
</span>
