import React from 'react'
import { Link } from 'react-router-dom'

export const CardLink = ({ item }) => (
  <Link to={`/channel/${item}`}>
    <div className='card mx-3 p-3'>
      {item}
    </div>
  </Link>
)
