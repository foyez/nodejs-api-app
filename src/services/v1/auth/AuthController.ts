import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import { HTTP400Error, HTTP401Error } from '../../../utils/httpErrors'
import { config } from '../../../config'

const users = new Map()

const setPassword = (password: string, email: string): void => {
  const hashPassword = bcrypt.hashSync(password, 8)
  users.set(email, hashPassword)
}

const generateJWT = (email: string): string => {
  return jwt.sign({ email }, config.jwtSecretKey, {
    // algorithm: 'ES256',
    expiresIn: 300,
  })
}

const validPassword = (password: string, hashPassword: string): boolean => {
  return bcrypt.compareSync(password, hashPassword)
}

export const authenticate = (email: string, password: string): string => {
  if (!email || !password) {
    throw new HTTP400Error()
  }

  const hashPassword = users.get(email)
  if (!validPassword(password, hashPassword)) {
    throw new HTTP401Error()
  }

  const token = generateJWT(email)

  return token
}

export const register = async (
  email: string,
  password: string,
): Promise<string> => {
  if (!email || !password) {
    throw new HTTP400Error()
  }

  await setPassword(password, email)

  const token = generateJWT(email)

  return token
}
