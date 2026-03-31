import React from 'react'
import styled from 'styled-components'
import { LineText, MetaRow } from 'components/common'
import moment from 'moment'
import Avatar from 'components/Avatar'
import { UserLink } from 'components/User'

const HeaderLayout = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
`

const Title = styled.h2`
  margin: 0 0 0.85rem;
  font-size: clamp(1.4rem, 2.6vw, 2rem);
  font-weight: 700;
`

export default ({ thread }) => {
  const postDate = moment(thread.updated_at, 'YYYY-MM-DD HH:mm:ss').format('dddd MMM D YYYY h:mm A')
  return (
    <>
      <HeaderLayout>
        {thread._user.avatar ? <Avatar avatar={thread._user.avatar} /> : null}
        <div>
          <Title>{thread.title}</Title>
          <MetaRow>
            <LineText>Posted by <UserLink user={thread._user} /></LineText>
            <LineText>{postDate}</LineText>
            {thread._comments && <LineText>{thread._comments.length} comments</LineText>}
          </MetaRow>
        </div>
      </HeaderLayout>
    </>
  )
}
