const updateParamQuery = (field, param) => async hook => {
  const { query } = hook.params

  if (query && !query[field]) {
    query[field] = param
  }
  return hook
}

module.exports = updateParamQuery
