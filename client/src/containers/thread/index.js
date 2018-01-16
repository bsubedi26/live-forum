import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import feathers, { services } from 'util/feathers';
import ThreadList from './ThreadList';
import PaginationButtons from './PaginationButtons';

class ThreadPage extends React.Component {

  threadService = feathers.service('threads');

  initListeners() {
    const { dispatch } = this.props;

    this.threadService.on('created', (data) => {
      console.log('THREAD:on::Created ', data);
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
    this.dispatchFind(topicId);
    this.initListeners();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      const { topicId } = nextProps.match.params;
      this.dispatchFind(topicId);
    }
  }

  async dispatchFind(topicId) {
    const { dispatch } = this.props;

    await dispatch(services.threads.find({ query: { topic_id: topicId, $sort: { updated_at: '-1' } } }));
  }

  render() {
    const { topicId } = this.props.match.params;

    return (
      <div>
        <div className="row justify-content-center mt-4">
          <PaginationButtons {...this.props} />
        </div>

        <div className="row mx-auto w-75 mt-4">
          <div className="col-11">
            <div className="card">
              <div className="card-header">
                Discussions
              </div>

              <ThreadList {...this.props} topicId={topicId} />
            </div>
          </div>

          <Link to={`${this.props.location.pathname}/create`} className="col-1">
              <button className="btn btn-outline-info pointer">New Discussion</button>
          </Link>
        </div>
          
        
      </div>
    )
  }
}

const findActiveThread = (threads, props) => {
  const topic = props.match.params.topicId;
  const result = threads.find(item => item.topic === parseInt(topic, 10));
  return result;
}

const mapState = (state, props) => ({
  threads: state.threads.queryResult.data,
  activeThread: findActiveThread(state.ui.threads, props),
  auth: state.auth
})

export default connect(mapState)(ThreadPage);