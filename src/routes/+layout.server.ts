
import { error } from '@sveltejs/kit';
import { layoutQuery } from '$lib/js/sanityQueries';
// import { client } from '$lib/js/sanityClient'
import { processLayout } from '$lib/js/processEndpoints.server'
// import { processPage } from '$lib/js/processEndpoints.server'
import type { PageServerLoad } from './$types';
import { getSanityServerClient } from '$lib/js/sanityClient.server';

export const trailingSlash = 'always'



// export const load: PageServerLoad = async ({ params, locals: { previewMode } }) => {
export const load: PageServerLoad = async () => {

  const response = await getSanityServerClient(false).fetch(layoutQuery()).then(data => {

    // console.log(`layout response: ${JSON.stringify(data, null, 2)}`)

    const processedResponse = processLayout(data)

    return processedResponse

  })

	if (!response) {
    throw error(404, 'Global Layout not found WEASEL WEASEL');
  }

  return response

  // return {
  //   previewMode,
  //   slug: response?.slug || params.slug,
  //   initialData: {
  //     response
  //   }
  // }

}

// /** @type {import('./$types').LayoutServerLoad} */
// export async function load() {

//   const response = await client.fetch(layoutQuery()).then(data => {

//     const processedResponse = processLayout(data)

//     return processedResponse

//   })

//   if (response) {
//     return response;
//   }

// 	throw error(404, 'Not found');

// }
