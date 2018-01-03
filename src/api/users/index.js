const IndexRoute = ({basePath}) => ({
  method: 'GET',
  path: `${basePath}/users`,
  options: {
    handler: async (req, h) => {
      return [
        {name: 'Hapi'},
        {name: 'Node'},
        {name: 'RabbitMQ'},
        {name: 'MongoDB'},
      ]
    },
    tags: ['api', 'users'],
    description: 'List users',
    notes: 'List users',
    plugins: {
      'hapi-swagger': {order: 1},
    },
  },
})

exports.plugin = {
  name: 'users-routes',
  version: '0.1.0',

  async register(server, {api}) {
    server.route([IndexRoute(api)])

    server.log('info', 'Plugin registered: users-routes')
  },
}
