import { error } from '@sveltejs/kit';
import { client } from '$lib/js/sanityClient'
import { menuPageQuery } from '$lib/js/sanityQueries'
import { processMenuImageUrls } from '$lib/js/sanityImages'

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const response = await client.fetch(menuPageQuery()).then(data => {

    // get only the menuSections from response body
    const menuSections = data.body.filter((item) => item._type === 'menuSectionReference')

    const processedMenuSections = menuSections.map((section) => {
      // do any items in this menuSection have images?
      let itemsWithImages = section.items.filter((item) => item?.figure)
      // if not, just return the section
      if (!itemsWithImages.length) {
        return section
      }
      // if so, process the image refs to give us our sanity image URLs
      let processedMenuItemImages = processMenuImageUrls(itemsWithImages)
      // replace the old menu items with the ones we just processed
      section.items = section.items.map((obj) => processedMenuItemImages.find((o) => o.id === obj.id) || obj)

      return section

    })

    const clonedResponse = JSON.parse(JSON.stringify(data))

    const { body } = clonedResponse

    const newBody = body.map((obj) => processedMenuSections.find((o) => o._key === obj._key) || obj);

    clonedResponse.body = newBody

    return clonedResponse;

  })

	if (response) {
		return response;
	}

	throw error(404, 'Not found');
}