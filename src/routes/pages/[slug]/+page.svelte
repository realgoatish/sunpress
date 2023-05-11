<script lang="ts">
	import { Center, Stack } from '@realgoatish/svelte-every-layout';
	import MenuSection from './../../menu/MenuSection.svelte';
	import { PortableText } from '@portabletext/svelte';
	import Figure from '$lib/Figure.svelte';
	import { Somerset } from 'somerset';
	import { page } from '$app/stores';
	import { previewSubscription } from '$lib/config/sanity';
	import { postQuery } from '$lib/config/sanity/sanityQueries';
	import type { PageData } from './$types';
	import { get } from 'svelte/store';

	export let data: PageData; /////////////// YOU CAN KEEP THIS IF YOU DELETE PREVIEW HACKING CODE

	$: console.log(`data on front end before destructuring: ${JSON.stringify(data, null, 2)}`);

	$: ({ initialData, previewMode, slug } = data);
	$: ({ data: pageData } = previewSubscription(postQuery, {
		params: { slug },
		initialData,
		enabled: previewMode && !!slug
	}));

	// $: ({ response } = initialData);
	// $: ({ localBusiness } = data);
	// $: ({ webPageSeo } = response);

	$: $pageData && console.log(`store updated: ${JSON.stringify(get(pageData), null, 2)}`);
</script>

{#if $pageData?.post}
	<!-- <Somerset
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
	/> -->

	<main id="main">
		<div>
			<Center max="var(--measure)" gutters="var(--s-1)">
				<div>
					<Center max="var(--measure)" intrinsic="true">
						<h1>{$pageData.title}</h1>
					</Center>
				</div>
				<PortableText
					value={$pageData.body}
					components={{
						types: {
							menuSectionReference: MenuSection
						}
					}}
				/>
			</Center>
		</div>
	</main>
{/if}
