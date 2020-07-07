import path from 'path'
import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'

const swaggerPath = path.resolve(__dirname, './swagger.yml')
const swaggerDocument = YAML.load(swaggerPath)

export const handleAPIDocs = (router: Router): Router =>
  router.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
