<script>
	import { Center, Stack } from '@realgoatish/svelte-every-layout';
	import { PortableText } from '@portabletext/svelte';
	import Figure from '$lib/Figure.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	// $: console.log(`homePage data on the front end: ${JSON.stringify(data, null, 2)}`);
</script>

<main id="main">
	<div>
		<Center max="var(--measure)" gutters="var(--s-1)">
			<Stack>
				<h1>Welcome to SunPress</h1>
				<PortableText
					value={data.body}
					components={{
						types: {
							figure: Figure
						}
					}}
				/>
			</Stack>
		</Center>
	</div>
</main>
