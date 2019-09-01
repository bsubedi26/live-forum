import { useEffect } from 'react'
import { useGlobal } from 'reactn'
import app from 'util/feathers/app'
import { isEmpty } from 'util/helpers'

export default (service) => {
  console.log('----useService')
  const [state, setState] = useGlobal()

  useEffect(() => {
    if (!isEmpty(state[service])) return

    const fetchData = async () => {
      const response = await app.service(service).find()
      setState({
        [service]: response.data ? response.data : response
      })
    }
    fetchData()
  }, []) // eslint-disable-line
  return [state]
}
