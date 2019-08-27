/**
 * UPDATE TO THE CURRENT DATE FOR COLUMN UPDATED_AT WHEN ANY PATCH METHODS ARE CALLED
 * @param {Object} app
 */

export default function updateAtDate (app) {
  app.hooks({
    before: {
      patch: async hook => {
        hook.data = { ...hook.data, updated_at: new Date() }
        return hook
      }
    }
  })
}
