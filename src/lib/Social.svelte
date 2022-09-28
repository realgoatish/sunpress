<script>
	import { Cluster, Icon } from '@realgoatish/svelte-every-layout';

	export let data;

	// generate unique ID for each instance of this component
	let id = `social-icons-label-${Math.floor(new Date() * Math.random())}`;
</script>

<div>
	<h2 class="screen-reader-only" {id}>{data.description}</h2>
	<Cluster wrapperElement="ul" justify="space-evenly" space="var(--s-2)" aria={{ labelledby: id }}>
		{#each data.items as item}
			{#if item.text === 'phone'}
				<li>
					<a href={`tel:+1-${item.link.externalUrl}`}
						><Icon iconId="#icon-phone" aria-label={item.description} /></a
					>
				</li>
			{:else if item.text === 'map'}
				<li>
					<a href={item.link.externalUrl}
						><Icon iconId="#icon-map" ariaLabel={item.description} /></a
					>
				</li>
			{:else if item.text === 'facebook'}
				<li>
					<a href={item.link.externalUrl}
						><Icon iconId="#icon-facebook" ariaLabel={item.description} /></a
					>
				</li>
			{:else if item.text === 'instagram'}
				<li>
					<a href={item.link.externalUrl}
						><Icon iconId="#icon-instagram" ariaLabel={item.description} /></a
					>
				</li>
			{/if}
		{/each}
	</Cluster>
</div>
