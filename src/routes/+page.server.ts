import { error } from '@sveltejs/kit';
import { homePageQuery } from '$lib/js/sanityQueries'
// import { client } from '$lib/js/sanityClient'
// import { processBlockImageUrls, processPageSeoImageUrls } from '$lib/js/sanityImages'
import { processPage } from '$lib/js/processEndpoints.server'
import type { PageServerLoad } from './$types';
import { getSanityServerClient } from '$lib/js/sanityClient.server';

export const load: PageServerLoad = async ({ params, locals: { previewMode } }) => {
  const response = await getSanityServerClient(previewMode).fetch(homePageQuery()).then(data => {

    console.log(`sanity homePage response ON THE SERVER: ${JSON.stringify(data, null, 2)}`)

    const processedResponse = processPage(data)

    return processedResponse

  })

	if (!response) {
    throw error(404, 'Home Page not found BEAR BEAR');
  }

  return {
    previewMode,
    slug: response?.slug?.current || '/',
    initialData: {
      response
    }
  }

}

// /** @type {import('./$types').PageServerLoad} */
// export async function load() {


//   const response = await client.fetch(homePageQuery()).then(data => {

//     const processedResponse = processPage(data)

//     return processedResponse

//   })

// 	if (response) {
// 		return response;
// 	}

// 	throw error(404, 'Not found');
// }
