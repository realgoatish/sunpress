<script>
	import { Cluster, Icon } from '@realgoatish/svelte-every-layout';

	export let data;
</script>

<Cluster wrapperElement="ul" justify="space-evenly" space="var(--s-2)">
	{#each data.items as item}
		{#if item.text === 'phone'}
			<!-- <li>
				<a href={item.link.externalUrl}
					><Icon iconId="#icon-phone" aria-label={item.description} /></a
				>
			</li> -->
		{:else if item.text === 'map'}
			<li>
				<a href={item.link.externalUrl}><Icon iconId="#icon-map" aria-label={item.description} /></a
				>
			</li>
		{:else if item.text === 'facebook'}
			<li>
				<a href={item.link.externalUrl}
					><Icon iconId="#icon-facebook" aria-label={item.description} /></a
				>
			</li>
		{:else if item.text === 'instagram'}
			<li>
				<a href={item.link.externalUrl}
					><Icon iconId="#icon-instagram" aria-label={item.description} /></a
				>
			</li>
		{/if}
	{/each}
</Cluster>
