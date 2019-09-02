import React from 'react'

const Header = ({ topic }) => {
  return (
    <div className='py-2 bg-light black'>
      <div className='container text-center'>
        <h3 className='display-5 ttc'>{topic.name}</h3>
        <div className='p-2'>
          <p className='lead'>
            Currently viewing {topic.name} thread.
          </p>
        </div>
      </div>
    </div>
  )
}

const ThreadHeader = ({ topic }) => {
  return (
    <div>
      {topic && topic.name ? <Header topic={topic} /> : null}
    </div>
  )
}

export default ThreadHeader
