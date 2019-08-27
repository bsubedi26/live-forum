import React from 'react'

const CreateForm = ({ onSubmit, onChange }) => (
  <form onSubmit={onSubmit} noValidate>
    <input id='title' onChange={onChange} className='form-control my-2' placeholder='Thread Title' autoFocus />
    <textarea id='summary' onChange={onChange} className='form-control my-2' rows='3' placeholder='Thread Summary' />
    <button className='btn btn-outline-info my-2 pointer'>Submit</button>
  </form>
)

export default CreateForm
