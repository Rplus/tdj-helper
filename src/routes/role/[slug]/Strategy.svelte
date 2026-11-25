<script>
	import Lineup from '../../strategy/Lineup.svelte';
	import { find_strategy_with_role } from '../../strategy/strategy.js';

	export let rolename = '';

	let strategy = find_strategy_with_role(rolename);
</script>

<Lineup {strategy} search_kwd='' />