import { Request, Response } from 'express'
import { HTTP401Error } from '../../utils/httpErrors'

export const searchRoutes = [
  {
    path: '/',
    method: 'get',
    handler: async (req: Request, res: Response) => {
      let err = new HTTP401Error()
      console.log('err', err.name)
      throw err
    },
  },
]
