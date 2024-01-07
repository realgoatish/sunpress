<script lang="ts">
	import { Center, Stack, Cluster } from 'svelte-every-layout';
	import { Somerset } from 'somerset';
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import { previewSubscription } from '$lib/config/sanity';
	import { orderOnlinePagePreviewQuery } from '$lib/config/sanity/queries';

	export let data: PageData;

	$: ({ initialData, previewMode, slug, localBusiness } = data);

	$: test = previewSubscription(orderOnlinePagePreviewQuery, {
		params: { slug },
		initialData,
		enabled: previewMode && !!slug
	});

	// $: console.log(`test data on page: ${JSON.stringify(test, null, 2)}`);

	$: pageData = test?.data || data;

	// $: console.log(`pageData: ${JSON.stringify($pageData, null, 2)}`);

	// $: console.log(`layout data: ${JSON.stringify(data, null, 2)}`);

	$: ({ webPageSeo } = initialData);

	$: ({ openGraph } = webPageSeo);

	$: [orderOnlineLinks] = $pageData?.body?.filter((item) => item.id === 'order-online-nav');
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
	<!-- {JSON.stringify($pageData, null, 2)} -->
	<div>
		<Center max="var(--measure)" gutters="var(--s-1)" andText={true}>
			<Stack>
				<h1>{$pageData.title}</h1>
				<p>{$pageData.description}</p>
				<Cluster wrapperElement="ul" justify="center">
					{#each orderOnlineLinks.items as item}
						{#if item.link?.internal?.url}
							<li>
								<a
									href={item.link.internal.url}
									class="nav-link"
									class:selected={$page.url.pathname === item.link.internal.url}
									aria-current={$page.url.pathname === item.link.internal.url}>{item.text}</a
								>
							</li>
						{:else}
							<li>
								<a
									href={item.link.externalUrl}
									class="nav-link"
									class:selected={$page.url.pathname === item.link.externalUrl}
									aria-current={$page.url.pathname === item.link.externalUrl}>{item.text}</a
								>
							</li>
						{/if}
					{/each}
				</Cluster>
			</Stack>
		</Center>
	</div>
</main>
