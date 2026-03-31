import React from 'react'
import styled from 'styled-components'
import classNames from 'classnames'
import { Col } from 'shards-react'

import SidebarHeader from './Header'
import MobileToggle from './MobileToggle'
// import DefaultNavItems from './DefaultNavItems'

const containerClass = classNames(
  'main-sidebar',
  'px-0',
  'col-12',
  'open',
  'd-none',
  'd-md-block'
)

const WrapperWithSidebar = styled.div`
  .main-sidebar {
    height: calc(100vh);
  }
`
const WrapperNoSidebar = styled.div`
  .main-sidebar {
    height: auto;
  }
`

const MainSidebar = ({ children, items }) => {
  const [isDrawerOpen, setDrawerOpen] = React.useState(false)
  const WrapperComp = children ? WrapperWithSidebar : WrapperNoSidebar
  return (
    <div>
      {children}

      {/* <MobileToggle {...{ isDrawerOpen, setDrawerOpen }} /> */}
    </div>
  )
}

export default MainSidebar
