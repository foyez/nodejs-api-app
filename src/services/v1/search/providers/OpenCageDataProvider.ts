import dotenv from 'dotenv'
import got from 'got'

dotenv.config()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getPlaces = async (query: string): Promise<any> => {
  const key = process.env.OPEN_CAGE_DATA_KEY
  const url = `https://api.opencagedata.com/geocode/v1/geojson?q=${query}&key=${key}&limit=20&no_annotations=1`
  // const res = await (await fetch(url)).json()
  const res = await got(url)

  return JSON.parse(res.body)
}
