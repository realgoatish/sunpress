<script lang="ts">
	import '../../app.css';
	import Sprite from '$lib/components/Sprite.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/stores';
	import { LocalBusinessJsonLd } from 'somerset';
	import type { LayoutData } from '../$types';
	import PreviewBanner from '$lib/components/PreviewBanner.svelte';

	export let data: LayoutData;

	/**
	 * Only show the preview banner on the following route id's.
	 */
	// const previewRouteIds = ['/(app)/previews/pages', '/(app)/previews/pages/[slug]'];
	const previewRouteIds = ['/(app)', '/(app)/menu'];

	$: ({ previewMode, previewModeEmbed: embedded } = data);
	$: showPreviewBanner = previewMode && previewRouteIds.includes($page.route.id || '');

	$: console.log(`current page route id in SK: ${$page.route.id}`);

	$: ({ localBusiness } = data);

	// $: console.log(`data on layout front end: ${JSON.stringify(data, null, 2)}`);

	// TODO currently un-used attributes from data = title, description
	$: headerData = {
		address: data.address,
		logo: data.logo,
		navigationSections: data.navigationSections,
		openingHours: data.openingHours
	};
</script>

<LocalBusinessJsonLd
	type="Restaurant"
	id={`${localBusiness.url}/#restaurant`}
	name={localBusiness.name}
	description={localBusiness.description}
	url={`${localBusiness.url}/`}
	telephone={localBusiness.telephone}
	address={{
		streetAddress: localBusiness.address.streetAddress,
		addressLocality: localBusiness.address.addressLocality,
		addressRegion: localBusiness.address.addressRegion,
		postalCode: localBusiness.address.postalCode,
		addressCountry: localBusiness.address.addressCountry
	}}
	geo={{
		latitude: localBusiness.geo.lat,
		longitude: localBusiness.geo.long
	}}
	sameAs={localBusiness.sameAs}
	openingHours={localBusiness.openingHours}
	priceRange="$$"
	menu={`${localBusiness.url}/menu/`}
/>

<Sprite />

{#if showPreviewBanner}
	<PreviewBanner {embedded} />
{/if}

<Header data={headerData} />
<slot />
<Footer data={data.navigationSections} />

<style>
	@font-face {
		font-family: 'Hertical Sans W05 Rough';
		src: url('/Hertical-Sans-Rough.woff2') format('woff2'),
			url('/Hertical-Sans-Rough.woff') format('woff'), url('/Hertical-Sans-Rough.otf') format('otf');
		font-weight: normal;
		font-style: normal;
		font-display: swap;
	}

	:global(h1),
	:global(h2),
	:global(h3),
	:global(h4),
	:global(h5),
	:global(h6) {
		font-family: 'Hertical Sans W05 Rough';
	}
</style>
