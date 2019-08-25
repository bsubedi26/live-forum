import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { push, getLocation } from 'react-router-redux';
import ModalForm from '../ModalForm';
import { NavLink } from '../common';
import feathers, { services } from 'util/feathers';

class SidebarContent extends React.Component {
  state = {
    showModal: false,
    toggle: false,
    activeTab: this.props.location.pathname,
    pathRoot: '/thread',
    topicLinks: []
    // topicLinks: [
    //   { id: 2, name: "react", path: "/thread/2", display: "React" },
    //   { id: 3, name: "redux", path: "/thread/3", display: "Redux" },
    //   { id: 6, name: "nodejs", path: "/thread/6", display: "NodeJS" }
    // ]
  }

  topicService = feathers.service('topics');

  initListeners() {
    const { dispatch } = this.props;

    this.topicService.on('created', (data) => {
      console.log('TOPIC:on::Created ', data);
      dispatch({ type: 'SOCKET_TOPICS_ON_CREATED', payload: data });
      dispatch({ type: 'UI_UPDATE_THREADS_TOPICS', payload: data });
    });

  }

  componentDidUnmount() {
    this.topicService.removeAllListeners("created");
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    this.initListeners();
    const { value } = await dispatch(services.topics.find());
    dispatch({ type: 'UI_UPDATE_THREADS_TOPICS', payload: value });
  }

  toggleCollapse = (e) => {
    this.setState({ toggle: !this.state.toggle });
  }
  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  }

  handleSubmitCreateTopic = async (values) => {
    const { dispatch } = this.props;
    const displayName = values["Topic Name"].charAt(0).toUpperCase() + values["Topic Name"].slice(1);

    await dispatch(services.topics.create({
      name: values["Topic Name"],
      display: displayName
    }));
  }

  goRoute(path) {
    this.props.dispatch(push(path));
  }

  renderIcon = (type) => {
    return (
      <i className={`fa fa-arrow-${type} p-2`} aria-hidden="true"></i>
    )
  }

  render() {
    const { pathRoot } = this.state;
    const { routerLocation, topics } = this.props;

    return (
      <div>
        <ul className="list-unstyled sidebar-ul">
          <li className="p-1 sidebar-hover pointer" onClick={this.toggleCollapse} data-toggle="collapse" data-target="#topicList">
            {
              this.state.toggle ? this.renderIcon('down') : this.renderIcon('right')
            }
            <span className="lead font-weight-bold">Topics</span>
          </li>
          <div className="collapse" id="topicList">
            <ul className="navbar-nav mr-auto">
              {topics.map((link) =>
                (
                  <NavLink activeTab={routerLocation.pathname.includes(`${pathRoot}/${link.id}`)} onClick={this.goRoute.bind(this, `${link.id}`)} className="nav-item pointer sidebar-hover mx-2" key={link.name}>
                    <a className="nav-link">{link.display}</a>
                  </NavLink>
                )
              )}

            </ul>
          </div>

          <li onClick={this.toggleModal} className="p-1 sidebar-hover pointer">
            <i className="fa fa-plus p-2" aria-hidden="true"></i>
            <span className="lead font-weight-bold">Create</span>
          </li>
        </ul>

        <ModalForm toggleModal={this.toggleModal} showModal={this.state.showModal} onSubmit={this.handleSubmitCreateTopic} title="Create Topic" inputs={['Topic Name']} />
      </div>
    )
  }
}


const mapState = state => ({
  routerLocation: getLocation(state),
  topics: state.topics.queryResult.data
})

export default withRouter(connect(mapState)(SidebarContent));
