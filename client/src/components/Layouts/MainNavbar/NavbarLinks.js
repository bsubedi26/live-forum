import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import LinkComp from 'components/Link'
import { navRoutes } from 'staticData/shared'

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

const NavbarCmp = ({ location }) => {
  return (
    <Wrapper>
      <nav className='navbar navbar-expand-md navbar-light'>
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
