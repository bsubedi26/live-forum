import React from 'react'
import { FadeIn } from 'animate-css-styled-components'

import HeaderSection from './common/HeaderSection'
import ExploreSection from './common/ExploreSection'
// import CreateSection from './common/CreateSection'

const HomePage = () => (
  <FadeIn>
    <HeaderSection />
    <ExploreSection />
    {/* <CreateSection></CreateSection> */}
  </FadeIn>
)

export default HomePage
