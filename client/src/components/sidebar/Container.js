import React from 'react'
import PropTypes from 'prop-types'
import SidebarContent from './Content'

const styles = {
  sidebar: {
    width: 256,
    height: '100%'
  }
}

const SidebarContainer = (props) => {
  const style = props.style ? { ...styles.sidebar, ...props.style } : styles.sidebar

  return (
    <div style={style}>
      <SidebarContent />
    </div>
  )
}

SidebarContainer.propTypes = {
  style: PropTypes.object
}

export default SidebarContainer
