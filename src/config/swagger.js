const Joi = require('joi')

const envVarsSchema = Joi.object({
  PORT: Joi.number().required(),
  SWAGGER_HOST: Joi.string().optional(),
  SWAGGER_DOCPATH: Joi.string().default('/docs'),
})
  .unknown()
  .required()

const {error, value: envVars} = Joi.validate(process.env, envVarsSchema)
if (error) {
  throw new Error(`Swagger Config validation error: ${error.message}`)
}

module.exports = ({isProd, api, pack}) => ({
  swagger: {
    basePath: api.basePath,
    documentationPath: envVars.SWAGGER_DOCPATH,
    host: envVars.SWAGGER_HOST || `localhost:${PORT}`,
    schemes: isProd ? ['https'] : ['http'],
    jsonEditor: true,
    pathPrefixSize: 2,
    info: {
      title: 'API Documentation',
      description: 'API documentation',
      contact: pack.author,
      version: pack.version,
    },
    tags: [
      {
        name: 'users',
        description: 'Endpoints for managing users',
      },
    ],
    grouping: 'tags',
    sortEndpoints: 'ordered',
  },
})
