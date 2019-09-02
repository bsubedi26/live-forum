export function isObject (value) {
  return value && typeof value === 'object' && value.constructor === Object
}

export const isEmpty = (data) => {
  if (Array.isArray(data)) return data.length === 0
  if (isObject(data)) return Object.keys(data).length === 0
  return !data
}

export const getRandomColor = () => '#' + ((1 << 24) * Math.random() | 0).toString(16)

export function getTextColor (hexColor) {
  return (decimalFromColor(hexColor) < 0xffffff / 2)
    ? '#FFFFFF' : '#000000'
}

function decimalFromColor (hex) {
  var number = '0x' + hex.substring(1)

  return parseInt(number, 16)
}
