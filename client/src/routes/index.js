import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import styled from 'styled-components';

import { BlogMain, Home, Login, Signup, ThreadPage, ThreadDetailById, ThreadCreatePage, NotFoundPage } from 'containers';
import { history } from 'util/store';
import LoadingBar from 'components/LoadingBar';
import Navbar from 'components/Navbar';
// import Footer from 'components/Footer';

const Container = styled.div`
  text-align: center;
`

function Routes() {
  return (
    <Router>
      <Container>
        <LoadingBar />
        <Navbar />

        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/blog" component={BlogMain} />
            <Route exact path="/home" component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />

            {/* FORUM */}
            <Route exact path='/thread/:topicId' component={ThreadPage} />
            <Route exact path='/thread/:topicId/individual/:id' component={ThreadDetailById} />
            <Route exact path='/thread/:topicId/create' component={ThreadCreatePage} />

            {/* 404 & Redirects */}
            <Redirect exact from='/' to='/home'/>
            <Route component={NotFoundPage} />
          </Switch>
        </ConnectedRouter>

        {/* <Footer /> */}

      </Container>
    </Router>
  )
}

export default Routes;
