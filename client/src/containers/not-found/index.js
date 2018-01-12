import React from 'react';
import { FadeIn } from 'animate-css-styled-components';
import { connect } from 'react-redux';
import { replace, goBack } from 'react-router-redux';

class NotFound extends React.Component {

  route(path) {
    const { dispatch } = this.props;
    dispatch(replace(path));
  }

  goBack() {
    const { dispatch } = this.props;
    dispatch(goBack());
  }

  render() {
    return (
      <div>
        <FadeIn>
          <div className="jumbotron">
            <h1 className="display-3">Oh No! 404!</h1>
            <p className="lead">The page you request was not found.</p>
            <hr className="my-4" />
            <p className="lead">
              <button onClick={this.route.bind(this, '/home')} className="btn btn-primary btn-lg pointer hvr-float-shadow hvr-bounce-to-right">Go Home</button>
              <button onClick={this.goBack.bind(this)} className="btn btn-info btn-lg pointer hvr-float-shadow hvr-bounce-to-right mx-3">Go Back</button>
            </p>
          </div>
        </FadeIn>
      </div>
    )
  }
}

export default connect(null)(NotFound);
