import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ThreadList from './ThreadList';
import feathers, { services } from 'util/feathers';

class ThreadPage extends React.Component {
  state = {
    forums: []
  }

  threadService = feathers.service('threads');

  initListeners() {
    const { dispatch } = this.props;

    this.threadService.on('created', (data) => {
      console.log('THREAD:on::Created ', data);
      // dispatch(services.threads.onCreated(data));
      dispatch({ type: 'SOCKET_THREADS_ON_CREATE', payload: data });

    });
    
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

  dispatchFind(topicId) {
    const { dispatch } = this.props;

    // dispatch(services.threads.find({ query: { topic_id: topicId } }))
    dispatch(services.threads.find({ query: { topic_id: topicId, $sort: { updated_at: '-1' } } }))
    // .then(({ action }) => {
    //   this.setState({
    //     forums: action.payload.data
    //   })
    // })
    // .catch(err => console.log(err));
  }

  render() {
    const { topicId } = this.props.match.params;
    const { threads } = this.props;

    return (
      <div className="row mx-auto w-75 mt-4">

        <div className="col-10">
          <div className="card">
            <div className="card-header">
              Discussions
            </div>

            <ThreadList threads={threads} topicId={topicId} />
          </div>
        </div>

        <Link to={`${this.props.location.pathname}/create`} className="col-2">
            <button className="btn btn-outline-info pointer">New Discussion</button>
        </Link>
        
      </div>
    )
  }
}

const mapState = state => ({
  threads: state.threads.queryResult.data
})

export default connect(mapState)(ThreadPage);