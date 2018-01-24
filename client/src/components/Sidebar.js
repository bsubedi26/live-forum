import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { push, getLocation } from 'react-router-redux';
import ModalForm from './ModalForm';
import { NavLink } from './common';

class Sidebar extends React.Component {
  state = {
    showModal: false,
    toggle: false,
    activeTab: this.props.location.pathname,
    topicLinks: [
      { id: 2, name: "react", path: "/thread/2", display: "React" },
      { id: 3, name: "redux", path: "/thread/3", display: "Redux" },
      { id: 6, name: "nodejs", path: "/thread/6", display: "NodeJS" },
      { id: 12, name: "feathersjs", path: "/thread/12", display: "FeathersJS" },
      { id: 13, name: "knexjs", path: "/thread/13", display: "KnexJS" }
    ]
  }

  toggleCollapse = (e) => {
    this.setState({ toggle: !this.state.toggle });
  }
  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  }

  handleSubmitCreateTopic = (values) => {
    console.log('CREATE TOPIC VALUES: ', values);
  }

  goRoute(path) {
    console.log(this.state)
    this.props.dispatch(push(path));
  }

  renderIcon = (type) => {
    return (
      <i className={`fa fa-arrow-${type} p-2`} aria-hidden="true"></i>
    )
  }

  render() {
    const { routerLocation } = this.props;

    return (
      <div className="col-2 d-none d-md-block p-0 sidebar-container">
        <ul className="list-unstyled sidebar-ul">
          <li className="p-1" onClick={this.toggleCollapse} data-toggle="collapse" data-target="#topicList">
            {
              this.state.toggle ? this.renderIcon('down') : this.renderIcon('right')
            }
            <span className="lead font-weight-bold">Topics</span>
          </li>
          <div className="collapse" id="topicList">
            <ul className="navbar-nav mr-auto">
              {this.state.topicLinks.map((link) =>
                (
                  <NavLink activeTab={routerLocation.pathname.includes(link.path)} onClick={this.goRoute.bind(this, link.path)} className="nav-item pointer mx-2" key={link.name}>
                    <a className="nav-link">{link.display}</a>
                  </NavLink>
                )
              )}

            </ul>
          </div>

          <li onClick={this.toggleModal} className="p-1">
            <i className="fa fa-plus p-2" aria-hidden="true"></i>
            <span className="lead font-weight-bold">Create</span>
          </li>
        </ul>
        
        <ModalForm toggleModal={this.toggleModal} showModal={this.state.showModal} onSubmit={this.handleSubmitCreateTopic} title="Create Topic" inputs={ ['Name', 'Area'] }/>
      </div>
    )
  }
}


const mapState = state => ({
  routerLocation: getLocation(state)
})

export default withRouter(connect(mapState)(Sidebar));
