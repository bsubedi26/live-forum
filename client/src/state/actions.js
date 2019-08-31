import * as Services from '../services'

export const create = async (service, payload) => {
  if (Services[service]) {
    const data = await Services[service].create(payload)
    return data
  }
  return null
}
