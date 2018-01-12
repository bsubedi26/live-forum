import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';

const Container = styled.div`
  /* background-color: #222; */
  /* height: 50px; */
  /* color: #fff; */
`

function Header() {
  return (
    <Container>
      <Navbar />
    </Container>
  )
}

export default Header;
