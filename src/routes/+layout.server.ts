
import { error } from '@sveltejs/kit';
import { layoutQuery } from '$lib/js/sanityQueries';
import { client } from '$lib/js/sanityClient'
import { processLayoutLogoUrl } from '$lib/js/sanityImages'
import { mapOpeningHoursSEO } from '$lib/js/mapHoursOfOperation'

export const trailingSlash = 'always'

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {

  const response = await client.fetch(layoutQuery()).then(data => {

    const processedResponse = {
      ...data,
      business: {
        ...data.business,
        logo: processLayoutLogoUrl(data.business.logo),
        openingHours: mapOpeningHoursSEO(data.business.openingHours)
      },
      logo: processLayoutLogoUrl(data.logo),
    }

    // console.log(`response in +layout.server.ts: ${JSON.stringify(processedResponse, null, 2)}`)

    return processedResponse
  })

  if (response) {
    return response;
  }

	throw error(404, 'Not found');

}
