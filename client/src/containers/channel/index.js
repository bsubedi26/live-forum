import React, { useEffect } from 'react'
import { useDispatch, useGlobal } from 'reactn'
import { CardLink } from './common'
import ContainerLayout from 'wrappers/ContainerLayout'
import Loading from 'components/Loading'

export default () => {
  const [channelRooms] = useGlobal('channels/rooms')
  const channelRoomsFind = useDispatch('channels/rooms/find')

  useEffect(() => {
    channelRoomsFind()
  }, [channelRoomsFind])

  return (
    <ContainerLayout>
      <div className='row'>
        {
          channelRooms.length ? (
            channelRooms.map((item, i) => (
              <CardLink item={item} key={i} />
            ))
          ) : <Loading />
        }
      </div>
    </ContainerLayout>
  )
}
