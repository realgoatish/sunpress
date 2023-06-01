<script>
	import { Frame } from 'svelte-every-layout';

	export let portableText;

	$: ({ value } = portableText);

	// $: console.log(`portableText value in Figure.svelte: ${JSON.stringify(value, null, 2)}`);
</script>

<div>
	<Frame>
		<img
			alt={value.alt}
			srcset={`${value.image.desktop} 2400w, ${value.image.tablet} 1600w, ${value.image.mobile} 800w`}
			sizes="50vw"
			src={value.image.fullSize}
		/>
	</Frame>
</div>

<style>
	div {
		filter: drop-shadow(1px 2px 2px hsl(var(--color-primary--white--shadow) / 0.333))
			drop-shadow(2px 4px 4px hsl(var(--color-primary--white--shadow) / 0.333))
			drop-shadow(3px 6px 6px hsl(var(--color-primary--white--shadow) / 0.333));
	}
</style>
