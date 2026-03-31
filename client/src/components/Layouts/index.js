import React from 'react'

import MainNavbar from './MainNavbar'
import MainFooter from './MainFooter'

const DefaultLayout = ({ children, hideNavbar }) => (
  <div className='main-content'>
    {!hideNavbar && <MainNavbar />}
    {children}
    <MainFooter />
  </div>
)

export default DefaultLayout
