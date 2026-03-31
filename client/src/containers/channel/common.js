import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ChannelCard = styled(Link)`
  display: block;
  padding: 1.5rem;
  border: 1px solid rgba(31, 61, 91, 0.08);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: var(--shadow-soft);
  color: var(--text-strong);
  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-lifted);
    border-color: rgba(59, 130, 246, 0.18);
    color: var(--accent-strong);
  }
`

const ChannelTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1rem;
`

const ChannelBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2.6rem;
  height: 2.6rem;
  padding: 0 0.85rem;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.16), rgba(14, 165, 233, 0.12));
  color: var(--accent-strong);
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`

const ChannelPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.45rem 0.75rem;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.05);
  color: var(--text-muted);
  font-size: 0.78rem;
  font-weight: 600;
`

const ChannelTitle = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.15rem;
  font-weight: 700;
`

const ChannelMeta = styled.p`
  margin: 0;
  color: var(--text-muted);
  line-height: 1.7;
`

const ChannelCaption = styled.span`
  display: inline-block;
  margin-top: 1rem;
  color: var(--accent-strong);
  font-size: 0.88rem;
  font-weight: 600;
`

const getInitials = (item) => item.slice(0, 2)

export const CardLink = ({ item, current = false }) => (
  <ChannelCard
    to={`/channel/${item}`}
    aria-current={current ? 'page' : undefined}
    style={current ? { borderColor: 'rgba(59, 130, 246, 0.28)', boxShadow: 'var(--shadow-lifted)' } : undefined}
  >
    <ChannelTopRow>
      <ChannelBadge>{getInitials(item)}</ChannelBadge>
      <ChannelPill>{current ? 'Current Room' : 'Live Room'}</ChannelPill>
    </ChannelTopRow>
    <ChannelTitle>{item}</ChannelTitle>
    <ChannelMeta>
      {current
        ? 'You are here now. Keep the conversation moving and jump between rooms when the topic shifts.'
        : 'Join this real-time channel for lighter, faster community discussions.'}
    </ChannelMeta>
    <ChannelCaption>{current ? 'Open now' : 'Enter channel'}</ChannelCaption>
  </ChannelCard>
)
