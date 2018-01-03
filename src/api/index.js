exports.plugin = {
  name: 'api-routes',
  version: '0.1.0',

  async register(server, options) {
    await server.register([
      {plugin: require('./health'), options},
      {plugin: require('./users'), options},
    ])
  },
}
