import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const LinkStyled = styled(Link).attrs({
  className: 'nav-link pointer mx-2 ttc'
})``

export const LinkActiveStyled = styled.div.attrs({
})`
  background-color: ${prop => prop.isActive ? '#d9e2cf' : ''};
  border: ${prop => prop.isActive ? '2px solid #d9e2cf' : '0px'};
  &:hover {
    background-color: #efefef;
  }
`

const LinkComp = ({ isActive, to, item, className, label }) => (
  <LinkActiveStyled isActive={isActive}>
    <LinkStyled to={to} className={className}>
      {label}
    </LinkStyled>
  </LinkActiveStyled>
)

export default LinkComp
