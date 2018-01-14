import React from 'react';
import { Link } from 'react-router-dom';
import { LineText, Title } from './common';

const ThreadList = props => {
  const { threads, topicId, activeThread } = props;
  // console.log(activeThread);
  // console.log(threads);

  const getSlicedThreads = (threads) => {
    const itemPerPage = 5;
    const results = threads.slice((activeThread.active - 1) * itemPerPage, activeThread.active * itemPerPage);
    return results;
  }

  const renderWithPagination = (item, idx) => {
    let postDate = new Date(item.updated_at).toDateString();

    return (
      <div key={item.id} className="list-group-item">
        <Link to={`/thread/${topicId}/individual/${item.id}`}><Title className="text-left mb-3">{item.title}</Title></Link>
        <LineText className="text-left">ID: {item.creator_id} - <i className="fa fa-github m-1"></i> {item._creator.email}</LineText>
        <LineText className="text-left">
          <span className="mr-2">{postDate}</span>
          <span className="mr-2">-</span>
          <span className="mr-2">{item._comments.length} comments</span>
        </LineText>
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
