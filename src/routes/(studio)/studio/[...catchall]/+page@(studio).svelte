<script lang="ts">
	import { onMount } from 'svelte';

	let config, SanityStudio;

	onMount(async () => {
		config = (await import('$lib/config/sanity/sanity.config')).default;
		SanityStudio = (await import('$lib/utils/SanityStudio.svelte')).default;
	});
</script>

<svelte:component this={SanityStudio} {config} />
