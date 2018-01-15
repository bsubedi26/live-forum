import React from 'react';
import { Link } from 'react-router-dom';
import { LineText, Title } from './common';
import { services } from 'util/feathers';

const ThreadList = props => {
  const { threads, topicId, activeThread, auth, dispatch } = props;
  // console.log(activeThread);
  // console.log(threads);

  const getSlicedThreads = (threads) => {
    const itemPerPage = 5;
    const results = threads.slice((activeThread.active - 1) * itemPerPage, activeThread.active * itemPerPage);
    return results;
  }

  const handleDeleteThread = (thread) => {
    dispatch(services.threads.remove(thread.id))
  }
  
  /**
   * IF LOGGED IN USER IS OWNER OF THREAD
   * ALLOW EDIT OR DELETE
  **/
  const renderEditDeleteButtons = (item) => {
    if (auth.id === item.creator_id) {
      return (
        <div>
          <button className="btn btn-outline-info pointer ma2">Edit</button>
          <button onClick={handleDeleteThread.bind(this, item)} className="btn btn-outline-danger pointer ma2">Delete</button>
        </div>
      )
    }
    else {
      return null;
    }
  }

  const renderWithPagination = (item, idx) => {
    console.log('ITEM ', item);
    let postDate = new Date(item.updated_at).toDateString();

    return (
      <div key={item.id} className="list-group-item">
        <Link to={`/thread/${topicId}/individual/${item.id}`}><Title className="text-left mb-3">{item.title}</Title></Link>
        <LineText className="text-left"><strong>UserID: </strong> {item.creator_id} - {item._creator.email}</LineText>
        <LineText className="text-left">
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
