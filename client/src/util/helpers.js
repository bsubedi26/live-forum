export function isObject (value) {
  return value && typeof value === 'object' && value.constructor === Object
}

export const isEmpty = (data) => {
  if (Array.isArray(data)) return data.length === 0
  if (isObject(data)) return Object.keys(data).length === 0
  return !data
}

const isValidHex = hex => /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(hex)

export const getRandomColor = () => {
  const randColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
  return isValidHex(randColor) ? randColor : getRandomColor()
}
