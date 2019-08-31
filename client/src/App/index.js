import React from 'react'
import styled from 'styled-components'
import Routes from './Routes'
import FeathersListener from 'util/feathers/EventListener'
import Navbar from 'components/Navbar'
// import Footer from 'components/Footer'

const WholePageWrapper = styled.div`
  text-align: center;
`

const RouteWrapper = styled.div`
  padding-top: 1rem;
  text-align: center;
`

export default () => (
  <WholePageWrapper>
    {/* LISTENERS */}
    <FeathersListener />
    {/* PAGE VIEW */}
    <Navbar />
    <RouteWrapper>
      {/* DYNAMIC ROUTES */}
      <Routes />
    </RouteWrapper>
    {/* <Footer /> */}
  </WholePageWrapper>
)
