import { useEffect } from 'react'
import { useGlobal } from 'reactn'
import app from 'util/feathers/app'
import { isEmpty } from 'util/helpers'

export default (service = 'channels/rooms') => {
  console.log('----usechannelRooms')
  const [state, setState] = useGlobal()

  useEffect(() => {
    // console.log('useEffect() ran ', service, state)
    if (!isEmpty(state[service])) return
    // console.log('fetching...')
    const fetchData = async () => {
      const response = await app.service(service).find()
      setState({
        [service]: response.data ? response.data : response
      })
    }

    fetchData()

    // return () => {}
  }, [])
  return [state]
}
