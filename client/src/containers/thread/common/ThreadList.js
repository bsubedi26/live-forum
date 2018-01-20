import React from 'react';
import { Link } from 'react-router-dom';
import { LineText, Title } from 'components/common';
import { services } from 'util/feathers';
import Avatar from 'components/Avatar';
import moment from 'moment';

const ThreadList = props => {
  const { threads, topicId, activeThread, auth, dispatch } = props;

  const getSlicedThreads = (threads) => {
    const itemPerPage = 5;
    const results = threads.slice((activeThread.active - 1) * itemPerPage, activeThread.active * itemPerPage);
    return results;
  }

  const handleDeleteThread = async (thread) => {
    await dispatch(services.threads.remove(thread.id));
  }
  
  /**
   * IF LOGGED IN USER IS OWNER OF THREAD
   * ALLOW EDIT OR DELETE
  **/
  const renderEditDeleteButtons = (item) => {
    if (auth.id === item.creator_id) {
      return (
        <div>
          <Link to={`/thread/${topicId}/individual/${item.id}`}><button className="btn btn-outline-info pointer ma2">Edit</button></Link>
          <button onClick={handleDeleteThread.bind(this, item)} className="btn btn-outline-danger pointer ma2">Delete</button>
        </div>
      )
    }
    else {
      return null;
    }
  }

  const renderWithPagination = (item, idx) => {
    const postDate = moment.utc(item.updated_at).local().format('dddd MMM D YYYY h:mm A');
    const { _creator } = item;

    return (
      <div key={item.id} className="list-group-item">
        <div>
          <Avatar style={{ float: 'left', marginRight: '8px' }} avatar={_creator.avatar} />
          <Link to={`/thread/${topicId}/individual/${item.id}`}><Title className="text-left">{item.title}</Title></Link>
        </div>
        <LineText className="text-left"><strong>UserID: </strong> {item.creator_id} - {_creator.email}</LineText>
    
        <LineText className="text-left pt-2">
          <span className="mr-2">{postDate}</span>
          <span className="mr-2">-</span>
          <span className="mr-2">{item._comments.length} comments</span>
        </LineText>

        {renderEditDeleteButtons(item)}
      </div>
    )
  }

  return (
    <div className="list-group list-group-flush">
      {/* {threads.map(renderWithPagination)} */}
      {getSlicedThreads(threads).map(renderWithPagination)}
    </div>

  )
}

export default ThreadList;
