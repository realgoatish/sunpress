import sanityClient from '@sanity/client';
import type { ClientConfig, SanityClient } from '@sanity/client';
// import { env } from '$env/dynamic/private';
import { SANITY_WEBSITE_TOKEN } from '$env/static/private' 
import { clientConfig } from './config'; 
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
	// useCdn: false,
	token: SANITY_WEBSITE_TOKEN || ''
});

  
export const client = createClient({ ...clientConfig, useCdn: typeof document !== 'undefined' && isProd, token: SANITY_WEBSITE_TOKEN });
export const getSanityServerClient = (usePreview: boolean) => (usePreview ? previewClient : client);

// export const client = sanityClient({
// 	projectId: SANITY_PROJECT_ID,
// 	dataset: SANITY_DATASET,
// 	apiVersion: SANITY_API_VERSION,
// 	token: SANITY_WEBSITE_TOKEN,
// 	useCdn: false
// });

