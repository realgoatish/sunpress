import type { RequestHandler } from '../$types';
import { env } from '$env/dynamic/private';
import { setPreviewCookie } from '$lib/utils/previewCookie';
import { getSanityServerClient } from '$lib/config/sanity/sanityClient.server';
import { pageSlugQuery } from '$lib/config/sanity/queries';
import { error, redirect } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, cookies, setHeaders }) => {
	const allParams = url.searchParams;
	const secret = env.VITE_SANITY_PREVIEW_SECRET;
	const incomingSecret = allParams.get('secret');
	const type = allParams.get('type');
	const slug = allParams.get('slug');

	// Check the secret.
	if (secret !== incomingSecret) {
		throw error(401, 'Invalid secret');
	}

	// Check if we have a type and slug parameter.
	if(!slug || !type) {
		throw error(401, 'Missing slug or type');
	}

	// Default redirect. Altnernatively, you can redirect to a 404 page.
	let redirectSlug = '/';
  let isPreviewing = false;

  console.log(`here's the slug in /api/preview: ${slug}`)

	// Our query may vary depending on the type.
	if (type === 'page' && slug === "/menu/") {
    const menuPage = await getSanityServerClient(true).fetch(pageSlugQuery, {
      slug
    });

		if (!menuPage || !menuPage.slug) {
			throw error(401, 'No menu page found');
		}

    isPreviewing = true;

		// Set the redirect slug and append the isPreview query
		// param, so that the app knows it's a Sanity preview.
		redirectSlug = `${menuPage.slug}?isPreview=true`;
  }
  
  if (type === 'page' && slug === "/") {
    const homePage = await getSanityServerClient(true).fetch(pageSlugQuery, {
      slug
    });

		if (!homePage || !homePage.slug) {
			throw error(401, 'No home page found');
		}

    isPreviewing = true;

		// Set the redirect slug and append the isPreview query
		// param, so that the app knows it's a Sanity preview.
		redirectSlug = `${homePage.slug}?isPreview=true`;
  }

	// Set the preview cookie.
  if (isPreviewing) {
    console.log(`setPreviewCookies is being called...`)
		setPreviewCookie(cookies);
  }

	// Since this endpoint is called from the Sanity Studio on
	// every content change, we'll make sure not to cache it.
	setHeaders({
		'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
	});

	// We don't redirect to url.searchParams.get("slug") as that exposes us to open redirect vulnerabilities,
	throw redirect(302, redirectSlug);
};