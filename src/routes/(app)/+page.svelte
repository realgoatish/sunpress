<script lang="ts">
	import { Center, Stack } from 'svelte-every-layout';
	import { PortableText } from '@portabletext/svelte';
	import Figure from '$lib/components/Figure.svelte';
	import { Somerset } from 'somerset';
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import { previewSubscription } from '$lib/config/sanity';
	import { homePagePreviewQuery } from '$lib/config/sanity/queries';

	export let data: PageData;

	$: ({ initialData, previewMode, slug, localBusiness } = data);

	$: test = previewSubscription(homePagePreviewQuery, {
		params: { slug },
		initialData,
		enabled: previewMode && !!slug
	});

	$: pageData = test?.data || data;

	$: ({ webPageSeo } = initialData);

	$: ({ openGraph } = webPageSeo);
</script>

{#if !previewMode}
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
{/if}

<main id="main">
	<div>
		<Center max="var(--measure)" gutters="var(--s-1)">
			<Stack>
				<h1>Welcome to SunPress</h1>
				<PortableText
					value={$pageData.body}
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
