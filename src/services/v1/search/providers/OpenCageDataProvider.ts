import dotenv from 'dotenv'
import request from 'request-promise'

dotenv.config()

export const getPlaces = async (query: string): Promise<any> => {
  const key = process.env.OPEN_CAGE_DATA_KEY
  const url = `https://api.opencagedata.com/geocode/v1/geojson?q=${query}&key=${key}&limit=20&no_annotations=1`
  // const res = await (await fetch(url)).json()
  const res = await request(url)

  return JSON.parse(res)
}
