import React from 'react'
import app from 'util/feathers'
import { FadeIn } from 'animate-css-styled-components'

import HeaderSection from './common/HeaderSection'
import ExploreSection from './common/ExploreSection'
// import CreateSection from './common/CreateSection'

const HomePage = () => {
  app.service('movies').watch()
    .find().subscribe(data => {
      console.log('data: ', data)
    })

  const cr = async () => {
    const res = await app.service('movies').create({ text: 'ww' })
    console.log('res: ', res)
  }

  return (
    <FadeIn>
      <HeaderSection />
      <button onClick={() => cr()}>CAC</button>
      <ExploreSection />
      {/* <CreateSection></CreateSection> */}
    </FadeIn>
  )
}
export default HomePage
