/* eslint-disable no-console */
module.exports = function (app) {
  const knex = app.get('knexClient');
  const tableName = 'topic';

  knex.schema.hasTable(tableName).then(exists => {
    // if (exists) {
    //   knex.schema.table(tableName, table => {
    //     table.index('idx_blah');
    //   })
    //     .then(() => console.log(`INDEXED ${tableName} table`))
    //     .catch(e => console.error(`Error creating ${tableName} table`, e));
    // }

    if (!exists) {
      knex.schema.createTable(tableName, table => {
        table.increments('id');
        table.string('name').notNullable();
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });

  return knex;
};
