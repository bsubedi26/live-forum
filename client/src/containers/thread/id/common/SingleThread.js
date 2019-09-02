import React from 'react'
import { useGlobal, useDispatch } from 'reactn'
import { withRouter } from 'react-router-dom'
import { LineText } from 'components/common'
import { FadeIn } from 'animate-css-styled-components'
import EditForm from 'components/Forms/thread/create'
import EditAndDeleteButtons from 'components/Forms/EditAndDeleteButtons'
import ThreadHeaderInfo from './HeaderInfo'

const SingleThread = ({ auth, history }) => {
  const [thread, setThread] = useGlobal('threads/get')
  const threadPatch = useDispatch('threads/patch')

  const threadRemove = useDispatch('threads/remove')
  const [state, setState] = React.useState({
    showEditForm: false,
    title: '',
    summary: ''
  })

  const handleOnChange = ({ target }) => setState({ ...state, [target.id]: target.value })

  const handleEditThreadSubmit = async (event) => {
    event.preventDefault()
    const { title, summary } = state
    const payload = { title, summary }
    const globalState = await threadPatch(thread.id, payload)
    const updatedData = globalState['threads/patch']
    setThread(updatedData)
    setState({ ...state, showEditForm: false })
  }

  const removeThread = async () => {
    await threadRemove(thread.id)
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
