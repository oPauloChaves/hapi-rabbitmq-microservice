const Hapi = require('hapi')
const Path = require('path')
const Inert = require('inert')
const Vision = require('vision')
const Blipp = require('blipp')
const Dotenv = require('dotenv')
const {NODE_ENV = 'development'} = process.env

if (NODE_ENV !== 'production') {
  Dotenv.config({path: Path.resolve(__dirname, '..', '.env')})
}

const config = require('./config')
const Routes = require('./api')

// register plugins, configure views and start the server instance
async function start() {
  try {
    // create new server instance and connection information
    const server = new Hapi.Server({
      host: config.server.host,
      port: config.server.port,
    })

    await server.register([
      Inert,
      Vision,
      Blipp,
      {plugin: require('good'), options: config.logging},
      {plugin: require('hapi-swagger'), options: config.swagger},
      {plugin: Routes, options: config},
    ])

    await server.start()

    server.log('info', `Server started → ${server.info.uri}`)
    return server
  } catch (err) {
    throw err
  }
}

module.exports = {start, config}
