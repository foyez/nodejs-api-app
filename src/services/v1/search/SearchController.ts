/* eslint-disable @typescript-eslint/no-explicit-any */
import { i18n } from '../../../config/i18n'
import { getPlaces } from './providers/OpenCageDataProvider'
import { redisClient } from '../../../config/cache'

export const getPlacesByName = async (q: string): Promise<any> => {
  if (q.length < 3) {
    return {
      type: 'FeatureCollection',
      message: i18n.__('search.query_length', {
        firstName: 'Foyez',
      }),
      features: [],
    }
  }

  const places = await getPlaces(q)
  redisClient.set(`search-${q}`, JSON.stringify(places))

  return places
}
