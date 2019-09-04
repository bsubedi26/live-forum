import React from 'react'
import SidebarFixed from 'components/SidebarFixed'

export default ({ children }) => {
  return (
    <>
      <SidebarFixed />
      <div className='container my-4'>
        {children}
      </div>
    </>
  )
}
