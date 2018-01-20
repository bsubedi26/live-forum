import React from 'react';

const CreateForm = props => {
  const { onSubmit, onChange } = props;

  return (
    <div>
      <form onSubmit={onSubmit} noValidate>
        <input id="title" onChange={onChange} className="form-control my-2" placeholder="Thread Title" />
        <textarea id="summary" onChange={onChange} className="form-control my-2" rows="3" placeholder="Thread Summary"></textarea>
        <button className="btn btn-outline-info my-2 pointer">Submit</button>
      </form>
    </div>
  )
}

export default CreateForm;