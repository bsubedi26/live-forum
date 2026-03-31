import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobal, useDispatch } from 'reactn'
import BoxLink from 'components/BoxLink'
import Loading from 'components/Loading'
import ContainerLayout from 'wrappers/ContainerLayout'
import { Eyebrow, PageTitle, SectionDescription, SectionHeading } from 'components/common'

const TopicGrid = styled.div`
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
`

const renderTopic = topic => (
  <BoxLink key={topic.id} to={`/thread/${topic.id}`} label={topic.name} />
)

const Topics = ({ topics }) => topics.map(renderTopic)

const ThreadsList = () => {
  const [topics] = useGlobal('topics')
  const topicsFind = useDispatch('topics/find')

  useEffect(() => {
    topicsFind({ query: { $sort: { updated_at: 1 } } })
  }, [topicsFind])

  return (
    <ContainerLayout>
      <SectionHeading>
        <div>
          <Eyebrow>Community Threads</Eyebrow>
          <PageTitle>Find the conversations worth joining.</PageTitle>
        </div>
        <SectionDescription>
          Explore the forum by topic and jump into active threads with a cleaner, more consistent browsing experience.
        </SectionDescription>
      </SectionHeading>
      <TopicGrid>
        {topics ? <Topics topics={topics} /> : <Loading text='Loading threads...' />}
      </TopicGrid>
    </ContainerLayout>
  )
}

export default ThreadsList
