import React from 'react'
import styled from 'styled-components'
import { useGlobal, useDispatch } from 'reactn'
import CommentForm from './common/CommentForm'
import SingleThread from './common/SingleThread'
import CommentList from './common/CommentList'
import Pagination, { getSlicedPages } from 'components/pagination'
import Loading from 'components/Loading'
import ContainerLayout from 'wrappers/ContainerLayout'
import { ButtonRow, Eyebrow, PageTitle, SectionDescription, SectionHeading } from 'components/common'

const ITEMS_PER_PAGE = 5

const SignInNotice = styled.div`
  padding: 1rem 1.25rem;
  margin: 1.25rem 0;
  border: 1px dashed rgba(31, 61, 91, 0.18);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.72);
  color: var(--text-muted);
`

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
    <ContainerLayout maxWidth='920px'>
      <SectionHeading>
        <div>
          <Eyebrow>Discussion Detail</Eyebrow>
          <PageTitle>Read the full thread and keep the conversation moving.</PageTitle>
        </div>
        <SectionDescription>
          Review the latest replies, leave a thoughtful comment, or update your own posts from a cleaner detail view.
        </SectionDescription>
      </SectionHeading>
      {thread ? <SingleThread {...{ auth }} /> : <Loading text='Loading thread...' />}
      {auth.accessToken && thread
        ? <CommentForm onSubmit={onSubmit} onChange={onChange} value={formState.comment} />
        : <SignInNotice>You <em>must</em> be signed in before posting a comment.</SignInNotice>}
      {hasComments() ? <CommentList auth={auth} comments={getSlicedPages(thread._comments, { currentPage, ITEMS_PER_PAGE })} /> : null}
      {hasComments()
        ? (
          <ButtonRow className='justify-content-center mt-3'>
            <Pagination
              totalPages={Math.ceil(thread._comments.length / ITEMS_PER_PAGE)}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={onPaginationChange}
              onPageChangeFunc={setCurrentPage}
              currentPage={currentPage}
            />
          </ButtonRow>
        ) : null}
    </ContainerLayout>
  )
}

export default ThreadDetailById
