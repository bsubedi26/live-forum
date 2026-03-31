import { useGlobal } from 'reactn'
import app from 'util/feathers/app'

export default (serviceName) => {
  const [state] = useGlobal(serviceName)

  const onCreate = async (payload) => {
    const response = await app.service(serviceName).create(payload)
    return response
  }
  return [state, onCreate]
}
