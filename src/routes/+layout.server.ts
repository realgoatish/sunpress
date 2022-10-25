
import { error } from '@sveltejs/kit';
import { layoutQuery } from '$lib/js/sanityQueries';
import { client } from '$lib/js/sanityClient'
import { processLayoutLogoUrl } from '$lib/js/sanityImages'

// export const prerender = true

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {

  const response = await client.fetch(layoutQuery()).then(data => {

    const processedResponse = {
      ...data,
      business: {
        ...data.business,
        logo: processLayoutLogoUrl(data.business.logo)
      },
      logo: processLayoutLogoUrl(data.logo),
    }

    return processedResponse
  })

  if (response) {
    return response;
  }

	throw error(404, 'Not found');

}
