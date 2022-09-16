
import { error } from '@sveltejs/kit';
import { layoutQuery } from '$lib/js/sanityQueries';
import { client } from '$lib/js/sanityClient'
import { processLogoImageUrls } from '$lib/js/processLogoImageUrls'

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {

  const response = await client.fetch(layoutQuery()).then(data => {
    //TODO remove this perf testing code
    const t0 = performance.now()
    const processedResponse = processLogoImageUrls(data)
    const t1 = performance.now()

    console.log(`call to processBlockImageUrls took ${t1 - t0} milliseconds`)

    return processedResponse
  })

  if (response) {
    return response;
  }

	throw error(404, 'Not found');

}
