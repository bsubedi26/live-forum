import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useGlobal } from 'reactn'
import { CardLink } from './common'
import ContainerLayout from 'wrappers/ContainerLayout'
import Loading from 'components/Loading'
import { Eyebrow, PageTitle, SectionDescription, SectionHeading } from 'components/common'

const ChannelGrid = styled.div`
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
`

export default () => {
  const [channelRooms] = useGlobal('channels/rooms')
  const channelRoomsFind = useDispatch('channels/rooms/find')

  useEffect(() => {
    channelRoomsFind()
  }, [channelRoomsFind])

  return (
    <ContainerLayout>
      <SectionHeading>
        <div>
          <Eyebrow>Live Channels</Eyebrow>
          <PageTitle>Switch from forum threads to real-time rooms.</PageTitle>
        </div>
        <SectionDescription>
          Browse channel spaces for quick back-and-forth conversations with a more polished directory layout.
        </SectionDescription>
      </SectionHeading>
      {channelRooms.length ? (
        <ChannelGrid>
          {channelRooms.map((item, i) => (
            <CardLink item={item} key={i} />
          ))}
        </ChannelGrid>
      ) : <Loading text='Loading channels...' />}
    </ContainerLayout>
  )
}
