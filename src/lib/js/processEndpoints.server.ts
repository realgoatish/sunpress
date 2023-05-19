import { processLayoutLogoUrl } from '$lib/js/sanityImages'
import { mapOpeningHoursSEO } from '$lib/js/mapHoursOfOperation'
import { processMenuImageUrls, processPageSeoImageUrls, processBlockImageUrls } from '$lib/js/sanityImages'


export const processLayout = (data) => {

  const processedResponse = {
    ...data,
    localBusiness: {
      ...data?.localBusiness,
      openingHours: mapOpeningHoursSEO(data?.localBusiness?.openingHours)
    }
  }
  
  return processedResponse
}

export const processPage = (data) => {

  return data

}

export const processMenuPage = (data) => {

  return data
}