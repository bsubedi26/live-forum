const TABLE_NAME = 'threads'

module.exports = function (app) {
  const knex = app.get('knex')

  knex.schema.hasTable(TABLE_NAME).then(exists => {
    if (!exists) {
      knex.schema.createTable(TABLE_NAME, table => {
        table.increments('id').primary()
        table.string('title').notNullable()
        table.string('summary').notNullable()
        table.timestamps(true, true)

        table.integer('topic_id').unsigned().references('topics.id').onDelete('cascade')
        table.integer('creator_id').unsigned().references('users.id').onDelete('cascade')
      })
        .then(() => console.log(`Created ${TABLE_NAME} table`))
        .catch(e => console.error(`Error creating ${TABLE_NAME} table`, e))
    }
  })
    .catch(e => console.error(`Error creating ${TABLE_NAME} table`, e))

  return knex
}
