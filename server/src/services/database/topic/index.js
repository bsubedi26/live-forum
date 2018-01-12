// Initializes the `topic` service on path `/topic`
const createService = require('feathers-knex');
const createModel = require('models/topic.model');
const hooks = require('./hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'topic',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/topic', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('topic');

  service.hooks(hooks);
};
