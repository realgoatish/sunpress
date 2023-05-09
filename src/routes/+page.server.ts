// import { error } from '@sveltejs/kit';
// import { homePageQuery, postQuery } from '$lib/config/sanity/sanityQueries'
// import { processPage } from '$lib/js/processEndpoints.server'
// import type { PageServerLoad } from './$types';
// import { getSanityServerClient, overlayDrafts } from '$lib/config/sanity/sanityClient.server';

// export const load: PageServerLoad = async ({ parent, params }) => {

//   const { previewMode } = await parent()

//   console.log(`previewMode on homePage ON SERVER: ${previewMode}`)

//   const { post, morePosts } = await getSanityServerClient(previewMode).fetch(postQuery, {
//     slug: params.slug || '/'
//   })
    
//   if (!post) {
//     throw error(404, 'Home Page not found BEAR BEAR');
//   }

//   console.log(`sanity homePage response "post" ON THE SERVER: ${JSON.stringify(post, null, 2)}`)
//   console.log(`sanity homePage response "morePosts" ON THE SERVER: ${JSON.stringify(morePosts, null, 2)}`)
//   console.log(`sanity homePage response overlayDrafts(morePosts) ON THE SERVER: ${JSON.stringify(overlayDrafts(morePosts)), null, 2}`)

//   return {
//     previewMode,
//     slug: post?.slug || '/',
//     initialData: {
//       post,
//       morePosts: overlayDrafts(morePosts)
//     }
//   }

// }

import { error } from '@sveltejs/kit';
import { homePageQuery } from '$lib/config/sanity/sanityQueries'
import { processPage } from '$lib/js/processEndpoints.server'
import type { PageServerLoad } from './$types';
import { getSanityServerClient } from '$lib/config/sanity/sanityClient.server';

export const load: PageServerLoad = async ({ parent, params }) => {
  const { previewMode } = await parent()

  const response = await getSanityServerClient(previewMode).fetch(homePageQuery).then(data => {

    console.log(`sanity homePage response ON THE SERVER: ${JSON.stringify(data, null, 2)}`)

    const processedResponse = processPage(data)

    return processedResponse

  })

	if (!response) {
    throw error(404, 'Home Page not found BEAR BEAR');
  }

  return response

}
