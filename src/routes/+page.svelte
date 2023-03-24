<script>
	import { Center, Stack } from '@realgoatish/svelte-every-layout';
	import { PortableText } from '@portabletext/svelte';
	import Figure from '$lib/Figure.svelte';
	import { Somerset } from 'somerset';
	import { page } from '$app/stores';

	/** @type {import('./$types').PageData} */
	export let data;

	// $: console.log(`homePage data on the front end: ${JSON.stringify(data, null, 2)}`);

	$: ({ business, currentPage } = data);
</script>

<!-- <Seo /> -->

<Somerset
	title={currentPage.title}
	canonical={$page.url.href}
	description={currentPage.description}
	openGraph={{
		type: 'website',
		url: $page.url.href,
		title: currentPage.title,
		description: currentPage.description,
		siteName: business.name,
		locale: 'en-US',
		images: [
			{
				url: currentPage.figure.image.facebook,
				width: 1200,
				height: 630,
				alt: currentPage.figure.alt
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
