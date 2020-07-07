/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPlaces } from './providers/OpenCageDataProvider'

export const getPlacesByName = async (q: string): Promise<any> => {
  if (q.length < 3) {
    return {
      type: 'FeatureCollection',
      features: [],
    }
  }

  const places = await getPlaces(q)

  return places
}
