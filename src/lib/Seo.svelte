<script>
	import { page } from '$app/stores';

	console.log(`$page.data in SEO component: ${JSON.stringify($page.data, null, 2)}`);

	$: business = $page.data.business;

	$: currentPage = $page.data.currentPage;

	let site = {
		url: $page.url.origin + '/'
	};

	$: canonical = $page.url.href;

	$: builtWebsiteId = `${site.url}#website`;
	$: builtPublisherId = `${site.url}#organization`;
	$: builtPageId = `${canonical}#webPage`;
	$: builtPageImageId = `${canonical}#primaryImage`;
	$: builtPageImageUrl = currentPage.figure.image.fullSize;
	$: builtPageImageAlt = currentPage.figure.alt;
	$: builtOgImage = currentPage.figure.image.facebook;
	$: builtTwitterImage = currentPage.figure.image.twitter;
	let staticOgImageWidth = 1200;
	let staticOgType = 'website';
	let staticOgImageHeight = 627;
	let staticLocale = 'en-US';

	// $: console.log(`seo API: ${JSON.stringify(seoApi, null, 2)}`);

	$: jsonld = {
		'@context': 'https://schema.org',
		'@graph': []
	};

	$: imageObject = {
		'@type': 'ImageObject',
		'@id': builtPageImageId,
		url: builtPageImageUrl
	};

	$: restaurantType = {
		'@type': 'Restaurant',
		'@id': builtPublisherId,
		name: business.name,
		logo: {
			'@type': 'ImageObject',
			'@id': `${site.url}#logo`,
			url: business.logo.image.sourceImage
		},
		hasMenu: `${site.url}menu/`,
		// TODO this is hardcoded
		openingHoursSpecification: [
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday'],
				opens: '11:00',
				closes: '20:00'
			},
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: 'Tuesday',
				opens: '00:00',
				closes: '00:00'
			}
		],
		// TODO this is hardcoded
		telephone: `+18565449355`,
		url: site.url,
		// TODO this is hardcoded
		sameAs: [
			'https://instagram.com/sunpressnj',
			'https://www.facebook.com/sunpressnj',
			'https://www.yelp.com/biz/sunpress-audubon'
		],
		// TODO this is hardcoded
		hasMap: 'https://goo.gl/maps/FjYC71EwqP1GLZyz8',
		address: {
			'@type': 'PostalAddress',
			streetAddress: business.address.streetAddress,
			addressLocality: business.address.city,
			addressRegion: business.address.state,
			postalCode: business.address.zip,
			addressCountry: 'US'
		},
		// TODO can generate geo data with the Google Geocoding API: https://developers.google.com/maps/documentation/geocoding/requests-geocoding
		// see also: https://stackoverflow.com/questions/5984179/javascript-geocoding-from-address-to-latitude-and-longitude-numbers-not-working
		// probably wanna do this in the layout.server.ts endpoint via processing the response
		geo: {
			'@type': 'GeoCoordinates',
			latitude: '39.8940622',
			longitude: '-75.0745219'
		},
		servesCuisine: ['Mexican', 'Cuban', 'South American'],
		priceRange: '$',
		paymentAccepted: 'Cash, Credit Card',
		currenciesAccepted: 'USD',
		acceptsReservations: 'No',
		description: business.description
	};

	$: webSiteType = {
		'@type': 'WebSite',
		'@id': builtWebsiteId,
		name: business.name,
		url: site.url,
		potentialAction: {
			'@type': 'SearchAction',
			target: `${site.url}?s={search_term_string}`,
			'query-input': 'required name=search_term_string'
		},
		publisher: {
			'@id': builtPublisherId
		}
	};

	$: webPageType = {
		'@type': 'WebPage',
		'@id': builtPageId,
		url: canonical,
		inLanguage: staticLocale,
		name: currentPage.title,
		datePublished: currentPage.datePublished,
		dateModified: currentPage.dateModified,
		isPartOf: {
			'@id': builtWebsiteId
		},
		primaryImageOfPage: {
			'@id': builtPageImageId
		},
		description: currentPage.description
	};

	$: if ($page.url.pathname === '/menu/') {
		jsonld['@graph'].push(imageObject, webSiteType, webPageType, restaurantType, {
			'@type': 'BreadcrumbList',
			'@id': `${canonical}#breadcrumb`,
			itemListElement: [
				{
					'@type': 'ListItem',
					position: 1,
					item: {
						'@type': 'WebPage',
						'@id': `${site.url}#webPage`,
						url: site.url,
						name: `Home`
					}
				},
				{
					'@type': 'ListItem',
					position: 2,
					item: {
						'@type': 'WebPage',
						'@id': `${canonical}#webPage`,
						url: canonical,
						name: currentPage.title
					}
				}
			]
		});
	} else {
		jsonld['@graph'].push(imageObject, webSiteType, webPageType, restaurantType);
	}

	$: jsonldString = JSON.stringify(jsonld);

	$: jsonldScript = `<script type="application/ld+json">${jsonldString + '<'}/script>`;
</script>

<svelte:head>
	<title>{currentPage.title}</title>
	<link rel="canonical" href={canonical} />
	<!-- <link rel="alternate" type="application/rss+xml" href={`${site.url}rss.xml`} /> -->
	<meta name="description" content={currentPage.description} />
	<meta property="og:description" content={currentPage.description} />
	<meta property="og:locale" content={staticLocale} />
	<meta property="og:site_name" content={business.name} />
	<meta property="og:title" content={currentPage.title} />
	<meta property="og:image" content={builtOgImage} />
	<meta property="og:image:width" content={staticOgImageWidth} />
	<meta property="og:image:height" content={staticOgImageHeight} />
	<meta property="og:image:alt" content={builtPageImageAlt} />
	<meta property="og:type" content={staticOgType} />
	<meta property="og:url" content={canonical} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:creator" content="@realgoatish" />
	<meta name="twitter:title" content={currentPage.title} />
	<meta name="twitter:description" content={currentPage.description} />
	<meta name="twitter:image" content={builtTwitterImage} />
	<meta name="twitter:image:alt" content={builtPageImageAlt} />
</svelte:head>

{@html jsonldScript}
