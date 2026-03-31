import React from 'react'

const Avatar = ({ avatar, style }) => (
  <img
    alt='user avatar'
    style={{ width: 52, height: 52, borderRadius: 18, objectFit: 'cover', ...style }}
    src={`data:image/png;base64,${avatar}`}
  />
)

export default Avatar
