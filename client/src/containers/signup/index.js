import React from 'react'
import { actions as AuthActions } from 'reducers/auth'
import FormContainer from './form'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { FadeIn } from 'animate-css-styled-components';

class Signup extends React.Component {
  state = {
    error: false,
    errorMessage: null
  }

  handleSubmit = (formValues) => {
    const { dispatch } = this.props

    return dispatch(AuthActions.signup(formValues))
    .then(res => {
      this.setState({ error: false, errorMessage: null })
      dispatch(push('/login'))
      return res
    })
    .catch(err => {
      console.log('.catch ', err)
      this.setState({ error: true, errorMessage: err.message })
      return Promise.reject(err)
    })
    
  }

  renderErrorAlert = (message) => {
    return (
      <div className="alert alert-danger" role="alert">
        { message }
      </div>
    )
  }

  render() {
    return (
      <div>
        <FadeIn>
          <div className="jumbotron">
            <h1 className="display-3">Signup Below!</h1>
            <p className="lead">Join the community to access featured content and information.</p>

            { this.state.error ? this.renderErrorAlert(this.state.errorMessage) : null }
            <hr className="my-4" />
            <FadeIn>
              <FormContainer handleSubmit={this.handleSubmit} />
            </FadeIn>
          </div>
        </FadeIn>
        
      </div>
   
    )
  }
}


export default connect(null)(Signup)
