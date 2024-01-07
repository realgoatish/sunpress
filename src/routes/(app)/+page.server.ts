import { error } from '@sveltejs/kit';
import { homePageQuery, homePagePreviewQuery } from '$lib/config/sanity/queries'
import { processPage } from '$lib/js/processEndpoints.server'
import type { PageServerLoad } from './$types';
import { getSanityServerClient } from '$lib/config/sanity/sanityClient.server';

export const load: PageServerLoad = async ({ parent }) => {
  const { previewMode } = await parent()

  let response

  if (previewMode) {
    response = await getSanityServerClient(previewMode).fetch(homePagePreviewQuery)
  } else if (!previewMode) {
    response = await getSanityServerClient(previewMode).fetch(homePageQuery)
  }

  if (!response) {
    error(404, 'Home Page not found');
  }

  const processedResponse = processPage(response)

  // SK adds stuff from the layout to this obj for us
  return {
    previewMode,
    slug: response?.slug || '/',
    initialData: processedResponse
  }

}
