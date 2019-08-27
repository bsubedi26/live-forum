import React from 'react'
import { useGlobal } from 'reactn'
import CommentForm from './common/CommentForm'
import SingleThread from './common/SingleThread'
import CommentList from './common/CommentList'
import { Thread, Comment } from 'services'
import { fetchAndSet } from 'state'
import Pagination from 'components/Pagination'
import { getSlicedPages } from 'util/helpers'

const ITEMS_PER_PAGE = 5

const ThreadDetailById = ({ match }) => {
  const [state, setState] = React.useState({
    comment: ''
  })
  const [currentPage, setCurrentPage] = React.useState(1)

  const onPaginationChange = (selected) => {
    if (selected === 'previous') return setCurrentPage(currentPage - 1)
    if (selected === 'next') return setCurrentPage(currentPage + 1)
    return setCurrentPage(selected)
  }

  const [auth] = useGlobal('auth')
  const [thread, setThread] = useGlobal('thread')

  React.useEffect(() => {
    fetchAndSet(Thread.get, 'thread', match.params.threadId)
  }, [match.params.threadId])

  const onChange = ({ target }) => setState({ [target.id]: target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    const { comment } = state
    const payload = { comment, thread_id: match.params.threadId, creator_id: auth.user.id }
    const createdData = await Comment.create(payload)
    setThread({
      ...thread,
      _comments: [createdData].concat(thread._comments)
    })
    setState({ comment: '' })
  }

  const hasComments = () => thread._comments && thread._comments.length > 0

  return (
    <div className='mx-auto w-75 mt-4'>
      {Object.keys(thread).length > 0 ? <SingleThread {...{ auth, thread }} /> : null}
      {auth.accessToken
        ? <CommentForm onSubmit={onSubmit} onChange={onChange} value={state.comment} />
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
