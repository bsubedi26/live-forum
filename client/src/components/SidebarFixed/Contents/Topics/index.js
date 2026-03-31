import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { useDispatch } from 'reactn'
import ModalForm from './ModalForm'
import LinkComp from 'components/Link'

const TopicList = styled.ul`
  max-height: 320px;
  margin: 0.75rem 0 0;
  padding-right: 0.35rem;
  overflow-y: auto;
`

const TopicAction = styled.li`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.85rem 0.95rem;
  border-radius: 18px;
  color: var(--text-default);
  transition: background-color 180ms ease, color 180ms ease;
`

const TopicTitle = styled.span`
  color: var(--text-strong);
  font-size: 1rem;
  font-weight: 700;
`

const SidebarContent = ({ data, location }) => {
  const topicCreate = useDispatch('topics/create')

  const [state, setState] = React.useState({
    showModal: false,
    toggle: true,
    activeTab: location.pathname
  })

  const toggleCollapse = () => {
    setState({ ...state, toggle: !state.toggle })
  }

  const toggleModal = () => {
    setState({ ...state, showModal: !state.showModal })
  }

  const onCreateTopic = async (topic) => {
    await topicCreate(topic)
  }

  const renderIcon = (type) => {
    return (
      <i className={`fa fa-arrow-${type} p-2`} aria-hidden='true' />
    )
  }

  return (
    <div>
      <ul className='list-unstyled sidebar-ul mb-0'>
        <TopicAction className='sidebar-hover pointer' onClick={toggleCollapse}>
          {state.toggle ? renderIcon('down') : renderIcon('right')}
          <TopicTitle>Threads</TopicTitle>
        </TopicAction>
        {state.toggle ? (
          <TopicList className='navbar-nav mr-auto'>
            {data.map((link) =>
              (
                <li key={link.id}>
                  <LinkComp isActive={location.pathname.includes(`/${link.id}`)} to={`/thread/${link.id}`} label={link.name} className='ml-2' />
                </li>
              )
            )}
          </TopicList>
        ) : null}

        <TopicAction onClick={toggleModal} className='sidebar-hover pointer mt-2'>
          <i className='fa fa-plus p-2' aria-hidden='true' />
          <TopicTitle>Create Topic</TopicTitle>
        </TopicAction>
      </ul>

      <ModalForm
        toggleModal={toggleModal}
        showModal={state.showModal}
        onSubmit={onCreateTopic}
        title='Create Topic'
        inputs={[{ label: 'Topic Name', value: 'name' }]}
      />
    </div>
  )
}

export default withRouter(SidebarContent)
