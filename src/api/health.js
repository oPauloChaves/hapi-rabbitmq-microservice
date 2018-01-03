const IndexRoute = ({basePath}) => ({
  method: 'GET',
  path: `${basePath}/`,
  options: {
    handler: async (req, h) => {
      return {message: 'The API is running'}
    },
    tags: ['api', 'health'],
    description: 'Check API health',
    notes: 'Check API health',
    plugins: {
      'hapi-swagger': {order: 1},
    },
  },
})

exports.plugin = {
  name: 'health-route',
  version: '1.0.0',

  async register(server, {api}) {
    server.route([IndexRoute(api)])
    // server.log('info', `${api.basePath}/ registered`)
  },
}
