import React from 'react';
import { connect } from 'react-redux';
import { services } from 'util/feathers';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import SingleForum from './SingleForum';

class ForumDetailById extends React.Component {
  state = {
    comment: '',
    comments: []
  }

  handleOnChange = (e) => this.setState({ [e.target.id]: e.target.value });

  createComment = (e) => {
    e.preventDefault();
    const { dispatch, post, auth } = this.props;
    const { comment } = this.state;
    const payload = { comment, forum_id: post.id, creator_id: auth.id };

    dispatch(services.comment.create(payload));
  }

  render() {
    const { post, auth } = this.props;

    return (
      <div className="mx-auto w-75 mt-4">
        <SingleForum post={post} />

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
  post: findById(state.forum.queryResult.data, props),
  auth: state.auth
})

export default connect(mapState)(ForumDetailById);