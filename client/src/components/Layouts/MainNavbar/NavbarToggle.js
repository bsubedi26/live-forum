import React from 'react'
import styled from 'styled-components'
import { FadeInRight } from 'animate-css-styled-components'
import { navRoutes } from './shared'
import LinkComp from 'components/Link'

const DrawerWrapper = styled.div`
  width: ${props => props.isDrawerOpen ? '160px' : '0px'};
  transition: all 2s;
  position: fixed;
  right: 0;
  background-color: #c9e2e25c;
  height: 100vh;
  box-shadow: 0 5px 11.5px rgba(23, 198, 113, 0.1);
  @media(min-width: 768px) {
    display: none;
  }
`

const LinkCursiveFont = styled(LinkComp)`
  font-family: cursive;
`

export const Drawer = ({ isDrawerOpen, setDrawerOpen }) => {
  return (
    <FadeInRight>
      <DrawerWrapper {...{ isDrawerOpen }}>
        {navRoutes.map(item => {
          const { route } = item
          return (
            <div onClick={() => setDrawerOpen(false)} key={item.label}>
              <LinkCursiveFont to={route} label={item.label} />
            </div>
          )
        })}
      </DrawerWrapper>
    </FadeInRight>

  )
}

const NavbarToggle = ({ isDrawerOpen, setDrawerOpen }) => {
  const handleClick = () => {
    setDrawerOpen(!isDrawerOpen)
  }

  return (
    <nav className='nav'>
      <button onClick={handleClick} className='nav-link nav-link-icon toggle-sidebar d-sm-inline d-md-none text-center border-0'>
        <i className='material-icons'>menu</i>
      </button>
    </nav>
  )
}

export default NavbarToggle
