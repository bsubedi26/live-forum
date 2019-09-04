module.exports = function (app) {
  const db = app.get('knex')
  const tableName = 'messages'
  db.schema.hasTable(tableName).then(exists => {
    if (!exists) {
      db.schema.createTable(tableName, table => {
        table.increments('id')
        table.string('text').notNullable()
        table.string('channel').notNullable()

        table.integer('creator_id').notNullable().unsigned().references('users.id').onDelete('cascade')
        table.timestamps(true, true)
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e))
    }
  })

  return db
}
