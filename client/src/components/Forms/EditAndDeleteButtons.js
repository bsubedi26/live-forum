import React from 'react'

const EditAndDeleteButtons = ({ onEdit, onDelete }) => {
  return (
    <div>
      <button onClick={onEdit} className='btn btn-outline-info pointer ma2'>Edit</button>
      <button onClick={onDelete} className='btn btn-outline-danger pointer ma2'>Delete</button>
    </div>
  )
}

export default EditAndDeleteButtons
