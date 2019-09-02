import React from 'react'
import { Container, Row, Col } from 'shards-react'

import MainNavbar from './MainNavbar'
// import MainFooter from './MainFooter'

const DefaultLayout = ({ children, hideNavbar }) => (
  <Container fluid>
    <Row>
      <Col
        className='main-content p-0'
        // lg={{ size: 10, offset: 2 }}
        // md={{ size: 9, offset: 3 }}
        lg='12'
        md='12'
        sm='12'
        tag='main'
      >
        {!hideNavbar && <MainNavbar />}
        {children}
        {/* {!hideFooter && <MainFooter />} */}
      </Col>
    </Row>
  </Container>
)

export default DefaultLayout
