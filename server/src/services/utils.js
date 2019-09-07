const sqliteToJsTypes = (columns) => {
  const conversionMap = {
    integer: 'number',
    int: 'number',
    tinyint: 'number',
    smallint: 'number',
    mediumint: 'number',
    bigint: 'number',
    'varchar(255)': 'string',
    'character(20)': 'string',
    text: 'string',
    blob: 'blob'
  }

  return columns
    .reduce((acc, col) => {
      acc[col.name] = {
        ...col,
        dataType: conversionMap[col.type] || col.type
      }
      return acc
    }, {})
}

const isKnexModel = (service) => service.Model && service.Model.toString().includes('knex')

const tableInfo = async (app, name) => {
  const knex = app.get('knex')
  if (isKnexModel(app.services[name])) {
    return knex.raw(`PRAGMA table_info(${name})`)
      .then(res => sqliteToJsTypes(res))
      .catch(res => console.log(res))
  } else {
    return null
  }
}

const tableInfos = async (app, services) => {
  var result = {}
  for (const service of services) {
    result[service] = await tableInfo(app, service)
  }
  return result
}

module.exports = {
  tableInfos
}
