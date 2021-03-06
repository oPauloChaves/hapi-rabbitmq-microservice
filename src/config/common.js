const Joi = require('joi')
const Package = require('../../package')

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    .required(),
})
  .unknown()
  .required()

const {error, value: envVars} = Joi.validate(process.env, envVarsSchema)
if (error) {
  throw new Error(`Common Config validation error: ${error.message}`)
}

module.exports = {
  env: envVars.NODE_ENV,
  isDev: envVars.NODE_ENV === 'development',
  isProd: envVars.NODE_ENV === 'production',
  isTest: envVars.NODE_ENV === 'test',
  api: {
    basePath: '/api',
  },
  pack: Package,
}
