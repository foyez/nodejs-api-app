import { Request, Response } from 'express'
import { getPlacesByName } from './SearchController'
import { checkSearchParams } from '../../../middleware/checks'

export const searchRoutes = [
  {
    path: '/search',
    method: 'get',
    handler: [
      checkSearchParams,
      async ({ query }: Request, res: Response) => {
        const result = await getPlacesByName(query.q as string)

        res.status(200).send(result)
      },
    ],
  },
]
