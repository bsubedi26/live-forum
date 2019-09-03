import React from 'react'
import { useGlobal, useDispatch } from 'reactn'
import SidebarFixed from 'components/Sidebar'
import BoxLink from 'components/BoxLink'

const renderTopic = topic => (
  <BoxLink key={topic.id} to={`/thread/${topic.id}`} label={topic.name} />
)

const Topics = ({ topics }) => topics.map(renderTopic)

const ThreadsList = ({ topic }) => {
  const [topics] = useGlobal('topics')
  const topicsFind = useDispatch('topics/find')

  React.useEffect(() => {
    topicsFind()
  }, [topicsFind])

  return (
    <div>
      <SidebarFixed />
      <div className='flex flex-wrap'>
        {topics.length > 0 ? <Topics topics={topics} /> : <p>Loading...</p>}
      </div>
    </div>
  )
}

export default ThreadsList
