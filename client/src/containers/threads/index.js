import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobal, useDispatch } from 'reactn'
import { getRandomColor, getTextColor } from 'util/helpers'
import SidebarFixed from 'components/Sidebar'

const getStyle = () => {
  const randomColor = getRandomColor()
  const textColor = getTextColor(randomColor)
  return {
    backgroundColor: randomColor,
    color: textColor
  }
}

const renderTopic = topic => {
  const { backgroundColor, color } = getStyle()
  return (
    <Link key={topic.id} className='pa4 ma3' to={`/thread/${topic.id}`} style={{ backgroundColor }}>
      <h4 className='bodoni ttc' style={{ color }}>{topic.name}</h4>
    </Link>
  )
}

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
