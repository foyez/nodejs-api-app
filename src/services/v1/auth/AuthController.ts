import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import { HTTP400Error, HTTP401Error } from '../../../utils/httpErrors'
import { config } from '../../../config'

interface User {
  id: number
  hashPassword: string
}

let id = 1
const getId = (): number => id++
const users: Map<string, User> = new Map()

// const setPassword = (password: string, email: string): void => {
//   const hashPassword = bcrypt.hashSync(password, 8)
//   const id: number = getId()
//   users.set(email, { id, hashPassword })
// }

const generateJWT = (id: number): string => {
  return jwt.sign({ sub: id }, config.jwtSecretKey, {
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

  const user = users.get(email)
  if (!user || !validPassword(password, user.hashPassword)) {
    throw new HTTP401Error()
  }

  const token = generateJWT(user.id)

  return token
}

export const register = async (
  email: string,
  password: string,
): Promise<string> => {
  if (!email || !password) {
    throw new HTTP400Error()
  }

  const hashPassword = bcrypt.hashSync(password, 8)
  const id: number = getId()
  users.set(email, { id, hashPassword })

  const token = generateJWT(id)

  return token
}
