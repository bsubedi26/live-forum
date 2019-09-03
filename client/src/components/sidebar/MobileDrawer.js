import React, { useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import { FadeIn } from 'animate-css-styled-components'
import { navRoutes } from 'staticData/shared'
import LinkComp from 'components/Link'
import setDrawerCloseOnClickOutside from 'hooks/useClickOutside'

export const drawerAnimation = keyframes`
  0% {
    width: 0px;
  }
  100% {
    width: 160px;
  }
`

const DrawerWrapper = styled.div`
  position: absolute;
  left: 0;;
  background-color: white;
  height: 100vh;
  box-shadow: 0 5px 11.5px rgba(23, 198, 113, 0.1);
  z-index: 30000;
  @media(min-width: 768px) {
    display: none;
  }
  display: ${props => props.isDrawerOpen ? 'block' : 'none'};

  animation-name: ${drawerAnimation};
  animation-duration: .8s;
  animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-direction: normal;
  /* animation-direction: ${props => props.isDrawerOpen ? 'normal' : 'reverse'}; */
`

const MobileDrawer = ({ isDrawerOpen, setDrawerOpen }) => {
  const wrapperRef = useRef()
  setDrawerCloseOnClickOutside(wrapperRef, setDrawerOpen)

  return (
    <DrawerWrapper {...{ isDrawerOpen }} ref={wrapperRef}>
      <FadeIn duration='2s'>
        {navRoutes.map(item => {
          const { route } = item
          return (
            <div onClick={() => setDrawerOpen(false)} key={item.label} style={{ zIndex: 30000 }}>
              <LinkComp to={route} label={item.label} />
            </div>
          )
        })}
      </FadeIn>
    </DrawerWrapper>
  )
}

export default MobileDrawer
