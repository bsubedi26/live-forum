import React from 'react'
import { Link } from 'react-router-dom'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from 'shards-react'
// import Avatar from '../../../Avatar'

const Avatar = () => (
  <img
    className='user-avatar rounded-circle mr-2'
    src='https://www.mulierchile.com/105/avatar_png/avatar_png_41.jpg'
    alt='User Avatar'
  />
)

export default ({ user, onLogout }) => {
  const [visible, setVisible] = React.useState(false)

  const toggleUserActions = () => {
    setVisible(!visible)
  }

  return (
    <NavItem tag={Dropdown} caret toggle={toggleUserActions}>
      <DropdownToggle caret tag={NavLink} className='text-nowrap px-3'>
        <Avatar />
        <span className='d-none d-md-inline-block'>{user.email}</span>
      </DropdownToggle>
      <Collapse tag={DropdownMenu} right small open={visible}>
        <DropdownItem tag={Link} to='/user/profile'>
          <i className='material-icons'>&#xE7FD;</i> Profile
        </DropdownItem>
        {/* <DropdownItem tag={Link} to='edit-user-profile'>
          <i className='material-icons'>&#xE8B8;</i> Edit Profile
        </DropdownItem> */}
        <DropdownItem tag={Link} to='file-manager-list'>
          <i className='material-icons'>&#xE2C7;</i> Files
        </DropdownItem>
        <DropdownItem tag={Link} to='transaction-history'>
          <i className='material-icons'>&#xE896;</i> Transactions
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem tag='a' onClick={onLogout} className='text-danger'>
          <i className='material-icons text-danger'>&#xE879;</i> Logout
        </DropdownItem>
      </Collapse>
    </NavItem>
  )
}
