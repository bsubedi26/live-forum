import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import feathers, { services } from 'util/feathers';
import { ThreadList } from './common/ThreadList';
import ThreadPagination from './common/ThreadPagination';
import { findActiveThread } from 'reducers/ui/selectors';
import SidebarFixed from 'components/sidebar';
import ThreadHeader from './common/Header';
import Toast from 'components/Toast';

// threadService = feathers.service('threads');

// initListeners() {
//   const { dispatch } = this.props;

//   this.threadService.on('created', (data) => {
//     console.log('THREAD:on::Created ', data);
//     console.log('this.topicId: ', this.topicId);

//     if (data.topic_id === parseInt(this.topicId, 10)) {
//       this.props.dispatch({ type: 'UI/TOAST_TOGGLE', payload: { active: true, message: `New thread created by: ${data._creator.email}` } });
//     }
//     dispatch({ type: 'SOCKET_THREADS_ON_CREATED', payload: data });
//   });

//   this.threadService.on('removed', (data) => {
//     console.log('THREAD:on::Removed ', data);
//     dispatch({ type: 'SOCKET_THREADS_ON_REMOVED', payload: data });
//   });

// }

// componentWillUnmount() {
//   this.threadService.removeAllListeners("created");
//   this.threadService.removeAllListeners("removed");
// }

// componentDidMount() {
//   const { topicId } = this.props.match.params;
//   this.topicId = topicId;
//   this.dispatchFind(topicId);
//   this.initListeners();
// }

// componentWillReceiveProps(nextProps) {
//   if (nextProps.location.pathname !== this.props.location.pathname) {
//     const { topicId } = nextProps.match.params;
//     console.log('changed topicId ', topicId)
//     this.topicId = topicId;
//     console.log('set this.topicId ', this.topicId)
//     this.dispatchFind(topicId);
//   }
// }


class ThreadPage extends React.Component {
  state = {
    topicId: 1
  }

  threadService = feathers.service('threads');

  initListeners() {
    const { dispatch } = this.props;

    this.threadService.on('created', (data) => {
      console.log('THREAD:on::Created ', data);
      // if the new thread's topic equals the currently viewed topic thread
      // dispatch the toast notifying all the users viewing the thread
      if (data.topic_id === parseInt(this.state.topicId, 10)) {
        this.props.dispatch({ type: 'UI/TOAST_TOGGLE', payload: { active: true, message: `New thread created by: ${data._creator.email}` } });
      }
      dispatch({ type: 'SOCKET_THREADS_ON_CREATED', payload: data });
    });

    this.threadService.on('removed', (data) => {
      console.log('THREAD:on::Removed ', data);
      dispatch({ type: 'SOCKET_THREADS_ON_REMOVED', payload: data });
    });

  }

  componentWillUnmount() {
    this.threadService.removeAllListeners("created");
    this.threadService.removeAllListeners("removed");
  }

  componentDidMount() {
    const { topicId } = this.props.match.params;
    this.setState({ topicId });
    this.dispatchFind(topicId);
    this.initListeners();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      const { topicId } = nextProps.match.params;
      this.setState({ topicId });
      this.dispatchFind(topicId);
    }
  }

  async dispatchFind(topicId) {
    const { dispatch } = this.props;

    await dispatch(services.threads.find({ query: { topic_id: topicId, $sort: { updated_at: '-1' } } }));
  }

  render() {
    const { topicId } = this.props.match.params;
    const { topic } = this.props;

    return (
      <div className="row mx-0">
        <Toast />

        {/* SIDEBAR */}
        <div className="d-none d-md-block">
          <SidebarFixed />
        </div>

        {/* PLACEHOLDER SPACE FOR SIDEBAR */}
        <div className="col-4"></div>

        <div className="col-md-8">
          {/* PAGINATION BUTTONS */}
          <div className="d-flex justify-content-center mt-4">
            <ThreadPagination {...this.props} />
            {/* <Pagination {...this.props} itemsPerPage={5} name="threads" data={threads} /> */}

            {/* CREATE NEW THREAD BUTTON */}
            <Link to={`${this.props.location.pathname}/create`} className="pa2">
              <button className="btn btn-outline-info pointer">Create New Thread</button>
            </Link>

          </div>

          {/* <div className="row mx-auto w-75 mt-4"> */}
          <div className="d-flex mt-4">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <ThreadHeader topic={topic} />
                </div>

                {/* LIST THE ARRAY OF THREADS */}
                <ThreadList {...this.props} topicId={topicId} />
                {/* <PaginationList {...this.props} topicId={topicId} itemsPerPage={5} name="threads" data={threads} auth={auth} /> */}
              </div>
            </div>

          </div>

        </div>

      </div>
    )
  }
}


const findActiveTopic = (data, props) => {
  const { topicId } = props.match.params;
  let topic = data.find(topic => topic.id === parseInt(topicId, 10))
  return topic
}

const mapState = (state, props) => ({
  threads: state.threads.queryResult.data,
  topic: findActiveTopic(state.topics.queryResult.data, props),
  activeThread: findActiveThread(state, props) || {},
  auth: state.auth
})

export default connect(mapState)(ThreadPage);