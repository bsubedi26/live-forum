import React from 'react'

const Avatar = ({ avatar, style }) => (
  <img alt='user avatar' style={style} width='50' height='50' src={`data:image/png;base64,${avatar}`} />
)

export default Avatar
