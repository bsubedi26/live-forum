/**
 * Sqlite adds t.json() data types as text,
 * therefore, stringify all the incoming json body data
*/
const stringifyJsonForSqlite = () => async ctx => {
  // console.log('data ', ctx.data);
  if (ctx && ctx.data) {
    for (let key in ctx.data) {
      if (typeof ctx.data[key] === 'object') {
        // console.log('OBJECT! ', ctx.data[key]);
        ctx.data[key] = JSON.stringify(ctx.data[key]);
      }
    }
  }
  
  return ctx;
};

const isSqlite = () => async ctx => {
  const knex = ctx.app.get('knexClient');
  return (knex.client.config.client === 'sqlite3') ? true : false;
};

module.exports = {
  stringifyJsonForSqlite,
  isSqlite
};
