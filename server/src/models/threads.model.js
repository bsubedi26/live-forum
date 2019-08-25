const { Model } = require('objection')

const TABLE_NAME = 'threads'

class Thread extends Model {
  static get tableName () {
    return TABLE_NAME
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['title', 'summary'],
      properties: {
        title: { type: 'string' },
        summary: { type: 'string' }
      }
    }
  }

  $beforeInsert () {
    this.created_at = this.updated_at = new Date()
  }

  $beforeUpdate () {
    this.updated_at = new Date()
  }
}

module.exports = function (app) {
  const knex = app.get('knex')

  knex.schema.hasTable(TABLE_NAME).then(exists => {
    if (!exists) {
      knex.schema.createTable(TABLE_NAME, table => {
        table.increments('id').primary()
        table.string('title').notNullable()
        table.string('summary').notNullable()
        table.timestamp('created_at')
        table.timestamp('updated_at')

        table.integer('topic_id').unsigned().references('id').inTable('topics')
        table.integer('creator_id').unsigned().references('id').inTable('users').onDelete('cascade')
      })
        .then(() => console.log(`Created ${TABLE_NAME} table`))
        .catch(e => console.error(`Error creating ${TABLE_NAME} table`, e))
    }
  })
    .catch(e => console.error(`Error creating ${TABLE_NAME} table`, e))

  return Thread
}
