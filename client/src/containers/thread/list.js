import React from 'react'
import { findByTopicId } from 'services/Thread'

const style = {
  container: {
    backgroundColor: '#0f7844'
  }
}

const ThreadsList = ({ topic }) => {
  const renderTopic = topic => {
    return (
      <div style={style.container} className='py-4'>
        <div className='container text-white text-center'>
          <h3 className='display-4'>{topic.display} Thread</h3>
          <div className='p-2'>
            <p className='lead'>
              Currently viewing {topic.name}.
            </p>
          </div>

        </div>
      </div>
    )
  }
  const handleFind = async () => {
    const response = await findByTopicId(1)
    console.log('response: ', response)
  }
  return (
    <div>
      {topic && topic.display ? this.renderTopic(topic) : null}
      <button onClick={handleFind}>Go</button>
    </div>
  )
}

export default ThreadsList
