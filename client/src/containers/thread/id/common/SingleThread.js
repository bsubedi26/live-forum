import React from 'react'
import { useGlobal } from 'reactn'
import { withRouter } from 'react-router-dom'
import { Title, LineText } from 'components/common'
import { FadeIn } from 'animate-css-styled-components'
import moment from 'moment'
import { Thread } from 'services'
import Avatar from 'components/Avatar'
import EditForm from 'components/Forms/thread/create'
import EditAndDeleteButtons from 'components/Forms/EditAndDeleteButtons'

const ThreadHeaderInfo = ({ thread }) => {
  const postDate = moment(thread.updated_at, 'YYYY-MM-DD HH:mm:ss').format('dddd MMM D YYYY h:mm A')
  return (
    <>
      <div>
        <Avatar avatar={thread._creator.avatar} />
        <Title className='my-3'>Title: {thread.title}</Title>
        <LineText className='my-2'>Posted By:{thread._creator.email}</LineText>
      </div>

      <LineText className='pt-2'>
        <span className='mr-2'>{postDate}</span>
        <span className='mr-2'>-</span>
        <span className='mr-2'>{thread._comments.length} comments</span>
      </LineText>
    </>
  )
}
const SingleThread = ({ auth, thread, history }) => {
  const [state, setState] = React.useState({
    showEditForm: false,
    title: '',
    summary: ''
  })
  const [, setThread] = useGlobal('thread')

  const handleOnChange = ({ target }) => setState({ ...state, [target.id]: target.value })

  const handleEditThreadSubmit = async (event) => {
    console.log('handleEditThreadSubmit: ')
    event.preventDefault()
    const { title, summary } = state
    const payload = { title, summary }
    const updatedData = await Thread.patch(thread.id, payload)
    setThread(updatedData)
    setState({ ...state, showEditForm: false })
  }

  const removeThread = async () => {
    await Thread.remove(thread.id)
    history.goBack()
  }

  return (
    <div className='card'>
      <div className='card-header m'>
        <ThreadHeaderInfo thread={thread} />
      </div>
      <div className='text-center'>
        <p className='mt-2'>{thread.summary}</p>
        <LineText><strong>UserID: </strong> {thread._creator.id}</LineText>

        {auth.user && auth.user.id === thread.creator_id ? <EditAndDeleteButtons onEdit={() => setState({ ...state, showEditForm: true })} onDelete={removeThread} /> : null}

        {state.showEditForm ? <FadeIn><EditForm onSubmit={handleEditThreadSubmit} onChange={handleOnChange} /></FadeIn> : null}

      </div>

    </div>
  )
}

export default withRouter(SingleThread)
