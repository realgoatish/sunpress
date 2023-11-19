import { mapOpeningHoursSEO } from '$lib/js/mapHoursOfOperation'

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

export const processOrderOnlinePage = (data) => {

  return data
}