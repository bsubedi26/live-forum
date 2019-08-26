import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import UserFormCreate from 'components/user/form/create'
import { FadeIn } from 'animate-css-styled-components'
import { signup } from '../../services/User'
import ReplaceIfAlertMessage from 'components/Alerts'

const initialValues = {
  email: '',
  password: ''
}

const Signup = ({ location, history }) => {
  const onFormSuccess = () => history.push('/login', { message: 'Signup Successful. Login Below.' })
  const alertMsg = location.state && location.state.message
  return (
    <div className='mx-auto w-75'>
      <FadeIn>
        <div className='jumbotron'>
          <ReplaceIfAlertMessage message={alertMsg}>
            <h1 className='display-3'>Signup Below!</h1>
          </ReplaceIfAlertMessage>
          {/* <p className='lead'>Join the community to access featured content and information.</p> */}
          <span>
              Already have an Account?
            <Link
              style={{ padding: '5px' }}
              to={{
                pathname: '/login',
                state: { message: 'Login with your account below!', type: 'info' }
              }}
            >
                Login here.
            </Link>
          </span>

          <hr className='my-4' />
          <FadeIn>
            <UserFormCreate
              onSubmitAction={signup}
              onSuccessAction={onFormSuccess}
              initialValues={initialValues}
            />
          </FadeIn>
        </div>
      </FadeIn>
    </div>
  )
}

export default withRouter(Signup)
