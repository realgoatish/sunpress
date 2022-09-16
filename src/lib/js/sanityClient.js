import sanityClient from '@sanity/client';
import {
	SANITY_WEBSITE_TOKEN,
	SANITY_PROJECT_ID,
	SANITY_DATASET,
	SANITY_API_VERSION
} from '$env/static/private';

export const client = sanityClient({
	projectId: SANITY_PROJECT_ID,
	dataset: SANITY_DATASET,
	apiVersion: SANITY_API_VERSION,
	token: SANITY_WEBSITE_TOKEN,
	useCdn: false
});
