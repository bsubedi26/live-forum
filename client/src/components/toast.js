import React from 'react'
import classNames from 'classnames'

const getStyle = () => {
  return {
    backgroundColor: '#84845b'
  }
}

class Toast extends React.Component {
  state = {
    active: false,
    message: '',
    duration: 3000
  }

  show = (message) => {
    this.setState({ active: true, message })
  }
  
  close = (message) => {
    this.setState({ active: false, message: '' })
  }

  renderToast = () => {
    setTimeout(() => {
      // isMounted check to avoid calling setState if component has unmounted
      if (this.updater.isMounted(this)) {
        this.close()
      }
    }, this.state.duration)
  }

  render() {
    const { active, message } = this.state
    const className = classNames({ show: active })

    return (
      <div>
        <div id="toast" style={getStyle()} className={className}>{message}</div>
        {active ?  this.renderToast() : null}
      </div>
    )
  }
}

export default Toast