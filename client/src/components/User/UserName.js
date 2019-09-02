import React from 'react'
import { useGlobal } from 'reactn'
import Services from 'util/feathers/Services'

export default ({ user = {} }) => {
  const [auth] = useGlobal('auth')

  const onClick = async () => {
    const res = await Services.UserFollower.create({
      follower_id: auth.user.id,
      following_id: user.id
    })
    console.log('UserFollower response: ', res)
  }

  return auth.accessToken
    ? <button onClick={() => onClick()} className='btn btn-outline-primary' style={{ padding: 6 }}>{user.email}</button>
    : <span>{user.email}</span>
}
