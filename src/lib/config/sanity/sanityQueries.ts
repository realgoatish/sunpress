import groq from 'groq';

export const layoutQuery = () => `*[_type == "siteSettings"]{
  localBusiness{
    ...,
    logo{
      ...,
      ...(image.asset-> {
        "image": {
          "fullSize": url
        }
      })
    }
  },
  address,
  openingHours,
  logo{
    ...,
    ...(image.asset-> {
      "image": {
        "mobile": url + "?w=800&auto=format",
        "tablet": url + "?w=1600&auto=format",
        "desktop": url + "?w=2400&auto=format",
        "fullSize": url + "?auto=format",
        "sourceImage": url
      }
    })
  },
  navigationSections[]->{
    title,
    description,
    "id": navigationId.current,
    items[]{
      text,
      description,
      "link": navigationItemUrl{
        "internal": internalLink{
          _type == "reference" => @->{
            "url": slug.current
          }
        },
        externalUrl
      }
    }
  }
}[0]`;

const homeFields = groq`
  ...,
  "slug": slug.current,
  webPageSeo{
    ...,
    openGraph{
      ...,
      ogImage{
        ...,
        ...(image.asset-> {
          "image": {
            "twitter": url + "?w=800&h=418&auto=format",
            "facebook": url + "?w=1200&h=630&auto=format",
            "fullSize": url + "?auto=format",
            "sourceImage": url
          }
        })
      }
    }
  },
  body[]{
    ...,
    _type == "figure" => {
      ...,
      ...(image.asset-> {
        "image": {
          "mobile": url + "?w=800&auto=format",
          "tablet": url + "?w=1600&auto=format",
          "desktop": url + "?w=2400&auto=format",
          "fullSize": url + "?auto=format",
          "sourceImage": url
        }
      })
    },
  }
`

  // ...,
  // webPageSeo{
  //   ...,
  //   openGraph{
  //     ...,
  //     ogImage{
  //       ...,
  //       ...(image.asset-> {
  //         "image": {
  //           "twitter": url + "?w=800&h=418&auto=format",
  //           "facebook": url + "?w=1200&h=630&auto=format",
  //           "fullSize": url + "?auto=format",
  //           "sourceImage": url
  //         }
  //       })
  //     }
  //   }
  // },
  // body[]{
  //   ...,
  //   _type == "figure" => {
  //     ...,
  //     ...(image.asset-> {
  //       "image": {
  //         "mobile": url + "?w=800&auto=format",
  //         "tablet": url + "?w=1600&auto=format",
  //         "desktop": url + "?w=2400&auto=format",
  //         "fullSize": url + "?auto=format",
  //         "sourceImage": url
  //       }
  //     })
  //   },
  // }

// TODO you'll have to query this by some field that's not editable long-term
// export const homePageQuery = () => `*[_type == "page" && title == "Home"]{
export const homePageQuery = groq`*[_type == "page" && title == "Home"]{
  ${homeFields}
}[0]`;

export const postQuery = groq`
{
  "draft": *[_type == "page" && home == true && slug.current == $slug && defined(draft) && draft == true][0]{
    ${homeFields}
  },
  "post": *[_type == "page" && home == true && slug.current == $slug] | order(_updatedAt desc) [0] {
    ${homeFields}
  },
  "morePosts": *[_type == "page" && home == true && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    ${homeFields}
  }
}`;

export const postBySlugQuery = groq`
*[_type == "page" && home == true && slug.current == $slug][0] {
  ${homeFields}
}
`;

// export const menuPageQuery = () => `*[_type == "page" && menu == true]{
export const menuPageQuery = groq`*[_type == "page" && menu == true]{
  "slug": slug.current,
  title,
  description,
  webPageSeo{
    ...,
    openGraph{
      ...,
      ogImage{
        ...,
        ...(image.asset-> {
          "image": {
            "twitter": url + "?w=800&h=418&auto=format",
            "facebook": url + "?w=1200&h=630&auto=format",
            "fullSize": url + "?auto=format",
            "sourceImage": url
          }
        })
      }
    }
  },
  body[]{
    ...,
    _type == "menuSectionReference" => @->{
      "id": menuSectionId.current,
      title,
      description,
      mods[]->{
        title,
        "id": menuSectionModsId.current,
        mods[]->{
          name,
          price
        }
      },
      items[]->{
        "id": menuItemId.current,
        figure{
          ...,
          ...(image.asset-> {
            "image": {
              "mobile": url + "?w=800&auto=format",
              "tablet": url + "?w=1600&auto=format",
              "desktop": url + "?w=2400&auto=format",
              "fullSize": url + "?auto=format",
              "sourceImage": url
            }
          })
        },
        title,
        price,
        description,
        mods[]->{
          name,
          price
        }
      }
    }
  }
}[0]`;

export const sitemapQuery = () => `{
  "rawMenuPageImages": *[_type == "page" && menu == true].body[]->items[]->.figure,
  "rawHomePageImages": *[_type == "page" && menu == false].body[][_type == "figure"]
}`;
