/* eslint-disable @typescript-eslint/no-explicit-any */
import got from 'got'
import { getPlacesByName } from './SearchController'

jest.mock('got')

describe('SearchController', () => {
  test('a query string is less than 3', async () => {
    const result = await getPlacesByName('BD')
    expect(result).toMatchObject({
      type: 'FeatureCollection',
      features: [],
    })
  })

  test('response correct data', async () => {
    ;(got as any).mockResolvedValue({ body: '{"features":[]}' })

    const result = await getPlacesByName('Berlin')
    expect(result).toEqual({ features: [] })
  })
})
