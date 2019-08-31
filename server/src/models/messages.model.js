module.exports = function (app) {
  const db = app.get('knex')
  const tableName = 'messages'
  db.schema.hasTable(tableName).then(exists => {
    if (!exists) {
      db.schema.createTable(tableName, table => {
        table.increments('id')
        table.string('text')
        table.string('channel')

        table.integer('creator_id').unsigned().references('users.id')
        table.timestamps(true, true)
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e))
    }
  })

  return db
}
