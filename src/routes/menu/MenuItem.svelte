<script>
	import { H } from 'tusculum';
	import { Stack } from '@realgoatish/svelte-every-layout';

	export let data;
</script>

<div>
	<Stack space="var(--s-1)">
		<H level="+1">{data.title}</H>
		<p>{data.price}</p>
		{#if data.mods}
			{data.mods.map((mod) => [mod.name, mod.price].join(' +')).join(', ')}
		{/if}
		{#if data.description}
			<p>{data.description}</p>
		{/if}
	</Stack>
</div>

<style>
	div {
		border-block-start: 2px solid var(--color-primary--dark);
		/* TODO had to sync this up with the rest of the Stack b/c no time, but it's an ugly hack */
		/* needed a *different* value to get visual symmetry. fix this */
		padding-block-start: var(--s0);
	}

	div :global(h3) {
		color: var(--color-secondary--dark);
	}
</style>
