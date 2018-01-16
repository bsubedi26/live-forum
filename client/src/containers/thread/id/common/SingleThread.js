import React from 'react';
import { Title, LineText } from 'components/common';
import { services } from 'util/feathers';
import { goBack } from 'react-router-redux';
import CreateThreadForm from 'components/thread/CreateThreadForm';
import { FadeIn } from 'animate-css-styled-components';

class SingleThread extends React.Component {
  state = {
    showEdit: false,
    title: '',
    summary: ''
  }

  handleEditClick = (thread) => {
    this.setState({ showEdit: true });
  }


  handleDeleteClick = async (thread) => {
    const { dispatch } = this.props;
    await dispatch(services.threads.remove(thread.id));
    dispatch(goBack());
  }

  handleOnChange = (e) => this.setState({ [e.target.id]: e.target.value });

  handleEditThreadSubmit = async (e) => {
    e.preventDefault();
    const { dispatch, thread } = this.props;
    const { title, summary } = this.state;
    const payload = { title, summary };

    await dispatch(services.threads.patch(thread.id, payload));
    this.setState({ showEdit: false });
  }

  renderEditDeleteButtons = (thread) => {
    const { auth } = this.props;
    if (auth.id === thread.creator_id) {
      return (
        <div>
          <button id={thread.id} onClick={this.handleEditClick.bind(this, thread)} className="btn btn-outline-info pointer ma2">Edit</button>
          <button onClick={this.handleDeleteClick.bind(this, thread)} className="btn btn-outline-danger pointer ma2">Delete</button>
        </div>
      )
    }
    else {
      return null;
    }
  }

  render() {
    const { thread } = this.props;
    
    const postDate = new Date(thread.updated_at).toDateString();
    
    return (
      <div className="card">
        <div className="card-header">
          <Title>{thread.title}</Title>
        </div>

        <div className="text-center">
          <p className="mt-2">
            {thread.summary}
          </p>
          <LineText><strong>UserID: </strong> {thread._creator.id} - {thread._creator.email}</LineText>

          <LineText>
            <span className="mr-2">{postDate}</span>
            <span className="mr-2">-</span>
            <span className="mr-2">{thread._comments.length} comments</span>
          </LineText>

          <div>{this.renderEditDeleteButtons(thread)}</div>

          {/* SHOW EDIT FORM WHEN EDIT IS TRUE */}
          {this.state.showEdit ? <FadeIn><CreateThreadForm onSubmit={this.handleEditThreadSubmit} onChange={this.handleOnChange} /></FadeIn> : null }

        </div>

      </div>
    )
  }
  
}

export default SingleThread;