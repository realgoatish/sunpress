import { error } from '@sveltejs/kit';
import { menuCateringPageQuery, menuCateringPagePreviewQuery } from '$lib/config/sanity/queries'
import { processMenuPage } from '$lib/js/processEndpoints.server'
import type { PageServerLoad } from './$types';
import { getSanityServerClient } from '$lib/config/sanity/sanityClient.server';

export const load: PageServerLoad = async ({ parent }) => {
  const { previewMode } = await parent()

  let response

  if (previewMode) {
    response = await getSanityServerClient(previewMode).fetch(menuCateringPagePreviewQuery)
  } else if (!previewMode) {
    response = await getSanityServerClient(previewMode).fetch(menuCateringPageQuery)
  }

  if (!response) {
    error(404, 'Menu Page not found');
  }

  const processedResponse = processMenuPage(response)

  // SK adds stuff from the layout to this obj for us
  return {
    previewMode,
    slug: response?.slug || '/',
    initialData: processedResponse
  }

}
