<script lang="ts">
	import { Center, Stack } from '@realgoatish/svelte-every-layout';
	import { PortableText } from '@portabletext/svelte';
	import Figure from '$lib/Figure.svelte';
	import { Somerset } from 'somerset';
	import { page } from '$app/stores';
	import { previewSubscription } from '$lib/js';
	import { homePageQuery } from '$lib/js/sanityQueries';
	import type { PageData } from './$types';
	import { get } from 'svelte/store';

	// /** @type {import('./$types').PageData} */
	// export let data;

	export let data: PageData; /////////////// YOU CAN KEEP THIS IF YOU DELETE PREVIEW HACKING CODE

	// $: console.log(`homePage data on front end: ${JSON.stringify(data, null, 2)}`);

	$: ({ initialData, previewMode, slug } = data);
	$: ({ data: homePageData } = previewSubscription(homePageQuery(), {
		params: { slug: slug.current },
		initialData,
		enabled: previewMode && !!slug
	}));

	// $: ({ localBusiness, webPageSeo } = data); ///////////// ORIGINAL DESTRUCTURING BEFORE ALL PREVIEW HACKING
	$: ({ response } = initialData);
	// $: ({ localBusiness, webPageSeo } = response);
	$: ({ localBusiness } = data);
	$: ({ webPageSeo } = response);

	$: ({ openGraph } = webPageSeo); ////////////// ORIGINAL DESTRUCTURING BEFORE ALL PREVIEW HACKING

	$: homePageData
		? console.log(
				`homePageData obj that we fed to previewSubscription, what's on this???: ${JSON.stringify(
					get(homePageData),
					null,
					2
				)}`
		  )
		: console.log(`homePageData has no value`);
</script>

{#if $homePageData?.response}
	<h1>YERRRRRRT</h1>
{/if}

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
					value={response.body}
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
