import React from 'react'
// import logo from 'assets/logo.svg'
import styled from 'styled-components'
import Navbar from './Navbar'

const Container = styled.div`
  /* background-color: #222; */
  /* height: 50px; */
  /* color: #fff; */
`

function Header() {
  return (
    <Container>
      <Navbar />
      {/* <img src={logo} className="redux-logo" alt="logo" /> */}
      
    </Container>
  )
}

export default Header
