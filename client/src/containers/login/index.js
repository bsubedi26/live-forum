import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { FadeIn } from 'animate-css-styled-components'
import { useGlobal } from 'reactn'

import UserForm from 'components/Forms/user/create'
import ReplaceIfAlertMessage from 'components/Alerts'
import app from 'util/feathers'
import SidebarFixed from 'components/SidebarFixed'

const initialValues = {
  email: '',
  password: '',
  strategy: 'local'
}

const Login = ({ location, history }) => {
  const [, setAuthState] = useGlobal('auth')
  const alertMsg = location.state && location.state.message
  const onFormSuccess = async ({ accessToken, user, authentication }) => {
    setAuthState({ accessToken, user, authentication })
    history.push('/thread/1', { message: 'Login Successful.' })
  }

  return (
    <div>
      <SidebarFixed />
      <FadeIn>
        <div className='jumbotron'>
          <ReplaceIfAlertMessage message={alertMsg} type='success'>
            <h1 className='display-3'>Login Below!</h1>
          </ReplaceIfAlertMessage>
          <p className='lead'>Login to access the featured content and information.</p>
          <span>
            Don't have an Account?
            <Link
              className='pa1'
              to={{
                pathname: '/signup',
                state: { message: 'Signup for an account below!' }
              }}
            >
                Register here.
            </Link>
          </span>
          <hr className='my-4' />
          <FadeIn>
            <UserForm
              onSubmitAction={formData => app.authenticate(formData)}
              onSuccessAction={onFormSuccess}
              initialValues={initialValues}
            />
          </FadeIn>

          {/* <a href="http://localhost:3030/auth/github"> */}
          {/* <a href="/auth/github">
              <button className="mt-3 btn btn-default pointer">
                Login With Github
                <i className="fa fa-github fa-lg m-2" aria-hidden="true"></i>
              </button>
            </a> */}
        </div>
      </FadeIn>
    </div>

  )
}

export default withRouter(Login)
