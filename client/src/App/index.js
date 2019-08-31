import React from 'react'
import styled from 'styled-components'
import Routes from './Routes'
import FeathersEventListener from 'util/feathers/EventListener'
import FeathersAuthListener from 'util/feathers/AuthListener'
import Navbar from 'components/Navbar'

const WholePageWrapper = styled.div`
  text-align: center;
`

const RouteWrapper = styled.div`
  padding-top: 1rem;
  text-align: center;
`

export default () => {
  return (
    <WholePageWrapper>
      {/* Listeners - does not render anything */}
      <FeathersAuthListener />
      <FeathersEventListener />
      <Navbar />
      <RouteWrapper>
        <Routes />
      </RouteWrapper>
    </WholePageWrapper>
  )
}
