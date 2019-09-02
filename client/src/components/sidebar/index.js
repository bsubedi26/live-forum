import React from 'react'
import styled from 'styled-components'
import classNames from 'classnames'
import { Col } from 'shards-react'

import SidebarHeader from './Header'
import SidebarNavItems from './NavItems'
// import MobileSearchBar from './MobileSearchBar'

const containerClass = classNames(
  'main-sidebar',
  'px-0',
  'col-12',
  'open',
  'd-none',
  'd-md-block'
)

const Wrapper = styled.div`
  .navbar-nav, .main-sidebar {
    /* border: 3px solid red; */
    @media (max-width: 767.98px) {
      /* display: none; */
    }
  }
`

const MainSidebar = ({ children, items }) => {
  return (
    <Wrapper>
      <Col
        tag='aside'
        className={containerClass}
        lg={{ size: 2 }}
        md={{ size: 3 }}
        sm={{ size: 12 }}
      >
        <SidebarHeader />
        {children || <SidebarNavItems {...{ items }} />}
      </Col>
    </Wrapper>
  )
}

export default MainSidebar
