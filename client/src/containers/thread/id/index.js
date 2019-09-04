import React from 'react'
import { useGlobal, useDispatch } from 'reactn'
import CommentForm from './common/CommentForm'
import SingleThread from './common/SingleThread'
import CommentList from './common/CommentList'
import Pagination, { getSlicedPages } from 'components/Pagination'

const ITEMS_PER_PAGE = 5

const ThreadDetailById = ({ match }) => {
  const [auth] = useGlobal('auth')
  const [thread, setThread] = useGlobal('threads/get')
  const threadGet = useDispatch('threads/get')
  const commentCreate = useDispatch('comments/create')

  const [formState, setFormState] = React.useState({ comment: '' })
  const [currentPage, setCurrentPage] = React.useState(1)

  const onPaginationChange = (selected) => {
    if (selected === 'previous') return setCurrentPage(currentPage - 1)
    if (selected === 'next') return setCurrentPage(currentPage + 1)
    return setCurrentPage(selected)
  }

  React.useEffect(() => {
    const fetchData = (threadId) => {
      threadGet(threadId)
    }

    fetchData(match.params.threadId)
  }, [match.params.threadId, threadGet])

  const onChange = ({ target }) => setFormState({ ...formState, [target.id]: target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    const { comment } = formState
    const payload = { comment, thread_id: match.params.threadId, creator_id: auth.user.id }
    const globalState = await commentCreate(payload)
    const createdData = globalState['comments/create']
    setThread({
      ...thread,
      _comments: [createdData].concat(thread._comments)
    })
    setFormState({ comment: '' })
  }

  const hasComments = () => thread && thread._comments && thread._comments.length

  return (
    <div className='mx-auto w-75 mt-4'>
      {thread ? <SingleThread {...{ auth }} /> : null}
      {auth.accessToken && thread
        ? <CommentForm onSubmit={onSubmit} onChange={onChange} value={formState.comment} />
        : <div className='pv2'><span>You <em>must</em> be signed in before posting a comment.</span></div>}
      <hr />
      {hasComments() ? <CommentList auth={auth} comments={getSlicedPages(thread._comments, { currentPage, ITEMS_PER_PAGE })} /> : null}
      {hasComments()
        ? (
          <Pagination
            totalPages={Math.ceil(thread._comments.length / ITEMS_PER_PAGE)}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={onPaginationChange}
            onPageChangeFunc={setCurrentPage}
            currentPage={currentPage}
          />
        ) : null}
    </div>
  )
}

export default ThreadDetailById
