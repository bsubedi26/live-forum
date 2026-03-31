import React from 'react'
import styled, { keyframes } from 'styled-components'

const pulse = keyframes`
  0%,
  100% {
    opacity: 0.55;
    transform: scale(0.92);
  }

  50% {
    opacity: 1;
    transform: scale(1);
  }
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.85rem;
  min-height: 180px;
  color: var(--text-muted);
  font-size: 1rem;
`

const Dot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: var(--accent-strong);
  animation: ${pulse} 1s ease-in-out infinite;

  &:nth-child(2) {
    animation-delay: 0.15s;
  }

  &:nth-child(3) {
    animation-delay: 0.3s;
  }
`

const DefaultLoading = ({ text = 'Loading...' }) => (
  <Wrapper aria-live='polite' aria-busy='true'>
    <div>
      <Dot />
      <Dot />
      <Dot />
    </div>
    <span>{text}</span>
  </Wrapper>
)

export default DefaultLoading
