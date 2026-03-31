import React from 'react'
import { ButtonRow } from 'components/common'

const EditAndDeleteButtons = ({ onEdit, onDelete }) => {
  return (
    <ButtonRow className='mt-3'>
      <button onClick={onEdit} className='btn btn-outline-info pointer'>Edit</button>
      <button onClick={onDelete} className='btn btn-outline-danger pointer'>Delete</button>
    </ButtonRow>
  )
}

export default EditAndDeleteButtons
