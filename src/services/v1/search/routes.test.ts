/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Router } from 'express'
import request from 'supertest'
import got from 'got'

import { applyMiddleware, applyRoutes } from '../../../utils'
import { middleware } from '../../../middleware'
import { v1Routes } from '../index'
import { errorHandlers } from '../../../middleware/errorHandlers'

jest.mock('got')
;(got as any).mockResolvedValue({ body: '{"features": []}' })

describe('search routes', () => {
  let router: Router

  beforeEach(() => {
    router = express()
    applyMiddleware(middleware, router)
    applyRoutes('/api/v1', v1Routes, router)
    applyMiddleware(errorHandlers, router)
  })

  test('a valid string query', async () => {
    const response = await request(router).get('/api/v1/search?q=Berlin')
    expect(response.status).toBe(200)
  })

  test('a non-existing api method', async () => {
    const response = await request(router).get('/api/v11/search')
    expect(response.status).toBe(404)
  })

  test('an empty string', async () => {
    const response = await request(router).get('/api/v1/search?q=')
    expect(response.status).toBe(400)
  })
})
