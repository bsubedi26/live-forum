import React from 'react'
import styled from 'styled-components'
import Routes from './Routes'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'

const WholePageWrapper = styled.div`
  text-align: center;
`

const RouteWrapper = styled.div`
  padding-top: 1rem;
  text-align: center;
`

export default () => (
  <WholePageWrapper>
    <Navbar />
    <RouteWrapper>
      <Routes />
    </RouteWrapper>
    <Footer />
  </WholePageWrapper>
)
