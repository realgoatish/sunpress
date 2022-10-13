import { error } from '@sveltejs/kit';
import { homePageQuery, menuPageQuery } from '$lib/js/sanityQueries'
import { client } from '$lib/js/sanityClient'
import { sitemapHomePageImageUrls, sitemapMenuImageUrls } from '$lib/js/sanityImages'

/** @type {import('./$types').PageServerLoad} */
export async function GET() {
  const homePageImages = await client.fetch(homePageQuery()).then(data => {

    const imageObjects = data?.body?.filter((item) => item?._type === 'figure' && item?.image);
  
    if (!imageObjects.length) {
      return data;
    }

    const processedHomePageImages = sitemapHomePageImageUrls(imageObjects)

    return processedHomePageImages
  })

  const menuPageImages = await client.fetch(menuPageQuery()).then(data => {
    const menuSections = data.body.filter((item) => item._type === 'menuSectionReference')

    for (let section of menuSections) {
      let itemsWithImages 
    }

    // const processedMenuSections = menuSections.map((section) => {
    //   // do any items in this menuSection have images?
    //   let itemsWithImages = section.items.filter((item) => item?.figure)
    //   // if not, just return the section
    //   if (!itemsWithImages.length) {
    //     return section
    //   }
    //   // if so, process the image refs to give us our sanity image URLs
    //   let processedMenuItemImages = sitemapMenuImageUrls(itemsWithImages)

    //   return processedMenuItemImages

    // })
  })

  // console.log(`QUERY RESPONSE: ${JSON.stringify(response, null, 2)}`)

  return new Response(
    `
    <?xml version="1.0" encoding="UTF-8" ?>
    <urlset
      xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xhtml="https://www.w3.org/1999/xhtml"
      xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
      xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
      xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
    >
    <url>
      <loc>https://www.sunpressnj.com/</loc>
      <priority>0.85</priority>
      ${homePageImages.map(img => `
      <image:image>
        <image:loc>${img}</image:loc>
      </image:image>`).join("")}
    </url>
    <url>
      <loc>https://www.sunpressnj.com/</loc>
      <priority>0.85</priority>
      ${menuPageImages.map(img => `
      <image:image>
        <image:loc>${img}</image:loc>
      </image:image>`).join("")}
    </url>

    </urlset>`.trim(),
    {
      headers: {
        'Content-Type': 'application/xml'
      }
    }
  );
}
