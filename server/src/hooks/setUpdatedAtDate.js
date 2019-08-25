module.exports = function () {
  return async hook => {
    if (hook.method === 'patch') {
      const knex = hook.app.get('knex')
      const date = knex.fn.now()
      hook.data = { ...hook.data, updated_at: date }
    }

    return hook
  }
}
