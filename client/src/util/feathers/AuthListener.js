import { useEffect } from 'react'
import { useDispatch } from 'reactn'

export default () => {
  const userAuthenticate = useDispatch('user/authenticate')
  useEffect(() => {
    userAuthenticate()
  }, [userAuthenticate])

  return null
}
