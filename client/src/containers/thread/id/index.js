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

  initListeners() {
    const { dispatch } = this.props;

    this.commentService.on('created', (data) => {
      console.log('COMMENT:on::Created ', data);

      dispatch({ type: 'SOCKET_COMMENTS_ON_CREATE', payload: data });
    });

  }

  componentWillUnmount() {
    this.commentService.removeAllListeners("created");
  }

  componentDidMount() {
    this.initListeners();
  }

  handleOnChange = (e) => this.setState({ [e.target.id]: e.target.value });

  createComment = (e) => {
    e.preventDefault();
    const { dispatch, post, auth } = this.props;
    const { comment } = this.state;
    const payload = { comment, thread_id: post.id, creator_id: auth.id };

    dispatch(services.comments.create(payload));
  }

  render() {
    const { post, auth } = this.props;

    return (
      <div className="mx-auto w-75 mt-4">
        <SingleThread post={post} />

        { auth.id ? 
          <CommentForm createComment={this.createComment} handleOnChange={this.handleOnChange} />
          :
          <div className="p-2">
            <span>You <em>must</em> be signed in before posting a comment.</span>
          </div>
        }

        <hr />
        
        <CommentList comments={post._comments} />
      </div>
    )
  }
}

const findById = (data, props) => {
  const { id } = props.match.params;
  return data.find(item => item.id === parseInt(id, 10));
}

const mapState = (state, props) => ({
  post: findById(state.threads.queryResult.data, props),
  auth: state.auth
})

export default connect(mapState)(ThreadDetailById);