const { Model } = require('objection')

const TABLE_NAME = 'topics'

class Topic extends Model {
  static get tableName () {
    return TABLE_NAME
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['name', 'display'],
      properties: {
        name: { type: 'string' },
        display: { type: 'string' }
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
        table.increments('id')
        table.string('name').notNullable()
        table.string('display').notNullable()

        table.timestamp('created_at')
        table.timestamp('updated_at')
      })
        .then(() => console.log(`Created ${TABLE_NAME} table`))
        .catch(e => console.error(`Error creating ${TABLE_NAME} table`, e))
    }
  })
    .catch(e => console.error(`Error creating ${TABLE_NAME} table`, e))

  return Topic
}
