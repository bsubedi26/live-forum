const errors = require('@feathersjs/errors');

/*
 * A safety measure to prevent REST calls from deleting ALL records
 * when no id is provided 
*/
const preventChangeIfNoId = () => async hook => {
  // console.log('====================================');
  // console.log(_.omit(hook, ['app', 'service']));
  // console.log('====================================');
  if (!hook.id) {
    throw new errors.BadRequest('Must provide an `id` to remove/patch/update.');
  }

  return hook;
};

module.exports = preventChangeIfNoId;