import React from 'react';
import { FadeIn } from 'animate-css-styled-components';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import HeaderSection from './common/HeaderSection';
import ExploreSection from './common/ExploreSection';
import CreateSection from './common/CreateSection';
import Footer from 'components/Footer';

class Home extends React.Component {

  goRoute = (path) => {
    this.props.dispatch(push(path));
  }

  render() {
    return (
      <div>
        <FadeIn>
          <HeaderSection {...this.props} />
          <ExploreSection goRoute={this.goRoute}></ExploreSection>
          <CreateSection goRoute={this.goRoute}></CreateSection>
          <Footer />
        </FadeIn>

        {/* 
          <div className="jumbotron">
            <h1 className="display-3">Live Forum!</h1>
            <button className="btn btn-chocolate btn-lg pointer">Primary</button>
            <p className="lead">This is a simple forum application that demonstrates how a real time forum works.</p>
            <hr className="my-4" />
            <p>The technologies used: ReactJS, ReduxJS, BootstrapCSS, NodeJS, FeathersJS, SQL, KnexJS, & SocketIO.</p>
            <p className="lead">
              <button onClick={this.goRoute.bind(this, '/thread/2')} className="btn btn-outline-primary btn-lg pointer ">Learn more</button>
            </p>
          </div> 
        */}
      </div>
    )
  }
}

export default connect(null)(Home);
