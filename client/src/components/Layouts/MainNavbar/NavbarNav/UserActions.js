import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from 'shards-react'

const Avatar = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  margin-right: 0.75rem;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-strong), var(--color-sky-500));
  color: var(--color-white);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
`

const UserName = styled.span`
  color: var(--text-strong);
  font-size: 0.95rem;
  font-weight: 600;
`

export default ({ user, onLogout }) => {
  const [visible, setVisible] = React.useState(false)

  const toggleUserActions = () => {
    setVisible(!visible)
  }

  const initials = user.email.slice(0, 2)

  return (
    <NavItem tag={Dropdown} caret toggle={toggleUserActions}>
      <DropdownToggle caret tag={NavLink} className='text-nowrap px-3 py-2 d-flex align-items-center'>
        <Avatar>{initials}</Avatar>
        <UserName className='d-none d-md-inline-block'>{user.email}</UserName>
      </DropdownToggle>
      <Collapse tag={DropdownMenu} right small open={visible}>
        <DropdownItem tag={Link} to='/user/profile'>
          Profile
        </DropdownItem>
        <DropdownItem tag='a' onClick={onLogout} className='text-danger'>
          Logout
        </DropdownItem>
      </Collapse>
    </NavItem>
  )
}
