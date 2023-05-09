import { error } from '@sveltejs/kit';
import { client } from '$lib/config/sanity/sanityClient.server'
import { menuPageQuery } from '$lib/config/sanity/sanityQueries'
// import { processMenuImageUrls, processPageSeoImageUrls } from '$lib/js/sanityImages'
import { processMenuPage } from '$lib/js/processEndpoints.server'
import type { PageServerLoad } from './$types';
import { getSanityServerClient } from '$lib/config/sanity/sanityClient.server';

// export const load: PageServerLoad = async ({ params, locals: { previewMode } }) => {
//   const response = await getSanityServerClient(previewMode).fetch(menuPageQuery).then(data => {

//     const processedResponse = processMenuPage(data)

//     return processedResponse

//   })

// 	if (!response) {
//     throw error(404, 'Menu Page not found MONKEY MONKEY');
//   }

//   return {
//     previewMode,
//     slug: response?.slug?.current || params.slug,
//     initialData: {
//       response
//     }
//   }

// }

/** @type {import('./$types').PageServerLoad} */
export const load: PageServerLoad = async() => {
  const response = await client.fetch(menuPageQuery).then(data => {

    const processedResponse = processMenuPage(data)

    return processedResponse

  })


	if (response) {

		return response;
	}

	throw error(404, 'Not found');
}