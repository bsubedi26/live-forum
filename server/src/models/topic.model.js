/* eslint-disable no-console */
module.exports = function (app) {
  const knex = app.get('knexClient');
  const tableName = 'topics';
  
  knex.schema.hasTable(tableName).then(exists => {
    
    if (!exists) {
      knex.schema.createTable(tableName, table => {
        table.increments('id');
        table.string('name').notNullable();
        table.string('display').notNullable();
        
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });

  return knex;
};
