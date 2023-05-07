import { processLayoutLogoUrl } from '$lib/js/sanityImages'
import { mapOpeningHoursSEO } from '$lib/js/mapHoursOfOperation'
import { processMenuImageUrls, processPageSeoImageUrls, processBlockImageUrls } from '$lib/js/sanityImages'


export const processLayout = (data) => {
  // console.log(`raw data at beginning of processLayout: ${JSON.stringify(data, null, 2)}`)

  const processedResponse = {
    ...data,
    localBusiness: {
      ...data.localBusiness,
      openingHours: mapOpeningHoursSEO(data.localBusiness.openingHours)
    }
  }
  
  return processedResponse
}

export const processPage = (data) => {

  return data

}

export const processMenuPage = (data) => {
  // console.log(`raw data at beginning of processMenuPage: ${JSON.stringify(data, null, 2)}`)

  // // get only the menuSections from response body
  // const menuSections = data.body.filter((item) => item._type === 'menuSectionReference')

  // const processedMenuSections = menuSections.map((section) => {
  //   // do any items in this menuSection have images?
  //   let itemsWithImages = section.items.filter((item) => item?.figure)
  //   // if not, just return the section
  //   if (!itemsWithImages.length) {
  //     return section
  //   }
  //   // if so, process the image refs to give us our sanity image URLs
  //   let processedMenuItemImages = processMenuImageUrls(itemsWithImages)
  //   // replace the old menu items with the ones we just processed
  //   section.items = section.items.map((obj) => processedMenuItemImages.find((o) => o.id === obj.id) || obj)

  //   return section

  // })

  // // replace the image objects with matching _key properties on the cloned response
  // // body with the new ones you just created
  // const newBody = data.body.map((obj) => processedMenuSections.find((o) => o._key === obj._key) || obj);

  // data.body = newBody

  // data.currentPage.figure = processPageSeoImageUrls(data.currentPage.figure)

  return data
}