import styled from 'styled-components';

export const Title = styled.h3`
  font-size: 1.1rem;
`

export const LineText = styled.h5`
  font-size: 0.8rem;
  opacity: 0.7;
`

export const NavLink = styled.li`
  background-color: ${ prop => prop.activeTab ? '#d9e2cf' : ''};
`
