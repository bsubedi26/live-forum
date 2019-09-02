import React from 'react'
import { Link } from 'react-router-dom'
import { LineText, Title } from 'components/common'
import Avatar from 'components/Avatar'
import moment from 'moment'
import { UserName } from 'components/User'

const ThreadList = ({ items }) => {
  return items.map(thread => (
    <div key={thread.id} className='list-group-item'>
      <div className='d-flex flex-column text-left'>
        {thread._creator.avatar ? <Avatar style={{ float: 'left', marginBottom: '8px' }} avatar={thread._creator.avatar} /> : null}
        <LineText><strong>UserID: </strong> {thread.creator_id} - <UserName user={thread._creator} /></LineText>

        <LineText>
          <span className='mr-2'>{moment.utc(thread.updated_at).local().format('dddd MMM D YYYY h:mm A')}</span>
          <span className='mr-2'>-</span>
          {thread._comments && <span className='mr-2'>{thread._comments.length} comments</span>}
        </LineText>
        <Link to={`/thread/${thread.topic_id}/individual/${thread.id}`}><Title>{thread.title}</Title></Link>
      </div>
    </div>
  ))
}

export default ThreadList
