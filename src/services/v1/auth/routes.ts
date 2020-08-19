import { Request, Response } from 'express'
import {
  authenticate,
  register,
  generateAccessToken,
  deleteAccessToken,
} from './AuthController'

const options = {
  path: '/refresh',
  maxAge: 1000 * 60 * 60 * 24 * 30, // would expire after 30 days
  httpOnly: true,
  secure: false,
  signed: false,
}

export const authRoutes = [
  {
    path: '/signup',
    method: 'post',
    handler: [
      async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body
        const { accessToken, refreshToken } = await register(email, password)

        res
          .cookie('refreshToken', refreshToken, options)
          .status(200)
          .send({ auth: true, accessToken })
      },
    ],
  },
  {
    path: '/signin',
    method: 'post',
    handler: [
      async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body
        const { accessToken, refreshToken } = await authenticate(
          email,
          password,
        )

        res
          .cookie('refreshToken', refreshToken, options)
          .status(200)
          .send({ auth: true, accessToken })
      },
    ],
  },
  {
    path: '/refresh/token',
    method: 'get',
    handler: [
      async (req: Request, res: Response): Promise<void> => {
        const { refreshToken } = req.cookies
        const accessToken = generateAccessToken(refreshToken)

        res.status(200).send({ auth: true, accessToken })
      },
    ],
  },
  {
    path: '/delete/token',
    method: 'delete',
    handler: [
      async (req: Request, res: Response): Promise<void> => {
        const { refreshToken } = req.cookies
        deleteAccessToken(refreshToken)

        res.status(200).send({ message: 'logged out successfully.' })
      },
    ],
  },
  {
    path: '/signup',
    method: 'get',
    handler: [
      (req: Request, res: Response): void => {
        res.status(200).send(`
          <h1>Sign up Form</h1>
          <form action='/api/v1/signup' method='POST'>
            <div style="margin-bottom: 10px">
              <label for="email">Your email:</label>
              <input id="email" name="email" type="text" />
            </div>
            <div style="margin-bottom: 10px">
              <label for="password">Your password:</label>
              <input id="password" name="password" type="password" />
            </div>
          
            <input type="hidden" name="_csrf" value="${req.csrfToken()}" />
            <p>CSRF Token: ${req.csrfToken()}</p>
            <input type="submit" value="Submit" />
          </form>
        `)
      },
    ],
  },
  {
    path: '/login',
    method: 'get',
    handler: [
      (req: Request, res: Response): void => {
        res.status(200).send(`
          <h1>Sign in Form</h1>
          <form action='/api/v1/signin' method='POST'>
            <div style="margin-bottom: 10px">
              <label for="email">Your email:</label>
              <input id="email" name="email" type="text" />
            </div>
            <div style="margin-bottom: 10px">
              <label for="password">Your password:</label>
              <input id="password" name="password" type="password" />
            </div>
          
            <input type="hidden" name="_csrf" value="${req.csrfToken()}" />
            <p>CSRF Token: ${req.csrfToken()}</p>
            <input type="submit" value="Submit" />
          </form>
        `)
      },
    ],
  },
]
