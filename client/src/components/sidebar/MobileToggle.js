import React from 'react'
import styled from 'styled-components'
import { FadeIn } from 'animate-css-styled-components'
import { navRoutes } from 'data/shared'
import LinkComp from 'components/Link'

const DrawerWrapper = styled.div`
  width: ${props => props.isDrawerOpen ? '160px' : '0px'};
  position: absolute;
  left: 0;
  background-color: white;
  height: 100vh;
  box-shadow: 0 5px 11.5px rgba(23, 198, 113, 0.1);
  z-index: 30000;
  @media(min-width: 768px) {
    display: none;
  }
`

const MenuIconWrapper = styled.button.attrs({
  className: 'nav-link nav-link-icon toggle-sidebar d-sm-inline d-md-none'
})`
  position: fixed;
  top: 0;
  z-index: 3000;
  border: 0;
  background-color: white;
`

const LinkCursiveFont = styled(LinkComp)`
  font-family: cursive;
`

export const MobileDrawer = ({ isDrawerOpen, setDrawerOpen }) => {
  const closeDrawer = () => {
    setDrawerOpen(false)
  }
  return (
    <DrawerWrapper {...{ isDrawerOpen }}>
      <FadeIn duration='1.5s'>
        {navRoutes.map(item => {
          const { route } = item
          return (
            <div onClick={closeDrawer} key={item.label} style={{ zIndex: 30000 }}>
              <LinkCursiveFont to={route} label={item.label} />
            </div>
          )
        })}
      </FadeIn>
    </DrawerWrapper>
  )
}

export const MobileToggleButton = ({ isDrawerOpen, setDrawerOpen }) => {
  const handleMenuClick = () => {
    setDrawerOpen(!isDrawerOpen)
  }

  return (
    <nav className='nav'>
      <MenuIconWrapper onClick={handleMenuClick}>
        <i className='material-icons'>menu</i>
      </MenuIconWrapper>
    </nav>
  )
}
