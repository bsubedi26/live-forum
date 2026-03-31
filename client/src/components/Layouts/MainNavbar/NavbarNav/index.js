import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Nav } from 'shards-react'

import Notifications from './Notifications'
import UserActions from './UserActions'

const AuthActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  flex: 0 0 auto;

  @media (max-width: 767px) {
    width: 100%;
    justify-content: flex-start;
  }
`

const LoggedInLinks = ({ user, onLogout }) => (
  <Nav navbar className='align-items-center border-left-0 flex-row'>
    <Notifications />
    <UserActions {...{ user, onLogout }} />
  </Nav>
)

const NotLoggedInLinks = () => (
  <AuthActions>
    <Link to='/login' className='btn btn-outline-primary pointer mx-0 nav-user'><span>Login</span></Link>
    <Link to='/signup' className='btn btn-outline-info pointer mx-0 nav-user'><span>Signup</span></Link>
  </AuthActions>
)

export default ({ auth, onLogout }) => (
  auth.accessToken ? <LoggedInLinks {...{ onLogout, user: auth.user }} /> : <NotLoggedInLinks />
)
