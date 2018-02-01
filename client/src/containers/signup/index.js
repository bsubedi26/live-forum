import React from 'react';
import { Link } from 'react-router-dom';
import { actions as AuthActions } from 'reducers/auth';
import FormContainer from 'components/user/form';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { FadeIn } from 'animate-css-styled-components';

class Signup extends React.Component {

  handleSubmit = (formValues, setSubmitting) => {
    const { dispatch } = this.props;

    return dispatch(AuthActions.signup(formValues))
    .then(res => {
      setSubmitting(false);
      dispatch(push({ pathname: '/login', state: { message: 'Congratulations! Signup was successful.', type: 'success' } }));
      return res;
    })
    .catch(err => {
      // console.log('.catch ', err);
      return Promise.reject(err);
    })
  }

  renderAlert = message => {
    return (
      <div className="alert alert-info" role="alert">
        <h4 className="fw-400">{message}</h4>
      </div>
    )
  }

  render() {
    const { location } = this.props;

    return (
      <div className="mx-auto w-75">
        <FadeIn>
          <div className="jumbotron">
            {location.state && location.state.message ? this.renderAlert(location.state.message) : <h1 className="display-3">Signup Below!</h1>}

            <p className="lead">Join the community to access featured content and information.</p>
            <span>
              Already have an Account?
                <Link
                style={{ padding: '5px' }}
                to={{
                  pathname: '/login',
                  state: { message: 'Login with your account below!', type: 'info' }
                }}
              >
                Login here.</Link>
            </span>

            <hr className="my-4" />
            <FadeIn>
              <FormContainer buttonWidth25 handleSubmit={this.handleSubmit} />
            </FadeIn>
          </div>
        </FadeIn>
      </div>
    )
  }
}

export default connect(null)(Signup);