import React from 'react'
import { Home, Login, Signup, Settings, ForumPage, ForumDetailById, ForumCreatePage, NotFoundPage } from 'containers'

import { Header } from 'components'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import PrivateRoute from './private'

import { ConnectedRouter } from 'react-router-redux'
import { history } from 'util/store'

const Container = styled.div`text-align: center;`

function Routes() {
  return (
    <Router>
      <Container>
        <Header />
        <ConnectedRouter history={history}>

          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path='/forum/:topic' component={ForumPage} />
            <Route exact path='/forum/:topic/individual/:id' component={ForumDetailById} />
            <Route exact path='/forum/:topic/create' component={ForumCreatePage} />

            {/* <Route path=":forum/discussion/:discussion" component={SingleDiscussion} /> */}
            {/* <Route path=":forum/new_discussion" component={NewDiscussion} /> */}
            {/* <Route path="user/:username" component={UserProfile} /> */}

            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />

            <PrivateRoute path='/settings' component={Settings} />
            <Route component={NotFoundPage} />
          </Switch>
        </ConnectedRouter>

      </Container>
    </Router>
  )
}

export default Routes
