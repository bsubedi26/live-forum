import React from 'react'

const CommentForm = props => {
  const { createComment, handleOnChange } = props
  return (
    <div className="mt-3 card">
      <form onSubmit={createComment} noValidate>
        <textarea id="comment" onChange={handleOnChange} className="form-control" rows="2" placeholder="Comment..."></textarea>
        <div className="card-footer text-muted">
          <button className="btn btn-outline-info">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default CommentForm