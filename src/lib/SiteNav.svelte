<script>
	import { page } from '$app/stores';
	import { Cluster } from '@realgoatish/svelte-every-layout';
	export let data;
</script>

<nav aria-labelledby="site-nav-label">
	<h2 id="site-nav-label" class="screen-reader-only">Site</h2>
	<Cluster wrapperElement="ul" justify="center" space="var(--s-1)">
		{#each data.items as item}
			<li>
				<a
					href={item.link.internal.url}
					class="nav-link"
					class:selected={$page.url.pathname === item.link.internal.url}
					aria-current={$page.url.pathname === item.link.internal.url}>{item.text}</a
				>
			</li>
		{/each}
	</Cluster>
</nav>
