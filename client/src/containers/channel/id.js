import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobal } from 'reactn'
import styled from 'styled-components'
import Sidebar from 'components/Sidebar'
import useChannelRooms from 'hooks/useChannelRooms'
import useCreate from 'hooks/useCreate'

const Container = styled.div.attrs({ className: 'container' })`
  border: 1px solid;
  height: 90vh;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`

export default ({ match }) => {
  // const [activeId, setActiveId] = React.useState(0)
  // const [channelRooms, setChannelRooms] = useGlobal('channelRooms')

  const [message, setMessage] = React.useState('')
  const [channelRooms2] = useChannelRooms()
  console.log('channelRooms2: ', channelRooms2)
  const [, handleCreate] = useCreate('movies')

  const onSubmit = async e => {
    e.preventDefault()
    await handleCreate({ text: message })
  }

  const { id } = match.params

  return (
    <>
      <Sidebar />
      <Container>
        <Wrapper>
          id: {id}
          <form onSubmit={onSubmit}>
            <input name='message' type='text' onChange={e => setMessage(e.target.value)} />
          </form>
        </Wrapper>
      </Container>
    </>

  )
}
