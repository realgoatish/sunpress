<script lang="ts">
	// import config from '$lib/config/sanity/sanity.config';
	import { onMount } from 'svelte';
	// import SanityStudio from '$lib/utils/SanityStudio.svelte';

	let config, SanityStudio;

	onMount(async () => {
		config = (await import('$lib/config/sanity/sanity.config')).default;
		SanityStudio = (await import('$lib/utils/SanityStudio.svelte')).default;
	});
</script>

<!-- <SanityStudio {config} /> -->

<svelte:component this={SanityStudio} {config} />
