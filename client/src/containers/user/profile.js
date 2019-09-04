import React from 'react'
import { useGlobal, useDispatch } from 'reactn'
import ContainerLayout from 'wrappers/ContainerLayout'

const UserInfo = ({ me }) => {
  return (
    <div className='my-4'>
      <h5>ID: {me.id}</h5>
      <h6>EMAIL: {me.email}</h6>
    </div>
  )
}
export default () => {
  const [auth] = useGlobal('auth')
  const dispatchRemoveUser = useDispatch('user/remove')

  const removeUserClick = async () => {
    await dispatchRemoveUser(auth.user.id)
  }

  return (
    <ContainerLayout>
      {auth.accessToken && <UserInfo me={auth.user} />}
      {auth.accessToken && <button onClick={() => removeUserClick()} className='btn btn-outline-danger'>Delete Account</button>}
    </ContainerLayout>

  )
}
