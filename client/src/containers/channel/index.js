import React from 'react'
import useChannelRooms from 'hooks/useChannelRooms'
import { Link } from 'react-router-dom'

const LinkItem = ({ item }) => (
  <Link to={`/channel/${item}`}>
    <div className='card mx-3 p-3'>
      {item}
    </div>
  </Link>
)

export default ({ match }) => {
  console.log('match: ', match)
  const [channelRooms] = useChannelRooms()
  console.log('channelRooms: ', channelRooms)
  return (
    <div className='container'>
      <div className='row'>
        {/* {
          channelRooms.length > 0 ? (
            channelRooms.map((item, i) => (
              <LinkItem item={item} key={i} />
            ))
          ) : null
        } */}
      </div>
    </div>

  )
}
