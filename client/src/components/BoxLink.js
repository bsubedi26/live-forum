import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const BoxLinkCard = styled(Link)`
  display: block;
  min-height: 190px;
  padding: 1.5rem;
  border: 1px solid rgba(31, 61, 91, 0.08);
  border-radius: 26px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(255, 255, 255, 0.9)),
    linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(217, 119, 6, 0.12));
  box-shadow: var(--shadow-soft);
  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lifted);
    border-color: rgba(59, 130, 246, 0.18);
  }
`

const Label = styled.h3`
  margin: 0;
  color: var(--text-strong);
  font-size: 1.3rem;
  font-weight: 700;
  text-transform: capitalize;
`

const Meta = styled.p`
  max-width: 18rem;
  margin: 0.9rem 0 0;
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.7;
`

const Accent = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 18px;
  background: rgba(31, 61, 91, 0.08);
  color: var(--accent-strong);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`

export default ({ to, label }) => {
  const initials = label
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(item => item[0])
    .join('')

  return (
    <BoxLinkCard to={to}>
      <Accent>{initials || 'T'}</Accent>
      <Label>{label}</Label>
      <Meta>Browse active discussion threads, recent updates, and community responses in this topic.</Meta>
    </BoxLinkCard>
  )
}
