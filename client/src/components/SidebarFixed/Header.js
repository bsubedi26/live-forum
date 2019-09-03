/* eslint-disable */
import React from 'react'
import { Navbar, NavbarBrand } from 'shards-react'

const Logo = () => (
  <img
    id='main-logo'
    className='d-inline-block align-top mr-1'
    style={{ maxWidth: '25px' }}
    src='https://brandmark.io/logo-rank/random/pepsi.png'
    alt='Live Forum'
  />
)

const SidebarHeader = ({ header = 'Live Forum' }) => {
  return (
    <div className='main-navbar'>
      <Navbar
        className='align-items-stretch bg-white flex-md-nowrap border-bottom p-0'
        type='light'
      >
        <NavbarBrand
          className='w-100 mr-0'
          href='#'
          style={{ lineHeight: '25px' }}
        >
          <div className='d-table m-auto'>
            <Logo />
            <span className='d-none d-md-inline ml-1'>{header}</span>
          </div>
        </NavbarBrand>
        <a
          className='toggle-sidebar d-sm-inline d-md-none d-lg-none'
        >
          {/* <i className='material-icons'>&#xE5C4;</i> */}
          <i className='material-icons'>menu</i>
        </a>
      </Navbar>
    </div>
  )
}

export default SidebarHeader
