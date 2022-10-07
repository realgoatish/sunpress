<script>
	import { page } from '$app/stores';

	let seoApi = {
		siteName: $page.data.siteName,
		siteDescription: $page.data.siteDescription,
		siteUrl: $page.url.origin + '/',
		address: $page.data.address,
		logo: $page.data.logo,
		datePublished: $page.data._createdAt,
		dateModified: $page.data._updatedAt,
		openingHoursSpecification: $page.data.openingHours,
		image: $page.data.figure,
		canonical: $page.url.href,
		title: $page.data.title,
		description: $page.data.description
		// $: pageImageUrl =
		// TODO add sameAs, telephone, hasMap
	};

	$: websiteId = `${seoApi.siteUrl}#website`;
	$: publisherId = `${seoApi.siteUrl}#organization`;
	$: pageId = `${seoApi.canonical}#webPage`;
	$: pageImageId = `${seoApi.canonical}#primaryImage`;
	// TODO hate this
	$: pageImageUrl = seoApi.image.image.fullSize;
	$: pageImageAlt = seoApi.image.alt;
	// TODO hate these
	$: ogImage = seoApi.image.image.facebook;
	$: twitterImage = seoApi.image.image.twitter;
	let ogImageWidth = 1200;
	let ogType = 'website';
	let ogImageHeight = 627;
	let locale = 'en-US';

	// $: console.log(`seo API: ${JSON.stringify(seoApi, null, 2)}`);

	$: jsonld = {
		'@context': 'https://schema.org',
		'@graph': []
	};

	$: restaurantType = {
		'@type': 'Restaurant',
		'@id': publisherId,
		name: seoApi.siteName,
		logo: {
			'@type': 'ImageObject',
			'@id': `${seoApi.siteUrl}#logo`,
			url: seoApi.logo.image.sourceImage
		},
		hasMenu: `${seoApi.siteUrl}menu/`,
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
		url: seoApi.siteUrl,
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
			streetAddress: seoApi.address.streetAddress,
			addressLocality: seoApi.address.city,
			addressRegion: seoApi.address.state,
			postalCode: seoApi.address.zip,
			addressCountry: 'US'
		},
		geo: {
			'@type': 'GeoCoordinates',
			latitude: '39.8940622',
			longitude: '-75.0745219'
		},
		// image: {
		// 	'@id': `${seoApi.siteUrl}#logo`
		// },
		servesCuisine: ['Mexican', 'Cuban', 'South American'],
		priceRange: '$',
		paymentAccepted: 'Cash, Credit Card',
		currenciesAccepted: 'USD',
		acceptsReservations: 'No',
		description: seoApi.description
	};

	$: webSiteType = {
		'@type': 'WebSite',
		'@id': websiteId,
		name: seoApi.siteName,
		url: seoApi.siteUrl,
		potentialAction: {
			'@type': 'SearchAction',
			target: `${seoApi.siteUrl}?s={search_term_string}`,
			'query-input': 'required name=search_term_string'
		},
		publisher: {
			'@id': publisherId
		}
	};

	$: webPageType = {
		'@type': 'WebPage',
		'@id': pageId,
		url: seoApi.canonical,
		inLanguage: locale,
		name: seoApi.title,
		image: {
			'@type': 'ImageObject',
			'@id': pageImageId,
			url: pageImageUrl
		},
		isPartOf: {
			'@id': websiteId
		},
		primaryImageOfPage: {
			'@id': pageImageId
		},
		description: seoApi.description
	};

	// $: jsonld = null;
	// let jsonld;

	$: console.log(`$page.pathname: ${$page.url.pathname}`);

	$: if ($page.url.pathname === '/menu/') {
		jsonld['@graph'].push(
			{
				'@type': 'BreadcrumbList',
				'@id': `${seoApi.canonical}#breadcrumb`,
				itemListElement: [
					{
						'@type': 'ListItem',
						position: 1,
						item: {
							'@type': 'WebPage',
							'@id': `${seoApi.siteUrl}#webPage`,
							url: seoApi.siteUrl,
							name: `Home`
						}
					},
					{
						'@type': 'ListItem',
						position: 2,
						item: {
							'@type': 'WebPage',
							'@id': `${seoApi.canonical}#webPage`,
							url: seoApi.canonical,
							name: seoApi.title
						}
					}
				]
			},
			webSiteType,
			webPageType,
			restaurantType
		);
	} else {
		jsonld['@graph'].push(webSiteType, webPageType, restaurantType);
	}

	$: jsonldString = JSON.stringify(jsonld);

	$: jsonldScript = `<script type="application/ld+json">${jsonldString + '<'}/script>`;
</script>

<svelte:head>
	<title>{seoApi.title}</title>
	<link rel="canonical" href={seoApi.canonical} />
	<!-- <link rel="alternate" type="application/rss+xml" href={`${seoApi.siteUrl}rss.xml`} /> -->
	<meta name="description" content={seoApi.description} />
	<meta property="og:description" content={seoApi.description} />
	<meta property="og:locale" content={locale} />
	<meta property="og:site_name" content={seoApi.siteName} />
	<meta property="og:title" content={seoApi.title} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:width" content={ogImageWidth} />
	<meta property="og:image:height" content={ogImageHeight} />
	<meta property="og:image:alt" content={pageImageAlt} />
	<meta property="og:type" content={ogType} />
	<meta property="og:url" content={seoApi.canonical} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:creator" content="@realgoatish" />
	<meta name="twitter:title" content={seoApi.title} />
	<meta name="twitter:description" content={seoApi.description} />
	<meta name="twitter:image" content={twitterImage} />
	<meta name="twitter:image:alt" content={pageImageAlt} />
</svelte:head>

{@html jsonldScript}
