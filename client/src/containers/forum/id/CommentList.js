import React from 'react'
import { Title, LineText } from '../common'

const CommentList = props => {
  const { createComment, handleOnChange, comments } = props

  return (
    <div>
      {comments.data.map((item, i) => {
        let commentDate = new Date(item.updated_at).toDateString()
        return (
          <div key={i} className="card">
            <div className="card-header">
              <Title>{item._user.data[0].email}</Title>
            </div>

            <div className="text-center">
              <p className="mt-2">
                {item.comment}
              </p>
              <LineText>ID: {item.creator_id} - <i className="fa fa-github m-1"></i> {item._user.data[0].email}</LineText>
              <LineText>
                <span className="mr-2">{commentDate}</span>
                {/* <span className="m-2">{item.favorites} favorites</span> */}
                {/* <span className="m-2">{post.opinions} opinions</span> */}
              </LineText>
            </div>

          </div>
        )
      })}
    </div>
  )
}

export default CommentList

