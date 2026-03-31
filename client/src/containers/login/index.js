import React from 'react'
import styled from 'styled-components'
import { withRouter, Link } from 'react-router-dom'
import { FadeIn } from 'animate-css-styled-components'
import { useGlobal } from 'reactn'

import UserForm from 'components/Forms/user/create'
import ReplaceIfAlertMessage from 'components/Alerts'
import app from 'util/feathers'
import ContainerLayout from 'wrappers/ContainerLayout'
import { Eyebrow, GlassPanel, PageTitle, SectionDescription } from 'components/common'

const initialValues = {
  email: '',
  password: '',
  strategy: 'local'
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

const Login = ({ location, history }) => {
  const [, setAuthState] = useGlobal('auth')
  const alertMsg = location.state && location.state.message
  const onFormSuccess = async ({ accessToken, user, authentication }) => {
    setAuthState({ accessToken, user, authentication })
    history.push('/thread/1', { message: 'Login Successful.' })
  }

  return (
    <ContainerLayout maxWidth='900px'>
      <FadeIn>
        <AuthPanel>
          <ReplaceIfAlertMessage message={alertMsg} type='success'>
            <Eyebrow>Welcome Back</Eyebrow>
            <PageTitle>Sign in to continue the conversation.</PageTitle>
          </ReplaceIfAlertMessage>
          <SectionDescription>
            Access your threads, follow replies in real time, and jump back into the threads that matter to you.
          </SectionDescription>
          <HelperText>
            Don&apos;t have an account?
            <Link
              className='ml-2'
              to={{
                pathname: '/signup',
                state: { message: 'Signup for an account below!' }
              }}
            >
              Register here.
            </Link>
          </HelperText>
          <div className='mt-4'>
            <FadeIn>
              <UserForm
                onSubmitAction={formData => app.authenticate(formData)}
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

export default withRouter(Login)
