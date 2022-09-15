<slot />

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
