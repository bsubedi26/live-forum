const errors = require('feathers-errors');
const t = require('tcomb-validation');

/*
 * USAGE: validate(service, schema, {options})
 * Given a feathers service, a tcomb schema and optional options for tcomb-validation,
 * will add a before hook to create, update, and patch methods to validate the incoming data.
 * On error, returns a feathers-errors BadRequest.
*/

module.exports = (service, schema, options) => {
  const validateHook = createValidateHook_(schema, options);

  service.hooks({
    before: {
      create: validateHook,
      update: validateHook,
      patch (hook, next) {
        // validate the full object so first get the current object
        // then apply the patch in memory, then validate this full patched object
        return service.get(hook.id)
        .then(data => {
          const vhookObject = Object.assign({}, hook, {
            data: Object.assign(data, hook.data)
          });
          return validateHook(vhookObject, next);
        })
        .catch(err => {
          return next(err);
        });
      }
    }
  });

};

const createValidateHook_ = (schema, options) => {
  return function validateHook (hook, next) {
    const result = t.validate(hook.data, schema, options);

    if (!result.isValid()) {
      const err = new Error('Invalid Request: Validation Error.');
      err.errors = result.errors;
      next(new errors.BadRequest(err, result.value));
    } else {
      next();
    }
  };
};
