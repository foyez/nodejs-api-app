import { Router } from 'express'

const path = require('path')
const swaggerUi = require('swagger-ui-express')
const swaggerPath = path.resolve(__dirname, './swagger.yml')

const YAML = require('yamljs')
const swaggerDocument = YAML.load(swaggerPath)

export const handleAPIDocs = (router: Router) =>
  router.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
