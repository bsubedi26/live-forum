import React from 'react'

const style = {
  container: {
    backgroundColor: '#0f7844'
  }
}

const Header = ({ topic }) => {
  return (
    <div style={style.container} className='py-4'>
      <div className='container text-white text-center'>
        <h3 className='display-4 ttc'>{topic.name}</h3>
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
