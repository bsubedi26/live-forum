import React from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch } from 'reactn'
import ModalForm from './ModalForm'
import LinkComp from 'components/Link'

const SidebarContent = ({ data, location }) => {
  const topicCreate = useDispatch('topics/create')

  const [state, setState] = React.useState({
    showModal: false,
    toggle: false,
    activeTab: location.pathname
  })

  const toggleCollapse = (e) => {
    setState({ toggle: !state.toggle })
  }

  const toggleModal = () => {
    setState({ showModal: !state.showModal })
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
      <ul className='list-unstyled sidebar-ul'>
        <li className='p-1 sidebar-hover pointer' onClick={toggleCollapse} data-toggle='collapse' data-target='#topicList'>
          {
            state.toggle ? renderIcon('down') : renderIcon('right')
          }
          <span className='lead font-weight-bold'>Topics</span>
        </li>
        <div className='collapse' id='topicList'>
          <ul className='navbar-nav mr-auto'>
            {data.map((link) =>
              (
                <LinkComp isActive={location.pathname.includes(`/${link.id}`)} to={`/thread/${link.id}`} label={link.name} key={link.id} className='ml-3' />
              )
            )}
          </ul>
        </div>

        <li onClick={toggleModal} className='p-1 sidebar-hover pointer'>
          <i className='fa fa-plus p-2' aria-hidden='true' />
          <span className='lead font-weight-bold'>Create</span>
        </li>
      </ul>

      <ModalForm
        toggleModal={toggleModal}
        showModal={state.showModal}
        onSubmit={onCreateTopic}
        title='Create Topic'
        inputs={[{ label: 'Topic Name', value: 'name' }]}
        // inputs={[{ label: 'Topic Name', value: 'name' }, { label: 'Topic Name2', value: 'name2' }]}
      />
    </div>
  )
}

export default withRouter(SidebarContent)
