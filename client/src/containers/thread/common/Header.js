import React from 'react'
import styled from 'styled-components'

const HeaderWrap = styled.div`
  padding: 0.5rem 0 1rem;
`

const TopicName = styled.h2`
  margin: 0;
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  font-weight: 700;
`

const Summary = styled.p`
  max-width: 620px;
  margin: 0.85rem 0 0;
  color: var(--text-muted);
  font-size: 0.98rem;
  line-height: 1.75;
`

const Header = ({ topic }) => {
  return (
    <HeaderWrap>
      <TopicName>{topic.name}</TopicName>
      <Summary>Currently viewing the latest threads in {topic.name}. Browse recent posts, open detailed discussions, or start a new conversation.</Summary>
    </HeaderWrap>
  )
}

const ThreadHeader = ({ topic }) => {
  return (
    <div>
      {topic && topic.name ? <Header topic={topic} /> : null}
    </div>
  )
}

export default ThreadHeader
