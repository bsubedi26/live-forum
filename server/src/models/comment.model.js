module.exports = function (app) {
  const db = app.get('knexClient');
  const table = 'comments';

  db.schema.hasTable(table).then(exists => {

    if (!exists) {
      db.schema.createTable(table, t => {
        t.increments('id').primary();
        t.string('comment').notNullable();
        
        t.integer('thread_id').unsigned().references('id').inTable('threads').onDelete('cascade');
        t.integer('creator_id').unsigned().references('id').inTable('users').onDelete('cascade');
        t.timestamps(true, true);

      })
        .then(() => console.log(`Updated ${table} table`))
        .catch((e) => console.log(e));
    }
  });

  return db;
};
