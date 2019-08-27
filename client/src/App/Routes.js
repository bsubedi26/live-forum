import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

// import { Scroller, BlogMain, Home, Login, Signup, ThreadPage, ThreadDetailById, ThreadCreatePage, NotFoundPage } from 'containers'
import {
  Home,
  Login,
  Signup,
  ThreadsPage,
  ThreadPage,
  ThreadCreatePage,
  ThreadDetailById,
  NotFoundPage
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
      {/* <Route exact path="/blog" component={BlogMain} /> */}
      <Route exact path='/home' component={Home} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/signup' component={Signup} />
      {/* <Route exact path='/scroller' component={Scroller} /> */}

      {/* FORUM */}
      <Route exact path='/threads' component={ThreadsPage} />
      <Route exact path='/thread/:topicId' component={ThreadPage} />
      <Route exact path='/thread/:topicId/individual/:threadId' component={ThreadDetailById} />
      <Route exact path='/thread/:topicId/create' component={ThreadCreatePage} />

      {/* 404 & Redirects */}
      <Redirect exact from='/' to='/home' />
      <Route component={NotFoundPage} />
    </Switch>

  )
}

export default Routes
