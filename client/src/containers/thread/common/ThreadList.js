import React from 'react'
import { Link } from 'react-router-dom'
import { LineText, Title } from 'components/common'
import Avatar from 'components/Avatar'
import moment from 'moment'

const ThreadList = ({ items }) => {
  return items.map(thread => (
    <div key={thread.id} className='list-group-item'>
      <div>
        {thread._creator.avatar ? <Avatar style={{ float: 'left', marginRight: '8px' }} avatar={thread._creator.avatar} /> : null}
        <Link to={`/thread/${thread.topic_id}/individual/${thread.id}`}><Title className='text-left'>{thread.title}</Title></Link>
      </div>
      <LineText className='text-left'><strong>UserID: </strong> {thread.creator_id} - {thread._creator.email}</LineText>

      <LineText className='text-left pt-2'>
        <span className='mr-2'>{moment.utc(thread.updated_at).local().format('dddd MMM D YYYY h:mm A')}</span>
        <span className='mr-2'>-</span>
        <span className='mr-2'>{thread._comments.length} comments</span>
      </LineText>
    </div>
  ))
}

export default ThreadList
