import { Request, Response } from 'express'
import { authenticate, register } from './AuthController'

export const authRoutes = [
  {
    path: '/signup',
    method: 'post',
    handler: [
      async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body
        const token = await register(email, password)

        res.status(200).send({ auth: true, token })
      },
    ],
  },
  {
    path: '/signin',
    method: 'post',
    handler: [
      async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body
        const token = await authenticate(email, password)

        res.status(200).send({ auth: true, token })
      },
    ],
  },
]
