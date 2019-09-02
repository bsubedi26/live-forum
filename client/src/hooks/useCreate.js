import { useGlobal } from 'reactn'
import app from 'util/feathers/app'

export default (serviceName) => {
  console.log('----useCreate')
  const [state] = useGlobal(serviceName)

  const onCreate = async (payload) => {
    const response = await app.service(serviceName).create(payload)
    console.log('response: ', response)
    return response
  }
  return [state, onCreate]
}
