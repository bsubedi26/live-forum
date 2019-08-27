import React from 'react'
import { useGlobal } from 'reactn'
import { LineText } from 'components/common'
import { FadeIn } from 'animate-css-styled-components'
import Avatar from 'components/Avatar'
import moment from 'moment'
import EditAndDeleteButtons from 'components/Forms/EditAndDeleteButtons'
import { Comment } from 'services'

const EditForm = ({ comment, setComment, handleEdit }) => {
  return (
    <FadeIn>
      <form className='mx-auto w-75 mt-2' onSubmit={handleEdit} noValidate>
        <textarea onChange={(e) => setComment(e.target.value)} value={comment} className='form-control' rows='2' placeholder='Edit Comment...' autoFocus />
        <div className='text-muted m-3'>
          <button className='btn btn-outline-primary pointer'>Submit</button>
        </div>
      </form>
    </FadeIn>
  )
}

const CommentItem = ({ item, auth }) => {
  const [thread, setThread] = useGlobal('thread')
  const [comment, setComment] = React.useState('')
  const [showEditForm, setShowEditForm] = React.useState(false)
  const commentDate = moment.utc(item.updated_at).local().format('dddd MMM D YYYY h:mm A')

  const handleEdit = async (event) => {
    event.preventDefault()
    const updatedData = await Comment.patch(item.id, { comment })
    setThread({
      ...thread,
      _comments: thread._comments.map(item => item.id === updatedData.id ? updatedData : item)
    })
    setComment('')
  }

  const handleDeleteClick = async () => {
    const removedData = await Comment.remove(item.id)
    setThread({
      ...thread,
      _comments: thread._comments.filter(item => item.id !== removedData.id)
    })
    setShowEditForm(false)
  }

  return (
    <div className='card'>
      <div className='card-header'>
        <Avatar avatar={item._creator.avatar} />
        <LineText className='my-2'>{item._creator.email}</LineText>
      </div>

      <div className='text-center'>
        <p className='mt-2'>
          {item.comment}
        </p>
        <LineText><strong>UserID: </strong> {item._creator.id} - {item._creator.email}</LineText>
        <LineText>
          <span className='mr-2'>{commentDate}</span>
        </LineText>
      </div>
      {auth.user && auth.user.id === item.creator_id
        ? <EditAndDeleteButtons onEdit={() => setShowEditForm(true)} onDelete={handleDeleteClick} />
        : null}
      {showEditForm ? <EditForm {...{ handleEdit, setComment, comment }} /> : null}
    </div>
  )
}

export default ({ auth, comments }) => <div>{comments.map((item, i) => <CommentItem item={item} auth={auth} key={i} />)}</div>
