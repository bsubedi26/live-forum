import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'reactn'
import { Link, withRouter } from 'react-router-dom'
import UserFormCreate from 'components/Forms/user/create'
import { FadeIn } from 'animate-css-styled-components'
import ReplaceIfAlertMessage from 'components/Alerts'
import ContainerLayout from 'wrappers/ContainerLayout'
import { Eyebrow, GlassPanel, PageTitle, SectionDescription } from 'components/common'

const initialValues = {
  email: '',
  password: ''
}

const AuthPanel = styled(GlassPanel)`
  max-width: 680px;
  margin: 0 auto;
  padding: 2rem;
`

const HelperText = styled.p`
  margin: 1rem 0 0;
  color: var(--text-muted);
`

const Signup = ({ location, history }) => {
  const userCreate = useDispatch('users/create')
  const onFormSuccess = () => history.push('/login', { message: 'Signup Successful. Login Below.' })
  const alertMsg = location.state && location.state.message
  return (
    <ContainerLayout maxWidth='900px'>
      <FadeIn>
        <AuthPanel>
          <ReplaceIfAlertMessage message={alertMsg}>
            <Eyebrow>Create Account</Eyebrow>
            <PageTitle>Join the forum with a cleaner onboarding flow.</PageTitle>
          </ReplaceIfAlertMessage>
          <SectionDescription>
            Create an account to start threads, reply to discussions, and keep your community activity in one place.
          </SectionDescription>
          <HelperText>
            Already have an account?
            <Link
              className='ml-2'
              to={{
                pathname: '/login',
                state: { message: 'Login with your account below!', type: 'info' }
              }}
            >
              Login here.
            </Link>
          </HelperText>

          <div className='mt-4'>
            <FadeIn>
              <UserFormCreate
                onSubmitAction={formData => userCreate(formData)}
                onSuccessAction={onFormSuccess}
                initialValues={initialValues}
              />
            </FadeIn>
          </div>
        </AuthPanel>
      </FadeIn>
    </ContainerLayout>
  )
}

export default withRouter(Signup)
