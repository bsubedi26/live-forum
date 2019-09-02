import React from 'react'
import styled from 'styled-components'
import Routes from './Routes'
import FeathersEventListener from 'util/feathers/EventListener'
import FeathersAuthListener from 'util/feathers/AuthListener'
import DefaultLayout from '../components/Layouts'

const WholePageWrapper = styled.div`
  text-align: center;
`

export default () => {
  return (
    <WholePageWrapper>
      {/* Listeners - does not render anything */}
      <FeathersAuthListener />
      <FeathersEventListener />
      {/* LAYOUT/ROUTES */}
      <DefaultLayout>
        <Routes />
      </DefaultLayout>
    </WholePageWrapper>
  )
}
