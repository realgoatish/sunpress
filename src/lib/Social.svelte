<script>
	import { Cluster, Icon } from '@realgoatish/svelte-every-layout';

	export let data;
</script>

<div>
	<h2 class="screen-reader-only" id="social-icons-label">Call or find us on other platforms</h2>
	<Cluster
		wrapperElement="ul"
		justify="space-evenly"
		space="var(--s-2)"
		aria={{ labelledby: 'social-icons-label' }}
	>
		{#each data.items as item}
			{#if item.text === 'phone'}
				<!-- <li>
          <a href={item.link.externalUrl}
            ><Icon iconId="#icon-phone" aria-label={item.description} /></a
          >
        </li> -->
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
