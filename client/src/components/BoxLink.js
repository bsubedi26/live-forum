import React from 'react'
import styled from 'styled-components'
import { desaturate, lighten } from 'polished'
import { Link } from 'react-router-dom'
import { getRandomColor, getTextColor } from 'util/helpers'

const Label = styled.h4`
  font-family: Bodoni MT, serif;
  text-transform: capitalize;
`

const hoverBgColor = props => lighten(0.2, desaturate(0.2, props.bg))

const LinkStyled = styled(Link)`
  margin: 1rem;
  padding: 2rem;
  background-color: ${props => props.bg || '#efefef'};
  &:hover {
    text-decoration: none;
    background-color: ${hoverBgColor};
  }
  ${Label} {
    color: ${props => props.color || 'white'};
  }
`

export default ({ to, label }) => {
  const bg = getRandomColor()
  const color = getTextColor(bg)

  return (
    <LinkStyled {...{ to, bg, color }}>
      <Label>{label}</Label>
    </LinkStyled>
  )
}
