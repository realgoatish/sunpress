<script>
	import { Center, Stack } from '@realgoatish/svelte-every-layout';
	import { PortableText } from '@portabletext/svelte';
	import Figure from '$lib/Figure.svelte';
	import { Somerset } from 'somerset';
	import { page } from '$app/stores';

	/** @type {import('./$types').PageData} */
	export let data;

	$: console.log(`homePage data on the front end: ${JSON.stringify(data, null, 2)}`);

	$: ({ localBusiness, webPageSeo } = data);

	$: ({ openGraph } = webPageSeo);
</script>

<Somerset
	title={webPageSeo.title}
	description={webPageSeo.description}
	canonical={$page.url}
	openGraph={{
		type: 'website',
		url: $page.url,
		title: openGraph.title,
		description: openGraph.description,
		locale: 'en-US',
		siteName: localBusiness.name,
		images: [
			{
				url: openGraph.ogImage.image.facebook,
				width: 1200,
				height: 630,
				alt: openGraph.ogImage.alt
			}
		]
	}}
/>

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
