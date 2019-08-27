import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobal } from 'reactn'
import { Topic } from 'services'
import { fetchAndSet } from 'state'

const renderTopic = topic => {
  return (
    <Link key={topic.id} className='pa4 ma3 bg-moon-gray blue' to={`/thread/${topic.id}`}>
      <h4 className='bodoni ttc'>{topic.name}</h4>
    </Link>
  )
}

const Topics = ({ topics }) => (
  topics.map(renderTopic)
)

const ThreadsList = ({ topic }) => {
  const [topics] = useGlobal('topics')
  React.useEffect(() => {
    fetchAndSet(Topic.find, 'topics')
  }, [true])

  return (
    <div className='flex flex-wrap'>
      {topics.length ? <Topics topics={topics} /> : <p>Loading...</p>}
    </div>
  )
}

export default ThreadsList
