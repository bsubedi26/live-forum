import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobal } from 'reactn'
import Services from 'util/feathers/Services'

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
  const [topics, setTopics] = useGlobal('topics')
  React.useEffect(() => {
    const fetchData = async () => {
      const { data } = await Services.Topic.find()

      setTopics(data)
    }
    fetchData()
  }, []) // eslint-disable-line

  return (
    <div className='flex flex-wrap'>
      {topics.length ? <Topics topics={topics} /> : <p>Loading...</p>}
    </div>
  )
}

export default ThreadsList
