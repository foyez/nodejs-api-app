const path = require('path')
const swaggerUi = require('swagger-ui-express')
const swaggerPath = path.resolve(__dirname, './swagger.yml')

const YAML = require('yamljs')
const swaggerDocument = YAML.load(swaggerPath)

export const swaggerRouter = [swaggerUi.serve, swaggerUi.setup(swaggerDocument)]
