import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FadeIn } from 'animate-css-styled-components'
import ContainerLayout from 'wrappers/ContainerLayout'
import { Eyebrow, GlassPanel, PageTitle, SectionDescription } from 'components/common'

const NotFoundPanel = styled(GlassPanel)`
  max-width: 720px;
  margin: 0 auto;
  padding: 2.5rem;
  text-align: center;
`

const NotFound = () => {
  return (
    <ContainerLayout maxWidth='900px'>
      <FadeIn>
        <NotFoundPanel>
          <Eyebrow>404 Error</Eyebrow>
          <PageTitle>This page stepped out of the conversation.</PageTitle>
          <SectionDescription className='mx-auto mt-3'>
            The page you requested could not be found. Head back to the main discussion areas and keep exploring.
          </SectionDescription>
          <div className='mt-4'>
            <Link to='/threads' className='btn btn-outline-primary btn-lg pointer'>Go To Threads</Link>
          </div>
        </NotFoundPanel>
      </FadeIn>
    </ContainerLayout>
  )
}

export default NotFound
