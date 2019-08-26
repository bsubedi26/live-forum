import React from 'react'

const AlertView = ({ type = 'danger', message }) => {
  return (
    <div className={`alert alert-${type}`} role='alert'>
      <h4 className='fw-400'>{message}</h4>
    </div>
  )
}

export default ({ message, type, children }) => (
  message ? <AlertView {...{ message, type }} /> : children
)
