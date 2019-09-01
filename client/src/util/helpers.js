export function isObject (value) {
  return value && typeof value === 'object' && value.constructor === Object
}

export const isEmpty = (data) => {
  if (Array.isArray(data)) return data.length === 0
  if (isObject(data)) return Object.keys(data).length === 0
  return !data
}
