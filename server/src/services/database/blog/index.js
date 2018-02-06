// Initializes the `topic` service on path `/topic`
const createService = require('feathers-knex');
const createModel = require('models/blog.model');
const hooks = require('./hooks');

module.exports = function (app) {
  const Model = createModel(app);
  // const paginate = app.get('paginate');

  const options = {
    name: 'blog',
    Model,
    paginate: {
      default: 5,
      max: 25
    },
  };

  // Initialize our service with any options it requires
  app.use('/blog', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('blog');
  service.hooks(hooks);
};
