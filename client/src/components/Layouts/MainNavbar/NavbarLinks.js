import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import LinkComp from 'components/Link'
import { navRoutes } from './shared'

const Wrapper = styled.div`
  .navbar-nav {
    @media(min-width: 768px) {
      margin-left: 150px;
    }
  }
`

const renderNavRoute = location => (item, id) => {
  const { route } = item
  const isActive = location.pathname.includes(route)
  return (
    <LinkComp isActive={isActive} to={route} label={item.label} key={id} />
  )
}

const NavbarCmp = ({ location, history, auth, setAuth }) => {
  return (
    <Wrapper>
      <nav className='navbar navbar-expand-md navbar-light'>
        {/* <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'><span className='navbar-toggler-icon' /></button> */}

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav'>
            {navRoutes.map(renderNavRoute(location))}
          </ul>
        </div>
      </nav>
    </Wrapper>
  )
}

export default withRouter(NavbarCmp)
