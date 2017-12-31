import React from 'react'

const CreateForm = props => {
  const { handleCreateForum, handleOnChange } = props
  return (
    <div>
      <form onSubmit={handleCreateForum} noValidate>
        <input id="title" onChange={handleOnChange} className="form-control my-2" placeholder="Forum Title" />
        <textarea id="summary" onChange={handleOnChange} className="form-control my-2" rows="3" placeholder="Forum Summary"></textarea>
        <button className="btn btn-outline-info my-2">Submit</button>
      </form>
    </div>
  )
}

export default CreateForm