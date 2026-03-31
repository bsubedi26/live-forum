import React from 'react'
import { FeatureCard } from 'components/common'

const CommentForm = ({ onSubmit, onChange, value }) => (
  <FeatureCard className='mb-4 overflow-hidden'>
    <form onSubmit={onSubmit}>
      <div className='app-card-body pb-3'>
        <textarea id='comment' onChange={onChange} value={value} className='form-control' rows='3' placeholder='Write a thoughtful reply...' required />
      </div>
      <div className='app-card-body pt-0'>
        <button className='btn btn-outline-info pointer'>Submit Comment</button>
      </div>
    </form>
  </FeatureCard>
)

export default CommentForm
