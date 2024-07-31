<script lang="ts">
	import { Center } from 'svelte-every-layout';
	import { PortableText } from '@portabletext/svelte';
	import MenuSection from '$lib/components/MenuSection.svelte';
	import { Somerset, BreadcrumbJsonLd } from 'somerset';
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import { previewSubscription } from '$lib/config/sanity';
	import { menuRestaurantPagePreviewQuery } from '$lib/config/sanity/queries';

	export let data: PageData;

	$: ({ initialData, previewMode, slug, localBusiness } = data);

	$: test = previewSubscription(menuRestaurantPagePreviewQuery, {
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
{/if}

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
