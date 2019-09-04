import React, { useEffect } from 'react'
import { useGlobal, useDispatch } from 'reactn'
import BoxLink from 'components/BoxLink'
import Loading from 'components/Loading'
import ContainerLayout from 'wrappers/ContainerLayout'

const renderTopic = topic => (
  <BoxLink key={topic.id} to={`/thread/${topic.id}`} label={topic.name} />
)

const Topics = ({ topics }) => topics.map(renderTopic)

const ThreadsList = ({ topic }) => {
  const [topics] = useGlobal('topics')
  const topicsFind = useDispatch('topics/find')

  useEffect(() => {
    topicsFind({ query: { $sort: { updated_at: 1 } } })
  }, [topicsFind])

  return (
    <ContainerLayout>
      <div className='flex flex-wrap'>
        {topics ? <Topics topics={topics} /> : <Loading />}
      </div>
    </ContainerLayout>
  )
}

export default ThreadsList
