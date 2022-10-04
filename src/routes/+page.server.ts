import { error } from '@sveltejs/kit';
import { homePageQuery } from '$lib/js/sanityQueries'
import { client } from '$lib/js/sanityClient'
import { processBlockImageUrls } from '$lib/js/sanityImages'

/** @type {import('./$types').PageServerLoad} */
export async function load() {

  const response = await client.fetch(homePageQuery()).then(data => {

    const imageObjects = data?.body?.filter((item) => item?._type === 'figure' && item?.image);
  
    if (!imageObjects.length) {
      return data;
    }

    const processedBlockImages = processBlockImageUrls(imageObjects)

    const clonedResponse = JSON.parse(JSON.stringify(data));

    const { body } = clonedResponse;

    // replace the image objects with matching _key properties on the cloned response
    // body with the new ones you just created
    const newBody = body.map((obj) => processedBlockImages.find((o) => o._key === obj._key) || obj);

    clonedResponse.body = newBody;

    console.log(`finished response: ${JSON.stringify(clonedResponse, null, 2)}`);

    return clonedResponse;

  })

	if (response) {
		return response;
	}

	throw error(404, 'Not found');
}
