import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import randToken from 'rand-token'

import { HTTP400Error, HTTP401Error } from '../../../utils/httpErrors'
import { envVars } from '../../../config/envVars'
import { createUser, getUserByEmail, getUserByRefreshToken } from './AuthModel'

interface User {
  id: number
  hashPassword: string
  refreshToken: string
}

interface Response {
  accessToken: string
  refreshToken: string
}

let id = 1
const getId = (): number => id++
const users: Map<string, User> = new Map()

const generateJWT = (id: number): string => {
  return jwt.sign({ sub: id }, envVars.jwtSecretKey, {
    // algorithm: 'ES256',
    expiresIn: 300,
  })
}

const validPassword = (password: string, hashPassword: string): boolean => {
  return bcrypt.compareSync(password, hashPassword)
}

export const authenticate = async (
  email: string,
  password: string,
): Promise<Response> => {
  if (!email || !password) {
    throw new HTTP400Error()
  }

  const user = await getUserByEmail(email)
  if (!user || !validPassword(password, user.hash_password)) {
    throw new HTTP401Error()
  }

  const accessToken = generateJWT(user.id)

  return { accessToken, refreshToken: user.refresh_token }
}

export const register = async (
  email: string,
  password: string,
): Promise<Response> => {
  if (!email || !password) {
    throw new HTTP400Error()
  }

  const hashPassword = bcrypt.hashSync(password, 8)
  const refreshToken = randToken.uid(256)
  const id: number = getId()
  users.set(email, { id, hashPassword, refreshToken })

  try {
    const id = await createUser(email, hashPassword, refreshToken)
    const accessToken = generateJWT(id)

    return { accessToken, refreshToken }
  } catch (err) {
    throw new HTTP400Error('This email already exists')
  }
}

export const generateAccessToken = async (
  refreshToken: string,
): Promise<string> => {
  const user = await getUserByRefreshToken(refreshToken)

  if (!user) {
    throw new HTTP401Error()
  }

  const accessToken = generateJWT(user.id)

  return accessToken
}

export const deleteAccessToken = (refreshToken: string): boolean => {
  const user = Array.from(users.entries()).find(
    (item) => item[1].refreshToken === refreshToken,
  )

  if (!user) {
    throw new HTTP401Error()
  }

  const isTokenDeleted = users.delete(user[0])

  if (!isTokenDeleted) {
    throw new HTTP400Error()
  }

  return isTokenDeleted
}
