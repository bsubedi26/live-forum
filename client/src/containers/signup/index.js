import React from 'react';
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
      dispatch(push('/login'));
      return res;
    })
    .catch(err => {
      // console.log('.catch ', err);
      return Promise.reject(err);
    })
  }

  render() {
    return (
      <div>
        <FadeIn>
          <div className="jumbotron">
            <h1 className="display-3">Signup Below!</h1>
            <p className="lead">Join the community to access featured content and information.</p>
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