import { dbClient } from '../../../config/db'

interface User {
  id: number
  email: string
  hash_password: string
  refresh_token: string
}

export const createUser = async (
  email: string,
  hashPassword: string,
  refreshToken: string,
): Promise<number> => {
  const res = await dbClient.query(
    'INSERT INTO "users" (email, hash_password, refresh_token) VALUES($1, $2, $3) RETURNING id',
    [email, hashPassword, refreshToken],
  )

  return res.rows[0].id
}

export const getUserByEmail = async (email: string): Promise<User> => {
  const res = await dbClient.query('SELECT * FROM "users" WHERE email=$1', [
    email,
  ])

  return res.rows[0]
}

export const getUserByRefreshToken = async (
  refreshToken: string,
): Promise<User> => {
  const res = await dbClient.query(
    'SELECT * FROM "users" WHERE refresh_token=$1',
    [refreshToken],
  )

  return res.rows[0]
}
