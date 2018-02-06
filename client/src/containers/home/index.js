import React from 'react';
import { FadeIn } from 'animate-css-styled-components';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

import HeaderSection from './common/HeaderSection';
import ExploreSection from './common/ExploreSection';
// import CreateSection from './common/CreateSection';
// import Footer from 'components/Footer';


class Home extends React.Component {

  goRoute = (path) => {
    this.props.dispatch(push(path));
  }

  prom = (timer) => {
    return new Promise(resolve => setTimeout(resolve, timer))
  }

  clicked = async (e) => {
    e.preventDefault();
    this.props.dispatch(showLoading('nav-top'))
    await this.prom(5000)
    console.log('done')
    this.props.dispatch(hideLoading('nav-top'))
    
  } 

  render() {
    return (
      <div>
        <FadeIn>
          <button className="btn btn-outline-primary my-2" onClick={this.clicked}>Simulate Loader</button>
          <HeaderSection {...this.props} />
          <ExploreSection goRoute={this.goRoute}></ExploreSection>
          {/* <CreateSection goRoute={this.goRoute}></CreateSection> */}
          {/* <Footer /> */}
        </FadeIn>
      </div>
    )
  }
}

export default connect(null)(Home);
