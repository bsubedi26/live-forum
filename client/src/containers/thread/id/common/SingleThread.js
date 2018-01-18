import React from 'react';
import { Title, LineText } from 'components/common';
import Avatar from 'components/Avatar';
import { services } from 'util/feathers';
import { goBack } from 'react-router-redux';
import CreateThreadForm from 'components/thread/CreateThreadForm';
import { FadeIn } from 'animate-css-styled-components';
import moment from 'moment';

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
    const payload = { title, summary, updated_at: new Date() };

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
    const postDate = moment(thread.updated_at, 'YYYY-MM-DD HH:mm:ss').subtract(5, 'hours').format('dddd MMM D YYYY h:mm A');

    return (
      <div className="card">
        <div className="card-header">

          <div>
            <Avatar avatar={thread._creator.avatar} />
            <LineText className="my-2">{thread._creator.email}</LineText>
            <Title className="my-1">{thread.title}</Title>
          </div>

          <LineText className="pt-2">
            <span className="mr-2">{postDate}</span>
            <span className="mr-2">-</span>
            <span className="mr-2">{thread._comments.length} comments</span>
          </LineText>

        </div>

        <div className="text-center">
          <p className="mt-2">
            {thread.summary}
          </p>
          <LineText><strong>UserID: </strong> {thread._creator.id} - {thread._creator.email}</LineText>

          <div>{this.renderEditDeleteButtons(thread)}</div>

          {/* SHOW EDIT FORM WHEN EDIT IS TRUE */}
          {this.state.showEdit ? <FadeIn><CreateThreadForm onSubmit={this.handleEditThreadSubmit} onChange={this.handleOnChange} /></FadeIn> : null }

        </div>

      </div>
    )
  }
  
}

export default SingleThread;