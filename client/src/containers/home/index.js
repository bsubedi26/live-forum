import React from 'react'
import app from 'util/feathers'
import { FadeIn } from 'animate-css-styled-components'

import HeaderSection from './common/HeaderSection'
import ExploreSection from './common/ExploreSection'
// import CreateSection from './common/CreateSection'

const HomePage = () => {
  app.service('movies')
    .on('created', data => {
      console.log('onCreated: ', data)
    })
  app.service('movies').watch()
    .find().subscribe(data => {
      console.log('rxjs subscribe find: ', data)
    })

  const create = async () => {
    const res = await app.service('movies').create({ text: 'creating' })
    console.log('res: ', res)
  }

  return (
    <FadeIn>
      {/* <button onClick={() => create()}>Create</button> */}
      <HeaderSection />
      <ExploreSection />
      {/* <CreateSection></CreateSection> */}
    </FadeIn>
  )
}
export default HomePage
