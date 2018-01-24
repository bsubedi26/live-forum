import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

class ModalForm extends React.Component {
  
  clearInputs() {
    for (let input in this.refs) {
      this.refs[input].value = "";
    }
  }

  modalSubmit = (e) => {
    e.preventDefault();
    const { onSubmit, toggleModal } = this.props;
    const results = {};

    for (let input in this.refs) {
      results[input] = this.refs[input].value;
    }
    toggleModal();
    this.clearInputs();
    return onSubmit(results);
  }

  renderFormGroup(inputs) {
    return inputs.map((input, idx) => {
      return (
        <div key={idx} className="form-group">
          <label htmlFor={input}>{input}</label>
          <input ref={input} type="text" className="form-control" />
        </div>
      )
    })
  }
 
  render() {
    const { showModal, toggleModal, title, inputs } = this.props;

    return (
      <div>
        <Modal isOpen={showModal} toggle={toggleModal} className={this.props.className}>
          <ModalHeader toggle={toggleModal}>{title}</ModalHeader>
          <ModalBody>
            <form onSubmit={this.modalSubmit}>
              {this.renderFormGroup(inputs)}
              <hr />
              <button type="submit" className="btn btn-outline-primary btn-block pointer">Submit</button>
            </form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

ModalForm.propTypes = {
  title: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  inputs: PropTypes.array.isRequired
}

export default ModalForm;
