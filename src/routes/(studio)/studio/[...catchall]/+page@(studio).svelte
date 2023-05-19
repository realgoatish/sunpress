<script lang="ts">
	import { onMount } from 'svelte';
	import config from '$lib/config/sanity/sanity.config';
	// import SanityStudio from '$lib/utils/SanityStudio.svelte';

	let SanityStudio;

	onMount(async () => {
		SanityStudio = (await import('$lib/utils/SanityStudio.svelte')).default;
	});
</script>

<!-- <SanityStudio {config} /> -->

<svelte:component this={SanityStudio} {config} />
