import React from 'react'
import { useGlobal, useDispatch } from 'reactn'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Container, Navbar } from 'shards-react'

import NavbarLinks from './NavbarLinks'
import NavbarNav from './NavbarNav'
import NavbarToggle, { Drawer } from './NavbarToggle'

const MainNavbar = ({ layout, stickyTop }) => {
  const [auth, setAuth] = useGlobal('auth')
  const appLogout = useDispatch('app/logout')

  const [isDrawerOpen, setDrawerOpen] = React.useState(false)

  const onLogout = async (e) => {
    e.preventDefault()
    appLogout()
  }

  const classes = classNames(
    'main-navbar',
    'bg-white',
    stickyTop && 'sticky-top'
  )

  return (
    <div className={classes}>
      <Container className='p-0'>
        <Navbar type='light' className='align-items-stretch flex-md-nowrap p-0'>
          <NavbarLinks {...{ auth, setAuth }} />
          <NavbarNav {...{ auth, setAuth, onLogout }} />
          <NavbarToggle {...{ isDrawerOpen, setDrawerOpen }} />
        </Navbar>
      </Container>
      {
        isDrawerOpen && (
          <Drawer {...{ isDrawerOpen, setDrawerOpen }} />
        )
      }
    </div>
  )
}

MainNavbar.propTypes = {
  /**
   * The layout type where the MainNavbar is used.
   */
  layout: PropTypes.string,
  /**
   * Whether the main navbar is sticky to the top, or not.
   */
  stickyTop: PropTypes.bool
}

MainNavbar.defaultProps = {
  stickyTop: true
}

export default MainNavbar
