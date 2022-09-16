export const layoutQuery = () => `*[_type == "siteSettings"]{
  title,
  description,
  address,
  openingHours,
  logo{
    alt,
    "unprocessedImageUrl": image.asset._ref
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
  title,
  body[]
}[0]`;

export const menuPageQuery = () => `*[_type == "page" && menu == true]{
  title,
  body[]
}[0]`;
