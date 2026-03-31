import React from 'react'
import { useGlobal, useDispatch } from 'reactn'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Navbar } from 'shards-react'

import NavbarLinks from './NavbarLinks'
import NavbarNav from './NavbarNav'

const NavbarOuter = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: 818.98px) {
    margin-bottom: 100px;
  }
`

const NavbarBody = styled(Navbar)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem 1.5rem;
  padding: 0.85rem 1.1rem;

  @media (min-width: 992px) {
    padding: 0.95rem 1.35rem;
  }
`

const LeftRail = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 0;
  flex: 1 1 auto;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const Brand = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
  padding-right: 0.4rem;
  color: var(--text-strong);
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: -0.03em;

  &:hover {
    color: var(--text-strong);
  }
`

const BrandMark = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--accent-strong), var(--color-sky-500));
  color: var(--color-white);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`

const LinksWrap = styled.div`
  min-width: 0;
`

const MainNavbar = ({ stickyTop }) => {
  const [auth] = useGlobal('auth')
  const appLogout = useDispatch('app/logout')

  const onLogout = async (e) => {
    e.preventDefault()
    appLogout()
  }

  const classes = classNames('main-navbar', stickyTop && 'sticky-top')

  return (
    <div className={classes}>
      <NavbarOuter>
        <NavbarBody type='light'>
          <LeftRail>
            <Brand to='/threads'>
              <BrandMark>LF</BrandMark>
              <span>Live Forum</span>
            </Brand>
            <LinksWrap>
              <NavbarLinks {...{ auth }} />
            </LinksWrap>
          </LeftRail>
          <NavbarNav {...{ auth, onLogout }} />
        </NavbarBody>
      </NavbarOuter>
    </div>
  )
}

MainNavbar.propTypes = {
  stickyTop: PropTypes.bool
}

MainNavbar.defaultProps = {
  stickyTop: true
}

export default MainNavbar
