import React from 'react'
import { LineText } from 'components/common'
import moment from 'moment'
import Avatar from 'components/Avatar'
import { UserLink } from 'components/User'

export default ({ thread }) => {
  const postDate = moment(thread.updated_at, 'YYYY-MM-DD HH:mm:ss').format('dddd MMM D YYYY h:mm A')
  return (
    <>
      <div>
        {thread._creator.avatar ? <Avatar avatar={thread._creator.avatar} /> : null}
        <h3 className='my-3'>Title: {thread.title}</h3>
        <LineText className='my-2'>Posted By: <UserLink user={thread._creator} /></LineText>
      </div>

      <LineText className='pt-2'>
        <span className='mr-2'>{postDate}</span>
        <span className='mr-2'>-</span>
        {thread._comments && <span className='mr-2'>{thread._comments.length} comments</span>}

      </LineText>
    </>
  )
}
