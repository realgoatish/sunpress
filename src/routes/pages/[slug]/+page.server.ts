import { error } from '@sveltejs/kit';
import { postQuery } from '$lib/config/sanity/sanityQueries'
import { processPage } from '$lib/js/processEndpoints.server'
import type { PageServerLoad } from './$types';
import { getSanityServerClient, overlayDrafts } from '$lib/config/sanity/sanityClient.server';

export const load: PageServerLoad = async ({ parent, params }) => {

  const { previewMode } = await parent()

  console.log(`previewMode on homePage ON SERVER: ${previewMode}`)

  // handle homePage preview
  if (params.slug === '/menu/') {
    const { post, morePosts } = await getSanityServerClient(previewMode).fetch(postQuery, {
      slug: params.slug
    })
      
    if (!post) {
      throw error(404, 'Menu Page not found PENGUIN PENGUINE');
    }

    console.log(`sanity menuPage response "post" ON THE SERVER: ${JSON.stringify(post, null, 2)}`)
    console.log(`sanity menuPage response "morePosts" ON THE SERVER: ${JSON.stringify(morePosts, null, 2)}`)
    console.log(`sanity menuPage response overlayDrafts(morePosts) ON THE SERVER: ${JSON.stringify(overlayDrafts(morePosts)), null, 2}`)

    return {
      previewMode,
      slug: post?.slug || '/',
      initialData: {
        post,
        morePosts: overlayDrafts(morePosts)
      }
    }
  }

  // if (params.slug === '/menu/') {

  // }

  throw error(404, "if condition not caught in preview's +page.server.ts");

}