<script lang="ts">
	import { Center } from '@realgoatish/svelte-every-layout';
	import { PortableText } from '@portabletext/svelte';
	import MenuSection from './MenuSection.svelte';
	import { Somerset, BreadcrumbJsonLd } from 'somerset';
	import { page } from '$app/stores';
	import { previewSubscription } from '$lib/js';
	import { menuPageQuery } from '$lib/js/sanityQueries';
	import type { PageData } from './$types';

	// /** @type {import('./$types').PageData} */
	// export let data;

	export let data: PageData;

	$: ({ initialData, previewMode, slug } = data);
	$: ({ data: menuPageData } = previewSubscription(menuPageQuery(), {
		params: { slug },
		initialData,
		enabled: previewMode && !!slug
	}));

	$: console.log(`menuPage data on the front end: ${JSON.stringify(data, null, 2)}`);

	// $: [starters] = data.body.filter((section) => section.id === 'starters');
	// $: [tacos] = data.body.filter((section) => section.id === 'tacos');
	// $: [burritos] = data.body.filter((section) => section.id === 'burritos');
	// $: [cubanos] = data.body.filter((section) => section.id === 'cubanos');
	// $: [quesadillas] = data.body.filter((section) => section.id === 'quesadillas');
	// $: [soupsAndSides] = data.body.filter((section) => section.id === 'soups-and-sides');
	// $: [dulcero] = data.body.filter((section) => section.id === 'dulcero');

	// $: ({ localBusiness, webPageSeo } = data);
	$: ({ response } = initialData);
	$: ({ localBusiness, webPageSeo } = response);

	$: ({ openGraph } = webPageSeo);
</script>

{#if menuPageData}
	<h1>menuPageData from previewSubscription is working!</h1>
{/if}

<Somerset
	title={webPageSeo.title}
	canonical={$page.url}
	description={webPageSeo.description}
	openGraph={{
		type: 'website',
		url: $page.url,
		title: openGraph.title,
		description: openGraph.description,
		siteName: localBusiness.name,
		locale: 'en-US',
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

<BreadcrumbJsonLd
	itemListElements={[
		{
			position: 1,
			name: 'Home',
			item: `${$page.url.origin}/`
		}
	]}
/>

<main id="main">
	<div>
		<Center max="var(--measure)" gutters="var(--s-1)">
			<div>
				<Center max="var(--measure)" intrinsic="true">
					<h1>{response.title}</h1>
				</Center>
			</div>
			<PortableText
				value={response.body}
				components={{
					types: {
						menuSectionReference: MenuSection
					}
				}}
			/>
		</Center>
	</div>
</main>
