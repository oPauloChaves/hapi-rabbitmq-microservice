const Joi = require('joi')

const envVarsSchema = Joi.object({
  PORT: Joi.number().required(),
  HOST: Joi.string().default('0.0.0.0'),
})
  .unknown()
  .required()

const {error, value: envVars} = Joi.validate(process.env, envVarsSchema)
if (error) {
  throw new Error(`Server Config validation error: ${error.message}`)
}

module.exports = {
  server: {
    port: envVars.PORT,
    host: envVars.HOST,
  },
}
