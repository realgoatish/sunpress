<script>
	import { page } from '$app/stores';
	import { Cluster } from '@realgoatish/svelte-every-layout';
	export let data;
</script>

<nav aria-labelledby="site-nav-label">
	<h2 id="site-nav-label" class="screen-reader-only">Site</h2>
	<Cluster wrapperElement="ul" justify="center" space="var(--s-1)">
		{#each data.items as item}
			{#if item.link?.internal?.url}
				<li>
					<a
						href={item.link.internal.url}
						class="nav-link"
						class:selected={$page.url.pathname === item.link.internal.url}
						aria-current={$page.url.pathname === item.link.internal.url}>{item.text}</a
					>
				</li>
			{:else}
				<li>
					<a
						href={item.link.externalUrl}
						class="nav-link"
						class:selected={$page.url.pathname === item.link.externalUrl}
						aria-current={$page.url.pathname === item.link.externalUrl}>{item.text}</a
					>
				</li>
			{/if}
		{/each}
	</Cluster>
</nav>
