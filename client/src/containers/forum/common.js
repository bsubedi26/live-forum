import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Title = styled.h3`
font-size: 1.1rem;
`

export const LineText = styled.h5`
font-size: 0.8rem;
opacity: 0.7;
`

export const ForumList = props => {
  const { forums, topicId } = props

  return (
    <div className="list-group list-group-flush">
      {
        forums.map(item => {
          let postDate = new Date(item.updated_at).toDateString()

          return (
            <div key={item.id} className="list-group-item">
              <Link to={`/forum/${topicId}/individual/${item.id}`}><Title className="text-left mb-3">{item.title}</Title></Link>
              <LineText className="text-left">ID: {item.creator_id} - <i className="fa fa-github m-1"></i> {item._creator.email}</LineText>
              <LineText className="text-left">
                <span className="mr-2">{postDate}</span>
                <span className="mr-2">-</span>
                <span className="mr-2">{item._comments.length} comments</span>
              </LineText>
            </div>
          )
        })
      }
    </div>

  )
}