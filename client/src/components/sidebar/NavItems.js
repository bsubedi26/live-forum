import React from 'react'
import { NavLink as RouteNavLink } from 'react-router-dom'
import { Nav, NavItem, NavLink } from 'shards-react'

const SidebarNavItem = ({ item }) => (
  <NavItem>
    <NavLink tag={RouteNavLink} to={item.to}>
      {item.icon && (
        <div
          className='d-inline-block item-icon-wrapper'
          dangerouslySetInnerHTML={{ __html: item.icon }}
        />
      )}
      {item.title && <span>{item.title}</span>}
    </NavLink>
  </NavItem>
)

const SidebarNavItems = ({ items }) => {
  return (
    <div className='nav-wrapper'>
      <Nav className='nav--no-borders flex-column'>
        {items.map((item, idx) => (
          <SidebarNavItem key={idx} item={item} />
        ))}
      </Nav>
    </div>
  )
}

SidebarNavItems.defaultProps = {
  items: [
    {
      title: 'Home',
      to: '/home',
      icon: '<i class="material-icons">edit</i>'
    },
    {
      title: 'Login',
      to: '/login',
      icon: '<i class="material-icons">note_add</i>'
    },
    {
      title: 'Signup',
      to: '/signup',
      icon: '<i class="material-icons">view_module</i>'
    },
    {
      title: 'Blog Posts',
      icon: '<i class="material-icons">vertical_split</i>',
      to: '/blog-posts'
    },
    {
      title: 'Add New Post',
      icon: '<i class="material-icons">note_add</i>',
      to: '/add-new-post'
    },
    {
      title: 'Forms & Components',
      icon: '<i class="material-icons">view_module</i>',
      to: '/components-overview'
    },
    {
      title: 'Tables',
      icon: '<i class="material-icons">table_chart</i>',
      to: '/tables'
    },
    {
      title: 'User Profile',
      icon: '<i class="material-icons">person</i>',
      to: '/user-profile-lite'
    },
    {
      title: 'Errors',
      icon: '<i class="material-icons">error</i>',
      to: '/errors'
    }
  ]

}
export default SidebarNavItems
