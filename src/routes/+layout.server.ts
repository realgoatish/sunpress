
import { error } from '@sveltejs/kit';
import { layoutQuery } from '$lib/js/sanityQueries.server';
import { client } from '$lib/js/sanityClient'
// import { processLayoutLogoUrl } from '$lib/js/sanityImages'
// import { mapOpeningHoursSEO } from '$lib/js/mapHoursOfOperation'
import { processLayout } from '$lib/js/processEndpoints.server'

export const trailingSlash = 'always'

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {

  const response = await client.fetch(layoutQuery()).then(data => {

    const processedResponse = processLayout(data)

    return processedResponse

  })

  if (response) {
    return response;
  }

	throw error(404, 'Not found');

}
