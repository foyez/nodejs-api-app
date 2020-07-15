import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import randToken from 'rand-token'

import { HTTP400Error, HTTP401Error } from '../../../utils/httpErrors'
import { config } from '../../../config'

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
  return jwt.sign({ sub: id }, config.jwtSecretKey, {
    // algorithm: 'ES256',
    expiresIn: 300,
  })
}

const validPassword = (password: string, hashPassword: string): boolean => {
  return bcrypt.compareSync(password, hashPassword)
}

export const authenticate = (email: string, password: string): Response => {
  if (!email || !password) {
    throw new HTTP400Error()
  }

  const user = users.get(email)
  if (!user || !validPassword(password, user.hashPassword)) {
    throw new HTTP401Error()
  }

  const accessToken = generateJWT(user.id)
  const { refreshToken } = user

  return { accessToken, refreshToken }
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

  const accessToken = generateJWT(id)

  return { accessToken, refreshToken }
}

export const generateAccessToken = (refreshToken: string): string => {
  const user = Array.from(users.values()).find(
    (item) => item.refreshToken === refreshToken,
  )

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
