import { Request, Response } from 'express'
import { getPlacesByName } from './SearchController'
import { checkSearchParams } from '../../../middleware/checks'
import { authenticate } from '../../../middleware/authenticate'
import { getFromCache } from '../../../middleware/caching'

export const searchRoutes = [
  {
    path: '/search',
    method: 'get',
    handler: [
      checkSearchParams,
      getFromCache,
      async ({ query }: Request, res: Response): Promise<void> => {
        const result = await getPlacesByName(query.q as string)

        res.status(200).send(result)
      },
    ],
  },
  {
    path: '/search/protected',
    method: 'get',
    handler: [
      authenticate,
      checkSearchParams,
      getFromCache,
      async ({ query }: Request, res: Response): Promise<void> => {
        const result = await getPlacesByName(query.q as string)

        res.status(200).send(result)
      },
    ],
  },
  {
    path: '/test/protected',
    method: 'get',
    handler: [
      authenticate,
      (req: Request, res: Response): void => {
        res.status(200).send('Hello World')
      },
    ],
  },
]
