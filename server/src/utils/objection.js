const { Model } = require('objection')

module.exports = function (app) {
  // const { client, connection } = app.get('mysql')
  const { client, connection } = app.get('sqlite3')
  const knexConfig = {
    client,
    connection,
    useNullAsDefault: true,
    pool: {
      afterCreate (conn, cb) {
        conn.run('PRAGMA foreign_keys = ON', cb)
      }
    }
  }
  const knex = require('knex')(knexConfig)

  Model.knex(knex)
  app.set('knex', knex)
}
