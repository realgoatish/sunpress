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

// TODO you'll have to query this by some field that's not editable long-term
export const homePageQuery = () => `*[_type == "page" && title == "Home"]{
  ...,
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
}[0]`;

export const menuPageQuery = () => `*[_type == "page" && menu == true]{
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
