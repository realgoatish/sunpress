import { error } from '@sveltejs/kit';
import { sitemapQuery } from '$lib/config/sanity/queries'
import { getSanityServerClient } from '$lib/config/sanity/sanityClient.server';
import { sitemapImageUrls } from '$lib/js/sanityImages'

/** @type {import('./$types').PageServerLoad} */
export async function GET() {

    // const imagesFromPages = await client.fetch(sitemapQuery()).then(({ rawHomePageImages, rawMenuPageImages }) => {
    const imagesFromPages = await getSanityServerClient(false).fetch(sitemapQuery()).then(({ rawHomePageImages, rawMenuPageImages }) => {
  

      const homeNoNulls = rawHomePageImages.filter(data => data !== null)
      const menuNoNulls = rawMenuPageImages.filter(data => data !== null)

      const homePageImages = sitemapImageUrls(homeNoNulls)
      const menuPageImages = sitemapImageUrls(menuNoNulls)

      return {
        homePageImages,
        menuPageImages
      }
    })

    console.log(`imagesFromPages after removing nulls: ${JSON.stringify(imagesFromPages, null, 2)}`)

    const { homePageImages, menuPageImages } = imagesFromPages

    return new Response(
    `
    <?xml version="1.0" encoding="UTF-8" ?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
      <url>
        <loc>https://www.sunpressnj.com/</loc>
        <priority>0.85</priority>
        ${homePageImages.map(img => `
        <image:image>
          <image:loc>${img}</image:loc>
        </image:image>`).join("")}
      </url>
      <url>
        <loc>https://www.sunpressnj.com/menus/restaurant/</loc>
        <priority>0.85</priority>
        ${menuPageImages.map(img => `
        <image:image>
          <image:loc>${img}</image:loc>
        </image:image>`).join("")}
      </url>
      <url>
        <loc>https://www.sunpressnj.com/menus/catering/</loc>
        <priority>0.85</priority>
      </url>
      <url>
        <loc>https://www.sunpressnj.com/order-online/</loc>
        <priority>0.85</priority>
      </url>
    </urlset>`.trim(),
    {
      headers: {
        'Content-Type': 'application/xml'
      }
    }
  );
}
