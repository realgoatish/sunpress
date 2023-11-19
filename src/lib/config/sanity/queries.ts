import groq from 'groq';

// const layoutFields = groq`
//   localBusiness{
//     ...,
//     logo{
//       ...,
//       ...(image.asset-> {
//         "image": {
//           "fullSize": url
//         }
//       })
//     }
//   },
//   address,
//   openingHours,
//   logo{
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
//   navigationSections[]->{
//     title,
//     description,
//     "id": navigationId.current,
//     items[]{
//       text,
//       description,
//       "link": navigationItemUrl{
//         "internal": internalLink{
//           _type == "reference" => @->{
//             "url": slug.current
//           }
//         },
//         externalUrl
//       }
//     }
//   }
// `

const layoutFields = groq`
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
  id != "order-online-nav" => {
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
  }
`

export const layoutQuery = groq`*[_type == "siteSettings"] [0] {
  ${layoutFields}
}`

export const homePageFields = groq`
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

export const homePageQuery = groq`*[_type == "page" && home == true] [0] {
  ${homePageFields}
}`;

export const homePagePreviewQuery = groq`*[_type == "page" && home == true] | order(date desc, _updatedAt desc) [0] {
  ${homePageFields}
}`

export const pageBySlugQuery = (pageQueryFields) => {
  const query = groq`
  *[_type == "page" && slug.current == $slug][0] {
    ${pageQueryFields}
  }`

  return query
}

export const pageSlugQuery = groq`*[_type == "page" && slug.current == $slug] [0] {
  "slug": slug.current
}`

export const menuPageFields = groq`
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
`

export const menuPageQuery = groq`*[_type == "page" && menu == true] [0] {
  ${menuPageFields}
}`;

export const menuPagePreviewQuery = groq`*[_type == "page" && menu == true] | order(date desc, _updatedAt desc) [0] {
  ${menuPageFields}
}`

export const orderOnlinePageFields = groq`
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
    _type == "navigationReference" => @->{
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

  }
`

export const orderOnlinePageQuery = groq`*[_type == "page" && slug.current == "/order-online/"] [0] {
  ${orderOnlinePageFields}
}`

export const orderOnlinePagePreviewQuery = groq`*[_type == "navigation" && slug.current == "/order-online/"] | order(date desc, _updatedAt desc) [0] {
  ${orderOnlinePageFields}
}`

export const sitemapQuery = () => `{
  "rawMenuPageImages": *[_type == "page" && menu == true].body[]->items[]->.figure,
  "rawHomePageImages": *[_type == "page" && menu == false].body[][_type == "figure"]
}`;
