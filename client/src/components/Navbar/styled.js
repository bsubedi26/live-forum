import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const LinkStyled = styled(Link).attrs({
  className: 'nav-link pointer mx-2 text-capitalize'
})``

export const LinkActiveStyled = styled.div.attrs({
})`
  background-color: ${prop => prop.isActive ? '#d9e2cf' : ''};
  border: ${prop => prop.isActive ? '2px solid #d9e2cf' : '0px'};
  &:hover {
    background-color: paleturquoise;
  }
`
