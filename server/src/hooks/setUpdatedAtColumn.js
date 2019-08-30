const updatedAtColumn = 'updated_at'

module.exports = async context => {
  if (context.method === 'patch') {
    const knex = context.app.get('knex')
    const date = knex.fn.now()
    context.data = { ...context.data, [updatedAtColumn]: date }
  }

  return context
}
