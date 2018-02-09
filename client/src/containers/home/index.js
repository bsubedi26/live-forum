import React from 'react';
import { FadeIn } from 'animate-css-styled-components';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import HeaderSection from './common/HeaderSection';
import ExploreSection from './common/ExploreSection';
// import CreateSection from './common/CreateSection';
// import Footer from 'components/Footer';

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
          {/* <CreateSection goRoute={this.goRoute}></CreateSection> */}
          {/* <Footer /> */}
        </FadeIn>
      </div>
    )
  }
}

export default connect(null)(Home);
