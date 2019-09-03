import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'

const ModalForm = ({ inputs, onSubmit, toggleModal, title, showModal }) => {
  const [formState, setState] = useState({})
  const modalSubmit = (e) => {
    e.preventDefault()
    toggleModal()
    return onSubmit(formState)
  }
  const onChange = e => {
    setState({
      ...formState,
      [e.target.id]: e.target.value
    })
  }

  return (
    <div>
      <Modal isOpen={showModal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{title}</ModalHeader>
        <ModalBody>
          <form onSubmit={modalSubmit}>
            {
              inputs.map(({ label, value }, idx) => {
                return (
                  <div key={idx} className='form-group'>
                    <label htmlFor={value}>{label}</label>
                    <input id={value} type='text' className='form-control' placeholder={label} onChange={onChange} />
                  </div>
                )
              })
            }
            <hr />
            <button type='submit' className='btn btn-outline-primary btn-block pointer'>Submit</button>
          </form>
        </ModalBody>
      </Modal>
    </div>
  )
}

ModalForm.propTypes = {
  title: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  showModal: PropTypes.bool,
  inputs: PropTypes.array.isRequired
}

export default ModalForm
