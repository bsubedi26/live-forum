import React from 'react'
import { useDispatch, useGlobal } from 'reactn'
import { Link } from 'react-router-dom'

const LinkItem = ({ item }) => (
  <Link to={`/channel/${item}`}>
    <div className='card mx-3 p-3'>
      {item}
    </div>
  </Link>
)

export default () => {
  const [channelRooms] = useGlobal('channels/rooms')
  const channelRoomsFind = useDispatch('channels/rooms/find')

  React.useEffect(() => {
    channelRoomsFind()
  }, [channelRoomsFind])

  return (
    <div className='container'>
      <div className='row'>
        {
          channelRooms && channelRooms.length > 0 ? (
            channelRooms.map((item, i) => (
              <LinkItem item={item} key={i} />
            ))
          ) : <div>Loading...</div>
        }
      </div>
    </div>

  )
}
