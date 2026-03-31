import React from 'react'
import styled from 'styled-components'
import { useGlobal, useDispatch } from 'reactn'
import ContainerLayout from 'wrappers/ContainerLayout'
import { Eyebrow, FeatureCard, PageTitle, SectionDescription, SectionHeading } from 'components/common'

const DetailList = styled.dl`
  display: grid;
  gap: 1rem;
  margin: 0;
`

const DetailRow = styled.div`
  padding: 1rem 1.1rem;
  border-radius: 18px;
  background: var(--surface-subtle);
`

const Term = styled.dt`
  margin: 0 0 0.35rem;
  color: var(--text-muted);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`

const Description = styled.dd`
  margin: 0;
  color: var(--text-strong);
  font-size: 1rem;
  font-weight: 600;
`

export default () => {
  const [auth] = useGlobal('auth')
  const dispatchRemoveUser = useDispatch('user/remove')

  const removeUserClick = async () => {
    await dispatchRemoveUser(auth.user.id)
  }

  return (
    <ContainerLayout maxWidth='900px'>
      <SectionHeading>
        <div>
          <Eyebrow>Your Account</Eyebrow>
          <PageTitle>Manage your forum identity from one place.</PageTitle>
        </div>
        <SectionDescription>
          Review your basic profile information and take account actions from a more polished profile screen.
        </SectionDescription>
      </SectionHeading>
      {auth.accessToken && (
        <FeatureCard>
          <div className='app-card-body'>
            <DetailList>
              <DetailRow>
                <Term>User ID</Term>
                <Description>{auth.user.id}</Description>
              </DetailRow>
              <DetailRow>
                <Term>Email</Term>
                <Description>{auth.user.email}</Description>
              </DetailRow>
            </DetailList>
            <button onClick={() => removeUserClick()} className='btn btn-outline-danger mt-4'>Delete Account</button>
          </div>
        </FeatureCard>
      )}
    </ContainerLayout>

  )
}
