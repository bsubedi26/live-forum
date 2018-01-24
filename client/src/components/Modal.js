import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

class Modal extends React.Component {
  hideModal() {
    $('#modalCmp').modal('hide');
  }
  
  clearInputs() {
    for (let input in this.refs) {
      this.refs[input].value = "";
    }
  }

  modalSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const results = {};

    for (let input in this.refs) {
      results[input] = this.refs[input].value;
    }
    this.hideModal();
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
    const { title, inputs } = this.props

    return (
        <div id="modalCmp" className="modal fade text-dark">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {title}
                </h5>
              </div>
              <div className="modal-body">
                <form onSubmit={this.modalSubmit}>
                  {this.renderFormGroup(inputs)}
                  <hr />
                  <button type="submit" className="btn btn-outline-primary btn-block pointer">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>      
    )
  }
}

Modal.propTypes = {
  inputs: PropTypes.array.isRequired
}

export default Modal;