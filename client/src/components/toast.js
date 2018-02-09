import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import 'styles/components/toast.css'

const style = {
  backgroundColor: '#84845b'
}

class Toast extends React.Component {
  static propTypes = {
    toast: PropTypes.object.isRequired
  }

  showToast = () => {
    const { dispatch } = this.props
    let toast = this.toast
    toast.className = "show"
    setTimeout(() => {
        toast.className = toast.className.replace("show", "")
        dispatch({ type: 'UI/TOAST_TOGGLE', payload: { active: false, message: '' } })
    }, 3000)
  }

  render() {
    const { toast } = this.props

    return (
      <div>
        <div ref={(toast) => this.toast = toast} style={style} id="toast">{toast.message}</div>
        {toast.active ?  this.showToast() : null}
      </div>
    )
  }
}

const mapState = state => ({
  toast: state.ui.toast
})

export default connect(mapState)(Toast)