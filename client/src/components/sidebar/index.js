import React from 'react'
import styled from 'styled-components'
import { FaList, FaHome, FaInfo, FaBackspace } from 'react-icons/fa'

const Wrapper = styled.div`
  position: absolute;
  top: 71px;
  bottom: 0;
  left: 0;
  z-index: 1006;
  transition: min-width 0.3s;
  background: #db3d44;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  font-size: 13px;
  min-width: ${props => props.open ? `${props.maxWidth}px` : `${props.minWidth}px`};
  overflow: ${props => props.open ? 'inherit' : 'hidden'};
  text-align: left;

  .icon-link {
    position: relative;
    display: block;
    line-height: 50px;
    height: 50px;
    text-decoration: none;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    &:hover {
      background: #efefef;
    }
  }
  .icon-wrapper {
    margin-left: 15px;
  }
`

const Spacing = styled.div`
  padding: 8px 0;
`

const IconText = ({ children }) => <span className='pl-3'>{children}</span>

const DefaultChildren = ({ open, setOpen }) => (
  <>
    <Spacing />
    <div className='icon-link'>
      <div className='icon-wrapper'>
        <FaHome size={25} />
        {open && <IconText>Home</IconText>}
      </div>
    </div>
    <Spacing />
    <div className='icon-link'>
      <div className='icon-wrapper'>
        <FaInfo size={25} />
        {open && <IconText>Information</IconText>}
      </div>
    </div>
  </>
)

export default ({ children, minWidth = 64, maxWidth = 180 }) => {
  const [open, setOpen] = React.useState(false)

  return (
    <Wrapper {...{ open, minWidth, maxWidth }}>
      <div className='icon-link' onClick={() => setOpen(!open)}>
        <div className='icon-wrapper'>
          {
            open
              ? <FaBackspace size={25} />
              : <FaList size={25} />
          }
        </div>
      </div>
      {children || <DefaultChildren {...{ open, setOpen }} />}
    </Wrapper>
  )
}
