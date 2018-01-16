import React from 'react';
import { connect } from 'react-redux';
import feathers, { services } from 'util/feathers';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import SingleThread from './SingleThread';

class ThreadDetailById extends React.Component {
  state = {
    comment: ''
  }
  
  commentService = feathers.service('comments');
  threadService = feathers.service('threads');

  initListeners() {
    const { dispatch } = this.props;

    this.commentService.on('created', (data) => {
      console.log('COMMENT:on::Created ', data);
      dispatch({ type: 'SOCKET_COMMENTS_ON_CREATED', payload: data });
    });

    this.commentService.on('removed', (data) => {
      console.log('COMMENT:on::Removed ', data);
      dispatch({ type: 'SOCKET_COMMENTS_ON_REMOVED', payload: data });
    });

    this.commentService.on('patched', (data) => {
      console.log('COMMENT:on::Patched ', data);
      dispatch({ type: 'SOCKET_COMMENTS_ON_PATCHED', payload: data });
    });

    this.threadService.on('patched', (data) => {
      console.log('THREAD:on::Patched ', data);
      dispatch({ type: 'SOCKET_THREADS_ON_PATCHED', payload: data });
    });

  }

  componentWillUnmount() {
    this.commentService.removeAllListeners("created");
    this.commentService.removeAllListeners("removed");
    this.commentService.removeAllListeners("patched");

    this.threadService.removeAllListeners("patched");
  }

  componentDidMount() {
    this.initListeners();
  }

  handleOnChange = (e) => this.setState({ [e.target.id]: e.target.value });

  createComment = async (e) => {
    e.preventDefault();
    const { dispatch, thread, auth } = this.props;
    const { comment } = this.state;
    const payload = { comment, thread_id: thread.id, creator_id: auth.id };

    await dispatch(services.comments.create(payload));
  }

  render() {
    const { thread, auth, dispatch } = this.props;

    return (
      <div className="mx-auto w-75 mt-4">
        <SingleThread auth={auth} thread={thread} dispatch={dispatch} />

        { auth.id ? 
          <CommentForm createComment={this.createComment} handleOnChange={this.handleOnChange} />
          :
          <div className="p-2">
            <span>You <em>must</em> be signed in before posting a comment.</span>
          </div>
        }

        <hr />
        
        <CommentList dispatch={dispatch} auth={auth} comments={thread._comments} />
      </div>
    )
  }
}

const findById = (data, props) => {
  const { id } = props.match.params;
  return data.find(item => item.id === parseInt(id, 10));
}

const mapState = (state, props) => ({
  thread: findById(state.threads.queryResult.data, props),
  auth: state.auth
})

export default connect(mapState)(ThreadDetailById);