import React from 'react'
import { useGlobal } from 'reactn'
import Services from 'services'

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
    ? <button onClick={() => onClick()}>{user.email}</button>
    : <span>{user.email}</span>
}
