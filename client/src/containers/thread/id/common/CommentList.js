import React from 'react'
import styled from 'styled-components'
import { useGlobal, useDispatch } from 'reactn'
import { LineText, MetaRow, FeatureCard } from 'components/common'
import { FadeIn } from 'animate-css-styled-components'
import Avatar from 'components/Avatar'
import moment from 'moment'
import EditAndDeleteButtons from 'components/Forms/EditAndDeleteButtons'
import { UserLink } from 'components/User'

const CommentBody = styled.div`
  text-align: left;
`

const CommentText = styled.p`
  margin: 0 0 1rem;
  color: var(--text-default);
  line-height: 1.8;
`

const CommentCard = styled(FeatureCard)`
  margin-bottom: 1rem;
`

const EditForm = ({ comment, setComment, handleEdit }) => {
  return (
    <FadeIn>
      <form className='mt-3' onSubmit={handleEdit} noValidate>
        <textarea onChange={(e) => setComment(e.target.value)} value={comment} className='form-control' rows='3' placeholder='Edit Comment...' autoFocus />
        <div className='mt-3'>
          <button className='btn btn-outline-primary pointer'>Save Comment</button>
        </div>
      </form>
    </FadeIn>
  )
}

const CommentItem = ({ item, auth }) => {
  const [thread, setThread] = useGlobal('threads/get')
  const commentPatch = useDispatch('comments/patch')
  const commentRemove = useDispatch('comments/remove')

  const [comment, setComment] = React.useState('')
  const [showEditForm, setShowEditForm] = React.useState(false)
  const commentDate = moment.utc(item.updated_at).local().format('dddd MMM D YYYY h:mm A')

  const commentEditSubmit = async (event) => {
    event.preventDefault()
    const globalState = await commentPatch(item.id, { comment })
    const updatedData = globalState['comments/patch']
    setThread({
      ...thread,
      _comments: thread._comments.map(item => item.id === updatedData.id ? updatedData : item)
    })
    setComment('')
    setShowEditForm(false)
  }

  const commentRemoveSubmit = async () => {
    const globalState = await commentRemove(item.id)
    const removedData = globalState['comments/remove']
    setThread({
      ...thread,
      _comments: thread._comments.filter(item => item.id !== removedData.id)
    })
    setShowEditForm(false)
  }

  return (
    <CommentCard>
      <div className='app-card-body'>
        <div className='d-flex align-items-start'>
          {item._creator.avatar ? <Avatar avatar={item._creator.avatar} /> : null}
          <CommentBody className='ml-3 flex-grow-1'>
            <MetaRow className='mb-3'>
              <LineText><UserLink user={item._creator} /></LineText>
              <LineText>{commentDate}</LineText>
            </MetaRow>
            <CommentText>{item.comment}</CommentText>
            <LineText>UserID: {item._creator.id}</LineText>
            {auth.user && auth.user.id === item.creator_id
              ? <EditAndDeleteButtons onEdit={() => setShowEditForm(true)} onDelete={commentRemoveSubmit} />
              : null}
            {showEditForm ? <EditForm {...{ handleEdit: commentEditSubmit, setComment, comment }} /> : null}
          </CommentBody>
        </div>
      </div>
    </CommentCard>
  )
}

export default ({ auth, comments }) => <div className='mt-3'>{comments.map((item, i) => <CommentItem item={item} auth={auth} key={i} />)}</div>
