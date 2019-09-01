const updateParamQuery = sortParams => async hook => {
  const { query } = hook.params

  if (query && !query.$sort) {
    query.$sort = sortParams
  }
  return hook
}

module.exports = updateParamQuery
