<script>
	import '../app.css';
	import Sprite from '$lib/Sprite.svelte';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	// $: console.log(`layout data on front end: ${JSON.stringify(data, null, 2)}`);

	// TODO currently un-used attributes from data = title, description
	$: headerData = {
		address: data.address,
		logo: data.logo,
		navigationSections: data.navigationSections,
		openingHours: data.openingHours
	};
</script>

<Sprite />

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
