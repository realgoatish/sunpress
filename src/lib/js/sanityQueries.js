import { test } from '$lib/js/sanityImages';

// siteName,
// siteDescription,

export const layoutQuery = () => `*[_type == "siteSettings"]{
  address,
  openingHours,
  logo{
    alt,
    image
  },
  "business": {
    "name": siteName,
    "description": siteDescription,
    address,
    logo,
    openingHours
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

// "unprocessedImageUrl": image.asset._ref

// TODO you'll have to query this by some field that's not editable long-term
export const homePageQuery = () => `*[_type == "page" && title == "Home"]{
  "currentPage": {
    "datePublished": _createdAt,
    "dateModified": _updatedAt,
    figure,
    title,
    description
  },
  body[]
}[0]`;

export const menuPageQuery = () => `*[_type == "page" && menu == true]{
  "slug": slug.current,
  title,
  description,
  "currentPage": {
    "datePublished": _createdAt,
    "dateModified": _updatedAt,
    figure,
    title,
    description
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
        figure,
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
