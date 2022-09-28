<script>
	import { H } from 'tusculum';
	import { Stack } from '@realgoatish/svelte-every-layout';

	export let data;
</script>

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
