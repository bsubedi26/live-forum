import React from 'react';
import { LineText } from 'components/common';
import { services } from 'util/feathers';
import { FadeIn } from 'animate-css-styled-components';
import Avatar from 'components/Avatar';
import moment from 'moment';

class CommentList extends React.Component {

  state = {
    showEdit: {},
    newComment: ''
  } 

  handleDeleteClick = async (comment) => {
    const { dispatch } = this.props;
    await dispatch(services.comments.remove(comment.id));
  }

  handleEditComment = async (comment, e) => {
    e.preventDefault();
    const { newComment } = this.state;
    const { dispatch } = this.props;
    const payload = { comment: newComment };

    await dispatch(services.comments.patch(comment.id, payload));
  }

  handleEditClick = (comment, e) => {
    this.setState({
      showEdit: {
        [e.target.id]: true
      }
    });
  }

  renderEditForm = (comment) => {
    return (
      <FadeIn>
        <form className="mx-auto w-75 mt-2" onSubmit={this.handleEditComment.bind(this, comment)} noValidate>
          <textarea onChange={(e) => this.setState({ [e.target.id]: e.target.value })} id="newComment" className="form-control" rows="2" placeholder="Edit Comment..."></textarea>
          <div className="text-muted m-3">
            <button className="btn btn-outline-primary pointer">Submit</button>
          </div>
        </form>
      </FadeIn>
    )
  }

  /**
   * IF LOGGED IN USER IS OWNER OF COMMENT
   * ALLOW EDIT OR DELETE
  **/
  renderEditDeleteButtons = (item) => {
    const { auth } = this.props;

    if (auth.id === item.creator_id) {
      return (
        <div>
          <button id={item.id} onClick={this.handleEditClick.bind(this, item)} className="btn btn-outline-info pointer ma2">Edit</button>
          <button onClick={this.handleDeleteClick.bind(this, item)} className="btn btn-outline-danger pointer ma2">Delete</button>
        </div>
      )
    }
    else {
      return null;
    }
  }

  renderComment = (item, i) => {
    const commentDate = moment.utc(item.updated_at).local().format('dddd MMM D YYYY h:mm A');

    return (
      <div key={i} className="card">
        <div className="card-header">
          <Avatar avatar={item._creator.avatar} />
          <LineText className="my-2">{item._creator.email}</LineText>
        </div>

        <div className="text-center">
          <p className="mt-2">
            {item.comment}
          </p>
          <LineText><strong>UserID: </strong> {item._creator.id} - {item._creator.email}</LineText>
          <LineText>
            <span className="mr-2">{commentDate}</span>
          </LineText>
        </div>

        {this.renderEditDeleteButtons(item)}
        {this.state.showEdit[item.id] ? this.renderEditForm(item) : null}
      </div>
    )
  }

  render() {
    const { comments } = this.props;
    return <div>{comments.map(this.renderComment)}</div>
}
  
}

export default CommentList;