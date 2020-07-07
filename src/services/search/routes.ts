import { Request, Response } from 'express'
import { getPlacesByName } from './SearchController'

export const searchRoutes = [
  {
    path: '/api/v1/search',
    method: 'get',
    handler: [
      async ({ query }: Request, res: Response) => {
        const result = await getPlacesByName(query.q as string)

        res.status(200).send(result)
      },
    ],
  },
]
