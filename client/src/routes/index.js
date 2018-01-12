import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import styled from 'styled-components';

import { Home, Login, Signup, ForumPage, ForumDetailById, ForumCreatePage, NotFoundPage } from 'containers';
import { Header } from 'components';
import { history } from 'util/store';
// import PrivateRoute from './private';

const Container = styled.div`text-align: center;`

function Routes() {
  return (
    <Router>
      <Container>
        <Header />
        <ConnectedRouter history={history}>

          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />

            {/* FORUM */}
            <Route exact path='/forum/:topicId' component={ForumPage} />
            <Route exact path='/forum/:topicId/individual/:id' component={ForumDetailById} />
            <Route exact path='/forum/:topicId/create' component={ForumCreatePage} />

            {/* 404 & Redirects */}
            <Redirect exact from='/' to='/home'/>
            <Route component={NotFoundPage} />
          </Switch>
        </ConnectedRouter>

      </Container>
    </Router>
  )
}

export default Routes;
