const { isEmpty } = require('lodash')

const validateEmptyData = (context) => {
  if (isEmpty(context.data)) {
    throw new Error('Required data not provided.')
  }
  return context
}
module.exports = {
  validateEmptyData
}
