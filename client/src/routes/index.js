import React from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import styled from 'styled-components'

import { Home, Login, Signup, ForumPage, ForumDetailById, ForumCreatePage, NotFoundPage } from 'containers'
import { Header } from 'components'
import { history } from 'util/store'
// import PrivateRoute from './private'

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

            <Redirect exact from='/' to='/home'/>
            <Route component={NotFoundPage} />
          </Switch>
        </ConnectedRouter>

      </Container>
    </Router>
  )
}

export default Routes
