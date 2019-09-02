import React from 'react'
import { useDispatch, useGlobal } from 'reactn'
import styled from 'styled-components'
import useCreate from 'hooks/useCreate'
import SidebarFixed from 'components/Sidebar'

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
  const [message, setMessage] = React.useState('')

  const [channelRooms] = useGlobal('channels/rooms')
  console.log('channelRooms: ', channelRooms)
  const dispatchFind = useDispatch('channels/rooms/find')

  React.useEffect(() => {
    dispatchFind()
  }, [dispatchFind])

  const [, handleCreate] = useCreate('movies')

  const onSubmit = async e => {
    e.preventDefault()
    await handleCreate({ text: message })
  }

  const { id } = match.params

  return (
    <>
      <SidebarFixed />
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
