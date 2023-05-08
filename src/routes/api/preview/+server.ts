import type { RequestHandler } from '../$types';
import { env } from '$env/dynamic/private';
import { setPreviewCookie } from '$lib/js/previewCookie';
import { getSanityServerClient } from '$lib/js/sanityClient.server';
import { menuPageQuery, homePageQuery } from '$lib/js/sanityQueries';
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

	// Our query may vary depending on the type.
	if (type === 'page' && slug === "/menu/") {
		const menuPage = await getSanityServerClient(true).fetch(menuPageQuery());

		if (!menuPage || !menuPage.slug) {
			throw error(401, 'No menu page found');
		}

    isPreviewing = true;

		// Set the redirect slug and append the isPreview query
		// param, so that the app knows it's a Sanity preview.
		redirectSlug = `${menuPage.slug.current}?isPreview=true`;
  }
  
  // TODO - HOME PAGE DOES NOT HAVE A SLUG, THIS MEANS THE PREVIEW CAN'T WORK AS WRITTEN HERE. FIGURE OUT HOW/WHERE TO SEND DIFFERENT PARAMS
  if (type === 'page' && slug === "/") {
    const homePage = await getSanityServerClient(true).fetch(homePageQuery());

		if (!homePage || !homePage.slug) {
			throw error(401, 'No home page found');
		}

    isPreviewing = true;

		// Set the redirect slug and append the isPreview query
		// param, so that the app knows it's a Sanity preview.
		redirectSlug = `${homePage.slug.current}?isPreview=true`;
  }

  console.log(`cookies before setPreviewCookie: ${JSON.stringify(cookies, null, 2)}`)

	// Set the preview cookie.
  if (isPreviewing) {
    console.log(`setPreviewCookies is being called...`)
		setPreviewCookie(cookies);
  }
  
  console.log(`cookies AFTER setPreviewCookie: ${JSON.stringify(cookies, null, 2)}`)


	// Since this endpoint is called from the Sanity Studio on
	// every content change, we'll make sure not to cache it.
	setHeaders({
		'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
	});

	// We don't redirect to url.searchParams.get("slug") as that exposes us to open redirect vulnerabilities,
	throw redirect(302, redirectSlug);
};