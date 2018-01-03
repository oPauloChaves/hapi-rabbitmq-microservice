const IndexRoute = {
  method: 'GET',
  path: '/',
  options: {
    handler: async request => {
      return {message: 'Hello, World!'}
    },
  },
}

module.exports = {
  async register(server) {
    server.route([IndexRoute])
    server.log('info', `Routes registered`)
  },
}
