const Path = require('path')
const Joi = require('joi')

const envVarsSchema = Joi.object({
  MONGODB_URI: Joi.string()
    .uri({scheme: 'mongodb'})
    .required(),
})
  .unknown()
  .required()

const {error, value: envVars} = Joi.validate(process.env, envVarsSchema)
if (error) {
  throw new Error(`Mongo Config validation error: ${error.message}`)
}

// TODO set `autoIndex` to false in production, also production `settings`
module.exports = {
  mongo: {
    uri: envVars.MONGODB_URI,
    decorate: true,
    baseDir: Path.join(__dirname, '..', 'domain'),
    models: [
      {
        name: 'survivors',
        path: 'survivors/model',
      },
    ],
  },
}
