/**
 * Sqlite adds t.json() data types as text,
 * therefore, stringify all the incoming json body data
*/
const stringifyJsonForSqlite = () => async ctx => {
  if (ctx && ctx.data) {
    for (const key in ctx.data) {
      if (typeof ctx.data[key] === 'object') {
        ctx.data[key] = JSON.stringify(ctx.data[key])
      }
    }
  }

  return ctx
}

const isSqlite = () => async ctx => {
  const knex = ctx.app.get('knex')
  return (knex.client.config.client === 'sqlite3')
}

module.exports = {
  stringifyJsonForSqlite,
  isSqlite
}
