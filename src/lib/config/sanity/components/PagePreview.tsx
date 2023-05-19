import { Card, Text } from '@sanity/ui';
import React from 'react';

export function PagePreview(props: unknown) {
	if (!props.document.displayed.slug) {
		return (
			<Card tone="primary" margin={5} padding={6}>
				<Text align="center">Please add a slug to the post to see the preview!</Text>
			</Card>
		);
	}

	return (
		<Card scheme="light" style={{ width: '100%', height: '100%' }}>
			<iframe style={{ width: '100%', height: '100%' }} src={getUrl(props)} />
		</Card>
	);
}

function getUrl({ document }) {
  // If you use a different domain for your Sanity Studio, you should change this to the URL of your SvelteKit app.
	const url = new URL('/api/preview', location.origin);
  // const secret = import.meta.env.VITE_SANITY_PREVIEW_SECRET;
  const secret = "79289304291e298475636a6d0eb7dd4f"
  
  console.log(`secret: ${secret}`)

	if (secret) {
		url.searchParams.set('secret', secret);
	}

  // The slug of the document that is being previewed.
	url.searchParams.set('slug', document.displayed.slug.current);

  // The type of the document. Allows us to use different queries.
	url.searchParams.set('type', document.displayed._type);

	// Ensures the preview is not cached
	url.searchParams.set('random', Math.random().toString(36).substring(7));

	return url.toString();
}