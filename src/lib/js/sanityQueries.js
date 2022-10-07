import { test } from '$lib/js/sanityImages';

export const layoutQuery = () => `*[_type == "siteSettings"]{
  siteName,
  siteDescription,
  address,
  openingHours,
  logo{
    alt,
    image
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
  _createdAt,
  _updatedAt,
  title,
  description,
  figure,
  body[]
}[0]`;

export const menuPageQuery = () => `*[_type == "page" && menu == true]{
  _createdAt,
  _updatedAt,
  "slug": slug.current,
  title,
  description,
  figure,
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
