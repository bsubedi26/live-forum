import React from 'react'
import { useDispatch } from 'reactn'
import { Link, withRouter } from 'react-router-dom'
import UserFormCreate from 'components/Forms/user/create'
import { FadeIn } from 'animate-css-styled-components'
import ReplaceIfAlertMessage from 'components/Alerts'
import SidebarFixed from 'components/Sidebar'

const initialValues = {
  email: '',
  password: ''
}

const Signup = ({ location, history }) => {
  const userCreate = useDispatch('users/create')
  const onFormSuccess = () => history.push('/login', { message: 'Signup Successful. Login Below.' })
  const alertMsg = location.state && location.state.message
  return (
    <div>
      <SidebarFixed />
      <FadeIn>
        <div className='jumbotron'>
          <ReplaceIfAlertMessage message={alertMsg}>
            <h1 className='display-3'>Signup Below!</h1>
          </ReplaceIfAlertMessage>
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
              onSubmitAction={formData => userCreate(formData)}
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
