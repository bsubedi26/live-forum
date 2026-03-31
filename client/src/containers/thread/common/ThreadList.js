import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { LineText, MetaRow } from 'components/common'
import Avatar from 'components/Avatar'
import moment from 'moment'
import { UserLink } from 'components/User'

const ThreadItem = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
`

const ThreadBody = styled.div`
  flex: 1;
  min-width: 0;
  text-align: left;
`

const ThreadTitle = styled(Link)`
  display: inline-block;
  margin: 0.6rem 0 0;
  color: var(--text-strong);
  font-size: 1.2rem;
  font-weight: 700;

  &:hover {
    color: var(--accent-strong);
  }
`

const ThreadList = ({ items }) => {
  return items.map(thread => (
    <div key={thread.id} className='list-group-item'>
      <ThreadItem>
        {thread._user.avatar ? <Avatar avatar={thread._user.avatar} /> : null}
        <ThreadBody>
          <MetaRow>
            <LineText><strong>User:</strong> <UserLink user={thread._user} /></LineText>
            <LineText>{moment.utc(thread.updated_at).local().format('dddd MMM D YYYY h:mm A')}</LineText>
            {thread._comments && <LineText>{thread._comments.length} comments</LineText>}
          </MetaRow>
          <ThreadTitle to={`/thread/${thread.topic_id}/individual/${thread.id}`}>{thread.title}</ThreadTitle>
        </ThreadBody>
      </ThreadItem>
    </div>
  ))
}

export default ThreadList
