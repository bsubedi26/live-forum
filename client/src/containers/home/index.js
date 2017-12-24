import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { FadeIn } from 'animate-css-styled-components'
import { connect } from 'react-redux'
import { actions as AuthActions } from 'reducers/auth'
import { push } from 'react-router-redux'

class Home extends React.Component {

  handleVerify = (e) => {
    e.preventDefault();
    this.props.dispatch(AuthActions.verifyJwtOAuth());
  }

  goRoute(path) {
    this.props.dispatch(push(path))
  }

  render() {
    return (
      <div>
        <FadeIn>
          <div className="jumbotron">
            <h1 className="display-3">Welcome, home!</h1>
            <p className="lead">This is a simple forum application that demonstrates how a real time forum works.</p>
            <hr className="my-4" />
            <p>The technologies used: ReactJS, ReduxJS, BootstrapCSS, NodeJS, FeathersJS, SQL, KnexJS, & SocketIO.</p>
            <p className="lead">
              <button onClick={this.goRoute.bind(this, '/forum/react')} className="btn btn-outline-primary btn-lg pointer hvr-float-shadow hvr-bounce-to-right">Learn more</button>
              <button onClick={this.handleVerify} className="btn btn-info btn-lg pointer hvr-float-shadow hvr-bounce-to-right mx-3">Verify</button>
            </p>
          </div>
        </FadeIn>
      </div>
    )
  }
}

export default connect(null)(Home);
