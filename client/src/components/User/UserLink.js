import React from 'react'
import { useGlobal, useDispatch } from 'reactn'

export default ({ user = {} }) => {
  const [auth] = useGlobal('auth')
  const userfollowerCreate = useDispatch('users_followers/create')

  const onClick = async () => {
    const res = await userfollowerCreate({
      follower_id: auth.user.id,
      following_id: user.id
    })
    console.log('UserFollower response: ', res)
  }

  return auth.accessToken
    ? <button onClick={() => onClick()} className='btn btn-outline-primary' style={{ padding: 6 }}>{user.email}</button>
    : <span>{user.email}</span>
}
