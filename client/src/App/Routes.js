import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import {
  Login,
  Signup,
  ThreadsPage,
  ThreadPage,
  ThreadCreatePage,
  ThreadDetailById,
  NotFoundPage,
  ChannelsPage,
  ChannelById,
  UserProfilePage
} from 'containers'

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = window.localStorage.getItem('feathers-jwt')
  console.log('isAuthenticated ', isAuthenticated)
  return (
    <Route
      {...rest} render={props => (
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to='/login' />
        )
      )}
    />
  )
}

const Routes = () => {
  return (
    <Switch>
      {/* <Route exact path='/home' component={Home} /> */}
      <Route exact path='/login' component={Login} />
      <Route exact path='/signup' component={Signup} />
      {/* <Route exact path="/blog" component={BlogMain} /> */}

      {/* FORUM */}
      <Route exact path='/threads' component={ThreadsPage} />
      <Route exact path='/thread/:topicId' component={ThreadPage} />
      <Route exact path='/thread/:topicId/individual/:threadId' component={ThreadDetailById} />
      <Route exact path='/thread/:topicId/create' component={ThreadCreatePage} />

      {/* CHANNELS */}
      <Route exact path='/channels' component={ChannelsPage} />
      <Route exact path='/channel/:id' component={ChannelById} />

      {/* USERS */}
      <Route exact path='/user/profile' component={UserProfilePage} />

      {/* 404 & Redirects */}
      <Redirect exact from='/' to='/threads' />
      <Redirect exact from='/home' to='/threads' />
      <Route exact path='/noop' component={() => <div />} />
      <Route component={NotFoundPage} />

    </Switch>
  )
}

export default Routes
