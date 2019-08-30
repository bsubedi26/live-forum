const removeField = field => async context => {
  const { result } = context

  if (Array.isArray(result.data)) {
    result.data = result.data.map(o => {
      delete o[field]
      return o
    })
  } else {
    delete context.result[field]
  }
  return context
}

module.exports = removeField
