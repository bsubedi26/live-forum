import React from 'react'

const CommentForm = ({ onSubmit, onChange, value }) => (
  <div className='mt-3 card'>
    <form onSubmit={onSubmit}>
      <textarea id='comment' onChange={onChange} value={value} className='form-control' rows='2' placeholder='Comment...' required />
      <div className='card-footer text-muted'>
        <button className='btn btn-outline-info pointer'>Submit</button>
      </div>
    </form>
  </div>
)

export default CommentForm
