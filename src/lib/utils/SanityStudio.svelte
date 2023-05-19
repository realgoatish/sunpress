<script lang="ts">
	import { onMount } from 'svelte';

	export let config;

	let studioEl: HTMLDivElement;

	onMount(async () => {
		if (studioEl) {
			const { renderStudio, createConfig } = await import('sanity');
			const sanityConfig = createConfig(config);
			renderStudio(studioEl, sanityConfig);
		}
	});
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
	<meta name="robots" content="noindex" />
	<meta name="referrer" content="same-origin" />
</svelte:head>

<div id="svelte-studio">
	<div bind:this={studioEl} />
</div>

<style>
	#svelte-studio {
		height: 100vh;
	}

	#svelte-studio > div {
		height: 100%;
	}
</style>
