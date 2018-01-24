import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import styled from 'styled-components';

import { Home, Login, Signup, ThreadPage, ThreadDetailById, ThreadCreatePage, NotFoundPage } from 'containers';
import { history } from 'util/store';
import Header from 'components/Header';
// import Footer from 'components/Footer';

const Container = styled.div`
  text-align: center;
`

function Routes() {
  return (
    <Router>
      <Container>
        <Header/>

        <ConnectedRouter history={history}>
          <Switch>
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
