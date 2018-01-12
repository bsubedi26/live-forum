import React from 'react';
import { Title, LineText } from '../common';

const SingleForum = props => {
  const { post } = props;
  const postDate = new Date(post.updated_at).toDateString();

  return (
    <div className="card">
      <div className="card-header">
        <Title>{post.title}</Title>
      </div>

      <div className="text-center">
        <p className="mt-2">
          {post.summary}
        </p>
        <LineText>ID: {post._creator.id} - <i className="fa fa-github m-1"></i> {post._creator.email}</LineText>
        <LineText>
          <span className="mr-2">{postDate}</span>
          <span className="mr-2">-</span>
          <span className="mr-2">{post._comments.length} comments</span>
        </LineText>
      </div>

    </div>
  )
}

export default SingleForum;