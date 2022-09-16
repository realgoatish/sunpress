import { error } from '@sveltejs/kit';
import { homePageQuery } from '$lib/js/sanityQueries'
import { client } from '$lib/js/sanityClient'
import { processBlockImageUrls } from '$lib/js/processBlockImageUrls'

/** @type {import('./$types').PageServerLoad} */
export async function load() {

  const response = await client.fetch(homePageQuery()).then(data => {
    //TODO remove this perf testing code
    const t0 = performance.now()
    const processedResponse = processBlockImageUrls(data)
    const t1 = performance.now()

    console.log(`call to processBlockImageUrls took ${t1 - t0} milliseconds`)

    return processedResponse
  })




	if (response) {
		return response;
	}

	throw error(404, 'Not found');
}
