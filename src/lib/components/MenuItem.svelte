<script>
	import { H } from 'tusculum';
	import { Stack, Frame } from '@realgoatish/svelte-every-layout';

	export let data;

	// $: console.log(`data received for menuItem: ${JSON.stringify(data, null, 2)}`);
</script>

<div class="menu-item-wrapper">
	<Stack space="var(--s-1)">
		{#if data?.figure}
			<div class="menu-item-image">
				<Frame>
					<img
						loading="lazy"
						alt={data.figure.alt}
						srcset={`${data.figure.image.desktop} 2400w, ${data.figure.image.tablet} 1600w, ${data.figure.image.mobile} 800w`}
						sizes="50vw"
						src={data.figure.image.fullSize}
					/>
				</Frame>
			</div>
		{/if}
		<H level="+1">{data.title}</H>
		<p>{data.price}</p>
		{#if data.mods}
			{data.mods.map((mod) => [mod.name, mod.price].join(' +')).join(', ')}
		{/if}
		{#if data.description}
			<p>{data.description}</p>
		{/if}
	</Stack>
</div>

<style>
	/* TODO this is an exception style that should be executed with data attributes instead */
	/* see also https://cube.fyi/exception.html */
	div :global(.stack) {
		display: block;
	}

	div .menu-item-image {
		float: right;
		inline-size: clamp(100px, 30%, 200px);
		margin-inline-start: var(--s-3);
	}

	div img {
		border-radius: 5px;
		opacity: 0;
		animation-name: fadeImages;
		animation-duration: 1.2s;
		animation-fill-mode: forwards;
	}

	@keyframes fadeImages {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>
