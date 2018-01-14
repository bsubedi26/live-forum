// Initializes the `messages` service on path `/comment`
const createService = require('feathers-knex');
const createModel = require('models/comment.model');
const hooks = require('./hooks');

const t = require('tcomb');
const validate = require('../../lib/validate');

const schema = t.struct({
  comment: t.String,
  thread_id: t.Integer,
  creator_id: t.Integer
});

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'comments',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/comments', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('comments');

  validate(service, schema);
  service.hooks(hooks);
  app.publish(() => {
    // Here you can add event publishers to channels set up in `channels.js`
    // To publish only for a specific event use `app.publish(eventname, () => {})`

    // e.g. to publish all service events to all authenticated users use
    // return app.channel('authenticated');
    return app.channel('authenticated', 'anonymous');
  });
};
