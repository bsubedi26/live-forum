import React from 'react';

class Avatar extends React.Component {
  render() {
    const { avatar, style } = this.props;

    return (
      <img alt="user avatar" style={style} width="50" height="50" src={`data:image/png;base64,${avatar}`} />
    )
  }
}

export default Avatar;