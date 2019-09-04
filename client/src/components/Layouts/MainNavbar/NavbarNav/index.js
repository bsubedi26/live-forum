import React from 'react'
import { Link } from 'react-router-dom'
import { Nav } from 'shards-react'

import Notifications from './Notifications'
import UserActions from './UserActions'

const LoggedInLinks = ({ user, onLogout }) => (
  <Nav navbar className='border-left flex-row'>
    <Notifications />
    <UserActions {...{ user, onLogout }} />
  </Nav>
)

const NotLoggedInLinks = () => (
  <div className='d-flex align-self-center mr-3'>
    <Link to='/login' className='btn btn-outline-primary pointer mx-1 nav-user'><span>Login</span></Link>
    <Link to='/signup' className='btn btn-outline-info pointer mx-1 nav-user'><span>Signup</span></Link>
  </div>
)

export default ({ auth, onLogout }) => (
  auth.accessToken ? <LoggedInLinks {...{ onLogout, user: auth.user }} /> : <NotLoggedInLinks />
)
