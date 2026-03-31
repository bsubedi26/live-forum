import React from 'react'
import { useDispatch, useGlobal } from 'reactn'
import styled from 'styled-components'
import { CardLink } from './common'
import ContainerLayout from 'wrappers/ContainerLayout'
import moment from 'moment'
import { Eyebrow, FeatureCard, PageTitle, SectionDescription, SectionHeading, TwoColumnLayout } from 'components/common'

const SidebarCard = styled(FeatureCard)`
  padding: 1.35rem;
`

const ChannelList = styled.div`
  display: grid;
  gap: 1rem;
`

const SidebarTitle = styled.h2`
  margin: 0 0 0.35rem;
  color: var(--text-strong);
  font-size: 1.1rem;
  font-weight: 700;
`

const SidebarCopy = styled.p`
  margin: 0 0 1rem;
  color: var(--text-muted);
  line-height: 1.7;
`

const MainColumn = styled.div`
  display: grid;
  gap: 1.25rem;
`

const ComposerCard = styled(FeatureCard)`
  padding: 1rem;
`

const ComposerForm = styled.form`
  display: flex;
  align-items: center;
  gap: 0.85rem;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
  }
`

const ComposerInput = styled.input.attrs({ className: 'form-control' })`
  flex: 1;
  height: 3.5rem;
  border-radius: 18px;
  border: 1px solid var(--border-soft);
  padding: 0 1rem;
  background: rgba(248, 250, 252, 0.9);
  box-shadow: none;

  &:focus {
    border-color: rgba(59, 130, 246, 0.28);
    box-shadow: 0 0 0 0.2rem rgba(59, 130, 246, 0.12);
  }
`

const ComposerButton = styled.button`
  height: 3.5rem;
  padding: 0 1.25rem;
  border: 0;
  border-radius: 18px;
  background: linear-gradient(135deg, #2563eb, #0f766e);
  color: #fff;
  font-weight: 700;
  transition: transform 180ms ease, box-shadow 180ms ease, opacity 180ms ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: var(--shadow-lifted);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const MessageFeed = styled(FeatureCard)`
  padding: 1.1rem;
`

const FeedHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1rem;
`

const FeedTitle = styled.h2`
  margin: 0;
  color: var(--text-strong);
  font-size: 1.2rem;
  font-weight: 700;
`

const FeedMeta = styled.span`
  color: var(--text-muted);
  font-size: 0.92rem;
`

const MessageStack = styled.div`
  display: grid;
  gap: 1rem;
`

const MessageCard = styled.article`
  padding: 1rem 1.1rem;
  border: 1px solid rgba(31, 61, 91, 0.08);
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(248, 250, 252, 0.96));
`

const MessageHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.65rem;
  margin-bottom: 0.75rem;
`

const MessageChannel = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background: rgba(59, 130, 246, 0.1);
  color: var(--accent-strong);
  font-size: 0.82rem;
  font-weight: 700;
`

const MessageDate = styled.span`
  color: var(--text-muted);
  font-size: 0.9rem;
`

const MessageText = styled.p`
  margin: 0;
  color: var(--text-default);
  line-height: 1.8;
  white-space: pre-wrap;
  word-break: break-word;
`

const EmptyState = styled.div`
  padding: 1rem 0.25rem 0.5rem;
  color: var(--text-muted);
  line-height: 1.75;
`

const ChannelRoomsList = ({ items, currentChannel }) => (
  <ChannelList>
    {items.map((item, i) => (
      <CardLink item={item} key={i} current={item === currentChannel} />
    ))}
  </ChannelList>
)

const MessageList = ({ items }) => (
  <MessageStack>
    {items.map((item) => {
      const messageDate = moment.utc(item.updated_at).local().format('ddd, MMM D • h:mm A')

      return (
        <MessageCard key={item.id}>
          <MessageHeader>
            <MessageChannel>#{item.channel}</MessageChannel>
            <MessageDate>{messageDate}</MessageDate>
          </MessageHeader>
          <MessageText>{item.text}</MessageText>
        </MessageCard>
      )
    })}
  </MessageStack>
)

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
    const text = formMessageText.trim()

    if (!text) return

    await dispatchMessageCreate({
      text,
      channel: channelName,
      creator_id: auth.user && auth.user.id ? auth.user.id : 1 // TODO: remove harcoded user id for to allow anonymous users id: 1 is admin
    })
    setFormMesageText('')
  }

  const visibleChannels = channelRooms.length
    ? [
      channelName,
      ...channelRooms.filter(item => item !== channelName)
    ]
    : [channelName]

  return (
    <ContainerLayout>
      <SectionHeading>
        <div>
          <Eyebrow>Live Channel</Eyebrow>
          <PageTitle>#{channelName}</PageTitle>
        </div>
        <SectionDescription>
          Send quick updates, drop in for real-time back-and-forth, and move between rooms without losing the thread of the conversation.
        </SectionDescription>
      </SectionHeading>

      <TwoColumnLayout columns='320px minmax(0, 1fr)'>
        <div>
          <SidebarCard>
            <SidebarTitle>Other Channels</SidebarTitle>
            <SidebarCopy>
              Keep the current room pinned at the top and jump into the next conversation with a cleaner, easier-to-scan list.
            </SidebarCopy>
            <ChannelRoomsList items={visibleChannels} currentChannel={channelName} />
          </SidebarCard>
        </div>

        <MainColumn>
          <ComposerCard>
            <ComposerForm onSubmit={onSubmit}>
              <ComposerInput
                name='message'
                type='text'
                value={formMessageText}
                placeholder={`Message #${channelName}`}
                onChange={e => setFormMesageText(e.target.value)}
              />
              <ComposerButton type='submit' disabled={!formMessageText.trim()}>
                Send
              </ComposerButton>
            </ComposerForm>
          </ComposerCard>

          <MessageFeed>
            <FeedHeader>
              <FeedTitle>Conversation Feed</FeedTitle>
              <FeedMeta>{messageState.length} message{messageState.length === 1 ? '' : 's'}</FeedMeta>
            </FeedHeader>
            {messageState.length
              ? <MessageList items={messageState} />
              : (
                <EmptyState>
                  No messages yet. Start the room with a quick note so the next person has something to respond to.
                </EmptyState>
              )}
          </MessageFeed>
        </MainColumn>
      </TwoColumnLayout>
    </ContainerLayout>

  )
}
