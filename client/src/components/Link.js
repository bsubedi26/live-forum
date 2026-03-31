import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const LinkStyled = styled(Link).attrs({
  className: 'nav-link pointer'
})`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0.75rem 1rem;
  border-radius: 999px;
  color: ${props => (props.isActive ? 'var(--accent-strong)' : 'var(--text-default)')};
  font-size: 0.95rem;
  font-weight: 600;
  text-transform: capitalize;
  transition: background-color 180ms ease, color 180ms ease, transform 180ms ease;

  &:hover {
    color: var(--accent-strong);
    background: rgba(31, 61, 91, 0.08);
    transform: translateY(-1px);
  }
`

export const LinkActiveStyled = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem;
  border-radius: 999px;
  background: ${props => (props.isActive ? 'rgba(59, 130, 246, 0.12)' : 'transparent')};
`

const LinkComp = ({ isActive, to, className, label }) => (
  <LinkActiveStyled isActive={isActive}>
    <LinkStyled to={to} className={className} isActive={isActive}>
      {label}
    </LinkStyled>
  </LinkActiveStyled>
)

export default LinkComp
