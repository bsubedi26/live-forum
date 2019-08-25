const { Model } = require('objection')

const TABLE_NAME = 'comments'

class Comment extends Model {
  static get tableName () {
    return TABLE_NAME
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['comment'],

      properties: {
        comment: { type: 'string' }
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
        table.string('comment').notNullable()

        table.integer('thread_id').unsigned().references('id').inTable('threads').onDelete('cascade')
        table.integer('creator_id').unsigned().references('id').inTable('users').onDelete('cascade')

        table.timestamp('created_at')
        table.timestamp('updated_at')
      })
        .then(() => console.log(`Created ${TABLE_NAME} table`))
        .catch(e => console.error(`Error creating ${TABLE_NAME} table`, e))
    }
  })
    .catch(e => console.error(`Error creating ${TABLE_NAME} table`, e))

  return Comment
}
