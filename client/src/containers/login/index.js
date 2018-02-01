import React from 'react';
import { Link } from 'react-router-dom';
import FormContainer from 'components/user/form';
import { actions as AuthActions } from 'reducers/auth';
import { connect } from 'react-redux';
import { FadeIn } from 'animate-css-styled-components';
import { push } from 'react-router-redux';

class Login extends React.Component {
  handleSubmit = (formValues) => {
    const { dispatch } = this.props;
    const credentials = { ...formValues, strategy: 'local' };
    // const credentials = { ...formValues, strategy: 'facebook' };
    
    return dispatch(AuthActions.authenticate(credentials))
    .then(res => {
      dispatch(push('/thread/1'));
    })
    .catch(err => {
      // console.log(err);
      return Promise.reject(err);
    })
  }

  renderAlert = state => {
    const { message, type } = state;

    return (
      <div className={`alert alert-${type}`} role="alert">
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
            {location.state && location.state.message ? this.renderAlert(location.state) : <h1 className="display-3">Login Below!</h1>}
              <p className="lead">Login to access the featured content and information.</p>
              <span>
                Don't have an Account?
                <Link
                  style={{padding: '5px'}}
                  to={{
                    pathname: '/signup',
                    state: { message: 'Signup for an account below!' }
                  }}
                >
                Register here.</Link>
              </span>
            <hr className="my-4" />
            <FadeIn>
              <FormContainer buttonWidth25 handleSubmit={this.handleSubmit} />
            </FadeIn>

            {/* <a href="http://localhost:3030/auth/github"> */}
            {/* <a href="/auth/github">
              <button className="mt-3 btn btn-default pointer">
                Login With Github
                <i className="fa fa-github fa-lg m-2" aria-hidden="true"></i>
              </button>
            </a> */}
          </div>
        </FadeIn>
      </div>
   
    )
  }
}

export default connect(null)(Login);
