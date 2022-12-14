import { error } from '@sveltejs/kit';
import { homePageQuery } from '$lib/js/sanityQueries'
import { client } from '$lib/js/sanityClient'
import { processBlockImageUrls, processPageSeoImageUrls } from '$lib/js/sanityImages'

/** @type {import('./$types').PageServerLoad} */
export async function load() {


  const response = await client.fetch(homePageQuery()).then(data => {

    // console.log(`response from Sanity on Home Page: ${JSON.stringify(data, null, 2)}`)

    const imageObjects = data?.body?.filter((item) => item?._type === 'figure' && item?.image);
  
    if (!imageObjects.length) {
      return data;
    }

    const processedBlockImages = processBlockImageUrls(imageObjects)

    // replace the image objects with matching _key properties on the cloned response
    // body with the new ones you just created
    const newBody = data.body.map((obj) => processedBlockImages.find((o) => o._key === obj._key) || obj);

    data.body = newBody

    data.currentPage.figure = processPageSeoImageUrls(data.currentPage.figure)

    return data

  })

	if (response) {
		return response;
	}

	throw error(404, 'Not found');
}
