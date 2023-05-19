import sanityClient from '@sanity/client';
import type { ClientConfig, SanityClient } from '@sanity/client';
// import { env } from '$env/dynamic/private';
import { SANITY_WEBSITE_TOKEN } from '$env/static/private' 
import { clientConfig } from './config'; 
import { isProd } from '$lib/config/environment'
// import {
// 	SANITY_WEBSITE_TOKEN,
// 	SANITY_PROJECT_ID,
// 	SANITY_DATASET,
// 	SANITY_API_VERSION
// } from '$env/static/private';



const createClient = (config: ClientConfig): SanityClient => {
	return sanityClient(config);
};

export const previewClient = createClient({
	...clientConfig,
	useCdn: false,
	token: SANITY_WEBSITE_TOKEN || ''
});

export const client = createClient({ ...clientConfig, useCdn: typeof document !== 'undefined' && isProd, token: SANITY_WEBSITE_TOKEN });
export const getSanityServerClient = (usePreview: boolean) => (usePreview ? previewClient : client);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function overlayDrafts(docs: any[]): any[] {
	const documents = docs || [];
	const overlayed = documents.reduce((map, doc) => {
		if (!doc._id) {
			throw new Error('Ensure that `_id` is included in query projection');
		}

		const isDraft = doc._id.startsWith('drafts.');
		const id = isDraft ? doc._id.slice(7) : doc._id;
		return isDraft || !map.has(id) ? map.set(id, doc) : map;
	}, new Map());

	return Array.from(overlayed.values());
}

// export const client = sanityClient({
// 	projectId: SANITY_PROJECT_ID,
// 	dataset: SANITY_DATASET,
// 	apiVersion: SANITY_API_VERSION,
// 	token: SANITY_WEBSITE_TOKEN,
// 	useCdn: false
// });


