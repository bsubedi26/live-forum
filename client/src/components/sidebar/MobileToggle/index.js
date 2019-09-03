import React from 'react'
import styled from 'styled-components'
import MobileDrawer from './MobileDrawer'

const MenuIconWrapper = styled.button.attrs({
  className: 'nav-link nav-link-icon toggle-sidebar d-sm-inline d-md-none'
})`
  position: fixed;
  top: 0;
  z-index: 3000;
  border: 0;
  background-color: white;
`

const MobileToggle = () => {
  const [isDrawerOpen, setDrawerOpen] = React.useState(false)

  const handleMenuClick = (e) => {
    return setDrawerOpen(!isDrawerOpen)
  }

  return (
    <nav className='nav'>
      <MenuIconWrapper onClick={handleMenuClick}>
        <i className='material-icons'>menu</i>
      </MenuIconWrapper>
      {isDrawerOpen && <MobileDrawer {...{ isDrawerOpen, setDrawerOpen }} />}
    </nav>
  )
}

export default MobileToggle
