import React from 'react'
import { useGlobal, useDispatch } from 'reactn'
import CreateThreadForm from 'components/Forms/thread/create'
import Alerts from 'components/Alerts'

const ThreadCreatePage = ({ match }) => {
  const [state, setState] = React.useState({
    title: '',
    summary: '',
    showSuccess: false
  })
  const [auth] = useGlobal('auth')
  const threadCreate = useDispatch('threads/create')

  const handleOnChange = ({ target }) => setState({ ...state, [target.id]: target.value })

  const handleCreateForum = async (e) => {
    e.preventDefault()
    const { topicId } = match.params
    const { title, summary } = state
    const payload = { title, summary, topic_id: parseInt(topicId, 10), creator_id: auth.user.id }
    await threadCreate(payload)
    setState({ showSuccess: true })
  }

  return (
    <div className='mx-auto w-75 mt-4'>
      <div className='card'>
        <div className='card-header'>
          <h5>You are creating a new thread.</h5>
        </div>

        {state.showSuccess
          ? <Alerts type='success' message='Successfully created thread!' />
          : null}

        {auth.accessToken
          ? <CreateThreadForm onSubmit={handleCreateForum} onChange={handleOnChange} />
          : (
            <div className='p-2'>
              <span>You <em>must</em> be signed in before creating a thread.</span>
            </div>
          )}
      </div>

    </div>
  )
}

export default ThreadCreatePage
