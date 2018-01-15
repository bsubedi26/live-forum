import React from 'react';
import { Title, LineText } from '../common';
import { services } from 'util/feathers';

const CommentList = props => {
  const { comments, auth, dispatch } = props;

  const handleDeleteThread = (comment) => {
    dispatch(services.comments.remove(comment.id))
  }

  /**
   * IF LOGGED IN USER IS OWNER OF COMMENT
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


  return (
    <div>
      {comments.map((item, i) => {
        let commentDate = new Date(item.updated_at).toDateString();
        
        return (
          <div key={i} className="card">
            <div className="card-header">
              <Title>{item._creator.email}</Title>
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

            {renderEditDeleteButtons(item)}

          </div>
        )
      })}
    </div>
  )
}

export default CommentList;