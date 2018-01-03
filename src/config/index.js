const common = require('./common')
const server = require('./server')
const swagger = require('./swagger')(common)
const logging = require('./logging')
// const mongo = require('./mongo')

module.exports = Object.assign({}, common, server, swagger, logging)
