import React from 'react';
import { FadeIn } from 'animate-css-styled-components';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import HeaderSection from './common/HeaderSection';
import ExploreSection from './common/ExploreSection';
// import CreateSection from './common/CreateSection';
// import Footer from 'components/Footer';
import Toast from 'components/toast';

class Home extends React.Component {

  goRoute = (path) => {
    this.props.dispatch({ type: 'UI/TOAST_TOGGLE', payload: { active: true, message: 'action dispatched' } });
    // this.props.dispatch(push(path));
  }

  render() {
    return (
      <div>
        <FadeIn>
          <Toast />
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
