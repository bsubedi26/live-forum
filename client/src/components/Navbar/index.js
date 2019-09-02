/* eslint-disable */
import React from 'react'
import { useGlobal } from 'reactn'
import { Link, withRouter } from 'react-router-dom'

import LinkComp from 'components/Link'
import Avatar from '../Avatar'
import app from 'util/feathers'

const navRoutes = [
  { label: 'home', route: '/home' },
  { label: 'threads', route: '/threads' },
  { label: 'channels', route: '/channels' },
  { label: 'channels/anon', route: '/channel/anonymous' },
  // { label: 'pagination example', route: '/blog?page=1' },
  // { label: 'Infinite Scroll Example', route: '/scroller' }
]

const LoggedInLinks = ({ user, onLogout }) => (
  <ul className='navbar-nav mr-auto'>
    <li className='nav-item dropdown pointer'>
      <a className='nav-link dropdown-toggle' id='navbarDropdown' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
        {user.avatar ? <Avatar avatar={user.avatar} /> : null}
      </a>
      <div className='dropdown-menu' aria-labelledby='navbarDropdown'>
        <a onClick={onLogout} className='dropdown-item'>Sign out</a>
      </div>
    </li>
  </ul>
)

const NotLoggedInLinks = () => {
  return (
    <div>
      <Link to='/signup' className='btn btn-outline-info pointer mx-1 nav-user'><span>Signup</span></Link>
      <Link to='/login' className='btn btn-outline-primary pointer mx-1 nav-user'><span>Login</span></Link>
    </div>
  )
}

const renderNavRoute = location => (item, id) => {
  const { route } = item
  const isActive = location.pathname.includes(route)
  return (
    <LinkComp isActive={isActive} to={route} label={item.label} key={id} />
  )
}

const NavbarCmp = ({ location, history }) => {
  const [auth, setAuth] = useGlobal('auth')

  const onLogout = async (e) => {
    e.preventDefault()
    setAuth({})
    await app.logout()
    history.push('/home')
  }

  return (
    <nav className='navbar navbar-expand-md navbar-light'>
      <Link to='/' className='navbar-brand fantasy pointer'>LiveForum</Link>

      <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
        <span className='navbar-toggler-icon' />
      </button>

      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav mr-auto'>
          {navRoutes.map(renderNavRoute(location))}
        </ul>

        <form className='form-inline mr-5'>
          {auth.accessToken ? <LoggedInLinks {...{ onLogout, user: auth.user }} /> : <NotLoggedInLinks />}
        </form>
      </div>
    </nav>
  )
}

export default withRouter(NavbarCmp)
