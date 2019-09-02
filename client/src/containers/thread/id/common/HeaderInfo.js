import React from 'react'
import { Title, LineText } from 'components/common'
import moment from 'moment'
import Avatar from 'components/Avatar'
import { UserName } from 'components/User'

export default ({ thread }) => {
  const postDate = moment(thread.updated_at, 'YYYY-MM-DD HH:mm:ss').format('dddd MMM D YYYY h:mm A')
  return (
    <>
      <div>
        {thread._creator.avatar ? <Avatar avatar={thread._creator.avatar} /> : null}
        <Title className='my-3'>Title: {thread.title}</Title>
        <LineText className='my-2'>Posted By: <UserName user={thread._creator} /></LineText>
      </div>

      <LineText className='pt-2'>
        <span className='mr-2'>{postDate}</span>
        <span className='mr-2'>-</span>
        {thread._comments && <span className='mr-2'>{thread._comments.length} comments</span>}

      </LineText>
    </>
  )
}
