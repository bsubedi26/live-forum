import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Footer = styled.footer`
  padding: 0 1rem 1.5rem;
`

const FooterInner = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  max-width: 1180px;
  margin: 0 auto;
  padding: 1rem 1.25rem;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.75);
  border-radius: 22px;
  box-shadow: var(--shadow-soft);
  color: var(--text-muted);
  font-size: 0.92rem;
`

const FooterNav = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`

const FooterLink = styled(Link)`
  color: var(--text-muted);
  font-weight: 500;

  &:hover {
    color: var(--accent-strong);
  }
`

const MainFooter = () => (
  <Footer>
    <FooterInner>
      <FooterNav>
        <FooterLink to='/threads'>Threads</FooterLink>
        <FooterLink to='/channels'>Channels</FooterLink>
        <FooterLink to='/user/profile'>Profile</FooterLink>
      </FooterNav>
      <span>Live Forum community discussions, refreshed with a cleaner interface.</span>
    </FooterInner>
  </Footer>
)

export default MainFooter
