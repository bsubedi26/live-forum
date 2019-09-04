import React from 'react'
import { useDispatch, useGlobal } from 'reactn'
import styled from 'styled-components'
import { CardLink } from './common'
import ContainerLayout from 'wrappers/ContainerLayout'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`

const Input = styled.input.attrs({ className: 'form-control' })`
  width: 100%;
`

const ChannelRoomsList = ({ items }) => {
  return items.map((item, i) => (
    <CardLink item={item} key={i} />
  ))
}

const MessageList = ({ items }) => {
  return items.map((item) => {
    return (
      <div className='card mb-3' key={item.id}>
        <p>{item.id}</p>
        <p>{item.text}</p>
        <p>{item.channel}</p>
        <p>{item.updated_at}</p>
      </div>
    )
  })
}

export default ({ match }) => {
  const { id: channelName } = match.params
  const [formMessageText, setFormMesageText] = React.useState('')

  const [auth] = useGlobal('auth')
  const [channelRooms] = useGlobal('channels/rooms')
  const dispatchChannelFind = useDispatch('channels/rooms/find')

  const [messageState] = useGlobal('messages')
  const dispatchMessageFind = useDispatch('messages/find')
  const dispatchMessageCreate = useDispatch('messages/create')

  React.useEffect(() => {
    dispatchChannelFind()
    dispatchMessageFind({
      query: {
        channel: channelName
      }
    })
  }, [dispatchChannelFind, dispatchMessageFind, channelName])

  const onSubmit = async e => {
    e.preventDefault()
    await dispatchMessageCreate({
      text: formMessageText,
      channel: channelName,
      creator_id: auth.user.id || 1 // TODO: remove harcoded user id for to allow anonymous users id: 1 is admin
    })
  }
  return (
    <ContainerLayout>
      <Wrapper>
        <div className='row'>
          {channelRooms.length && <ChannelRoomsList items={channelRooms} />}
        </div>
        <form onSubmit={onSubmit} className='my-4'>
          <Input name='message' type='text' onChange={e => setFormMesageText(e.target.value)} />
        </form>
        {messageState && <MessageList items={messageState} />}
      </Wrapper>
    </ContainerLayout>

  )
}
