import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import LinkComp from 'components/Link'
import { navRoutes } from 'staticData/shared'

const LinksList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem;
  margin: 0;
  padding: 0;
  list-style: none;
`

const renderNavRoute = location => (item, id) => {
  const { route } = item
  const isActive = location.pathname.includes(route)
  return (
    <li key={id}>
      <LinkComp isActive={isActive} to={route} label={item.label} />
    </li>
  )
}

const NavbarCmp = ({ location }) => {
  return (
    <LinksList>
      {navRoutes.map(renderNavRoute(location))}
    </LinksList>
  )
}

export default withRouter(NavbarCmp)
