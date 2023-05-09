<script lang="ts">
	import { Center, Stack } from '@realgoatish/svelte-every-layout';
	import { PortableText } from '@portabletext/svelte';
	import Figure from '$lib/Figure.svelte';
	import { Somerset } from 'somerset';
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	export let data: PageData;

	$: console.log(`data on front end before destructuring: ${JSON.stringify(data, null, 2)}`);

	// $: ({ initialData, previewMode, slug } = data);
	// $: ({ data: homePageData } = previewSubscription(postQuery, {
	// 	params: { slug },
	// 	initialData,
	// 	enabled: previewMode && !!slug
	// }));

	$: ({ localBusiness, webPageSeo } = data); ///////////// ORIGINAL DESTRUCTURING BEFORE ALL PREVIEW HACKING
	// $: ({ response } = initialData);
	// $: ({ localBusiness } = data);
	// $: ({ webPageSeo } = response);

	$: ({ openGraph } = webPageSeo); ////////////// ORIGINAL DESTRUCTURING BEFORE ALL PREVIEW HACKING
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
