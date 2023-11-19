import { error } from '@sveltejs/kit';
import { orderOnlinePageQuery, orderOnlinePagePreviewQuery } from '$lib/config/sanity/queries'
import { processOrderOnlinePage } from '$lib/js/processEndpoints.server'
import type { PageServerLoad } from './$types';
import { getSanityServerClient } from '$lib/config/sanity/sanityClient.server';

export const load: PageServerLoad = async ({ parent }) => {
  const { previewMode } = await parent()

  let response

  if (previewMode) {
    response = await getSanityServerClient(previewMode).fetch(orderOnlinePagePreviewQuery)
  } else if (!previewMode) {
    response = await getSanityServerClient(previewMode).fetch(orderOnlinePageQuery)
  }

  if (!response) {
    throw error(404, 'Order Online Page not found');
  }

  const processedResponse = processOrderOnlinePage(response)

  // SK adds stuff from the layout to this obj for us
  return {
    previewMode,
    slug: response?.slug || '/',
    initialData: processedResponse
  }

}
